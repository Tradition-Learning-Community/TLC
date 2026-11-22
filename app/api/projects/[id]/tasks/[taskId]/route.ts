import { NextResponse } from "next/server";
import { getProject, saveProject } from "@/lib/project-store";
import { deniedPermission } from "@/lib/staff-auth";

type Context = { params: Promise<{ id: string; taskId: string }> };

export async function PUT(request: Request, context: Context) {
  const denied = await deniedPermission(request, "data:manage"); if (denied) return denied;
  const { id, taskId } = await context.params;
  const project = await getProject(id);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  const task = project.tasks.find((item) => item.id === taskId);
  if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });
  const body = await request.json().catch(() => null);
  if (body && typeof body.done === "boolean") task.done = body.done;
  if (body && typeof body.title === "string" && body.title.trim()) task.title = body.title.trim();
  await saveProject(project);
  return NextResponse.json(task);
}

export async function DELETE(request: Request, context: Context) {
  const denied = await deniedPermission(request, "data:manage"); if (denied) return denied;
  const { id, taskId } = await context.params;
  const project = await getProject(id);
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  const index = project.tasks.findIndex((item) => item.id === taskId);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const [removed] = project.tasks.splice(index, 1);
  await saveProject(project);
  return NextResponse.json({ removed });
}
