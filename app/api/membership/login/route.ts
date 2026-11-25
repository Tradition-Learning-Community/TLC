import { readCollection } from "@/lib/database";
import { memberId, memberSessionCookie, verifyMemberPassword } from "@/lib/member-auth";
import { type MemberAccount, publicMember } from "@/lib/membership";
import { checkRateLimit, recordRateLimitFailure, clearRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
const LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Origine refusée." }, { status: 403 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `member-login:${ip}`;
  const limit = checkRateLimit(key, LIMIT);
  if (!limit.allowed) return Response.json({ error: "Trop de tentatives de connexion." }, { status: 429 });
  const data = await request.json().catch(() => null);
  const email = typeof data?.email === "string" ? data.email.trim().toLowerCase() : "";
  const password = typeof data?.password === "string" ? data.password : "";
  if (!email || email.length > 254 || !password || password.length > 128) return Response.json({ error: "Identifiants incorrects." }, { status: 401 });
  try {
    const accounts = await readCollection<MemberAccount>("membership-accounts");
    const account = accounts.find(x => x.id === memberId(email));
    const valid = account && await verifyMemberPassword(password, account.passwordHash);
    if (!valid) {
      recordRateLimitFailure(key, LIMIT);
      return Response.json({ error: "Identifiants incorrects." }, { status: 401 });
    }
    if (account.status !== "approved")
      return Response.json({ error: "Votre inscription est en attente de validation ou ne peut pas encore être activée." }, { status: 403 });
    clearRateLimit(key);
    const response = Response.json({ member: publicMember(account) });
    response.headers.set("Set-Cookie", memberSessionCookie(account.id));
    return response;
  } catch {
    return Response.json({ error: "Connexion indisponible pour le moment." }, { status: 503 });
  }
}
