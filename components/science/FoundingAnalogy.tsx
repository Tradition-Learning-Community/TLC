import Link from "next/link";
import { ArrowRight, BookOpenText, GitBranch, Lightbulb, Users } from "lucide-react";
import "./founding-analogy.css";

const examples = [
  {
    id: "bouddha",
    name: "Bouddha",
    context: "Transmission orale et pratique vécue",
    stages: ["Bouddha", "Disciples", "Communautés monastiques", "Traditions bouddhiques"],
    description: "L’enseignement se transmet par les disciples, la pratique et les communautés, puis se conserve et se diversifie au fil du temps.",
  },
  {
    id: "socrate",
    name: "Socrate",
    context: "Dialogue et filiation intellectuelle",
    stages: ["Socrate", "Platon", "Aristote", "Alexandre le Grand"],
    description: "Une filiation intellectuelle, et non une succession d’écrits de Socrate : Platon transmet ses dialogues, Aristote étudie auprès de Platon, puis enseigne à Alexandre.",
  },
  {
    id: "jesus",
    name: "Jésus",
    context: "Mission, disciples et communautés",
    stages: ["Jésus", "Apôtres et disciples", "Premières communautés", "Églises et traditions"],
    description: "La mission et les enseignements circulent d’abord à travers les disciples et les premières communautés, avant et parallèlement à leur mise par écrit.",
  },
] as const;

export default function FoundingAnalogy() {
  return (
    <section className="section founding-analogy" id="analogie" aria-labelledby="founding-analogy-title">
      <div className="container">
        <div className="founding-analogy-heading">
          <span className="eyebrow">L’ANALOGIE FONDATRICE</span>
          <h2 className="section-title" id="founding-analogy-title">Et si l’apprentissage ne commençait pas par des livres ?</h2>
          <p>Les approches modernes de l’IA peuvent dépendre de volumes considérables de données. Pourtant, certaines des transmissions les plus durables de l’histoire ont commencé sans corpus massif, ni livre rédigé par leur maître fondateur.</p>
          <p>Le manuscrit de Tradition Learning observe ce phénomène chez <strong>Bouddha, Socrate et Jésus</strong> : une mission portée par un maître, des enseignements, des principes et des valeurs transmis dans la relation, puis des disciples qui pratiquent, interprètent et poursuivent l’héritage au sein de communautés.</p>
        </div>

        <div className="founding-analogy-legend" aria-label="Lecture des exemples historiques">
          <span><Users aria-hidden="true" size={17} /> Relations et transmission</span>
          <span><GitBranch aria-hidden="true" size={17} /> Filiation, prolongements et branches</span>
          <span><BookOpenText aria-hidden="true" size={17} /> Écrits constitués ou conservés ensuite</span>
        </div>

        <div className="founding-analogy-grid">
          {examples.map((example) => (
            <article className="founding-analogy-card" key={example.id}>
              <div className="founding-analogy-card-head">
                <span className="founding-analogy-label">{example.context}</span>
                <h3>{example.name}</h3>
              </div>
              <ol className="founding-analogy-chain" aria-label={`Parcours historique illustratif : ${example.name}`}>
                {example.stages.map((stage, index) => (
                  <li key={stage}>
                    <span className="founding-analogy-step"><span className="founding-analogy-dot" aria-hidden="true" />{stage}</span>
                    {index < example.stages.length - 1 && <ArrowRight size={17} aria-hidden="true" className="founding-analogy-arrow" />}
                  </li>
                ))}
              </ol>
              <p>{example.description}</p>
            </article>
          ))}
        </div>

        <div className="founding-analogy-takeaway">
          <Lightbulb size={28} strokeWidth={1.6} aria-hidden="true" />
          <div>
            <h3>De cette observation à Tradition Learning</h3>
            <p>La question fondatrice n’est pas de reproduire ces traditions historiques dans une IA. Elle est d’étudier comment une mission peut être portée et transformée à travers les relations entre <strong>Maître, Disciple et Communauté</strong>, mobilisant les huit objets fondamentaux, la mémoire, les pratiques, les cohortes et les générations. Un Disciple peut contribuer, découvrir et, sous les conditions scientifiques pertinentes, devenir à son tour Maître-relais.</p>
            <p className="founding-analogy-note">Ces parcours sont des analogies historiques simplifiées, non des graphes de filiation TL calculés, ni une preuve expérimentale de supériorité face au ML classique. La théorie n’exige ni l’absence d’écrits, ni l’absence de données.</p>
            <Link href="#entites" className="text-link">Explorer les trois entités <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>

        <p className="founding-analogy-source"><BookOpenText size={17} aria-hidden="true" /> Source : <em>Tradition Learning - main.pdf</em>, chapitres 2.2, 2.3 et 3.10 (analogie historique et position du Maître fondateur).</p>
      </div>
    </section>
  );
}
