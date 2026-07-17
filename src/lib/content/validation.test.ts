import { describe, expect, it } from "vitest";

import { TODO_USER_INPUT, type ContentProvenance, type ExternalLink, type PortfolioProject, type ProjectMedia } from "@/types/content";

import { validateProjectPublicationSafety, validateSluggedContent } from "./validation";

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

  it("allows a safe empty media state to build", () => {
    expect(validateProjectPublicationSafety(createVerifiedPublicProject({ media: [] }))).toEqual([]);
  });

  it("blocks unverified public media", () => {
    const media: ProjectMedia = {
      id: "test-image",
      type: "image",
      src: "/UE/media/test-image.webp",
      alt: "Verified test image",
      publicationStatus: "public",
      provenance: {
        status: "draft",
        source: "test fixture",
        note: "Unit-test fixture, not portfolio content.",
      },
    };

    expect(hasErrorCode(createVerifiedPublicProject({ media: [media] }), "content.media_unverified")).toBe(true);
  });

  it("blocks unauthorized media from public output", () => {
    const media: ProjectMedia = {
      id: "test-image",
      type: "image",
      src: "/UE/media/test-image.webp",
      alt: "Verified test image",
      publicationStatus: "permission_required",
      provenance: verifiedProvenance,
    };

    expect(hasErrorCode(createVerifiedPublicProject({ media: [media] }), "content.media_not_public")).toBe(true);
  });

  it("blocks invalid media URLs", () => {
    const media: ProjectMedia = {
      id: "test-image",
      type: "image",
      src: "https://example.com/test-image.webp",
      alt: "Verified test image",
      publicationStatus: "public",
      provenance: verifiedProvenance,
    };

    expect(hasErrorCode(createVerifiedPublicProject({ media: [media] }), "content.media_invalid_url")).toBe(true);
  });

  it("blocks public root asset paths that omit the GitHub Pages base path", () => {
    const media: ProjectMedia = {
      id: "test-image",
      type: "image",
      src: "/assets/test-image.webp",
      alt: "Verified test image",
      publicationStatus: "public",
      provenance: verifiedProvenance,
    };

    expect(hasErrorCode(createVerifiedPublicProject({ media: [media] }), "content.media_invalid_base_path")).toBe(true);
  });

  it("allows verified public media served from the GitHub Pages base path", () => {
    const media: ProjectMedia = {
      id: "test-image",
      type: "image",
      src: "/UE/media/test-image.webp",
      alt: "Verified test image",
      publicationStatus: "public",
      provenance: verifiedProvenance,
    };

    expect(validateProjectPublicationSafety(createVerifiedPublicProject({ media: [media] }))).toEqual([]);
  });

  it("blocks unknown NDA clearance", () => {
    const project = createVerifiedPublicProject({
      safety: {
        containsNdaMaterial: "unknown",
        containsPrivateCode: false,
        requiresAnonymization: false,
        approvalStatus: "public",
        approvedBy: "Verified test approver",
        approvalDate: "Verified test approval date",
      },
    });

    expect(hasErrorCode(project, "content.project_nda_unknown")).toBe(true);
  });

  it("blocks projects containing private code", () => {
    const project = createVerifiedPublicProject({
      safety: {
        containsNdaMaterial: false,
        containsPrivateCode: true,
        requiresAnonymization: false,
        approvalStatus: "public",
        approvedBy: "Verified test approver",
        approvalDate: "Verified test approval date",
      },
    });

    expect(hasErrorCode(project, "content.project_private_code_unknown")).toBe(true);
  });

  it("blocks public projects that still require anonymization", () => {
    const project = createVerifiedPublicProject({
      safety: {
        containsNdaMaterial: false,
        containsPrivateCode: false,
        requiresAnonymization: true,
        approvalStatus: "public",
        approvedBy: "Verified test approver",
        approvalDate: "Verified test approval date",
      },
    });

    expect(hasErrorCode(project, "content.project_anonymization_required")).toBe(true);
  });

  it("blocks unverified outcome evidence", () => {
    const project = createVerifiedPublicProject({
      outcome: {
        summary: "Verified test outcome",
        evidenceSource: "Verified test evidence",
        provenance: {
          status: "draft",
          source: "test fixture",
          note: "Unit-test fixture, not portfolio content.",
        },
      },
    });

    expect(hasErrorCode(project, "content.outcome_unverified")).toBe(true);
  });

  it("blocks TODO placeholders nested inside array fields", () => {
    expect(
      hasErrorCode(createVerifiedPublicProject({ responsibilities: [TODO_USER_INPUT] }), "content.project_todo_user_input"),
    ).toBe(true);
  });

  it("allows a verified public link", () => {
    const link: ExternalLink = {
      id: "github",
      label: "GitHub",
      href: "https://github.com/sgyueran",
      verification: "verified",
      publicationStatus: "public",
      provenance: verifiedProvenance,
    };

    expect(validateProjectPublicationSafety(createVerifiedPublicProject({ links: [link] }))).toEqual([]);
  });

  it("blocks unverified links", () => {
    const link: ExternalLink = {
      id: "github",
      label: "GitHub",
      href: "https://github.com/sgyueran",
      verification: "todo",
      publicationStatus: "public",
      provenance: verifiedProvenance,
    };

    expect(hasErrorCode(createVerifiedPublicProject({ links: [link] }), "content.link_unverified")).toBe(true);
  });

  it("blocks private links from public output", () => {
    const link: ExternalLink = {
      id: "github",
      label: "GitHub",
      href: "https://github.com/sgyueran",
      verification: "verified",
      publicationStatus: "private",
      provenance: verifiedProvenance,
    };

    expect(hasErrorCode(createVerifiedPublicProject({ links: [link] }), "content.link_not_public")).toBe(true);
  });

  it("blocks links that still contain TODO placeholders", () => {
    const link: ExternalLink = {
      id: "github",
      label: "GitHub",
      href: TODO_USER_INPUT,
      verification: "verified",
      publicationStatus: "public",
      provenance: verifiedProvenance,
    };

    expect(hasErrorCode(createVerifiedPublicProject({ links: [link] }), "content.link_todo_user_input")).toBe(true);
  });

  it("blocks links with unsafe URLs", () => {
    const link: ExternalLink = {
      id: "example",
      label: "Example",
      href: "https://example.com/profile",
      verification: "verified",
      publicationStatus: "public",
      provenance: verifiedProvenance,
    };

    expect(hasErrorCode(createVerifiedPublicProject({ links: [link] }), "content.link_invalid_url")).toBe(true);
  });

  it("blocks links pointing at root asset paths", () => {
    const link: ExternalLink = {
      id: "resume",
      label: "Resume",
      href: "/assets/resume.pdf",
      verification: "verified",
      publicationStatus: "public",
      provenance: verifiedProvenance,
    };

    expect(hasErrorCode(createVerifiedPublicProject({ links: [link] }), "content.link_invalid_base_path")).toBe(true);
  });

  it("reports duplicate ids across projects", () => {
    const first = createVerifiedPublicProject({ id: "shared-id", slug: "first-slug" });
    const second = createVerifiedPublicProject({ id: "shared-id", slug: "second-slug" });

    expect(validateSluggedContent([first, second]).some((issue) => issue.code === "content.duplicate_id")).toBe(true);
  });

  it("reports duplicate slugs across projects", () => {
    const first = createVerifiedPublicProject({ id: "first-id", slug: "shared-slug" });
    const second = createVerifiedPublicProject({ id: "second-id", slug: "shared-slug" });

    expect(validateSluggedContent([first, second]).some((issue) => issue.code === "content.duplicate_slug")).toBe(true);
  });

  it("does not leak private project text into validation issue messages", () => {
    const secretTitle = "SECRET-PROJECT-NAME-XYZ";
    const issues = validateProjectPublicationSafety(createVerifiedPublicProject({ title: secretTitle, status: "draft" }));

    expect(issues.length).toBeGreaterThan(0);
    expect(JSON.stringify(issues)).not.toContain(secretTitle);
  });
});
