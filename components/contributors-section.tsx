import Link from "next/link";
import type { Contributor } from "@/lib/types";

const ContributorsSection = ({ contributors }: { contributors: Contributor[] }) => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#06142d] via-[#0a1f2e] to-[#06142d] border-b border-[#d4af37]/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-white">Ils contribuent à TLC</h3>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
          {contributors.map((contributor) => (
            <Link
              key={contributor.id}
              href={contributor.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={contributor.name}
              className="group relative inline-flex"
            >
              <img
                src={contributor.avatar}
                alt={contributor.name}
                title={contributor.name}
                className="h-12 w-12 md:h-16 md:w-16 rounded-full border-2 border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 hover:scale-110 cursor-pointer object-cover"
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {contributor.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContributorsSection;
