import type { ReactNode } from "react";

import { Footer, Header } from "@/components/navigation";

export type PublicLayoutProps = {
  children: ReactNode;
  currentPath: string;
};

export function PublicLayout({ children, currentPath }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPath={currentPath} />
      <div className="flex-1" id="main-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}
