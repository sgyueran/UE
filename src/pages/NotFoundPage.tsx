import { RouteLink } from "@/app/RouteLink";

export function NotFoundPage() {
  return (
    <div className="app-container py-section">
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-sm text-4xl font-semibold text-text">Page not found</h1>
      <p className="mt-md max-w-2xl text-base leading-7 text-muted">
        This route is not available. Use the main navigation or return home.
      </p>
      <RouteLink
        className="mt-lg inline-flex rounded-pill border border-border bg-card px-lg py-sm text-sm font-medium text-text transition duration-200 ease-[var(--ease-standard)] hover:border-primary/60 hover:bg-surface"
        href="/"
      >
        Return home
      </RouteLink>
    </div>
  );
}
