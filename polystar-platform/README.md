# POLYSTAR Platform

Enterprise monorepo for **POLYSTAR Nanotech Ltd**, Kigali, Rwanda.

**Tagline:** Engineering Smart Solutions for Industry, Infrastructure & Innovation

## Stack

- Frontend: Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn-style UI, Framer Motion, React Query, Axios, i18next, React Hook Form, Zod.
- Backend: Node.js, Express.js, TypeScript, JWT auth, RBAC, Helmet, rate limiting, Morgan, Winston, compression, validation, error middleware, sockets, jobs.
- Database: MongoDB Atlas with Mongoose schemas for platform content, clients, tickets, reports, settings, translations, and operational requests.
- DevOps: Docker, Docker Compose, GitHub Actions, Vercel config, Render blueprint, Kubernetes starter manifest.

## Quick Start

```bash
cd polystar-platform
npm install
cp .env.example .env
npm run seed
npm run dev
```

Frontend: `https://www.polystar.rw`

Backend API: `https://polystar-nanotech.onrender.com/api/v1`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run seed`
- `npm run tree`

## Guides

- [Installation](docs/INSTALLATION.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API_REFERENCE.md)
- [Database Setup](docs/DATABASE_SETUP.md)
- [Dependencies](docs/DEPENDENCIES.md)
- [Environment Variables](docs/ENVIRONMENT.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Folder Tree](docs/FOLDER_TREE.md)
