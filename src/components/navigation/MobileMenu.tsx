import { useEffect, useId, useRef, useState } from "react";

import { RouteLink } from "@/app/RouteLink";
import { routes } from "@/app/routes";
import { cn } from "@/lib/cn";

export type MobileMenuProps = {
  currentPath: string;
};

export function MobileMenu({ currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const restoreFocusOnCloseRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (restoreFocusOnCloseRef.current) {
        restoreFocusOnCloseRef.current = false;
        triggerRef.current?.focus();
      }
      return undefined;
    }

    const firstLink = menuRef.current?.querySelector("a");
    if (firstLink) {
      (firstLink as HTMLElement).focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocusOnCloseRef.current = true;
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative md:hidden">
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex size-10 items-center justify-center rounded-pill border border-border bg-card text-text transition duration-200 ease-[var(--ease-standard)] hover:border-primary/60"
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        <span className="flex flex-col gap-1" aria-hidden="true">
          <span className="h-0.5 w-4 rounded-pill bg-current" />
          <span className="h-0.5 w-4 rounded-pill bg-current" />
          <span className="h-0.5 w-4 rounded-pill bg-current" />
        </span>
      </button>
      <nav
        aria-label="Mobile navigation"
        className={cn(
          "absolute right-0 top-[calc(100%+0.75rem)] w-56 rounded-lg border border-border bg-card p-sm shadow-[0_20px_60px_rgba(0,0,0,0.34)]",
          isOpen ? "block" : "hidden",
        )}
        id={menuId}
        ref={menuRef}
      >
        <div className="flex flex-col gap-xs">
          {routes.map((route) => (
            <RouteLink
              className={cn(
                "rounded-md px-md py-sm text-sm font-medium text-muted transition duration-200 ease-[var(--ease-standard)] hover:bg-surface hover:text-text",
                currentPath === route.path && "bg-surface text-text",
              )}
              href={route.path}
              isActive={currentPath === route.path}
              key={route.path}
              onClick={() => setIsOpen(false)}
            >
              {route.label}
            </RouteLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
