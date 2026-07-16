import { useState } from "react";

import { getPublicPortfolioProjects } from "@/lib/content";

import { ProjectListMediaPreview } from "./ProjectListMediaPreview";

const allFilter = "all";

export function ProjectsListing() {
  const publicProjects = getPublicPortfolioProjects();
  const projects = publicProjects.data ?? [];
  const [activeFilter, setActiveFilter] = useState(allFilter);
  const filterValues = new Set<string>();

  projects.forEach((project) => {
    filterValues.add(project.type);
    project.unrealDomains.forEach((domain) => filterValues.add(domain));
  });

  const filterOptions = Array.from(filterValues).sort((a, b) => a.localeCompare(b));
  const filteredProjects =
    activeFilter === allFilter
      ? projects
      : projects.filter(
          (project) => project.type === activeFilter || project.unrealDomains.some((domain) => domain === activeFilter),
        );

  return (
    <section aria-labelledby="projects-list-title" className="app-container py-section">
      <div className="max-w-[48rem]">
        <p className="mb-sm text-sm font-semibold uppercase text-primary">Projects</p>
        <h1 className="text-4xl font-semibold leading-tight text-text md:text-6xl" id="projects-list-title">
          Verified project index
        </h1>
        <p className="mt-md text-base leading-7 text-muted">
          This page lists only projects that pass publication safety checks. Private, draft, TODO, and
          permission-pending work is intentionally withheld.
        </p>
      </div>

      {projects.length > 0 ? (
        <div aria-label="Project filters" className="mt-xl flex flex-wrap gap-sm">
          <button
            aria-pressed={activeFilter === allFilter}
            className="min-h-10 rounded-pill border border-primary bg-primary px-md text-sm font-medium text-white focus-visible:outline-primary"
            onClick={() => setActiveFilter(allFilter)}
            type="button"
          >
            All
          </button>
          {filterOptions.map((option) => (
            <button
              aria-pressed={activeFilter === option}
              className={
                activeFilter === option
                  ? "min-h-10 rounded-pill border border-primary bg-primary px-md text-sm font-medium text-white focus-visible:outline-primary"
                  : "min-h-10 rounded-pill border border-border bg-card px-md text-sm font-medium text-muted hover:text-text focus-visible:outline-primary"
              }
              key={option}
              onClick={() => setActiveFilter(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {projects.length > 0 ? (
        <div className="mt-2xl grid gap-lg md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article className="rounded-lg border border-border bg-card p-lg" key={project.id}>
              <ProjectListMediaPreview project={project} />
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{project.type}</p>
              <h2 className="mt-md text-2xl font-semibold text-text">{project.title}</h2>
              <p className="mt-sm text-sm leading-6 text-muted">{project.overview}</p>
              <dl className="mt-lg grid gap-sm text-sm text-muted">
                <div>
                  <dt className="font-medium text-text">Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt className="font-medium text-text">Unreal domains</dt>
                  <dd>{project.unrealDomains.join(", ")}</dd>
                </div>
              </dl>
            </article>
          ))}
          {filteredProjects.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card/60 p-xl md:col-span-2">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">No filter matches</p>
              <p className="mt-md text-sm leading-6 text-muted">The selected filter has no public verified projects.</p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-2xl rounded-lg border border-dashed border-border bg-card/60 p-xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">No public projects</p>
          <h2 className="mt-md text-2xl font-semibold text-text">Project entries are unavailable until verified.</h2>
          <p className="mt-sm max-w-[42rem] text-sm leading-6 text-muted">
            Add verified project titles, responsibilities, media permissions, outcomes, and evidence sources before
            publishing project cards here.
          </p>
        </div>
      )}
    </section>
  );
}
