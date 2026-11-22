import Image from "next/image";
import Link from "next/link";
import { BookOpen, Code2, FlaskConical, Users, CalendarDays, Layers3, GitBranch } from "lucide-react";
import InquiryForm from "@/components/inquiry-form";
import EditorialSection from "@/components/editorial/EditorialSection";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import ContributorsWall from "@/components/organization/ContributorsWall";
import EventInquiry from "@/components/home/EventInquiry";
import type { Article } from "@/lib/editorial";
import type { TLCEvent, TLCOrganization, TLCProject } from "@/lib/public-content";

type Person = { id: string; name: string; avatar?: string; github: string };
type Props = { articles: Article[]; events: TLCEvent[]; contributors: Person[]; organizations: TLCOrganization[]; projects?: TLCProject[] };
const objects = ["Message", "Principes", "Valeurs", "Vertus", "Capacités", "Compétences", "Pratique", "Expérience vécue"];

export default function ReferenceHome({ articles, events, contributors, organizations, projects = [] }: Props) {
  return <div className="home-content home-2027">
    <section className="hero-band home-hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow"><span className="hero-eyebrow-rule"/>Tradition Learning Community</div>
          <h1>Tradition Learning,<br/><em>une autre voie</em> pour l’apprentissage des IA.</h1>
          <p>Une théorie de la transmission et de la transformation, une bibliothèque scientifique et une communauté pour les développer.</p>
          <div className="hero-actions"><Link href="/tradition-learning" className="button button-gold">Comprendre Tradition Learning</Link><Link href="/tllib" className="button button-outline">Découvrir tllib</Link></div>
          <div className="hero-footnote"><span>Recherche ouverte</span><span>C++ & Python</span><span>Communauté scientifique</span></div>
        </div>
        <figure className="hero-visual">
          <div className="hero-image-frame"><Image src="/Réseau néon de l’Afrique futuriste.png" alt="Illustration artistique de l’Afrique parcourue de connexions lumineuses" fill priority sizes="(max-width: 700px) 92vw, (max-width: 1100px) 44vw, 520px"/></div>
          <figcaption><span className="hero-visual-mark" aria-hidden="true"><GitBranch size={19}/></span><span>Tradition Learning<small>Explorer une intelligence qui se transmet et évolue.</small></span></figcaption>
        </figure>
      </div>
    </section>
    <nav className="home-paths container" aria-label="Explorer TLC">
      <Link href="/tradition-learning"><BookOpen size={23} aria-hidden="true"/><span><strong>La théorie</strong><small>Comprendre les fondements</small></span></Link>
      <Link href="/tllib"><Code2 size={23} aria-hidden="true"/><span><strong>La bibliothèque</strong><small>Constituer des systèmes TL</small></span></Link>
      <Link href="/tlc"><Users size={23} aria-hidden="true"/><span><strong>La communauté</strong><small>Découvrir et participer</small></span></Link>
    </nav>
    <EditorialSection eyebrow="Les fondements" title="Une Tradition vivante, au-delà d’un modèle." description="Tradition Learning étudie comment un héritage se transmet, se transforme et s’enrichit dans les relations entre Maîtres, Disciples et Communauté." className="home-foundations">
      <RevealOnScroll><div className="home-foundation-grid">
        <div className="home-foundation-copy"><h3>Trois entités.<br/>Huit objets fondamentaux.</h3><p>Le Disciple participe, découvre et crée. Le Maître accompagne la transmission sans nécessairement connaître la solution. La Communauté contribue à l’évaluation et à la continuité de la Tradition.</p><Link className="text-link" href="/tradition-learning">Explorer les diagrammes interactifs</Link></div>
        <div className="foundation-preview" aria-label="Aperçu des fondements de Tradition Learning">
          <div className="foundation-entities"><span>Maître</span><span>Disciple</span><span>Communauté</span></div>
          <div className="foundation-caption"><Layers3 size={18} aria-hidden="true"/>Huit objets complémentaires</div>
          <div className="foundation-objects">{objects.map(object => <span key={object}>{object}</span>)}</div>
          <p>Des relations, des cohortes et des branches qui évoluent au fil de la transmission.</p>
        </div>
      </div></RevealOnScroll>
    </EditorialSection>
    <EditorialSection eyebrow="De la théorie au logiciel" title="tllib, le moteur scientifique commun." description="Un moteur de référence en C++20, accessible depuis C++ et Python, pour constituer et faire fonctionner des systèmes Tradition Learning." tone="dark" className="home-library" aside={<Link href="/tllib" className="button button-outline">Explorer la bibliothèque</Link>}>
      <div className="home-library-grid"><div className="library-architecture-preview"><div className="library-api-pair"><span>API C++</span><span>API Python</span></div><div className="library-engine"><Code2 size={32} aria-hidden="true"/><strong>Moteur C++20</strong><span>Une implémentation scientifique de référence</span></div><div className="library-foundation"><span>Runtime</span><span>Providers explicites</span><span>Conformité</span></div></div><div className="home-library-copy"><span className="status-label">V1 en développement</span><h3>Constituer, exécuter, observer.</h3><p>La constitution d’un système, l’exécution d’une opération, l’apprentissage constaté et le développement d’une Tradition sont des constats distincts. Chaque fonctionnalité doit être implémentée et évaluée selon son contrat.</p><div className="home-code-links"><a href="https://github.com/Tradition-Learning-Community/tllib" target="_blank" rel="noopener noreferrer">Code et avancement</a><a href="https://github.com/Tradition-Learning-Community/tllib-specs" target="_blank" rel="noopener noreferrer">Spécifications scientifiques</a></div></div></div>
    </EditorialSection>
    <EditorialSection eyebrow="La communauté" title="Faire avancer les travaux, ensemble." description="TLC réunit les contributions à la théorie, à la bibliothèque et aux activités scientifiques. Chaque travail conserve ses sources, ses critères de vérification et son état d’avancement." tone="muted" aside={<Link href="/tlc" className="text-link">Découvrir l’organisation</Link>}>
      <div className="home-missions">{[
        { icon: FlaskConical, title: "Recherche scientifique", copy: "Formaliser les concepts, confronter les hypothèses et documenter les méthodes et résultats.", href: "/recherche", label: "Consulter les travaux" },
        { icon: Code2, title: "Développement ouvert", copy: "Implémenter les contrats, tester les opérations et construire des interfaces C++ et Python utilisables.", href: "/tllib", label: "Découvrir le développement" },
        { icon: Users, title: "Contributions et échanges", copy: "Participer selon son expérience : recherche, logiciel, documentation, communication et organisation.", href: "/participer", label: "Trouver sa place" },
      ].map(({ icon: Icon, title, copy, href, label }) => <article key={title}><Icon size={28} aria-hidden="true"/><h3>{title}</h3><p>{copy}</p><Link href={href} className="text-link">{label}</Link></article>)}</div>
      {contributors.length > 0 && <div className="home-contributors"><h3>Ils contribuent à TLC</h3><ContributorsWall people={contributors} limit={10}/><Link href="/community" className="text-link">Rencontrer la communauté</Link></div>}
    </EditorialSection>
    {projects.length > 0 && <EditorialSection eyebrow="Travaux publiés" title="Les projets de la communauté." aside={<Link className="text-link" href="/recherche">Tous les travaux</Link>}><div className="home-projects">{projects.slice(0, 3).map((project, index) => <article key={project.id || index}><FlaskConical size={24} aria-hidden="true"/><div>{project.status && <span className="chip">{project.status}</span>}<h3>{project.title}</h3><p>{project.description}</p><Link className="text-link" href={project.id ? `/projects/${project.id}` : "/recherche"}>Consulter le projet</Link></div></article>)}</div></EditorialSection>}
    {articles.length > 0 && <EditorialSection eyebrow="À la une" title="Actualités TLC" description="Les nouvelles de la recherche, des projets et de la communauté." aside={<Link className="text-link" href="/actualites">Toutes les actualités</Link>}><div className="home-news-grid">{articles.slice(0, 3).map(article => <article className="home-news-item" key={article.id}>{article.coverImage ? <img src={article.coverImage} alt="" loading="lazy" width={640} height={400}/> : <div className="home-news-placeholder" aria-hidden="true"><BookOpen size={36}/></div>}<div><span className="article-meta">{article.category}{article.publishedAt && ` · ${new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(article.publishedAt))}`}</span><h3><Link href={`/actualites/${article.slug}`}>{article.title}</Link></h3><p>{article.summary}</p><Link className="text-link" href={`/actualites/${article.slug}`}>Lire l’article</Link></div></article>)}</div></EditorialSection>}
    {events.length > 0 && <EditorialSection eyebrow="Agenda" title="Événements à venir" tone="muted" aside={<Link className="text-link" href="/events">Voir l’agenda</Link>}><div className="home-events">{events.map(event => <article key={event.id}><div className="home-event-date"><CalendarDays size={23} aria-hidden="true"/><time dateTime={event.date}>{new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${event.date}T12:00:00Z`))}</time><small>{event.time || "Horaire à confirmer"}</small></div><div><span className="eyebrow">{event.type}</span><h3>{event.title}</h3><p>{event.location || event.description}</p></div>{event.registrationUrl ? <a className="button button-dark" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Informations</a> : <EventInquiry event={event}/>}</article>)}</div></EditorialSection>}
    {organizations.length > 0 && <EditorialSection eyebrow="Collaborations" title="Organisations et soutiens"><div className="home-organizations">{organizations.slice(0, 8).map(organization => <article key={organization.id}>{organization.logo && <img src={organization.logo} alt="" loading="lazy" width={100} height={60}/>}<div><h3>{organization.name}</h3><p>{organization.category}</p></div></article>)}</div></EditorialSection>}
    <section className="join-band section" id="join"><div className="container join-grid"><div><span className="eyebrow">Participer à TLC</span><h2 className="section-title">Votre expérience peut contribuer aux prochains travaux.</h2><p className="section-copy">Présentez votre parcours et ce qui vous intéresse. L’équipe TLC vous orientera selon les activités ouvertes.</p><Link className="text-link" href="/participer">Découvrir les possibilités de participation</Link></div><div className="home-join-form"><h3>Rejoindre la communauté</h3><InquiryForm kind="join" compact idPrefix="home-request"/></div></div></section>
    <EditorialSection eyebrow="Premiers repères" title="Questions fréquentes" className="home-faq"><div className="faq">{[
      ["Qu’est-ce que Tradition Learning\u00a0?", "Tradition Learning étudie la transmission, la transformation et le développement d’une Tradition vivante, à travers les relations entre Maître, Disciple et Communauté. Elle n’est pas limitée à un type de modèle ou à une modalité d’IA."],
      ["À quoi sert tllib\u00a0?", "tllib est la bibliothèque scientifique C++ et Python destinée à constituer et à faire fonctionner des systèmes Tradition Learning. Sa V1 est en développement ; la documentation décrit les opérations disponibles et leur état de conformité."],
      ["Qui peut contribuer à TLC\u00a0?", "Chercheurs, développeurs, documentalistes, bénévoles et organisations peuvent proposer une contribution selon les travaux ouverts et leur domaine d’expérience."],
      ["Où suivre les avancées\u00a0?", "Les pages Recherche et Actualités présentent les travaux publiés. Les dépôts GitHub donnent accès aux spécifications, au code, aux tests et au suivi du développement."],
    ].map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></EditorialSection>
  </div>;
}
