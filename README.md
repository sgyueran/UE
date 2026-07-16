# UE Portfolio AI Blueprint v4.3 — Context-Efficient Codex Edition

A context-efficient execution blueprint for a static UE5 job-search portfolio: 51 tasks, 7 reusable Task Profiles, 10 routed Skills, recovery-safe state, content-integrity rules, and separated release gates.

## Start in Codex

Open this folder as the repository root and send:

```text
Run:
python scripts/validate-blueprint.py
python scripts/validate-skills.py
python scripts/project-state.py recover
python scripts/task-context.py TASK-001 --write --inspect

Read AGENTS.md and .codex/generated-context/TASK-001.md.
Start TASK-001 with scripts/project-state.py and complete only that task.
Use its allowlist, validation tier, and compact completion report.
Do not commit, push, or start another task.
```

## Context-efficient workflow

```bash
python scripts/task-context.py TASK-023 --write --inspect
python scripts/project-state.py start TASK-023
```

The generated file contains only the current task, direct dependencies, state, Task Profile, routed inputs, and at most two relevant Skills. Master Blueprint reading is reserved for first entry, recovery, architecture conflicts, and final release.

## Validation tiers

- `fast`: focused lint and type checks.
- `standard`: repository checks; build only for integration/configuration risk.
- `full`: blueprint validation, tests, production build, and relevant browser checks.

Unavailable commands must be recorded as `NOT_AVAILABLE`, never `PASS`.

## Optional small batches

Only 2–3 independent, same-profile, non-high-risk tasks may be proposed:

```bash
python scripts/task-batch.py TASK-025 TASK-026
```

Each task still requires independent state and validation records.

## Recovery

```bash
python scripts/project-state.py recover
python scripts/task-context.py TASK-XXX --write --inspect
```

Recover from Git, project state, dependency JSON, and generated context—not chat history.
