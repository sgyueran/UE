import { useEffect, useState, type ReactNode } from "react";

import { motionSettings } from "@/lib/motion";

import { ReducedMotionContext } from "./reducedMotionContext";

export type ReducedMotionProviderProps = {
  children: ReactNode;
};

function getInitialReducedMotion() {
  return window.matchMedia(motionSettings.reducedMotionQuery).matches;
}

export function ReducedMotionProvider({ children }: ReducedMotionProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia(motionSettings.reducedMotionQuery);
    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
      document.documentElement.dataset.reducedMotion = mediaQuery.matches ? "true" : "false";
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
      delete document.documentElement.dataset.reducedMotion;
    };
  }, []);

  return <ReducedMotionContext value={prefersReducedMotion}>{children}</ReducedMotionContext>;
}
