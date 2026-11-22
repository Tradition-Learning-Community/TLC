import { randomBytes, randomUUID } from "node:crypto";
import { appendRecord, readCollection, updateRecord } from "@/lib/database";
import { deniedPermission, getStaffIdentity, publicStaffAccount, sameOrigin, tokenHash, type StaffAccount } from "@/lib/staff-auth";
import { isStaffRole, type StaffRole } from "@/lib/staff-permissions";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await deniedPermission(request, "staff:manage"); if (denied) return denied;
  const accounts = await readCollection<StaffAccount>("staff_accounts");
  return Response.json(accounts.map(publicStaffAccount), { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: Request) {
  const denied = await deniedPermission(request, "staff:manage"); if (denied) return denied;
  if (!sameOrigin(request)) return Response.json({ error: "Origine interdite." }, { status: 403 });
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const role: unknown = body?.role;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || name.length < 2 ||
      name.length > 140 || !isStaffRole(role)) return Response.json({ error: "Compte invalide." }, { status: 400 });
  const accounts = await readCollection<StaffAccount>("staff_accounts");
  if (accounts.some(item => item.email === email && item.status !== "disabled"))
    return Response.json({ error: "Cette adresse existe déjà." }, { status: 409 });
  // The first invited person must be an owner to complete migration safely.
  const firstOwner = !accounts.some(item => item.role === "owner" && item.status !== "disabled");
  const assignedRole: StaffRole = firstOwner ? "owner" : role;
  const token = randomBytes(32).toString("base64url");
  const now = new Date().toISOString();
  const account: StaffAccount = { id: randomUUID(), email, name, role: assignedRole,
    status: "invited", userId: null, inviteHash: tokenHash(token),
    invitedAt: now, activatedAt: null, updatedAt: now, version: 1 };
  await appendRecord("staff_accounts", account, "staff");
  return Response.json({ account: publicStaffAccount(account), invitationToken: token }, { status: 201 });
}

export async function PATCH(request: Request) {
  const denied = await deniedPermission(request, "staff:manage"); if (denied) return denied;
  if (!sameOrigin(request)) return Response.json({ error: "Origine interdite." }, { status: 403 });
  const actor = await getStaffIdentity(request);
  const body = await request.json().catch(() => null);
  if (!body || typeof body.id !== "string" || !isStaffRole(body.role) ||
      !["active", "disabled"].includes(body.status)) return Response.json({ error: "Modification invalide." }, { status: 400 });
  const accounts = await readCollection<StaffAccount>("staff_accounts");
  const account = accounts.find(x => x.id === body.id);
  if (!account || account.status === "invited") return Response.json({ error: "Compte non activé." }, { status: 404 });
  if (actor?.kind === "staff" && actor.id === account.id && (body.role !== account.role || body.status !== "active"))
    return Response.json({ error: "Vous ne pouvez pas modifier vos propres droits." }, { status: 409 });
  const activeOwners = accounts.filter(x => x.role === "owner" && x.status === "active");
  if (account.role === "owner" && (body.role !== "owner" || body.status !== "active") && activeOwners.length <= 1)
    return Response.json({ error: "Le dernier responsable doit rester actif." }, { status: 409 });
  const updated: StaffAccount = { ...account, role: body.role, status: body.status,
    updatedAt: new Date().toISOString(), version: account.version + 1 };
  await updateRecord("staff_accounts", updated);
  return Response.json(publicStaffAccount(updated));
}
