import type { NavigationModel } from "@/types/content";

const routeProvenance = {
  status: "verified",
  source: "src/app/routes.ts",
  note: "Current public route registry exposes the home route only.",
} as const;

export const navigationModel = {
  primary: [
    {
      id: "home",
      label: "Home",
      path: "/",
      order: 0,
      isPrimary: true,
      provenance: routeProvenance,
    },
  ],
  utility: [],
} as const satisfies NavigationModel;
