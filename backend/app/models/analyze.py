# app/models/analyze.py

from pydantic import BaseModel
from typing import List

class Paragraph(BaseModel):
    paragraph_id: int
    content: str

class PDFExtractResult(BaseModel):
    file_name: str
    paragraphs: List[Paragraph]
