import type { DiagramReference } from "./references";

export type LineageView = "cohorts" | "generations" | "branches" | "cascades" | "evolution";
export type LineageNode = { id: string; label: string; x: number; y: number; from: number; until?: number; parentId?: string; relayFrom?: number };

// Fictional scene coordinates and events are solely for explanatory interaction.
// No scientific metric, threshold, generation clock or tllib result is computed.
export const lineageNodes: readonly LineageNode[] = [
  { id: "m", label: "Maître initial", x: 50, y: 10, from: 0 },
  { id: "d1", label: "D1", x: 23, y: 31, from: 0, parentId: "m", relayFrom: 2 },
  { id: "d2", label: "D2", x: 78, y: 30, from: 0, parentId: "m", relayFrom: 2 },
  { id: "d3", label: "D3", x: 73, y: 57, from: 1, until: 3, parentId: "m" },
  { id: "d4", label: "D4", x: 23, y: 60, from: 2, parentId: "d1" },
  { id: "d5", label: "D5", x: 44, y: 84, from: 2, parentId: "d1" },
  { id: "d6", label: "D6", x: 81, y: 83, from: 2, parentId: "d2" },
  { id: "d7", label: "D7", x: 19, y: 85, from: 3, parentId: "d1" },
];

export const lineageViews: readonly { id: LineageView; label: string; description: string }[] = [
  { id: "cohorts", label: "Cohortes", description: "Les contours regroupent des Disciples. Une même cohorte peut réunir des filiations différentes ; le regroupement reste distinct du rôle et de la génération." },
  { id: "generations", label: "Générations", description: "La filiation se lit en suivant les relations de transmission. Les positions ne représentent ni des niveaux d’entraînement ni un calendrier synchronisé." },
  { id: "branches", label: "Branches", description: "Les transmissions issues de D1 et de D2 coexistent. Les branches conservent un héritage et peuvent se développer dans des contextes différents." },
  { id: "cascades", label: "Cascades", description: "Sélectionnez un participant pour suivre sa filiation. Dans cet exemple, D1 et D2 transmettent après reconnaissance de leur rôle de Maître-relais." },
  { id: "evolution", label: "Évolution", description: "Quatre instantanés d’un scénario fictif montrent des arrivées, un départ, des rôles de relais reconnus et de nouveaux regroupements. Ces événements ne constituent pas un cycle obligatoire." },
];

export const lineageSnapshots = [
  { label: "Relations initiales", description: "Un Maître accompagne D1 et D2, réunis dans une première cohorte. La mission peut rester ouverte." },
  { label: "Arrivée de D3", description: "D3 rejoint les participants. Les relations et la composition de la cohorte évoluent avec cette arrivée." },
  { label: "Relais reconnus", description: "Dans ce scénario, les conditions de transmission secondaire sont supposées satisfaites et validées. D1 accompagne D4 et D5 ; D2 accompagne D6. Les cohortes sont recomposées." },
  { label: "Nouvelle cohorte", description: "D3 quitte le système. D7 arrive et rejoint D5 dans une nouvelle cohorte. Les branches issues de D1 et de D2 continuent à coexister." },
] as const;

export const lineageReferences: readonly DiagramReference[] = [
  { document: "tllib-specs · Cohorte", section: "Architecture et dynamique de la composition", url: "https://github.com/Tradition-Learning-Community/tllib-specs/blob/07439babd59c657354e3200ed24c55e2e3eeb72c/maths/16-cohort/cohort.md" },
  { document: "tllib-specs · Transmission en cascade", section: "Filiation, préservation et adaptation", url: "https://github.com/Tradition-Learning-Community/tllib-specs/blob/07439babd59c657354e3200ed24c55e2e3eeb72c/maths/17-cascade-transmission/cascade-transmission-system.md" },
  { document: "tllib-specs · Propagation générationnelle", section: "§1 · Transmission secondaire ; §6 · Diversification", url: "https://github.com/Tradition-Learning-Community/tllib-specs/blob/07439babd59c657354e3200ed24c55e2e3eeb72c/maths/29-generational-propagation/generational-propagation.md" },
];

export function visibleLineageNodes(snapshot: number) {
  return lineageNodes.filter((node) => node.from <= snapshot && (node.until === undefined || snapshot < node.until));
}

export function lineagePath(id: string): string[] {
  const path: string[] = [];
  let node = lineageNodes.find((item) => item.id === id);
  while (node) {
    path.unshift(node.id);
    node = node.parentId ? lineageNodes.find((item) => item.id === node?.parentId) : undefined;
  }
  return path;
}

export function cohortsAt(snapshot: number): readonly { id: string; label: string; members: readonly string[]; x: number; y: number; width: number; height: number }[] {
  if (snapshot < 2) return [{ id: "a", label: "Cohorte A", members: snapshot === 0 ? ["d1", "d2"] : ["d1", "d2", "d3"], x: 6, y: 20, width: 88, height: snapshot === 0 ? 23 : 48 }];
  return [
    { id: "a", label: "Cohorte A", members: ["d1", "d4"], x: 6, y: 20, width: 34, height: 51 },
    { id: "b", label: "Cohorte B", members: snapshot === 2 ? ["d2", "d3", "d6"] : ["d2", "d6"], x: 62, y: 20, width: 33, height: 74 },
    ...(snapshot >= 3 ? [{ id: "c", label: "Cohorte C", members: ["d5", "d7"], x: 5, y: 74, width: 53, height: 22 }] : []),
  ];
}
