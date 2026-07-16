import { normalizePath } from "./routes";

export const navigationEventName = "app:navigation";

export function getCurrentPath() {
  return normalizePath(window.location.pathname);
}

export function navigateTo(path: string) {
  const nextPath = normalizePath(path);

  if (nextPath === getCurrentPath()) {
    return;
  }

  window.history.pushState(null, "", nextPath);
  window.dispatchEvent(new Event(navigationEventName));
}
