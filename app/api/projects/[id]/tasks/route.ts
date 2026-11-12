import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getProject, saveProject } from "@/lib/project-store";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const { id } = await context.params;
  const project = getProject(id);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== "string" || !body.title.trim()) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }
  const task = { id: `task-${randomUUID()}`, title: body.title.trim(), done: false };
  saveProject({ ...project, tasks: [...project.tasks, task] });
  return NextResponse.json(task, { status: 201 });
}
