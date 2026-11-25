import { describe, expect, it } from "vitest";
import { communityContributions, officialWork } from "../data/official-work";

describe("Travaux officiels et contributions du portail", () => {
  it("affiche les trois dépôts officiels avec leurs URL GitHub", () => {
    expect(officialWork.map(item => item.id)).toEqual(["tllib", "tllib-specs", "TLC"]);
    expect(officialWork.map(item => item.href)).toEqual([
      "https://github.com/Tradition-Learning-Community/tllib",
      "https://github.com/Tradition-Learning-Community/tllib-specs",
      "https://github.com/Tradition-Learning-Community/TLC",
    ]);
    for (const item of officialWork) {
      expect(item.description.length).toBeGreaterThan(40);
      expect(item.status.length).toBeGreaterThan(4);
    }
  });

  it("précise que tllib V1 est encore en développement", () => {
    expect(officialWork.find(item => item.id === "tllib")?.status).toBe("V1 en développement");
    expect(officialWork.find(item => item.id === "tllib-specs")?.highlights).toContain("694 TLC-FC");
  });

  it("relie les réalisations des contributeurs à des PR publiques précises", () => {
    expect(communityContributions).toHaveLength(3);
    for (const item of communityContributions) {
      expect(item.handle.length).toBeGreaterThan(4);
      expect(item.description.length).toBeGreaterThan(30);
      expect(item.href).toMatch(/^https:\/\/github\.com\/Tradition-Learning-Community\/TLC\/pull\/\d+$/);
    }
    expect(new Set(communityContributions.map(item => item.href)).size).toBe(3);
  });
});
