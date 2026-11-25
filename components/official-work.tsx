import Link from "next/link";
import { ArrowUpRight, Code2, FileCheck2, Network, GitPullRequest } from "lucide-react";
import { communityContributions, officialWork } from "@/data/official-work";
import "./official-work.css";

const icons = { "tllib": Code2, "tllib-specs": FileCheck2, "TLC": Network } as const;

export function OfficialProjects({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`section tlc-official-work${compact ? " tlc-official-work--compact" : ""}`} id="official-projects" aria-labelledby="tlc-official-work-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">NOS CHANTIERS</span>
          <h2 className="section-title" id="tlc-official-work-title">Trois dépôts. Un travail collectif.</h2>
          <p className="section-copy">Les fondements scientifiques, la bibliothèque et le portail de la communauté évoluent dans leurs dépôts respectifs.</p>
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
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="tlc-official-work-link">Explorer le dépôt <ArrowUpRight size={18} aria-hidden="true" /></a>
            </article>;
          })}
        </div>
        {compact && <p className="tlc-official-work-more"><Link href="/projects">Voir les projets de la communauté <ArrowUpRight size={17} aria-hidden="true" /></Link></p>}
      </div>
    </section>
  );
}

export function ContributorWork() {
  return (
    <section className="section tlc-contribution-work" aria-labelledby="tlc-contribution-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">LA COMMUNAUTÉ EN ACTION</span>
          <h2 className="section-title" id="tlc-contribution-title">Des contributions qui se voient.</h2>
          <p className="section-copy">Des membres participent à la construction du portail. Voici quelques travaux intégrés au dépôt public.</p>
        </div>
        <div className="tlc-contribution-work-grid">
          {communityContributions.map(item => <article key={item.handle} className="tlc-contribution-work-card">
            <span className="tlc-contribution-work-icon"><GitPullRequest size={21} aria-hidden="true" /></span>
            <h3>{item.scope}</h3>
            <p>{item.description}</p>
            <div className="tlc-contribution-work-author">
              <a href={`https://github.com/${item.handle}`} target="_blank" rel="noopener noreferrer">{item.handle}</a>
              <a href={item.href} target="_blank" rel="noopener noreferrer">{item.pr} <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
