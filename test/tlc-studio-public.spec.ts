import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("TL Studio — présentation publique d'un produit en conception", () => {
  it("dispose de sa propre route et d'une navigation accessible", () => {
    const page = source("app/tl-studio/page.tsx");
    const header = source("components/header.tsx");
    const footer = source("components/footer.tsx");
    expect(page).toContain("PROJET EN CONCEPTION");
    expect(page).toContain("<TLStudioPreview />");
    expect(page).toContain('href="/resources/tllib"');
    expect(header).toContain('["TL Studio", "/tl-studio"]');
    expect(footer).toContain('<Link href="/tl-studio">TL Studio</Link>');
  });

  it("propose deux exemples interactifs sans prétendre constituer un vrai système", () => {
    const preview = source("components/tl-studio-preview.tsx");
    expect(preview).toContain('id: "sante"');
    expect(preview).toContain('id: "industrie"');
    for (const label of ["mission", "probleme", "ressources", "roles", "capacites"]) {
      expect(preview).toContain("{scenario." + label + "}");
    }
    expect(preview).toContain("onClick={() => setSelected(item.id)}");
    expect(preview).toContain("aria-pressed={selected === item.id}");
    expect(preview).toContain("aucun système n’est exécuté ici");
  });

  it("présente TLC indépendamment de GitHub et WhatsApp", () => {
    const about = source("components/extended-pages.tsx");
    const home = source("components/reference-home.tsx");
    expect(about).toContain("plus de 80 membres");
    expect(about).toContain('href="/tl-studio"');
    expect(home).toContain("organisation scientifique à vocation internationale");
    expect(home).not.toContain("WhatsApp");
    expect(home).not.toContain("Membres GitHub");
    expect(home).toContain("<MembershipForm/>");
    expect(home).not.toContain('window.location.href = "mailto:tlccommunitymanager2@gmail.com');
  });

  it("conserve les voix illustratives explicitement identifiées", () => {
    const voices = source("components/community-voices.tsx");
    expect(voices).toContain("Témoignages fictifs");
    expect((voices.match(/initials: /g) ?? []).length).toBe(3);
  });
});
