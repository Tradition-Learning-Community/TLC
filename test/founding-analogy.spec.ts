import { describe, expect, it } from "vitest";
import { analogyMotifs, historicalPaths } from "../components/science/founding-analogy-data";

describe("Fondation historique — représentation éditoriale", () => {
  it("présente les trois exemples historiques attendus", () => {
    expect(historicalPaths.map(path => path.title)).toEqual(["Bouddha", "Socrate", "Jésus"]);
    expect(historicalPaths.map(path => path.id)).toEqual(["buddha", "socrates", "jesus"]);
  });

  it("préserve le parcours particulier de chaque exemple, sans rôles TL supplémentaires", () => {
    expect(historicalPaths.find(path => path.id === "socrates")?.nodes.map(node => node.label))
      .toEqual(["Socrate", "Platon", "Aristote", "Alexandre le Grand"]);
    expect(historicalPaths.find(path => path.id === "jesus")?.nodes[1].label).toBe("Apôtres et disciples");
    for (const path of historicalPaths) {
      expect(path.nodes.length).toBeGreaterThanOrEqual(4);
      expect(path.nodes[0].role).toBe("source");
      expect(path.nodes.every(node => Boolean(node.label.trim() && node.description.trim()))).toBe(true);
      expect(new Set(path.nodes.map(node => node.id)).size).toBe(path.nodes.length);
      expect(path.summary.trim().length).toBeGreaterThan(20);
      expect(path.nodes.every(node => ["source", "relay", "community", "continuity"].includes(node.role))).toBe(true);
    }
  });

  it("conserve quatre repères historiques sans les assimiler aux huit objets de TL", () => {
    expect(analogyMotifs.map(item => item.label)).toEqual(["Initiative", "Transmission", "Communautés", "Évolution"]);
  });
});
