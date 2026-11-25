import Link from "next/link";
import { ArrowRight, BookOpenText, Code2 } from "lucide-react";
import { officialWork } from "@/data/official-work";
import "./official-work.css";

const icons = { "tradition-learning": BookOpenText, tllib: Code2 } as const;

export function OfficialProjects({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`section tlc-official-work${compact ? " tlc-official-work--compact" : ""}`} id="official-projects" aria-labelledby="tlc-official-work-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">NOS TRAVAUX</span>
          <h2 className="section-title" id="tlc-official-work-title">De la recherche à la bibliothèque.</h2>
          <p className="section-copy">Des scientifiques approfondissent les fondements de Tradition Learning. Des développeurs travaillent à leur mise en œuvre avec tllib.</p>
        </div>
        <div className="tlc-official-work-grid">
          {officialWork.map(item => {
            const Icon = icons[item.id];
            return <article className="tlc-official-work-card" key={item.id}>
              <div className="tlc-official-work-card-top">
                <span className="tlc-official-work-icon"><Icon size={25} aria-hidden="true" /></span>
                <span className="tlc-official-work-status">{item.status}</span>
              </div>
              <span className="tlc-official-work-kind">{item.kind}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="tlc-official-work-tags">{item.highlights.map(label => <span key={label}>{label}</span>)}</div>
              <Link href={item.href} className="tlc-official-work-link">{item.linkLabel} <ArrowRight size={18} aria-hidden="true" /></Link>
            </article>;
          })}
        </div>
        {compact && <p className="tlc-official-work-more"><Link href="/projects">Explorer les projets et initiatives TLC <ArrowRight size={17} aria-hidden="true" /></Link></p>}
      </div>
    </section>
  );
}
