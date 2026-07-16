# Testing and quality tasks

## Applies To

Tasks declaring `Profile: testing-quality`.

## Shared Quality Rules

- Deterministic tests, actionable failures, stable fixtures, and no claims without executed evidence.
- Edit only the task allowlist. Unknown pre-existing changes must be preserved.
- Do not implement future tasks or perform unrelated refactors.
- Reuse existing primitives and patterns before creating new ones.
- Report only factual results; never claim an unexecuted check passed.
- Use `scripts/project-state.py` for state transitions.

## Default Validation Tier

`full`

## Compact Completion Report

```text
TASK-XXX — PASS | FAIL | BLOCKED
Changed: <paths or none>
Validation: <command=PASS|FAIL|NOT_AVAILABLE>
Notes: <exceptions, risks, or “none”>
Next: <newly unblocked task or “none”>
```
