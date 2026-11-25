import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Parcours publics et langage institutionnel", () => {
  it("réserve le sous-menu Nos travaux aux trois projets TLC", () => {
    const header = source("components/header.tsx");
    const match = header.match(/const projectLinks = \[([\s\S]*?)\] as const;/);
    expect(match).not.toBeNull();
    const links = match![1];
    expect(links).toContain('["Tradition Learning", "/resources/tradition-learning"]');
    expect(links).toContain('["tllib", "/resources/tllib"]');
    expect(links).toContain('["TL Studio", "/tl-studio"]');
    expect(links).not.toContain('"/projects"');
    expect(links).not.toContain('"/resources"');
    expect(header).toContain('href="/projects" className="nav-work-heading"');
    expect(header).toContain('href="/resources" onClick={closeMenus}');
  });

  it("n'affiche pas de compteurs administratifs sur la page Projets", () => {
    const directory = source("components/reference-directory.tsx");
    expect(directory).toContain('mode!=="projects"&&<Stats');
    expect(directory).not.toContain("Projets structurants");
    expect(directory).not.toContain("Autres projets enregistrés");
    expect(directory).not.toContain("projets recrutent");
    expect(directory).not.toContain("Weights & Biases");
    expect(directory).toContain("Les projets de nos membres");
    expect(directory).toContain('href="#official-projects"');
  });

  it("ne met pas les références de rédaction dans la page scientifique", () => {
    const scientific = source("components/extended-pages.tsx");
    expect(scientific).not.toContain("Sources et références");
    expect(scientific).not.toContain("Manuscrit Tradition Learning, sections");
    expect(scientific).not.toContain("Manuscrit de Tradition Learning, définitions documentées");
    expect(scientific).not.toContain("Les huit objets sont présentés sans centre");
    expect(scientific).not.toContain("Ce scénario illustratif n’est ni une simulation");
    expect(scientific).toContain("Huit objets fondamentaux");
    expect(scientific).toContain("Comprendre les relations illustrées");
  });
});
