# Validation Tiers

## Fast

Run focused lint/type checks and related tests available at that project stage. No full build unless the task changes build configuration.

## Standard

Run repository lint, typecheck, and relevant tests. Run build for routing, dependency, configuration, or integration changes.

## Full

Run lint, typecheck, unit tests, production build, relevant Playwright checks, and blueprint validation. Required for high-risk, 3D/media, quality, deployment, milestone, and final-release tasks.

A command unavailable before its setup task is `NOT_AVAILABLE`, never `PASS`.
