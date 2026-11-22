/* eslint @typescript-eslint/no-require-imports: "off" */
/**
 * Read-only laboratory measurements for three public TLC pages.
 *
 * E2E_BASE_URL=https://the-verified-preview.example
 * E2E_BROWSER_EXECUTABLE=/usr/bin/chromium  (optional)
 * node scripts/measure-public-performance.cjs
 *
 * Requires Playwright (NODE_PATH is supported). No database or credentials are used.
 * This script measures LCP, windowed CLS and observed Event Timing latency. It does
 * not calculate field INP, a 75th percentile of visits, or an actual phone score.
 * No artificial CPU/network throttling is applied. Each pass has a new context,
 * disabled browser cache and blocked service workers. The browser process, remote
 * CDN/server caches and the host network may remain warm between passes.
 *
 * Sources: https://web.dev/articles/lcp ; https://web.dev/articles/cls ;
 * https://web.dev/articles/inp ; https://www.w3.org/TR/event-timing/
 */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { chromium } = require("playwright");

const origin = new URL(process.env.E2E_BASE_URL || "http://127.0.0.1:3000");
assert.ok(["http:", "https:"].includes(origin.protocol), "E2E_BASE_URL must use HTTP(S)");
assert.ok(!origin.username && !origin.password, "E2E_BASE_URL must not contain credentials");
const output = path.resolve("test-results");
fs.mkdirSync(output, { recursive: true });
const routes = ["/home", "/tradition-learning", "/tllib"];
const widths = [390, 1440];
const passes = 3;
const loadSettleMs = 1500;
const finalObservationMs = 1000;
const report = {
  startedAt: new Date().toISOString(), baseURL: origin.origin, status: "running",
  environment: {
    node: process.version, platform: os.platform(), architecture: os.arch(),
    logicalCpuCount: os.cpus().length, cpuModel: os.cpus()[0]?.model || "unknown",
    browser: "Chromium", browserVersion: null, headless: true,
    executable: process.env.E2E_BROWSER_EXECUTABLE ? "explicit E2E_BROWSER_EXECUTABLE" : "Playwright managed executable",
    networkThrottling: "none configured", cpuThrottling: "none configured",
    deviceEmulation: "viewport only; desktop Chromium, DPR 1, no Android or physical-device emulation",
    colorScheme: "light", reducedMotion: "no-preference", browserCache: "disabled through CDP",
    serviceWorkers: "blocked", contextPerPass: "fresh isolated context", browserProcess: "shared across passes",
  },
  methodology: {
    routes, widths, passesPerRouteAndWidth: passes, plannedNavigations: routes.length * widths.length * passes,
    viewportHeights: { 390: 844, 1440: 960 },
    loadWindow: `Wait for load and visible h1, allow fonts up to 3000ms, then observe ${loadSettleMs}ms before the first interaction.`,
    lcp: "Last largest-contentful-paint candidate before the controlled interactions; the observer is flushed and disconnected before scrolling or clicking.",
    cls: "Largest session-window sum of unexpected layout shifts (gap < 1000ms; window < 5000ms), excluding hadRecentInput. Reported through the controlled interaction sequence and the final observation window.",
    interactionLatency: "Maximum duration per non-zero interactionId from PerformanceEventTiming; then maximum observed across the pass. This is not field INP or its page-lifetime percentile algorithm.",
    eventDurationThresholdMs: 16,
    firstInput: "A first-input observer captures the first interaction even below the event threshold; duplicate event/first-input entries are merged.",
    aggregation: "Median of up to three individual pass measurements, with all values and missing-sample counts retained. Each interaction sample is the maximum observed within that pass.",
    finalObservationMs,
    readonly: "Only GET, HEAD and OPTIONS network requests are allowed. All other methods are aborted before sending. Interactions only change local UI state; no form is submitted.",
    thresholdPolicy: "Targets are reported, not presented as a field Core Web Vitals certification. Exceeding a target is visible in the report; process exit 1 is reserved for failed or incomplete measurement cycles.",
    sources: ["https://web.dev/articles/lcp", "https://web.dev/articles/cls", "https://web.dev/articles/inp", "https://www.w3.org/TR/event-timing/"],
  },
  targets: {
    lcpMs: { maximum: 2500, interpretation: "Target for observed laboratory LCP" },
    cls: { maximum: 0.1, interpretation: "Target for CLS within the observed laboratory window" },
    maxObservedInteractionLatencyMs: { maximum: 200, interpretation: "Laboratory responsiveness target for the tested interactions; not a measured field INP" },
  },
  limitations: [
    "No field INP, real-user distribution or 75th-percentile Core Web Vitals conclusion is produced.",
    "Only three public pages, two viewport widths and three short visits per combination are measured.",
    "The 390px viewport does not reproduce Android CPU, GPU, touch input or mobile network conditions.",
    "There is no CPU or network throttling. Host contention, server latency and external resource availability affect the observations.",
    "A fresh browser context and disabled browser cache do not clear CDN, server, DNS or browser-process connection caches.",
    "LCP and CLS cover a finite observation window. Later content, prolonged reading, future actions and iframe-only shifts may not be represented.",
    "Event Timing uses a minimum 16ms event threshold and duration quantization, commonly 8ms. Unreported fast interactions are not assumed to have zero latency.",
    "The first-input entry improves coverage of the first fast interaction; subsequent fast inputs can still be absent from the observer data.",
    "Browser network routing blocks non-read methods and service workers. Any blocked request is listed because this can change page behavior.",
    "The server build mode cannot be established from the URL alone; run against a production build for release comparisons.",
  ],
  samples: [], medians: [], errors: [],
};

function rounded(value, digits = 2) {
  return typeof value === "number" && Number.isFinite(value) ? Number(value.toFixed(digits)) : null;
}
function safeUrl(value) {
  try { const url = new URL(value); return `${url.origin}${url.pathname}`; } catch { return "unavailable"; }
}
function metric(values, target, digits = 2) {
  const observed = values.filter(value => typeof value === "number" && Number.isFinite(value)).sort((a, b) => a - b);
  const median = !observed.length ? null : observed.length % 2 ? observed[(observed.length - 1) / 2] : (observed[observed.length / 2 - 1] + observed[observed.length / 2]) / 2;
  return { values: values.map(value => rounded(value, digits)), measuredSamples: observed.length, expectedSamples: passes, median: rounded(median, digits), minimum: observed.length ? rounded(observed[0], digits) : null, maximum: observed.length ? rounded(observed[observed.length - 1], digits) : null, targetMaximum: target, medianWithinTarget: median === null ? null : median <= target };
}

/** Runs in the document before application scripts, without adding event handlers. */
function installObservers() {
  const supported = PerformanceObserver.supportedEntryTypes || [];
  const observations = { supported: [...supported], lcp: null, cls: 0, unexpectedShiftCount: 0, shifts: [], eventEntries: [], observerErrors: [], lcpFrozenAtMs: null };
  let windowStart = 0;
  let windowLast = 0;
  let windowScore = 0;
  const eventKeys = new Map();
  const observers = [];
  let lcpObserver;
  const lcpEntries = entries => {
    for (const entry of entries) observations.lcp = { valueMs: entry.startTime, renderTimeMs: entry.renderTime, loadTimeMs: entry.loadTime, size: entry.size, elementTag: entry.element?.tagName || null, elementId: entry.element?.id || null };
  };
  const shiftEntries = entries => {
    for (const entry of entries) {
      if (entry.hadRecentInput) continue;
      if (windowScore > 0 && entry.startTime - windowLast < 1000 && entry.startTime - windowStart < 5000) windowScore += entry.value;
      else { windowStart = entry.startTime; windowScore = entry.value; }
      windowLast = entry.startTime;
      observations.cls = Math.max(observations.cls, windowScore);
      observations.unexpectedShiftCount += 1;
      observations.shifts.push({ startTimeMs: entry.startTime, value: entry.value });
    }
  };
  const eventEntries = entries => {
    for (const entry of entries) {
      if (!entry.interactionId) continue;
      const key = `${entry.interactionId}:${entry.name}:${entry.startTime}`;
      const value = { interactionId: entry.interactionId, name: entry.name, entryType: entry.entryType, startTimeMs: entry.startTime, durationMs: entry.duration, inputDelayMs: Math.max(0, entry.processingStart - entry.startTime), processingMs: Math.max(0, entry.processingEnd - entry.processingStart), presentationDelayMs: Math.max(0, entry.startTime + entry.duration - entry.processingEnd), targetTag: entry.target?.tagName || null };
      if (eventKeys.has(key)) {
        const index = eventKeys.get(key);
        if (entry.entryType === "event") observations.eventEntries[index] = value;
      } else { eventKeys.set(key, observations.eventEntries.length); observations.eventEntries.push(value); }
    }
  };
  function observe(type, consume, extra = {}) {
    if (!supported.includes(type)) return null;
    try {
      const observer = new PerformanceObserver(list => consume(list.getEntries()));
      observer.observe({ type, buffered: true, ...extra });
      observers.push({ observer, consume, type });
      return observer;
    } catch (error) { observations.observerErrors.push({ type, message: error.message }); return null; }
  }
  lcpObserver = observe("largest-contentful-paint", lcpEntries);
  observe("layout-shift", shiftEntries);
  observe("event", eventEntries, { durationThreshold: 16 });
  observe("first-input", eventEntries);
  function flush() {
    for (const { observer, consume } of observers) consume(observer.takeRecords());
  }
  window.__tlcLabPerformance = {
    freezeLcp() {
      if (lcpObserver) { lcpEntries(lcpObserver.takeRecords()); lcpObserver.disconnect(); }
      observations.lcpFrozenAtMs = performance.now();
    },
    snapshot() {
      flush();
      const interactions = new Map();
      for (const entry of observations.eventEntries) {
        const current = interactions.get(entry.interactionId) || { interactionId: entry.interactionId, durationMs: 0, eventCount: 0, startTimeMs: entry.startTimeMs };
        current.durationMs = Math.max(current.durationMs, entry.durationMs);
        current.eventCount += 1;
        current.startTimeMs = Math.min(current.startTimeMs, entry.startTimeMs);
        interactions.set(entry.interactionId, current);
      }
      const grouped = [...interactions.values()];
      const navigation = performance.getEntriesByType("navigation")[0];
      const paints = performance.getEntriesByType("paint");
      return { ...observations, durationMs: performance.now(), interactionCountReportedByBrowser: typeof performance.interactionCount === "number" ? performance.interactionCount : null, interactions: grouped, maxObservedInteractionLatencyMs: grouped.length ? Math.max(...grouped.map(entry => entry.durationMs)) : null,
        navigation: navigation ? { ttfbMs: navigation.responseStart, domContentLoadedMs: navigation.domContentLoadedEventEnd, loadEventEndMs: navigation.loadEventEnd, transferSize: navigation.transferSize, type: navigation.type } : null,
        firstContentfulPaintMs: paints.find(entry => entry.name === "first-contentful-paint")?.startTime ?? null,
        browser: { userAgent: navigator.userAgent, hardwareConcurrency: navigator.hardwareConcurrency, devicePixelRatio: devicePixelRatio, viewport: { width: innerWidth, height: innerHeight }, fontsStatus: document.fonts?.status || "unavailable" },
      };
    },
  };
}

async function afterPaint(page) {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  // Give the browser an opportunity to deliver queued Event Timing records.
  await page.waitForTimeout(80);
}

async function interact(page, sample, label, action, verify) {
  const startTimeMs = await page.evaluate(() => performance.now());
  await action();
  if (verify) await verify();
  await afterPaint(page);
  const endTimeMs = await page.evaluate(() => performance.now());
  sample.actions.push({ label, startTimeMs: rounded(startTimeMs), endTimeMs: rounded(endTimeMs), verified: true });
}
async function select(page, sample, section, label) {
  const button = page.locator(section).getByRole("button", { name: new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|\\s)`) }).first();
  await button.scrollIntoViewIfNeeded();
  await interact(page, sample, label, () => button.click(), async () => {
    await page.waitForFunction(node => node.getAttribute("aria-pressed") === "true", await button.elementHandle());
  });
}
async function exercisePage(page, route, sample) {
  if (route === "/home") {
    const theme = page.getByRole("button", { name: "Changer de thème", exact: true });
    const needsMenu = !await theme.isVisible();
    if (needsMenu) await interact(page, sample, "Ouvrir le menu mobile", () => page.getByRole("button", { name: "Ouvrir le menu", exact: true }).click(), () => page.getByRole("button", { name: "Fermer le menu", exact: true }).waitFor());
    await interact(page, sample, "Activer le thème sombre", () => theme.click(), () => page.waitForFunction(() => document.documentElement.classList.contains("dark")));
    await interact(page, sample, "Rétablir le thème clair", () => theme.click(), () => page.waitForFunction(() => !document.documentElement.classList.contains("dark")));
    if (needsMenu) await interact(page, sample, "Fermer le menu par Échap", () => page.keyboard.press("Escape"), () => page.getByRole("button", { name: "Ouvrir le menu", exact: true }).waitFor());
  } else if (route === "/tradition-learning") {
    await select(page, sample, "#entites", "Disciple");
    await select(page, sample, "#objets", "Capacités");
    await select(page, sample, "#objets", "Relations documentées");
    const relationship = page.locator("#objets").getByRole("button", { name: "Explorer Compétences", exact: true });
    await interact(page, sample, "Explorer la Compétence liée", () => relationship.click(), () => page.waitForFunction(() => document.querySelector("#objets .diagram-detail h3")?.textContent === "Compétences"));
    await select(page, sample, "#filiations", "Générations");
    await select(page, sample, "#filiations", "Branches");
  } else if (route === "/tllib") {
    await select(page, sample, "#constitution", "Ressources");
    await select(page, sample, "#constitution", "Apprentissage constaté");
    await select(page, sample, "#architecture", "API Python");
    await select(page, sample, "#architecture", "Runtime et registry");
  }
}

async function measure(browser, route, width, pass) {
  const sample = { route, width, pass, startedAt: new Date().toISOString(), status: "running", actions: [], blockedMutations: [], failedRequests: [], pageErrors: [] };
  report.samples.push(sample);
  const context = await browser.newContext({ baseURL: origin.origin, viewport: { width, height: width === 390 ? 844 : 960 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false, colorScheme: "light", reducedMotion: "no-preference", serviceWorkers: "block" });
  context.setDefaultTimeout(15000);
  context.setDefaultNavigationTimeout(45000);
  let page;
  try {
    await context.route("**/*", async requestRoute => {
      const request = requestRoute.request();
      if (["GET", "HEAD", "OPTIONS"].includes(request.method())) await requestRoute.continue();
      else {
        sample.blockedMutations.push({ method: request.method(), url: safeUrl(request.url()), resourceType: request.resourceType() });
        await requestRoute.abort("blockedbyclient");
      }
    });
    await context.addInitScript(installObservers);
    page = await context.newPage();
    page.on("pageerror", error => sample.pageErrors.push(error.message));
    page.on("requestfailed", request => {
      if (sample.failedRequests.length < 30) sample.failedRequests.push({ method: request.method(), url: safeUrl(request.url()), type: request.resourceType(), failure: request.failure()?.errorText || "unknown" });
    });
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    const response = await page.goto(route, { waitUntil: "load" });
    sample.httpStatus = response?.status() ?? null;
    sample.finalUrl = safeUrl(page.url());
    assert.ok(response && response.ok(), `${route} must load successfully before performance measurements`);
    await page.locator("main h1").waitFor({ state: "visible" });
    await page.evaluate(() => Promise.race([document.fonts?.ready || Promise.resolve(), new Promise(resolve => setTimeout(resolve, 3000))]));
    await page.waitForTimeout(loadSettleMs);
    await page.evaluate(() => window.__tlcLabPerformance.freezeLcp());
    sample.beforeInteractions = await page.evaluate(() => window.__tlcLabPerformance.snapshot());
    await exercisePage(page, route, sample);
    await page.waitForTimeout(finalObservationMs);
    const observed = await page.evaluate(() => window.__tlcLabPerformance.snapshot());
    sample.observations = observed;
    sample.lcpMs = rounded(observed.lcp?.valueMs ?? null);
    sample.cls = observed.supported.includes("layout-shift") ? rounded(observed.cls, 5) : null;
    sample.maxObservedInteractionLatencyMs = rounded(observed.maxObservedInteractionLatencyMs);
    sample.actionsVerified = sample.actions.length;
    sample.interactionsObserved = observed.interactions.length;
    sample.eventTimingEntriesObserved = observed.eventEntries.length;
    sample.targets = {
      lcpWithinTarget: sample.lcpMs === null ? null : sample.lcpMs <= report.targets.lcpMs.maximum,
      clsWithinTarget: sample.cls === null ? null : sample.cls <= report.targets.cls.maximum,
      observedLatencyWithinTarget: sample.maxObservedInteractionLatencyMs === null ? null : sample.maxObservedInteractionLatencyMs <= report.targets.maxObservedInteractionLatencyMs.maximum,
    };
    sample.missingMeasurements = [sample.lcpMs === null ? "LCP" : null, sample.cls === null ? "CLS" : null, sample.maxObservedInteractionLatencyMs === null ? "Event Timing interaction latency" : null].filter(Boolean);
    sample.status = sample.missingMeasurements.length ? "incomplete" : sample.pageErrors.length || observed.observerErrors.length ? "failed" : "measured";
    console.log(JSON.stringify({ route, width, pass, status: sample.status, lcpMs: sample.lcpMs, cls: sample.cls, maxObservedInteractionLatencyMs: sample.maxObservedInteractionLatencyMs, interactionsObserved: sample.interactionsObserved, actionsPerformed: sample.actions.length }));
  } catch (error) {
    sample.status = "failed";
    sample.error = error.message;
    if (page && !page.isClosed()) sample.partialObservations = await page.evaluate(() => window.__tlcLabPerformance?.snapshot() || null).catch(() => null);
    console.error(`Measurement failed: ${route} ${width}px pass ${pass}: ${error.message}`);
  } finally {
    sample.finishedAt = new Date().toISOString();
    sample.durationMs = new Date(sample.finishedAt).getTime() - new Date(sample.startedAt).getTime();
    await context.close();
  }
}

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"], ...(process.env.E2E_BROWSER_EXECUTABLE ? { executablePath: process.env.E2E_BROWSER_EXECUTABLE } : {}) });
    report.environment.browserVersion = browser.version();
    // Interleave pages across passes so one route does not receive all early/cold runs.
    for (let pass = 1; pass <= passes; pass += 1) {
      for (const width of widths) for (const route of routes) await measure(browser, route, width, pass);
    }
  } catch (error) {
    report.errors.push(error.message);
    console.error(`Performance recipe setup failed: ${error.message}`);
  } finally {
    if (browser) await browser.close().catch(() => {});
    for (const width of widths) for (const route of routes) {
      const samples = report.samples.filter(sample => sample.width === width && sample.route === route);
      const values = key => Array.from({ length: passes }, (_, index) => {
        const sample = samples.find(item => item.pass === index + 1);
        return sample && sample.status !== "failed" ? sample[key] ?? null : null;
      });
      const result = { route, width, plannedPasses: passes, completedPasses: samples.filter(sample => sample.status === "measured").length,
        lcpMs: metric(values("lcpMs"), report.targets.lcpMs.maximum),
        cls: metric(values("cls"), report.targets.cls.maximum, 5),
        maxObservedInteractionLatencyMs: metric(values("maxObservedInteractionLatencyMs"), report.targets.maxObservedInteractionLatencyMs.maximum),
      };
      const all = [result.lcpMs, result.cls, result.maxObservedInteractionLatencyMs];
      result.observedMedianExceedsTarget = all.some(item => item.medianWithinTarget === false);
      result.targetAssessment = result.completedPasses !== passes || all.some(item => item.measuredSamples !== passes) ? "incomplete measurement" : result.observedMedianExceedsTarget ? "target exceeded" : "medians within laboratory targets";
      report.medians.push(result);
    }
    report.finishedAt = new Date().toISOString();
    report.durationMs = new Date(report.finishedAt).getTime() - new Date(report.startedAt).getTime();
    report.completedNavigations = report.samples.filter(sample => sample.status === "measured").length;
    report.failedNavigations = report.samples.filter(sample => sample.status === "failed").length;
    report.incompleteNavigations = report.samples.filter(sample => sample.status === "incomplete").length;
    report.actionsPerformed = report.samples.reduce((count, sample) => count + sample.actions.length, 0);
    report.interactionsObserved = report.samples.reduce((count, sample) => count + (sample.interactionsObserved || 0), 0);
    report.blockedMutativeRequests = report.samples.reduce((count, sample) => count + sample.blockedMutations.length, 0);
    report.targetExceedingGroups = report.medians.filter(group => group.targetAssessment === "target exceeded").length;
    report.status = report.errors.length || report.failedNavigations ? "failed" : report.completedNavigations !== report.methodology.plannedNavigations ? "incomplete" : "measured";
    fs.writeFileSync(path.join(output, "performance-summary.json"), `${JSON.stringify(report, null, 2)}\n`);
    console.log(JSON.stringify({ status: report.status, completedNavigations: report.completedNavigations, plannedNavigations: report.methodology.plannedNavigations, actionsPerformed: report.actionsPerformed, targetExceedingGroups: report.targetExceedingGroups, fieldINP: "not measured", report: "test-results/performance-summary.json" }));
    if (report.status !== "measured") process.exitCode = 1;
  }
})();
