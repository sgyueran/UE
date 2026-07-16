# File Ownership Rules

## Foundation Files

These files require explicit justification before modification after their creation:

- `vite.config.ts`
- `tsconfig*.json`
- `tailwind.config.*`
- `src/app/router.tsx`
- `src/styles/globals.css`
- `src/lib/animation.ts`

## Feature Ownership

- `components/home/*`: homepage-only presentation
- `components/projects/*`: project list and project detail features
- `components/three/*`: Three.js only
- `components/animation/*`: reusable motion infrastructure
- `components/cursor/*`: cursor and magnetic interaction
- `data/*`: static content only
- `types/*`: domain types only

## Rule

A Task may edit a foundation file only when the Task explicitly lists that file under Allowed Files.
