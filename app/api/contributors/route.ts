import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { deleteRecord, readCollection, updateRecord, appendRecord } from "@/lib/database";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import type { Contributor } from "@/lib/types";

export async function GET() {
  return NextResponse.json(readCollection<Contributor>("contributors"));
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || typeof body.github !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const contributor = appendRecord<Contributor>("contributors", {
    id: randomUUID(),
    name: body.name.trim(),
    github: body.github.trim(),
    avatar: typeof body.avatar === "string" ? body.avatar : undefined,
  }, "contributor");
  return NextResponse.json(contributor, { status: 201 });
}

export async function PUT(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const body = await request.json().catch(() => null);
  if (!body || typeof body.id !== "string") {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const current = readCollection<Contributor>("contributors").find((item) => item.id === body.id);
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = { ...current, ...body } as Contributor;
  updateRecord("contributors", updated);
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  deleteRecord("contributors", id);
  return NextResponse.json({ success: true });
}
