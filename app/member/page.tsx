"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PublicMember } from "@/lib/membership";
import "../join/membership.css";

const categoryLabels: Record<string, string> = {
  member: "Membre", volunteer: "Bénévole", contributor: "Contributeur",
  sponsor: "Sponsor", partner: "Partenaire",
};

export default function MemberAccount() {
  const router = useRouter();
  const [member, setMember] = useState<PublicMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/membership/me", { cache: "no-store" })
      .then(async response => {
        if (!response.ok) { router.replace("/member/login"); return; }
        const data = await response.json();
        if (active) setMember(data.member);
      })
      .catch(() => router.replace("/member/login"))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [router]);

  async function logout() {
    await fetch("/api/membership/logout", { method: "POST" }).catch(() => null);
    router.replace("/member/login");
    router.refresh();
  }

  return <main className="tlc-member-area"><div className="new-container">
    {loading ? <p role="status">Ouverture de votre espace membre…</p> : member ? <div className="tlc-member-panel">
      <span className="eyebrow">ESPACE MEMBRE TLC</span>
      <h1>Bienvenue, {member.name}</h1>
      <p>Votre adhésion à Tradition Learning Community est active.</p>
      <p><strong>Adresse :</strong> {member.email}</p>
      {member.country && <p><strong>Pays :</strong> {member.country}</p>}
      <p><strong>Participation :</strong> {member.interests.map(x => categoryLabels[x] || x).join(", ")}</p>
      <div className="flex flex-wrap gap-3 mt-6">
        <Link href="/projects" className="button button-gold">Découvrir les travaux</Link>
        <button type="button" className="button button-outline" onClick={logout}>Se déconnecter</button>
      </div>
    </div> : null}
  </div></main>;
}
