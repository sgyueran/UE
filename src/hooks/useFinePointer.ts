import { useEffect, useState } from "react";

export function useFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(() => window.matchMedia("(pointer: fine)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const syncPointer = () => setHasFinePointer(mediaQuery.matches);

    syncPointer();
    mediaQuery.addEventListener("change", syncPointer);

    return () => {
      mediaQuery.removeEventListener("change", syncPointer);
    };
  }, []);

  return hasFinePointer;
}
