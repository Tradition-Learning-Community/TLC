export type HistoricalNode = {
  id: string;
  label: string;
  role: "source" | "relay" | "community" | "continuity";
  description: string;
};

export type HistoricalPath = {
  id: "buddha" | "socrates" | "jesus";
  title: string;
  subtitle: string;
  summary: string;
  nodes: HistoricalNode[];
};

export type AnalogyView = "overview" | "detailed";

// Presentation of historical examples only. These are not TL scientific entities,
// objects, computations, or normative relation / generation records.
export const historicalPaths: HistoricalPath[] = [
  {
    id: "buddha",
    title: "Bouddha",
    subtitle: "Transmission orale, pratique et continuité",
    summary: "L’enseignement passe par les disciples et la pratique communautaire, puis se conserve et se diversifie.",
    nodes: [
      { id: "buddha-source", label: "Bouddha", role: "source", description: "Un maître transmet un enseignement et propose une voie de pratique. Les textes sont constitués et conservés par différentes traditions." },
      { id: "buddha-disciples", label: "Disciples", role: "relay", description: "Les disciples apprennent, pratiquent, transmettent et interprètent l’enseignement dans leurs contextes." },
      { id: "buddha-communities", label: "Communautés monastiques", role: "community", description: "Les communautés soutiennent des pratiques partagées et assurent la continuité collective." },
      { id: "buddha-traditions", label: "Traditions bouddhiques", role: "continuity", description: "Plusieurs traditions poursuivent, structurent et diversifient cet héritage sur la durée." },
    ],
  },
  {
    id: "socrates",
    title: "Socrate",
    subtitle: "Dialogue, filiation et formation intellectuelle",
    summary: "Une filiation intellectuelle où chacun peut développer des idées nouvelles : ce n’est pas la répétition d’un même texte.",
    nodes: [
      { id: "socrates-source", label: "Socrate", role: "source", description: "L’enseignement par dialogue est principalement connu à travers les écrits d’autrui, notamment ceux de Platon." },
      { id: "socrates-plato", label: "Platon", role: "relay", description: "Disciple de Socrate, Platon développe sa propre philosophie et transmet aussi un héritage socratique par ses dialogues." },
      { id: "socrates-aristotle", label: "Aristote", role: "relay", description: "Élève de Platon, Aristote développe des conceptions souvent distinctes de celles de son maître." },
      { id: "socrates-alexander", label: "Alexandre le Grand", role: "continuity", description: "Aristote fut précepteur d’Alexandre. Ce lien illustre un prolongement pédagogique et historique, non la transmission intacte d’une seule philosophie." },
    ],
  },
  {
    id: "jesus",
    title: "Jésus",
    subtitle: "Mission, disciples et structuration communautaire",
    summary: "Une mission transmise par des disciples et des communautés, avant et parallèlement à sa conservation écrite.",
    nodes: [
      { id: "jesus-source", label: "Jésus", role: "source", description: "La prédication et la mission se transmettent d’abord dans une communauté de disciples, plutôt que par un ouvrage rédigé par Jésus." },
      { id: "jesus-disciples", label: "Apôtres et disciples", role: "relay", description: "Les disciples contribuent à faire connaître, interpréter et transmettre l’enseignement et la mission." },
      { id: "jesus-communities", label: "Premières communautés", role: "community", description: "Les communautés naissantes soutiennent les pratiques, l’enseignement et la vie collective." },
      { id: "jesus-traditions", label: "Églises et traditions", role: "continuity", description: "Les traditions chrétiennes se structurent, écrivent, conservent et interprètent les enseignements au fil des générations." },
    ],
  },
];

export const analogyMotifs = [
  { label: "Initiative", description: "Un enseignement ou une mission initiale." },
  { label: "Transmission", description: "Des personnes reçoivent, interprètent et pratiquent." },
  { label: "Communautés", description: "Des relations collectives soutiennent la continuité." },
  { label: "Évolution", description: "De nouveaux relais, contributions et branches apparaissent." },
] as const;
