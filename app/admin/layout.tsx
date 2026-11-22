"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Database, LayoutDashboard, LogOut, Newspaper, Users } from "lucide-react";

export const dynamic = "force-dynamic";

const navigation = [
  { href: "/admin", label: "Vue d’ensemble", icon: LayoutDashboard },
  { href: "/admin/publications", label: "Actualités", icon: Newspaper },
  { href: "/admin/contributors", label: "Contributeurs", icon: Users },
  { href: "/admin/data", label: "Données", icon: Database },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(pathname !== "/admin/login");

  useEffect(() => {
    if (pathname === "/admin/login") return;
    let active = true;
    fetch("/api/admin/verify", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) router.replace("/admin/login");
        else if (active) setChecking(false);
      })
      .catch(() => router.replace("/admin/login"));
    return () => { active = false; };
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (checking) return <div className="min-h-screen animate-pulse bg-[#07111f]" />;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100 lg:flex">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-white/[0.07] bg-[#091523] px-5 py-6 lg:flex">
        <Link href="/admin" className="mb-10 flex items-center gap-3 px-2">
          <img src="/logotlc.jpeg" alt="TLC" className="h-11 w-11 rounded-xl object-cover" />
          <span><span className="block text-sm font-bold tracking-wide">TLC <span className="text-[#e6c56b]">STUDIO</span></span><span className="mt-0.5 block text-xs text-slate-500">Espace administration</span></span>
        </Link>
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Espace de travail</p>
        <nav className="flex-1 space-y-1">
          {navigation.map(({ href, label, icon: Icon }) => {
            const selected = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${selected ? "bg-[#d4af37]/12 font-medium text-[#f0d87f] ring-1 ring-inset ring-[#d4af37]/20" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}><Icon size={17} />{label}</Link>;
          })}
        </nav>
        <Link href="/" className="mb-3 flex items-center justify-between rounded-xl border border-white/[0.07] px-3 py-3 text-xs text-slate-400 transition hover:border-white/15 hover:text-white">Voir le site <ArrowUpRight size={15} /></Link>
        <button onClick={logout} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-red-400/10 hover:text-red-300"><LogOut size={17} />Se déconnecter</button>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#07111f]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
          <div className="flex items-center gap-3">
            <img src="/logotlc.jpeg" alt="TLC" className="h-9 w-9 rounded-lg object-cover" />
            <div className="min-w-0 flex-1"><div className="text-sm font-semibold">TLC Admin</div><div className="text-xs text-slate-500">Espace administration</div></div>
            <button onClick={logout} aria-label="Se déconnecter" className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"><LogOut size={18} /></button>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto">
            {navigation.map(({ href, label, icon: Icon }) => {
              const selected = href === "/admin" ? pathname === href : pathname.startsWith(href);
              return <Link key={href} href={href} className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs ${selected ? "bg-[#d4af37]/12 text-[#f0d87f]" : "text-slate-400 hover:bg-white/5"}`}><Icon size={15} />{label}</Link>;
            })}
          </nav>
        </header>
        <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
