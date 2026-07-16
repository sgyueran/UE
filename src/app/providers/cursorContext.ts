import { createContext, useContext } from "react";

export type CursorVariant = "default" | "interactive";

export type CursorContextValue = {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
};

export const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursor() {
  const value = useContext(CursorContext);

  if (value === null) {
    throw new Error("useCursor must be used inside CursorProvider.");
  }

  return value;
}
