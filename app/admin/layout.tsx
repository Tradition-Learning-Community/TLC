import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#04111a] to-[#071428] text-white">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-white/6 p-6 flex flex-col">
          <div className="mb-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logotlc.jpeg" alt="logo" className="h-10 w-10 rounded" />
              <div>
                <div className="font-bold text-lg">TLC Admin</div>
                <div className="text-sm text-slate-300">Dashboard</div>
              </div>
            </Link>
          </div>

          <nav className="flex-1 flex flex-col gap-2">
            <Link href="/admin" className="px-3 py-2 rounded-md hover:bg-white/5">Tableau de bord</Link>
            <Link href="/admin/contributors" className="px-3 py-2 rounded-md bg-white/5">Contributeurs</Link>
            <Link href="/admin/data" className="px-3 py-2 rounded-md hover:bg-white/5">Gestion des donnees</Link>
          </nav>

          <div className="pt-4 text-sm text-slate-400">Sécurité: mot de passe unique</div>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
