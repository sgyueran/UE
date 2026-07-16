import { createContext, useContext } from "react";

import type { SmoothScrollController } from "@/lib/motion/smoothScroll";

export const SmoothScrollContext = createContext<SmoothScrollController | null>(null);

export function useSmoothScroll() {
  const controller = useContext(SmoothScrollContext);

  if (controller === null) {
    throw new Error("useSmoothScroll must be used inside SmoothScrollProvider.");
  }

  return controller;
}
