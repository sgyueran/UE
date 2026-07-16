import { navigationModel } from "@/data/navigation";
import type { ContentIssue, ContentResult, NavigationItem, NavigationModel } from "@/types/content";

import { validateContentProvenance, validateNavigationContent } from "./validation";

function sortByOrder(items: readonly NavigationItem[]): readonly NavigationItem[] {
  return [...items].sort((current, next) => current.order - next.order);
}

export function getNavigationModel(): ContentResult<NavigationModel> {
  const allItems = [...navigationModel.primary, ...navigationModel.utility];
  const issues: readonly ContentIssue[] = [
    ...validateNavigationContent(allItems),
    ...validateContentProvenance(allItems),
  ];

  if (allItems.length === 0) {
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

  return {
    status: "ready",
    data: {
      primary: sortByOrder(navigationModel.primary),
      utility: sortByOrder(navigationModel.utility),
    },
    issues,
  };
}
