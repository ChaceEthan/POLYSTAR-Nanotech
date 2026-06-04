FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY shared/package.json shared/package.json
COPY backend/package.json backend/package.json
RUN npm install

FROM deps AS builder
COPY shared shared
COPY backend backend
RUN npm run build --workspace shared && npm run build --workspace backend

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/shared/dist ./shared/dist
COPY --from=builder /app/shared/package.json ./shared/package.json
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package.json ./backend/package.json
EXPOSE 5000
CMD ["node", "backend/dist/server.js"]
