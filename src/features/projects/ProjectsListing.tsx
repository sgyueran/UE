import { getPublicPortfolioProjects } from "@/lib/content";

export function ProjectsListing() {
  const publicProjects = getPublicPortfolioProjects();
  const projects = publicProjects.data ?? [];

  return (
    <section aria-labelledby="projects-list-title" className="app-container py-section">
      <div className="max-w-3xl">
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
        <div className="mt-2xl grid gap-lg md:grid-cols-2">
          {projects.map((project) => (
            <article className="rounded-lg border border-border bg-card p-lg" key={project.id}>
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
        </div>
      ) : (
        <div className="mt-2xl rounded-lg border border-dashed border-border bg-card/60 p-xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">No public projects</p>
          <h2 className="mt-md text-2xl font-semibold text-text">Project entries are unavailable until verified.</h2>
          <p className="mt-sm max-w-2xl text-sm leading-6 text-muted">
            Add verified project titles, responsibilities, media permissions, outcomes, and evidence sources before
            publishing project cards here.
          </p>
        </div>
      )}
    </section>
  );
}
