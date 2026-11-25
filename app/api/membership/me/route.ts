import { readCollection } from "@/lib/database";
import { memberSessionId } from "@/lib/member-auth";
import { publicMember, type MemberAccount } from "@/lib/membership";

export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    const id = memberSessionId(request);
    if (!id) return Response.json({ error: "Session requise." }, { status: 401 });
    const accounts = await readCollection<MemberAccount>("membership-accounts");
    const account = accounts.find(item => item.id === id && item.status === "approved");
    if (!account) return Response.json({ error: "Session expirée ou compte inactif." }, { status: 401 });
    return Response.json({ member: publicMember(account) }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Service indisponible." }, { status: 503 });
  }
}
