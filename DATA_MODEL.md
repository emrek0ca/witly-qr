# Data Model

## Core entities

- `workspaces`: tenant root
- `members`: workspace membership and role
- `branches`: physical locations
- `dining_tables`: table registry per branch
- `qr_codes`: QR token lifecycle and table binding
- `menu_categories`: menu grouping
- `menu_items`: current menu item state
- `menu_item_snapshots`: immutable price and content snapshots
- `table_sessions`: live table session state
- `session_participants`: people joined to a session
- `orders`: order headers for session billing
- `order_items`: line items with snapshot references
- `claims`: item ownership for split payments
- `payments`: provider records and idempotency keys
- `audit_logs`: append-only traceability

## Rules

- Every record is workspace-scoped
- Order and payment records reference snapshots, not mutable catalog rows
- Claims must be unique per order item
- Payment idempotency keys must be unique
- Session state should be reconstructable from persisted rows
