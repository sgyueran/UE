import { TODO_USER_INPUT, type PortfolioProfile } from "@/types/content";

const todoProvenance = {
  status: "todo",
  source: TODO_USER_INPUT,
  note: "Awaiting verified user-provided profile input.",
} as const;

const profileTemplateProvenance = {
  status: "verified",
  source: "content-input/PROFILE-TEMPLATE.md",
  note: "Professional title and English-only language decision come from repository input templates.",
} as const;

export const portfolioProfile = {
  id: "primary-profile",
  displayName: TODO_USER_INPUT,
  professionalTitle: "UE5 Engineer",
  shortIntroduction: TODO_USER_INPUT,
  professionalSummary: TODO_USER_INPUT,
  location: {
    visibility: "private",
    label: TODO_USER_INPUT,
    provenance: todoProvenance,
  },
  coreSpecializations: [TODO_USER_INPUT],
  programmingLanguages: [TODO_USER_INPUT],
  toolsAndWorkflow: [TODO_USER_INPUT],
  availability: TODO_USER_INPUT,
  siteLanguages: ["en"],
  contact: {
    email: TODO_USER_INPUT,
    links: [
      {
        id: "github",
        label: "GitHub",
        href: TODO_USER_INPUT,
        verification: "todo",
        publicationStatus: "private",
        provenance: todoProvenance,
      },
      {
        id: "recruitment-profile",
        label: "LinkedIn or recruitment profile",
        href: TODO_USER_INPUT,
        verification: "todo",
        publicationStatus: "private",
        provenance: todoProvenance,
      },
    ],
    resume: {
      path: TODO_USER_INPUT,
      checklistComplete: false,
      publicationStatus: "private",
      provenance: todoProvenance,
    },
    formEndpoint: "none",
    phonePublic: false,
    provenance: todoProvenance,
  },
  verification: "todo",
  publicationStatus: "private",
  provenance: profileTemplateProvenance,
} as const satisfies PortfolioProfile;
