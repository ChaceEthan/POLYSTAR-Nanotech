# POLYSTAR Platform Deployment Guide

This project is a three-workspace Node monorepo:

- `frontend`: Next.js application for Vercel
- `backend`: Express API for Render
- `shared`: shared TypeScript package used by both apps

Do not commit real `.env` secrets. Configure production environment variables in Vercel and Render dashboards.

## Frontend: Vercel

Vercel uses `vercel.json` at the repository root.

Build settings:

- Framework: Next.js
- Install command: `npm install`
- Build command: `npm run build --workspace shared && npm run build --workspace frontend`
- Output directory: `frontend/.next`
- Development command: `npm run dev --workspace frontend`

Required Vercel environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `GOOGLE_SEARCH_CONSOLE_VERIFICATION` when Google verification is ready
- Optional analytics/maps/recaptcha variables when those integrations are enabled

Post-deploy checks:

- `/`
- `/about`
- `/services`
- `/projects`
- `/portfolio`
- `/blog`
- `/contact`
- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`

## Backend: Render

Render uses `render.yaml` at the repository root.

Build settings:

- Runtime: Node
- Root directory: `.`
- Build command: `npm install && npm run build --workspace shared && npm run build --workspace backend`
- Start command: `npm run start --workspace backend`
- Health check path: `/api/v1/health`

Required Render environment variables:

- `NODE_ENV=production`
- `MONGODB_URI`
- `MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1`
- `JWT_ACCESS_SECRET`
- `JWT_ACCESS_EXPIRES_IN`
- `JWT_REFRESH_SECRET`
- `JWT_REFRESH_EXPIRES_IN`
- `CLIENT_URL`
- `CORS_ORIGIN`
- `APP_URL`
- `API_URL`
- `MAIL_FROM`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `GOOGLE_RECAPTCHA_SECRET_KEY` when recaptcha enforcement is enabled

Post-deploy checks:

- `GET /api/v1/health` returns `{"status":"ok","database":"connected"}`
- `GET /api/v1/dashboard/summary` returns counts for an admin token
- `POST /api/v1/upload` returns a Cloudinary secure URL for an authenticated upload
- Client portal endpoints return real API-backed lists or empty states

## Local Release Gate

Run before pushing deployment changes:

```bash
npm install
npm dedupe
npm ls
npm run lint
npm run typecheck
npm run build
npm run dev
```

Then verify:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000/api/v1/health`
- Major pages: Home, About, Services, Projects, Portfolio, Blog, Contact, Admin Dashboard, Client Portal
