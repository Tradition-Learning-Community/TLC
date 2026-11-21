# TLC production deployment

TLC is a Next.js application using persistent Neon PostgreSQL and Vercel.

The `records` table stores `collection`, `id`, `data` (JSONB), `seq`, and timestamps. The database is initialized before deployment and seeds are inserted only if absent.

Set the pooled Neon `DATABASE_URL`, the independent `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in encrypted Vercel environment variables. Never commit credentials.

Run `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm lint`, and `pnpm test`. Verify all public pages, API read/write authorization, and error logs.

Neon backup/restore must be configured for the production project's data. The legacy SQLite backup utility is not used for this deployment.
