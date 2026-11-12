import { NextResponse } from "next/server";
import { getProjects, saveProject, type Project } from "@/lib/project-store";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";

export async function GET() {
  return NextResponse.json(getProjects());
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
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
  const created = saveProject(project);
  return NextResponse.json(created, { status: 201 });
}
