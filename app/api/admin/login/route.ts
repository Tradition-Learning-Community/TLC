import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { adminCookieHeader } from "@/lib/admin-auth";
import { legacyLoginEnabled, sameOrigin } from "@/lib/staff-auth";
import { recordPublicRequestAttempt } from "@/lib/database";
import { checkLocalPassword, getLocalAdmin, localAdminCookie } from "@/lib/local-admin";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Origine interdite." }, { status: 403 });
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  if (!secret) return NextResponse.json({ ok: false }, { status: 503 });
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = createHmac("sha256", secret).update("tlc-admin:" + client).digest("hex");
  // Shared across serverless instances; limits both successful and failed attempts.
  const allowed = await recordPublicRequestAttempt("admin:" + key, 10, 15 * 60 * 1000);
  if (!allowed) return NextResponse.json({ ok: false, error: "Too many attempts." }, { status: 429, headers: { "Retry-After": "900" } });
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  if (username) {
    const account = await getLocalAdmin();
    // Unknown usernames and incorrect passwords have the same public answer.
    if (!account || username !== account.username || !checkLocalPassword(password, account))
      return NextResponse.json({ok:false,error:"Identifiant ou mot de passe incorrect."},{status:401});
    const response = NextResponse.json({ok:true,mustChange:account.mustChange});
    response.headers.set("Set-Cookie",localAdminCookie(account));
    response.headers.set("Cache-Control","no-store");
    return response;
  }
  // Temporary historical access remains available while staff migrate.
  if (!await legacyLoginEnabled()) return NextResponse.json({ error: "Ancien accès désactivé." }, { status: 410 });
  if (!ADMIN_PASSWORD) return NextResponse.json({ ok:false },{status:503});
  const expected = createHash("sha256").update(ADMIN_PASSWORD).digest();
  const provided = createHash("sha256").update(password).digest();
  if (!password || !timingSafeEqual(expected, provided)) return NextResponse.json({ ok: false }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", adminCookieHeader());
  return response;
}
