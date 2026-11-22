import { getStaffIdentity } from "@/lib/staff-auth";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const actor = await getStaffIdentity(request);
  if (!actor) return Response.json({ ok: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  return Response.json({ ok: true, actor }, { headers: { "Cache-Control": "no-store" } });
}
