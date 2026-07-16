import { motion } from "@/styles/tokens";

export const motionDurations = {
  fast: `${motion.duration.fast}s`,
  normal: `${motion.duration.normal}s`,
  slow: `${motion.duration.slow}s`,
  page: `${motion.duration.page}s`,
} as const;

export const motionEase = motion.ease;

export const motionSettings = {
  reducedMotionQuery: "(prefers-reduced-motion: reduce)",
  touchPointerQuery: "(pointer: coarse)",
  minDesktopMotionWidth: 768,
  scrollTriggerRefreshDelayMs: 120,
} as const;

export function shouldUseReducedMotion() {
  return window.matchMedia(motionSettings.reducedMotionQuery).matches;
}

export function canUseDesktopMotion() {
  return (
    window.innerWidth >= motionSettings.minDesktopMotionWidth &&
    !window.matchMedia(motionSettings.touchPointerQuery).matches &&
    !shouldUseReducedMotion()
  );
}
