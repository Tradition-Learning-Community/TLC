import { readCollection, replaceRecordIfVersion } from "@/lib/database";
import { neonAuth } from "@/lib/neon-auth";
import { secureTokenEqual, tokenHash, sameOrigin, publicStaffAccount, type StaffAccount } from "@/lib/staff-auth";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Origine interdite." }, { status: 403 });
  const auth = neonAuth();
  if (!auth) return Response.json({ error: "Authentification indisponible." }, { status: 503 });
  const { data: session } = await auth.getSession().catch(() => ({ data: null }));
  if (!session?.user?.id || !session.user.email) return Response.json({ error: "Connectez-vous d'abord." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token.trim() : "";
  if (token.length < 40 || token.length > 80) return Response.json({ error: "Invitation invalide." }, { status: 400 });
  const accounts = await readCollection<StaffAccount>("staff_accounts");
  const digest = tokenHash(token);
  const account = accounts.find(item => item.status === "invited" && !!item.inviteHash &&
    secureTokenEqual(item.inviteHash, digest));
  if (!account || account.email !== session.user.email.toLowerCase())
    return Response.json({ error: "Invitation invalide pour ce compte." }, { status: 403 });
  // Token is one-time: compare-and-swap guarantees concurrent claims cannot both succeed.
  const now = new Date().toISOString();
  const next: StaffAccount = { ...account, userId: session.user.id, status: "active",
    inviteHash: null, activatedAt: now, updatedAt: now, version: account.version + 1 };
  if (!await replaceRecordIfVersion("staff_accounts", next, account.version))
    return Response.json({ error: "Invitation déjà utilisée. Rechargez votre session." }, { status: 409 });
  return Response.json({ ok: true, account: publicStaffAccount(next) });
}
