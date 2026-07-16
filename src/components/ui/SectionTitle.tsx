import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type SectionTitleProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
};

export function SectionTitle({ className, description, eyebrow, title, ...props }: SectionTitleProps) {
  return (
    <div className={cn("max-w-3xl", className)} {...props}>
      {eyebrow ? (
        <p className="mb-sm text-sm font-semibold uppercase text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold leading-tight text-text md:text-4xl">{title}</h2>
      {description ? <p className="mt-md text-base leading-7 text-muted">{description}</p> : null}
    </div>
  );
}
