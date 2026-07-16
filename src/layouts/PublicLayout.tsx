import type { ReactNode, RefObject } from "react";

import { Footer, Header } from "@/components/navigation";

export type PublicLayoutProps = {
  children: ReactNode;
  currentPath: string;
  mainRef?: RefObject<HTMLElement | null>;
};

export function PublicLayout({ children, currentPath, mainRef }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPath={currentPath} />
      <main className="flex-1" id="main-content" ref={mainRef}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
