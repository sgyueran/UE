import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useRef } from "react";

import { useCursor, useReducedMotion } from "@/app/providers";
import { useFinePointer } from "@/hooks/useFinePointer";
import { cn } from "@/lib/cn";

export type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  strength?: number;
};

export function MagneticButton({
  children,
  className,
  onBlur,
  onFocus,
  onPointerLeave,
  onPointerMove,
  strength = 0.24,
  type = "button",
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { setVariant } = useCursor();
  const prefersReducedMotion = useReducedMotion();
  const hasFinePointer = useFinePointer();
  const isMagnetic = hasFinePointer && !prefersReducedMotion;

  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-pill border border-primary-strong bg-primary-strong px-lg text-sm font-medium text-white transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-standard)] hover:bg-primary-strong/90 focus-visible:outline-primary",
        className,
      )}
      onBlur={(event) => {
        setVariant("default");
        buttonRef.current?.style.removeProperty("transform");
        onBlur?.(event);
      }}
      onFocus={(event) => {
        setVariant("interactive");
        onFocus?.(event);
      }}
      onPointerLeave={(event) => {
        setVariant("default");
        buttonRef.current?.style.removeProperty("transform");
        onPointerLeave?.(event);
      }}
      onPointerMove={(event) => {
        if (isMagnetic) {
          const rect = event.currentTarget.getBoundingClientRect();
          const offsetX = (event.clientX - rect.left - rect.width / 2) * strength;
          const offsetY = (event.clientY - rect.top - rect.height / 2) * strength;

          event.currentTarget.style.setProperty("transform", `translate3d(${offsetX}px, ${offsetY}px, 0)`);
          setVariant("interactive");
        }

        onPointerMove?.(event);
      }}
      ref={buttonRef}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
