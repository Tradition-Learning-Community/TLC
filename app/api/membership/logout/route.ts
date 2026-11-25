import { clearMemberSessionCookie } from "@/lib/member-auth";

export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.set("Set-Cookie", clearMemberSessionCookie());
  return response;
}
