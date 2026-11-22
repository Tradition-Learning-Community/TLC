/* eslint @typescript-eslint/no-require-imports: "off" */
/**
 * Public scientific/frontend recipe. Never submits a real contact request.
 *
 * E2E_BASE_URL=http://127.0.0.1:3000
 * E2E_BROWSER_EXECUTABLE=/usr/bin/chromium   (optional; Playwright default otherwise)
 * E2E_SEED_PUBLIC=true                     (optional; isolated local PostgreSQL only)
 * DATABASE_URL=postgresql://...@127.0.0.1:5432/tlc
 * NODE_PATH may point to the environment's installed Playwright module.
 *
 * Writes test-results/scientific-summary.json, nine page and three focused screenshots.
 * Fixtures are inserted after screenshots and removed by their exact run-specific IDs.
 */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { randomBytes } = require("node:crypto");
const { chromium } = require("playwright");

const origin = new URL(process.env.E2E_BASE_URL || "http://127.0.0.1:3000");
assert.ok(["http:", "https:"].includes(origin.protocol), "E2E_BASE_URL must be an HTTP(S) URL");
assert.ok(!origin.username && !origin.password, "E2E_BASE_URL must not contain credentials");
const output = path.resolve("test-results");
fs.mkdirSync(output, { recursive: true });
const runId = `${Date.now().toString(36)}-${randomBytes(3).toString("hex")}`;
const routes = ["/home", "/tradition-learning", "/tllib", "/tlc", "/recherche", "/resources", "/actualites", "/participer"];
const widths = [360, 390, 430, 768, 1024, 1440];
const summary = {
  startedAt: new Date().toISOString(), baseURL: origin.origin, status: "running",
  checks: [], layouts: [], screenshots: [], skipped: [], browserErrors: [], consoleErrors: [],
  fixtures: { requested: process.env.E2E_SEED_PUBLIC === "true", inserted: 0, removed: 0 },
};
let browser;
let context;
let page;
let fixtures;
let capturedFailure = false;

function recordErrors(target) {
  target.on("pageerror", error => summary.browserErrors.push({ route: new URL(target.url()).pathname, message: error.message }));
  target.on("console", message => {
    if (message.type() === "error" && /hydration|hydrating|minified react error|uncaught/i.test(message.text())) {
      summary.consoleErrors.push({ route: new URL(target.url()).pathname, message: message.text().slice(0, 1200) });
    }
  });
}

async function check(name, operation) {
  const started = Date.now();
  try {
    await operation();
    summary.checks.push({ name, status: "passed", durationMs: Date.now() - started });
    console.log(`PASS ${name}`);
  } catch (error) {
    summary.checks.push({ name, status: "failed", durationMs: Date.now() - started, error: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
    if (page && !page.isClosed() && !capturedFailure) {
      capturedFailure = true;
      const filename = "scientific-first-failure.png";
      await page.screenshot({ path: path.join(output, filename), fullPage: true }).then(() => summary.screenshots.push(filename)).catch(() => {});
    }
  }
}

async function visit(route, target = page) {
  const response = await target.goto(route, { waitUntil: "domcontentloaded" });
  assert.ok(response && response.ok(), `${route} responds successfully (received ${response?.status()})`);
  await target.locator("main h1").waitFor({ state: "visible" });
  await target.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function active(button, key) {
  await button.scrollIntoViewIfNeeded();
  if (key) {
    await button.focus();
    await button.press(key);
  } else await button.click();
  const element = await button.elementHandle();
  assert.ok(element, "selection control remains mounted");
  await page.waitForFunction(node => node.getAttribute("aria-pressed") === "true", element);
  if (key) assert.equal(await button.evaluate(node => document.activeElement === node), true, "keyboard focus remains on the selected control");
}

async function controlledPanel(button) {
  const id = await button.getAttribute("aria-controls");
  assert.ok(id, "control identifies its detail panel");
  const panel = page.locator(`[id=${JSON.stringify(id)}]`);
  assert.equal(await panel.count(), 1, "controlled panel ID is unique");
  await panel.waitFor({ state: "visible" });
  assert.equal(await panel.getAttribute("aria-live"), "polite", "detail updates are announced without interrupting navigation");
  return panel;
}

async function sources(section) {
  const details = section.locator(".diagram-references");
  assert.equal(await details.count(), 1, "diagram includes its reference list");
  const toggle = details.locator("summary");
  await toggle.focus();
  await toggle.press("Enter");
  await page.waitForFunction(node => node.open, await details.elementHandle());
  assert.ok(await details.locator("li").count() > 0, "reference list is non-empty");
  const links = await details.locator("a").evaluateAll(nodes => nodes.map(node => ({ href: node.getAttribute("href"), text: node.textContent.trim(), rel: node.getAttribute("rel") })));
  assert.ok(links.length > 0, "at least one reference is accessible online");
  for (const link of links) {
    const url = new URL(link.href);
    assert.equal(url.protocol, "https:");
    assert.equal(url.hostname, "github.com");
    assert.ok(url.pathname.startsWith("/Tradition-Learning-Community/"), "source belongs to the documented project");
    assert.ok(link.text.length > 12, "reference has a useful accessible name");
    assert.ok(link.rel.includes("noopener"));
  }
  await toggle.press("Enter");
}

async function checkSelection(section, selector, labels, headingPrefix = "") {
  const controls = section.locator(selector);
  assert.equal(await controls.count(), labels.length, "expected number of selectable scientific items");
  assert.deepEqual(await controls.locator("strong").allTextContents(), labels, "scientific labels match the agreed concepts");
  for (let index = 0; index < labels.length; index += 1) {
    const button = controls.nth(index);
    await active(button, index % 2 === 0 ? "Enter" : "Space");
    assert.equal(await controls.evaluateAll(nodes => nodes.filter(node => node.getAttribute("aria-pressed") === "true").length), 1, "one item is selected in this group");
    const panel = await controlledPanel(button);
    const heading = (await panel.locator("h3").innerText()).toLocaleLowerCase("fr");
    const expected = `${headingPrefix}${labels[index]}`.toLocaleLowerCase("fr");
    assert.equal(heading, expected, "detail heading follows selection");
    assert.ok((await panel.innerText()).length > labels[index].length + 70, "selection exposes substantive content");
  }
}

async function layout(route, width) {
  await page.setViewportSize({ width, height: width < 700 ? 844 : 960 });
  await visit(route);
  assert.equal(await page.locator("h1").count(), 1, `${route} has one primary heading`);
  const dimensions = await page.evaluate(() => {
    const viewport = window.innerWidth;
    const scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    const offenders = scrollWidth > viewport + 1 ? Array.from(document.body.querySelectorAll("*"))
      .filter(node => node.namespaceURI === "http://www.w3.org/1999/xhtml")
      .filter(node => { const box = node.getBoundingClientRect(); const style = getComputedStyle(node); return box.width > 0 && box.height > 0 && style.visibility !== "hidden" && (box.right > viewport + 2 || box.left < -2); })
      .slice(0, 8).map(node => ({ tag: node.tagName, className: node.className, width: Math.round(node.getBoundingClientRect().width), right: Math.round(node.getBoundingClientRect().right) })) : [];
    return { viewport, scrollWidth, offenders };
  });
  summary.layouts.push({ route, width, ...dimensions });
  assert.ok(dimensions.scrollWidth <= dimensions.viewport + 1, `${route} at ${width}px has no horizontal page overflow: ${JSON.stringify(dimensions)}`);
}

async function setTheme(theme) {
  const dark = await page.locator("html").evaluate(node => node.classList.contains("dark"));
  if (dark === (theme === "dark")) return;
  const switcher = page.getByRole("button", { name: "Changer de thème", exact: true });
  let openedMenu = false;
  if (!await switcher.isVisible()) {
    await page.getByRole("button", { name: "Ouvrir le menu", exact: true }).click();
    openedMenu = true;
  }
  await switcher.click();
  await page.waitForFunction(wanted => document.documentElement.classList.contains("dark") === wanted, theme === "dark");
  if (openedMenu) await page.keyboard.press("Escape");
}

function guardedDatabaseUrl() {
  assert.ok(["localhost", "127.0.0.1"].includes(origin.hostname), "Seed fixtures require a local E2E_BASE_URL; production is forbidden");
  assert.ok(process.env.DATABASE_URL, "DATABASE_URL is required with E2E_SEED_PUBLIC=true");
  const database = new URL(process.env.DATABASE_URL);
  assert.ok(["postgres:", "postgresql:"].includes(database.protocol), "Fixture database must use PostgreSQL");
  assert.ok(["localhost", "127.0.0.1"].includes(database.hostname), "Fixture database host must be localhost or 127.0.0.1; remote databases are forbidden");
  assert.equal(database.pathname, "/tlc", "Fixture database name must be exactly tlc");
  assert.equal(database.search, "", "Fixture DATABASE_URL must have no query parameters or connection overrides");
  assert.equal(database.hash, "", "Fixture DATABASE_URL must have no fragment");
  return database.href;
}

async function seedPublicFixtures() {
  const databaseUrl = guardedDatabaseUrl();
  const sql = require("postgres")(databaseUrl, { max: 1, connect_timeout: 5, idle_timeout: 5, ssl: false });
  const id = suffix => `e2e-public-${runId}-${suffix}`;
  const now = new Date().toISOString();
  const resource = { id: id("resource"), title: `${runId} Guide d’évaluation`, category: `Méthodes ${runId}`, description: "Protocole de test de recherche par mots-clés et accents.", url: "https://example.org/e2e-evaluation", published: true, internalEditorialNote: `INTERNAL-RESOURCE-FIELD-${runId}` };
  const secondResource = { id: id("resource-software"), title: `${runId} Architecture du logiciel`, category: `Logiciel ${runId}`, description: "Ressource publique de recette locale.", url: "https://example.org/e2e-architecture", published: true };
  const hiddenResource = { ...resource, id: id("resource-hidden"), title: `PRIVATE-RESOURCE-${runId}`, published: false };
  const article = { id: id("article"), slug: id("article"), title: `Publication publique de recette ${runId}`, summary: "Article de test réservé à la base locale jetable de recette.", body: `Premier paragraphe de recette ${runId}.\n\nDeuxième paragraphe public vérifiable.`, category: "Recette locale", author: "Équipe de test TLC", coverImage: "", status: "published", featured: true, createdAt: now, updatedAt: now, publishedAt: now, version: 1 };
  const draft = { ...article, id: id("draft"), slug: id("draft"), title: `PRIVATE-ARTICLE-${runId}`, status: "draft", publishedAt: null, featured: false };
  const project = { id: id("project"), title: `Projet public de recette ${runId}`, description: "Fiche publique de test, sans résultat scientifique annoncé.", published: true, status: "Recette locale", url: "https://example.org/e2e-project" };
  const hiddenProject = { ...project, id: id("project-hidden"), title: `PRIVATE-PROJECT-${runId}`, published: false };
  const experiment = { id: id("experiment"), title: `Étude publique de recette ${runId}`, notes: "Protocole local de vérification du portail ; aucune mesure scientifique.", published: true, status: "Recette locale", resultUrl: "https://example.org/e2e-study" };
  const hiddenExperiment = { ...experiment, id: id("experiment-hidden"), title: `PRIVATE-EXPERIMENT-${runId}`, published: false };
  const rows = [
    ["resources", resource], ["resources", secondResource], ["resources", hiddenResource],
    ["articles", article], ["articles", draft],
    ["projects", project], ["projects", hiddenProject],
    ["experiments", experiment], ["experiments", hiddenExperiment],
  ];
  try {
    const [database] = await sql`SELECT current_database() AS name, to_regclass('public.records') AS records`;
    assert.equal(database.name, "tlc", "Connected database is the isolated tlc database");
    assert.ok(database.records, "Create the existing TLC test schema before running this recipe");
    await sql.begin(async transaction => {
      for (const [collection, record] of rows) {
        await transaction`INSERT INTO records(collection, id, data) VALUES (${collection}, ${record.id}, ${transaction.json(record)})`;
      }
    });
    summary.fixtures.inserted = rows.length;
    return { sql, rows, resource, secondResource, hiddenResource, article, draft, project, hiddenProject, experiment, hiddenExperiment };
  } catch (error) {
    await sql.end();
    throw error;
  }
}

async function cleanupFixtures() {
  if (!fixtures) return;
  try {
    const removedCount = await fixtures.sql.begin(async transaction => {
      let count = 0;
      for (const [collection, record] of fixtures.rows) {
        const removed = await transaction`DELETE FROM records WHERE collection = ${collection} AND id = ${record.id} RETURNING id`;
        count += removed.length;
      }
      return count;
    });
    summary.fixtures.removed = removedCount;
    assert.equal(summary.fixtures.removed, summary.fixtures.inserted, "All and only this execution’s public fixtures are removed");
  } finally { await fixtures.sql.end(); }
}

(async () => {
  try {
    // Validate the seed target before even launching the browser or connecting.
    if (summary.fixtures.requested) guardedDatabaseUrl();
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"], ...(process.env.E2E_BROWSER_EXECUTABLE ? { executablePath: process.env.E2E_BROWSER_EXECUTABLE } : {}) });
    context = await browser.newContext({ baseURL: origin.origin, viewport: { width: 1440, height: 960 }, reducedMotion: "reduce", colorScheme: "light" });
    context.setDefaultTimeout(15000);
    context.setDefaultNavigationTimeout(45000);
    page = await context.newPage();
    recordErrors(page);

    for (const width of widths) for (const route of routes) await check(`layout ${route} ${width}px`, () => layout(route, width));

    await page.setViewportSize({ width: 1440, height: 960 });
    await check("VIS-01 entities: keyboard, selection, details and references", async () => {
      await visit("/tradition-learning");
      const section = page.locator("#entites");
      assert.equal(await section.getAttribute("data-diagram-mode"), "scientific");
      await checkSelection(section, ".entity-node", ["Maître", "Disciple", "Communauté"]);
      assert.equal(await section.locator(".entity-relationship").count(), 2, "selected entity exposes its two relations");
      await sources(section);
    });

    await check("VIS-02 exactly eight objects, documented relationships and keyboard navigation", async () => {
      await visit("/tradition-learning");
      const section = page.locator("#objets");
      await checkSelection(section, ".object-node", ["Message", "Principes", "Valeurs", "Vertus", "Capacités", "Compétences", "Pratique", "Expérience vécue"]);
      await active(section.getByRole("button", { name: "Relations documentées", exact: true }), "Enter");
      await active(section.locator(".object-node").filter({ has: page.getByText("Capacités", { exact: true }) }).first(), "Space");
      const relation = section.getByRole("button", { name: "Explorer Compétences", exact: true });
      await relation.waitFor({ state: "visible" });
      assert.ok(await section.locator(".object-relations a.diagram-source").count() > 0, "displayed relationships cite a source");
      await relation.focus();
      await relation.press("Enter");
      await page.waitForFunction(() => document.querySelector("#objets .diagram-detail h3")?.textContent === "Compétences");
      assert.equal(await section.locator(".object-node.is-active").evaluate(node => node === document.activeElement), true, "following a relationship moves focus to its selected object");
      await active(section.getByRole("button", { name: "Vue d’ensemble", exact: true }), "Enter");
      assert.equal(await section.locator(".object-relations").count(), 0, "overview restores the definition view");
      await sources(section);
    });

    await check("VIS-03 five lineage views, arrivals, departure and conditional relays", async () => {
      await visit("/tradition-learning");
      const section = page.locator("#filiations");
      assert.equal(await section.getAttribute("data-diagram-mode"), "illustrative");
      assert.ok((await section.innerText()).includes("ni une simulation exécutée par tllib"), "scenario is explicitly illustrative");
      const views = section.getByRole("group", { name: "Vue des cohortes et filiations", exact: true });
      assert.equal(await views.getByRole("button").count(), 5);
      for (const name of ["Cohortes", "Générations", "Branches", "Cascades", "Évolution"]) {
        await active(views.getByRole("button", { name, exact: true }), "Enter");
        assert.ok((await section.locator(".lineage-view-description").innerText()).length > 60);
      }
      const snapshots = section.getByRole("group", { name: "Instantané du scénario", exact: true });
      assert.equal(await snapshots.getByRole("button").count(), 4);
      await active(snapshots.getByRole("button", { name: "Relations initiales", exact: true }), "Space");
      assert.equal(await section.locator(".lineage-node").count(), 3, "initial scene has a Master and two Disciples");
      assert.equal(await section.getByRole("button", { name: /^D3,/ }).count(), 0);
      await active(snapshots.getByRole("button", { name: "Arrivée de D3", exact: true }), "Enter");
      assert.equal(await section.getByRole("button", { name: "D3, Disciple", exact: true }).count(), 1, "arrival is visible");
      await active(snapshots.getByRole("button", { name: "Relais reconnus", exact: true }), "Space");
      const relay = section.getByRole("button", { name: "D1, Disciple et Maître-relais dans ce scénario", exact: true });
      await active(relay, "Enter");
      assert.ok((await (await controlledPanel(relay)).innerText()).includes("suppose les conditions"), "relay role is conditioned, not inferred from graph position");
      await active(snapshots.getByRole("button", { name: "Nouvelle cohorte", exact: true }), "Space");
      assert.equal(await section.getByRole("button", { name: /^D3,/ }).count(), 0, "departed Disciple is removed from current scene");
      const arriving = section.getByRole("button", { name: "D7, Disciple", exact: true });
      await active(arriving, "Enter");
      const detail = await controlledPanel(arriving);
      assert.ok((await detail.innerText()).includes("Maître initial → D1 → D7"), "filiation follows transmission relations");
      assert.ok((await detail.innerText()).includes("Cohorte C"), "new cohort is represented separately from role");
      await active(views.getByRole("button", { name: "Cascades", exact: true }), "Enter");
      assert.equal(await section.locator("path.lineage-edge.is-active").count(), 2, "cascade highlights the selected participant’s lineage");
      const textReading = section.locator(".science-static-reading");
      await textReading.locator("summary").click();
      assert.equal(await textReading.locator("li").count(), 4, "text alternative explains all scenario snapshots");
      await sources(section);
    });

    await check("VIS-04 six constitution responsibilities and four distinct readings", async () => {
      await visit("/tllib");
      const section = page.locator("#constitution");
      await checkSelection(section, ".constitution-node", ["Mission et Problème", "Ressources", "Rôles initiaux", "Capacités", "Conditions scientifiques", "Mise à disposition"]);
      const readings = section.locator(".system-reading-controls");
      assert.equal(await readings.getByRole("button").count(), 4);
      const contents = new Set();
      for (const label of ["Système constitué", "Opération exécutable", "Apprentissage constaté", "Développement d’une Tradition"]) {
        const button = readings.getByRole("button", { name: label, exact: true });
        await active(button, "Enter");
        const panel = await controlledPanel(button);
        contents.add(await panel.innerText());
        assert.equal(await panel.locator("h4").count(), 1);
        assert.ok((await panel.locator(".system-reading-evidence").innerText()).length > 40);
      }
      assert.equal(contents.size, 4, "each reading exposes its own claim and evidence");
      await sources(section);
    });

    await check("VIS-05 both APIs share one engine and every architecture layer opens its documentation", async () => {
      await visit("/tllib");
      const section = page.locator("#architecture");
      assert.equal(await section.getAttribute("data-diagram-mode"), "technical");
      await checkSelection(section, ".architecture-node", ["Spécifications verrouillées", "API C++", "API Python", "Moteur C++20", "Runtime et registry", "Providers", "Interopérabilité", "Conformité"]);
      for (const button of await section.locator(".architecture-node").all()) {
        await active(button);
        const href = await section.locator(".diagram-detail a.diagram-source").getAttribute("href");
        const reference = new URL(href);
        assert.equal(reference.protocol, "https:");
        assert.equal(reference.hostname, "github.com");
        assert.match(reference.pathname, /^\/Tradition-Learning-Community\/tllib\/blob\/(?:main|[a-f0-9]{40})\/docs\//, "architecture documentation points to the exact project and a branch or pinned commit");
      }
      assert.equal(await section.locator(".architecture-core").count(), 1, "one reference engine is represented");
      await sources(section);
    });

    await check("VIS-06 six proposed circles, Core Team and governance reading", async () => {
      await visit("/tlc");
      const section = page.locator("#organisation");
      assert.equal(await section.getAttribute("data-diagram-mode"), "institutional");
      await checkSelection(section, ".organization-circle", ["Scientifique", "Développement", "Qualité", "Communauté", "Finance", "Logistique"], "Cercle ");
      assert.ok((await section.innerText()).includes("Organisation proposée"));
      await active(section.locator(".organization-core"), "Space");
      assert.equal(await section.locator(".diagram-detail h3").innerText(), "Core Team");
      const governance = section.locator(".organization-governance");
      await governance.locator("summary").focus();
      await governance.locator("summary").press("Enter");
      await page.waitForFunction(node => node.open, await governance.elementHandle());
      assert.equal(await governance.locator("dt").count(), 3);
      await sources(section);
    });

    await check("mobile menu Escape restores focus and theme choice persists", async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await visit("/home");
      const menu = page.getByRole("button", { name: "Ouvrir le menu", exact: true });
      await menu.focus();
      await menu.press("Enter");
      const opened = page.getByRole("button", { name: "Fermer le menu", exact: true });
      assert.equal(await opened.getAttribute("aria-expanded"), "true");
      await page.keyboard.press("Escape");
      await page.getByRole("button", { name: "Ouvrir le menu", exact: true }).waitFor({ state: "visible" });
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
      assert.equal(await menu.evaluate(node => document.activeElement === node), true);
      await setTheme("dark");
      await visit("/resources");
      assert.equal(await page.locator("html").evaluate(node => node.classList.contains("dark")), true, "theme survives route navigation");
      await setTheme("light");
    });

    await check("reduced motion preserves visible content and stops long animations", async () => {
      await visit("/home");
      await page.locator("main").evaluate(node => window.scrollTo(0, node.scrollHeight));
      const motion = await page.evaluate(() => ({
        requested: matchMedia("(prefers-reduced-motion: reduce)").matches,
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
        hiddenContent: Array.from(document.querySelectorAll(".reveal-content")).filter(node => getComputedStyle(node).opacity === "0").length,
        activeLongAnimations: document.getAnimations().filter(animation => animation.playState === "running" && (animation.effect?.getComputedTiming().duration === Infinity || Number(animation.effect?.getComputedTiming().duration) > 50)).length,
      }));
      assert.equal(motion.requested, true);
      assert.equal(motion.scrollBehavior, "auto");
      assert.equal(motion.hiddenContent, 0);
      assert.equal(motion.activeLongAnimations, 0);
    });

    await check("readable scientific fallback without JavaScript", async () => {
      const staticContext = await browser.newContext({ baseURL: origin.origin, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
      try {
        const staticPage = await staticContext.newPage();
        const response = await staticPage.goto("/tradition-learning", { waitUntil: "domcontentloaded" });
        assert.ok(response.ok());
        assert.equal(await staticPage.locator("#entites noscript details").count(), 3);
        assert.equal(await staticPage.locator("#objets noscript details").count(), 8);
        const last = staticPage.locator("#objets noscript details").last();
        await last.locator("summary").click();
        await last.locator("p").waitFor({ state: "visible" });
      } finally { await staticContext.close(); }
    });

    await check("representative desktop, mobile and dark screenshots", async () => {
      for (const appearance of [{ name: "desktop-light", width: 1440, theme: "light" }, { name: "mobile-light", width: 390, theme: "light" }, { name: "desktop-dark", width: 1440, theme: "dark" }]) {
        await page.setViewportSize({ width: appearance.width, height: appearance.width < 700 ? 844 : 960 });
        for (const route of ["/home", "/tradition-learning", "/tllib"]) {
          await visit(route);
          await setTheme(appearance.theme);
          await page.evaluate(() => document.fonts.ready);
          if (route === "/home") {
            await page.waitForFunction(() => {
              const heroImage = document.querySelector(".hero-image-frame img");
              return heroImage instanceof HTMLImageElement && heroImage.complete && heroImage.naturalWidth > 0;
            }, undefined, { timeout: 15000 });
          }
          const filename = `scientific-${route.slice(1)}-${appearance.name}.png`;
          await page.screenshot({ path: path.join(output, filename), fullPage: true, animations: "disabled" });
          summary.screenshots.push(filename);
        }
      }
      await setTheme("light");
    });

    await check("focused 360px object relations and evolving lineage screenshots", async () => {
      await page.setViewportSize({ width: 360, height: 844 });
      await visit("/tradition-learning");
      // Keep fixed navigation outside these section-only exports, including
      // elements off-screen in the viewport but inside a tall screenshot clip.
      const sectionScreenshotStyle = ".site-header,.skip-link,.back-top{visibility:hidden!important}";
      const objects = page.locator("#objets");
      await active(objects.getByRole("button", { name: "Relations documentées", exact: true }), "Enter");
      await active(objects.locator(".object-node").filter({ has: page.getByText("Pratique", { exact: true }) }).first(), "Enter");
      const objectCapture = "scientific-objects-pratique-relations-360.png";
      await objects.screenshot({ path: path.join(output, objectCapture), animations: "disabled", style: sectionScreenshotStyle });
      summary.screenshots.push(objectCapture);
      const lineage = page.locator("#filiations");
      await active(lineage.getByRole("group", { name: "Vue des cohortes et filiations", exact: true }).getByRole("button", { name: "Évolution", exact: true }), "Enter");
      const snapshots = lineage.getByRole("group", { name: "Instantané du scénario", exact: true });
      for (const [name, suffix] of [["Relais reconnus", "relays"], ["Nouvelle cohorte", "new-cohort"]]) {
        await active(snapshots.getByRole("button", { name, exact: true }), "Enter");
        const filename = `scientific-lineage-${suffix}-360.png`;
        await lineage.screenshot({ path: path.join(output, filename), animations: "disabled", style: sectionScreenshotStyle });
        summary.screenshots.push(filename);
      }
    });

    if (summary.fixtures.requested) await check("seed isolated local public-content fixtures", async () => { fixtures = await seedPublicFixtures(); });

    await check("resources: search, category filter, empty result and reset", async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await visit("/resources");
      const search = page.getByRole("searchbox", { name: "Rechercher une ressource", exact: true });
      if (fixtures) {
        assert.equal(await page.getByText(fixtures.hiddenResource.title, { exact: true }).count(), 0);
        const htmlResponse = await context.request.get("/resources");
        assert.ok(htmlResponse.ok(), "resource HTML responds successfully");
        const html = await htmlResponse.text();
        const rscResponse = await context.request.get(`/resources?_rsc=${runId}`, { headers: { RSC: "1" } });
        assert.ok(rscResponse.ok(), "resource navigation payload responds successfully");
        assert.match(rscResponse.headers()["content-type"] || "", /text\/x-component/, "navigation check receives a React Server Components payload");
        const rsc = await rscResponse.text();
        for (const [format, response] of [["HTML", html], ["RSC", rsc]]) {
          assert.ok(response.includes(fixtures.resource.id), `public resource is present in ${format}`);
          assert.ok(!response.includes(fixtures.hiddenResource.title), `unpublished resources are absent from ${format}`);
          assert.ok(!response.includes(fixtures.resource.internalEditorialNote), `internal fields on published resources are absent from ${format}`);
        }
        await search.fill(`${runId} evaluation`);
        await page.waitForFunction(() => document.querySelectorAll(".resource-card").length === 1);
        assert.equal(await page.locator(".resource-card h3").innerText(), fixtures.resource.title, "accent-insensitive multiword search matches the expected resource");
        await page.getByRole("button", { name: new RegExp(`^Logiciel ${runId}`) }).click();
        await page.getByRole("heading", { name: "Aucune ressource ne correspond", exact: true }).waitFor();
        await page.getByRole("button", { name: "Réinitialiser les filtres", exact: true }).click();
        assert.equal(await search.inputValue(), "");
        assert.equal(await page.getByRole("button", { name: /^Toutes les catégories/ }).getAttribute("aria-pressed"), "true");
        await search.fill(runId);
        await page.getByRole("button", { name: new RegExp(`^Logiciel ${runId}`) }).click();
        await page.waitForFunction(() => document.querySelectorAll(".resource-card").length === 1);
        assert.equal(await page.locator(".resource-card h3").innerText(), fixtures.secondResource.title, "category combines with text search");
      } else if (await search.count()) {
        await search.fill(`no-match-${runId}`);
        await page.getByRole("heading", { name: "Aucune ressource ne correspond", exact: true }).waitFor();
        await page.getByRole("button", { name: "Réinitialiser les filtres", exact: true }).click();
        assert.equal(await search.inputValue(), "");
        assert.ok(await page.locator(".resource-card").count() > 0);
        summary.skipped.push({ scenario: "Controlled published/private resources and category intersection", reason: summary.fixtures.requested ? "Fixture setup failed; see seed check. Existing catalogue tested without further mutation." : "E2E_SEED_PUBLIC is disabled; existing public catalogue tested without mutation." });
      } else {
        await page.getByText("Aucune ressource publiée pour le moment.", { exact: false }).waitFor();
        summary.skipped.push({ scenario: "Resource search/category interaction", reason: summary.fixtures.requested ? "Fixture setup failed; see seed check. Empty catalogue state checked." : "No public resources and E2E_SEED_PUBLIC is disabled; empty state checked." });
      }
    });

    await check("news publication and article reading exclude drafts", async () => {
      await visit("/actualites");
      if (fixtures) {
        const articleLink = page.getByRole("heading", { name: fixtures.article.title, exact: true }).getByRole("link");
        await articleLink.waitFor();
        assert.equal(await page.getByText(fixtures.draft.title, { exact: true }).count(), 0);
        const response = await context.request.get(`/actualites/${fixtures.draft.slug}`);
        assert.equal(response.status(), 404, "direct draft URL is not public");
        assert.ok(!(await response.text()).includes(fixtures.draft.title), "draft title is not leaked into the response");
        await articleLink.click();
        await page.waitForURL(`**/actualites/${fixtures.article.slug}`);
        assert.equal(await page.locator("h1").innerText(), fixtures.article.title);
        assert.equal(await page.locator(".news-article-body p").count(), 2, "article paragraphs are readable separately");
        assert.ok((await page.locator(".news-article-body").innerText()).includes("Deuxième paragraphe public vérifiable."));
      } else {
        const articles = page.locator(".news-featured, .news-card");
        if (!await articles.count()) await page.getByText("Aucune actualité publiée pour le moment.", { exact: true }).waitFor();
        else {
          await articles.first().locator("h3 a").click();
          await page.locator(".news-article-body").waitFor();
          assert.equal(await page.locator("h1").count(), 1);
        }
        summary.skipped.push({ scenario: "Controlled draft-vs-published article visibility", reason: summary.fixtures.requested ? "Fixture setup failed; see seed check. Existing public or empty news state checked." : "E2E_SEED_PUBLIC is disabled; existing public or empty news state checked." });
      }
    });

    await check("research renders only published project and experiment records", async () => {
      await visit("/recherche");
      if (fixtures) {
        await page.getByRole("heading", { name: fixtures.project.title, exact: true }).waitFor();
        await page.getByRole("heading", { name: fixtures.experiment.title, exact: true }).waitFor();
        const html = await (await context.request.get("/recherche")).text();
        assert.ok(!html.includes(fixtures.hiddenProject.title));
        assert.ok(!html.includes(fixtures.hiddenExperiment.title));
        assert.ok((await page.locator(".research-study").filter({ has: page.getByRole("heading", { name: fixtures.experiment.title, exact: true }) }).innerText()).includes(fixtures.experiment.notes));
      } else {
        assert.ok(await page.locator("#travaux .research-project, #travaux .editorial-empty").count() > 0);
        assert.ok(await page.locator("#experiences .research-study, #experiences .editorial-empty").count() > 0);
        summary.skipped.push({ scenario: "Controlled private research record filtering", reason: summary.fixtures.requested ? "Fixture setup failed; see seed check. Existing research state checked." : "E2E_SEED_PUBLIC is disabled; published or empty research sections checked." });
      }
    });

    await check("participation preserves fields and scopes a locally mocked success to its choice", async () => {
      await visit("/participer");
      const options = page.getByRole("group", { name: "Choisir le type de participation", exact: true });
      assert.equal(await options.getByRole("button").count(), 4);
      let inquiryRequests = 0;
      let allowMockSubmission = false;
      let submittedPayload = null;
      const guardInquiry = async route => {
        if (!["GET", "HEAD", "OPTIONS"].includes(route.request().method())) {
          inquiryRequests += 1;
          if (allowMockSubmission && route.request().method() === "POST" && inquiryRequests === 1) {
            allowMockSubmission = false;
            submittedPayload = route.request().postDataJSON();
            await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ ok: true }) });
          } else await route.abort("blockedbyclient");
        } else await route.continue();
      };
      await page.route("**/api/inquiries", guardInquiry);
      try {
        const fields = [
          ["Nom complet", "Recette publique TLC"],
          ["Adresse e-mail", "e2e-public@example.invalid"],
          ["Profil / organisation (facultatif)", "Équipe de recette locale"],
          ["Votre message", "Ce brouillon de recette doit rester présent après chaque choix. Il ne sera pas envoyé."],
        ];
        for (const [label, value] of fields) await page.getByLabel(label, { exact: true }).fill(value);
        await page.getByRole("checkbox").check();
        for (const title of ["Rejoindre TLC", "Contribuer aux travaux", "Devenir partenaire", "Soutenir TLC"]) {
          await active(options.getByRole("button", { name: new RegExp(`^${title}`) }), "Enter");
          assert.equal(await page.locator(".participation-form h2").innerText(), title);
          for (const [label, value] of fields) assert.equal(await page.getByLabel(label, { exact: true }).inputValue(), value, `${label} survives selection of ${title}`);
          assert.equal(await page.getByRole("checkbox").count(), 1, "consent remains required");
          assert.equal(await page.getByRole("checkbox").getAttribute("required"), "");
          assert.equal(await page.getByRole("checkbox").isChecked(), true, "consent remains checked when changing participation");
          assert.equal(inquiryRequests, 0, "changing participation never submits the inquiry");
        }
        assert.equal(await page.getByRole("button", { name: "Envoyer ma demande", exact: true }).count(), 1);
        allowMockSubmission = true;
        await page.getByRole("button", { name: "Envoyer ma demande", exact: true }).click();
        const notice = page.locator(".participation-form").getByRole("status");
        await notice.waitFor({ state: "visible" });
        assert.equal(inquiryRequests, 1, "only the controlled locally fulfilled request was attempted");
        assert.equal(submittedPayload?.kind, "support", "submission uses the current participation choice");
        assert.equal(await notice.innerText(), "Votre demande a été transmise à TLC. Merci pour votre intérêt.");
        await active(options.getByRole("button", { name: /^Rejoindre TLC/ }), "Enter");
        await page.locator(".participation-form form").waitFor({ state: "visible" });
        assert.equal(await notice.count(), 0, "success for support does not appear on a different participation choice");
        for (const [label, value] of fields) assert.equal(await page.getByLabel(label, { exact: true }).inputValue(), value, `${label} survives switching after the mocked success`);
        assert.equal(await page.getByRole("checkbox").isChecked(), true);
        assert.equal(inquiryRequests, 1, "switching after success does not submit another inquiry");
      } finally { await page.unroute("**/api/inquiries", guardInquiry); }
      summary.skipped.push({ scenario: "Live inquiry submission", reason: "Public recipe does not send messages; existing authenticated E2E covers persistence in the isolated database." });
    });

    await check("public pages have no uncaught JavaScript or hydration errors", async () => {
      assert.deepEqual(summary.browserErrors, []);
      assert.deepEqual(summary.consoleErrors, []);
    });
  } catch (error) {
    summary.checks.push({ name: "recipe setup", status: "failed", error: error.message });
    console.error(`FAIL recipe setup: ${error.message}`);
  } finally {
    if (fixtures) await check("fixture cleanup", cleanupFixtures);
    if (context) await context.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    summary.finishedAt = new Date().toISOString();
    summary.durationMs = new Date(summary.finishedAt).getTime() - new Date(summary.startedAt).getTime();
    summary.passed = summary.checks.filter(item => item.status === "passed").length;
    summary.failed = summary.checks.filter(item => item.status === "failed").length;
    summary.status = summary.failed ? "failed" : "passed";
    fs.writeFileSync(path.join(output, "scientific-summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
    console.log(JSON.stringify({ status: summary.status, passed: summary.passed, failed: summary.failed, layouts: summary.layouts.length, screenshots: summary.screenshots.length, skipped: summary.skipped.length, summary: "test-results/scientific-summary.json" }));
    if (summary.failed) process.exitCode = 1;
  }
})();
