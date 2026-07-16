import { shouldUseReducedMotion } from "./config";
import type { MotionCleanup } from "./gsapRuntime";

export type SmoothScrollController = {
  scrollTo: (target: number | string) => void;
  stop: () => void;
  start: () => void;
};

export function createNativeSmoothScrollController(): SmoothScrollController {
  return {
    scrollTo(target) {
      const behavior: ScrollBehavior = shouldUseReducedMotion() ? "auto" : "smooth";

      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior });
        return;
      }

      document.querySelector(target)?.scrollIntoView({ behavior, block: "start" });
    },
    start() {
      document.documentElement.dataset.smoothScroll = "enabled";
    },
    stop() {
      delete document.documentElement.dataset.smoothScroll;
    },
  };
}

export function installSmoothScroll(controller: SmoothScrollController): MotionCleanup {
  if (shouldUseReducedMotion()) {
    controller.stop();
    return () => controller.stop();
  }

  controller.start();

  return () => controller.stop();
}
