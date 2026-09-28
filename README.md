# BorrowBuddy

BorrowBuddy is a peer-to-peer item borrowing and lending marketplace built with Next.js 15, Prisma, and PostgreSQL. This repository currently contains the architecture baseline, data model, and authentication flow.

## What is included (bootstrap/architecture-auth)
- Architecture outline
- Prisma schema + initial migration
- Category seed script
- NextAuth configuration (JWT sessions + Google OAuth + Credentials)
- Registration API and auth validators

## Prerequisites
- Node.js 20+
- PostgreSQL (Neon)
- Cloudinary account
- Google OAuth credentials

## Environment variables
Set the following in `.env.local`:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Setup
1) Install dependencies: `pnpm install`
2) Run migrations: `pnpm prisma migrate dev`
3) Seed categories: `pnpm prisma db seed`
4) Start dev server: `pnpm dev`

## Notes
- JWT sessions are enabled; OAuth accounts are stored via Prisma adapter.
- Passwords are hashed with bcrypt.
