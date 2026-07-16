const routes = [
  {
    path: "/",
    heading: /Unreal Engine 5 Engineer|UE5 Engineer/i,
  },
  {
    path: "/projects",
    heading: /Verified project index/i,
  },
  {
    path: "/about",
    heading: /UE5 Engineer|About/i,
  },
  {
    path: "/projects/non-existent-project",
    heading: /not available for public viewing|unavailable until verified/i,
  },
  {
    path: "/definitely-not-a-real-route",
    heading: /Page not found/i,
  },
] as const;

if (!process.env.VITEST_WORKER_ID) {
  const { expect, test } = await import("@playwright/test");

  test.describe("public routes smoke", () => {
    for (const route of routes) {
      test(`${route.path} loads directly without page errors`, async ({ page }) => {
        const pageErrors: Error[] = [];
        page.on("pageerror", (error) => pageErrors.push(error));

        await page.goto(route.path);

        await expect(page.locator("main")).toBeVisible();
        await expect(page.getByRole("heading", { name: route.heading })).toBeVisible();
        await expect(page.getByRole("navigation", { name: /primary/i })).toBeVisible();
        expect(pageErrors).toEqual([]);
      });
    }
  });
}
