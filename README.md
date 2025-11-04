# TournaX Monorepo

Secure-by-default esports tournament platform built with a PNPM workspace housing the Next.js web app, Express API, and shared packages.

## Project layout

```
apps/
  api/    # Express + Prisma API
  web/    # Next.js 14 App Router frontend
packages/
  config/ # Shared ESLint, Prettier, tsconfig presets
  ui/     # Shared React component library
```

## Getting started

```bash
corepack enable
pnpm install
pnpm dev
```

### Useful scripts

- `pnpm build` – build every package
- `pnpm lint` – lint all workspaces with security-focused configs
- `pnpm test` – run Vitest suites (API + web + UI)
- `pnpm typecheck` – strict TypeScript checking
- `pnpm db:migrate` / `pnpm db:seed` – Prisma database tasks scoped to the API

### Docker compose

A hardened local stack is available via:

```bash
docker compose up --build
```

Services exposed:

- Web: http://localhost:3000
- API: http://localhost:4000/api
- MySQL: 3306 (with least-privilege user)
- Redis: 6379

### Testing & linting

CI should invoke `pnpm lint`, `pnpm test`, and `pnpm typecheck` to ensure secure defaults remain intact.
