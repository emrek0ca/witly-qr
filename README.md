# Witly QR

Production-grade multi-tenant QR menü ve masa oturumu SaaS.

## Local

```bash
npm i
npm run dev
```

Local development uses the frontend shell and talks to the VPS backend through
`BACKEND_API_URL` in `.env.local`.

## Docker

Production-like VPS setup:

```bash
cp .env.production.example .env.production
docker compose up -d --build
```

The compose file starts:

- `db`: Postgres 16 with persistent volume
- `migrate`: one-shot migration runner
- `web`: standalone Next.js server

For VPS use, set `APP_RUNTIME=backend` and keep `DATABASE_URL` pointed at the
dockerized Postgres service.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm run db:migrate:prod` for containerized environments
- `npm run db:migrate` for local `.env.local` workflows

## Environment

`.env.local.example` local development içindir.
`.env.production.example` VPS/Docker içindir.

## Docs

- [PRD.md](./PRD.md)
- [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md)
- [DATA_MODEL.md](./DATA_MODEL.md)
- [SCREEN_MAP.md](./SCREEN_MAP.md)
- [PAYMENT_FLOW.md](./PAYMENT_FLOW.md)
- [TENANCY_AND_PERMISSIONS.md](./TENANCY_AND_PERMISSIONS.md)
- [API_CONTRACTS.md](./API_CONTRACTS.md)
- [DESIGN_LANGUAGE.md](./DESIGN_LANGUAGE.md)
- [FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md)
