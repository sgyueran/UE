import { useMemo, useState, type ReactNode } from "react";

import { CursorContext, type CursorVariant } from "./cursorContext";

export type CursorProviderProps = {
  children: ReactNode;
};

export function CursorProvider({ children }: CursorProviderProps) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const value = useMemo(() => ({ variant, setVariant }), [variant]);

  return <CursorContext value={value}>{children}</CursorContext>;
}
