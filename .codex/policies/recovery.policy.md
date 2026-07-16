# Recovery Policy

When state is uncertain or a conversation is lost:

1. Run Blueprint and Skills validation.
2. Run `scripts/project-state.py recover`.
3. Inspect `git status --short` and recent Git history.
4. Compare project state, dependency JSON, Git evidence, and recorded validation.
5. Report:
   - last verified completed task
   - current/in-progress/blocked task
   - pre-existing changes
   - next unblocked task
   - any state conflict

Do not infer completion from chat history and do not modify files during recovery.
