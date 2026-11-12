import Link from "next/link";

const contributors = [
  {
    name: "musombokelwa",
    github: "https://github.com/musombokelwa",
    avatar: "https://github.com/musombokelwa.png",
  },
  {
    name: "mukadi2",
    github: "https://github.com/mukadi2",
    avatar: "https://github.com/mukadi2.png",
  },
  {
    name: "Ignace32",
    github: "https://github.com/Ignace32",
    avatar: "https://github.com/Ignace32.png",
  },
  {
    name: "Athena-Evan01",
    github: "https://github.com/Athena-Evan01",
    avatar: "https://github.com/Athena-Evan01.png",
  },
  {
    name: "SiegK18",
    github: "https://github.com/SiegK18",
    avatar: "https://github.com/SiegK18.png",
  },
  {
    name: "Tomy Mutombo",
    github: "https://github.com/tomymutombo",
    avatar: "https://github.com/tomymutombo.png",
  },
  {
    name: "Sem Kasanga",
    github: "https://github.com/semkasanga",
    avatar: "https://github.com/semkasanga.png",
  },
  {
    name: "Keran Tyrinthe",
    github: "https://github.com/KeranTyrinthe",
    avatar: "/Contributor/keran/WhatsApp Image 2026-11-11 at 13.26.26.jpeg",
  },
  {
    name: "Sierra Kaluba",
    github: "https://github.com/SierraKaluba",
    avatar: "https://github.com/SierraKaluba.png",
  },
  {
    name: "Gilbert Benwiz",
    github: "https://github.com/Gilbert243",
    avatar: "/Contributor/Benwiz/WhatsApp Image 2026-11-11 at 12.32.04.jpeg",
  },
];

const ContributorsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#06142d] via-[#0a1f2e] to-[#06142d] border-b border-[#d4af37]/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-white">Soutenus par</h3>
          <p className="text-slate-300 mt-2">
            Soutenu par d’innombrables donateurs, développé par des mainteneurs à temps plein et à temps partiel, TLC est là pour durer.
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
