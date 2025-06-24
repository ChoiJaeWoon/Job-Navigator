import re
from typing import List
from collections import Counter
from sentence_transformers import SentenceTransformer, util
import numpy as np
from ai.tech_dict import TECH_STACK, JOB_TECH_MAP, TECH_EQUIVALENTS


# --- 정규화 함수 (띄어쓰기, 하이픈, 언더바 제거 + 소문자) ---
def normalize(s: str) -> str:
    return re.sub(r"[\s\-_]", "", s).lower()


# --- 기술명 정규화: 변형 표현을 표준 이름으로 매핑 ---
def normalize_tech_name(name: str) -> str:
    raw = normalize(name)
    for standard, variants in TECH_EQUIVALENTS.items():
        if raw in {normalize(v) for v in variants}:
            return standard
    return name


# --- 기술 중복 제거 (정규화 기준) ---
def deduplicate_tech_stack(raw_list: List[str]) -> List[str]:
    """
    기술 리스트를 normalize 기준으로 중복 제거하고 표준 기술명으로 반환.
    normalize된 키가 TECH_EQUIVALENTS에 매핑되면 표준명을, 없으면 원본 유지.
    """
    normalized = {}
    for tech in raw_list:
        norm = normalize_tech_name(tech)
        if norm not in normalized:
            normalized[norm] = tech  # fallback으로 raw 기술 유지
    return sorted(set(normalized.values()))


# --- 정확 일치 추출 ---
def extract_tech_keywords(text: str, tech_stack=TECH_STACK) -> List[str]:
    found = set()
    for tech in tech_stack:
        if re.search(r"\b" + re.escape(tech) + r"\b", text, re.IGNORECASE):
            found.add(tech)
    return sorted(found)


# --- 임베딩 기반 유사 추출 ---
def embedding_based_matching(
    text: str, tech_stack=TECH_STACK, threshold=0.6
) -> List[str]:

    model = SentenceTransformer(
        "paraphrase-multilingual-MiniLM-L12-v2"
    )  # "all-MiniLM-L6-v2"
    words = set(re.split(r"[^a-zA-Z0-9.#]+", text))
    words = [w for w in words if len(w) > 1]
    if not words:
        return []

    word_embs = model.encode(words)
    tech_embs = model.encode(tech_stack)
    sim_matrix = util.cos_sim(word_embs, tech_embs).cpu().numpy()

    matches = set()
    for i, word in enumerate(words):
        best_idx = np.argmax(sim_matrix[i])
        if sim_matrix[i][best_idx] >= threshold:
            matches.add(tech_stack[best_idx])
    return sorted(matches)


# --- 정규화 + n-gram + 임베딩 기반 robust 추출 ---
def embedding_matching_with_combo(
    text: str, tech_stack=TECH_STACK, threshold=0.75
) -> List[str]:

    tech_norm_map = {}
    for t in tech_stack:
        n = normalize(t)
        tech_norm_map.setdefault(n, []).append(t)
    tech_stack_norm = list(tech_norm_map.keys())

    words = re.split(r"[^a-zA-Z0-9.#]+", text)
    words = [w for w in words if w]
    ngram_tokens = set()
    for n in range(1, 4):
        for i in range(len(words) - n + 1):
            combo = "".join(words[i : i + n])
            ngram_tokens.add(combo.lower())

    if not ngram_tokens:
        return []

    model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
    token_embs = model.encode(list(ngram_tokens))
    tech_embs = model.encode(tech_stack_norm)
    sim_matrix = util.cos_sim(token_embs, tech_embs).cpu().numpy()

    matches = set()
    ngram_tokens_list = list(ngram_tokens)
    for i, token in enumerate(ngram_tokens_list):
        best_idx = np.argmax(sim_matrix[i])
        if sim_matrix[i][best_idx] >= threshold:
            matched_norm = tech_stack_norm[best_idx]
            matches.update(tech_norm_map[matched_norm])
    return sorted(matches)


# --- 통합 추출 함수 ---
def extract_tech_keywords_union(
    text: str, tech_stack=TECH_STACK, threshold=0.75
) -> List[str]:
    exact = set(extract_tech_keywords(text, tech_stack))
    embed = set(embedding_based_matching(text, tech_stack, threshold))
    robust = set(embedding_matching_with_combo(text, tech_stack, threshold))
    return deduplicate_tech_stack(sorted(exact | embed | robust))


# --- 직무별 기술 필터링 ---
def filter_by_job(techs: list, job: str, job_map=JOB_TECH_MAP) -> list:
    job_norm_map = {normalize(k): k for k in job_map.get(job, [])}
    job_norm_set = set(job_norm_map.keys())

    result = []
    for t in techs:
        t_norm = normalize(t)
        if t_norm in job_norm_set:
            result.append(job_norm_map[t_norm])
    return sorted(set(result))


# --- 대표 직무 추천 (빈도 상관 없음) ---
def recommend_best_job(resume_text, techs, job_map=JOB_TECH_MAP):
    best_job, max_count, best_skills = None, 0, []
    for job, keywords in job_map.items():
        job_skills = filter_by_job(techs, job, job_map)
        if len(job_skills) > max_count:
            best_job = job
            best_skills = job_skills
            max_count = len(job_skills)
    return best_job


# --- 실제 등장한 기술 중 빈도순 정렬 (정규화된 표준 기술명 기준) ---
def get_top_used_skills(text: str, techs: List[str], top_n=7):
    counts = Counter()
    for k in techs:
        standard = normalize_tech_name(k)
        counts[standard] = len(
            re.findall(r"\b" + re.escape(standard) + r"\b", text, re.IGNORECASE)
        )
        if counts[standard] == 0:
            counts[standard] = len(re.findall(normalize(standard), normalize(text)))
    return [t for t, _ in counts.most_common(top_n)]


# --- 실제 등장한 기술 필터 ---
def filter_appeared_in_text(skills, text):
    norm_text = normalize(text)
    result = []
    for k in skills:
        if normalize(k) in norm_text:
            result.append(k)
    return result
