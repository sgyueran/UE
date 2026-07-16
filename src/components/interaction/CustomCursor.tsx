import { useEffect, useRef } from "react";

import { useCursor, useReducedMotion } from "@/app/providers";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/cn";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { variant } = useCursor();
  const prefersReducedMotion = useReducedMotion();
  const hasFinePointer = useFinePointer();
  const isEnabled = hasFinePointer && !prefersReducedMotion;

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    let frame = 0;
    const position = { x: 0, y: 0 };

    const render = () => {
      cursorRef.current?.style.setProperty("transform", `translate3d(${position.x}px, ${position.y}px, 0)`);
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      position.x = event.clientX;
      position.y = event.clientY;

      if (frame === 0) {
        frame = window.requestAnimationFrame(render);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 size-5 -translate-x-1/2 -translate-y-1/2 rounded-pill border border-primary/70 transition-[height,width,border-color,background-color] duration-200 ease-[var(--ease-standard)]",
        variant === "interactive" && "size-9 border-accent/80 bg-accent/10",
      )}
      ref={cursorRef}
    />
  );
}
