import os
from ai.pdf_extractor import extract_text_from_pdf

def test_sample_pdf():
    # 항상 이 파일(test_pdf_extractor.py) 기준 상대경로!
    current_dir = os.path.dirname(__file__)
    pdf_path = os.path.join(current_dir, "sample_resume.pdf")
    text = extract_text_from_pdf(pdf_path)
    print(text)
    assert text is not None

if __name__ == "__main__":
    test_sample_pdf()
