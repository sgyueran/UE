# Responsive UI section tasks

## Applies To

Tasks declaring `Profile: ui-section`.

## Shared Quality Rules

- Semantic HTML, keyboard/focus support, 375/768/1440/1920 layouts, touch fallback, and no horizontal overflow.
- Edit only the task allowlist. Unknown pre-existing changes must be preserved.
- Do not implement future tasks or perform unrelated refactors.
- Reuse existing primitives and patterns before creating new ones.
- Report only factual results; never claim an unexecuted check passed.
- Use `scripts/project-state.py` for state transitions.

## Default Validation Tier

`fast`

## Compact Completion Report

```text
TASK-XXX — PASS | FAIL | BLOCKED
Changed: <paths or none>
Validation: <command=PASS|FAIL|NOT_AVAILABLE>
Notes: <exceptions, risks, or “none”>
Next: <newly unblocked task or “none”>
```
