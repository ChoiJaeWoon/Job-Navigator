# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# 명시적으로 vite 설치 (중복 방지용 캐시 최적화 고려)
RUN npx vite --version || npm install -D vite

CMD ["npx", "vite"]
