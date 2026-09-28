# Deployment Guide (Vercel + Neon)

## 1) Neon (PostgreSQL)
1. Create a Neon project and database.
2. Copy the connection string.
3. Set it as `DATABASE_URL` in your environment.

## 2) Local setup
1. Install dependencies:
   - `pnpm install`
2. Create `.env.local` with:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
3. Run migrations and seed:
   - `pnpm prisma migrate dev`
   - `pnpm prisma db seed`
4. Start dev server:
   - `pnpm dev`

## 3) Vercel
1. Import the GitHub repo into Vercel.
2. Add the same environment variables in Vercel Project Settings.
3. Deploy.

## 4) Post-deploy verification
- Visit `/api/auth/providers` to confirm NextAuth providers load.
- Run a test registration to verify Prisma + auth.
- Upload a test image through the client helper using the signed upload route.
