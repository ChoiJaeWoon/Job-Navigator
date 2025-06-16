# app/routes/analyze.py

from fastapi import APIRouter, UploadFile, File
from app.services.analyze_service import AnalyzeService

router = APIRouter()

@router.post("/")
async def analyze(file: UploadFile = File(...)):
    result = await AnalyzeService.process_pdf(file)
    return result.dict()
