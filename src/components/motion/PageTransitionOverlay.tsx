import { useReducedMotion } from "@/app/providers";
import { cn } from "@/lib/cn";

export type PageTransitionState = "idle" | "entering" | "exiting";

export type PageTransitionOverlayProps = {
  state?: PageTransitionState;
};

const stateClasses: Record<PageTransitionState, string> = {
  idle: "pointer-events-none opacity-0",
  entering: "opacity-100",
  exiting: "opacity-100",
};

export function PageTransitionOverlay({ state = "idle" }: PageTransitionOverlayProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-40 bg-background transition-opacity",
        prefersReducedMotion ? "duration-100" : "duration-[var(--duration-page)] ease-[var(--ease-standard)]",
        stateClasses[state],
      )}
      data-transition-state={state}
    />
  );
}
