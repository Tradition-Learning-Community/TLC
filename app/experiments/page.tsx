import Link from "next/link";
import { readCollection } from "@/lib/database";
export const dynamic = "force-dynamic";
export const metadata = { title: "Expérimentations — TLC", description: "Protocoles, tests et résultats des travaux Tradition Learning." };
type Experiment = { id: string; title: string; notes?: string; published?: boolean; status?: string; resultUrl?: string };
export default async function ExperimentsPage() {
  const items = (await readCollection<Experiment>("experiments")).filter(x => x.published === true);
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">RECHERCHE</span><h1>Expérimentations</h1><p>Protocoles, résultats et limites des études réellement publiées par TLC.</p></div><div className="hero-art"><div className="art-core">TL</div></div></div></section>
    <section className="section container">{items.length===0 ? <p className="section-copy">Aucun résultat expérimental n'est encore publié sur cette page.</p> :
      <div className="grid-3">{items.map(x=><article className="card" key={x.id}><span className="eyebrow">{x.status || "Étude"}</span><h3>{x.title}</h3><p>{x.notes}</p>{x.resultUrl && <a href={x.resultUrl} className="card-link" target="_blank" rel="noopener noreferrer">Consulter les résultats ↗</a>}</article>)}</div>}
      <p className="mt-8"><Link href="/recherche" className="text-link">Découvrir les travaux scientifiques →</Link></p>
    </section>
  </div>;
}
