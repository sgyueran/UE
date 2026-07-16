import { getPortfolioProfile } from "@/lib/content";
import type { ExternalLink } from "@/types/content";

function isSafeHref(value: string): boolean {
  return value.trim().length > 0 && value !== "TODO(USER_INPUT)" && value !== "#";
}

function isPublicVerifiedLink(link: ExternalLink): boolean {
  return link.verification === "verified" && link.publicationStatus === "public" && isSafeHref(link.href);
}

export function HomeContactResume() {
  const profile = getPortfolioProfile().data;
  const email = profile?.contact.email;
  const publicLinks = profile?.contact.links.filter(isPublicVerifiedLink) ?? [];
  const resume = profile?.contact.resume;
  const hasEmail = Boolean(email && isSafeHref(email) && profile?.publicationStatus === "public");
  const hasResume = Boolean(resume?.publicationStatus === "public" && isSafeHref(resume.path) && resume.checklistComplete);

  return (
    <section aria-labelledby="contact-title" className="app-container py-section" id="contact">
      <div className="grid gap-2xl lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="mb-sm text-sm font-semibold uppercase text-primary">Contact and resume</p>
          <h2 className="text-3xl font-semibold leading-tight text-text md:text-4xl" id="contact-title">
            Contact paths stay closed until public details are verified.
          </h2>
          <p className="mt-md text-base leading-7 text-muted">
            This section is ready for recruiting and engineering review, but it will not publish fake email addresses,
            placeholder resume downloads, or private profile links.
          </p>
        </div>

        <div className="grid gap-md">
          <div className="rounded-lg border border-border bg-card/72 p-lg">
            <h3 className="text-lg font-semibold text-text">Direct contact</h3>
            {hasEmail ? (
              <a
                className="mt-md inline-flex min-h-11 items-center justify-center rounded-pill border border-primary bg-primary px-lg text-sm font-medium text-white hover:bg-primary/90 focus-visible:outline-primary"
                href={`mailto:${email}`}
              >
                Email
              </a>
            ) : (
              <p className="mt-md inline-flex min-h-11 items-center rounded-pill border border-border px-lg text-sm font-medium text-muted">
                Public email pending
              </p>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card/72 p-lg">
            <h3 className="text-lg font-semibold text-text">Resume</h3>
            {hasResume ? (
              <a
                className="mt-md inline-flex min-h-11 items-center justify-center rounded-pill border border-primary bg-primary px-lg text-sm font-medium text-white hover:bg-primary/90 focus-visible:outline-primary"
                href={resume?.path}
              >
                Download resume
              </a>
            ) : (
              <p className="mt-md inline-flex min-h-11 items-center rounded-pill border border-border px-lg text-sm font-medium text-muted">
                Resume file pending
              </p>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card/72 p-lg">
            <h3 className="text-lg font-semibold text-text">Public profiles</h3>
            {publicLinks.length > 0 ? (
              <ul className="mt-md grid gap-sm">
                {publicLinks.map((link) => (
                  <li key={link.id}>
                    <a className="text-sm font-medium text-primary hover:text-text focus-visible:outline-primary" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-md text-sm leading-6 text-muted">No public profile links are verified yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
