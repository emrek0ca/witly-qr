# Payment Flow

## Goal

Create a secure, server-owned payment link flow with iyzico.

## Flow

1. Session is open and items are claimed
2. Server calculates the payable amount from persisted claims and snapshots
3. Backend creates the iyzico payment link
4. Guest is redirected to iyzico
5. Callback or reconciliation endpoint updates payment state

## Rules

- Never build or sign the request in client code
- Never trust client-calculated totals
- Store provider reference and idempotency key
- Do not allow duplicate settlement for the same claim set

## Failure handling

- Payment link creation failures return a backend error
- Reconciliation should be idempotent
- Failed attempts remain traceable in audit logs
