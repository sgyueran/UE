import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

type MediaQueryChangeListener = (event: MediaQueryListEvent) => void;

export type MediaQueryController = {
  readonly list: MediaQueryList;
  setMatches: (matches: boolean) => void;
};

const controllers = new Map<string, MediaQueryController>();

export function getMediaQueryController(query: string): MediaQueryController {
  const controller = controllers.get(query);

  if (!controller) {
    throw new Error(`No matchMedia controller registered for "${query}". Render the component before reading it.`);
  }

  return controller;
}

function createMatchMedia(initialMatches: boolean) {
  return (query: string): MediaQueryList => {
    const listeners = new Set<MediaQueryChangeListener>();
    let matches = initialMatches;

    const list = {
      get matches() {
        return matches;
      },
      media: query,
      onchange: null as MediaQueryChangeListener | null,
      addListener(listener: MediaQueryChangeListener) {
        listeners.add(listener);
      },
      removeListener(listener: MediaQueryChangeListener) {
        listeners.delete(listener);
      },
      addEventListener(_type: string, listener: MediaQueryChangeListener) {
        listeners.add(listener);
      },
      removeEventListener(_type: string, listener: MediaQueryChangeListener) {
        listeners.delete(listener);
      },
      dispatchEvent: () => true,
    } as unknown as MediaQueryList;

    controllers.set(query, {
      list,
      setMatches(nextMatches: boolean) {
        matches = nextMatches;
        const event = { matches: nextMatches, media: query } as MediaQueryListEvent;
        list.onchange?.(event);

        for (const listener of [...listeners]) {
          listener(event);
        }
      },
    });

    return list;
  };
}

Object.defineProperty(window, "matchMedia", {
  configurable: true,
  writable: true,
  value: createMatchMedia(false),
});

afterEach(() => {
  cleanup();
  controllers.clear();
  delete document.documentElement.dataset.reducedMotion;
  window.sessionStorage.clear();
});
