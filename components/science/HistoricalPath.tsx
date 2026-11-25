import type { HistoricalPath as HistoricalPathData, AnalogyView } from "./founding-analogy-data";
import HistoricalNode from "./HistoricalNode";

export default function HistoricalPath({ path, view, selectedId, onSelect }: {
  path: HistoricalPathData;
  view: AnalogyView;
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  const selectedNode = path.nodes.find(node => node.id === selectedId);
  return (
    <article className="tl-analogy-path">
      <header className="tl-analogy-path-heading">
        <span className="tl-analogy-subtitle">{path.subtitle}</span>
        <h3>{path.title}</h3>
      </header>
      <ol className="tl-analogy-steps" aria-label={`Transmission historique illustrée : ${path.title}`}>
        {path.nodes.map((node, index) => (
          <HistoricalNode
            key={node.id}
            node={node}
            selected={view === "detailed" && selectedId === node.id}
            onSelect={() => onSelect(node.id)}
            isLast={index === path.nodes.length - 1}
          />
        ))}
      </ol>
      {view === "detailed" && selectedNode ? (
        <div className="tl-analogy-detail" aria-live="polite">
          <strong>{selectedNode.label}</strong>
          <p>{selectedNode.description}</p>
        </div>
      ) : (
        <p className="tl-analogy-summary">{path.summary}</p>
      )}
    </article>
  );
}
