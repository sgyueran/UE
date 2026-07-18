import { describe, expect, it } from "vitest";

import { getCurrentPath, navigateTo, navigationEventName } from "./navigation";

describe("navigateTo", () => {
  it("writes GitHub Pages deployment paths into history and emits one navigation event", () => {
    window.history.replaceState(null, "", "/UE/");
    const visitedPaths: string[] = [];
    const listener = () => {
      visitedPaths.push(window.location.pathname);
    };
    window.addEventListener(navigationEventName, listener);

    navigateTo("/projects");

    window.removeEventListener(navigationEventName, listener);
    expect(window.location.pathname).toBe("/UE/projects");
    expect(visitedPaths).toEqual(["/UE/projects"]);
  });

  it("ignores navigation to the current path", () => {
    window.history.replaceState(null, "", "/UE/about");
    let eventCount = 0;
    const listener = () => {
      eventCount += 1;
    };
    window.addEventListener(navigationEventName, listener);

    navigateTo("/about");

    window.removeEventListener(navigationEventName, listener);
    expect(window.location.pathname).toBe("/UE/about");
    expect(eventCount).toBe(0);
  });
});

describe("404 fallback path consumption", () => {
  it("consumes the stored fallback path once and restores the deployment URL", () => {
    window.history.replaceState(null, "", "/UE/");
    window.sessionStorage.setItem("ue-portfolio:fallback-path", "/UE/projects/missing-slug");

    expect(getCurrentPath()).toBe("/projects/missing-slug");
    expect(window.sessionStorage.getItem("ue-portfolio:fallback-path")).toBeNull();
    expect(window.location.pathname).toBe("/UE/projects/missing-slug");
  });

  it("does not consume the fallback path twice", () => {
    window.history.replaceState(null, "", "/UE/");
    window.sessionStorage.setItem("ue-portfolio:fallback-path", "/UE/about");

    expect(getCurrentPath()).toBe("/about");
    expect(getCurrentPath()).toBe("/about");
  });
});
