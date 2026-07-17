import { stripDeploymentBasePath, toDeploymentPath } from "@/lib/seo";

import { normalizePath } from "./routes";

export const navigationEventName = "app:navigation";
const fallbackStorageKey = "ue-portfolio:fallback-path";

function consumeFallbackPath() {
  const fallbackPath = window.sessionStorage.getItem(fallbackStorageKey);

  if (!fallbackPath) {
    return null;
  }

  window.sessionStorage.removeItem(fallbackStorageKey);
  const normalizedFallbackPath = normalizePath(stripDeploymentBasePath(fallbackPath));
  window.history.replaceState(null, "", toDeploymentPath(normalizedFallbackPath));

  return normalizedFallbackPath;
}

export function getCurrentPath() {
  return consumeFallbackPath() ?? normalizePath(stripDeploymentBasePath(window.location.pathname));
}

export function navigateTo(path: string) {
  const nextPath = normalizePath(stripDeploymentBasePath(path));

  if (nextPath === getCurrentPath()) {
    return;
  }

  window.history.pushState(null, "", toDeploymentPath(nextPath));
  window.dispatchEvent(new Event(navigationEventName));
}
