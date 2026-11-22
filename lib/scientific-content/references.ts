/** Presentation contracts only. These types do not add scientific TL concepts. */
export type DiagramReference = {
  id?: string;
  document: string;
  section: string;
  url?: string;
};

export type DiagramNode = {
  id: string;
  label: string;
  description: string;
  reference?: DiagramReference;
};

export type DiagramEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  relation: string;
  reference: DiagramReference;
};

export type DiagramScene = {
  id: string;
  title: string;
  mode: "scientific" | "illustrative";
  nodes: readonly DiagramNode[];
  edges: readonly DiagramEdge[];
};
