# Tenancy and Permissions

## Tenancy model

Each workspace is an isolated tenant. All business data belongs to exactly one workspace.

## Roles

- `owner`
- `admin`
- `staff`

## Permission rules

- Authenticated users can only operate inside their workspace
- Staff should not see cross-tenant data
- Guest routes only resolve the table context they were scanned for
- Payment and claim logic must be tenant-scoped and server-enforced

## Security rules

- No secrets in client components
- No direct payment signing on the frontend
- Database queries must include workspace context
- Auditable events should be stored for sensitive actions
