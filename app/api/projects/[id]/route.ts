import { NextResponse } from "next/server";
import { getProject, removeProject, saveProject } from "@/lib/project-store";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;
  const project = getProject(id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(request: Request, context: Context) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const { id } = await context.params;
  const current = getProject(id);
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const updated = saveProject({ ...current, ...body, id });
  return NextResponse.json(updated);
}

export async function DELETE(request: Request, context: Context) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const { id } = await context.params;
  const project = getProject(id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  removeProject(id);
  return NextResponse.json({ removed: project });
}
