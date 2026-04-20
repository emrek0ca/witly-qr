# API Contracts

## `/api/workspaces/me`

- Method: `GET`
- Auth: Clerk
- Response: current workspace or `null`

## `/api/workspaces/create`

- Method: `POST`
- Auth: Clerk
- Body: `{ name: string }`
- Response: created workspace

## `/api/health/env`

- Method: `GET`
- Auth: Clerk
- Response: server-side env status

## `/api/payments/iyzico/link`

- Method: `POST`
- Auth: Clerk
- Body: `{ name: string, description?: string, price: string }`
- Response: iyzico link response or backend failure

## Contract rules

- Handlers validate input with Zod
- Handlers stay thin
- Payment and workspace creation logic stays in services
