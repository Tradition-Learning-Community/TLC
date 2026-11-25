import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { officialWork } from "../data/official-work";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Trois projets publics de TLC", () => {
  it("distingue recherche, bibliothèque et application envisagée", () => {
    expect(officialWork.map(item => item.id)).toEqual(["tradition-learning", "tllib", "tl-studio"]);
    expect(officialWork.map(item => item.href)).toEqual([
      "/resources/tradition-learning",
      "/resources/tllib",
      "/tl-studio",
    ]);
    expect(officialWork.some(item => item.name === "Portail TLC")).toBe(false);
    expect(officialWork.every(item => item.description.length > 65)).toBe(true);
  });

  it("ne présente pas un projet en conception comme un produit publié", () => {
    expect(officialWork.find(item => item.id === "tradition-learning")?.kind).toBe("Recherche scientifique");
    expect(officialWork.find(item => item.id === "tradition-learning")?.highlights).toContain("Théorie et mathématiques");
    expect(officialWork.find(item => item.id === "tllib")?.status).toBe("V1 en développement");
    expect(officialWork.find(item => item.id === "tl-studio")?.status).toBe("En conception");
    expect(officialWork.find(item => item.id === "tl-studio")?.description).toContain("modèles de langage");
  });

  it("ne confond plus les membres de TLC avec une plateforme", () => {
    const home = source("components/reference-home.tsx");
    expect(home).toContain('"80+","Membres de TLC"');
    expect(home).toContain('"3","Axes de recherche et produits"');
    expect(home).not.toContain("Membres du groupe TL Community");
    expect(home).not.toContain("Domaines spécifiés");
    expect(home).not.toContain("Membres GitHub");
    expect(home).toContain("<CommunityVoices />");
  });
});
