import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ShieldCheck, Sparkles, Slack, Telescope, Brain, Book } from "lucide-react";

export default function HeroSection() {
  return (
    <main id="home-hero" className="overflow-x-hidden ">
      <section className="relative isolate flex min-h-[calc(100vh-var(--header-offset))] items-center justify-center overflow-hidden bg-gradient-to-b from-[#06142d] via-[#0a1f2e] to-[#06142d] border-b border-[#d4af37]/20 pt-40 pb-15">
        {/* Halos */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl bg-gradient-to-br from-[#0b3d91]/35 via-[#d4af37]/25 to-transparent opacity-70 animate-pulse-gold" />
          <div className="absolute -top-20 right-0 w-[700px] h-[700px] rounded-full blur-3xl bg-gradient-to-bl from-[#d4af37]/20 to-transparent opacity-50" />
          <div className="absolute -bottom-20 left-0 w-[700px] h-[700px] rounded-full blur-3xl bg-gradient-to-tr from-[#0b3d91]/25 to-transparent opacity-50" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-0 pt-[-10]">
          <div className="grid w-full items-center justify-items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="mt-8 max-w-4xl mx-auto text-balance text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight animate-slide-up">
                <span className="text-white">Moins des données, plus </span>
              
                <span className="bg-gradient-to-r from-[#d4af37] via-[#f0d87f] to-[#d4af37] bg-clip-text text-transparent animate-glow"> d'intelligence</span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl text-slate-300 leading-relaxed pt-2">
                Des travaux plus sobres, rapides a tester et faciles a partager.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="rounded-xl bg-gradient-to-r from-[#0b3d91] to-[#1a5fb7] px-8 py-3 text-white font-semibold transition-all duration-300 hover:scale-105 border border-[#0b3d91]/50 hover:border-[#d4af37]/50">
                  <Link href="/projects" className="inline-flex items-center gap-2">
                    <Telescope className="h-5 w-5" />
                    Projets
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

                <Button asChild size="lg" className="rounded-xl border-2 border-[#d4af37]/60 px-8 py-3 text-white font-semibold bg-[rgba(212,175,55,0.05)] hover:bg-[#d4af37]/15 transition-all duration-300 hover:scale-105 hover:border-[#d4af37]">
                  <Link href="/community" className="inline-flex items-center gap-2">
                    <Slack className="h-5 w-5" />
                    Communaute
                  </Link>
                </Button>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto ">
                {[
                  { label: "Exp.", value: "12", note: "ok" },
                  { label: "Contrib.", value: "48", note: "live" },
                  { label: "Data", value: "120+", note: "pretes" }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group p-4 rounded-xl border border-[#d4af37]/30 bg-gradient-to-br from-[#0b3d91]/10 to-transparent hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md cursor-default animate-fade-in"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="text-3xl font-bold text-[#d4af37] group-hover:text-[#f0d87f] transition-colors">{stat.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">{stat.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#0b3d91]/18 via-transparent to-[#d4af37]/18 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-[#d4af37]/30 bg-gradient-to-br from-[#07162f]/95 via-[#06142d]/90 to-[#0a1f2e] px-5 py-5 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/70">Neural</p>
                    <p className="mt-2 text-base font-semibold text-white">Moteur IA</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-2.5 py-1 text-[11px] font-semibold text-[#f0d87f]">
                    <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
                    Live
                  </div>
                </div>

                <div className="relative mt-5 flex min-h-[320px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14),transparent_34%),radial-gradient(circle_at_30%_30%,rgba(11,61,145,0.26),transparent_30%),radial-gradient(circle_at_70%_68%,rgba(212,175,55,0.12),transparent_28%)]">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0,rgba(255,255,255,0.04)_50%,transparent_100%)] opacity-40" />

                  {/* SVG pour les pointillés avec animation */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <defs>
                      <style>{`
                        .dotted-line-base { stroke: #d4af37; stroke-width: 0.5; stroke-dasharray: 2,3; opacity: 0.3; fill: none; }
                        .dotted-line-glow { stroke: #f0d87f; stroke-width: 0.8; stroke-dasharray: 2,3; opacity: 0; fill: none; filter: drop-shadow(0 0 1px #f0d87f); animation: flow 2s ease-in-out infinite; }
                        @keyframes flow { 0% { opacity: 0; stroke-dashoffset: 20; } 50% { opacity: 0.8; stroke-dashoffset: 0; } 100% { opacity: 0; stroke-dashoffset: -20; } }
                        .flow1 { animation-delay: 0s; }
                        .flow2 { animation-delay: 0.5s; }
                        .flow3 { animation-delay: 1s; }
                        .flow4 { animation-delay: 1.5s; }
                      `}</style>
                    </defs>
                    {/* Pointillés haut-gauche (sortant du livre) */}
                    <line className="dotted-line-base" x1="16" y1="16" x2="50" y2="50" />
                    <line className="dotted-line-glow flow1" x1="16" y1="16" x2="50" y2="50" />
                    {/* Pointillés haut-droite (sortant du livre) */}
                    <line className="dotted-line-base" x1="84" y1="16" x2="50" y2="50" />
                    <line className="dotted-line-glow flow2" x1="84" y1="16" x2="50" y2="50" />
                    {/* Pointillés bas-gauche (sortant du livre) */}
                    <line className="dotted-line-base" x1="16" y1="84" x2="50" y2="50" />
                    <line className="dotted-line-glow flow3" x1="16" y1="84" x2="50" y2="50" />
                    {/* Pointillés bas-droite (sortant du livre) */}
                    <line className="dotted-line-base" x1="84" y1="84" x2="50" y2="50" />
                    <line className="dotted-line-glow flow4" x1="84" y1="84" x2="50" y2="50" />
                  </svg>

                  {/* Livre haut gauche (positionné sur le point SVG) */}
                  <div className="absolute animate-bounce" style={{left: '16%', top: '16%', transform: 'translate(-50%, -50%)', animationDuration: '3s', animationDelay: '0s'}}>
                    <Book className="h-10 w-10 text-[#d4af37] opacity-70" strokeWidth={1.5} />
                  </div>

                  {/* Livre haut droite (positionné sur le point SVG) */}
                  <div className="absolute animate-bounce" style={{right: '16%', top: '16%', transform: 'translate(50%, -50%)', animationDuration: '3.2s', animationDelay: '0.2s'}}>
                    <Book className="h-10 w-10 text-[#d4af37] opacity-70" strokeWidth={1.5} />
                  </div>

                  {/* Livre bas gauche (positionné sur le point SVG) */}
                  <div className="absolute animate-bounce" style={{left: '16%', top: '84%', transform: 'translate(-50%, -50%)', animationDuration: '3.4s', animationDelay: '0.4s'}}>
                    <Book className="h-10 w-10 text-[#d4af37] opacity-70" strokeWidth={1.5} />
                  </div>

                  {/* Livre bas droite (positionné sur le point SVG) */}
                  <div className="absolute animate-bounce" style={{right: '16%', top: '84%', transform: 'translate(50%, -50%)', animationDuration: '3s', animationDelay: '0.1s'}}>
                    <Book className="h-10 w-10 text-[#d4af37] opacity-70" strokeWidth={1.5} />
                  </div>

                  {/* Cerveau au centre */}
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#0b3d91] via-[#11428f] to-[#d4af37]" style={{boxShadow: '0 0 30px rgba(244, 216, 127, 0.4)'}}>
                    <div className="relative inset-8 rounded-full bg-[#06142d]" />
                    <div className="relative text-center">
                      <Brain className="mx-auto h-10 w-10 text-[#f0d87f]" strokeWidth={1.5} />
                      <p className="mt-2 text-[10px] font-semibold tracking-[0.22em] text-white pl-1">IA</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-b border-white/15 bg-white/5 p-3.5 text-sm text-slate-200">
                  Flux, raisonnement et validation dans un seul moteur.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
