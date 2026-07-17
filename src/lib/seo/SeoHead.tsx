import { useEffect } from "react";

import { createSeoMetadata } from "./metadata";

const managedAttribute = "data-seo-managed";

function appendMeta(attribute: "name" | "property", key: string, content: string) {
  const meta = document.createElement("meta");
  meta.setAttribute(attribute, key);
  meta.content = content;
  meta.setAttribute(managedAttribute, "true");
  document.head.append(meta);
}

function appendLink(rel: string, href: string) {
  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  link.setAttribute(managedAttribute, "true");
  document.head.append(link);
}

export function SeoHead({ path }: { readonly path: string }) {
  useEffect(() => {
    const metadata = createSeoMetadata(path);
    document.head.querySelectorAll(`[${managedAttribute}="true"]`).forEach((node) => node.remove());
    document.title = metadata.title;

    appendMeta("name", "description", metadata.description);
    appendMeta("name", "robots", metadata.robots);
    appendMeta("name", "twitter:card", metadata.twitter.card);
    appendMeta("name", "twitter:title", metadata.twitter.title);
    appendMeta("name", "twitter:description", metadata.twitter.description);
    appendMeta("property", "og:title", metadata.openGraph.title);
    appendMeta("property", "og:description", metadata.openGraph.description);
    appendMeta("property", "og:type", metadata.openGraph.type);
    appendMeta("property", "og:url", metadata.openGraph.url);
    appendLink("canonical", metadata.canonicalUrl);
    appendLink("icon", metadata.faviconPath);
  }, [path]);

  return null;
}
