import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Contenus institutionnels publics", () => {
  it("ne publie pas les faux témoignages et annonces historiques d’exemple sur l’accueil", () => {
    const home = source("components/reference-home.tsx");
    expect(home).not.toContain("Ce que disent les membres");
    expect(home).not.toContain("Amina K.");
    expect(home).not.toContain("Hackathon TLC — IA frugale");
    expect(home).toContain('useState<{date:string;time:string;title:string;note:string}[]>([])');
  });

  it("ne présente pas des métriques ou calendriers inventés dans les annuaires", () => {
    const directory = source("components/reference-directory.tsx");
    for (const placeholder of ["940", "320", "96</strong>", "Fondée en", "Abidjan · sur place", "Projet pilote TLC"]) {
      expect(directory).not.toContain(placeholder);
    }
    expect(directory).toContain('useState<string[][]>([])');
    expect(directory).toContain("public-factual-stats");
  });

  it("ne montre plus la note défensive sous l’analogie fondatrice", () => {
    const analogy = source("components/science/FoundingAnalogy.tsx");
    expect(analogy).not.toContain("Source :");
    expect(analogy).not.toContain("preuve expérimentale");
    expect(analogy).toContain("De l’observation historique à la théorie");
  });
});
