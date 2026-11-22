import { describe, it, expect } from "vitest";
import { newInquiry, validateInquiry } from "../lib/inquiries";
const valid = { kind: "join", name: "Nom Test", email: "prenom@example.org", profile: "Étudiant", context: "", message: "Je souhaite contribuer au développement de TLC.", consent: true };
describe("public inquiry validation", () => {
  it("rejects missing consent, malformed emails and short messages", () => {
    expect(validateInquiry({ ...valid, consent: false }).ok).toBe(false);
    expect(validateInquiry({ ...valid, email: "invalid" }).ok).toBe(false);
    expect(validateInquiry({ ...valid, message: "court" }).ok).toBe(false);
  });
  it("accepts a valid application", () => {
    const result = validateInquiry(valid);
    expect(result.ok).toBe(true);
    if (result.ok) { const item = newInquiry(result); expect(item.status).toBe("new"); expect(item.id.length).toBeGreaterThan(10); }
  });
});
