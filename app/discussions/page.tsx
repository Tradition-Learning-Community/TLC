import Link from "next/link";
import { readCollection } from "@/lib/database";
export const dynamic = "force-dynamic";
export const metadata = { title: "Discussions — TLC", description: "Échanges et travaux communautaires de TLC." };
type Topic = { id: string; title: string; published?: boolean; summary?: string };
export default async function DiscussionsPage() {
  const topics = (await readCollection<Topic>("discussions")).filter(item => item.published === true);
  return <div className="directory-content"><section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">COMMUNAUTÉ</span><h1>Discussions</h1><p>Questions et échanges liés aux travaux de Tradition Learning.</p></div><div className="hero-art"><div className="art-core">TLC</div></div></div></section>
    <section className="section container">{topics.length === 0 ? <p className="section-copy">Aucune discussion publique pour le moment. Vous pouvez contacter la communauté pour proposer un sujet.</p> :
      <div className="grid-3">{topics.map(item=><article key={item.id} className="card"><h3>{item.title}</h3><p>{item.summary}</p></article>)}</div>}
    <p className="mt-8"><Link href="/participer" className="button button-dark">Participer aux échanges →</Link></p></section>
  </div>;
}
