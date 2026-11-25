export const memberInterests = [
  { value: "member", label: "Devenir membre" },
  { value: "volunteer", label: "Bénévolat" },
  { value: "contributor", label: "Contribuer aux travaux" },
  { value: "sponsor", label: "Soutenir ou sponsoriser" },
  { value: "partner", label: "Partenariat" },
] as const;

export const memberProfiles = [
  { value: "research", label: "Recherche scientifique" },
  { value: "development", label: "Développement et ingénierie" },
  { value: "student", label: "Études" },
  { value: "organization", label: "Organisation ou entreprise" },
  { value: "other", label: "Autre" },
] as const;

export type MemberStatus = "pending" | "approved" | "rejected";
export type MembershipInput = {
  name: string;
  email: string;
  password: string;
  profile: string;
  country: string;
  organization: string;
  interests: string[];
  message: string;
  consent: boolean;
};

export type MemberAccount = Omit<MembershipInput, "password" | "consent"> & {
  id: string;
  passwordHash: string;
  status: MemberStatus;
  createdAt: string;
  consentAt: string;
  reviewedAt?: string;
  reviewNote?: string;
};

export type PublicMember = Omit<MemberAccount, "passwordHash" | "consentAt">;

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}
function clean(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit + 1) : "";
}
export function validateMembershipInput(body: unknown):
  { ok: true; value: MembershipInput } | { ok: false; error: string } {
  const data = record(body);
  if (!data) return { ok: false, error: "Informations invalides." };
  const name = clean(data.name, 100);
  const email = clean(data.email, 254).toLowerCase();
  const password = typeof data.password === "string" ? data.password : "";
  const profile = clean(data.profile, 40);
  const country = clean(data.country, 90);
  const organization = clean(data.organization, 120);
  const message = clean(data.message, 1200);
  const interests = Array.isArray(data.interests) ? data.interests : [];
  const allowedInterests = new Set(memberInterests.map(x => x.value));
  const allowedProfiles = new Set(memberProfiles.map(x => x.value));
  if (name.length < 2 || name.length > 100) return { ok: false, error: "Indiquez votre nom complet." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    return { ok: false, error: "Adresse e-mail invalide." };
  if (password.length < 10 || password.length > 128)
    return { ok: false, error: "Le mot de passe doit contenir de 10 à 128 caractères." };
  if (!allowedProfiles.has(profile as typeof memberProfiles[number]["value"]))
    return { ok: false, error: "Choisissez votre profil." };
  if (country.length > 90 || organization.length > 120)
    return { ok: false, error: "Pays ou organisation trop long." };
  if (!Array.isArray(interests) || interests.length < 1 || interests.length > 5 ||
      new Set(interests).size !== interests.length ||
      interests.some(x => typeof x !== "string" || !allowedInterests.has(x as typeof memberInterests[number]["value"])))
    return { ok: false, error: "Sélectionnez au moins une forme de participation." };
  if (message.length > 1200) return { ok: false, error: "Votre message est trop long." };
  if (data.consent !== true) return { ok: false, error: "Votre accord est nécessaire pour envoyer la demande." };
  return { ok: true, value: { name, email, password, profile, country, organization, interests, message, consent: true } };
}
export function publicMember(account: MemberAccount): PublicMember {
  const { passwordHash: _secret, consentAt: _consent, ...safe } = account;
  void _secret;
  void _consent;
  return safe;
}
