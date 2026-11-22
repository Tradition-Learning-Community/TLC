"use client";

import { useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** Content remains visible before hydration and without JavaScript. */
export default function RevealOnScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "0px 0px -36px 0px" });
  const reducedMotion = useReducedMotion();
  return <div ref={ref} className={`${className} reveal-content${visible && !reducedMotion ? " has-entered" : ""}`}>{children}</div>;
}
