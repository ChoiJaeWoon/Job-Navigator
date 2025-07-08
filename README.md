# 요즘머함 (팀명: JOB아줘)
<div align="center">
  <img src="./frontend/public/logo.png" alt="로고" width="250"/><br>
</div>
<br>

## 📄 서비스 소개
- 서비스 명: 개발자를 위한 직무 트렌드 분석 및 OpenAI API를 통한 커리어 로드맵 생성 서비스
  - 직무별 기술 트렌드와 개인 이력서를 기반으로 개인 맞춤형 커리어 로드맵을 생성
  - 개발자의 기술 격차를 정량적으로 분석해 학습 방향을 제시하여 실무 역량 강화 및 취업 준비 효율성 향상
  - 데이터 기반 커리어 설계를 통해 불확실성을 줄이고, 자기주도적인 성장 전략 수립을 지원
<br>

## ⏳ 프로젝트 기간
`2025. 05. 23 ~ 2025. 07. 09`
<br><br>

## ⚙ 주요 기능
- 이력서 기반 기술 키워드 추출
  - 사용자의 PDF 이력서에서 주요 기술 키워드를 자동 추출하여 분석에 활용
- 채용공고 트렌드 분석
  - 최근 채용공고 데이터를 수집·집계하여 직무별 인기 기술 스택 트렌드 시각화
- 기술 격차 분석 및 매칭
  - 이력서와 채용공고 간 기술 스택을 비교하여 개인의 부족 기술을 정량적으로 분석
- GPT 기반 커리어 로드맵 생성
  - 기술 격차 결과를 바탕으로 OpenAI API를 통해 개인 맞춤형 커리어 로드맵 자동 생성
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

<br><br>

## 🏗 시스템 아키텍처
![찐완성 drawio](https://github.com/user-attachments/assets/d3e6d153-19f4-4e44-8713-1d373bc14628)

## 📈 모델 실험 내용
![KakaoTalk_20250708_091423950](https://github.com/user-attachments/assets/cadda34f-5d7b-450b-8501-a95e16b1353e)

- 사전 기반+sentence transformer 모델, keyBERT 모델, NER모델을 샘플 문장 300개를 가지고 테스트
- 사전 기반+sentence transformer 모델의 f1 score가 94%이므로 MLflow 기반 객관적인 모델을 선택
<br><br>

## 📌 유스케이스
![image](https://github.com/user-attachments/assets/54b3c2ed-6d0f-4941-89a9-330f3ff131f3)
<br><br>

## 🔁 서비스 흐름도
![image](https://github.com/user-attachments/assets/c59c2937-dc57-4dd6-8ee8-de8f6d296041)
<br><br>

## 🧩 ER 다이어그램
![image](https://github.com/user-attachments/assets/fac320c7-d18b-41b9-9797-2f83c3c68ea3)
<br><br>

## 🎨 화면 구성

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
<br>


## 👥 팀원 역할
- 예시입니다. 수정 해주세염

| 역할 | 최재웅 <br>(PM, Back-end, DB) | 문은지 <br>(Data Modeling) | 손준섭 <br>(Frontend) | 손현수 <br>(Frontend) |
|-----------|-----------------------------|------------------------------|--------------------------|---------------------------|
| **Main** | - 프로젝트 기획 및 백엔드 아키텍처 설계<br>- 채용공고 데이터 수집 및 저장 구조 설계<br>- 사용자 입력 및 기술 매칭 로직 개발<br>- 기술 격차 시각화 차트 개발 | - 발표자<br>- 채용공고 크롤링 및 전처리 파이프라인 구현<br>- 사전 기반 키워드 매칭 로직 개발<br>- 임베딩 기반 유사도 분석 설계 | - UX/UI 설계 및 문서화<br>- 로그인 및 소셜 로그인 기능 개발<br>- 기술 선택 UI 및 인터랙션 개발 | - 메인 화면 설계 및 구현<br>- PDF 이력서 파일 분석 페이지 구현<br>- 기술 트렌드 시각화 UI 구현<br>- 마이페이지 구현 |
| **Sub** | - 로그인, 회원가입<br>- 외적 UI 구성 <br>- 서버 구현, DB 구성 | - 이미지 업로드, 분석 결과 출력<br>- 실시간 분석 구현 | - 분석 결과 출력<br>- 시현영상 제작 | - 산출문서 담당 <br>-프로젝트 기획서 작성 |
| **GitHub** | [GitHub 링크](https://github.com/ChoiJaeWoon) | [GitHub 링크](https://github.com/EunJ3) | [GitHub 링크](https://github.com/sjs4273) | [GitHub 링크](https://github.com/sonhyunsoo715) |
<br>



## ❗ 트러블슈팅
- 문제 1 : 보안 프로토콜 문제
<img src="https://github.com/user-attachments/assets/a7d826a5-6ac5-4a24-96d2-366212aa7a19" alt="백엔드 트러블슈팅" width="600"/>
<br><br><br>


- 문제 2 : 보안 토큰 관리 문제
<img src="https://github.com/user-attachments/assets/cb348977-bb6b-40dd-a182-3ccfb9fdf4d1" alt="프론트 트러블슈팅" width="600"/>
<br><br><br>

- 문제 3 : 적합한 모델 선정에 관한 문제
  - 사전 기반+sentence transformer 모델, keyBERT 모델, NER모델을 샘플 문장 300개를 가지고 테스트
  - 사전 기반+sentence transformer 모델의 f1 score가 94%이므로 MLflow 기반 객관적인 모델을 선택
<img src="https://github.com/user-attachments/assets/4a249bfa-8c39-48de-bf9a-79ef4736223a" alt="AI 트러블슈팅" width="600"/>
<br><br><br>
