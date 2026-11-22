"use client";
import { useState, type FormEvent } from "react";
import type { InquiryKind } from "@/lib/inquiries";
export default function InquiryForm({ kind = "join", context = "", onSent, compact = false, idPrefix = "request" }:
  { kind?: InquiryKind; context?: string; onSent?: () => void; compact?: boolean; idPrefix?: string }) {
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(""); const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const [sent, setSent] = useState<{ kind: InquiryKind; context: string } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, context, name, email, profile, message, consent, website }) });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Impossible d'envoyer votre demande.");
      setSent({ kind, context }); onSent?.();
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Erreur d'envoi."); }
    finally { setBusy(false); }
  }
  if (sent && sent.kind === kind && sent.context === context) return <p className="notice" role="status">Votre demande a été transmise à TLC. Merci pour votre intérêt.</p>;
  return <form onSubmit={(event) => void submit(event)} className={compact ? "inquiry-form" : "inquiry-form space-y-4"} aria-busy={busy}>
    <div className="field"><label htmlFor={`${idPrefix}-name`}>Nom complet</label><input id={`${idPrefix}-name`} required minLength={2} maxLength={140} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" /></div>
    <div className="field"><label htmlFor={`${idPrefix}-email`}>Adresse e-mail</label><input id={`${idPrefix}-email`} required type="email" maxLength={254} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.org" /></div>
    <div className="field"><label htmlFor={`${idPrefix}-profile`}>Profil / organisation (facultatif)</label><input id={`${idPrefix}-profile`} maxLength={120} value={profile} onChange={(e) => setProfile(e.target.value)} placeholder="Étudiant, chercheur, entreprise..." /></div>
    <div className="field"><label htmlFor={`${idPrefix}-message`}>{kind === "event" ? "Message (facultatif)" : "Votre message"}</label><textarea id={`${idPrefix}-message`} required={kind !== "event"} minLength={kind === "event" ? 0 : 10} maxLength={3000} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Votre projet, motivation ou proposition..." /></div>
    <div aria-hidden="true" className="hidden"><label htmlFor={`${idPrefix}-website`}>Site internet</label><input tabIndex={-1} id={`${idPrefix}-website`} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></div>
    <label className="inquiry-consent"><input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} /> J'accepte que TLC utilise ces informations uniquement pour donner suite à ma demande.</label>
    {error && <p role="alert" className="text-sm text-red-600 dark:text-red-300">{error}</p>}
    <button disabled={busy} type="submit" className="button button-gold">{busy ? "Envoi..." : kind === "event" ? "Envoyer mon inscription" : "Envoyer ma demande"}</button>
  </form>;
}
