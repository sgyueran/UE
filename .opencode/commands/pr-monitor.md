# OpenCode PR Monitor

Use this command for scheduled or manual PR state summaries.

Instructions:

- Summarize open PRs without modifying code.
- Flag draft PRs, failed checks, pending checks, requested changes, stale branches, and missing validation notes.
- Recommend the next human action.
- Do not create commits.
- Do not merge pull requests.

The GitHub workflow `.github/workflows/pr-monitor.yml` owns the recurring monitor comment.
