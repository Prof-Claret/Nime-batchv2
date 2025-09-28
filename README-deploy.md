# Deploy Guide (short)

## Frontend (Vercel)
- Push frontend to GitHub.
- In Vercel: New Project -> Import Git Repo -> set Build: `npm run build`, Output: `dist`.
- Add Environment Variable: `VITE_API_BASE` = `https://<your-backend-domain>/api`.

## Backend (Render)
- Push backend to GitHub.
- Create new Web Service, connect repo.
- Set Build Command: `npm ci`, Start Command: `node server.js`
- Add env vars: `MONGO_URI`, `JWT_SECRET`, `ADMIN_USER`, `ADMIN_PASSWORD`.
- Deploy.

