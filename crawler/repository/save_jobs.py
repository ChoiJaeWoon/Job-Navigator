# 💾 파일 경로: ai/crawler/repository/save_job.py
from sqlalchemy import text
from typing import List
import json
import re
from .database import engine  # ✅ 공통 DB 연결 모듈 import


def parse_experience(exp_text: str):
    """
    경력 텍스트를 기반으로 min/max 경력치를 추출합니다.
    """
    if not exp_text or "무관" in exp_text:
        return None, None

    exp_text = exp_text.replace(" ", "")
    has_entry = "신입" in exp_text
    numbers = list(map(int, re.findall(r'\d+', exp_text)))

    if has_entry:
        if numbers:
            return 0, numbers[0]  # 예: 신입~5년
        else:
            return 0, 0           # 예: 신입
    else:
        if len(numbers) == 1:
            return numbers[0], numbers[0]
        elif len(numbers) >= 2:
            return numbers[0], numbers[1]
        return None, None


def save_jobs_to_db(jobs: List[dict]):
    """
    크롤링된 채용 공고 리스트를 DB에 저장합니다.

    - URL 기준으로 기존 공고 존재 여부 판단
    - 기존 공고면 UPDATE, 신규 공고면 INSERT
    - 'is_active=True'로 저장 (모집 중 상태)
    - 기존 공고 중 이번에 발견되지 않은 URL은 is_active=False + due_date_text='모집마감' 처리
    """

    crawled_urls = [job["url"] for job in jobs]

    with engine.connect() as conn:
        # 1. 기존에 사라진 공고 → 모집 마감 처리
        inactive_stmt = text("""
            UPDATE jobs
            SET is_active = FALSE,
                due_date_text = '모집마감'
            WHERE is_active = TRUE
              AND url NOT IN :crawled_urls
        """)
        conn.execute(inactive_stmt, {"crawled_urls": tuple(crawled_urls)})

        # 2. 새로운 공고 insert 또는 update
        for job in jobs:
            job["tech_stack"] = json.dumps(job["tech_stack"])  # 리스트 → 문자열
            
            # 🔍 경력 파싱
            min_exp, max_exp = parse_experience(job.get("experience", ""))
            job["min_experience"] = min_exp
            job["max_experience"] = max_exp

            existing = conn.execute(
                text("SELECT COUNT(*) FROM jobs WHERE url = :url"),
                {"url": job["url"]}
            ).scalar()

            if existing == 0:
                stmt = text("""
                    INSERT INTO jobs (
                        title, company, location, experience,
                        tech_stack, due_date_text, url, job_type,
                        is_active, min_experience, max_experience
                    ) VALUES (
                        :title, :company, :location, :experience,
                        :tech_stack, :due_date_text, :url, :job_type,
                        :is_active, :min_experience, :max_experience
                    )
                """)
            else:
                stmt = text("""
                    UPDATE jobs
                    SET title = :title,
                        company = :company,
                        location = :location,
                        experience = :experience,
                        tech_stack = :tech_stack,
                        due_date_text = :due_date_text,
                        job_type = :job_type,
                        is_active = :is_active,
                        min_experience = :min_experience,
                        max_experience = :max_experience
                    WHERE url = :url
                """)

            conn.execute(stmt, job)

        conn.commit()

    print("✅ 크롤링 데이터 저장 + 경력 파싱 + 마감 처리 완료")
