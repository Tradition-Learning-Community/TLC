export type ReferenceProject = [string, string, string, string, string, string[], string, number, string];

export const referenceProjects: ReferenceProject[] = [
  ["Projet pilote", "En préparation", "Projet pilote TLC", "Équipe TLC", "Prototype pour tester le flux de contribution.", [], "Non renseigné", 0, "proj-1"],
];

export function referenceProjectSlug(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
