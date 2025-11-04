# syntax=docker/dockerfile:1.4
FROM node:20.10-alpine AS base
WORKDIR /repo
ENV NODE_ENV=production

FROM base AS deps
RUN corepack enable
COPY . ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --filter api... --filter @tournax/config... --prod false

FROM deps AS builder
RUN pnpm --filter api build

FROM node:20.10-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
COPY --from=builder /repo/apps/api/dist ./dist
COPY --from=builder /repo/apps/api/package.json ./package.json
COPY --from=deps /repo/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "dist/server.js"]
