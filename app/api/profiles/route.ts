import { NextResponse } from "next/server";
import { readCollection, updateRecord } from "@/lib/database";
import { deniedPermission } from "@/lib/staff-auth";
import type { Profile } from "@/lib/types";

export async function GET() {
  return NextResponse.json((await readCollection<Profile>("profiles")).filter(item => item.published === true));
}

export async function PATCH(request: Request) {
  const denied = await deniedPermission(request, "data:manage"); if (denied) return denied;
  const body = await request.json().catch(() => null);
  if (!body || typeof body.id !== "string") {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const current = (await readCollection<Profile>("profiles")).find((profile) => profile.id === body.id);
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = { ...current, ...body } as Profile;
  await updateRecord("profiles", updated);
  return NextResponse.json(updated);
}
