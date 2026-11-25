// Institutional presentation: research, library and planned application.
// Labels here describe product maturity; they do not assert scientific validation.
export const officialWork = [
  {
    id: "tradition-learning",
    name: "Tradition Learning",
    kind: "Recherche scientifique",
    status: "Recherche active",
    description: "Une recherche en intelligence artificielle sur la transmission, la transformation et le développement d'un héritage vivant entre Maîtres, Disciples et Communautés. Ses fondements sont étudiés et formalisés par TLC.",
    highlights: ["Théorie et mathématiques", "Formalisation scientifique", "Expérimentations"],
    href: "/resources/tradition-learning",
    linkLabel: "Découvrir Tradition Learning",
  },
  {
    id: "tllib",
    name: "tllib",
    kind: "Bibliothèque scientifique",
    status: "V1 en développement",
    description: "Une bibliothèque open source pour constituer et faire fonctionner des systèmes Tradition Learning. Son moteur C++20, son runtime et ses interfaces C++ et Python sont en développement et soumis à des tests.",
    highlights: ["Moteur C++20", "API C++ et Python", "Conformité scientifique"],
    href: "/resources/tllib",
    linkLabel: "Découvrir la bibliothèque",
  },
  {
    id: "tl-studio",
    name: "TL Studio",
    kind: "Application envisagée",
    status: "En conception",
    description: "Une interface pour décrire un besoin en langage naturel, comprendre les éléments pertinents de Tradition Learning avec l'aide de modèles de langage, puis préparer l'utilisation de tllib sans devoir programmer chaque étape.",
    highlights: ["Interface guidée", "Assistance LLM envisagée", "Connexion à tllib"],
    href: "/tl-studio",
    linkLabel: "Découvrir le projet TL Studio",
  },
] as const;
