---
name: playwright-portfolio-qa
description: Create, run, debug, or review Playwright end-to-end and visual smoke tests for this static portfolio. Use for routes, responsive navigation, project filters, project detail navigation, resume links, 404 behavior, reduced motion, and regression screenshots.
metadata:
  short-description: Test critical portfolio journeys
---

# Playwright Portfolio QA

Use this skill for high-value end-to-end coverage, not exhaustive implementation-detail tests.

## Workflow

1. Identify the user-visible acceptance criteria.
2. Prefer role, label, heading, and visible-text locators.
3. Test desktop and mobile where behavior differs.
4. Wait on user-visible conditions, not arbitrary timeouts.
5. Capture screenshots only at stable states.
6. Keep tests independent and deterministic.
7. Report product defects separately from flaky test defects.

## Priority Journeys

- Public routes load directly and after refresh.
- Header and mobile navigation work.
- Project category and technology filters work.
- Project details open and next-project navigation works.
- Resume and contact links are valid.
- Unknown route renders 404.
- Reduced-motion mode does not expose hidden or trapped content.
- GLB viewer poster and failure fallback remain stable.

## Guardrails

- Avoid CSS selectors tied to implementation details.
- Do not use fixed sleeps.
- Do not assert animation frame-by-frame.
- Do not make tests depend on external video services.
- Do not rewrite application code merely to satisfy a brittle test.

Read `references/test-matrix.md` before creating the release suite.

