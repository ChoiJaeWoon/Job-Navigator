## 📦 Job-Navigator 배포 가이드 (Naver Cloud VM 기준)

이 가이드는 Naver Cloud VM(Ubuntu 22.04 기준)에 React + FastAPI + PostgreSQL 기반의 Job-Navigator 프로젝트를 수동으로 배포하는 종착 절차를 설명합니다.

---

### 포함 요소

* **Frontend**: React (Vite 기반) → Nginx로 정적 파일 서비스
* **Backend**: FastAPI + Uvicorn → systemd 서비스 드림
* **DB**: PostgreSQL (VM에 로컬 설치)
* **Proxy**: Nginx (API 프로시 포팅 포함)

---

## 프로젝트 클론

```bash
git clone https://github.com/ChoiJaeWoon/Job-Navigator.git
cd Job-Navigator
```

---

## 페이스트 API 배포 (Backend)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# .env 파일에 PostgreSQL 정보 정의
```

### PostgreSQL 여발적 설치 + DB 만들기

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql

-- 사용자 및 DB 생성
CREATE USER jobnav_user WITH PASSWORD 'your_secure_password';
CREATE DATABASE jobnav_db OWNER jobnav_user;
GRANT ALL PRIVILEGES ON DATABASE jobnav_db TO jobnav_user;
```

### 서비스 드림 (systemd)

```ini
# /etc/systemd/system/jobnav-backend.service
[Unit]
Description=Job Navigator Backend API
After=network.target

[Service]
WorkingDirectory=/root/Job-Navigator/backend
ExecStart=/root/Job-Navigator/backend/.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reexec
sudo systemctl enable jobnav-backend
sudo systemctl start jobnav-backend
```

---

## React 프로파일 (Frontend)

```bash
cd frontend
npm install

# .env 설정
echo "VITE_API_BASE_URL=/api" > .env
npm run build
```

### Nginx에 정적 파일 서비스

```bash
sudo mkdir -p /var/www/jobnav-frontend
sudo cp -r dist/* /var/www/jobnav-frontend/
sudo chown -R www-data:www-data /var/www/jobnav-frontend
```

---

## Nginx 설정

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/jobnav-frontend;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/jobnav /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 정상 배포 확인

* 로커보드: http\://<서비 IP>/
* API: http\://<서비 IP>/api/v1/jobs
* DB 통인: `sudo -u postgres psql`, `\dt`

---

## 해당 파일의 SQL 데이터 적용 (예: 20250702)

```bash
psql -U jobnav_user -d jobnav_db -h localhost -f /root/Job-Navigator/backend/sql/20250702_db.sql
```
```bash
sudo -u postgres psql -d jobnav_db -f /root/Job-Navigator/backend/sql/20250705_db.sql
```

---

## DB 재적용 후 권한부여
### db 접속
```bash
sudo -u postgres psql -d jobnav_db
```
### 1. 모든 테이블에 INSERT, SELECT, UPDATE, DELETE 권한 부여
```bash
GRANT INSERT, SELECT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO jobnav_user;
```

### 2. 모든 시퀀스에 USAGE, SELECT, UPDATE 권한 부여
``` bash
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO jobnav_user;
```

### 3. 완료 후 종료
``` bash
\q
```

---

## 복잡 상황 검사

```bash
sudo journalctl -u jobnav-backend -f  # 배포 로그
sudo tail -n 50 /var/log/nginx/error.log  # nginx 오류
```
