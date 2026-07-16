# Project State Workflow

Allowed task transitions:

```text
not_started → in_progress → implemented → validating → completed
                         ↘ blocked
```

Use `scripts/project-state.py`; do not hand-edit lifecycle fields.

```bash
python scripts/project-state.py start TASK-023
python scripts/project-state.py implemented TASK-023
python scripts/project-state.py validating TASK-023
python scripts/project-state.py validation-result TASK-023 passed --commands "npm run lint" "npm run typecheck" "npm run build"
python scripts/project-state.py complete TASK-023
python scripts/project-state.py block TASK-023 "Missing verified media"
python scripts/project-state.py recover
```

Rules:

- `start` checks dependency closure and records baseline commit plus pre-existing changes.
- `implemented` means code exists but is not accepted.
- `validating` must precede recording validation results.
- `complete` is rejected unless the matching validation result is `passed`.
- Unknown user changes must never be overwritten.
- `releaseReady` may be true only after TASK-051 succeeds.
