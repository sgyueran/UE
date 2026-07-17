import { portfolioProjects } from "@/data/projects";
import type { ContentIssue, ContentResult, PortfolioProject, ProjectSafetyReport } from "@/types/content";

import {
  createTodoIssue,
  hasTodoUserInput,
  validateContentProvenance,
  validateProjectPublicationSafety,
  validateSluggedContent,
} from "./validation";

export function getPortfolioProjects(): ContentResult<readonly PortfolioProject[]> {
  const issues: readonly ContentIssue[] = [
    ...validateSluggedContent(portfolioProjects),
    ...validateContentProvenance(portfolioProjects),
  ];

  if (portfolioProjects.length === 0) {
    return {
      status: "empty",
      data: null,
      issues,
    };
  }

  if (issues.some((issue) => issue.severity === "error")) {
    return {
      status: "invalid",
      data: null,
      issues,
    };
  }

  if (hasTodoUserInput(portfolioProjects)) {
    return {
      status: "incomplete",
      data: portfolioProjects,
      issues: [createTodoIssue("Project content contains unresolved user-input placeholders awaiting verified input.")],
    };
  }

  return {
    status: "ready",
    data: portfolioProjects,
    issues,
  };
}

export function getProjectSafetyReports(): readonly ProjectSafetyReport[] {
  return portfolioProjects.map((project) => {
    const issues = validateProjectPublicationSafety(project);

    return {
      projectId: project.id,
      slug: project.slug,
      readiness: {
        isPublishable: issues.every((issue) => issue.severity !== "error"),
        issues,
      },
    };
  });
}

export function getPublicPortfolioProjects(): ContentResult<readonly PortfolioProject[]> {
  const safetyReports = getProjectSafetyReports();
  const blockingIssues = safetyReports.flatMap((report) => report.readiness.issues);
  const publicProjects = portfolioProjects.filter((project) =>
    safetyReports.some((report) => report.projectId === project.id && report.readiness.isPublishable),
  );

  if (portfolioProjects.length === 0) {
    return {
      status: "empty",
      data: null,
      issues: [],
    };
  }

  if (blockingIssues.some((issue) => issue.severity === "error")) {
    return {
      status: "invalid",
      data: null,
      issues: blockingIssues,
    };
  }

  if (publicProjects.length === 0) {
    return {
      status: "empty",
      data: null,
      issues: blockingIssues,
    };
  }

  return {
    status: "ready",
    data: publicProjects,
    issues: blockingIssues,
  };
}
