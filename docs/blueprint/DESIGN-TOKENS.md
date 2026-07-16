# Design Tokens

All visual primitives must come from shared tokens.

## Colors

```ts
export const colors = {
  background: '#09090b',
  surface: '#111114',
  card: '#18181b',
  border: '#27272a',
  text: '#f4f4f5',
  muted: '#a1a1aa',
  primary: '#3b82f6',
  accent: '#a855f7',
  success: '#22c55e',
  danger: '#ef4444',
} as const;
```

## Spacing

```ts
export const spacing = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  section: 'clamp(5rem, 10vw, 10rem)',
} as const;
```

## Radius

```ts
export const radius = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  pill: '9999px',
} as const;
```

## Motion

```ts
export const motion = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    page: 0.7,
  },
  ease: {
    standard: 'power2.out',
    smooth: 'power3.inOut',
    elastic: 'elastic.out(1, 0.5)',
  },
} as const;
```

## Rules

- Components may consume tokens.
- Components may not invent new semantic colors without updating this file.
- Animation duration values may not be hard-coded repeatedly.
- Layout spacing must prefer shared scale values.
