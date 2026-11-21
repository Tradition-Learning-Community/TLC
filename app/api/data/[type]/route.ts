import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { appendRecord, appendRecords, deleteRecord, readCollection, updateRecord } from "@/lib/database";
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
  return NextResponse.json(await readCollection<DataRecord>(type));
}

export async function POST(request: NextRequest, context: RouteContext) {
  const type = await resolveType(context);
  if (!type) return NextResponse.json({ error: "Unknown data type" }, { status: 404 });
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const body = await request.json().catch(() => null);
  if (Array.isArray(body)) {
    if (!body.length) return NextResponse.json({ error: "The import file is empty" }, { status: 400 });
    if (body.length > 500) return NextResponse.json({ error: "Import is limited to 500 records" }, { status: 413 });
    const records: DataRecord[] = [];
    const errors: Array<{ row: number; error: string }> = [];
    body.forEach((record, index) => {
      const validation = validateDataRecord(type, record);
      if (!validation.ok) errors.push({ row: index + 1, error: validation.error });
      else records.push({ ...validation.value, id: randomUUID() });
    });
    if (errors.length) return NextResponse.json({ error: "Some rows are invalid", details: errors.slice(0, 20) }, { status: 400 });
    const imported = await appendRecords(type, records as Array<DataRecord & { id: string }>);
    return NextResponse.json({ imported }, { status: 201 });
  }
  const validation = validateDataRecord(type, body);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });
  const item = { ...validation.value, id: randomUUID() };
  const created = await appendRecord(type, item, type);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const type = await resolveType(context);
  if (!type) return NextResponse.json({ error: "Unknown data type" }, { status: 404 });
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const body = await request.json().catch(() => null);
  const validation = validateDataRecord(type, body);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });
  if (typeof validation.value.id !== "string") return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const updated = await updateRecord(type, validation.value as { id: string });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(validation.value);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const type = await resolveType(context);
  if (!type) return NextResponse.json({ error: "Unknown data type" }, { status: 404 });
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (!await deleteRecord(type, id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
