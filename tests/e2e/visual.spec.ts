import { expect, test, type Browser, type Page, type TestInfo } from "@playwright/test";

const desktopViewport = { width: 1440, height: 900 };
const mobileViewport = { width: 375, height: 812 };

type Viewport = typeof desktopViewport;

async function newStablePage(browser: Browser, testInfo: TestInfo, viewport: Viewport) {
  const context = await browser.newContext({
    baseURL: testInfo.project.use.baseURL as string,
    reducedMotion: "reduce",
    colorScheme: "dark",
    locale: "en-US",
    timezoneId: "UTC",
    viewport,
  });
  const page = await context.newPage();

  return { context, page };
}

async function stabilizeForScreenshot(page: Page) {
  await page.locator("main").waitFor();
  await page.locator("h1").first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-delay: 0ms !important;
        transition-duration: 0.01ms !important;
        transition-delay: 0ms !important;
        caret-color: transparent !important;
      }
    `,
  });
}

test.describe("visual baselines", () => {
  test("home desktop 1440x900", async ({ browser }, testInfo) => {
    const { context, page } = await newStablePage(browser, testInfo, desktopViewport);
    await page.goto("./");
    await stabilizeForScreenshot(page);

    await expect(page).toHaveScreenshot("home-desktop.png");
    await context.close();
  });

  test("projects empty desktop 1440x900", async ({ browser }, testInfo) => {
    const { context, page } = await newStablePage(browser, testInfo, desktopViewport);
    await page.goto("projects");
    await stabilizeForScreenshot(page);

    await expect(page).toHaveScreenshot("projects-empty-desktop.png");
    await context.close();
  });

  test("about mobile 375x812", async ({ browser }, testInfo) => {
    const { context, page } = await newStablePage(browser, testInfo, mobileViewport);
    await page.goto("about");
    await stabilizeForScreenshot(page);

    await expect(page).toHaveScreenshot("about-mobile.png");
    await context.close();
  });

  test("unknown route desktop 1440x900", async ({ browser }, testInfo) => {
    const { context, page } = await newStablePage(browser, testInfo, desktopViewport);
    await page.goto("definitely-not-a-real-route");
    await stabilizeForScreenshot(page);

    await expect(page).toHaveScreenshot("unknown-route-desktop.png");
    await context.close();
  });
});
