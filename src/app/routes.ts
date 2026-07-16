import type { ComponentType } from "react";

import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

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
