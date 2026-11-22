"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Database, LayoutDashboard, LogOut, Mail, Newspaper, Users, ShieldCheck, KeyRound, Menu, X } from "lucide-react";
import { authClient } from "@/lib/neon-auth-client";
import type { Permission } from "@/lib/staff-permissions";

export const dynamic = "force-dynamic";
const navigation: { href: string; label: string; icon: typeof Database; permission?: Permission }[] = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/publications", label: "Actualités", icon: Newspaper, permission: "editorial:write" },
  { href: "/admin/demandes", label: "Demandes", icon: Mail, permission: "inquiries:read" },
  { href: "/admin/contributors", label: "Contributeurs", icon: Users, permission: "contributors:manage" },
  { href: "/admin/data", label: "Données", icon: Database, permission: "data:manage" },
  { href: "/admin/staff", label: "Équipe & droits", icon: ShieldCheck, permission: "staff:manage" },
  { href: "/admin/security", label: "Mon accès", icon: KeyRound },
];
type Identity = { name: string; role: string; permissions: Permission[]; mustChange?:boolean; kind:string };
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const publicPath = pathname === "/admin/login" || pathname === "/admin/activate";
  const [checking, setChecking] = useState(!publicPath);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [unread, setUnread] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    if (publicPath) return;
    let active = true;
    setChecking(true);
    fetch("/api/admin/verify", { cache: "no-store" })
      .then(async response => {
        if (!response.ok) { router.replace("/admin/login"); return; }
        const data = await response.json();
        if (!active) return;
        setIdentity(data.actor); setChecking(false);
        if (data.actor.mustChange && pathname !== "/admin/security") { router.replace("/admin/security"); return; }
        if (data.actor.permissions.includes("inquiries:read")) {
          fetch("/api/admin/notifications", { cache: "no-store" })
            .then(r => r.ok ? r.json() : null).then(value => { if (active && value) setUnread(value.unreadCount || 0); }).catch(() => {});
        }
      }).catch(() => { if (active) router.replace("/admin/login"); });
    return () => { active = false; };
  }, [pathname, router, publicPath]);
  if (publicPath) return <>{children}</>;
  if (checking || !identity) return <div className="min-h-screen animate-pulse bg-[#07111f]" />;
  const links = navigation.filter(item =>
    identity.mustChange ? item.href === "/admin/security" :
    item.href === "/admin/security" ? identity.kind === "local" :
    !item.permission || identity.permissions.includes(item.permission));
  async function logout() {
    try { await authClient.signOut(); } catch { /* legacy login has no Neon session */ }
    await fetch("/api/admin/logout", { method: "POST" });
    setIdentity(null); router.replace("/admin/login"); router.refresh();
  }
  const navLinks = links.map(({ href, label, icon: Icon }) => {
    const selected = href === "/admin" ? pathname === href : pathname.startsWith(href);
    return <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${selected ? "bg-[#d4af37]/12 font-medium text-[#f0d87f] ring-1 ring-inset ring-[#d4af37]/20" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}><Icon size={17}/>{label}{href === "/admin/demandes" && unread > 0 && <span className="ml-auto rounded-full bg-[#d4af37] px-2 py-0.5 text-xs text-[#07111f]">{unread}</span>}</Link>;
  });
  return <div className="min-h-screen bg-[#07111f] text-slate-100 lg:flex">
    <aside className="hidden w-72 shrink-0 flex-col border-r border-white/[0.07] bg-[#091523] px-5 py-6 lg:flex">
      <Link href="/admin" className="mb-8 flex items-center gap-3 px-2"><img src="/tlc-logo-hd.png" alt="TLC" className="h-10 w-10 rounded-lg object-contain"/><span className="font-semibold">Administration TLC</span></Link>
      <div className="mb-7 rounded-xl border border-white/10 p-3"><p className="text-sm text-white">{identity.name}</p><p className="mt-1 text-xs text-slate-400">{identity.role}</p></div>
      <nav className="flex-1 space-y-1">{navLinks}</nav>
      <Link href="/" className="mb-3 flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 text-xs text-slate-400">Voir le site <ArrowUpRight size={15}/></Link>
      <button onClick={() => void logout()} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400"><LogOut size={17}/> Se déconnecter</button>
    </aside>
    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07111f]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0"><p className="font-semibold">Administration TLC</p><p className="truncate text-xs text-slate-400">{identity.name}</p></div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" aria-label={mobileOpen ? "Fermer le menu d'administration" : "Ouvrir le menu d'administration"} aria-controls="tlc-admin-mobile-navigation" aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(open => !open)} className="rounded-lg border border-white/15 p-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37]">
              {mobileOpen ? <X size={21}/> : <Menu size={21}/>}
            </button>
            <button type="button" aria-label="Se déconnecter" onClick={() => void logout()} className="rounded-lg border border-white/15 p-2 text-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af37]"><LogOut size={20}/></button>
          </div>
        </div>
        <nav id="tlc-admin-mobile-navigation" aria-label="Navigation administration mobile"
          className={`mt-3 grid gap-1 border-t border-white/10 pt-3 sm:grid-cols-2 ${mobileOpen ? "" : "hidden"}`}>
          {navLinks}
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5">Voir le site <ArrowUpRight size={15}/></Link>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-10">{children}</main>
    </div>
  </div>;
}
