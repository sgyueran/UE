# TASK-048: Add Playwright critical-path and visual tests

**Profile:** `testing-quality`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-046`, `TASK-047`

## Inputs

- `docs/architecture/DEFINITION-OF-DONE.md`

## Skills
- `playwright-portfolio-qa`

## Allowed Files
- `src/**/*.test.*`
- `tests/**`
- `playwright.config.*`
- `vitest.config.*`
- `package.json`
- `.codex/project-state.json`

## Deliverable

- Add Playwright critical-path and visual tests.

## Task-Specific Acceptance
- Tests cover meaningful behavior and avoid assertions tied only to implementation details.
- Visual tests run in a stable reduced-motion environment with deterministic assets.
- A failing test produces actionable output and artifacts.

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
