"use client";

import { useEffect, useRef, useState } from "react";

export type DiagramBox = { left: number; top: number; right: number; bottom: number; cx: number; cy: number };
export type DiagramGeometry = { width: number; height: number; nodes: Record<string, DiagramBox> };

/** Browser geometry for presentation connectors; it carries no scientific state. */
export default function useDiagramGeometry(revision: string | number = 0) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<DiagramGeometry | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const buttons = Array.from(canvas.querySelectorAll<HTMLElement>("[data-science-node]"));
    let frame = 0;
    const measure = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const nodes: Record<string, DiagramBox> = {};
      for (const button of buttons) {
        const id = button.dataset.scienceNode;
        if (!id) continue;
        const box = button.getBoundingClientRect();
        const left = box.left - bounds.left;
        const top = box.top - bounds.top;
        nodes[id] = { left, top, right: left + box.width, bottom: top + box.height, cx: left + box.width / 2, cy: top + box.height / 2 };
      }
      const next = { width: bounds.width, height: bounds.height, nodes };
      setGeometry((previous) => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(canvas);
    for (const button of buttons) observer.observe(button);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [revision]);

  return { canvasRef, geometry };
}

export function connectorPath(points: readonly (readonly [number, number])[]) {
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
}
