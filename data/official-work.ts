export const officialWork = [
  {
    id: "tllib",
    name: "tllib",
    kind: "Bibliothèque scientifique",
    status: "V1 en développement",
    description: "Le moteur C++20 de Tradition Learning, avec runtime, providers explicites et interfaces C++ et Python. Les premiers contrats scientifiques sont progressivement implémentés et testés.",
    highlights: ["C++20", "Python", "Runtime et tests"],
    href: "https://github.com/Tradition-Learning-Community/tllib",
  },
  {
    id: "tllib-specs",
    name: "tllib-specs",
    kind: "Spécifications scientifiques",
    status: "Catalogue publié",
    description: "Les définitions et contrats qui guident la bibliothèque : 36 domaines scientifiques et 694 fiches de fonctionnalité documentées, avec traçabilité et validation.",
    highlights: ["36 domaines", "694 TLC-FC", "Contrats et validation"],
    href: "https://github.com/Tradition-Learning-Community/tllib-specs",
  },
  {
    id: "TLC",
    name: "Portail TLC",
    kind: "Plateforme communautaire",
    status: "Site en ligne",
    description: "Le portail de la communauté, conçu pour présenter la théorie, les projets, les ressources, les contributeurs et les activités de TLC.",
    highlights: ["Next.js", "GitHub", "Contributions ouvertes"],
    href: "https://github.com/Tradition-Learning-Community/TLC",
  },
] as const;

export const communityContributions = [
  {
    handle: "Athena-Evan01",
    scope: "Lisibilité du portail",
    description: "Refonte typographique, meilleure lecture des textes et ajustements de l'affichage responsive.",
    href: "https://github.com/Tradition-Learning-Community/TLC/pull/26",
    pr: "Contribution #26",
  },
  {
    handle: "SierraKaluba",
    scope: "Fonctionnement de la plateforme",
    description: "Travaux sur l'administration, la persistance et l'organisation technique du portail.",
    href: "https://github.com/Tradition-Learning-Community/TLC/pull/8",
    pr: "Contribution #8",
  },
  {
    handle: "skylore300-hash",
    scope: "Premières versions du portail",
    description: "Participation aux premières étapes du développement du site TLC et à son évolution.",
    href: "https://github.com/Tradition-Learning-Community/TLC/pull/5",
    pr: "Contribution #5",
  },
] as const;
