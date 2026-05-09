import HeroSection from "@/components/hero-section"
import CommunityVision from "@/components/community-vision"
import CommunitySection from "@/components/community-section"
import ContributorsSection from "@/components/contributors-section"
import { Bot, ChartSpline, GitBranchPlus, Radar } from "lucide-react"

const HomePage = () => {
  return (
    <div className="home-hero-bg">
      <HeroSection />

      <CommunityVision />

      <CommunitySection />

      <ContributorsSection />

      <section className="content-shell pb-20 pt-16">
        <div className="content-header text-left md:text-center">
          <span className="content-kicker">Plateforme augmentée</span>
          <h2 className="content-title">
            Des éléments innovants pour créer, tester et publier plus vite
          </h2>
          <p className="content-lead">
            TLC peut devenir un véritable cockpit de recherche pour piloter l'innovation en IA
            de manière claire, structurée et collaborative.
          </p>
        </div>

        <div className="mt-8 grid gap-5 animate-stagger lg:grid-cols-4">
          {[
            {
              icon: <Radar className="h-5 w-5 text-[#d4af37]" />,
              title: "Radar des idées",
              text: "Repérer les thèmes émergents, les sujets chauds et les opportunités de recherche.",
            },
            {
              icon: <Bot className="h-5 w-5 text-[#d4af37]" />,
              title: "Assistant IA",
              text: "Résumer les discussions, proposer des tâches et accélérer l'onboarding.",
            },
            {
              icon: <ChartSpline className="h-5 w-5 text-[#d4af37]" />,
              title: "Tableau de bord",
              text: "Suivre les expériences, les métriques et la progression des contributions en direct.",
            },
            {
              icon: <GitBranchPlus className="h-5 w-5 text-[#d4af37]" />,
              title: "Pipeline collaboratif",
              text: "Relier projet, issue, PR et publication dans un flux de travail unique.",
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
      </section>
    </div>
  )
}

export default HomePage
