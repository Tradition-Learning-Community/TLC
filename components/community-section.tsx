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
        {/* Image principale centrale */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 lg:w-96 z-20">
          <img
            src="/logotlc.jpeg"
            alt="Communauté TLC"
            className="w-full h-64 lg:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/10"
          />
        </div>

        {/* Image haut-gauche (rapprochée) */}
        <div className="absolute top-0 left-0 w-44 lg:w-56 z-15">
          <img
            src="/tlc.jpg"
            alt="TLC Logo"
            className="w-full h-40 lg:h-56 object-cover rounded-xl"
          />
        </div>

        {/* Image haut-droite */}
        <div className="absolute top-0 right-0 w-44 lg:w-56 z-15">
          <img
            src="/Training.jpg"
            alt="Community Event"
            className="w-full h-40 lg:h-56 object-cover rounded-xl"
          />
        </div>

        {/* Image bas-gauche */}
        <div className="absolute bottom-0 left-0 w-44 lg:w-56 z-15">
          <img
            src="/one.jpg"
            alt="Global"
            className="w-full h-40 lg:h-56 object-cover rounded-xl"
          />
        </div>

        {/* Image bas-droite (rapprochée) */}
        <div className="absolute bottom-0 right-0 w-44 lg:w-56 z-15">
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
