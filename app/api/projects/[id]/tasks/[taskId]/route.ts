import { NextResponse } from "next/server";
import { getProject, saveProject } from "@/lib/project-store";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";

type Context = { params: Promise<{ id: string; taskId: string }> };

export async function PUT(request: Request, context: Context) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const { id, taskId } = await context.params;
  const project = getProject(id);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  const task = project.tasks.find((item) => item.id === taskId);
  if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
  const body = await request.json().catch(() => null);
  if (body && typeof body.done === "boolean") task.done = body.done;
  if (body && typeof body.title === "string" && body.title.trim()) task.title = body.title.trim();
  saveProject(project);
  return NextResponse.json(task);
}

export async function DELETE(request: Request, context: Context) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const { id, taskId } = await context.params;
  const project = getProject(id);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  const index = project.tasks.findIndex((item) => item.id === taskId);
  if (index === -1) return NextResponse.json({ error: "Task not found" }, { status: 404 });
  const [removed] = project.tasks.splice(index, 1);
  saveProject(project);
  return NextResponse.json({ removed });
}
