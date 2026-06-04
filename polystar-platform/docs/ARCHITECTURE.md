# Architecture

POLYSTAR Platform is an npm-workspaces monorepo with three packages:

- `frontend`: Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn-style source components, React Query, Axios, i18next, React Hook Form, Zod, and Framer Motion.
- `backend`: Express.js 5, TypeScript, MongoDB Atlas with Mongoose, JWT authentication, RBAC, security middleware, REST API, sockets, jobs, and Cloudinary upload preparation.
- `shared`: shared company constants, language metadata, API envelopes, entity names, and cross-package types.

The backend follows layered clean architecture:

1. Routes validate and protect HTTP access.
2. Controllers map requests to use cases and response envelopes.
3. Services enforce business behavior.
4. Repositories isolate persistence operations.
5. Models define MongoDB collections and indexes.

The frontend separates route files from feature implementations. Public pages, admin dashboard, and client portal use shared UI primitives and design tokens.
