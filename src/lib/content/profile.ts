import { portfolioProfile } from "@/data/profile";
import type { ContentIssue, ContentResult, PortfolioProfile } from "@/types/content";

import { createTodoIssue, hasTodoUserInput, validateContentProvenance, validateIdentifiedContent } from "./validation";

export function getPortfolioProfile(): ContentResult<PortfolioProfile> {
  const profileItems = [portfolioProfile];
  const issues: readonly ContentIssue[] = [
    ...validateIdentifiedContent(profileItems),
    ...validateContentProvenance(profileItems),
  ];

  if (issues.some((issue) => issue.severity === "error")) {
    return {
      status: "invalid",
      data: null,
      issues,
    };
  }

  if (hasTodoUserInput(portfolioProfile)) {
    return {
      status: "incomplete",
      data: portfolioProfile,
      issues: [createTodoIssue("Profile contains TODO(USER_INPUT) placeholders awaiting verified input.")],
    };
  }

  return {
    status: "ready",
    data: portfolioProfile,
    issues,
  };
}
