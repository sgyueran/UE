import type { ContentIssue, PortfolioContentModel } from "@/types/content";

import { getNavigationModel } from "./navigation";
import { getPortfolioProfile } from "./profile";
import { getPortfolioProjects, getProjectSafetyReports, getPublicPortfolioProjects } from "./projects";
import { createContentIssue } from "./validation";

function collectIssues(model: Omit<PortfolioContentModel, "release">): readonly ContentIssue[] {
  return [
    ...model.profile.issues,
    ...model.navigation.issues,
    ...model.projects.issues,
    ...model.publicProjects.issues,
    ...model.projectSafety.flatMap((report) => report.readiness.issues),
  ];
}

export function getPortfolioContentModel(): PortfolioContentModel {
  const model = {
    profile: getPortfolioProfile(),
    navigation: getNavigationModel(),
    projects: getPortfolioProjects(),
    publicProjects: getPublicPortfolioProjects(),
    projectSafety: getProjectSafetyReports(),
  };
  const issues = [
    ...collectIssues(model),
    ...(model.profile.status !== "ready"
      ? [createContentIssue("content.profile_not_ready", "Profile content is not ready for release.", "error", "profile")]
      : []),
    ...(model.publicProjects.status !== "ready"
      ? [
          createContentIssue(
            "content.public_projects_not_ready",
            "No verified public project content is ready for release.",
            "error",
            "projects",
          ),
        ]
      : []),
  ];

  return {
    ...model,
    release: {
      isPublishable: issues.every((issue) => issue.severity !== "error"),
      issues,
    },
  };
}
