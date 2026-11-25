// Public-facing workstreams. GitHub repositories are technical references,
// not separate public projects to be counted as community initiatives.
export const officialWork = [
  {
    id: "tradition-learning",
    name: "Tradition Learning",
    kind: "Recherche scientifique",
    status: "Recherche en cours",
    description: "Des chercheurs travaillent sur les fondements de Tradition Learning : la transmission des acquis, les relations Maître–Disciple–Communauté, les mathématiques et les spécifications scientifiques.",
    highlights: ["Théorie", "Mathématiques", "Recherche collaborative"],
    href: "/resources/tradition-learning",
    linkLabel: "Découvrir la recherche",
  },
  {
    id: "tllib",
    name: "tllib",
    kind: "Bibliothèque d’intelligence artificielle",
    status: "En développement",
    description: "La bibliothèque qui transforme les fondements de Tradition Learning en outils utilisables dans des applications d’IA. Son moteur C++20 et ses interfaces C++ et Python se développent avec la communauté.",
    highlights: ["Bibliothèque open source", "C++ et Python", "Contributions ouvertes"],
    href: "/resources/tllib",
    linkLabel: "Découvrir tllib",
  },
] as const;
