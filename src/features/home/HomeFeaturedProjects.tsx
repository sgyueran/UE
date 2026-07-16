import { getPublicPortfolioProjects } from "@/lib/content";

import { HomeProjectRail } from "./HomeProjectRail";

export function HomeFeaturedProjects() {
  const publicProjects = getPublicPortfolioProjects();
  const projects = publicProjects.data ?? [];

  return (
    <section aria-labelledby="featured-projects-title" className="border-y border-border/70 bg-surface/40">
      <div className="app-container py-section" id="selected-work">
        <div className="flex flex-col gap-md md:flex-row md:items-end md:justify-between">
          <div className="max-w-[48rem]">
            <p className="mb-sm text-sm font-semibold uppercase text-primary">Selected work</p>
            <h2 className="text-3xl font-semibold leading-tight text-text md:text-4xl" id="featured-projects-title">
              Public project evidence will appear only after verification.
            </h2>
            <p className="mt-md text-base leading-7 text-muted">
              Featured work is sourced through the portfolio publication safety model. Unverified, private, or
              permission-pending projects stay out of the public showcase.
            </p>
          </div>
          <span
            aria-disabled="true"
            className="inline-flex min-h-11 items-center justify-center rounded-pill border border-border bg-card px-lg text-sm font-medium text-muted"
          >
            Projects page pending
          </span>
        </div>

        {projects.length > 0 ? (
          <HomeProjectRail projects={projects} />
        ) : (
          <div className="mt-2xl rounded-lg border border-dashed border-border bg-background/55 p-xl">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Empty public showcase</p>
            <p className="mt-md max-w-[42rem] text-xl font-semibold text-text">No verified public projects are available yet.</p>
            <p className="mt-sm max-w-[42rem] text-sm leading-6 text-muted">
              Project cards will remain unavailable until project title, role, media permissions, outcomes, and evidence
              sources pass the publication gate.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
