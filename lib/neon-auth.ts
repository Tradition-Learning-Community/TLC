import { createNeonAuth } from "@neon/auth/next/server";

let current: ReturnType<typeof createNeonAuth> | null = null;
/** Neon Auth is already configured for this project; instantiate only at request time. */
export function neonAuth() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  // During migration the existing admin secret is a safe server-only fallback.
  const secret = process.env.NEON_AUTH_COOKIE_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (!baseUrl || !secret) return null;
  if (!current) current = createNeonAuth({ baseUrl, cookies: { secret } });
  return current;
}
