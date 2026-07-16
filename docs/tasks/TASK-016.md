# TASK-016: Create CursorContext and CustomCursor

**Profile:** `motion-interaction`  
**Risk:** `Medium`  
**Validation Tier:** `standard`

## Dependencies

`TASK-011`, `TASK-013`

## Inputs

- `docs/blueprint/MASTER-BLUEPRINT.md`

## Skills
- `gsap-motion-engineering`

## Allowed Files
- `src/app/providers/**`
- `src/components/interaction/**`
- `src/hooks/**`
- `.codex/project-state.json`

## Deliverable

- Create CursorContext and CustomCursor.

## Task-Specific Acceptance
- Keyboard and touch alternatives exist for pointer-driven behavior.
- The feature is disabled or simplified on unsupported/coarse-pointer devices.
- No per-frame React state update is introduced.

## Validation Commands

```bash
npm run lint
npm run typecheck
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
