# Anime Batch Portal 

Includes:
- Backend: Node.js + Express + MongoDB (+ input validation, logging)
- Frontend: React + Vite + Tailwind (+ Admin UI, search/filter/pagination)
- Auth: JWT for admin
- Docker: docker-compose for dev
- Deploy: instructions for Vercel (frontend) and Render (backend) and example `render.service.yaml`

## Quick dev (without docker)
- Backend:
  - cd backend
  - copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`
  - npm install
  - npm run seed-admin (creates admin from env)
  - npm run dev

- Frontend:
  - cd frontend
  - copy `.env.example` and set `VITE_API_BASE` to your backend (e.g. http://localhost:4000/api)
  - npm install
  - npm run dev

## Docker (dev)
- Ensure Docker is installed.
- From repo root:
  - docker-compose up --build

## Deploy
- Frontend: push to GitHub → Import project on Vercel (build: `npm run build`, output: `dist`) → set `VITE_API_BASE` env var to Render backend URL.
- Backend: push to GitHub → Create Web Service on Render (or use `render.service.yaml`).

