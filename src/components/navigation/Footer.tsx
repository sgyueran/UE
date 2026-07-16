import { getPortfolioProfile, hasTodoUserInput } from "@/lib/content";
import type { ExternalLink, PortfolioProfile } from "@/types/content";

function isSafeText(value: string): boolean {
  return value.trim().length > 0 && !hasTodoUserInput(value) && value.trim() !== "#";
}

function isVerifiedPublicLink(link: ExternalLink): boolean {
  return link.verification === "verified" && link.publicationStatus === "public" && isSafeText(link.href);
}

function getPublicContact(profile: PortfolioProfile | null) {
  if (!profile || profile.verification !== "verified" || profile.publicationStatus !== "public") {
    return {
      email: null,
      links: [],
    };
  }

  return {
    email: isSafeText(profile.contact.email) ? profile.contact.email : null,
    links: profile.contact.links.filter(isVerifiedPublicLink),
  };
}

export function Footer() {
  const profile = getPortfolioProfile();
  const contact = getPublicContact(profile.data);

  return (
    <footer className="border-t border-border/75 py-lg">
      <div className="app-container flex flex-col gap-sm text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>UE Portfolio</p>
        <div className="flex flex-col gap-xs sm:items-end">
          {contact.email ? (
            <a
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              href={`mailto:${contact.email}`}
            >
              Email
            </a>
          ) : (
            <p>Public contact unavailable</p>
          )}
          {contact.links.length > 0 ? (
            <ul className="flex flex-wrap gap-sm sm:justify-end">
              {contact.links.map((link) => (
                <li key={link.id}>
                  <a
                    className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
