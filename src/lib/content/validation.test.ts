import { describe, expect, it } from "vitest";

import { TODO_USER_INPUT, type ContentProvenance, type PortfolioProject } from "@/types/content";

import { validateProjectPublicationSafety } from "./validation";

const verifiedProvenance: ContentProvenance = {
  status: "verified",
  source: "test fixture",
  note: "Unit-test fixture, not portfolio content.",
};

function createVerifiedPublicProject(overrides: Partial<PortfolioProject> = {}): PortfolioProject {
  return {
    id: "test-project",
    slug: "test-project",
    title: "Test Project",
    type: "gameplay-system",
    status: "verified",
    publicationStatus: "public",
    unrealEngineVersion: "UE 5.x",
    dateRange: "Verified test date range",
    role: "Verified test role",
    teamSize: "Verified test team size",
    responsibilities: ["Verified test responsibility"],
    unrealDomains: ["Gameplay", "C++"],
    cppBlueprintSplit: "Verified test split",
    toolsCreated: ["Verified test tool"],
    overview: "Verified test overview",
    problem: "Verified test problem",
    constraints: "Verified test constraints",
    systemDesign: "Verified test system design",
    implementation: "Verified test implementation",
    optimization: "Verified test optimization",
    outcome: {
      summary: "Verified test outcome",
      evidenceSource: "Verified test evidence",
      provenance: verifiedProvenance,
    },
    reflection: "Verified test reflection",
    media: [],
    links: [],
    safety: {
      containsNdaMaterial: false,
      containsPrivateCode: false,
      requiresAnonymization: false,
      approvalStatus: "public",
      approvedBy: "Verified test approver",
      approvalDate: "Verified test approval date",
    },
    provenance: verifiedProvenance,
    ...overrides,
  };
}

function hasErrorCode(project: PortfolioProject, code: string): boolean {
  return validateProjectPublicationSafety(project).some((issue) => issue.severity === "error" && issue.code === code);
}

describe("validateProjectPublicationSafety", () => {
  it("allows a verified public project to publish", () => {
    expect(validateProjectPublicationSafety(createVerifiedPublicProject())).toEqual([]);
  });

  it("blocks an unverified project from publishing", () => {
    expect(hasErrorCode(createVerifiedPublicProject({ status: "draft" }), "content.project_unverified")).toBe(true);
  });

  it("blocks a private project from publishing", () => {
    expect(hasErrorCode(createVerifiedPublicProject({ publicationStatus: "private" }), "content.project_not_public")).toBe(true);
  });

  it("blocks a project with missing required fields", () => {
    expect(hasErrorCode(createVerifiedPublicProject({ role: "" }), "content.project_missing_required_field")).toBe(true);
  });

  it("blocks TODO(USER_INPUT) from being treated as verified content", () => {
    expect(hasErrorCode(createVerifiedPublicProject({ title: TODO_USER_INPUT }), "content.project_todo_user_input")).toBe(true);
  });
});
