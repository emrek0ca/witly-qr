# Frontend Architecture

## Structure

- `src/app/layout.tsx`: root shell and metadata
- `src/app/app/layout.tsx`: authenticated workspace shell
- `src/app/app/*`: business screens
- `src/app/g/[qr]`: guest experience

## Data access

- Use server routes for sensitive actions
- Use client state only for local UI state
- Fetch workspace state with no-store requests where needed

## Component rules

- Keep page files focused on screen composition
- Avoid mixing domain logic into JSX
- Reuse visual patterns through simple shared primitives

## Build concerns

- The app must build without live env values
- Server-only code must not execute during module evaluation
- Secret-dependent work should happen only during request handling
