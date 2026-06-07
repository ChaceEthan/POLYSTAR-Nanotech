# Full Folder Tree

Generated source tree, excluding `node_modules`, `dist`, `.next`, and other ignored build artifacts.

```text
polystar-platform/
├── .env.example
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── README.md
├── assets/
│   ├── README.md
│   └── brand/
│       └── polystar-logo.svg
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app.ts
│       ├── server.ts
│       ├── auth/
│       │   └── jwt.ts
│       ├── config/
│       │   ├── company.ts
│       │   ├── cloudinary.ts
│       │   ├── mail.ts
│       │   ├── constants.ts
│       │   └── env.ts
│       ├── controllers/
│       │   ├── analytics.controller.ts
│       │   ├── auth.controller.ts
│       │   ├── generic.controller.ts
│       │   ├── request.controller.ts
│       │   ├── settings.controller.ts
│       │   ├── support-ticket.controller.ts
│       │   ├── translations.controller.ts
│       │   └── upload.controller.ts
│       ├── database/
│       │   ├── connection.ts
│       │   └── seed.ts
│       ├── jobs/
│       │   └── index.ts
│       ├── middleware/
│       │   ├── authenticate.ts
│       │   ├── authorize.ts
│       │   ├── error.ts
│       │   ├── request-id.ts
│       │   ├── security.ts
│       │   └── validate.ts
│       ├── models/
│       │   └── index.ts
│       ├── repositories/
│       │   ├── analytics.repository.ts
│       │   ├── generic.repository.ts
│       │   ├── index.ts
│       │   ├── settings.repository.ts
│       │   └── translations.repository.ts
│       ├── routes/
│       │   ├── analytics.routes.ts
│       │   ├── auth.routes.ts
│       │   ├── crud.routes.ts
│       │   ├── index.ts
│       │   ├── request.routes.ts
│       │   ├── settings.routes.ts
│       │   ├── support-ticket.routes.ts
│       │   ├── translations.routes.ts
│       │   └── upload.routes.ts
│       ├── services/
│       │   ├── analytics.service.ts
│       │   ├── auth.service.ts
│       │   ├── email.service.ts
│       │   ├── generic.service.ts
│       │   ├── index.ts
│       │   ├── settings.service.ts
│       │   ├── translations.service.ts
│       │   └── upload.service.ts
│       ├── sockets/
│       │   └── index.ts
│       ├── types/
│       │   └── express.d.ts
│       ├── uploads/
│       │   └── index.ts
│       ├── utils/
│       │   ├── http.ts
│       │   ├── logger.ts
│       │   └── slug.ts
│       └── validators/
│           ├── auth.validator.ts
│           └── entity.validator.ts
├── deployment/
│   ├── kubernetes.yaml
│   ├── render.yaml
│   └── vercel.json
├── docker/
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── docs/
│   ├── API_REFERENCE.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SETUP.md
│   ├── DEPENDENCIES.md
│   ├── DEPLOYMENT.md
│   ├── ENVIRONMENT.md
│   ├── FOLDER_TREE.md
│   └── INSTALLATION.md
├── frontend/
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── public/
│   │   ├── brand/
│   │   │   ├── apple-touch-icon.png
│   │   │   ├── favicon-16x16.png
│   │   │   ├── favicon-32x32.png
│   │   │   ├── favicon-48x48.png
│   │   │   ├── icon-192x192.png
│   │   │   ├── icon-512x512.png
│   │   │   └── orginal logo11.png
│   │   └── favicon.ico
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── app/
│       │   ├── about/page.tsx
│       │   ├── admin/[section]/page.tsx
│       │   ├── admin/layout.tsx
│       │   ├── admin/page.tsx
│       │   ├── api/health/route.ts
│       │   ├── blog/page.tsx
│       │   ├── book-site-visit/page.tsx
│       │   ├── careers/page.tsx
│       │   ├── case-studies/page.tsx
│       │   ├── client/[section]/page.tsx
│       │   ├── client/layout.tsx
│       │   ├── client/login/page.tsx
│       │   ├── client/page.tsx
│       │   ├── company-profile/page.tsx
│       │   ├── contact/page.tsx
│       │   ├── downloads/page.tsx
│       │   ├── error.tsx
│       │   ├── get-quotation/page.tsx
│       │   ├── industries/page.tsx
│       │   ├── layout.tsx
│       │   ├── loading.tsx
│       │   ├── not-found.tsx
│       │   ├── page.tsx
│       │   ├── partner-with-us/page.tsx
│       │   ├── portfolio/page.tsx
│       │   ├── projects/page.tsx
│       │   ├── providers.tsx
│       │   ├── request-consultation/page.tsx
│       │   ├── research-innovation/page.tsx
│       │   ├── robots.ts
│       │   ├── services/page.tsx
│       │   ├── sitemap.ts
│       │   ├── software-development/page.tsx
│       │   └── training-programs/page.tsx
│       ├── components/
│       │   ├── dashboard/data-table.tsx
│       │   ├── dashboard/stat-card.tsx
│       │   ├── integrations/google-analytics.tsx
│       │   ├── integrations/google-map.tsx
│       │   ├── layout/client-shell.tsx
│       │   ├── layout/footer.tsx
│       │   ├── layout/language-switcher.tsx
│       │   ├── layout/public-header.tsx
│       │   ├── layout/theme-toggle.tsx
│       │   ├── providers/query-provider.tsx
│       │   ├── providers/theme-provider.tsx
│       │   ├── qr/qr-code-card.tsx
│       │   └── ui/
│       │       ├── badge.tsx
│       │       ├── button.tsx
│       │       ├── card.tsx
│       │       ├── input.tsx
│       │       ├── label.tsx
│       │       ├── table.tsx
│       │       └── textarea.tsx
│       ├── features/
│       │   ├── admin/admin-dashboard.tsx
│       │   ├── admin/admin-section-page.tsx
│       │   ├── client/client-dashboard.tsx
│       │   ├── client/client-section-page.tsx
│       │   ├── home/home-page.tsx
│       │   └── public/
│       │       ├── public-section-page.tsx
│       │       └── request-form.tsx
│       ├── hooks/
│       │   ├── use-api-resource.ts
│       │   ├── use-auth-api.ts
│       │   ├── use-language.ts
│       │   ├── use-mobile.ts
│       │   └── use-platform-api.ts
│       ├── i18n/
│       │   ├── client.ts
│       │   ├── provider.tsx
│       │   └── resources.ts
│       ├── lib/
│       │   ├── constants.ts
│       │   ├── navigation.ts
│       │   ├── seo.ts
│       │   └── utils.ts
│       ├── services/
│       │   ├── analytics-service.ts
│       │   ├── api-client.ts
│       │   ├── auth-service.ts
│       │   ├── content-service.ts
│       │   ├── request-service.ts
│       │   ├── resource-service.ts
│       │   ├── settings-service.ts
│       │   ├── ticket-service.ts
│       │   ├── translations-service.ts
│       │   └── upload-service.ts
│       ├── store/
│       │   └── session-store.ts
│       ├── styles/
│       │   └── globals.css
│       └── types/
│           └── index.ts
├── package-lock.json
├── package.json
├── scripts/
│   ├── clean.mjs
│   ├── generate-brand-icons.mjs
│   └── print-tree.mjs
└── shared/
    ├── package.json
    ├── tsconfig.json
    └── src/
        └── index.ts
```
