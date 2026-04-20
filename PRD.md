# PRD

## Product

Witly QR is a multi-tenant QR menu and table-session SaaS for restaurants and cafes.

## Problem

Operators need a fast way to publish a QR menu, resolve it to the exact table, track live table activity, and split payment fairly without leaking business logic into the client.

## Goals

- Workspace-based onboarding for each business
- Branch, table, QR, menu, and session management
- Guest menu experience tied to a table session
- Item-level claim flow for split billing
- Secure iyzico payment link creation on the server

## Non-goals

- Microservices
- Client-side payment orchestration
- Generic admin dashboard templates
- Loose tenant isolation

## Core users

- Owner or manager
- Staff member
- Guest scanning a QR code

## MVP scope

- Sign up and create workspace
- Launch setup for branches, tables, and menu
- Live session visibility
- Claim-based split payment
- Backend-only iyzico link generation

## Success signals

- Fast setup completion
- Clear live table visibility
- Low payment friction
- No tenant leakage across workspaces
