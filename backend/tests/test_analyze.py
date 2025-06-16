# backend/tests/analyze/test_analyze.py

import os
import pytest
from fpdf import FPDF
from app.services.analyze_service import AnalyzeService
from app.models.analyze import PDFExtractResult

# 테스트용 PDF 파일 경로
TEST_PDF_PATH = "./tests/temp/sample.pdf"

# PDF 생성 함수
def create_sample_pdf(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, "This is a test paragraph.\n\nThis is another paragraph.")
    pdf.output(path)

# PDF 파일을 테스트 시작 전에 자동 생성
@pytest.fixture(scope="session", autouse=True)
def generate_sample_pdf():
    if not os.path.exists(TEST_PDF_PATH):
        create_sample_pdf(TEST_PDF_PATH)

@pytest.mark.asyncio
async def test_process_pdf():
    class DummyUploadFile:
        def __init__(self, filename):
            self.filename = os.path.basename(filename)
            self.file = open(filename, "rb")

        def __del__(self):
            self.file.close()

    dummy_file = DummyUploadFile(TEST_PDF_PATH)

    result: PDFExtractResult = await AnalyzeService.process_pdf(dummy_file)
    # 경로 문제를 대비하여 basename 으로 비교
    assert os.path.basename(result.file_name) == "sample.pdf"
    assert isinstance(result.paragraphs, list)
    assert isinstance(result, PDFExtractResult)

@pytest.mark.asyncio
async def test_extract_paragraphs_direct():
    result = AnalyzeService._extract_paragraphs(TEST_PDF_PATH)
    assert isinstance(result, PDFExtractResult)
