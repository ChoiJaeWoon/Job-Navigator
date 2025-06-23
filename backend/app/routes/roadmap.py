from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

# 요청 데이터 모델
class RoadmapRequest(BaseModel):
    job: str
    skills: List[str]

# 응답 데이터 예시 (원하면 수정 가능)
class RoadmapResponse(BaseModel):
    gap_score: int
    recommended_skills: List[str]
    expected_learning_time: str

@router.post("/roadmap", response_model=RoadmapResponse)
async def generate_roadmap(data: RoadmapRequest):
    # 여기에 실제 분석 로직 넣기
    print(f"직무: {data.job}, 선택 기술: {data.skills}")

    return RoadmapResponse(
        gap_score=70,
        recommended_skills=["Docker", "CI/CD", "Redis"],
        expected_learning_time="2개월"
    )
