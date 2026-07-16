export {
  canUseDesktopMotion,
  motionDurations,
  motionEase,
  motionSettings,
  shouldUseReducedMotion,
} from "./config";
export type { MotionCleanup } from "./gsapRuntime";
export { getGsapRegistrationState, markGsapReady } from "./gsapRuntime";
export { createNativeSmoothScrollController, installSmoothScroll } from "./smoothScroll";
export type { SmoothScrollController } from "./smoothScroll";
