# Job-Navigator

> 채용공고 기반 기술 트렌드 분석 & AI 맞춤형 커리어 로드맵 생성 서비스

![Team Size](https://img.shields.io/badge/Team-4명-blue)
![Duration](https://img.shields.io/badge/기간-6주-green)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![Python](https://img.shields.io/badge/Python-51.3%25-3776AB)
![JavaScript](https://img.shields.io/badge/JavaScript-41.0%25-F7DF1E)

<div align="center">
  <img src="./frontend/public/logo.png" alt="Job-Navigator 로고" width="250"/><br>
</div>
<br>

## 📄 프로젝트 소개

### 배경 및 동기
<!-- ⚠️ 여기 수정: 본인 상황에 맞게 동기를 수정해주세요 -->
개발자 취업 준비 시 **"어떤 기술을 공부해야 하는가?"**라는 질문에 명확한 답을 내리기 어렵습니다.  
채용공고마다 요구 기술이 다르고, 시장 트렌드는 빠르게 변하기 때문입니다.  
이 프로젝트는 **실제 채용공고 데이터를 수집·분석**하고, 개인 이력서와의 **기술 격차를 정량적으로 측정**하여  
AI 기반 맞춤형 커리어 로드맵을 자동 생성함으로써 이 문제를 해결합니다.

### 핵심 요약
- **서비스명**: 개발자를 위한 직무 트렌드 분석 및 OpenAI API를 통한 커리어 로드맵 생성 서비스
- **프로젝트 기간**: `2025. 05. 23 ~ 2025. 07. 09` (6주)
- **팀 구성**: 4인 (PM/Back-end 1 · Data Modeling 1 · Front-end 2)
<br>

## 👤 나의 역할 & 기여

> **최재웅** — PM / Back-end / DB 설계

| 구분 | 담당 내용 |
|:---:|-----------|
| **프로젝트 관리** | 프로젝트 기획, 일정/이슈 관리, 팀 리드 |
| **백엔드 아키텍처** | FastAPI 기반 REST API 설계 및 전체 서버 구현 |
| **DB 설계** | PostgreSQL 스키마 설계, 채용공고 데이터 저장 구조 설계 |
| **핵심 로직 개발** | 사용자 이력서 ↔ 채용공고 간 기술 매칭 로직 개발 |
| **데이터 시각화** | 기술 격차 분석 결과 차트 개발 |
| **인증/인가** | 로그인·회원가입 기능 구현 |
| **배포** | Docker + Naver Cloud Platform 배포 환경 구성 |

<br>

## ⚙ 주요 기능
| 기능 | 설명 |
|------|------|
| **이력서 기술 키워드 추출** | 사용자의 PDF 이력서에서 주요 기술 키워드를 자동 추출하여 분석에 활용 |
| **채용공고 트렌드 분석** | 최근 채용공고 데이터를 수집·집계하여 직무별 인기 기술 스택 트렌드 시각화 |
| **기술 격차 분석 및 매칭** | 이력서와 채용공고 간 기술 스택을 비교하여 개인의 부족 기술을 정량적으로 분석 |
| **GPT 기반 커리어 로드맵** | 기술 격차 결과를 바탕으로 OpenAI API를 통해 개인 맞춤형 커리어 로드맵 자동 생성 |
<br>

## 🛠 기술 스택

| 구분               | 사용 기술 |
|--------------------|-----------|
| **Back-end**       | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) |
| **Front-end**      | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) |
| **Database**       | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white) |
| **Library & API**  | ![SentenceTransformers](https://img.shields.io/badge/Sentence_Transformers-FFB000?style=flat) ![MLflow](https://img.shields.io/badge/MLflow-0194E2?style=flat) |
| **IDE**            | ![Visual Studio Code](https://img.shields.io/badge/VSCode-007ACC?style=flat&logo=visualstudiocode&logoColor=white) |
| **Deployment**     | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) |
| **Cloud**          | ![Naver Cloud](https://img.shields.io/badge/Naver_Cloud_Platform-03C75A?style=flat) |
| **Version Control**| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) |
<br>

## 🏗 시스템 아키텍처
![찐완성 drawio](https://github.com/user-attachments/assets/d3e6d153-19f4-4e44-8713-1d373bc14628)

<br><br>

## 📁 프로젝트 구조
```
Job-Navigator/
├── backend/        # FastAPI 백엔드 서버 (REST API, 인증, 기술 매칭 로직)
├── frontend/       # React + Vite 프론트엔드
├── crawler/        # 채용공고 크롤링 파이프라인
├── experiments/    # ML 모델 실험 및 성능 비교
├── docs/           # 프로젝트 산출물 문서
├── docker-compose.yml
├── Makefile
└── README.md
```
<br>

### 실험 목적
이력서에서 **기술 키워드를 정확하게 추출**하기 위한 최적의 모델을 선정하기 위해  
3가지 접근 방식(사전 기반+Sentence Transformer, KeyBERT, NER)을 비교 실험했습니다.

### 실험 결과
![모델 실험 결과](https://github.com/user-attachments/assets/cadda34f-5d7b-450b-8501-a95e16b1353e)

- 샘플 문장 **300개**를 기준으로 3개 모델의 성능을 비교
- **MLflow**를 활용하여 실험을 추적하고 객관적인 지표 기반으로 평가
- KeyBERT, NER 모델 대비 **사전 기반 + Sentence Transformer** 조합이 **F1 Score 94%**로 가장 우수하여 최종 채택

<br>

## 📌 유스케이스
![image](https://github.com/user-attachments/assets/54b3c2ed-6d0f-4941-89a9-330f3ff131f3)
<br><br>

## 🔁 서비스 흐름도
![image](https://github.com/user-attachments/assets/c59c2937-dc57-4dd6-8ee8-de8f6d296041)
<br><br>

## 🧩 ER 다이어그램
![image](https://github.com/user-attachments/assets/fac320c7-d18b-41b9-9797-2f83c3c68ea3)
<br><br>

<details>
<summary><b>📸 전체 화면 스크린샷 보기 (클릭하여 펼치기)</b></summary>
<br>

| 메인페이지 |
|--------|
| <img src="https://github.com/user-attachments/assets/8c55d5dc-c225-4d48-b7ee-7c99eb083f3f" alt="메인페이지" width="900"/> |
<br>

| 소셜 로그인 |
|--------|
| <img src="https://github.com/user-attachments/assets/2c642fd2-bd41-400b-94b1-7f62aeff391a" alt="소셜 로그인" width="900"/> |
<br>


| 트렌드 분석 |
|--------|
| <img src="https://github.com/user-attachments/assets/33556d6c-ee4c-4a1e-bc3e-770f408f457d" alt="트렌드 분석" width="900"/> |
<br>


| 채용 공고 |
|--------|
| <img src="https://github.com/user-attachments/assets/c3ae4e42-47ab-43fe-a24e-672cc5d4e9f6" alt="채용 공고" width="900"/> |
<br>

| 이력서 분석 |
|--------|
| <img src="https://github.com/user-attachments/assets/5c05a8da-156c-4780-bc73-834b8b14fb9f" alt="이력서 분석" width="900"/> |
<br>

| 커리어 로드맵(이력서 분석 결과) |
|--------|
| <img src="https://github.com/user-attachments/assets/b90a6a0b-8cab-43a6-96a7-23a69e2afded" alt="커리어 로드맵" width="900"/> |

</details>
<br>


## 👥 팀원 역할

| 역할 | 최재웅 <br>(PM, Back-end, DB) | 문은지 <br>(Data Modeling) | 손준섭 <br>(Frontend) | 손현수 <br>(Frontend) |
|-----------|-----------------------------|------------------------------|--------------------------|---------------------------|
| **Main** | - 프로젝트 기획 및 백엔드 아키텍처 설계<br>- 채용공고 데이터 수집 및 저장 구조 설계<br>- 사용자 입력 및 기술 매칭 로직 개발<br>- 기술 격차 시각화 차트 개발 | - 발표자<br>- 채용공고 크롤링 및 전처리 파이프라인 구현<br>- 사전 기반 키워드 매칭 로직 개발<br>- 임베딩 기반 유사도 분석 설계 | - UX/UI 설계 및 문서화<br>- 로그인 및 소셜 로그인 기능 개발<br>- 기술 선택 UI 및 인터랙션 개발 | - 메인 화면 설계 및 구현<br>- PDF 이력서 파일 분석 페이지 구현<br>- 기술 트렌드 시각화 UI 구현<br>- 마이페이지 구현 |
| **Sub** | - 로그인, 회원가입<br>- 외적 UI 구성 <br>- 서버 구현, DB 구성 | - 이미지 업로드, 분석 결과 출력<br>- 실시간 분석 구현 | - 분석 결과 출력<br>- 시현영상 제작 | - 산출문서 담당 <br>-프로젝트 기획서 작성 |
| **GitHub** | [최재웅](https://github.com/ChoiJaeWoon) | [문은지](https://github.com/EunJ3) | [손준섭](https://github.com/sjs4273) | [손현수](https://github.com/sonhyunsoo715) |
<br>



## ❗ 트러블슈팅

### 문제 1: 보안 프로토콜 문제 (HTTPS / Mixed Content)
| 구분 | 내용 |
|:---:|------|
| **상황** | 프론트엔드(HTTPS)에서 백엔드(HTTP) API 호출 시 Mixed Content 에러 발생 |
| **원인** | Naver Cloud 배포 환경에서 백엔드 서버에 SSL 인증서가 적용되지 않아 HTTPS ↔ HTTP 간 통신 차단 |
| **해결** | SSL 인증서 적용 및 Nginx 리버스 프록시를 통한 HTTPS 통합 구성 |

<img src="https://github.com/user-attachments/assets/a7d826a5-6ac5-4a24-96d2-366212aa7a19" alt="백엔드 트러블슈팅" width="600"/>
<br><br>

### 문제 2: 보안 토큰 관리 문제 (JWT Token)
| 구분 | 내용 |
|:---:|------|
| **상황** | 소셜 로그인 후 JWT 토큰이 안전하게 관리되지 않아 보안 취약점 발생 |
| **원인** | 토큰을 LocalStorage에 평문 저장하여 XSS 공격에 노출 가능성 |
| **해결** | HttpOnly Cookie 기반 토큰 저장 방식으로 변경하고, Refresh Token 로테이션 적용 |

<img src="https://github.com/user-attachments/assets/cb348977-bb6b-40dd-a182-3ccfb9fdf4d1" alt="프론트 트러블슈팅" width="600"/>
<br><br>

### 문제 3: 적합한 텍스트 분석 모델 선정
| 구분 | 내용 |
|:---:|------|
| **상황** | 이력서에서 기술 키워드를 추출하기 위한 텍스트 분석 모델 선정이 필요했으나, 모델 종류·입력 언어·텍스트 길이에 따라 성능 차이가 크게 발생 |
| **원인** | KeyBERT, NER 등 각 모델이 한국어 이력서 텍스트의 특성(혼합 언어, 다양한 문장 길이)에 대해 상이한 정확도를 보이며 일관된 추출 결과를 내지 못함 |
| **해결** | 3개 모델(사전 기반+Sentence Transformer, KeyBERT, NER)을 300개 샘플로 MLflow 기반 객관적 비교 평가 수행 → F1 Score 94%의 사전 기반+Sentence Transformer 조합이 가장 우수하여 최종 채택 |

<img src="https://github.com/user-attachments/assets/b45024c1-f6d1-4fd7-8386-d4e3f13bebaa" alt="AI 트러블슈팅" width="600"/>
<br><br>
