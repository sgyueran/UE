import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-white shadow-[0_0_24px_color-mix(in_srgb,var(--color-primary)_28%,transparent)] hover:bg-primary/90",
  secondary: "border-border bg-card text-text hover:border-primary/60 hover:bg-surface",
  ghost: "border-transparent bg-transparent text-muted hover:bg-card hover:text-text",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-sm text-sm",
  md: "min-h-11 px-lg text-sm",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

export function Button({
  children,
  className,
  disabled,
  isLoading = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-xs rounded-pill border font-medium transition duration-200 ease-[var(--ease-standard)] focus-visible:outline-primary disabled:opacity-55",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? <span className="sr-only">Loading</span> : null}
      <span aria-hidden={isLoading}>{children}</span>
    </button>
  );
}
