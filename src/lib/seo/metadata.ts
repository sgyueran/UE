import { deploymentConfig, safeMissingSeoFields, toCanonicalUrl, toPublicAssetPath } from "./deployment";

export type SeoMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: "index,follow" | "noindex,nofollow";
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: "website";
    image: null;
  };
  twitter: {
    card: "summary";
    title: string;
    description: string;
    image: null;
  };
  faviconPath: string;
  missingFields: readonly string[];
};

const pageCopy = {
  "/": {
    title: "Release preview | UE Portfolio",
    description:
      "Safe non-indexed release preview for a UE portfolio. Public indexing, author details, contact, resume, and social image metadata remain disabled until verified.",
  },
  "/projects": {
    title: "Verified project index | UE Portfolio",
    description:
      "Non-indexed project index preview. Private, draft, permission-pending, and unverified portfolio work stays withheld from publication metadata.",
  },
  "/about": {
    title: "About preview | UE Portfolio",
    description:
      "Non-indexed about page preview. Public identity, professional title, contact, and resume metadata remain pending verified user input.",
  },
  "project-detail": {
    title: "Project detail preview | UE Portfolio",
    description:
      "Non-indexed project detail preview. Canonical routing is available while unverified project facts and publication assets remain protected.",
  },
  "not-found": {
    title: "Page not found | UE Portfolio",
    description: "Non-indexed fallback page for unavailable portfolio routes.",
  },
} as const;

function getPageCopy(path: string) {
  if (path === "/" || path === "/projects" || path === "/about") {
    return pageCopy[path];
  }

  if (path.startsWith("/projects/")) {
    return pageCopy["project-detail"];
  }

  return pageCopy["not-found"];
}

export function createSeoMetadata(path: string): SeoMetadata {
  const copy = getPageCopy(path);
  const canonicalUrl = toCanonicalUrl(path);

  return {
    title: copy.title,
    description: copy.description,
    canonicalUrl,
    robots: deploymentConfig.indexingEnabled ? "index,follow" : "noindex,nofollow",
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: canonicalUrl,
      type: "website",
      image: null,
    },
    twitter: {
      card: "summary",
      title: copy.title,
      description: copy.description,
      image: null,
    },
    faviconPath: toPublicAssetPath("favicon.svg"),
    missingFields: safeMissingSeoFields,
  };
}
