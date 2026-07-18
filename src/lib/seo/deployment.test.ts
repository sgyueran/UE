import { describe, expect, it } from "vitest";

import { deploymentConfig, stripDeploymentBasePath, toCanonicalUrl, toDeploymentPath, toPublicAssetPath } from "./deployment";

describe("stripDeploymentBasePath", () => {
  it("maps the deployment root to the app root", () => {
    expect(stripDeploymentBasePath("/UE")).toBe("/");
    expect(stripDeploymentBasePath("/UE/")).toBe("/");
  });

  it("strips the base path from nested routes", () => {
    expect(stripDeploymentBasePath("/UE/projects")).toBe("/projects");
    expect(stripDeploymentBasePath("/UE/projects/ue5-system")).toBe("/projects/ue5-system");
  });

  it("leaves app-relative paths unchanged", () => {
    expect(stripDeploymentBasePath("/projects")).toBe("/projects");
    expect(stripDeploymentBasePath("/about")).toBe("/about");
  });

  it("ignores query strings and hash fragments", () => {
    expect(stripDeploymentBasePath("/UE/projects?filter=gameplay#top")).toBe("/projects");
  });

  it("normalizes trailing slashes on nested routes", () => {
    expect(stripDeploymentBasePath("/UE/about/")).toBe("/about");
  });
});

describe("toDeploymentPath", () => {
  it("prefixes app routes with the GitHub Pages base path", () => {
    expect(toDeploymentPath("/")).toBe("/UE/");
    expect(toDeploymentPath("/projects")).toBe("/UE/projects");
    expect(toDeploymentPath("/about")).toBe("/UE/about");
  });

  it("never produces a duplicated base path", () => {
    expect(toDeploymentPath("/UE/projects")).toBe("/UE/projects");
    expect(toDeploymentPath("/projects")).not.toContain("/UE/UE/");
  });
});

describe("toCanonicalUrl", () => {
  it("builds canonical URLs on the confirmed host", () => {
    expect(toCanonicalUrl("/")).toBe("https://sgyueran.github.io/UE/");
    expect(toCanonicalUrl("/projects")).toBe("https://sgyueran.github.io/UE/projects");
  });

  it("accepts deployment-prefixed paths without duplicating the base", () => {
    expect(toCanonicalUrl("/UE/about")).toBe("https://sgyueran.github.io/UE/about");
    expect(toCanonicalUrl("/UE/about")).not.toContain("/UE/UE/");
  });
});

describe("toPublicAssetPath", () => {
  it("serves public assets from the deployment base path", () => {
    expect(toPublicAssetPath("favicon.svg")).toBe("/UE/favicon.svg");
  });

  it("normalizes leading slashes and never falls back to the domain root", () => {
    expect(toPublicAssetPath("/robots.txt")).toBe("/UE/robots.txt");
    expect(toPublicAssetPath("favicon.svg")).not.toMatch(/^\/assets\//);
  });
});

describe("deploymentConfig", () => {
  it("keeps indexing disabled until release approval", () => {
    expect(deploymentConfig.indexingEnabled).toBe(false);
    expect(deploymentConfig.basePath).toBe("/UE/");
  });
});
