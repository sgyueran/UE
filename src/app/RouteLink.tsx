import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { navigateTo } from "./navigation";

type RouteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  isActive?: boolean;
};

export function RouteLink({ children, className, href, isActive = false, onClick, ...props }: RouteLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    navigateTo(href);
  };

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(className)}
      href={href}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
