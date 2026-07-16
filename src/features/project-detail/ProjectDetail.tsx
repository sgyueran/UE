import { getPublicPortfolioProjects } from "@/lib/content";
import type { PortfolioProject } from "@/types/content";

type ProjectDetailState =
  | {
      kind: "missing-slug";
    }
  | {
      kind: "no-public-projects";
    }
  | {
      kind: "not-found";
    }
  | {
      kind: "ready";
      project: PortfolioProject;
    };

function getCurrentSlug(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const normalizedPath = window.location.pathname.replace(/\/+$/, "");
  const match = /^\/projects\/([^/]+)$/.exec(normalizedPath);

  if (!match) {
    return null;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function getProjectDetailState(): ProjectDetailState {
  const slug = getCurrentSlug();
  const publicProjects = getPublicPortfolioProjects();

  if (!slug) {
    return { kind: "missing-slug" };
  }

  if (publicProjects.status !== "ready" || !publicProjects.data?.length) {
    return { kind: "no-public-projects" };
  }

  const project = publicProjects.data.find((candidate) => candidate.slug === slug);

  if (!project) {
    return { kind: "not-found" };
  }

  return {
    kind: "ready",
    project,
  };
}

function ProjectUnavailable({ reason }: { reason: "missing-slug" | "no-public-projects" | "not-found" }) {
  const title =
    reason === "no-public-projects"
      ? "Project details are unavailable until verified."
      : "This project is not available for public viewing.";
  const description =
    reason === "no-public-projects"
      ? "No project currently passes the verified and public publication gate. Detail pages stay closed until title, ownership, media permissions, outcomes, and evidence sources are approved."
      : "The requested project slug does not match a verified public project. No private, draft, TODO, or permission-pending project data is shown.";

  return (
    <section aria-labelledby="project-detail-unavailable-title" className="app-container py-section">
      <p className="mb-sm text-sm font-semibold uppercase text-primary">Project detail</p>
      <div className="rounded-lg border border-dashed border-border bg-card/60 p-xl">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Unavailable</p>
        <h1 className="mt-md max-w-[42rem] text-3xl font-semibold leading-tight text-text md:text-5xl" id="project-detail-unavailable-title">
          {title}
        </h1>
        <p className="mt-md max-w-[42rem] text-sm leading-6 text-muted">{description}</p>
      </div>
    </section>
  );
}

function ProjectReady({ project }: { project: PortfolioProject }) {
  const hasPublicMedia = project.media.length > 0;

  return (
    <article className="app-container py-section">
      <header className="max-w-[48rem]">
        <p className="mb-sm text-sm font-semibold uppercase text-primary">Project detail</p>
        <h1 className="text-4xl font-semibold leading-tight text-text md:text-6xl">{project.title}</h1>
        <p className="mt-md text-base leading-7 text-muted">{project.overview}</p>
      </header>

      <div className="mt-2xl grid gap-lg lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="project-detail-foundation-title" className="rounded-lg border border-border bg-card p-lg">
          <h2 className="text-2xl font-semibold text-text" id="project-detail-foundation-title">
            Verified foundation
          </h2>
          <dl className="mt-lg grid gap-md text-sm text-muted">
            <div>
              <dt className="font-medium text-text">Problem</dt>
              <dd className="mt-xs leading-6">{project.problem}</dd>
            </div>
            <div>
              <dt className="font-medium text-text">Constraints</dt>
              <dd className="mt-xs leading-6">{project.constraints}</dd>
            </div>
            <div>
              <dt className="font-medium text-text">Public evidence state</dt>
              <dd className="mt-xs leading-6">Only verified public fields are rendered on this page.</dd>
            </div>
          </dl>
        </section>

        <aside aria-labelledby="project-detail-media-title" className="rounded-lg border border-border bg-card p-lg">
          <h2 className="text-lg font-semibold text-text" id="project-detail-media-title">
            Media
          </h2>
          <p className="mt-md text-sm leading-6 text-muted">
            {hasPublicMedia
              ? "Verified public media is available for later gallery, video, or viewer modules."
              : "No verified public media is attached. The detail page remains readable without image, video, or model assets."}
          </p>
        </aside>
      </div>
    </article>
  );
}

export function ProjectDetail() {
  const state = getProjectDetailState();

  if (state.kind === "ready") {
    return <ProjectReady project={state.project} />;
  }

  return <ProjectUnavailable reason={state.kind} />;
}
