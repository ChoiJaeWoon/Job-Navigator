# 🧭 Backend 개발 워크플로 가이드 (FastAPI)

이 문서는 FastAPI 기반 백엔드 개발자가 따라야 할 **기본 작업 후납**을 안내합니다.
로컬 개발 환경에서 프로젝트를 실행하고, 테스트하고, 포맷팅 후 Git에 커미트/푸셔하는 전방적인 과정을 포함합니다.

---

## 📦 1. 개발 환경 준비

1. **의존성 설치**

```bash
python -m venv .venv       # 가상환경 생성
source .venv/bin/activate  # macOS/Linux
# 또는
.venv\Scripts\activate.bat  # Windows CMD
# 또는
.venv\Scripts\Activate.ps1  # Windows PowerShell

pip install --upgrade pip
pip install -r requirements.txt
```

2. **환경 변수 설정**

`.env` 파일을 생성하여 아래와 같이 입력하세요:

```env
APP_NAME="Job Navigator"
ENVIRONMENT=development
```

> `.env`는 로컬 전용이며 Git에 커미팅되지 않습니다.

---

## 🚀 2. 개발 서버 실행

```bash
uvicorn app.main:app --reload
```

### ▶️ 접속 경로

* 메인 페이지: [http://127.0.0.1:8000](http://127.0.0.1:8000)
* Swagger 문서: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🧪 3. 테스트 실행

```bash
pytest
```

> 테스트 코드는 `tests/` 디렉터리에 위치합니다.

---

## 🎨 4. 코드 포맷팅 (Black)

```bash
black .
```

> 커미트 전에 목적적으로 실행하여 코드 스타일을 통일하세요.

---

## 📂 5. Git 커미트 & 푸셔

```bash
git status          # 변경사항 확인
git add .           # 전체 변경사항 스테이지팅
git commit -m "✨ feat: 신규 API 추가"  # 커미트
git push origin main
```

> 커미트 메시지 접두사 예시:
>
> * `✨ feat`: 기능 추가
> * `🐛 fix`: 버그 수정
> * `🎨 style`: 포맷팅, 세미콬론 제거 등
> * `🧪 test`: 테스트 코드 추가
> * `🛠️ chore`: 설정, 빌드 관련 변경

---

## 🔄 전체 후납 요약

```bash
# 1. 초기사전: 경우 바꾸기 전에 현재 전수 확인
git pull origin main

# 2. 기능 개발
(코드 작업)

# 3. 포맷팅 및 테스트
black .
pytest

# 4. 커미트 및 푸셔
git add .
git commit -m "✨ feat: ..."
git push origin main
```

---

## 🙋‍♂️ 협업 시 유의사항

* 기능 단위로 커미트하고 명확한 메시지를 작성하세요.
* 포맷팅과 테스트는 PR 전에 목적적으로 실행해야 합니다.
* 협업을 할 경우 `main`대신 `feature/브랜치명`을 활용하면 좋습니다.

---

이 가이드는 **FastAPI를 처음 접하는 개발자**도 실수 없이 작업할 수 있도록 설계되어 있습니다.
필요할 경우 자신의 팀에 맞게 수정해서 타이르머리로 활용해보세요!
