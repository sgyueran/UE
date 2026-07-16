# TASK-012: Create Lenis SmoothScrollProvider

**Profile:** `motion-interaction`  
**Risk:** `Medium`  
**Validation Tier:** `standard`

## Dependencies

`TASK-011`

## Inputs

- `docs/blueprint/MASTER-BLUEPRINT.md`

## Skills
- `gsap-motion-engineering`

## Allowed Files
- `src/app/providers/**`
- `src/lib/motion/**`
- `src/components/motion/**`
- `src/styles/**`
- `.codex/project-state.json`

## Deliverable

- Create Lenis SmoothScrollProvider.

## Task-Specific Acceptance
- The behavior is centralized, cleaned up on unmount, and does not create duplicate listeners.
- `prefers-reduced-motion` produces an intentional static fallback.
- Content remains readable before JavaScript animation initializes.

## Validation Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
