import type { DiagramReference } from "./references";

const base = "https://github.com/Tradition-Learning-Community/tllib-specs/blob/07439babd59c657354e3200ed24c55e2e3eeb72c/maths";

export type FundamentalEntityId = "master" | "disciple" | "community";

export type FundamentalEntity = {
  id: FundamentalEntityId;
  label: string;
  short: string;
  description: string;
  functions: readonly string[];
  reference: DiagramReference;
};

export const fundamentalEntities: readonly FundamentalEntity[] = [
  {
    id: "master",
    label: "Maître",
    short: "Guider et transmettre",
    description: "Entité catalytique qui peut induire et guider la transformation d’un Disciple. Son rôle repose sur l’exemplarité, la cohérence, les capacités de transmission et la légitimité contextuelle. Il peut accompagner une mission dont la solution reste à découvrir.",
    functions: ["Transmettre et adapter les contenus de la Tradition.", "Guider la transformation selon les capacités et le contexte du Disciple.", "Continuer à évoluer dans ses relations avec les Disciples et la Communauté."],
    reference: { document: "tllib-specs · Le Maître", section: "§§1–3 · Définition, conditions et structure", url: `${base}/00-master/master.md` },
  },
  {
    id: "disciple",
    label: "Disciple",
    short: "Apprendre et contribuer",
    description: "Entité dynamique dotée de potentiels, d’une réceptivité et d’une trajectoire propres. Le Disciple transforme les contenus reçus, développe des compétences et peut découvrir, créer et contribuer à l’évolution de la Tradition.",
    functions: ["Intégrer l’interaction guidée et les retours d’expérience.", "Actualiser des capacités par la pratique et la transformation.", "Développer son autonomie et, sous conditions, devenir transmetteur à son tour."],
    reference: { document: "tllib-specs · Le Disciple", section: "§§1–2 · Définition et structure", url: `${base}/01-disciple/disciple.md` },
  },
  {
    id: "community",
    label: "Communauté",
    short: "Soutenir et réguler",
    description: "Entité collective qui soutient les relations, valide les progressions et entretient la continuité de la Tradition. Ses fonctions comprennent la mémoire, la reconnaissance et la régulation. La Communauté d’un système TL est distincte de l’organisation TLC.",
    functions: ["Donner un cadre aux interactions et aux contributions.", "Participer à la validation, à la reconnaissance et à la régulation.", "Entretenir une mémoire vivante et une continuité entre générations."],
    reference: { document: "tllib-specs · La Communauté", section: "§§1–2 · Fonctions et espaces", url: `${base}/02-community/community.md` },
  },
];

export const entityRelations: readonly {
  id: string;
  sourceId: FundamentalEntityId;
  targetId: FundamentalEntityId;
  label: string;
  description: string;
  reference: DiagramReference;
}[] = [
  {
    id: "master-disciple",
    sourceId: "master",
    targetId: "disciple",
    label: "Transmission et transformation",
    description: "Le guidage du Maître et l’activité du Disciple participent à une relation qui transforme les participants et peut évoluer vers davantage d’autonomie.",
    reference: { document: "Tradition Learning — manuscrit principal", section: "§3.10.2 · Relation Maître–Disciple" },
  },
  {
    id: "master-community",
    sourceId: "master",
    targetId: "community",
    label: "Reconnaissance et régulation",
    description: "La Communauté participe à la légitimation et à la régulation du Maître ; celui-ci contribue aux connaissances et à la continuité collectives.",
    reference: { document: "Tradition Learning — manuscrit principal", section: "§§3.10.3 et 3.31.1 · Maître et Communauté" },
  },
  {
    id: "disciple-community",
    sourceId: "disciple",
    targetId: "community",
    label: "Validation et intégration",
    description: "La Communauté reconnaît les progressions et soutient l’intégration du Disciple. Les contributions des participants enrichissent la mémoire collective.",
    reference: { document: "Tradition Learning — manuscrit principal", section: "§§3.22.1 et 3.31.2 · Disciple et Communauté" },
  },
];

export const entityReferences: readonly DiagramReference[] = [
  ...fundamentalEntities.map((entity) => entity.reference),
  { document: "Tradition Learning — manuscrit principal", section: "§§3.10.2–3.10.3 et 3.31 · Relations entre entités" },
];
