import type { DiagramReference } from "./references";

const dimensionsUrl = "https://github.com/Tradition-Learning-Community/tllib-specs/blob/07439babd59c657354e3200ed24c55e2e3eeb72c/maths/03-huit-dimensions-de-tl/huit-dimensions-de-tl.md";
const relationsUrl = "https://github.com/Tradition-Learning-Community/tllib-specs/blob/07439babd59c657354e3200ed24c55e2e3eeb72c/maths/15-relations/relations.md";

export type FundamentalObjectId = "message" | "principles" | "values" | "virtues" | "capacities" | "competencies" | "practice" | "lived-experience";
export type FundamentalObject = {
  id: FundamentalObjectId;
  label: string;
  short: string;
  description: string;
  functions: readonly string[];
  reference: DiagramReference;
};

export const fundamentalObjects: readonly FundamentalObject[] = [
  {
    id: "message", label: "Message", short: "Sens structuré",
    description: "Unité de sens structurée qui articule connaissance, intention, dimension symbolique, organisation procédurale et contexte. Le Message porte un potentiel d’interprétation et de transformation au cours de sa transmission.",
    functions: ["Rendre un contenu interprétable et transmissible.", "Articuler contenu explicite, symbolique, procédure et contexte.", "Permettre une réinterprétation dans de nouvelles situations."],
    reference: { document: "tllib-specs · Huit dimensions", section: "§2 · Le Message", url: `${dimensionsUrl}#2-le-message-message` },
  },
  {
    id: "principles", label: "Principes", short: "Structures de guidage",
    description: "Éléments conceptuels stables et structurants qui guident l’interprétation, l’orientation et l’action dans leur domaine d’applicabilité. Ils fournissent des contraintes génératives et des ancrages pour la construction du sens.",
    functions: ["Structurer l’interprétation des situations.", "Guider la convergence du Message.", "Soutenir la génération d’hypothèses et de solutions."],
    reference: { document: "tllib-specs · Huit dimensions", section: "§3 · Les Principes", url: `${dimensionsUrl}#3-les-principes-principles` },
  },
  {
    id: "values", label: "Valeurs", short: "Orientation et priorités",
    description: "Structures d’orientation qui organisent l’évaluation, la priorisation et l’action au sein d’une Tradition. Elles associent un noyau, une hiérarchie, un engagement et une expression contextuelle.",
    functions: ["Orienter les décisions selon ce qui compte dans la Tradition.", "Articuler priorités, cohérence et engagement.", "Guider l’activation des capacités dans un contexte donné."],
    reference: { document: "tllib-specs · Huit dimensions", section: "§4 · Les Valeurs", url: `${dimensionsUrl}#4-les-valeurs-values` },
  },
  {
    id: "virtues", label: "Vertus", short: "Dispositions cultivées",
    description: "Dispositions stables développées par la pratique et l’habituation. Elles participent à la cohérence de l’action et à l’excellence dans la poursuite du Message, tout en restant sensibles au contexte.",
    functions: ["Stabiliser des dispositions dans l’action.", "Soutenir une expression cohérente du Message.", "Se développer par la pratique, l’exemplarité et l’environnement."],
    reference: { document: "tllib-specs · Huit dimensions", section: "§5 · Les Vertus", url: `${dimensionsUrl}#5-les-vertus-virtues` },
  },
  {
    id: "capacities", label: "Capacités", short: "Potentiel mobilisable",
    description: "Potentiel dynamique d’un agent à mobiliser des ressources pour agir ou développer une compétence dans un contexte donné. Les capacités comprennent des dimensions acquises, latentes et émergentes.",
    functions: ["Ouvrir un espace de développement possible.", "Mobiliser les ressources nécessaires à l’action.", "Évoluer par la pratique, la transmission et l’exploration."],
    reference: { document: "tllib-specs · Huit dimensions", section: "§6 · Les Capacités", url: `${dimensionsUrl}#6-les-capacités-capacities` },
  },
  {
    id: "competencies", label: "Compétences", short: "Actualisation démontrable",
    description: "Capacités actualisées et démontrables qui mobilisent des ressources intégrées pour accomplir une tâche ou résoudre un problème. Leur expression est située, observable et susceptible d’être validée.",
    functions: ["Accomplir des actions dans un contexte défini.", "Intégrer plusieurs ressources dans une réalisation observable.", "Permettre l’évaluation de l’actualisation des capacités."],
    reference: { document: "tllib-specs · Huit dimensions", section: "§7 · Les Compétences", url: `${dimensionsUrl}#7-les-compétences-competencies` },
  },
  {
    id: "practice", label: "Pratique", short: "Action située et répétée",
    description: "Ensemble d’actions répétées, situées et intentionnelles par lesquelles connaissances, valeurs et capacités sont incarnées, consolidées et transformées en compétences observables et transmissibles.",
    functions: ["Relier les ressources et les capacités à leur mise en œuvre.", "Intégrer l’exposition, l’exercice et les retours.", "Consolider les compétences et cultiver les dispositions."],
    reference: { document: "tllib-specs · Huit dimensions", section: "§8 · La Pratique", url: `${dimensionsUrl}#8-la-pratique-practice` },
  },
  {
    id: "lived-experience", label: "Expérience vécue", short: "Traces et sens intégrés",
    description: "Ensemble des événements, situations pratiques et états vécus par lesquels l’exposition devient connaissance incorporée, jugement et mémoire structurante. Elle associe les traces temporelles à leur interprétation intégrée.",
    functions: ["Conserver des traces des situations traversées.", "Intégrer leur sens dans une mémoire vivante.", "Nourrir le jugement et la continuité de l’apprentissage."],
    reference: { document: "tllib-specs · Huit dimensions", section: "§9 · L’Expérience vécue", url: `${dimensionsUrl}#9-lexpérience-vécue-lived-experience` },
  },
];

// Editorial descriptions of relationships established by the sources. These are
// presentation edges, not additional scientific operators or executable contracts.
export const objectRelations: readonly {
  id: string;
  sourceId: FundamentalObjectId;
  targetId: FundamentalObjectId;
  relation: string;
  reference: DiagramReference;
}[] = [
  { id: "principles-message", sourceId: "principles", targetId: "message", relation: "Les Principes guident la convergence du Message.", reference: { document: "tllib-specs · Huit dimensions", section: "§3.4 · Dynamique Principe–Message", url: `${dimensionsUrl}#34-dynamique-principe-message` } },
  { id: "virtues-message", sourceId: "virtues", targetId: "message", relation: "Les Vertus soutiennent l’incarnation fidèle du Message.", reference: { document: "tllib-specs · Relations", section: "§7 · Synthèse", url: `${relationsUrl}#7-synthèse` } },
  { id: "values-capacities", sourceId: "values", targetId: "capacities", relation: "Les Valeurs guident l’activation des Capacités.", reference: { document: "tllib-specs · Relations", section: "§7 · Synthèse", url: `${relationsUrl}#7-synthèse` } },
  { id: "practice-virtues", sourceId: "practice", targetId: "virtues", relation: "La Pratique participe au développement des Vertus.", reference: { document: "tllib-specs · Huit dimensions", section: "§§5.1 et 5.3 · Développement des Vertus", url: `${dimensionsUrl}#53-dynamique-de-développement` } },
  { id: "capacities-competencies", sourceId: "capacities", targetId: "competencies", relation: "Les Capacités s’actualisent en Compétences.", reference: { document: "tllib-specs · Huit dimensions", section: "§7.1 · Relation capacité–compétence", url: `${dimensionsUrl}#71-définition` } },
  { id: "practice-competencies", sourceId: "practice", targetId: "competencies", relation: "La Pratique consolide et transforme des capacités en Compétences.", reference: { document: "tllib-specs · Huit dimensions", section: "§8.1 · Définition de la Pratique", url: `${dimensionsUrl}#81-définition` } },
  { id: "practice-experience", sourceId: "practice", targetId: "lived-experience", relation: "Les situations pratiques participent à l’Expérience vécue et à son interprétation.", reference: { document: "tllib-specs · Huit dimensions", section: "§9.1 · Traces temporelles et interprétation", url: `${dimensionsUrl}#91-définition` } },
];

export const objectReferences: readonly DiagramReference[] = [
  { document: "tllib-specs · Les huit dimensions", section: "§§2–9 · Définitions et articulations", url: dimensionsUrl },
  { document: "tllib-specs · Relations", section: "§§2–7 · Relations du Maître aux objets et synthèse", url: relationsUrl },
];

export const objectStructures: Readonly<Record<FundamentalObjectId, readonly string[]>> = {
  message: ["Contenu", "Dimension symbolique", "Structure procédurale", "Contexte"],
  principles: ["Domaine d’applicabilité", "Essence formelle", "Relation de guidage"],
  values: ["Principe fondamental", "Hiérarchie axiologique", "Poids décisionnel contextuel", "Orientation existentielle", "Intégration identitaire", "Système de transmission", "Cohérence systémique", "Engagement", "Attracteur dynamique", "Mécanisme motivationnel"],
  virtues: ["Identité", "Nature", "Fonction", "Structure", "Domaine"],
  capacities: ["Dispositions innées", "Potentialités acquises", "Potentiel latent", "Capacités émergentes"],
  competencies: ["Composantes techniques", "Composantes cognitives", "Composantes sociales", "Composantes adaptatives", "Composantes métacognitives"],
  practice: ["Capacités mobilisées", "Exposition : durée, immersion, exemplarité", "Feedback : fréquence, précision, pertinence", "Compétences actualisées par l’opérateur de Pratique"],
  "lived-experience": ["Traces temporelles des situations et actions", "Interprétation holistique de l’expérience"],
};
