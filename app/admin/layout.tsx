"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, CalendarDays, LayoutDashboard, LogOut, Newspaper, Users, Layers3 } from "lucide-react";

const navigation = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/data/contributors", label: "Contributeurs", icon: Users },
  { href: "/admin/memberships", label: "Adhésions et membres", icon: Users },
  { href: "/admin/data/news", label: "Actualités", icon: Newspaper },
  { href: "/admin/data/projects", label: "Projets", icon: Layers3 },
  { href: "/admin/data/events", label: "Événements", icon: CalendarDays },
  { href: "/admin/data/resources", label: "Publications", icon: BookOpen },
  { href: "/admin/data", label: "Toutes les collections", icon: Layers3 },
] as const;

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
  if (checking) return <div className="min-h-screen animate-pulse bg-[#f6f5f1]" />;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const current = navigation.find((item) =>
    pathname === item.href || (item.href !== "/admin" && item.href !== "/admin/data" && pathname.startsWith(item.href + "/"))
  );

  return (
    <div className="admin-shell min-h-screen bg-[#f6f5f1] text-slate-900 lg:flex">
      <aside className="hidden w-[264px] shrink-0 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
        <Link href="/admin" className="mb-9 flex items-center gap-3 px-2">
          <img src="/tlc-logo-hd.png" alt="TLC" className="h-11 w-11 rounded-xl border border-amber-100 bg-[#fbfaf7] object-contain p-1" />
          <span><span className="block text-sm font-bold tracking-wide">TLC <span className="text-[#a9822f]">STUDIO</span></span><span className="mt-0.5 block text-xs text-slate-500">Espace administration</span></span>
        </Link>
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Gestion du site</p>
        <nav className="flex-1 space-y-1">
          {navigation.map(({ href, label, icon: Icon }) => {
            const selected = href === "/admin" ? pathname === href : href === "/admin/data" ? pathname === href : pathname === href || pathname.startsWith(href + "/");
            return <Link key={href} href={href} className={selected
              ? "flex items-center gap-3 rounded-xl bg-amber-50 px-3 py-2.5 text-sm font-semibold text-[#795b1c] ring-1 ring-inset ring-amber-200"
              : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"}>
              <Icon size={17} strokeWidth={1.8} />{label}
            </Link>;
          })}
        </nav>
        <div className="mt-5 border-t border-slate-100 pt-4">
          <Link href="/home" className="mb-2 flex items-center justify-between rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
            Voir le site <ArrowUpRight size={15} />
          </Link>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:bg-rose-50 hover:text-rose-700">
            <LogOut size={17} />Se d&#233;connecter
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-9">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <img src="/tlc-logo-hd.png" alt="" className="h-9 w-9 rounded-lg border border-amber-100 bg-[#fbfaf7] object-contain p-1 lg:hidden" />
              <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">TLC Studio</p><p className="truncate text-sm font-semibold text-slate-800">{current?.label || "Administration"}</p></div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href="/home" className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 sm:inline-flex">Ouvrir le site <ArrowUpRight size={14} /></Link>
              <button onClick={logout} aria-label="Se d&#233;connecter" className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-700 lg:hidden"><LogOut size={18} /></button>
            </div>
          </div>
          <nav className="mx-auto mt-3 flex max-w-[1500px] gap-1 overflow-x-auto pb-0.5 lg:hidden">
            {navigation.map(({ href, label, icon: Icon }) => {
              const selected = href === "/admin" ? pathname === href : href === "/admin/data" ? pathname === href : pathname === href || pathname.startsWith(href + "/");
              return <Link key={href} href={href} className={selected
                ? "inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-[#795b1c]"
                : "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-500 hover:bg-slate-50"}>
                <Icon size={14} />{label}
              </Link>;
            })}
          </nav>
        </header>
        <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-9">{children}</main>
      </div>
    </div>
  );
}
