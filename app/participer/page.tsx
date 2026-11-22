import { Users } from "lucide-react";
import ParticipationChoices from "@/components/editorial/ParticipationChoices";
import "@/components/editorial/editorial-pages.css";

export const metadata = { title: "Participer — TLC", description: "Rejoindre Tradition Learning Community, contribuer aux travaux, proposer un partenariat ou soutenir la recherche." };

export default function ParticiperPage() {
  return <div className="directory-content editorial-page">
    <section className="hero-band editorial-hero"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">CONTRIBUER À TLC</span><h1>Participer</h1><p>La recherche progresse grâce aux personnes et aux organisations qui y consacrent leurs idées, leurs compétences et leurs ressources.</p></div><div className="editorial-hero-summary"><Users size={34} aria-hidden="true" /><p>Recherche, code, documentation, organisation : plusieurs contributions font avancer un même projet.</p></div></div></section>
    <section className="section container" id="demande"><ParticipationChoices /></section>
  </div>;
}
