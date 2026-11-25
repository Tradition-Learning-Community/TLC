import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { readCollection, updateRecord } from "@/lib/database";
import { publicMember, type MemberAccount, type MemberStatus } from "@/lib/membership";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  try {
    const accounts = await readCollection<MemberAccount>("membership-accounts");
    return Response.json(accounts.map(publicMember).sort((a,b) => b.createdAt.localeCompare(a.createdAt)), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Impossible de charger les demandes." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Origine refusée." }, { status: 403 });
  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const status = body?.status as MemberStatus;
  const note = typeof body?.note === "string" ? body.note.trim() : "";
  if (!/^[a-f0-9]{64}$/.test(id) || !["pending", "approved", "rejected"].includes(status) || note.length > 500)
    return Response.json({ error: "Décision invalide." }, { status: 400 });
  try {
    const accounts = await readCollection<MemberAccount>("membership-accounts");
    const account = accounts.find(item => item.id === id);
    if (!account) return Response.json({ error: "Demande introuvable." }, { status: 404 });
    const updated: MemberAccount = {
      ...account, status, reviewedAt: new Date().toISOString(), reviewNote: note || undefined,
    };
    if (!await updateRecord("membership-accounts", updated))
      return Response.json({ error: "Demande introuvable." }, { status: 404 });
    return Response.json({ member: publicMember(updated) });
  } catch {
    return Response.json({ error: "Impossible d’enregistrer la décision." }, { status: 503 });
  }
}
