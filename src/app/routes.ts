import { lazy, type ComponentType } from "react";

import { HomePage } from "@/pages/HomePage";

const ProjectsPage = lazy(() =>
  import("@/pages/ProjectsPage").then((module) => ({ default: module.ProjectsPage })),
);
const ProjectDetailPage = lazy(() =>
  import("@/pages/ProjectDetailPage").then((module) => ({ default: module.ProjectDetailPage })),
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((module) => ({ default: module.AboutPage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })),
);

export type AppRoute = {
  path: string;
  label: string;
  component: ComponentType;
};

export const routes = [
  {
    path: "/",
    label: "Home",
    component: HomePage,
  },
  {
    path: "/projects",
    label: "Projects",
    component: ProjectsPage,
  },
  {
    path: "/projects/:slug",
    label: "Project detail",
    component: ProjectDetailPage,
  },
  {
    path: "/about",
    label: "About",
    component: AboutPage,
  },
] as const satisfies readonly AppRoute[];

export const notFoundRoute: AppRoute = {
  path: "*",
  label: "Not found",
  component: NotFoundPage,
};

export function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname || "/";
}

function routeMatches(routePath: string, pathname: string) {
  if (routePath === pathname) {
    return true;
  }

  if (!routePath.includes(":")) {
    return false;
  }

  const routeSegments = routePath.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    routeSegments.length === pathSegments.length &&
    routeSegments.every((segment, index) => segment.startsWith(":") || segment === pathSegments[index])
  );
}

export function matchRoute(pathname: string): AppRoute {
  const normalizedPath = normalizePath(pathname);
  return routes.find((route) => routeMatches(route.path, normalizedPath)) ?? notFoundRoute;
}
