import { describe, expect, it } from "vitest";

import { createSeoMetadata, deploymentConfig, toCanonicalUrl, toDeploymentPath, toPublicAssetPath } from ".";

describe("SEO metadata", () => {
  it("uses the confirmed GitHub Pages canonical host and base path", () => {
    expect(deploymentConfig.platform).toBe("GitHub Pages");
    expect(deploymentConfig.siteUrl).toBe("https://sgyueran.github.io/UE/");
    expect(deploymentConfig.basePath).toBe("/UE/");
    expect(toCanonicalUrl("/")).toBe("https://sgyueran.github.io/UE/");
    expect(toCanonicalUrl("/projects")).toBe("https://sgyueran.github.io/UE/projects");
    expect(toCanonicalUrl("/UE/projects/non-existent-project")).toBe(
      "https://sgyueran.github.io/UE/projects/non-existent-project",
    );
    expect(toDeploymentPath("/projects")).toBe("/UE/projects");
    expect(toPublicAssetPath("favicon.svg")).toBe("/UE/favicon.svg");
  });

  it("keeps release preview metadata out of search indexes", () => {
    expect(createSeoMetadata("/").robots).toBe("noindex,nofollow");
    expect(createSeoMetadata("/projects").robots).toBe("noindex,nofollow");
    expect(createSeoMetadata("/about").robots).toBe("noindex,nofollow");
  });

  it("does not publish TODO placeholders, guessed author metadata, or fake social images", () => {
    const metadata = createSeoMetadata("/");
    const serialized = JSON.stringify(metadata);

    expect(serialized).not.toContain("TODO(USER_INPUT)");
    expect(serialized).not.toContain('"author"');
    expect(metadata.openGraph.image).toBeNull();
    expect(metadata.twitter.image).toBeNull();
  });

  it("uses the project detail copy for dynamic project routes", () => {
    const metadata = createSeoMetadata("/projects/ue5-ability-system");

    expect(metadata.title).toBe("Project detail preview | UE Portfolio");
    expect(metadata.canonicalUrl).toBe("https://sgyueran.github.io/UE/projects/ue5-ability-system");
    expect(metadata.robots).toBe("noindex,nofollow");
  });

  it("uses the not-found copy for unknown routes", () => {
    const metadata = createSeoMetadata("/definitely-not-a-route");

    expect(metadata.title).toBe("Page not found | UE Portfolio");
    expect(metadata.canonicalUrl).toBe("https://sgyueran.github.io/UE/definitely-not-a-route");
    expect(metadata.robots).toBe("noindex,nofollow");
  });

  it("points the favicon at the GitHub Pages asset path", () => {
    expect(createSeoMetadata("/").faviconPath).toBe("/UE/favicon.svg");
    expect(createSeoMetadata("/").faviconPath).not.toMatch(/^\/assets\//);
  });

  it("documents missing verified fields without inventing them", () => {
    const metadata = createSeoMetadata("/about");

    expect(metadata.missingFields).toContain("author public display name");
    expect(metadata.missingFields).toContain("default Open Graph image");
    expect(metadata.missingFields.length).toBeGreaterThan(0);
  });
});
