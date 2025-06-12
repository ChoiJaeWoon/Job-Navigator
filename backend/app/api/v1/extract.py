# 이 파일은 FastAPI 라우터로, 기술스택 추출 API를 담당
# Frontend에서 PDF 파일을 업로드하면 이 API를 통해 추출 엔진을 호출함

from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services import extract_service # 추출 로직 호출
import shutil
import os

# 라우터 인스턴스 생성 (API V1)
router = APIRouter()

# 업로드 파일을 임시로 저장할 디렉토리 설정
UPLOAD_DIR = "./temp_upload"
os.makedirs(UPLOAD_DIR, exist_ok=True) # 폴더 없으면 생성

@router.post("/techstack")
async def extract_techstack(file : UploadFile = File(...)):
    """
    기술스택 추출 API 엔드포인트
    - Frontend에서 PDF파일을 받아서 기술스택을 추출
    """
    try:
        # 업로드 받은 파일을 서버 임시 디렉토리에 저장
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        # 파일 스트림을 열어서 저장
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 저장한 PDF 경로를 추출 엔진에 전달하여 기술스택 추출 실행
        extracted_stack = extract_service.extract_keywords(file_path)

        # 추출 완료 후 임시 파일 삭제
        os.remove(file_path)

        # 추출된 기술스택 결과를 JSON 형태로 반환
        return {"tech_stack" : extracted_stack}
    
    except Exception as e:
        # 에러 발생 시 클라이언트에 에러 메세지 전달
        raise HTTPException(status_code=500, detail=str(e))