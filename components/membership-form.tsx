"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { memberInterests, memberProfiles } from "@/lib/membership";
import "@/app/join/membership.css";

export default function MembershipForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const password = String(data.get("password") || "");
    if (password !== String(data.get("passwordConfirm") || "")) {
      setError("La confirmation du mot de passe ne correspond pas.");
      return;
    }
    const payload = {
      name: data.get("name"), email: data.get("email"), password,
      profile: data.get("profile"), country: data.get("country"),
      organization: data.get("organization"), interests: data.getAll("interests"),
      message: data.get("message"), consent: data.get("consent") === "on",
      website: data.get("website"),
    };
    setError(""); setSubmitting(true);
    try {
      const response = await fetch("/api/membership", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Impossible d'enregistrer la demande.");
      setSubmitted(true);
      form.reset();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Enregistrement indisponible.");
    } finally { setSubmitting(false); }
  }

  if (submitted) return <div className="tlc-member-success" role="status">
    <span className="tlc-member-success-mark" aria-hidden="true">✓</span>
    <h3>Demande d'adhésion enregistrée</h3>
    <p>Votre compte a été créé avec le statut « En attente ». L’équipe TLC examinera votre inscription. Une fois votre demande acceptée, vous pourrez vous connecter avec votre e-mail et votre mot de passe.</p>
    <Link href="/member/login" className="button button-gold">Accéder à la connexion</Link>
  </div>;

  return <form className="tlc-member-form" onSubmit={submit}>
    <div className="tlc-member-form-grid">
      <label>Nom complet *<input name="name" required maxLength={100} autoComplete="name" placeholder="Votre nom" /></label>
      <label>Adresse e-mail *<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="vous@exemple.com" /></label>
      <label>Profil *<select name="profile" required defaultValue=""><option value="" disabled>Choisissez votre profil</option>{memberProfiles.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>
      <label>Pays<input name="country" maxLength={90} autoComplete="country-name" placeholder="Votre pays" /></label>
      <label className="tlc-member-wide">Organisation ou établissement (facultatif)<input name="organization" maxLength={120} placeholder="Université, entreprise, association…" /></label>
    </div>
    <fieldset className="tlc-member-interests">
      <legend>Comment souhaitez-vous participer ? *</legend>
      <p>Vous pouvez choisir plusieurs possibilités.</p>
      <div>{memberInterests.map(({value,label}) => <label key={value}><input type="checkbox" name="interests" value={value}/><span>{label}</span></label>)}</div>
    </fieldset>
    <label className="tlc-member-message">Quelques mots sur votre motivation (facultatif)<textarea name="message" maxLength={1200} rows={3} placeholder="Vos intérêts, compétences ou propositions" /></label>
    <div className="tlc-member-form-grid">
      <label>Mot de passe *<input type="password" name="password" required minLength={10} maxLength={128} autoComplete="new-password" placeholder="10 caractères minimum" /></label>
      <label>Confirmer le mot de passe *<input type="password" name="passwordConfirm" required minLength={10} maxLength={128} autoComplete="new-password" placeholder="Répéter le mot de passe" /></label>
    </div>
    <label className="tlc-member-consent"><input type="checkbox" name="consent" required/><span>J'accepte que TLC conserve ces informations pour traiter mon adhésion et gérer mon compte.</span></label>
    <div className="tlc-member-honey" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off"/></label></div>
    {error && <p className="tlc-member-error" role="alert">{error}</p>}
    <button type="submit" disabled={submitting} className="button button-gold tlc-member-submit">{submitting ? "Enregistrement…" : "Créer mon compte TLC"}</button>
    <p className="tlc-member-help">Déjà inscrit ? <Link href="/member/login">Se connecter</Link>. Votre inscription est soumise à validation par TLC ; les informations du compte ne sont pas rendues publiques.</p>
  </form>;
}
