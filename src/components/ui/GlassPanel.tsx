import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type GlassPanelTone = "default" | "subtle";

const toneClasses: Record<GlassPanelTone, string> = {
  default: "border-border/80 bg-card/82 shadow-[0_20px_80px_rgba(0,0,0,0.22)]",
  subtle: "border-border/55 bg-surface/58",
};

export type GlassPanelProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "article" | "aside" | "div" | "section";
  tone?: GlassPanelTone;
};

export function GlassPanel({
  as: Component = "section",
  children,
  className,
  tone = "default",
  ...props
}: GlassPanelProps) {
  return (
    <Component
      className={cn(
        "rounded-lg border p-lg backdrop-blur-md transition duration-200 ease-[var(--ease-standard)]",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
