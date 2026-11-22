import { sameOrigin } from "./staff-utils";
export { tokenHash, secureTokenEqual, publicStaffAccount, sameOrigin } from "./staff-utils";
import { isAdminRequest, unauthorizedResponse } from "./admin-auth";
import { readCollection } from "./database";
import { neonAuth } from "./neon-auth";
import { authorizedLocalAdmin } from "./local-admin";
import { hasPermission, permissionsFor, type Permission, type StaffRole } from "./staff-permissions";

export type StaffAccount = {
  id: string;
  email: string;
  name: string;
  role: StaffRole;
  status: "invited" | "active" | "disabled";
  userId: string | null;
  inviteHash: string | null;
  invitedAt: string;
  activatedAt: string | null;
  updatedAt: string;
  version: number;
};
export type StaffIdentity = {
  kind: "legacy" | "staff" | "local";
  mustChange?: boolean;
  id: string;
  name: string;
  email: string | null;
  role: StaffRole;
  permissions: Permission[];
};
const master: StaffIdentity = { kind: "legacy", id: "legacy-admin", name: "Accès administrateur historique",
  email: null, role: "owner", permissions: permissionsFor("owner") };
export async function legacyLoginEnabled() {
  if (process.env.TLC_LEGACY_RECOVERY_ENABLED === "true") return true;
  const settings = await readCollection<{ id: string; disabled: boolean }>("staff_settings");
  return !settings.some(item => item.id === "legacy-access" && item.disabled === true);
}

export async function getNeonIdentity(): Promise<StaffIdentity | null> {
  const auth = neonAuth();
  if (!auth) return null;
  try {
    const { data: session } = await auth.getSession();
    if (!session?.user?.id || !session.user.email) return null;
    const accounts = await readCollection<StaffAccount>("staff_accounts");
    const account = accounts.find(item => item.status === "active" &&
      item.userId === session.user.id && item.email === session.user.email.toLowerCase());
    if (!account) return null;
    return { kind: "staff", id: account.id, name: account.name,
      email: account.email, role: account.role, permissions: permissionsFor(account.role) };
  } catch { return null; }
}

export async function getStaffIdentity(request: Request): Promise<StaffIdentity | null> {
  const local = await authorizedLocalAdmin(request);
  if (local) return { kind:"local", id:local.id, name:local.name, email:null, role:"owner",
    mustChange:local.mustChange, permissions:local.mustChange ? [] : permissionsFor("owner") };
  if (isAdminRequest(request) && await legacyLoginEnabled()) return master;
  return getNeonIdentity();
}

export async function deniedPermission(request: Request, permission: Permission): Promise<Response | null> {
  if (!sameOrigin(request) && !["GET", "HEAD"].includes(request.method))
    return Response.json({ error: "Origine interdite." }, { status: 403 });
  const identity = await getStaffIdentity(request);
  if (!identity) return unauthorizedResponse();
  if (identity.mustChange) return Response.json({error:"Veuillez d’abord sécuriser votre compte."},{status:403});
  if (!hasPermission(identity.role, permission))
    return Response.json({ error: "Permission insuffisante." }, { status: 403 });
  return null;
}

