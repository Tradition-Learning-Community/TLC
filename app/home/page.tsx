import HeroSection from "@/components/hero-section"
import CommunityVision from "@/components/community-vision"
import CommunitySection from "@/components/community-section"
import ContributorsSection from "@/components/contributors-section"
import { readCollection } from "@/lib/database"
import type { Contributor } from "@/lib/types"
import Link from "next/link"
import { BookOpen, Handshake, Lightbulb, UsersRound } from "lucide-react"

export const dynamic = "force-dynamic"

const HomePage = async () => {
  const contributors = await readCollection<Contributor>("contributors")
  return (
    <div className="home-hero-bg">
      <HeroSection />

      <CommunityVision />

      <CommunitySection />

      <ContributorsSection contributors={contributors} />

      <section className="content-shell pb-20 pt-16">
        <div className="content-header text-left md:text-center">
          <span className="content-kicker">Les travaux de TLC</span>
          <h2 className="content-title">
            De la recherche aux outils
          </h2>
          <p className="content-lead">
            TLC travaille sur les fondements de Tradition Learning, le développement
            de la bibliothèque tllib et les expériences qui permettront d’en
            évaluer les possibilités et les limites.
          </p>
        </div>

        <div className="mt-8 grid gap-5 animate-stagger lg:grid-cols-4">
          {[
            {
              icon: <Lightbulb className="h-5 w-5 text-[#d4af37]" />,
              title: "Le problème",
              text: "La création d’IA utiles se heurte parfois au manque de données et aux difficultés d’adaptation. TL explore d’autres mécanismes d’apprentissage.",
            },
            {
              icon: <BookOpen className="h-5 w-5 text-[#d4af37]" />,
              title: "L’idée scientifique",
              text: "Tradition Learning étudie comment des systèmes peuvent apprendre par transmission, transformation et évolution d’une Tradition.",
            },
            {
              icon: <UsersRound className="h-5 w-5 text-[#d4af37]" />,
              title: "Le travail collectif",
              text: "TLC réunit recherche, développement, expérimentation et partage. Sa bibliothèque tllib est en cours de développement.",
            },
            {
              icon: <Handshake className="h-5 w-5 text-[#d4af37]" />,
              title: "Votre place",
              text: "Étudier, contribuer, proposer une application, partager des ressources ou soutenir les travaux : plusieurs formes de participation sont possibles.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-[rgba(11,61,145,0.12)] bg-white/85 p-5 shadow-[0_18px_35px_rgba(6,33,71,0.08)] backdrop-blur transition-all duration-300 hover:shadow-[0_24px_48px_rgba(11,61,145,0.12)] hover:border-[#d4af37]/40 dark:border-white/10 dark:bg-[rgba(7,24,51,0.8)] dark:hover:border-[#d4af37]/60"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b3d91]/10 dark:bg-white/5">
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#062147] dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {item.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/about#what-is" className="content-api-link">Comprendre l’approche</Link>
          <Link href="/community" className="content-api-link">Participer à TLC</Link>
          <Link href="/contact" className="content-api-link">Proposer un partenariat ou un soutien</Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
