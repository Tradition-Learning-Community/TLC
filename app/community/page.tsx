import Link from "next/link";
import { readCollection } from "@/lib/database";
import { publishedOrganizations } from "@/lib/public-content";
import type { Contributor } from "@/lib/types";
export const dynamic = "force-dynamic";
export const metadata = { title: "Communauté — TLC", description: "Contributeurs, bénévolat, partenaires et vie de Tradition Learning Community." };
export default async function CommunityPage() {
  const [people, organizations] = await Promise.all([readCollection<Contributor>("contributors").then(rows => rows.filter(row => row.published !== false)), publishedOrganizations()]);
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">TRADITION LEARNING COMMUNITY</span><h1>La communauté</h1><p>Les personnes et les structures qui contribuent à faire avancer la recherche, le développement et les activités de TLC.</p><div className="hero-actions"><Link href="/participer" className="button button-gold">Participer à TLC ↗</Link></div></div><div className="hero-art"><div className="art-core">TLC</div></div></div></section>
    <section className="section container"><div className="section-head"><h2 className="section-title">Contributeurs référencés</h2><p className="section-copy">Ces profils représentent des contributions référencées, pas nécessairement des fonctions institutionnelles ou des adhésions officielles.</p></div>
      {people.length === 0 ? <p>Aucun profil public pour le moment.</p> :
        <div className="flex flex-wrap gap-5">{people.map(person => {
          const url = person.github.startsWith("https://") ? person.github : "https://github.com/" + person.github;
          const avatar = person.avatar || (url.startsWith("https://github.com/") ? url + ".png" : "");
          return <a key={person.id} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--card)] py-2 pl-2 pr-5 transition hover:border-[var(--gold)]">
            {avatar ? <img src={avatar} alt="" className="h-12 w-12 rounded-full object-cover" /> : <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)] text-white">{person.name.slice(0,1)}</span>}
            <span className="text-sm font-semibold">{person.name}</span>
          </a>;
        })}</div>}
    </section>
    {organizations.length>0 && <section className="section container"><div className="section-head"><h2 className="section-title">Organisations et soutiens</h2></div>
      <div className="grid-3">{organizations.map(org=><article className="card" key={org.id}>
        {org.logo && <img src={org.logo} alt="" style={{height:70,maxWidth:180,objectFit:"contain",marginBottom:18}}/>}
        <span className="eyebrow">{org.category}</span><h3>{org.name}</h3><p>{org.description}</p>
        {org.url && <a className="card-link" href={org.url} target="_blank" rel="noopener noreferrer">Site officiel ↗</a>}
      </article>)}</div>
    </section>}
    <section className="cta-band"><h2>Rejoignez les travaux de TLC</h2><p>Vous pouvez participer à la recherche, au développement, à la documentation ou soutenir une initiative.</p><Link className="button button-gold" href="/participer">Découvrir les possibilités</Link></section>
  </div>;
}
