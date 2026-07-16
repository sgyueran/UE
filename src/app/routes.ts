import type { ComponentType } from "react";

import { AboutPage } from "@/pages/AboutPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProjectsPage } from "@/pages/ProjectsPage";

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

export function matchRoute(pathname: string): AppRoute {
  const normalizedPath = normalizePath(pathname);
  return routes.find((route) => route.path === normalizedPath) ?? notFoundRoute;
}
