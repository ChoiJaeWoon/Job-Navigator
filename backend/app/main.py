from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 기존 라우터 및 모델 임포트
from app.routes import job, auth, user
from app.models.user import Base as UserBase
from app.models.job import Base as JobBase
from app.core.database import engine
from app.core.config import load_env, get_settings

# [✅ 추가] roadmap 라우터 임포트 (새로 만든 것)
from app.routes import roadmap

# ✅ 환경 변수 로드 및 설정 초기화
load_env()
settings = get_settings()

# ✅ FastAPI 애플리케이션 인스턴스 생성
app = FastAPI(
    title=settings["APP_NAME"],
    description="채용공고 대시보드를 위한 백엔드 API",
    version="1.0.0",
)

# ✅ CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings["CORS_ALLOWED_ORIGINS"],  # 예: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ 개발 환경에서는 테이블 자동 생성 허용
if settings.get("ENV") != "production":
    UserBase.metadata.create_all(bind=engine)
    JobBase.metadata.create_all(bind=engine)

# ✅ 루트 경로 응답
@app.get("/")
def read_root():
    return {"message": f"Welcome to the {settings['APP_NAME']} API!"}

# ✅ 기존 API 라우터 등록
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(user.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(job.router, prefix="/api/v1/jobs", tags=["Jobs"])

# ✅ [추가] roadmap 라우터 등록
app.include_router(roadmap.router, prefix="/api/v1/roadmap", tags=["Roadmap"])
