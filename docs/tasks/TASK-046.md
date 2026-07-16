# TASK-046: Run accessibility audit and remediation

**Profile:** `deployment-release`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-034`, `TASK-042`, `TASK-045`

## Inputs

- `docs/blueprint/DEPLOYMENT.md`

## Skills
- `accessibility-audit`

## Allowed Files
- `src/**`
- `public/**`
- `scripts/**`
- `docs/**`
- `package.json`
- `.codex/project-state.json`

## Deliverable

- Run accessibility audit and remediation.

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
