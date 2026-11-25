import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { officialWork } from "../data/official-work";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Travaux scientifiques publics de TLC", () => {
  it("présente Tradition Learning et tllib, pas le développement du portail", () => {
    expect(officialWork.map(item => item.id)).toEqual(["tradition-learning", "tllib"]);
    expect(officialWork.map(item => item.href)).toEqual(["/resources/tradition-learning", "/resources/tllib"]);
    expect(officialWork.some(item => item.name === "Portail TLC")).toBe(false);
    for (const item of officialWork) {
      expect(item.description.length).toBeGreaterThan(65);
      expect(item.status.length).toBeGreaterThan(5);
      expect(item.linkLabel.length).toBeGreaterThan(10);
    }
  });

  it("décrit la recherche et la bibliothèque sans chiffres de contrats en accueil", () => {
    expect(officialWork.find(item => item.id === "tllib")?.status).toBe("En développement");
    expect(officialWork.find(item => item.id === "tradition-learning")?.description).toContain("mathématiques");
    const home = source("components/reference-home.tsx");
    expect(home).not.toContain("694 TLC-FC");
    expect(home).not.toContain("Domaines spécifiés");
    expect(home).not.toContain("Fiches de fonctionnalité");
    expect(home).not.toContain("Membres GitHub");
    expect(home).toContain('"45","Membres du groupe TL Community"');
    expect(home).toContain('"7","Groupes de la communauté WhatsApp"');
  });

  it("affiche des témoignages fictifs de manière transparente", () => {
    const home = source("components/reference-home.tsx");
    const voices = source("components/community-voices.tsx");
    expect(home).toContain("<CommunityVoices />");
    expect(voices).toContain("Témoignages fictifs");
    expect(voices).toContain("PARCOURS ILLUSTRATIFS");
    expect(voices.match(/initials: /g)).toHaveLength(3);
  });
});
