import type { DiagramReference } from "./references";

const repository = "https://github.com/Tradition-Learning-Community/tllib";
export const productSourceCommit = "e4f192fc71803129b69253ab79d7167bc06c6ed2";

export const productReferences: readonly DiagramReference[] = [
  { id: "product-contract", document: "tllib — Contrat produit", section: "Architecture produit et fin de V1", url: `${repository}/blob/${productSourceCommit}/docs/v1/PRODUCT-CONTRACT.md` },
  { id: "product-architecture", document: "tllib — Architecture officielle", section: "Dépendances, runtime, providers et Python", url: `${repository}/blob/${productSourceCommit}/docs/v1/ARCHITECTURE.md` },
];

// These responsibilities are the adopted frontend design, not new tllib API calls.
export const constitutionReference: DiagramReference = {
  id: "constitution-design",
  document: "TLC 2027 — Spécification frontend",
  section: "VIS-04 : constitution et distinctions scientifiques",
  url: "https://github.com/Tradition-Learning-Community/TLC/blob/main/docs/frontend/TLC-2027-FRONTEND-SPEC.md",
};

export const constitutionResponsibilities = [
  {
    id: "mission",
    label: "Mission et Problème",
    summary: "Formuler ce que le système doit explorer ou accomplir.",
    description: "La mission et le problème décrivent le travail computationnel attendu, son contexte et ses contraintes. La mission peut rester ouverte ; la constitution ne suppose pas qu’une solution soit déjà connue du Maître.",
    developer: "La formulation, le contexte de travail et les conditions d’évaluation disponibles.",
    system: "Un cadre explicite pour orienter les activités permises par les contrats TL.",
  },
  {
    id: "resources",
    label: "Ressources",
    summary: "Identifier les moyens effectivement disponibles.",
    description: "Données, modèles, algorithmes, fonctions, environnements ou instruments peuvent soutenir une activité TL. Leur nature informatique ne leur attribue pas automatiquement un rôle scientifique.",
    developer: "Les ressources accessibles, leurs interfaces et leurs contraintes d’utilisation.",
    system: "Des ressources identifiées auxquelles les activités et capacités pourront être associées.",
  },
  {
    id: "roles",
    label: "Rôles initiaux",
    summary: "Constituer les entités permises par les conditions scientifiques.",
    description: "Maître, Disciple et Communauté sont des rôles scientifiques. Un modèle ou un programme ne devient pas l’une de ces entités par sa seule présence dans l’application. La fondation peut évoluer avec l’arrivée de nouveaux participants.",
    developer: "Les participants et les éléments nécessaires à leur constitution initiale.",
    system: "Des identités et relations initiales compatibles avec les contrats applicables.",
  },
  {
    id: "capacities",
    label: "Capacités",
    summary: "Associer les possibilités de mobilisation aux participants.",
    description: "La Capacité est l’un des huit objets fondamentaux. Les moyens logiciels mis à disposition soutiennent son expression ; ils ne suffisent pas à la définir ni à établir une Compétence acquise.",
    developer: "Les moyens mobilisables et leurs interfaces, avec les conditions nécessaires.",
    system: "Des associations explicites entre participants, ressources et capacités permises.",
  },
  {
    id: "conditions",
    label: "Conditions scientifiques",
    summary: "Vérifier ce qui peut être constitué ou exécuté.",
    description: "Chaque opération dépend de conditions scientifiques et techniques. Certains contrats sont exécutables, d’autres dépendent de providers explicites ; d’autres encore décrivent uniquement une structure.",
    developer: "Les préconditions, providers et éléments de preuve exigés par l’opération visée.",
    system: "Une vérification explicite des possibilités disponibles et de leurs limites.",
  },
  {
    id: "availability",
    label: "Mise à disposition",
    summary: "Rendre le système accessible à l’application.",
    description: "L’application obtient un système qu’elle peut utiliser selon ses capacités effectives. Les acquis et contenus futurs peuvent apparaître pendant son évolution ; toute l’anatomie d’une Tradition n’a pas à être saisie à l’avance.",
    developer: "Le contexte d’utilisation et les modalités d’accès nécessaires à son application.",
    system: "Un système constitué dont l’exécution et les résultats restent à établir distinctement.",
  },
] as const;

export const systemReadings = [
  { id: "constituted", label: "Système constitué", title: "Une fondation structurelle", description: "Les structures et associations nécessaires sont présentes. Ce constat porte sur la constitution du système.", evidence: "Vérification des structures, identités et relations requises." },
  { id: "executable", label: "Opération exécutable", title: "Des conditions d’exécution satisfaites", description: "Une opération déterminée dispose de ses conditions scientifiques et des moyens d’exécution requis. Cette possibilité ne préjuge pas du résultat.", evidence: "Contrat applicable, préconditions et providers explicitement disponibles." },
  { id: "learning", label: "Apprentissage constaté", title: "Une transformation observée et évaluée", description: "Un apprentissage doit être établi par les observations et évaluations pertinentes. Un simple changement de paramètres informatiques ne suffit pas à le conclure.", evidence: "Observations et évaluations conformes aux critères scientifiques de l’activité." },
  { id: "tradition", label: "Développement d’une Tradition", title: "Un héritage vivant en développement", description: "Une Tradition est un héritage intégré, évolutif et transmissible. Son développement ne se réduit ni à un modèle sauvegardé ni à la résolution d’un problème.", evidence: "Éléments scientifiques établissant intégration, évolution et transmission de l’héritage." },
] as const;

export const architectureParts = [
  { id: "specs", label: "Spécifications verrouillées", subtitle: "tllib-specs", description: "Un snapshot immuable est épinglé dans specs.lock.json. Il alimente les métadonnées et les contrôles de conformité lors de la construction et de la validation ; les sources internes de tllib-specs ne sont pas une dépendance d’exécution.", section: "Intégration tllib-specs", url: `${repository}/blob/${productSourceCommit}/docs/v1/ARCHITECTURE.md#intégration-tllib-specs` },
  { id: "cpp", label: "API C++", subtitle: "Interface publique", description: "L’API C++ publique donne accès au même moteur scientifique de référence. Elle expose les types et comportements prévus par les contrats du produit.", section: "Architecture produit", url: `${repository}/blob/${productSourceCommit}/docs/v1/PRODUCT-CONTRACT.md#architecture-produit` },
  { id: "python", label: "API Python", subtitle: "Bindings natifs", description: "L’interface Python expose le moteur natif et l’interopérabilité numérique. Elle ne contient pas une deuxième implémentation scientifique indépendante. Nanobind est retenu pour les nouvelles surfaces.", section: "Python", url: `${repository}/blob/${productSourceCommit}/docs/v1/ARCHITECTURE.md#python` },
  { id: "core", label: "Moteur C++20", subtitle: "Une implémentation scientifique", description: "Le calcul scientifique de référence, les types fondamentaux et les invariants résident dans le moteur C++20. Les domaines réutilisent les fondations communes et les dépendances autorisées.", section: "Dépendances entre couches", url: `${repository}/blob/${productSourceCommit}/docs/v1/ARCHITECTURE.md#dépendances-entre-couches` },
  { id: "runtime", label: "Runtime et registry", subtitle: "Orchestration explicite", description: "Le registry relie les identifiants TLC-FC à leur statut, leur version, leur provenance et leur implémentation. Le runtime coordonne dispatch, contexte d’exécution et résolution des providers.", section: "Runtime, registry et providers", url: `${repository}/blob/${productSourceCommit}/docs/v1/ARCHITECTURE.md#runtime-registry-et-providers` },
  { id: "providers", label: "Providers", subtitle: "Capacités déclarées", description: "Les providers sont des ports explicites. Les capacités requises et leur disponibilité sont contrôlées ; aucun provider scientifique ni appel réseau n’est ajouté implicitement.", section: "Runtime, registry et providers", url: `${repository}/blob/${productSourceCommit}/docs/v1/ARCHITECTURE.md#runtime-registry-et-providers` },
  { id: "arrays", label: "Interopérabilité", subtitle: "Données et calcul numérique", description: "Une vue numérique minimale décrit les buffers et leur mémoire. NumPy et DLPack sont utilisés lorsque pertinents ; l’échange sans copie dépend du format et de la durée de vie des données.", section: "Arrays et calcul numérique", url: `${repository}/blob/${productSourceCommit}/docs/v1/ARCHITECTURE.md#arrays-et-calcul-numérique` },
  { id: "conformance", label: "Conformité", subtitle: "Contrats, tests et provenance", description: "La conformité relie les comportements aux contrats verrouillés et à des preuves exécutées. La publication de V1 exige la qualification du catalogue, les interfaces installables et les contrôles de release satisfaits.", section: "Fin de V1", url: `${repository}/blob/${productSourceCommit}/docs/v1/PRODUCT-CONTRACT.md#fin-de-v1` },
] as const;

export const tllibRepository = repository;
