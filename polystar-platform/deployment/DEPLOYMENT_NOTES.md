# POLYSTAR Deployment Notes

## Backend on Render

- Root directory: `polystar-platform`
- Build command:
  - `npm install --include=dev`
  - `npm run build --workspace shared`
  - `npm run build --workspace backend`
- Start command: `npm run start --workspace backend`
- Health check path: `/api/v1/health/live`
- Build artifact verified locally: `backend/dist/server.js`

Render must use the monorepo root above because the backend depends on the sibling `shared` workspace. Using `polystar-platform/backend` with workspace commands can fail or look for workspace metadata from the wrong directory.

## Frontend on Vercel

- Root directory: `polystar-platform/frontend`
- Framework: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: automatic
- Required public API variable: `NEXT_PUBLIC_API_URL`

The frontend references the official owner-provided PNG logo at `/brand/orginal%20logo11.png`; no generated SVG logo files should be used.
