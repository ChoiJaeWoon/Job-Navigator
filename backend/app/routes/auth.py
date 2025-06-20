# 파일명: app/routes/auth.py

from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
import requests
import os
from dotenv import load_dotenv

load_dotenv()

from app.core.database import SessionLocal, get_db
from app.models.user import User, UserCreate, UserResponse

router = APIRouter()

# === 환경변수 ===
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
KAKAO_CLIENT_ID = os.getenv("KAKAO_CLIENT_ID")
KAKAO_REDIRECT_URI = os.getenv("KAKAO_REDIRECT_URI")
NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")
NAVER_REDIRECT_URI = os.getenv("NAVER_REDIRECT_URI")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
FRONTEND_REDIRECT = "http://localhost:5173/login"

# === DB 세션 ===
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# === JWT 생성 ===
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

# ✅ Google 로그인
@router.post("/google-login", response_model=UserResponse)
def google_login(request: UserCreate, db: Session = Depends(get_db)):
    try:
        id_token_str = request.id_token_str
        id_info = id_token.verify_oauth2_token(
            id_token_str, google_requests.Request(), GOOGLE_CLIENT_ID
        )

        social_provider = "google"
        social_id = id_info["sub"]
        email = id_info["email"]
        name = id_info.get("name")
        profile_image = id_info.get("picture")

        user = db.query(User).filter(
            User.social_id == social_id, User.social_provider == social_provider
        ).first()

        if not user:
            user = User(
                social_provider=social_provider,
                social_id=social_id,
                email=email,
                name=name,
                profile_image=profile_image,
                is_active=True,
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        token = create_access_token(
            data={"user_id": user.user_id},
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        )

        return {
            "user_id": user.user_id,
            "social_provider": user.social_provider,
            "social_id": user.social_id,
            "email": user.email,
            "name": user.name,
            "profile_image": user.profile_image,
            "is_active": user.is_active,
            "created_at": user.created_at,
            "access_token": token,
        }

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google token")

# ✅ Kakao 로그인 (Redirect 방식)
@router.get("/kakao-login")
def kakao_login():
    return RedirectResponse(
        f"https://kauth.kakao.com/oauth/authorize"
        f"?client_id={KAKAO_CLIENT_ID}"
        f"&redirect_uri={KAKAO_REDIRECT_URI}"
        f"&response_type=code"
        f"&prompt=login"  # 👈 항상 로그인 창을 띄우게 함
    )

@router.get("/kakao/callback")
def kakao_callback(code: str, db: Session = Depends(get_db)):
    token_res = requests.post(
        "https://kauth.kakao.com/oauth/token",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "authorization_code",
            "client_id": KAKAO_CLIENT_ID,
            "redirect_uri": KAKAO_REDIRECT_URI,
            "code": code,
        },
    )
    if token_res.status_code != 200:
        raise HTTPException(status_code=400, detail="카카오 토큰 요청 실패")

    access_token = token_res.json().get("access_token")

    profile_res = requests.get(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    if profile_res.status_code != 200:
        raise HTTPException(status_code=400, detail="카카오 사용자 정보 요청 실패")

    kakao_info = profile_res.json()
    kakao_id = str(kakao_info["id"])
    email = kakao_info["kakao_account"].get("email") or f"{kakao_id}@kakao.com"
    name = kakao_info["properties"].get("nickname")
    profile_image = kakao_info["properties"].get("profile_image")

    user = db.query(User).filter(
        User.social_id == kakao_id, User.social_provider == "kakao"
    ).first()
    if not user:
        user = User(
            social_provider="kakao",
            social_id=kakao_id,
            email=email,
            name=name,
            profile_image=profile_image,
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token(data={"user_id": user.user_id})
    return RedirectResponse(f"{FRONTEND_REDIRECT}?token={token}")

# ✅ Naver 로그인 (Redirect용 GET 방식)
@router.get("/naver-login")
def naver_login():
    return RedirectResponse(
        f"https://nid.naver.com/oauth2.0/authorize"
        f"?client_id={NAVER_CLIENT_ID}&response_type=code"
        f"&redirect_uri={NAVER_REDIRECT_URI}&state=xyz"
    )

@router.get("/naver/callback")
def naver_callback(code: str, state: str, db: Session = Depends(get_db)):
    token_res = requests.post(
        "https://nid.naver.com/oauth2.0/token",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "authorization_code",
            "client_id": NAVER_CLIENT_ID,
            "client_secret": NAVER_CLIENT_SECRET,
            "code": code,
            "state": state,
        },
    )
    if token_res.status_code != 200:
        raise HTTPException(status_code=400, detail="네이버 토큰 요청 실패")

    access_token = token_res.json().get("access_token")

    profile_res = requests.get(
        "https://openapi.naver.com/v1/nid/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    if profile_res.status_code != 200:
        raise HTTPException(status_code=400, detail="네이버 사용자 정보 요청 실패")

    naver_info = profile_res.json()["response"]
    naver_id = str(naver_info["id"])
    email = naver_info.get("email") or f"{naver_id}@naver.com"
    name = naver_info.get("name")
    profile_image = naver_info.get("profile_image")

    user = db.query(User).filter(
        User.social_id == naver_id, User.social_provider == "naver"
    ).first()
    if not user:
        user = User(
            social_provider="naver",
            social_id=naver_id,
            email=email,
            name=name,
            profile_image=profile_image,
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token(data={"user_id": user.user_id})
    return RedirectResponse(f"{FRONTEND_REDIRECT}?token={token}")

# ✅ Naver 로그인 (프론트 POST 요청 처리용)
@router.post("/naver-login", response_model=UserResponse)
def naver_login_post(payload: dict = Body(...), db: Session = Depends(get_db)):
    access_token = payload.get("access_token")
    if not access_token:
        raise HTTPException(status_code=400, detail="access_token 누락")

    profile_res = requests.get(
        "https://openapi.naver.com/v1/nid/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    if profile_res.status_code != 200:
        raise HTTPException(status_code=400, detail="네이버 사용자 정보 요청 실패")

    naver_info = profile_res.json()["response"]
    naver_id = str(naver_info["id"])
    email = naver_info.get("email") or f"{naver_id}@naver.com"
    name = naver_info.get("name")
    profile_image = naver_info.get("profile_image")

    user = db.query(User).filter(
        User.social_id == naver_id, User.social_provider == "naver"
    ).first()
    if not user:
        user = User(
            social_provider="naver",
            social_id=naver_id,
            email=email,
            name=name,
            profile_image=profile_image,
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token(
        data={"user_id": user.user_id},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    return {
        "user_id": user.user_id,
        "social_provider": user.social_provider,
        "social_id": user.social_id,
        "email": user.email,
        "name": user.name,
        "profile_image": user.profile_image,
        "is_active": user.is_active,
        "created_at": user.created_at,
        "access_token": token,
    }

# ✅ JWT 기반 유저 정보 추출
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # 구조상 필수

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="유효하지 않은 토큰입니다.")

        user = db.query(User).filter(User.user_id == user_id).first()
        if user is None:
            raise HTTPException(status_code=401, detail="사용자를 찾을 수 없습니다.")

        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="토큰이 유효하지 않습니다.")

# ✅ 토큰 유효성 확인 API (선택)
@router.get("/verify-token", response_model=UserResponse)
def verify_token(current_user=Depends(get_current_user)):
    token = create_access_token(data={"user_id": current_user.user_id})
    return {
        "user_id": current_user.user_id,
        "social_provider": current_user.social_provider,
        "social_id": current_user.social_id,
        "email": current_user.email,
        "name": current_user.name,
        "profile_image": current_user.profile_image,
        "is_active": current_user.is_active,
        "created_at": current_user.created_at,
        "access_token": token,  # 다시 access_token 포함
    }
