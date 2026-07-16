import { useEffect, useMemo, type ReactNode } from "react";

import {
  createNativeSmoothScrollController,
  installSmoothScroll,
} from "@/lib/motion/smoothScroll";

import { SmoothScrollContext } from "./smoothScrollContext";

export type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const controller = useMemo(() => createNativeSmoothScrollController(), []);

  useEffect(() => installSmoothScroll(controller), [controller]);

  return <SmoothScrollContext value={controller}>{children}</SmoothScrollContext>;
}
