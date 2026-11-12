import { NextResponse } from "next/server";
import { readCollection, updateRecord } from "@/lib/database";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import type { Profile } from "@/lib/types";

export async function GET() {
  return NextResponse.json(readCollection<Profile>("profiles"));
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const body = await request.json().catch(() => null);
  if (!body || typeof body.id !== "string") {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const current = readCollection<Profile>("profiles").find((profile) => profile.id === body.id);
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = { ...current, ...body } as Profile;
  updateRecord("profiles", updated);
  return NextResponse.json(updated);
}
