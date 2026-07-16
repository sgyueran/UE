import { RouteLink } from "@/app/RouteLink";
import { routes } from "@/app/routes";
import { cn } from "@/lib/cn";

import { MobileMenu } from "./MobileMenu";

export type HeaderProps = {
  currentPath: string;
};

export function Header({ currentPath }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/75 bg-background/86 backdrop-blur-md">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-md focus:top-md focus:z-30 focus:rounded-sm focus:bg-card focus:px-md focus:py-sm"
        href="#main-content"
      >
        Skip to content
      </a>
      <div className="app-container flex min-h-16 items-center justify-between gap-md">
        <RouteLink className="text-sm font-semibold text-text" href="/" isActive={currentPath === "/"}>
          UE Portfolio
        </RouteLink>
        <nav aria-label="Primary navigation" className="hidden items-center gap-xs md:flex">
          {routes.map((route) => (
            <RouteLink
              className={cn(
                "rounded-pill px-sm py-xs text-sm font-medium text-muted transition duration-200 ease-[var(--ease-standard)] hover:bg-card hover:text-text",
                currentPath === route.path && "bg-card text-text",
              )}
              href={route.path}
              isActive={currentPath === route.path}
              key={route.path}
            >
              {route.label}
            </RouteLink>
          ))}
        </nav>
        <MobileMenu currentPath={currentPath} />
      </div>
    </header>
  );
}
