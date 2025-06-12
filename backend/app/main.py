from fastapi import FastAPI
from app.api.v1 import job
from app.api.v1 import extract
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Job Navigator API")

# ✅ CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 중에는 전체 허용, 운영시에는 실제 프론트 주소만 허용 추천
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, world!"}

# 라우터 등록
app.include_router(job.router, prefix="/api/v1/jobs", tags=["Jobs"])

app.include_router(extract.router, prefix="/api/v1/extract", tags=["ExtractTechStack"])