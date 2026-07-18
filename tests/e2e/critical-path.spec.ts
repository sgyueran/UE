import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

const previewOrigin = "http://127.0.0.1:4173";
const spaFallbackHtml = readFileSync(path.join(process.cwd(), "public", "404.html"), "utf8");
const missingProjectHeading = /not available for public viewing|unavailable until verified/i;

function watchPageErrors(page: Page) {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  return pageErrors;
}

function watchExternalRequests(page: Page) {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith(previewOrigin)) {
      externalRequests.push(request.url());
    }
  });
  return externalRequests;
}

test.describe("desktop critical navigation", () => {
  test("home to projects to about moves focus to each page heading", async ({ page }) => {
    const pageErrors = watchPageErrors(page);
    const externalRequests = watchExternalRequests(page);

    await page.goto("./");

    const primaryNav = page.getByRole("navigation", { name: /primary/i });
    await primaryNav.getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/UE\/projects$/);
    await expect(page.getByRole("heading", { level: 1, name: "Verified project index" })).toBeFocused();

    await primaryNav.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/UE\/about$/);
    await expect(page.getByRole("heading", { level: 1, name: "UE5 Engineer" })).toBeFocused();

    expect(pageErrors).toEqual([]);
    expect(externalRequests).toEqual([]);
  });

  test("about page survives a full reload on the same /UE/ path", async ({ page }) => {
    const pageErrors = watchPageErrors(page);

    await page.goto("about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await page.reload();

    await expect(page).toHaveURL(/\/UE\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
});

test.describe("mobile navigation at 375x812", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("menu opens, focuses first link, and Escape restores trigger focus", async ({ page }) => {
    const pageErrors = watchPageErrors(page);

    await page.goto("./");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Home" }),
    ).toBeFocused();

    await page.keyboard.press("Escape");

    const trigger = page.getByRole("button", { name: "Open navigation menu" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();

    expect(pageErrors).toEqual([]);
  });

  test("following a menu link lets the page heading take over focus", async ({ page }) => {
    const pageErrors = watchPageErrors(page);

    await page.goto("./");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Projects" }).click();

    await expect(page).toHaveURL(/\/UE\/projects$/);
    await expect(page.getByRole("heading", { level: 1, name: "Verified project index" })).toBeFocused();

    expect(pageErrors).toEqual([]);
  });
});

test.describe("missing project safety", () => {
  test("direct visit to a missing project shows the safe unavailable state", async ({ page }) => {
    const pageErrors = watchPageErrors(page);
    const externalRequests = watchExternalRequests(page);

    await page.goto("projects/non-existent-project");

    await expect(page).toHaveURL(/\/UE\/projects\/non-existent-project$/);
    await expect(page.getByRole("heading", { level: 1, name: missingProjectHeading })).toBeVisible();
    await expect(page.locator("body")).not.toContainText("TODO(USER_INPUT)");

    expect(pageErrors).toEqual([]);
    expect(externalRequests).toEqual([]);
  });

  test("missing project stays safe after a full reload", async ({ page }) => {
    const pageErrors = watchPageErrors(page);

    await page.goto("projects/non-existent-project");
    await page.reload();

    await expect(page).toHaveURL(/\/UE\/projects\/non-existent-project$/);
    await expect(page.getByRole("heading", { level: 1, name: missingProjectHeading })).toBeVisible();

    expect(pageErrors).toEqual([]);
  });
});

test.describe("routing fallbacks and integrity", () => {
  test("unknown routes render the 404 state under the /UE/ base path", async ({ page }) => {
    const pageErrors = watchPageErrors(page);

    await page.goto("definitely-not-a-real-route");

    await expect(page).toHaveURL(/\/UE\/definitely-not-a-real-route$/);
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  test("GitHub Pages 404.html fallback restores the requested deep route and consumes the stored path once", async ({
    page,
  }) => {
    const pageErrors = watchPageErrors(page);

    await page.route("**/projects/non-existent-project", (route) =>
      route.fulfill({ status: 404, contentType: "text/html", body: spaFallbackHtml }),
    );

    await page.goto("projects/non-existent-project");

    await expect(page).toHaveURL(/\/UE\/projects\/non-existent-project$/);
    await expect(page.getByRole("heading", { level: 1, name: missingProjectHeading })).toBeVisible();
    await expect(page.evaluate(() => window.sessionStorage.getItem("ue-portfolio:fallback-path"))).resolves.toBeNull();

    expect(pageErrors).toEqual([]);
  });

  test("public pages never reference root assets or duplicate the base path", async ({ page }) => {
    for (const routePath of ["./", "projects", "about", "projects/non-existent-project", "definitely-not-a-real-route"]) {
      await page.goto(routePath);
      await page.locator("main").waitFor();

      const rootAssetReferences = await page.evaluate(() =>
        Array.from(document.querySelectorAll("[src], [href]"))
          .map((element) => element.getAttribute("src") ?? element.getAttribute("href") ?? "")
          .filter((value) => value.startsWith("/assets/")),
      );
      expect(rootAssetReferences).toEqual([]);

      expect(await page.content()).not.toContain("/UE/UE/");
    }
  });

  test("no page initializes a canvas or WebGL surface without user activation", async ({ page }) => {
    for (const routePath of ["./", "projects", "about", "projects/non-existent-project", "definitely-not-a-real-route"]) {
      await page.goto(routePath);
      await page.locator("main").waitFor();
      await expect(page.locator("canvas")).toHaveCount(0);
    }
  });
});

test.describe("reduced motion rendering", () => {
  test("content stays fully visible without animation dependence", async ({ browser }, testInfo) => {
    const context = await browser.newContext({
      baseURL: testInfo.project.use.baseURL as string,
      reducedMotion: "reduce",
      colorScheme: "dark",
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    await page.goto("./");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(page.locator("main")).toBeVisible();

    await expect(heading.evaluate((element) => getComputedStyle(element).opacity)).resolves.toBe("1");
    await context.close();
  });
});
