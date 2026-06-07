# Environment Variables

Use `.env.example` as the local template. Production secrets belong in Render and Vercel dashboards, not in git.

## Backend on Render

Required for full production functionality:

- `NODE_ENV=production`
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

Safe defaults exist for public URLs and company metadata, so missing URL variables no longer crash startup. If `MONGODB_URI` is missing or unreachable, `/api/v1/health/live` still passes while `/api/v1/health` reports degraded database status. If JWT secrets are missing or too short, auth endpoints return a configuration error instead of issuing unsafe tokens.

Recommended backend variables:

- `APP_NAME`
- `PORT`
- `LOG_LEVEL`
- `MONGODB_DNS_SERVERS`
- `JWT_ACCESS_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`
- `CAREERS_EMAIL`
- `QR_COMPANY_PROFILE_URL`

Optional backend integrations:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Seed-only variables:

- `ADMIN_SEED_NAME`
- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_PASSWORD`
- `OWNER_SEED_NAME`
- `OWNER_SEED_EMAIL`
- `OWNER_SEED_PASSWORD`
- `PARTNER_SEED_NAME`
- `PARTNER_SEED_EMAIL`
- `PARTNER_SEED_PASSWORD`

## Frontend Hosting

Required for the deployed frontend:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`

Recommended frontend variables:

- `NEXT_PUBLIC_COMPANY_PHONE`
- `NEXT_PUBLIC_COMPANY_EMAIL`
- `NEXT_PUBLIC_COMPANY_LOCATION`
- `NEXT_PUBLIC_QR_COMPANY_PROFILE_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `GOOGLE_SEARCH_CONSOLE_VERIFICATION`

Optional frontend integrations:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## URL Handling

- Backend `API_URL` is optional and represents the backend origin, for example `https://polystar-nanotech.onrender.com`.
- Frontend `NEXT_PUBLIC_API_URL` must include the API version path, for example `https://polystar-nanotech.onrender.com/api/v1`.
- Backend CORS accepts `CORS_ORIGIN`, `CLIENT_URL`, `FRONTEND_URL`, and `APP_URL`. `CORS_ORIGIN` may be comma-separated.
