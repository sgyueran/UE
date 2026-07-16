import { useReducedMotion } from "@/app/providers";
import { cn } from "@/lib/cn";

export type AppLoaderProps = {
  isVisible?: boolean;
};

export function AppLoader({ isVisible = true }: AppLoaderProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-50 grid place-items-center bg-background text-text"
      role="status"
    >
      <div className="flex flex-col items-center gap-md">
        <span
          className={cn(
            "size-12 rounded-pill border-2 border-border border-t-primary",
            prefersReducedMotion ? "" : "motion-safe:animate-spin",
          )}
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-muted">Loading</span>
      </div>
    </div>
  );
}
