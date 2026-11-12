import { readCollection, updateRecord, appendRecord, deleteRecord } from "@/lib/database";
import type { Project } from "@/lib/types";

export type { ProjectTask, Project } from "@/lib/types";

export function getProjects() {
  return readCollection<Project>("projects");
}

export function getProject(id: string) {
  return getProjects().find((project) => project.id === id);
}

export function saveProject(project: Project) {
  if (!project.id) return appendRecord("projects", project, "proj");
  updateRecord("projects", project as Project & { id: string });
  return project;
}

export function removeProject(id: string) {
  return deleteRecord("projects", id);
}
