import type { DiagramReference } from "./references";

export const organizationReferences: readonly DiagramReference[] = [
  {
    id: "organization-proposal",
    document: "Organisation de Tradition Learning Community — Gilbert BEMWIZ",
    section: "§§ 3–5, pages 2–11 : gouvernance simplifiée, Core Team et six cercles",
  },
  {
    id: "project-governance",
    document: "tllib — Governance",
    section: "Project home and stewardship ; Decision authority",
    url: "https://github.com/Tradition-Learning-Community/tllib/blob/e4f192fc71803129b69253ab79d7167bc06c6ed2/GOVERNANCE.md",
  },
];

// The supplied institutional documents describe different organizational versions.
// This is the six-circle proposal, not an assertion of current mandates.
export const tlcCircles = [
  { id: "science", label: "Scientifique", subtitle: "Modèles et algorithmes", description: "Étudier et formaliser la théorie, développer les modèles et examiner leur validité scientifique. Le cercle associe mathématiciens et algorithmiciens.", responsibilities: ["Conception théorique", "Modélisation et algorithmes", "Validation scientifique"], sourceSection: "§ 5.1" },
  { id: "development", label: "Développement", subtitle: "Bibliothèque et logiciels", description: "Construire les logiciels du projet, leurs interfaces et leur outillage, à partir des spécifications et des décisions d’architecture adoptées.", responsibilities: ["Implémentation et maintenance", "Interfaces et outillage", "Revue technique"], sourceSection: "§ 5.2" },
  { id: "quality", label: "Qualité", subtitle: "Tests, revue et produit", description: "Vérifier les fonctionnalités, la fiabilité du logiciel et son adéquation aux besoins des utilisateurs, avec des preuves de test et des revues.", responsibilities: ["Tests manuels et automatisés", "Revue des fonctionnalités", "Préparation des versions"], sourceSection: "§ 5.3" },
  { id: "community", label: "Communauté", subtitle: "Communication et partenariats", description: "Animer les échanges, documenter les travaux, organiser les activités publiques et développer les relations avec les partenaires de TLC.", responsibilities: ["Vie communautaire", "Documentation et communication", "Relations et événements"], sourceSection: "§ 5.4" },
  { id: "finance", label: "Finance", subtitle: "Budget et soutiens", description: "Assurer le suivi financier, préparer les budgets et les rapports, et coordonner les démarches de subvention, de dons et de mécénat.", responsibilities: ["Comptabilité et budget", "Subventions et dons", "Suivi des soutiens"], sourceSection: "§ 5.5" },
  { id: "logistics", label: "Logistique", subtitle: "Moyens et infrastructure", description: "Organiser les ressources matérielles et logicielles nécessaires aux travaux : infrastructure, serveurs, comptes cloud, équipements et licences.", responsibilities: ["Infrastructure technique", "Ressources matérielles", "Licences et moyens communs"], sourceSection: "§ 5.6" },
] as const;

export const tlcCoreTeam = {
  id: "core-team",
  label: "Core Team",
  subtitle: "Coordination des cercles",
  description: "Dans l’organisation proposée, le Core Team réunit la présidence et les leads des six cercles. Il coordonne les priorités et les travaux, arbitre les choix techniques et prépare les sujets du Conseil d’administration.",
  responsibilities: ["Coordination stratégique et opérationnelle", "Priorités et arbitrages", "Liaison avec le Conseil d’administration"],
  sourceSection: "§ 4.4",
} as const;
