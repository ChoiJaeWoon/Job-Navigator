# 이 파일은 기술스택 추출 엔진의 로직을 담당
# 사전 기반(Tech_stack) + 임베딩 기반 유사도 매칭

import fitz # PDF 추출을 위한 PyMuPDF 패키지
import re   # 정규표현식 활용
import nltk # 문장 분리를 위한 NLTK 패키지
import numpy as np # 벡터 계산을 위한 numpy
from nltk.tokenize import sent_tokenize # 문장 분리
from sentence_transformers import SentenceTransformer # 임베딩 모델
from sklearn.metrics.pairwise import cosine_similarity # 코사인 유사도 계산
from app.tech_stack import TECH_STACK # 기술스택 사전 불러오기
import traceback

# NLTK에서 punkt 토크나이저 다운로드
nltk.download('punkt')
nltk.download('punkt_tab')

# PDF 파일에서 전체 텍스트 추출
def extract_text_from_pdf(pdf_path: str) -> str:
    """
    PDF 경로를 받아서 전체 텍스트를 추출하는 함수
    """
    text = ""
    doc = fitz.open(pdf_path) # pdf경로를 가져와서 열기
    for page in doc: # 페이지 단위로 반복
        text += page.get_text() # 페이지에서 텍스트 추출
    return text

# 사전 기반 매칭 (정확 일치 기반 키워드 매칭)
def dictionary_based_matching(text: str, tech_stack: list) -> list:
    """
    사전에 정의된 기술스택 리스트를 기준으로 정확히 일치하는 키워드 추출
    """
    found = []
    for tech in tech_stack:
        # \b를 사용해서 단어 경계에서 정확히 일치하는 경우만 추출
        """
        문장:   "나는 Python을 사용합니다"
                 ^    ^         ^
        단어경계: \b  Python  \b
        """
        if re.search(rf'\b{re.escape(tech)}\b', text, re.IGNORECASE):
            found.append(tech)
    return list(set(found)) # 중복 제거 후 반환

# 임베딩 기반 문자 유사도 매칭 (문맥 기반 유사도 근접 키워드 추출)
def embedding_based_matching(text: str, tech_stack: list, threshold: float=0.35) -> list:
    """
    문장 임베딩과 기술 키워드 임베딩 간 유사도 비교를 통해 키워드를 추출
    """
    # 사전학습된 경량 임베딩 모델 로드 (최초 1회 로드)
    model = SentenceTransformer('all-MiniLM-L6-v2')

    # 전체 텍스트를 문장 단위로 분할
    sentences = sent_tokenize(text)

    # 문장 단위 임베딩 계산
    sentence_embeddings = model.encode(sentences)

    # 기술 스택 키워드 리스트 전체 임베딩
    keyword_embeddings = model.encode(tech_stack)

    extracted = set() # 중복 방지

    # 각 문장 임베딩별로 기술스택 임베딩과 유사도 비교
    for sentence_embedding in sentence_embeddings:
        sims = cosine_similarity([sentence_embedding], keyword_embeddings)[0]
        for tech, score in zip(tech_stack, sims):
            if score >= threshold: # 유사도가 threshold 이상인 경우만 추출
                extracted.add(tech)
    
    return list(extracted)

# 최종 파이프라인 (사전 + 임베딩)
def extract_keywords(pdf_path: str) -> list:
    """
    전체 기술스택 추출 파이프라인:
    1. PDF -> 텍스트 추출
    2. 사전 기반 매칭
    3. 임베딩 기반 매칭
    4. 통합 후 중복 제거
    """
    try:
        # PDF -> 텍스트 추출
        text = extract_text_from_pdf(pdf_path)

        # 사전 기반 추출
        dict_match = dictionary_based_matching(text, TECH_STACK)

        # 임베딩 기반 추출
        embed_match = embedding_based_matching(text, TECH_STACK)

        # 두 결과 통합 (중복제거)
        total = list(set(dict_match + embed_match))

        return total
    except Exception as e:
        print("🔥🔥🔥 [extract_keywords] 에러 발생!")
        traceback.print_exc()
        raise e