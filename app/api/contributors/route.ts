import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { deleteRecord, readCollection, updateRecord, appendRecord } from "@/lib/database";
import { deniedPermission } from "@/lib/staff-auth";
import type { Contributor } from "@/lib/types";

export async function GET() {
  return NextResponse.json((await readCollection<Contributor>("contributors")).filter(item => item.published !== false));
}

export async function POST(request: Request) {
  const denied = await deniedPermission(request, "contributors:manage"); if (denied) return denied;
  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || typeof body.github !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const contributor = await appendRecord<Contributor>("contributors", {
    id: randomUUID(),
    name: body.name.trim(),
    github: body.github.trim(),
    avatar: typeof body.avatar === "string" ? body.avatar : undefined,
    roles: Array.isArray(body.roles) ? body.roles.filter((role: unknown) => typeof role === "string").slice(0, 8) : ["Contributeur"],
    published: body.published !== false,
  }, "contributor");
  return NextResponse.json(contributor, { status: 201 });
}

export async function PUT(request: Request) {
  const denied = await deniedPermission(request, "contributors:manage"); if (denied) return denied;
  const body = await request.json().catch(() => null);
  if (!body || typeof body.id !== "string") {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const current = (await readCollection<Contributor>("contributors")).find((item) => item.id === body.id);
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = { ...current, ...body } as Contributor;
  await updateRecord("contributors", updated);
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const denied = await deniedPermission(request, "contributors:manage"); if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await deleteRecord("contributors", id);
  return NextResponse.json({ success: true });
}
