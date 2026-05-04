import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ShieldCheck, Sparkles, Slack, Telescope } from "lucide-react";

export default function HeroSection() {
  return (
    <main id="home-hero" className="overflow-x-hidden">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(11,61,145,0.22),_transparent_30%),linear-gradient(180deg,_rgba(6,20,45,0.03),_transparent_40%)]" />
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-0 md:pb-28 md:pt-0 lg:pb-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(11,61,145,0.18)] bg-[rgba(255,255,255,0.75)] px-4 py-2 text-sm font-medium text-[#0b3d91] shadow-sm backdrop-blur dark:bg-[rgba(7,24,51,0.7)] dark:text-white">
                <Sparkles className="h-4 w-4 text-[#d4af37]" />
                Tradition Learning • IA ouverte, claire et ambitieuse
              </div>

              <h1 className="mt-8 max-w-4xl text-balance text-5xl font-semibold tracking-tight text-[#062147] md:text-6xl lg:text-7xl dark:text-white">
                Moins de données,
                <span className="block bg-gradient-to-r from-[#0b3d91] via-[#1c5fb8] to-[#d4af37] bg-clip-text text-transparent">
                  plus d’intelligence.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-600 md:text-lg lg:mx-0 dark:text-slate-300">
                Développons ensemble l’IA de demain. TLC est la plateforme centrale
                pour l’approche Tradition Learning : une IA open-source performante,
                interprétable et accessible à tous.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Button asChild size="lg" className="rounded-full bg-[#0b3d91] px-6 text-white shadow-lg shadow-[#0b3d91]/20 hover:bg-[#0a357f]">
                  <Link href="/projects">
                    <Telescope className="h-4 w-4" />
                    Découvrir la plateforme
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-[#d4af37] px-6 text-[#062147] hover:bg-[#d4af37]/10 dark:text-white"
                >
                  <Link href="/community">
                    <Slack className="h-4 w-4" />
                    Rejoindre la communauté
                  </Link>
                </Button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: <ShieldCheck className="h-5 w-5 text-[#d4af37]" />,
                    title: "Interprétable",
                    text: "Des modèles compréhensibles et contrôlables."
                  },
                  {
                    icon: <Github className="h-5 w-5 text-[#d4af37]" />,
                    title: "Open-source",
                    text: "Une base collaborative pour contribuer vite."
                  },
                  {
                    icon: <Sparkles className="h-5 w-5 text-[#d4af37]" />,
                    title: "Ambitieux",
                    text: "Une identité forte, claire et moderne."
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-[rgba(11,61,145,0.12)] bg-white/80 p-4 text-left shadow-[0_12px_30px_rgba(6,33,71,0.06)] backdrop-blur dark:border-white/10 dark:bg-[rgba(7,24,51,0.72)]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0b3d91]/10 dark:bg-white/5">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-[#062147] dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#0b3d91]/20 via-transparent to-[#d4af37]/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 px-6 py-4 shadow-2xl shadow-[#062147]/10 backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(7,24,51,0.88)]">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#0b3d91]/70 dark:text-[#d4af37]">TLC Overview</p>
                    <p className="mt-2 text-lg font-semibold text-[#062147] dark:text-white">Plateforme de recherche</p>
                  </div>
                  <div className="rounded-full bg-[#d4af37]/15 px-3 py-1 text-xs font-semibold text-[#062147] dark:text-white">
                    Live
                  </div>
                </div>

                <div className="mt-4 grid gap-4">
                  {[
                    { label: "Projets actifs", value: "12", note: "+3 ce mois-ci" },
                    { label: "Contributeurs", value: "48", note: "Communauté ouverte" },
                    { label: "Ressources", value: "120+", note: "Guides et datasets" }
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-300">{stat.label}</p>
                          <p className="mt-1 text-3xl font-semibold text-[#062147] dark:text-white">{stat.value}</p>
                        </div>
                        <p className="text-xs font-medium text-[#0b3d91] dark:text-[#d4af37]">{stat.note}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#0b3d91] to-[#1a5fb7] p-5 text-white shadow-lg shadow-[#0b3d91]/20">
                  <p className="text-sm uppercase tracking-[0.25em] text-white/70">Focus du moment</p>
                  <p className="mt-2 text-lg font-medium">Construire des systèmes plus sobres, plus lisibles, plus utiles.</p>
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-[#d4af37]/50 bg-[#d4af37]/10 p-4 text-sm text-[#062147] dark:text-white">
                  <div className="h-10 w-10 rounded-full bg-[#d4af37]/20" />
                  <p>
                    Une interface pensée pour la clarté, avec la palette <span className="font-semibold">bleu foncé</span>, <span className="font-semibold">or</span> et <span className="font-semibold">blanc</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
