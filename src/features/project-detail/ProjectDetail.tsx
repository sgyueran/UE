import { useEffect, useRef, useState } from "react";

import { getPublicPortfolioProjects } from "@/lib/content";
import { TODO_USER_INPUT } from "@/types/content";
import type { PortfolioProject, ProjectMedia } from "@/types/content";

let scrollTriggerRegistered = false;

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

function isVerifiedText(value: string) {
  const trimmedValue = value.trim();

  return trimmedValue.length > 0 && trimmedValue !== TODO_USER_INPUT;
}

function renderVerifiedText(value: string, fallback = "Unavailable") {
  return isVerifiedText(value) ? value : fallback;
}

function getVerifiedTextItems(values: readonly string[]) {
  return values.filter(isVerifiedText);
}

function getVerifiedPublicMedia(media: readonly ProjectMedia[]) {
  return media.find(
    (item) =>
      item.publicationStatus === "public" &&
      item.provenance.status === "verified" &&
      isVerifiedText(item.src) &&
      isVerifiedText(item.alt),
  );
}

function getVerifiedPublicMediaByType(media: readonly ProjectMedia[], type: ProjectMedia["type"]) {
  return media.filter(
    (item) =>
      item.type === type &&
      item.publicationStatus === "public" &&
      item.provenance.status === "verified" &&
      isVerifiedText(item.src) &&
      isVerifiedText(item.alt),
  );
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

function ProjectHeroMedia({ media }: { media: ProjectMedia | undefined }) {
  if (!media) {
    return (
      <div className="flex min-h-[18rem] flex-col justify-end rounded-lg border border-dashed border-border bg-surface p-lg md:min-h-[26rem]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Media unavailable</p>
        <p className="mt-sm max-w-[28rem] text-sm leading-6 text-muted">
          Verified public media has not been approved for this project yet. The project story remains readable without a visual asset.
        </p>
      </div>
    );
  }

  if (media.type === "image") {
    return (
      <figure className="overflow-hidden rounded-lg border border-border bg-surface">
        <img alt={media.alt} className="aspect-[16/10] w-full object-cover" loading="eager" src={media.src} />
        <figcaption className="border-t border-border px-md py-sm text-xs leading-5 text-muted">{media.alt}</figcaption>
      </figure>
    );
  }

  if (media.type === "video") {
    return (
      <figure className="overflow-hidden rounded-lg border border-border bg-surface">
        <video
          className="aspect-[16/10] w-full object-cover"
          controls
          muted
          playsInline
          poster={isVerifiedText(media.poster ?? "") ? media.poster : undefined}
          preload="metadata"
          src={media.src}
        >
          <track kind="captions" label="Captions unavailable" />
        </video>
        <figcaption className="border-t border-border px-md py-sm text-xs leading-5 text-muted">{media.alt}</figcaption>
      </figure>
    );
  }

  return (
    <div className="flex min-h-[18rem] flex-col justify-end rounded-lg border border-border bg-surface p-lg md:min-h-[26rem]">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{media.type}</p>
      <p className="mt-sm max-w-[28rem] text-sm leading-6 text-muted">
        {media.alt}. Interactive media will load in its dedicated section when the viewer contract is available.
      </p>
    </div>
  );
}

function ProjectMetadata({ project }: { project: PortfolioProject }) {
  const verifiedDomains = getVerifiedTextItems(project.unrealDomains);
  const metadata = [
    ["Role", project.role],
    ["Unreal Engine", project.unrealEngineVersion],
    ["Timeline", project.dateRange],
    ["Team size", project.teamSize],
    ["C++ / Blueprint", project.cppBlueprintSplit],
  ] as const;

  return (
    <aside aria-labelledby="project-metadata-title" className="rounded-lg border border-border bg-card p-lg">
      <h2 className="text-lg font-semibold text-text" id="project-metadata-title">
        Project metadata
      </h2>
      <dl className="mt-lg grid gap-md text-sm">
        {metadata.map(([label, value]) => (
          <div key={label}>
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
            <dd className="mt-xs leading-6 text-text">{renderVerifiedText(value)}</dd>
          </div>
        ))}
      </dl>
      {verifiedDomains.length > 0 ? (
        <ul className="mt-lg flex flex-wrap gap-xs" aria-label="Verified Unreal domains">
          {verifiedDomains.map((domain) => (
            <li className="rounded-full border border-border px-sm py-xs text-xs text-muted" key={domain}>
              {domain}
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}

function ProjectResponsibilities({ project }: { project: PortfolioProject }) {
  const responsibilities = getVerifiedTextItems(project.responsibilities);

  return (
    <section aria-labelledby="project-responsibilities-title" className="rounded-lg border border-border bg-card p-lg">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Ownership</p>
      <h2 className="mt-sm text-2xl font-semibold text-text" id="project-responsibilities-title">
        Responsibilities
      </h2>
      {responsibilities.length > 0 ? (
        <ul className="mt-lg grid gap-sm text-sm leading-6 text-muted">
          {responsibilities.map((responsibility) => (
            <li className="border-l border-border pl-md" key={responsibility}>
              {responsibility}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-md text-sm leading-6 text-muted">
          Verified responsibility details are unavailable. This section does not infer ownership, team scope, or production duties.
        </p>
      )}
    </section>
  );
}

function ProjectTechnology({ project }: { project: PortfolioProject }) {
  const domains = getVerifiedTextItems(project.unrealDomains);
  const tools = getVerifiedTextItems(project.toolsCreated);
  const hasCppBlueprintSplit = isVerifiedText(project.cppBlueprintSplit);
  const hasTechnology = domains.length > 0 || tools.length > 0 || hasCppBlueprintSplit;

  return (
    <section aria-labelledby="project-technology-title" className="rounded-lg border border-border bg-card p-lg">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Technology</p>
      <h2 className="mt-sm text-2xl font-semibold text-text" id="project-technology-title">
        Verified technical scope
      </h2>
      {hasTechnology ? (
        <div className="mt-lg grid gap-lg md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-text">UE domains</h3>
            {domains.length > 0 ? (
              <ul className="mt-sm flex flex-wrap gap-xs">
                {domains.map((domain) => (
                  <li className="rounded-full border border-border px-sm py-xs text-xs text-muted" key={domain}>
                    {domain}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-sm text-sm leading-6 text-muted">Unavailable</p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">C++ / Blueprint</h3>
            <p className="mt-sm text-sm leading-6 text-muted">{renderVerifiedText(project.cppBlueprintSplit)}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">Tools created</h3>
            {tools.length > 0 ? (
              <ul className="mt-sm grid gap-xs text-sm leading-6 text-muted">
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-sm text-sm leading-6 text-muted">Unavailable</p>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-md text-sm leading-6 text-muted">
          Verified technology details are unavailable. No unsupported engine domain, tool, or implementation claim is published.
        </p>
      )}
    </section>
  );
}

function hasVerifiedOutcome(project: PortfolioProject) {
  return (
    project.outcome.provenance.status === "verified" &&
    isVerifiedText(project.outcome.summary) &&
    isVerifiedText(project.outcome.evidenceSource)
  );
}

function NarrativeBlock({ label, title, children }: { label: string; title: string; children: string }) {
  return (
    <section className="rounded-lg border border-border bg-card p-lg">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{label}</p>
      <h2 className="mt-sm text-2xl font-semibold text-text">{title}</h2>
      <p className="mt-md text-sm leading-6 text-muted">{children}</p>
    </section>
  );
}

function ProjectTechnicalStory({ project }: { project: PortfolioProject }) {
  const contribution = getVerifiedTextItems(project.responsibilities).join(" ");
  const outcomeIsVerified = hasVerifiedOutcome(project);

  return (
    <section aria-labelledby="project-technical-story-title" className="mt-lg">
      <div className="max-w-[44rem]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Technical story</p>
        <h2 className="mt-sm text-3xl font-semibold text-text" id="project-technical-story-title">
          Challenge, solution, and evidence
        </h2>
        <p className="mt-md text-sm leading-6 text-muted">
          These sections publish only verified project facts. Missing evidence remains unavailable instead of becoming a claim.
        </p>
      </div>

      <div className="mt-lg grid gap-lg lg:grid-cols-2">
        <NarrativeBlock label="Challenge" title="Problem to solve">
          {renderVerifiedText(project.problem)}
        </NarrativeBlock>
        <NarrativeBlock label="Constraints" title="Production boundaries">
          {renderVerifiedText(project.constraints)}
        </NarrativeBlock>
        <NarrativeBlock label="Solution" title="System direction">
          {renderVerifiedText(project.systemDesign)}
        </NarrativeBlock>
        <NarrativeBlock label="Contribution" title="Verified ownership">
          {contribution.length > 0 ? contribution : "Unavailable"}
        </NarrativeBlock>
      </div>

      <section aria-labelledby="project-outcome-title" className="mt-lg rounded-lg border border-border bg-card p-lg">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Outcome</p>
        <h3 className="mt-sm text-2xl font-semibold text-text" id="project-outcome-title">
          Evidence-backed result
        </h3>
        {outcomeIsVerified ? (
          <div className="mt-md grid gap-md text-sm leading-6 text-muted md:grid-cols-[minmax(0,1fr)_18rem]">
            <p>{project.outcome.summary}</p>
            <p className="rounded-lg border border-border bg-surface p-md font-mono text-xs uppercase tracking-[0.12em] text-muted">
              Evidence: {project.outcome.evidenceSource}
            </p>
          </div>
        ) : (
          <p className="mt-md text-sm leading-6 text-muted">
            Verified outcome evidence is unavailable. No metric, optimization ratio, team result, or business result is published.
          </p>
        )}
      </section>
    </section>
  );
}

function getNarrativeItems(project: PortfolioProject) {
  return [
    {
      label: "01",
      title: "Problem frame",
      body: project.problem,
    },
    {
      label: "02",
      title: "Constraint frame",
      body: project.constraints,
    },
    {
      label: "03",
      title: "System direction",
      body: project.systemDesign,
    },
    {
      label: "04",
      title: "Implementation",
      body: project.implementation,
    },
    {
      label: "05",
      title: "Optimization",
      body: project.optimization,
    },
    {
      label: "06",
      title: "Reflection",
      body: project.reflection,
    },
  ].filter((item) => isVerifiedText(item.body));
}

function ProjectScrollNarrative({ project }: { project: PortfolioProject }) {
  const rootRef = useRef<HTMLElement>(null);
  const narrativeItems = getNarrativeItems(project);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || narrativeItems.length === 0) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileLayout = window.matchMedia("(max-width: 1023px)").matches;

    if (reducedMotion || mobileLayout) {
      return undefined;
    }

    let disposed = false;
    let context: { revert: () => void } | null = null;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, scrollTriggerModule]) => {
      if (disposed) {
        return;
      }

      const { gsap } = gsapModule;
      const { ScrollTrigger } = scrollTriggerModule;

      if (!scrollTriggerRegistered) {
        gsap.registerPlugin(ScrollTrigger);
        scrollTriggerRegistered = true;
      }

      context = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-project-narrative-panel]");

        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { autoAlpha: 0.72, y: 24 },
            {
              autoAlpha: 1,
              duration: 0.42,
              ease: "power2.out",
              scrollTrigger: {
                end: "top 45%",
                start: "top 82%",
                toggleActions: "play none none reverse",
                trigger: panel,
              },
              y: 0,
            },
          );
        });
      }, root);
    });

    return () => {
      disposed = true;
      context?.revert();
    };
  }, [narrativeItems.length]);

  if (narrativeItems.length === 0) {
    return (
      <section aria-labelledby="project-scroll-narrative-title" className="mt-lg rounded-lg border border-dashed border-border bg-card/60 p-lg">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Scroll narrative</p>
        <h2 className="mt-sm text-2xl font-semibold text-text" id="project-scroll-narrative-title">
          Narrative unavailable
        </h2>
        <p className="mt-md max-w-[42rem] text-sm leading-6 text-muted">
          Verified technical narrative fields are unavailable. The page keeps its normal document flow without empty sticky panels.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="project-scroll-narrative-title" className="mt-lg grid gap-lg lg:grid-cols-[18rem_minmax(0,1fr)]" ref={rootRef}>
      <aside className="self-start rounded-lg border border-border bg-card p-lg lg:sticky lg:top-24">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Scroll narrative</p>
        <h2 className="mt-sm text-2xl font-semibold text-text" id="project-scroll-narrative-title">
          Technical reading path
        </h2>
        <p className="mt-md text-sm leading-6 text-muted">
          Sticky context is a reading aid only. Content remains in normal order on mobile and when reduced motion is requested.
        </p>
      </aside>

      <div className="grid gap-md">
        {narrativeItems.map((item) => (
          <section className="rounded-lg border border-border bg-card p-lg" data-project-narrative-panel key={item.label}>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{item.label}</p>
            <h3 className="mt-sm text-2xl font-semibold text-text">{item.title}</h3>
            <p className="mt-md text-sm leading-6 text-muted">{item.body}</p>
          </section>
        ))}
      </div>
    </section>
  );
}

function ProjectGallery({ project }: { project: PortfolioProject }) {
  const images = getVerifiedPublicMediaByType(project.media, "image");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  function closeLightbox() {
    setActiveIndex(null);
  }

  function openLightbox(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setActiveIndex(index);
  }

  function showPreviousImage() {
    setActiveIndex((currentIndex) => (currentIndex === null ? currentIndex : (currentIndex + images.length - 1) % images.length));
  }

  function showNextImage() {
    setActiveIndex((currentIndex) => (currentIndex === null ? currentIndex : (currentIndex + 1) % images.length));
  }

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (activeImage && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
      return;
    }

    if (!activeImage && dialog.open) {
      dialog.close();
      triggerRef.current?.focus();
    }
  }, [activeImage]);

  if (images.length === 0) {
    return (
      <section aria-labelledby="project-gallery-title" className="mt-lg rounded-lg border border-dashed border-border bg-card/60 p-lg">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Gallery</p>
        <h2 className="mt-sm text-2xl font-semibold text-text" id="project-gallery-title">
          Image gallery unavailable
        </h2>
        <p className="mt-md max-w-[42rem] text-sm leading-6 text-muted">
          No verified public images are approved for this project. Private, draft, TODO, or permission-pending image URLs are not rendered.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="project-gallery-title" className="mt-lg">
      <div className="max-w-[44rem]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Gallery</p>
        <h2 className="mt-sm text-3xl font-semibold text-text" id="project-gallery-title">
          Verified project images
        </h2>
        <p className="mt-md text-sm leading-6 text-muted">
          Only approved public images are available here. The lightbox uses native dialog behavior and restores focus on close.
        </p>
      </div>

      <div className="mt-lg grid gap-md sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            className="group overflow-hidden rounded-lg border border-border bg-card text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            key={image.id}
            onClick={(event) => {
              openLightbox(index, event.currentTarget);
            }}
            type="button"
          >
            <img alt={image.alt} className="aspect-[4/3] w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]" loading="lazy" src={image.src} />
            <span className="block border-t border-border px-md py-sm text-xs leading-5 text-muted">{image.alt}</span>
          </button>
        ))}
      </div>

      <dialog
        aria-labelledby="project-lightbox-title"
        className="w-[min(68rem,calc(100vw-2rem))] rounded-lg border border-border bg-card p-0 text-text backdrop:bg-background/80"
        onCancel={closeLightbox}
        onClose={closeLightbox}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPreviousImage();
          }

          if (event.key === "ArrowRight") {
            event.preventDefault();
            showNextImage();
          }
        }}
        ref={dialogRef}
      >
        {activeImage ? (
          <div className="grid max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between gap-md border-b border-border p-md">
              <h3 className="text-sm font-semibold text-text" id="project-lightbox-title">
                Project image {activeIndex === null ? "" : activeIndex + 1} of {images.length}
              </h3>
              <button
                className="rounded-full border border-border px-sm py-xs text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={closeLightbox}
                ref={closeButtonRef}
                type="button"
              >
                Close
              </button>
            </div>
            <img alt={activeImage.alt} className="max-h-[70vh] w-full object-contain bg-background" src={activeImage.src} />
            <div className="flex flex-col gap-sm border-t border-border p-md sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-muted">{activeImage.alt}</p>
              <div className="flex gap-sm">
                <button className="rounded-full border border-border px-md py-xs text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={showPreviousImage} type="button">
                  Previous
                </button>
                <button className="rounded-full border border-border px-md py-xs text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={showNextImage} type="button">
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

function ProjectHero({ project }: { project: PortfolioProject }) {
  const heroMedia = getVerifiedPublicMediaByType(project.media, "image")[0] ?? getVerifiedPublicMedia(project.media.filter((media) => media.type !== "video"));

  return (
    <header className="grid gap-xl lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.9fr)] lg:items-end">
      <div className="max-w-[52rem]">
        <p className="mb-sm font-mono text-xs uppercase tracking-[0.18em] text-primary">{renderVerifiedText(project.type, "Verified project")}</p>
        <h1 className="text-4xl font-semibold leading-tight text-text md:text-6xl">{renderVerifiedText(project.title, "Project unavailable")}</h1>
        <p className="mt-md text-base leading-7 text-muted md:text-lg">{renderVerifiedText(project.overview)}</p>
      </div>
      <ProjectHeroMedia media={heroMedia} />
    </header>
  );
}

function ProjectVideo({ project }: { project: PortfolioProject }) {
  const videos = getVerifiedPublicMediaByType(project.media, "video");
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());
  const [failedVideoIds, setFailedVideoIds] = useState<ReadonlySet<string>>(() => new Set<string>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.target instanceof HTMLVideoElement) {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.1 },
    );

    videoRefs.current.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  function pauseOtherVideos(activeVideo: HTMLVideoElement) {
    videoRefs.current.forEach((video) => {
      if (video !== activeVideo) {
        video.pause();
      }
    });
  }

  function markVideoFailed(videoId: string) {
    setFailedVideoIds((currentIds) => new Set(currentIds).add(videoId));
  }

  if (videos.length === 0) {
    return (
      <section aria-labelledby="project-video-title" className="mt-lg rounded-lg border border-dashed border-border bg-card/60 p-lg">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Video</p>
        <h2 className="mt-sm text-2xl font-semibold text-text" id="project-video-title">
          Video unavailable
        </h2>
        <p className="mt-md max-w-[42rem] text-sm leading-6 text-muted">
          No verified public video is approved for this project. Private, draft, TODO, or permission-pending video URLs are not rendered.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="project-video-title" className="mt-lg">
      <div className="max-w-[44rem]">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Video</p>
        <h2 className="mt-sm text-3xl font-semibold text-text" id="project-video-title">
          Verified project video
        </h2>
        <p className="mt-md text-sm leading-6 text-muted">
          Videos load only from approved public sources. Playback is user-controlled, muted-safe, and limited to one active video at a time.
        </p>
      </div>

      <div className="mt-lg grid gap-lg">
        {videos.map((video) => {
          const poster = isVerifiedText(video.poster ?? "") ? video.poster : undefined;
          const hasFailed = failedVideoIds.has(video.id);

          return (
            <figure className="overflow-hidden rounded-lg border border-border bg-card" key={video.id}>
              {hasFailed ? (
                <div className="flex min-h-[18rem] flex-col justify-end bg-surface p-lg">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Video failed</p>
                  <p className="mt-sm max-w-[32rem] text-sm leading-6 text-muted">
                    The approved video could not be loaded. Core project text remains available without media playback.
                  </p>
                </div>
              ) : (
                <video
                  className="aspect-video w-full bg-background object-contain"
                  controls
                  muted
                  onError={() => {
                    markVideoFailed(video.id);
                  }}
                  onPlay={(event) => {
                    pauseOtherVideos(event.currentTarget);
                  }}
                  playsInline
                  poster={poster}
                  preload="metadata"
                  ref={(element) => {
                    if (element) {
                      videoRefs.current.set(video.id, element);
                    } else {
                      videoRefs.current.delete(video.id);
                    }
                  }}
                  src={video.src}
                >
                  <track kind="captions" label="Captions unavailable" />
                </video>
              )}
              <figcaption className="border-t border-border px-md py-sm text-xs leading-5 text-muted">{video.alt}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function ProjectReady({ project }: { project: PortfolioProject }) {
  return (
    <article className="app-container py-section">
      <ProjectHero project={project} />

      <div className="mt-2xl grid gap-lg lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="project-detail-foundation-title" className="rounded-lg border border-border bg-card p-lg">
          <h2 className="text-2xl font-semibold text-text" id="project-detail-foundation-title">
            Verified foundation
          </h2>
          <dl className="mt-lg grid gap-md text-sm text-muted">
            <div>
              <dt className="font-medium text-text">Problem</dt>
              <dd className="mt-xs leading-6">{renderVerifiedText(project.problem)}</dd>
            </div>
            <div>
              <dt className="font-medium text-text">Constraints</dt>
              <dd className="mt-xs leading-6">{renderVerifiedText(project.constraints)}</dd>
            </div>
            <div>
              <dt className="font-medium text-text">Public evidence state</dt>
              <dd className="mt-xs leading-6">Only verified public fields are rendered on this page.</dd>
            </div>
          </dl>
        </section>

        <ProjectMetadata project={project} />
      </div>

      <div className="mt-lg grid gap-lg">
        <ProjectResponsibilities project={project} />
        <ProjectTechnology project={project} />
      </div>

      <ProjectTechnicalStory project={project} />
      <ProjectScrollNarrative project={project} />
      <ProjectGallery project={project} />
      <ProjectVideo project={project} />
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
