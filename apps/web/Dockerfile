# syntax=docker/dockerfile:1.4
FROM node:20.10-alpine AS base
WORKDIR /repo
ENV NODE_ENV=production

FROM base AS deps
RUN corepack enable
COPY . ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install --filter web... --filter @tournax/ui... --filter @tournax/config... --prod false

FROM deps AS builder
RUN pnpm --filter web build

FROM node:20.10-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /repo/apps/web/.next/standalone ./
COPY --from=builder /repo/apps/web/.next/static ./.next/static
COPY --from=builder /repo/apps/web/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
