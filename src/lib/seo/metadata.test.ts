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
});
