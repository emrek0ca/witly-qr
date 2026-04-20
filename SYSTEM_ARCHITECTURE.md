# System Architecture

## Architecture style

Witly QR is a modular monolith built with Next.js App Router, Clerk auth, Drizzle ORM, and PostgreSQL.

## Main layers

- `src/app`: routes, layouts, UI
- `src/server`: domain services and payment integration
- `src/db`: schema and database access
- `src/env.ts`: runtime environment validation

## Server boundaries

- Route handlers stay thin
- Business logic lives in services
- Payment signing and link creation stay server-side
- Database access is lazy so builds do not require live credentials

## External integrations

- Clerk for authentication and session identity
- PostgreSQL for tenant-scoped persistence
- iyzico for payment links and reconciliation

## Request flow

1. Guest scans QR route
2. Route resolves table/session context
3. User claims items
4. Payment link is created on backend
5. Callback updates payment state
