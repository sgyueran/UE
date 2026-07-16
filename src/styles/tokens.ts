export const colors = {
  background: "#09090b",
  surface: "#111114",
  card: "#18181b",
  border: "#27272a",
  text: "#f4f4f5",
  muted: "#a1a1aa",
  primary: "#3b82f6",
  accent: "#a855f7",
  success: "#22c55e",
  danger: "#ef4444",
} as const;

export const spacing = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  section: "clamp(5rem, 10vw, 10rem)",
} as const;

export const radius = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  pill: "9999px",
} as const;

export const motion = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    page: 0.7,
  },
  ease: {
    standard: "power2.out",
    smooth: "power3.inOut",
    elastic: "elastic.out(1, 0.5)",
  },
} as const;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
