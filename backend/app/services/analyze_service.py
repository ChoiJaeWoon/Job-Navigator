# app/services/analyze_service.py

import os
import shutil
import logging
import pdfplumber
import re
from fastapi import UploadFile
from app.models.analyze import Paragraph, PDFExtractResult

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class AnalyzeService:

    @staticmethod
    async def process_pdf(file: UploadFile) -> PDFExtractResult:
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)
        temp_path = os.path.join(temp_dir, file.filename)

        # 파일 저장
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        logger.info(f"파일 저장 완료: {temp_path}")

        # PDF 파싱 및 문단 추출
        result = AnalyzeService._extract_paragraphs(temp_path)
        logger.info(f"문단 추출 완료: {len(result.paragraphs)}개")

        os.remove(temp_path)
        return result

    @staticmethod
    def _extract_paragraphs(file_path: str) -> PDFExtractResult:
        paragraphs = []
        with pdfplumber.open(file_path) as pdf:
            full_text = ""
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    full_text += text + "\n"

        raw_paragraphs = re.split(r'\n\s*\n', full_text)

        for idx, para in enumerate(raw_paragraphs):
            clean_para = para.strip()
            if clean_para:
                paragraphs.append(Paragraph(paragraph_id=idx+1, content=clean_para))

        return PDFExtractResult(
            file_name=file_path.split("/")[-1],
            paragraphs=paragraphs
        )
