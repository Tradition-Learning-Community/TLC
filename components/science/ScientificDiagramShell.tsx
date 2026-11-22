import type { ReactNode } from "react";
import { BookOpen, Info } from "lucide-react";
import type { DiagramReference } from "@/lib/scientific-content/references";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  mode: "scientific" | "illustrative" | "technical" | "institutional";
  references: readonly DiagramReference[];
  children: ReactNode;
  className?: string;
};

const labels = {
  scientific: "Repères scientifiques",
  illustrative: "Exemple illustratif",
  technical: "Architecture et fonctionnement",
  institutional: "Organisation proposée",
};

export default function ScientificDiagramShell({ id, eyebrow, title, description, mode, references, children, className = "" }: Props) {
  return <section id={id} className={`scientific-diagram ${className}`} aria-labelledby={`${id}-title`} data-diagram-mode={mode}>
    <header className="diagram-heading">
      <div className="diagram-heading-meta"><span className="eyebrow">{eyebrow || labels[mode]}</span><span className={`diagram-badge diagram-badge-${mode}`}>{labels[mode]}</span></div>
      <h2 id={`${id}-title`}>{title}</h2>
      <p>{description}</p>
    </header>
    {children}
    {mode === "illustrative" && <p className="diagram-note"><Info size={17} aria-hidden="true"/>Ce scénario facilite la lecture des relations. Il ne présente ni une simulation exécutée par tllib, ni un résultat expérimental.</p>}
    {references.length > 0 && <details className="diagram-references">
      <summary><BookOpen size={17} aria-hidden="true"/>Sources et références<span className="diagram-source-count">{references.length}</span></summary>
      <ul>{references.map((reference, index) => <li key={reference.id || `${reference.document}-${index}`}>
        {reference.url ? <a className="diagram-source" href={reference.url} target="_blank" rel="noopener noreferrer">{reference.document} — {reference.section}<span className="sr-only"> (nouvel onglet)</span></a> : <span>{reference.document} — {reference.section}</span>}
      </li>)}</ul>
    </details>}
  </section>;
}
