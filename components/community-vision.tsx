const CommunityVision = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#06142d] via-[#0a1f2e] to-[#06142d] border-b border-[#d4af37]/10">
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 items:center px-4">
        <div>
          <h3 className="text-2xl font-semibold text-white">Notre vision</h3>
          <p className="mt-3 text-slate-300 leading-relaxed">
            Dans beaucoup de contextes, réunir suffisamment de données pour entraîner une IA
            reste difficile. Tradition Learning étudie d’autres mécanismes d’apprentissage.
            TLC mène cette recherche et développe les outils pour la mettre à l’épreuve.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Étudier les fondements de Tradition Learning</li>
            <li>• Développer et tester la bibliothèque tllib</li>
            <li>• Partager les travaux et accueillir des contributions</li>
          </ul>
        </div>

        <div className="text-left md:text-right">
          <p className="text-sm text-slate-300">Recherche, développement, partenariats :</p>
          <a href="/community" className="inline-block mt-3 rounded-md bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black hover:bg-[#e0c158]">
            Découvrir comment participer
          </a>
        </div>
      </div>
    </section>
  )
}

export default CommunityVision
