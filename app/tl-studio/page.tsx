import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpenText, BrainCircuit, CheckCheck, Code2, Compass, Layers3, MessagesSquare, PanelTop, Sparkles, UsersRound } from "lucide-react";
import TLStudioPreview from "@/components/tl-studio-preview";
import "./tl-studio.css";

export const metadata: Metadata = {
  title: "TL Studio — Projet d’application | TLC",
  description: "TL Studio : projet d’interface pour préparer et utiliser des systèmes Tradition Learning avec tllib et une assistance par modèles de langage.",
};

const features = [
  { Icon: MessagesSquare, title: "Décrire", detail: "Exprimer une mission et un problème dans ses propres mots, sans commencer par du code." },
  { Icon: BrainCircuit, title: "Comprendre", detail: "Obtenir des propositions structurées selon la théorie TL et préciser les informations manquantes." },
  { Icon: CheckCheck, title: "Constituer", detail: "Vérifier les ressources, les rôles, les capacités et les conditions nécessaires avec l’utilisateur." },
  { Icon: Layers3, title: "Utiliser et poursuivre", detail: "Préparer le recours à tllib et accompagner l’évolution du système lorsqu’il pourra être exécuté." },
] as const;

export default function TLStudioPage() {
  return <div className="tlstudio-page">
    <section className="tlstudio-hero">
      <div className="new-container tlstudio-hero-inner">
        <div className="tlstudio-hero-copy">
          <span className="tlstudio-status"><span aria-hidden="true" /> PROJET EN CONCEPTION</span>
          <span className="eyebrow">APPLICATION · TRADITION LEARNING</span>
          <h1>TL Studio<span>.</span></h1>
          <p className="tlstudio-lead">Décrivez votre besoin. Explorez ce qu’il devient dans Tradition Learning.</p>
          <p>TL Studio est un projet d’application destiné à faciliter la constitution et l’utilisation de systèmes TL. Il associerait une interface guidée, l’assistance de modèles de langage et la bibliothèque tllib, sans exiger de ses utilisateurs qu’ils maîtrisent toute la théorie ou programment chaque opération.</p>
          <div className="hero-actions">
            <a href="#apercu" className="button button-gold">Explorer le concept <ArrowRight size={18} aria-hidden="true" /></a>
            <Link href="/resources/tllib" className="button button-outline">Découvrir tllib</Link>
          </div>
        </div>
        <div className="tlstudio-hero-art" aria-hidden="true">
          <div className="tlstudio-orbit tlstudio-orbit-one"/><div className="tlstudio-orbit tlstudio-orbit-two"/>
          <span className="tlstudio-art-mark"><PanelTop size={54} strokeWidth={1.3}/><strong>TL Studio</strong></span>
          <span className="tlstudio-orbit-icon tlstudio-orbit-a"><MessagesSquare size={25}/></span>
          <span className="tlstudio-orbit-icon tlstudio-orbit-b"><Sparkles size={25}/></span>
          <span className="tlstudio-orbit-icon tlstudio-orbit-c"><Code2 size={25}/></span>
        </div>
      </div>
    </section>

    <section className="new-section new-container tlstudio-why" aria-labelledby="tlstudio-why-title">
      <div>
        <span className="eyebrow">L’AMBITION</span>
        <h2 id="tlstudio-why-title">Rendre Tradition Learning plus accessible.</h2>
      </div>
      <div>
        <p>Une chercheuse peut décrire son objectif, un ingénieur son environnement, une équipe son problème. TL Studio les aiderait à identifier les éléments utiles pour préparer un système TL : Mission, Problème, Ressources, rôles initiaux, Capacités et conditions scientifiques.</p>
        <p>L’outil serait un accompagnement à la compréhension et à la constitution. Les Disciples, les relations et les contenus évoluent ensuite avec le système, selon la théorie Tradition Learning.</p>
      </div>
    </section>

    <section className="new-section tlstudio-capabilities" aria-labelledby="tlstudio-capabilities-title">
      <div className="new-container">
        <span className="eyebrow">L’EXPÉRIENCE ENVISAGÉE</span>
        <h2 id="tlstudio-capabilities-title">Du langage naturel à un système TL.</h2>
        <div className="tlstudio-feature-grid">
          {features.map(({Icon,title,detail},index) => <article key={title} className="tlstudio-feature">
            <span className="tlstudio-feature-num">{String(index+1).padStart(2,"0")}</span>
            <Icon size={27} aria-hidden="true"/>
            <h3>{title}</h3><p>{detail}</p>
          </article>)}
        </div>
      </div>
    </section>

    <div className="new-container" id="apercu"><TLStudioPreview /></div>

    <section className="new-section tlstudio-relationship" aria-labelledby="tlstudio-relationship-title">
      <div className="new-container">
        <span className="eyebrow">TROIS RÔLES COMPLÉMENTAIRES</span>
        <h2 id="tlstudio-relationship-title">La théorie, le moteur, l’interface.</h2>
        <div className="tlstudio-product-chain">
          <Link href="/resources/tradition-learning"><BookOpenText size={29} aria-hidden="true"/><strong>Tradition Learning</strong><span>Le cadre scientifique</span></Link>
          <ArrowRight className="tlstudio-chain-arrow" aria-hidden="true"/>
          <Link href="/resources/tllib"><Code2 size={29} aria-hidden="true"/><strong>tllib</strong><span>La bibliothèque logicielle</span></Link>
          <ArrowRight className="tlstudio-chain-arrow" aria-hidden="true"/>
          <div className="tlstudio-product-future"><PanelTop size={29} aria-hidden="true"/><strong>TL Studio</strong><span>L’application en conception</span></div>
        </div>
      </div>
    </section>

    <section className="new-section new-container tlstudio-participate">
      <div><span className="eyebrow">CONSTRUIRE LE PROJET</span><h2>Contribuer à TL Studio.</h2><p>La conception peut mobiliser des spécialistes de l’IA, des interfaces, du développement logiciel, de l’expérience utilisateur et de Tradition Learning.</p></div>
      <div className="tlstudio-participate-actions">
        <Link href="/home#join" className="button button-gold"><UsersRound size={19} aria-hidden="true"/> Rejoindre TLC</Link>
        <Link href="/projects" className="tlstudio-secondary-link"><Compass size={18} aria-hidden="true"/> Voir l’ensemble des projets</Link>
      </div>
    </section>
  </div>;
}
