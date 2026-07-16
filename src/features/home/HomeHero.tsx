import { getPortfolioContentModel } from "@/lib/content";

function isSafeText(value: string): boolean {
  return value.trim().length > 0 && value !== "TODO(USER_INPUT)";
}

export function HomeHero() {
  const content = getPortfolioContentModel();
  const profile = content.profile.data;
  const title = profile?.professionalTitle ?? "UE5 Engineer";
  const displayName = profile && isSafeText(profile.displayName) ? profile.displayName : "Portfolio owner pending verification";
  const intro =
    profile && isSafeText(profile.shortIntroduction)
      ? profile.shortIntroduction
      : "A verified UE5 engineering portfolio is being assembled from approved project evidence, media permissions, and public contact details.";
  const hasPublicProjects = content.publicProjects.status === "ready" && Boolean(content.publicProjects.data?.length);
  const hasPublicResume = profile?.contact.resume.publicationStatus === "public" && isSafeText(profile.contact.resume.path);
  const issueCount = content.release.issues.length;

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate overflow-hidden border-b border-border/70 bg-background"
    >
      <div className="absolute inset-0 -z-10 opacity-70" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-primary/50" />
        <div className="absolute left-1/2 top-10 h-72 w-[min(48rem,92vw)] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,244,245,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(244,244,245,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="app-container grid min-h-[calc(100svh-4rem)] items-center gap-2xl py-section lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="max-w-4xl">
          <p className="mb-md font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Verified content pipeline / public release pending
          </p>
          <h1
            className="max-w-4xl text-5xl font-semibold leading-[0.95] text-text sm:text-6xl lg:text-7xl"
            id="home-hero-title"
          >
            {title}
          </h1>
          <p className="mt-lg max-w-2xl text-lg leading-8 text-muted sm:text-xl">{intro}</p>

          <div className="mt-xl flex flex-col gap-sm sm:flex-row">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-pill border border-primary bg-primary px-lg text-sm font-medium text-white transition duration-200 ease-[var(--ease-standard)] hover:bg-primary/90 focus-visible:outline-primary"
              href="#portfolio-readiness"
            >
              Review readiness
            </a>
            <span
              aria-disabled="true"
              className="inline-flex min-h-11 items-center justify-center rounded-pill border border-border bg-card px-lg text-sm font-medium text-muted"
            >
              Resume pending verified file
            </span>
          </div>
        </div>

        <aside
          aria-label="Portfolio publication status"
          className="rounded-lg border border-border/80 bg-card/82 p-lg backdrop-blur-md"
          id="portfolio-readiness"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Identity</p>
          <p className="mt-sm text-2xl font-semibold text-text">{displayName}</p>
          <dl className="mt-lg grid gap-md text-sm">
            <div>
              <dt className="text-muted">Public projects</dt>
              <dd className="mt-xs font-medium text-text">{hasPublicProjects ? "Available" : "Unavailable until verified"}</dd>
            </div>
            <div>
              <dt className="text-muted">Resume</dt>
              <dd className="mt-xs font-medium text-text">{hasPublicResume ? "Available" : "Pending public file"}</dd>
            </div>
            <div>
              <dt className="text-muted">Release checks</dt>
              <dd className="mt-xs font-medium text-text">{issueCount} open content gate{issueCount === 1 ? "" : "s"}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
