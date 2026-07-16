# TASK-044: Validate portfolio content and publication safety

**Profile:** `deployment-release`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-021`, `TASK-034`, `TASK-042`, `TASK-043`

## Inputs

- `docs/blueprint/DEPLOYMENT.md`

## Skills
- `portfolio-content-engineering`
- `frontend-performance-audit`

## Allowed Files
- `src/**`
- `public/**`
- `scripts/**`
- `docs/**`
- `package.json`
- `.codex/project-state.json`

## Deliverable

- Validate portfolio content and publication safety.

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
