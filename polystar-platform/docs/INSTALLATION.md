# Installation Guide

```bash
cd polystar-platform
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Scripts

- `npm run dev`: starts backend and frontend.
- `npm run build`: builds shared, backend, and frontend packages.
- `npm run start`: starts built backend and frontend.
- `npm run typecheck`: runs TypeScript checks in all workspaces.
- `npm run lint`: runs workspace lint commands.
- `npm run seed`: creates the initial admin role and user.

## Requirements

- Node.js 20.11 or newer.
- npm 10 or newer.
- MongoDB Atlas connection string or local MongoDB through Docker Compose.
