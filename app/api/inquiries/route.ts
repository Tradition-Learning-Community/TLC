import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { appendRecord, readCollection, recordPublicRequestAttempt, updateRecord } from "@/lib/database";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { newInquiry, validateInquiry, type Inquiry } from "@/lib/inquiries";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const data = await readCollection<Inquiry>("inquiries");
  return NextResponse.json(data.sort((a,b) => b.createdAt.localeCompare(a.createdAt)), { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    let allowed = false;
    try { allowed = new URL(origin).host === request.nextUrl.host; } catch { /* invalid origin */ }
    if (!allowed) return NextResponse.json({ error: "Origine non autorisée." }, { status: 403 });
  }
  const body = await request.json().catch(() => null);
  if (body && typeof body === "object" && body.website) return NextResponse.json({ ok: true }, { status: 202 });
  const validation = validateInquiry(body);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return NextResponse.json({ error: "Formulaire temporairement indisponible." }, { status: 503 });
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = createHmac("sha256", secret).update("tlc-form:" + client).digest("hex");
  if (!(await recordPublicRequestAttempt(key, 5, 15 * 60 * 1000))) return NextResponse.json({ error: "Trop de demandes. Réessayez plus tard." }, { status: 429 });
  const record = newInquiry(validation);
  await appendRecord("inquiries", record, "request");
  return NextResponse.json({ ok: true, reference: record.id }, { status: 201 });
}
export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const data = await request.json().catch(() => null);
  if (!data || typeof data.id !== "string" || !["new", "in-progress", "closed"].includes(data.status)) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }
  const existing = (await readCollection<Inquiry>("inquiries")).find((item) => item.id === data.id);
  if (!existing) return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  const record: Inquiry = { ...existing, status: data.status, updatedAt: new Date().toISOString() };
  await updateRecord("inquiries", record);
  return NextResponse.json(record);
}
