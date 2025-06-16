from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import job, analyze
from app.services import job_service
from app.core.config import load_env, get_settings

# ✅ .env 파일 로드
load_env()
settings = get_settings()

app = FastAPI(
    title=settings["APP_NAME"],
    description="채용공고 대시보드를 위한 백엔드 API",
    version="1.0.0",
)

# ✅ CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings["CORS_ALLOWED_ORIGINS"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    job_service.load_sample_jobs()


@app.get("/")
def read_root():
    return {"message": f"Welcome to the {settings['APP_NAME']} API!"}


app.include_router(job.router, prefix="/api/v1/jobs", tags=["Jobs"])
app.include_router(analyze.router, prefix="/api/v1/analyze", tags=["Analyze"])
