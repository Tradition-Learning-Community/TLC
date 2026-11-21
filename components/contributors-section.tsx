import Link from "next/link";
import type { Contributor } from "@/lib/types";

export default function ContributorsSection({ contributors }: { contributors: Contributor[] }) {
  return (
    <section className="border-b border-[#d4af37]/10 bg-gradient-to-b from-[#06142d] via-[#0a1f2e] to-[#06142d] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-2 text-2xl font-semibold text-white">Contributions techniques</h2>
        <p className="mb-8 text-slate-300">
          Profils GitHub référencés par la plateforme. Cette liste ne constitue
          ni un annuaire exhaustif des membres TLC ni une liste de donateurs.
        </p>
        <div className="flex flex-wrap gap-3 md:gap-4">
          {contributors.map((contributor) => (
            <Link key={contributor.id} href={contributor.github} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2 hover:border-[#d4af37]/60">
              <img src={contributor.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-sm font-medium text-white">{contributor.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
