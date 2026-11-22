import Link from "next/link";
import { BookOpen, Code, FlaskConical } from "lucide-react";
import EditorialSection from "@/components/editorial/EditorialSection";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import ContributorsWall from "@/components/organization/ContributorsWall";
import TLCCirclesDiagram from "@/components/organization/TLCCirclesDiagram";
import { readCollection } from "@/lib/database";
import type { Contributor } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Tradition Learning Community — TLC",
  description: "L’origine, la mission, les contributions et l’organisation proposée de Tradition Learning Community, la communauté scientifique qui développe tllib.",
};

export default async function AboutPage() {
  const people = (await readCollection<Contributor>("contributors"))
    .filter(person => person.published === true)
    .map(({ id, name, github, avatar }) => ({ id, name, github, avatar }));

  return <div className="directory-content institutional-page">
    <section className="hero-band institutional-hero"><div className="hero-inner">
      <div className="hero-copy"><span className="eyebrow">La communauté scientifique</span><h1>Tradition Learning Community</h1><p>Une communauté scientifique et technique qui étudie la théorie, développe tllib et construit les conditions de son expérimentation.</p><div className="hero-actions"><a className="button button-gold" href="#organisation">Découvrir l’organisation</a><Link className="button button-outline" href="/participer">Participer à TLC</Link></div></div>
      <div className="institutional-hero-art" aria-hidden="true"><span className="institutional-wordmark">TLC</span><p>Recherche scientifique<br/>Développement logiciel<br/>Contributions ouvertes</p></div>
    </div></section>

    <EditorialSection id="mission" eyebrow="L’origine du projet" title="Une question de recherche née à Kindu">
      <div className="institutional-story">
        <div><p>Le projet trouve son origine dans les difficultés rencontrées lors de travaux d’intelligence artificielle en contexte de données limitées, à Kindu, en République démocratique du Congo.</p><p>Ce point de départ a ouvert un programme de recherche sur la transmission, la transformation et le développement d’une Tradition. Le champ de TL s’étend à différents contextes, problèmes et modalités d’intelligence artificielle.</p><p>TLC réunit les personnes qui étudient cette théorie, construisent ses outils et documentent les résultats et les limites de leur utilisation.</p></div>
        <aside className="institutional-story-aside"><p>La théorie oriente les contrats. Les logiciels permettent de les éprouver dans des systèmes concrets.</p><p className="product-source-note">Les expériences documentées servent à établir les résultats et leurs limites.</p></aside>
      </div>
    </EditorialSection>

    <EditorialSection eyebrow="Les travaux de TLC" title="Des contributions qui se complètent" tone="muted">
      <div className="institutional-pillars">
        <article><FlaskConical size={25} aria-hidden="true"/><h3>La recherche</h3><p>Étudier et formaliser Tradition Learning, préparer les expériences, analyser leurs résultats et leurs limites.</p><Link href="/recherche">Explorer les travaux</Link></article>
        <article><Code size={25} aria-hidden="true"/><h3>Le développement</h3><p>Construire une bibliothèque scientifique utilisable, avec des interfaces, des tests et une documentation cohérente.</p><Link href="/tllib">Découvrir tllib</Link></article>
        <article><BookOpen size={25} aria-hidden="true"/><h3>La transmission des travaux</h3><p>Publier les ressources autorisées, documenter les contributions et ouvrir des possibilités de participation.</p><Link href="/resources">Consulter les ressources</Link></article>
      </div>
    </EditorialSection>

    <div className="container product-diagram-section"><RevealOnScroll><TLCCirclesDiagram/></RevealOnScroll></div>

    {people.length > 0 && <EditorialSection eyebrow="Les personnes" title="Ils contribuent à TLC" description="Des contributions à la recherche, aux logiciels et à la vie communautaire. Les profils publiés ne constituent pas un annuaire de mandats institutionnels." aside={<Link className="text-link" href="/community">Toute la communauté</Link>}><ContributorsWall people={people} limit={10}/></EditorialSection>}

    <EditorialSection eyebrow="Rejoindre les travaux" title="Une place pour votre contribution" tone="muted">
      <div className="institutional-participate"><p>Chercheurs, étudiants, développeurs, documentalistes, bénévoles et organisations peuvent proposer une contribution ou un partenariat selon les activités ouvertes.</p><Link href="/participer" className="button button-dark">Présenter votre intérêt</Link></div>
    </EditorialSection>
  </div>;
}
