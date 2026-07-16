import { Suspense, useEffect, useMemo, useState } from "react";

import { PublicLayout } from "@/layouts/PublicLayout";
import { SeoHead } from "@/lib/seo";

import { ErrorBoundary } from "./ErrorBoundary";
import { getCurrentPath, navigationEventName } from "./navigation";
import { matchRoute } from "./routes";

export function AppRouter() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const syncPath = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener("popstate", syncPath);
    window.addEventListener(navigationEventName, syncPath);

    return () => {
      window.removeEventListener("popstate", syncPath);
      window.removeEventListener(navigationEventName, syncPath);
    };
  }, []);

  const route = useMemo(() => matchRoute(path), [path]);
  const RouteComponent = route.component;

  return (
    <ErrorBoundary>
      <SeoHead path={path} />
      <PublicLayout currentPath={path}>
        <Suspense
          fallback={
            <main className="app-container py-section">
              <p className="text-sm text-muted">Loading…</p>
            </main>
          }
        >
          <RouteComponent />
        </Suspense>
      </PublicLayout>
    </ErrorBoundary>
  );
}
