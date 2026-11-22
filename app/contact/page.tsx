import Link from "next/link";
import InquiryForm from "@/components/inquiry-form";
export const metadata = { title: "Contact — TLC", description: "Contacter Tradition Learning Community." };
export default function ContactPage() {
  return <div className="directory-content">
    <section className="hero-band"><div className="hero-inner"><div className="hero-copy"><span className="eyebrow">TRADITION LEARNING COMMUNITY</span><h1>Contact</h1><p>Questions scientifiques, contributions, collaborations ou propositions institutionnelles : écrivez à TLC.</p></div><div className="hero-art"><div className="art-core">TLC</div></div></div></section>
    <section className="section container"><div className="grid gap-10 lg:grid-cols-2"><article><h2 className="section-title">Nous écrire</h2><p className="section-copy">Votre message sera transmis à l'administration TLC.</p><InquiryForm kind="contact"/></article>
      <aside className="card"><h3>Autres contacts</h3><p>Pour une correspondance directe : <a className="text-link break-words" href="mailto:tlccommunitymanager2@gmail.com">tlccommunitymanager2@gmail.com</a></p><p>Vous souhaitez participer à la recherche ou proposer un soutien ?</p><Link className="card-link" href="/participer">Découvrir les possibilités →</Link></aside>
    </div></section>
  </div>;
}
