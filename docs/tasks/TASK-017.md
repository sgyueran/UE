# TASK-017: Build MagneticButton

**Profile:** `motion-interaction`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-005`, `TASK-011`, `TASK-013`, `TASK-016`

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

- Build MagneticButton.

## Task-Specific Acceptance
- Keyboard and touch alternatives exist for pointer-driven behavior.
- The feature is disabled or simplified on unsupported/coarse-pointer devices.
- No per-frame React state update is introduced.

## Validation Commands

```bash
python scripts/validate-blueprint.py
npm run lint
npm run typecheck
npm run build
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
