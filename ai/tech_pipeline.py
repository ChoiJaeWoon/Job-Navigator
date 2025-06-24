from pathlib import Path
from typing import Union, List, Dict
from ai.pdf_extractor import extract_text_from_pdf
from ai.tech_extract import (
    extract_tech_keywords_union,
    normalize,
    normalize_tech_name,
    recommend_best_job,
    filter_by_job,
    get_top_used_skills,
    filter_appeared_in_text,
    TECH_STACK,
)


def run_tech_pipeline(pdf_path: Union[str, Path]) -> Dict:
    """
    PDF 이력서 파일 1개에 대해 기술스택 추출 전체 파이프라인 실행

    Args:
        pdf_path (str | Path): PDF 파일 경로

    Returns:
        dict: 분석 결과 (raw 기술, 실제 등장 기술, 직무, 직무 기술, Top 7 등)
    """
    path = Path(pdf_path)
    text = extract_text_from_pdf(str(path))

    if not text.strip():
        raise ValueError("❌ PDF에서 텍스트를 추출하지 못했습니다.")

    raw_techs = extract_tech_keywords_union(text, TECH_STACK)
    norm_text = normalize(text)
    appeared_techs = [t for t in raw_techs if normalize(t) in norm_text]

    job = recommend_best_job(text, raw_techs)
    job_techs = filter_by_job(appeared_techs, job)
    top_skills = get_top_used_skills(text, job_techs, top_n=7)

    return {
        "file_name": path.name,
        "raw_techs": raw_techs,
        "appeared_techs": appeared_techs,
        "job": job,
        "job_techs": job_techs,
        "top_skills": top_skills,
    }
