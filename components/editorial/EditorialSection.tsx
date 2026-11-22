import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "muted" | "dark";
  aside?: ReactNode;
};

export default function EditorialSection({ id, eyebrow, title, description, children, className = "", tone = "light", aside }: Props) {
  return <section id={id} className={`section editorial-section editorial-section-${tone} ${className}`}>
    <div className="container">
      <div className="editorial-section-heading">
        <div className="section-head">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2 className="section-title">{title}</h2>{description && <p className="section-copy">{description}</p>}</div>
        {aside && <div className="editorial-section-aside">{aside}</div>}
      </div>
      {children}
    </div>
  </section>;
}
