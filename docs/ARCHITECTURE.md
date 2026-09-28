# BorrowBuddy Architecture

## Overview
BorrowBuddy is a peer-to-peer marketplace where users list items to lend and request to borrow. The system is built as a single Next.js 15 application with API Routes and Server Actions for backend logic, Prisma for data access, and PostgreSQL (Neon) as the database. Cloudinary stores listing images. NextAuth provides credentials + Google OAuth with JWT sessions.

## Core Domains
- **Identity & Profiles**: users, profiles, roles, password reset tokens
- **Listings**: categories, items, item images, wishlist
- **Borrowing**: borrow requests with lifecycle states
- **Messaging**: conversation + message history (no realtime sockets)
- **Reviews & Reputation**: post-transaction reviews, aggregates on users
- **Notifications**: in-app notifications for workflow events
- **Reports & Moderation**: reporting users/listings and admin resolution

## Data Flow (high level)
1) User registers or signs in with Google → NextAuth issues JWT session.
2) Lender creates item listing → item is available.
3) Borrower submits request with dates/message → request is pending, lender notified.
4) Lender approves → item status becomes reserved/borrowed; request becomes approved/borrowed.
5) Borrower returns → request becomes returned; both parties can review.
6) Reviews update aggregates on users.

## Auth & Security
- Bcrypt password hashing
- JWT sessions (NextAuth)
- OAuth accounts via Prisma adapter
- Zod input validation on API routes
- Role-based authorization for admin endpoints
- CSRF protection handled by NextAuth
- Cloudinary uploads validated server-side

## API Layering
- **Route handlers** for auth and CRUD endpoints
- **Server actions** for simple mutations from UI
- **Prisma** encapsulated through a singleton client

## Deployment
- **Vercel** for Next.js app
- **Neon PostgreSQL** for database
- **Cloudinary** for storage

## Operational Notes
- All critical workflows are modeled with explicit statuses.
- Borrowed items are not eligible for new requests.
- Reviews are allowed only after request status is returned.
