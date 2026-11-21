import { readCollection, updateRecord, appendRecord, deleteRecord } from "@/lib/database";
import type { Project } from "@/lib/types";

export type { ProjectTask, Project } from "@/lib/types";

export async function getProjects() {
  return readCollection<Project>("projects");
}

export async function getProject(id: string) {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

export async function saveProject(project: Project) {
  if (!project.id) return appendRecord("projects", project, "proj");
  await updateRecord("projects", project as Project & { id: string });
  return project;
}

export async function removeProject(id: string) {
  return deleteRecord("projects", id);
}
