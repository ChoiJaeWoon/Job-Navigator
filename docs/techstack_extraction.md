# 📅 2025-06-12 기술스택 추출 기능 개발 및 실행 매뉴얼

---

**오늘 작업한 주요 변경사항 요약**

- PDF 업로드 기능 구현
- 기술스택 추출 엔진 구축 (PyMuPDF + NLTK + sentence-transformers)
- FastAPI 라우터 구조화 및 API 생성
- React 프론트엔드 업로드 연동
- CORS 정책 적용으로 프론트-백엔드 통신 완전 연동
- 브랜치: `feature/extract-techstack` 작업 완료

---

## ✅ 사전 준비물

| 준비 항목 | 설명 |
|---|---|
| VSCode | 설치 필요 |
| Git | 설치 필요 |
| Python 3.10 이상 | 설치 필요 |
| Node.js & npm | 설치 필요 (프론트 실행용) |

---

## ✅ 백엔드 실행 (FastAPI 기준)

### 1️⃣ 터미널 열기

- VSCode 상단 메뉴 → `Terminal > New Terminal`

### 2️⃣ backend 폴더로 이동

```bash
cd backend
```

### 3️⃣ 가상환경 생성 (윈도우 기준)
```bash
python -m venv .venv
```

### 4️⃣ 가상환경 활성화 (윈도우 기준)
```bash
.venv\Scripts\activate
```

### 5️⃣ 라이브러리 설치
```bash
pip install -r requirements.txt
```

### 6️⃣ 백엔드 서버 실행
```bash
uvicorn app.main:app --reload
```

---

## ✅ 프론트엔드 실행 (React + Vite)

### 1️⃣ 새 터미널 열기 (VSCode 내에서)
```bash
cd frontend
```

### 2️⃣ 라이브러리 설치
```bash
npm install
```

### 3️⃣ 프론트 서버 실행
``` bash
npm run dev
```

---

## ✅ 서버 종료 방법
- 실행 중인 터미널에서 Ctrl + C 입력

---