FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY shared/package.json shared/package.json
COPY frontend/package.json frontend/package.json
RUN npm install

FROM deps AS builder
COPY shared shared
COPY frontend frontend
RUN npm run build --workspace shared && npm run build --workspace frontend

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/frontend/.next/standalone ./
COPY --from=builder /app/frontend/.next/static ./frontend/.next/static
COPY --from=builder /app/frontend/public ./frontend/public
EXPOSE 3000
CMD ["node", "frontend/server.js"]
