# TASK-024: Add Hero title animation and media parallax

**Profile:** `motion-interaction`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-011`, `TASK-013`, `TASK-023`

## Inputs

- `docs/blueprint/MASTER-BLUEPRINT.md`

## Skills
- `gsap-motion-engineering`

## Allowed Files
- `src/pages/HomePage.*`
- `src/features/home/**`
- `src/assets/home/**`
- `.codex/project-state.json`

## Deliverable

- Add Hero title animation and media parallax.

## Task-Specific Acceptance
- The section renders at 375px, 768px, 1440px, and 1920px without horizontal overflow.
- Primary content and CTA remain accessible by keyboard and without motion.
- The homepage initial bundle does not include Three.js.

## Validation Commands

```bash
python scripts/validate-blueprint.py
npm run lint
npm run typecheck
npm run build
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
