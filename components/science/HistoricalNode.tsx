import { ArrowDown, BookOpen, CircleDot, GitBranch, Users } from "lucide-react";
import type { HistoricalNode as HistoricalNodeData } from "./founding-analogy-data";

const visualIcons = {
  source: CircleDot,
  relay: ArrowDown,
  community: Users,
  continuity: GitBranch,
};

export default function HistoricalNode({ node, selected, onSelect, isLast }: {
  node: HistoricalNodeData;
  selected: boolean;
  onSelect: () => void;
  isLast: boolean;
}) {
  const Icon = visualIcons[node.role];
  return (
    <li className="tl-analogy-step">
      <button
        type="button"
        className={`tl-analogy-node tl-analogy-node--${node.role}${selected ? " is-selected" : ""}`}
        aria-pressed={selected}
        onClick={onSelect}
        title={`Explorer : ${node.label}`}
      >
        <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
        <span>{node.label}</span>
      </button>
      {!isLast && <span aria-hidden="true" className="tl-analogy-connector"><ArrowDown size={17} /></span>}
    </li>
  );
}
