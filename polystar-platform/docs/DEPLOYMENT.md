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
- `CLIENT_URL`
- `CORS_ORIGIN`
- `APP_URL`
- `API_URL`
- `FRONTEND_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- Cloudinary variables when uploads are enabled.

## Cloud Integrations

- MongoDB Atlas stores platform data.
- Cloudinary handles media upload and transformation.
- Google Analytics loads through `GoogleAnalytics`.
- Google Maps is prepared through `GoogleMap`.
- Google Search Console verification is emitted through metadata.
