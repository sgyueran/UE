import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/app/providers";
import { canUseDesktopMotion, markGsapReady } from "@/lib/motion";
import type { PortfolioProject } from "@/types/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HomeProjectPreviewMedia } from "./HomeProjectPreviewMedia";

export type HomeProjectRailProps = {
  projects: readonly PortfolioProject[];
};

export function HomeProjectRail({ projects }: HomeProjectRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const useDesktopRail = projects.length >= 3;

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track || !useDesktopRail || prefersReducedMotion || !canUseDesktopMotion()) {
      return;
    }

    if (markGsapReady()) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const overflowDistance = track.scrollWidth - container.clientWidth;

    if (overflowDistance <= 0) {
      return;
    }

    const context = gsap.context(() => {
      gsap.to(track, {
        ease: "none",
        scrollTrigger: {
          end: "bottom top",
          scrub: 0.35,
          start: "top bottom",
          trigger: container,
        },
        x: -Math.min(overflowDistance, container.clientWidth * 0.6),
      });
    }, container);

    return () => context.revert();
  }, [prefersReducedMotion, useDesktopRail]);

  return (
    <div
      className={
        useDesktopRail
          ? "mt-2xl overflow-x-auto overflow-y-hidden pb-md lg:-mx-lg lg:px-lg"
          : "mt-2xl grid gap-lg md:grid-cols-2"
      }
      ref={containerRef}
    >
      <div className={useDesktopRail ? "grid auto-cols-[minmax(20rem,28rem)] grid-flow-col gap-lg" : "contents"} ref={trackRef}>
        {projects.map((project) => (
          <article className="min-w-0 rounded-lg border border-border bg-card p-lg" key={project.id}>
            <HomeProjectPreviewMedia project={project} />
            <p className="mt-md font-mono text-xs uppercase tracking-[0.16em] text-primary">{project.type}</p>
            <h3 className="mt-md text-2xl font-semibold text-text">{project.title}</h3>
            <p className="mt-sm text-sm leading-6 text-muted">{project.problem}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
