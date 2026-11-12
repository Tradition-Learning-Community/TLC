"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(pathname !== "/admin/login");

  useEffect(() => {
    if (pathname === "/admin/login") {
      return;
    }

    let active = true;
    fetch("/api/admin/verify", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) router.replace("/admin/login");
        else if (active) setChecking(false);
      })
      .catch(() => router.replace("/admin/login"));

    return () => {
      active = false;
    };
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (checking) return <div className="min-h-screen bg-[#04111a]" />;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

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

          <div className="pt-4 text-sm text-slate-400">Sécurité : mot de passe unique</div>
          <button onClick={logout} className="mt-3 rounded-md border border-red-400/30 px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10">
            Se déconnecter
          </button>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
