import { Quote } from "lucide-react";
import "./official-work.css";

const voices = [
  {
    text: "J’aimerais contribuer à tllib côté Python. Participer aux tests ou à la documentation serait déjà une manière d’apprendre tout en faisant avancer le projet.",
    name: "Nadia",
    profile: "Développeuse Python",
    initials: "N",
  },
  {
    text: "À l’université, j’ai surtout appris à utiliser des modèles existants. Tradition Learning m’intéresse parce qu’on peut aussi réfléchir à la façon dont une IA apprend et transmet ses acquis.",
    name: "Patrick",
    profile: "Étudiant en informatique",
    initials: "P",
  },
  {
    text: "Je voudrais travailler sur la partie scientifique : comprendre les relations entre les participants, les formaliser et préparer des expériences qui permettent de les étudier.",
    name: "Aïcha",
    profile: "Chercheuse en IA",
    initials: "A",
  },
] as const;

export default function CommunityVoices() {
  return (
    <section className="section tlc-voices" aria-labelledby="tlc-voices-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">PARCOURS ILLUSTRATIFS</span>
          <h2 className="section-title" id="tlc-voices-title">Des raisons différentes de rejoindre TLC.</h2>
          <p className="section-copy">Recherche, programmation, études : chacun peut trouver une façon de participer aux travaux de la communauté.</p>
        </div>
        <div className="tlc-voices-grid">
          {voices.map(voice => (
            <article className="tlc-voice-card" key={voice.name}>
              <Quote size={25} aria-hidden="true" className="tlc-voice-quote-icon" />
              <blockquote>« {voice.text} »</blockquote>
              <div className="tlc-voice-person">
                <span className="tlc-voice-initial" aria-hidden="true">{voice.initials}</span>
                <div><strong>{voice.name}</strong><span>{voice.profile}</span></div>
              </div>
            </article>
          ))}
        </div>
        <p className="tlc-voices-note">Témoignages fictifs illustrant différents profils de participation.</p>
      </div>
    </section>
  );
}
