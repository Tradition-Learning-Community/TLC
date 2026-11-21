import HeroSection from "@/components/hero-section"
import CommunityVision from "@/components/community-vision"
import CommunitySection from "@/components/community-section"
import ContributorsSection from "@/components/contributors-section"
import { readCollection } from "@/lib/database"
import type { Contributor } from "@/lib/types"
import { BookOpen, Code2, GitBranchPlus, Microscope } from "lucide-react"

export const dynamic = "force-dynamic"

const HomePage = async () => {
  const contributors = await readCollection<Contributor>("contributors")
  return (
    <div className="home-hero-bg">
      <HeroSection
        stats={{
          domains: 36,
          packages: 694,
          interfaces: 2,
        }}
      />

      <CommunityVision />

      <CommunitySection />

      <ContributorsSection contributors={contributors} />

      <section className="content-shell pb-20 pt-16">
        <div className="content-header text-left md:text-center">
          <span className="content-kicker">Travaux scientifiques et techniques</span>
          <h2 className="content-title">
            De la théorie à la bibliothèque tllib
          </h2>
          <p className="content-lead">
            TLC relie la théorie Tradition Learning, les spécifications,
            l'implémentation de tllib et la validation scientifique.
          </p>
        </div>

        <div className="mt-8 grid gap-5 animate-stagger lg:grid-cols-4">
          {[
            {
              icon: <Microscope className="h-5 w-5 text-[#d4af37]" />,
              title: "Tradition Learning",
              text: "Étudier la transmission, la transformation et l'évolution d'une Tradition.",
            },
            {
              icon: <BookOpen className="h-5 w-5 text-[#d4af37]" />,
              title: "Spécifications",
              text: "Publier les contrats scientifiques, les invariants et les tests d'acceptation.",
            },
            {
              icon: <Code2 className="h-5 w-5 text-[#d4af37]" />,
              title: "Bibliothèque tllib",
              text: "Développer le moteur C++20, les interfaces C++ et Python et le runtime.",
            },
            {
              icon: <GitBranchPlus className="h-5 w-5 text-[#d4af37]" />,
              title: "Conformité et expérimentation",
              text: "Distinguer les contrats, les hypothèses et les résultats vérifiés.",
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
