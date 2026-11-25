import { appendRecord } from "@/lib/database";
import { hashMemberPassword, memberId } from "@/lib/member-auth";
import { validateMembershipInput, type MemberAccount } from "@/lib/membership";
import { checkRateLimit, recordRateLimitFailure } from "@/lib/rate-limit";

export const runtime = "nodejs";
const LIMIT = { limit: 5, windowMs: 60 * 60 * 1000 };

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Origine refusée." }, { status: 403 });
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return Response.json({ error: "Format invalide." }, { status: 415 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `membership-apply:${ip}`;
  const throttle = checkRateLimit(key, LIMIT);
  if (!throttle.allowed) return Response.json({ error: "Trop de demandes. Réessayez ultérieurement." }, {
    status: 429, headers: { "Retry-After": String(throttle.retryAfterSeconds) },
  });
  const bodyText = await request.text().catch(() => "");
  if (bodyText.length > 10000) return Response.json({ error: "Demande trop volumineuse." }, { status: 413 });
  let parsed: unknown;
  try { parsed = JSON.parse(bodyText); } catch { return Response.json({ error: "Informations invalides." }, { status: 400 }); }
  // Quietly discard automated submissions using the hidden form field.
  if (parsed && typeof parsed === "object" && "website" in parsed && (parsed as { website?: unknown }).website)
    return Response.json({ status: "pending" }, { status: 201 });
  const validation = validateMembershipInput(parsed);
  if (!validation.ok) return Response.json({ error: validation.error }, { status: 400 });

  recordRateLimitFailure(key, LIMIT);
  const { password, consent: _consent, ...information } = validation.value;
  void _consent;
  try {
    const account: MemberAccount = {
      ...information,
      id: memberId(information.email),
      passwordHash: await hashMemberPassword(password),
      status: "pending",
      createdAt: new Date().toISOString(),
      consentAt: new Date().toISOString(),
    };
    await appendRecord("membership-accounts", account, "member");
    return Response.json({ status: "pending", message: "Votre demande est enregistrée. Elle sera examinée par TLC." }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && (error as {code?: string}).code === "23505")
      return Response.json({ error: "Une inscription existe déjà pour cet e-mail. Utilisez la connexion ou contactez TLC." }, { status: 409 });
    return Response.json({ error: "Impossible d’enregistrer la demande pour le moment." }, { status: 503 });
  }
}
