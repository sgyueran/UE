export const TODO_USER_INPUT = "TODO(USER_INPUT)" as const;

export type ContentVerificationStatus = "verified" | "draft" | "todo";

export type PublicationStatus = "public" | "private" | "permission_required" | "anonymized";

export type ContentProvenance =
  | {
      readonly status: "verified";
      readonly source: string;
      readonly note?: string;
    }
  | {
      readonly status: "draft";
      readonly source: string;
      readonly note: string;
    }
  | {
      readonly status: "todo";
      readonly source: typeof TODO_USER_INPUT;
      readonly note: string;
    };

export type ContentIssueSeverity = "error" | "warning";

export type ContentIssue = {
  readonly code: string;
  readonly field?: string;
  readonly message: string;
  readonly severity: ContentIssueSeverity;
};

export type ContentResult<T> =
  | {
      readonly status: "ready";
      readonly data: T;
      readonly issues: readonly ContentIssue[];
    }
  | {
      readonly status: "incomplete";
      readonly data: T;
      readonly issues: readonly ContentIssue[];
    }
  | {
      readonly status: "empty";
      readonly data: null;
      readonly issues: readonly ContentIssue[];
    }
  | {
      readonly status: "invalid";
      readonly data: null;
      readonly issues: readonly ContentIssue[];
    };

export type ContentReadiness = {
  readonly isPublishable: boolean;
  readonly issues: readonly ContentIssue[];
};

export type ExternalLink = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly verification: ContentVerificationStatus;
  readonly publicationStatus: PublicationStatus;
  readonly provenance: ContentProvenance;
};

export type ProfileLocationVisibility = "public" | "region-only" | "private";

export type ProfileLocation = {
  readonly visibility: ProfileLocationVisibility;
  readonly label: string;
  readonly provenance: ContentProvenance;
};

export type ResumePublication = {
  readonly path: string;
  readonly checklistComplete: boolean;
  readonly publicationStatus: PublicationStatus;
  readonly provenance: ContentProvenance;
};

export type ProfileContact = {
  readonly email: string;
  readonly links: readonly ExternalLink[];
  readonly resume: ResumePublication;
  readonly formEndpoint: "none" | string;
  readonly phonePublic: boolean;
  readonly provenance: ContentProvenance;
};

export type PortfolioProfile = {
  readonly id: string;
  readonly displayName: string;
  readonly professionalTitle: string;
  readonly shortIntroduction: string;
  readonly professionalSummary: string;
  readonly location: ProfileLocation;
  readonly coreSpecializations: readonly string[];
  readonly programmingLanguages: readonly string[];
  readonly toolsAndWorkflow: readonly string[];
  readonly availability: string;
  readonly siteLanguages: readonly string[];
  readonly contact: ProfileContact;
  readonly verification: ContentVerificationStatus;
  readonly publicationStatus: PublicationStatus;
  readonly provenance: ContentProvenance;
};

export type NavigationItem = {
  readonly id: string;
  readonly label: string;
  readonly path: string;
  readonly order: number;
  readonly isPrimary: boolean;
  readonly provenance: ContentProvenance;
};

export type NavigationModel = {
  readonly primary: readonly NavigationItem[];
  readonly utility: readonly NavigationItem[];
};

export type ProjectContentStatus = "verified" | "draft" | "todo";

export type ProjectType =
  | "gameplay-system"
  | "rendering-optimization"
  | "technical-art"
  | "tooling-pipeline"
  | "interactive-experience"
  | "study"
  | "todo";

export type UnrealDomain =
  | "Gameplay"
  | "C++"
  | "Blueprint"
  | "Rendering"
  | "Optimization"
  | "Niagara"
  | "Materials"
  | "PCG"
  | "Tools"
  | "UI"
  | "Networking"
  | typeof TODO_USER_INPUT;

export type ProjectMediaType = "image" | "video" | "model" | "link";

export type ProjectMedia = {
  readonly id: string;
  readonly type: ProjectMediaType;
  readonly src: string;
  readonly alt: string;
  readonly poster?: string;
  readonly publicationStatus: PublicationStatus;
  readonly provenance: ContentProvenance;
};

export type ProjectOutcome = {
  readonly summary: string;
  readonly evidenceSource: string;
  readonly provenance: ContentProvenance;
};

export type PortfolioProject = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly type: ProjectType;
  readonly status: ProjectContentStatus;
  readonly publicationStatus: PublicationStatus;
  readonly unrealEngineVersion: string;
  readonly dateRange: string;
  readonly role: string;
  readonly teamSize: string;
  readonly responsibilities: readonly string[];
  readonly unrealDomains: readonly UnrealDomain[];
  readonly cppBlueprintSplit: string;
  readonly toolsCreated: readonly string[];
  readonly overview: string;
  readonly problem: string;
  readonly constraints: string;
  readonly systemDesign: string;
  readonly implementation: string;
  readonly optimization: string;
  readonly outcome: ProjectOutcome;
  readonly reflection: string;
  readonly media: readonly ProjectMedia[];
  readonly links: readonly ExternalLink[];
  readonly safety: {
    readonly containsNdaMaterial: boolean | "unknown";
    readonly containsPrivateCode: boolean | "unknown";
    readonly requiresAnonymization: boolean | "unknown";
    readonly approvalStatus: PublicationStatus;
    readonly approvedBy: string;
    readonly approvalDate: string;
  };
  readonly provenance: ContentProvenance;
};

export type ProjectSafetyReport = {
  readonly projectId: string;
  readonly slug: string;
  readonly readiness: ContentReadiness;
};

export type PortfolioContentModel = {
  readonly profile: ContentResult<PortfolioProfile>;
  readonly navigation: ContentResult<NavigationModel>;
  readonly projects: ContentResult<readonly PortfolioProject[]>;
  readonly publicProjects: ContentResult<readonly PortfolioProject[]>;
  readonly projectSafety: readonly ProjectSafetyReport[];
  readonly release: ContentReadiness;
};
