# Contributing

Welcome to the UE Portfolio project.

This repository follows a task-driven workflow powered by Codex and a strict project blueprint.

Before making any changes, read:

- AGENTS.md
- Current task context
- Relevant project documentation

## Workflow

Task → Implementation → Validation → Review → Pull Request → Merge

Do not skip validation.

## Branch Strategy

- main: Production-ready only.
- develop: Primary development branch.
- codex/*: Temporary feature branches created by Codex.

Examples:

- codex/task-001-init
- codex/task-012-project-grid

## Commit Rules

Use Conventional Commits.

Examples:

- feat(task-001): initialize Vite project
- feat(task-004): implement app layout
- fix(task-021): resolve mobile navigation overflow

Avoid:
- update
- fix
- misc
- changes

## Pull Requests

One task = One Pull Request.

Include:
- Task ID
- Summary
- Validation results
- Scope confirmation
- Known limitations

## Validation

Always execute the validation commands defined by the current task.
Never claim validation passed unless it actually passed.

## Allowed Files

Modify only files explicitly allowed by the current task.

## Design Principles

1. Content before decoration.
2. Performance before visual effects.
3. Accessibility by default.
4. Mobile-first.
5. Unreal Engine identity over generic portfolio trends.

## Git Policy

- Never commit directly to main.
- Prefer Squash Merge.
- Never force push.

## Review Checklist

- [ ] Scope matches current task
- [ ] Only allowed files modified
- [ ] Validation passed
- [ ] No unrelated changes
- [ ] Build passed (when required)
- [ ] Mobile verified (when required)
- [ ] Accessibility verified

## Core Principle

Prefer smaller, safer, reviewable changes.
