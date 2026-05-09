import Link from "next/link";

const contributors = [
  { name: "Contributor 1", github: "https://github.com/contributor1", avatar: "https://i.pravatar.cc/100?img=1" },
  { name: "Contributor 2", github: "https://github.com/contributor2", avatar: "https://i.pravatar.cc/100?img=2" },
  { name: "Contributor 3", github: "https://github.com/contributor3", avatar: "https://i.pravatar.cc/100?img=3" },
  { name: "Contributor 4", github: "https://github.com/contributor4", avatar: "https://i.pravatar.cc/100?img=4" },
  { name: "Contributor 5", github: "https://github.com/contributor5", avatar: "https://i.pravatar.cc/100?img=5" },
  { name: "Contributor 6", github: "https://github.com/contributor6", avatar: "https://i.pravatar.cc/100?img=6" },
  { name: "Contributor 7", github: "https://github.com/contributor7", avatar: "https://i.pravatar.cc/100?img=7" },
  { name: "Contributor 8", github: "https://github.com/contributor8", avatar: "https://i.pravatar.cc/100?img=8" },
  { name: "Contributor 9", github: "https://github.com/contributor9", avatar: "https://i.pravatar.cc/100?img=9" },
  { name: "Contributor 10", github: "https://github.com/contributor10", avatar: "https://i.pravatar.cc/100?img=10" },
];

const ContributorsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#06142d] via-[#0a1f2e] to-[#06142d] border-b border-[#d4af37]/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-white">Soutenus par</h3>
          <p className="text-slate-300 mt-2">
            Backed by Vercel et countless donors, developed by full-time and part-time maintainers, Svelte is here to stay.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
          {contributors.map((contributor) => (
            <Link
              key={contributor.name}
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
