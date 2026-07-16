import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type BadgeTone = "default" | "primary" | "success" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  default: "border-border bg-card text-muted",
  primary: "border-primary/35 bg-primary/10 text-text",
  success: "border-success/35 bg-success/10 text-success",
  danger: "border-danger/35 bg-danger/10 text-danger",
};

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

export function Badge({ children, className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-pill border px-sm text-xs font-medium",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
