import Link from "next/link";

export default function CommunityVision() {
  return (
    <section className="border-b border-[#d4af37]/10 bg-gradient-to-b from-[#06142d] via-[#0a1f2e] to-[#06142d] py-12 md:py-16">
      <div className="mx-auto grid max-w-4xl items-center gap-6 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-white">De la théorie à la bibliothèque</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            Tradition Learning est un cadre scientifique d’apprentissage fondé sur la
            transmission, la transformation et l’évolution d’une Tradition.
            TLC rassemble les personnes qui étudient cette théorie et développent tllib.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Les bénéfices recherchés en faible volume de données, généralisation
            et robustesse restent à établir par des expériences.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <Link href="/about#what-is" className="inline-flex rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold text-[#06142d] hover:bg-[#e0c158]">Comprendre Tradition Learning</Link>
          <Link href="https://github.com/Tradition-Learning-Community/tllib" className="text-sm font-semibold text-[#f0d87f] hover:underline">Découvrir tllib sur GitHub</Link>
        </div>
      </div>
    </section>
  );
}
