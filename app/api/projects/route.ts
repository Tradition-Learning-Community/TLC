import { NextResponse } from "next/server";
import { getProjects, saveProject, type Project } from "@/lib/project-store";
import { deniedPermission } from "@/lib/staff-auth";

export async function GET() {
  return NextResponse.json((await getProjects()).filter(item => (item as Project & { published?: boolean }).published === true));
}

export async function POST(request: Request) {
  const denied = await deniedPermission(request, "data:manage"); if (denied) return denied;
  const body = await request.json().catch(() => null);
  if (!body || typeof body.title !== "string" || !body.title.trim()) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }
  const project: Project = {
    title: body.title.trim(),
    description: typeof body.description === "string" ? body.description : "",
    members: Array.isArray(body.members) ? body.members : [],
    tasks: Array.isArray(body.tasks) ? body.tasks : [],
  };
  const created = await saveProject(project);
  return NextResponse.json(created, { status: 201 });
}
