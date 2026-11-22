import { NextResponse } from "next/server";
import { clearAdminCookieHeader } from "@/lib/admin-auth";
import { clearLocalAdminCookie } from "@/lib/local-admin";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.headers.append("Set-Cookie", clearAdminCookieHeader());
  response.headers.append("Set-Cookie", clearLocalAdminCookie());
  return response;
}
