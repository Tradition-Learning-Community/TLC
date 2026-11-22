import { randomUUID } from "node:crypto";
export type InquiryKind = "join" | "partnership" | "support" | "contact" | "project" | "event";
export type InquiryStatus = "new" | "in-progress" | "closed";
export type Inquiry = {
  id: string;
  kind: InquiryKind;
  name: string;
  email: string;
  profile: string;
  context: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
};
const kinds: InquiryKind[] = ["join", "partnership", "support", "contact", "project", "event"];
export function validateInquiry(input: unknown): { ok: true; data: Pick<Inquiry,"kind" | "name" | "email" | "profile" | "context" | "message"> } | { ok: false; error: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, error: "Requête invalide." };
  const data = input as Record<string, unknown>;
  const text = (key: string, max: number) => typeof data[key] === "string" ? String(data[key]).trim().slice(0, max + 1) : "";
  const kind = data.kind as InquiryKind;
  const name = text("name", 140);
  const email = text("email", 254);
  const profile = text("profile", 120);
  const context = text("context", 180);
  const message = text("message", 3000);
  if (!kinds.includes(kind)) return { ok: false, error: "Objet de la demande invalide." };
  if (name.length < 2 || name.length > 140) return { ok: false, error: "Nom invalide." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { ok: false, error: "Adresse e-mail invalide." };
  if (profile.length > 120 || context.length > 180) return { ok: false, error: "Champ trop long." };
  if (message.length > 3000 || (kind !== "event" && message.length < 10)) return { ok: false, error: "Message requis (10 à 3 000 caractères)." };
  if (data.consent !== true) return { ok: false, error: "Veuillez accepter le traitement de votre demande." };
  return { ok: true, data: { kind, name, email, profile, context, message } };
}
export function newInquiry(input: ReturnType<typeof validateInquiry> & { ok: true }): Inquiry {
  const now = new Date().toISOString();
  return { ...input.data, id: randomUUID(), status: "new", createdAt: now, updatedAt: now };
}
