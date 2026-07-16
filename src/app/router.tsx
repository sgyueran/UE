import { useEffect, useMemo, useState } from "react";

import { PublicLayout } from "@/layouts/PublicLayout";

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
      <PublicLayout currentPath={path}>
        <RouteComponent />
      </PublicLayout>
    </ErrorBoundary>
  );
}
