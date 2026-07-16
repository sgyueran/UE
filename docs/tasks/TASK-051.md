# TASK-051: Perform final release validation

**Profile:** `deployment-release`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-043`, `TASK-044`, `TASK-045`, `TASK-046`, `TASK-047`, `TASK-048`, `TASK-049`, `TASK-050`

## Inputs

- `docs/blueprint/DEPLOYMENT.md`

## Skills
- `frontend-performance-audit`

## Allowed Files
- `docs/checklists/**`
- `artifacts/release/**`
- `.codex/project-state.json`

## Deliverable

- Perform final release validation.

## Task-Specific Acceptance
- Release checks fail on placeholders, unsafe publication status, broken links, or missing required metadata.
- The change documents measurable before/after evidence where optimization is involved.
- The production build remains reproducible and does not expose secrets.

## Validation Commands

```bash
python scripts/validate-blueprint.py
npm run lint
npm run typecheck
npm run build
npm run test
npm run test:e2e
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
