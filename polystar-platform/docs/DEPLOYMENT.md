# Deployment Guide

## Docker Compose

```bash
cp .env.example .env
npm install
docker compose up --build
```

Frontend and backend local URLs should come from `.env` files during development.

## Vercel Frontend

Deploy the frontend as a separate Vercel project with:

- Framework: Next.js
- Root directory: `polystar-platform/frontend`
- Build command: `npm run build`
- Output directory: automatic

Set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_QR_COMPANY_PROFILE_URL`
- `GOOGLE_SEARCH_CONSOLE_VERIFICATION`

## Backend

Deploy only the backend to Render with:

- Root directory: `polystar-platform`
- Build command: `npm install --include=dev`, `npm run build --workspace shared`, then `npm run build --workspace backend`
- Start command: `npm run start --workspace backend`
- Health check path: `/api/v1/health/live`
- Node version: `22.x`

Required variables:

- `MONGODB_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `APP_URL`
- `FRONTEND_URL`
- `CLIENT_URL`
- `CORS_ORIGIN`
- `MAIL_FROM`
- `ADMIN_NOTIFICATION_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

Recommended variables:

- `MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1`
- `JWT_ACCESS_EXPIRES_IN=7d`
- `JWT_REFRESH_EXPIRES_IN=30d`
- `CAREERS_EMAIL`
- `LOG_LEVEL=info`
- Cloudinary variables when uploads are enabled.

`API_URL` is optional for the backend. `NEXT_PUBLIC_API_URL` on the frontend must include `/api/v1`.

## Cloud Integrations

- MongoDB Atlas stores platform data.
- Cloudinary handles media upload and transformation.
- Google Analytics loads through `GoogleAnalytics`.
- Google Maps is prepared through `GoogleMap`.
- Google Search Console verification is emitted through metadata.
