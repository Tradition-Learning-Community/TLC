import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import {
  deleteRecord,
  getDatabase,
  readCollection,
  updateRecord,
} from "@/lib/database";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { validateDataRecord, type DataRecord } from "@/lib/validation";

const ALLOWED_TYPES = new Set([
  "contributors", "profiles", "projects", "events", "resources",
  "experiments", "open-calls", "discussions",
]);

type RouteContext = { params: Promise<{ type: string }> };
async function resolveType(context: RouteContext) {
  const { type } = await context.params;
  return ALLOWED_TYPES.has(type) ? type : null;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const type = await resolveType(context);
  if (!type) return NextResponse.json({ error: "Unknown data type" }, { status: 404 });
  return NextResponse.json(readCollection<DataRecord>(type));
}

export async function POST(request: NextRequest, context: RouteContext) {
  const type = await resolveType(context);
  if (!type) return NextResponse.json({ error: "Unknown data type" }, { status: 404 });
  if (!isAdminRequest(request)) return unauthorizedResponse();

  const body = await request.json().catch(() => null);
  const validation = validateDataRecord(type, body);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });
  const item = { ...validation.value, id: randomUUID() };
  getDatabase()
    .prepare("INSERT INTO records (collection, id, data) VALUES (?, ?, ?)")
    .run(type, item.id, JSON.stringify(item));
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const type = await resolveType(context);
  if (!type) return NextResponse.json({ error: "Unknown data type" }, { status: 404 });
  if (!isAdminRequest(request)) return unauthorizedResponse();

  const body = await request.json().catch(() => null);
  const validation = validateDataRecord(type, body);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });
  if (typeof validation.value.id !== "string") return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const updated = updateRecord(type, validation.value as { id: string });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(validation.value);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const type = await resolveType(context);
  if (!type) return NextResponse.json({ error: "Unknown data type" }, { status: 404 });
  if (!isAdminRequest(request)) return unauthorizedResponse();

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (!deleteRecord(type, id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
