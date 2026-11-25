"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import "../../join/membership.css";

export default function MemberLogin() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/membership/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      });
      const json = await response.json().catch(() => null);
      if (!response.ok) throw new Error(json?.error || "Connexion indisponible.");
      router.replace("/member");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Connexion indisponible.");
    } finally { setBusy(false); }
  }

  return <main className="tlc-member-area"><div className="new-container">
    <div className="tlc-member-intro"><span className="eyebrow">ESPACE MEMBRE</span><h1>Connexion TLC</h1><p>Votre compte est accessible après validation de votre inscription par TLC.</p></div>
    <div className="tlc-member-panel">
      <form onSubmit={submit} className="tlc-member-login-form">
        <label>Adresse e-mail<input type="email" name="email" required autoComplete="email" /></label>
        <label>Mot de passe<input type="password" name="password" required autoComplete="current-password" /></label>
        {error && <p className="tlc-member-error" role="alert">{error}</p>}
        <button type="submit" disabled={busy} className="button button-gold">{busy ? "Connexion…" : "Se connecter"}</button>
        <p className="tlc-member-help">Pas encore de compte ? <Link href="/join">Rejoindre TLC</Link>. Si vous ne pouvez plus accéder à votre compte, <Link href="/contact">contactez l’équipe</Link>.</p>
      </form>
    </div>
  </div></main>;
}
