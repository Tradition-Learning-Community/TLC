import type { Metadata } from "next";
import MembershipForm from "@/components/membership-form";
import "./membership.css";

export const metadata: Metadata = {
  title: "Rejoindre Tradition Learning Community",
  description: "Devenir membre de TLC, contribuer à la recherche et aux projets, participer comme bénévole, partenaire ou sponsor.",
};

export default function JoinPage() {
  return <main className="tlc-join-page">
    <div className="new-container tlc-join-layout">
      <div className="tlc-join-intro">
        <span className="eyebrow">MEMBRES ET PARTICIPATION</span>
        <h1>Rejoindre Tradition Learning Community</h1>
        <p>TLC rassemble des personnes qui font avancer la recherche en intelligence artificielle. Chercheurs, étudiants, ingénieurs, bénévoles, organisations et partenaires peuvent participer selon leurs compétences et leurs intérêts.</p>
        <p>Créez votre compte TLC et indiquez comment vous souhaitez vous impliquer. Votre demande sera examinée par l’équipe de la communauté avant l’activation du compte.</p>
      </div>
      <div className="tlc-join-form-card"><MembershipForm /></div>
    </div>
  </main>;
}
