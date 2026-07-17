import { describe, expect, it } from "vitest";

import { matchRoute, normalizePath, notFoundRoute } from "./routes";

describe("normalizePath", () => {
  it("strips a trailing slash from non-root paths", () => {
    expect(normalizePath("/projects/")).toBe("/projects");
  });

  it("keeps the root path unchanged", () => {
    expect(normalizePath("/")).toBe("/");
  });

  it("maps an empty path to root", () => {
    expect(normalizePath("")).toBe("/");
  });
});

describe("matchRoute", () => {
  it("matches static routes", () => {
    expect(matchRoute("/").label).toBe("Home");
    expect(matchRoute("/projects").label).toBe("Projects");
    expect(matchRoute("/about").label).toBe("About");
  });

  it("matches dynamic project detail routes", () => {
    expect(matchRoute("/projects/ue5-ability-system").label).toBe("Project detail");
  });

  it("normalizes trailing slashes before matching", () => {
    expect(matchRoute("/projects/").label).toBe("Projects");
  });

  it("falls back to the not-found route for unknown paths", () => {
    expect(matchRoute("/definitely-not-real")).toBe(notFoundRoute);
  });

  it("does not treat nested unknown paths as project details", () => {
    expect(matchRoute("/projects/alpha/beta")).toBe(notFoundRoute);
  });
});
