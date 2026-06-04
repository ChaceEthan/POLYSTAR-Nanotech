# Deployment Guide

## Docker Compose

```bash
cp .env.example .env
npm install
docker compose up --build
```

Frontend runs on `http://localhost:3000`; backend runs on `http://localhost:5000/api/v1`.

## Vercel Frontend

Use `deployment/vercel.json` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_QR_COMPANY_PROFILE_URL`
- `GOOGLE_SEARCH_CONSOLE_VERIFICATION`

## Backend

Deploy `backend` to a Node.js host or container platform. Required variables:

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `CORS_ORIGIN`
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
