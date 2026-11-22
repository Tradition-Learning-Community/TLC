import { appendRecord, readCollection, updateRecord } from "@/lib/database";
import { deniedPermission, getStaffIdentity, legacyLoginEnabled, sameOrigin } from "@/lib/staff-auth";
export async function GET(request: Request) {
  const denied = await deniedPermission(request, "staff:manage"); if (denied) return denied;
  return Response.json({ enabled: await legacyLoginEnabled() });
}
export async function PATCH(request: Request) {
  const denied = await deniedPermission(request, "staff:manage"); if (denied) return denied;
  if (!sameOrigin(request)) return Response.json({ error: "Origine interdite." }, { status: 403 });
  const actor = await getStaffIdentity(request);
  // The legacy password must never be able to disable its own recovery route.
  if (!actor || actor.kind === "legacy" || actor.role !== "owner" || actor.mustChange)
    return Response.json({ error: "Connectez-vous avec le compte nominatif responsable." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (typeof body?.enabled !== "boolean") return Response.json({ error: "Valeur invalide." }, { status: 400 });
  const settings = await readCollection<{ id: string; disabled: boolean }>("staff_settings");
  const existing = settings.find(x => x.id === "legacy-access");
  const next = { id: "legacy-access", disabled: !body.enabled };
  if (existing) await updateRecord("staff_settings", next);
  else await appendRecord("staff_settings", next, "settings");
  return Response.json({ enabled: body.enabled });
}
