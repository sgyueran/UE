import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { PublicLayout } from "@/layouts/PublicLayout";
import { SeoHead } from "@/lib/seo";

import { ErrorBoundary } from "./ErrorBoundary";
import { getCurrentPath, navigationEventName } from "./navigation";
import { matchRoute } from "./routes";

export function AppRouter() {
  const [path, setPath] = useState(getCurrentPath);
  const mainRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    const main = mainRef.current;

    if (!main) {
      return undefined;
    }

    function focusRouteHeading(): boolean {
      const heading = main?.querySelector("h1");

      if (!(heading instanceof HTMLElement) || heading.getClientRects().length === 0) {
        return false;
      }

      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      return document.activeElement === heading;
    }

    if (focusRouteHeading()) {
      return undefined;
    }

    const observer = new MutationObserver(() => {
      if (focusRouteHeading()) {
        observer.disconnect();
      }
    });

    observer.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [path]);

  const route = useMemo(() => matchRoute(path), [path]);
  const RouteComponent = route.component;

  return (
    <ErrorBoundary>
      <SeoHead path={path} />
      <PublicLayout currentPath={path} mainRef={mainRef}>
        <Suspense
          fallback={
            <div aria-live="polite" className="app-container py-section" role="status">
              <p className="text-sm text-muted">Loading…</p>
            </div>
          }
        >
          <RouteComponent />
        </Suspense>
      </PublicLayout>
    </ErrorBoundary>
  );
}
