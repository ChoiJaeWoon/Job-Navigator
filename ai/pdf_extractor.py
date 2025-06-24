import fitz # PyMuPDF

def extract_text_from_pdf(pdf_path):
    """
    PDF 파일 경로를 받아서 전체 텍스트를 추출하는 함수
    """
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text()
    doc.close()
    return full_text