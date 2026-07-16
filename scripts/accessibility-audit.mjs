/* global process, setTimeout, clearTimeout, console, document */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { chromium } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const base = "http://127.0.0.1:4173/UE/";

const routes = [
  { path: "", label: "home" },
  { path: "projects", label: "projects" },
  { path: "about", label: "about" },
  { path: "projects/non-existent-project", label: "project-not-found" },
  { path: "definitely-not-a-real-route", label: "404" },
];

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-320", width: 320, height: 568 },
];

let previewProcess = null;
let exitCode = 0;

function startPreview() {
  return new Promise((resolve, reject) => {
    previewProcess = spawn(
      "npm",
      ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4173"],
      { cwd: process.cwd(), stdio: "pipe", shell: true },
    );

    const timeout = setTimeout(() => {
      reject(new Error("Preview server did not start within 60s"));
    }, 60000);

    previewProcess.stdout?.on("data", (data) => {
      const text = String(data);
      if (text.includes("4173") || text.includes("Local:")) {
        clearTimeout(timeout);
        setTimeout(() => resolve(), 1500);
      }
    });

    previewProcess.stderr?.on("data", (data) => {
      const text = String(data);
      if (text.includes("4173") || text.includes("Local:")) {
        clearTimeout(timeout);
        setTimeout(() => resolve(), 1500);
      }
    });

    previewProcess.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

function stopPreview() {
  if (previewProcess) {
    previewProcess.kill("SIGTERM");
    const forceKill = setTimeout(() => {
      try {
        previewProcess.kill("SIGKILL");
      } catch {
        void 0;
      }
    }, 5000);
    previewProcess.on("exit", () => clearTimeout(forceKill));
  }
}

function summarize(violations) {
  const byImpact = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const v of violations) {
    const impact = v.impact || "minor";
    byImpact[impact] = (byImpact[impact] || 0) + 1;
  }
  return byImpact;
}

function formatViolations(violations) {
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact || "minor",
    description: v.description,
    help: v.help,
    tags: v.tags,
    nodeCount: v.nodes.length,
    nodes: v.nodes.slice(0, 5).map((n) => ({
      target: n.target,
      html: n.html.slice(0, 200),
      failureSummary: n.failureSummary?.slice(0, 300),
    })),
  }));
}

async function auditRoute(browser, route, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: "reduce",
    baseURL: base,
  });
  const page = await context.newPage();

  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const url = base + route.path;
  await page.goto(url, { waitUntil: "networkidle" });

  let axeResults = null;
  let axeError = null;
  try {
    axeResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
  } catch (err) {
    axeError = String(err);
  }

  const title = await page.title();
  const h1Count = await page.locator("h1").count();
  const mainCount = await page.locator("main").count();
  const navCount = await page.locator("nav").count();
  const headerCount = await page.locator("header").count();
  const footerCount = await page.locator("footer").count();

  const emptyLinks = await page.locator('a:not([href]), a[href=""], a[href="#"]').count();
  const buttonsWithoutName = await page.locator('button:not([aria-label]):not([aria-labelledby])').evaluateAll((els) =>
    els.filter((el) => el.textContent?.trim().length === 0).length,
  );
  const imgsWithoutAlt = await page.locator('img:not([alt])').count();
  const duplicateIds = await page.evaluate(() => {
    const ids = Array.from(document.querySelectorAll("[id]")).map((el) => el.id);
    const seen = new Set();
    const dupes = new Set();
    for (const id of ids) {
      if (seen.has(id)) dupes.add(id);
      seen.add(id);
    }
    return Array.from(dupes);
  });

  const bodyText = await page.locator("body").innerText();
  const hasTodoUserInput = bodyText.includes("TODO(USER_INPUT)");

  const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const viewportWidth = viewport.width;
  const horizontalOverflow = docWidth > viewportWidth;

  const violations = axeResults?.violations || [];
  const summary = summarize(violations);

  await context.close();

  return {
    route: route.label,
    path: route.path,
    viewport: viewport.name,
    url,
    title,
    pageErrors,
    axe: axeError ? { error: axeError } : { violations: formatViolations(violations), summary },
    structure: {
      h1Count,
      mainCount,
      navCount,
      headerCount,
      footerCount,
    },
    issues: {
      emptyLinks,
      buttonsWithoutName,
      imgsWithoutAlt,
      duplicateIds,
      hasTodoUserInput,
      horizontalOverflow,
      docWidth,
      viewportWidth,
    },
  };
}

async function main() {
  if (!existsSync("dist")) {
    console.error("dist/ not found. Run 'npm run build' first.");
    process.exit(1);
  }

  console.log("Starting preview server...");
  await startPreview();

  console.log("Launching chromium...");
  const browser = await chromium.launch({ headless: true });

  const allResults = [];

  for (const route of routes) {
    for (const viewport of viewports) {
      console.log(`Auditing ${route.label} @ ${viewport.name}...`);
      const result = await auditRoute(browser, route, viewport);
      allResults.push(result);
      const critical = result.axe.summary?.critical || 0;
      const serious = result.axe.summary?.serious || 0;
      if (critical > 0 || serious > 0) {
        console.log(`  VIOLATIONS: critical=${critical} serious=${serious}`);
      }
      if (result.pageErrors.length > 0) {
        console.log(`  PAGE ERRORS: ${result.pageErrors.length}`);
      }
    }
  }

  await browser.close();
  stopPreview();

  const criticalTotal = allResults.reduce((sum, r) => sum + (r.axe.summary?.critical || 0), 0);
  const seriousTotal = allResults.reduce((sum, r) => sum + (r.axe.summary?.serious || 0), 0);
  const moderateTotal = allResults.reduce((sum, r) => sum + (r.axe.summary?.moderate || 0), 0);
  const minorTotal = allResults.reduce((sum, r) => sum + (r.axe.summary?.minor || 0), 0);

  const structureIssues = allResults.filter(
    (r) => r.structure.h1Count !== 1 || r.structure.mainCount < 1 || r.issues.horizontalOverflow || r.issues.hasTodoUserInput,
  );

  const output = {
    timestamp: new Date().toISOString(),
    axeVersion: "4.12.1",
    routes: allResults.length,
    totals: {
      critical: criticalTotal,
      serious: seriousTotal,
      moderate: moderateTotal,
      minor: minorTotal,
    },
    structureIssues,
    results: allResults,
  };

  console.log("\n=== ACCESSIBILITY AUDIT SUMMARY ===");
  console.log(`Routes audited: ${allResults.length}`);
  console.log(`Critical violations: ${criticalTotal}`);
  console.log(`Serious violations: ${seriousTotal}`);
  console.log(`Moderate violations: ${moderateTotal}`);
  console.log(`Minor violations: ${minorTotal}`);
  console.log(`Structure issues: ${structureIssues.length}`);

  if (criticalTotal > 0 || seriousTotal > 0) {
    console.log("\nBLOCKING: Critical or serious axe violations found.");
    exitCode = 1;
  }

  if (structureIssues.length > 0) {
    console.log("\nBLOCKING: Structure issues found.");
    for (const issue of structureIssues) {
      console.log(
        `  ${issue.route} @ ${issue.viewport}: h1=${issue.structure.h1Count} main=${issue.structure.mainCount} overflow=${issue.issues.horizontalOverflow} todo=${issue.issues.hasTodoUserInput}`,
      );
    }
    exitCode = 1;
  }

  const fs = await import("node:fs/promises");
  const outputFile = process.env.AUDIT_PHASE === "before" ? "docs/architecture/accessibility-audit-before.json" : "docs/architecture/accessibility-audit-after.json";
  await fs.writeFile(outputFile, JSON.stringify(output, null, 2));
  console.log(`\nDetailed results: ${outputFile}`);

  process.exit(exitCode);
}

main().catch((err) => {
  console.error("Audit failed:", err);
  stopPreview();
  process.exit(1);
});
