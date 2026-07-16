import { useRef, useState } from "react";

import { useFinePointer } from "@/hooks/useFinePointer";
import type { PortfolioProject, ProjectMedia } from "@/types/content";

function isPublicVerifiedVideo(media: ProjectMedia): boolean {
  return media.type === "video" && media.publicationStatus === "public" && media.provenance.status === "verified";
}

export type HomeProjectPreviewMediaProps = {
  project: PortfolioProject;
};

export function HomeProjectPreviewMedia({ project }: HomeProjectPreviewMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinePointer = useFinePointer();
  const [isUnavailable, setIsUnavailable] = useState(false);
  const video = project.media.find(isPublicVerifiedVideo);

  if (!video) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-background/65 p-lg text-center">
        <p className="max-w-[24rem] text-sm leading-6 text-muted">Verified public video is unavailable for this project.</p>
      </div>
    );
  }

  const playPreview = () => {
    if (!hasFinePointer || isUnavailable) {
      return;
    }

    void videoRef.current?.play().catch(() => setIsUnavailable(true));
  };

  const pausePreview = () => {
    const element = videoRef.current;

    if (!element) {
      return;
    }

    element.pause();
    element.currentTime = 0;
  };

  return (
    <div className="rounded-lg border border-border bg-background/65 p-sm">
      {isUnavailable ? (
        <div className="flex aspect-video items-center justify-center rounded-sm bg-card p-lg text-center">
          <p className="max-w-[24rem] text-sm leading-6 text-muted">Video preview failed to load. Project text remains available.</p>
        </div>
      ) : (
        <video
          aria-label={`${project.title} video preview`}
          className="aspect-video w-full rounded-sm object-cover"
          controls={!hasFinePointer}
          muted
          onError={() => setIsUnavailable(true)}
          onPointerEnter={playPreview}
          onPointerLeave={pausePreview}
          playsInline
          poster={video.poster}
          preload="metadata"
          ref={videoRef}
          src={video.src}
        />
      )}
      <p className="mt-sm text-xs leading-5 text-muted">
        {hasFinePointer ? "Hover to preview verified video." : "Use video controls when a verified preview is available."}
      </p>
    </div>
  );
}
