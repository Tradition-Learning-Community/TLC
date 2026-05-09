const CommunitySection = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#06142d] via-[#0a1f2e] to-[#07162f] py-20 lg:py-32 border-b border-[#d4af37]/8">
      {/* Texte centré au-dessus */}
      <div className="mx-auto max-w-3xl text-center px-4 mb-12 lg:mb-20 z-10 relative">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Tradition Learning — IA pour l'Afrique
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed">
          Nous rassemblons chercheurs, développeurs et acteurs locaux pour
          co-créer des solutions d'IA utiles, éthiques et adaptées aux
          réalités africaines. Rejoignez-nous pour contribuer et apprendre.
        </p>
      </div>

      {/* Collage d'images */}
      <div className="relative mx-auto max-w-7xl px-4 h-96 lg:h-[500px]">
        {/* Lignes lumineuses superposées */}
        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="lg-line" x1="0" x2="1">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#f0d87f" />
              <stop offset="100%" stopColor="#0b3d91" />
            </linearGradient>

            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <style>{`
            .tl-line{stroke:url(#lg-line);stroke-width:0.6;stroke-linecap:round;fill:none;opacity:0.9}
            .tl-glow{stroke:url(#lg-line);stroke-width:2;stroke-linecap:round;fill:none;opacity:0.32;filter:url(#glow)}
            .tl-dot{fill:#f0d87f;opacity:0.98;filter:url(#glow)}
          `}</style>

          {/* Liaisons centrales vers 4 coins avec courbes pour adoucir le rendu */}
          <path className="tl-glow" d="M50 50 Q32 28 15 15" />
          <path className="tl-line" d="M50 50 Q34 32 15 15" />

          <path className="tl-glow" d="M50 50 Q68 28 85 15" />
          <path className="tl-line" d="M50 50 Q66 32 85 15" />

          <path className="tl-glow" d="M50 50 Q32 72 15 85" />
          <path className="tl-line" d="M50 50 Q34 68 15 85" />

          <path className="tl-glow" d="M50 50 Q68 72 85 85" />
          <path className="tl-line" d="M50 50 Q66 68 85 85" />

          {/* Points lumineux aux extrémités */}
          <circle className="tl-dot" cx="15" cy="15" r="1.4" />
          <circle className="tl-dot" cx="85" cy="15" r="1.4" />
          <circle className="tl-dot" cx="15" cy="85" r="1.4" />
          <circle className="tl-dot" cx="85" cy="85" r="1.4" />
        </svg>

        {/* Image principale centrale */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 lg:w-96 z-30">
          <img
            src="/logotlc.jpeg"
            alt="Communauté TLC"
            className="w-full h-64 lg:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/10"
          />
        </div>

        {/* Image haut-gauche (rapprochée) */}
        <div className="absolute top-0 left-0 w-44 lg:w-56 z-20">
          <img
            src="/tlc.jpg"
            alt="TLC Logo"
            className="w-full h-40 lg:h-56 object-cover rounded-xl"
          />
        </div>

        {/* Image haut-droite */}
        <div className="absolute top-0 right-0 w-44 lg:w-56 z-20">
          <img
            src="/Training.jpg"
            alt="Community Event"
            className="w-full h-40 lg:h-56 object-cover rounded-xl"
          />
        </div>

        {/* Image bas-gauche */}
        <div className="absolute bottom-0 left-0 w-44 lg:w-56 z-20">
          <img
            src="/one.jpg"
            alt="Global"
            className="w-full h-40 lg:h-56 object-cover rounded-xl"
          />
        </div>

        {/* Image bas-droite (rapprochée) */}
        <div className="absolute bottom-0 right-0 w-44 lg:w-56 z-20">
          <img
            src="/two.jpg"
            alt="Resources"
            className="w-full h-40 lg:h-56 object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Texte du credit au bas */}
      <div className="text-center mt-12 text-sm text-slate-400">
        Photos par nos événements
      </div>
    </section>
  )
}

export default CommunitySection
