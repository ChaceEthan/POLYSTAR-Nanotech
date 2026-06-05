# POLYSTAR Platform Deployment Guide

This project is a three-workspace Node monorepo:

- `frontend`: Next.js application for Vercel
- `backend`: Express API for Render
- `shared`: shared TypeScript package used by both apps

Do not commit real `.env` secrets. Configure production environment variables in Vercel and Render dashboards.

## Frontend: Vercel

Vercel uses `frontend/vercel.json` when the project root is `polystar-platform/frontend`.

Build settings:

- Framework: Next.js
- Install command: `npm install`
- Root directory: `polystar-platform/frontend`
- Build command: `npm run build`
- Output directory: automatic
- Development command: `npm run dev`
- Node version: `22.x`

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

Render deploys only the backend service from the repository-root `render.yaml`.

Build settings:

- Runtime: Node
- Root directory: `polystar-platform/backend`
- Build command: `npm install && npm run build`
- Start command: `node dist/server.js`
- Health check path: `/api/v1/health`
- Node version: `22.x`

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

- Frontend URL from `NEXT_PUBLIC_SITE_URL`
- Backend health URL from `NEXT_PUBLIC_API_BASE_URL` plus `/health`
- Major pages: Home, About, Services, Projects, Portfolio, Blog, Contact, Admin Dashboard, Client Portal
