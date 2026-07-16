import { useRef, useState } from "react";

import { useFinePointer } from "@/hooks/useFinePointer";
import type { PortfolioProject, ProjectMedia } from "@/types/content";

function isPublicVerifiedMedia(media: ProjectMedia): boolean {
  return media.publicationStatus === "public" && media.provenance.status === "verified";
}

export type ProjectListMediaPreviewProps = {
  project: PortfolioProject;
};

export function ProjectListMediaPreview({ project }: ProjectListMediaPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFinePointer = useFinePointer();
  const [hasFailed, setHasFailed] = useState(false);
  const video = project.media.find((media) => media.type === "video" && isPublicVerifiedMedia(media));
  const image = project.media.find((media) => media.type === "image" && isPublicVerifiedMedia(media));

  if (hasFailed) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-sm bg-background p-lg text-center">
        <p className="max-w-sm text-sm leading-6 text-muted">Media preview is unavailable. Project details remain readable.</p>
      </div>
    );
  }

  if (video) {
    const play = () => {
      if (!hasFinePointer) {
        return;
      }

      void videoRef.current?.play().catch(() => setHasFailed(true));
    };

    const pause = () => {
      const element = videoRef.current;

      if (!element) {
        return;
      }

      element.pause();
      element.currentTime = 0;
    };

    return (
      <video
        aria-label={`${project.title} media preview`}
        className="aspect-video w-full rounded-sm object-cover"
        controls={!hasFinePointer}
        muted
        onError={() => setHasFailed(true)}
        onPointerEnter={play}
        onPointerLeave={pause}
        playsInline
        poster={video.poster}
        preload="metadata"
        ref={videoRef}
        src={video.src}
      />
    );
  }

  if (image) {
    return <img alt={image.alt} className="aspect-video w-full rounded-sm object-cover" src={image.src} />;
  }

  return (
    <div className="flex aspect-video items-center justify-center rounded-sm border border-dashed border-border bg-background/70 p-lg text-center">
      <p className="max-w-sm text-sm leading-6 text-muted">No verified public media preview.</p>
    </div>
  );
}
