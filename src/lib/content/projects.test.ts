import { describe, expect, it } from "vitest";

import { getPortfolioProjects, getProjectSafetyReports, getPublicPortfolioProjects } from "./projects";

describe("portfolio project content states", () => {
  it("keeps an empty repository project list in a safe empty state without fabricated entries", () => {
    const result = getPortfolioProjects();

    expect(result.status).toBe("empty");
    expect(result.data).toBeNull();
    expect(result.issues.some((issue) => issue.code === "content.empty")).toBe(true);
  });

  it("keeps public project queries empty rather than promoting unverified content", () => {
    const result = getPublicPortfolioProjects();

    expect(result.status).toBe("empty");
    expect(result.data).toBeNull();
    expect(result.issues).toEqual([]);
  });

  it("produces no safety reports when no projects exist", () => {
    expect(getProjectSafetyReports()).toEqual([]);
  });

  it("does not leak TODO placeholders through public project data", () => {
    expect(JSON.stringify(getPublicPortfolioProjects())).not.toContain("TODO(USER_INPUT)");
  });
});
