# Migration from v4.3 to v1.0 Stable

## Delete from your existing repository

Delete the manually copied Prompt Library if present:

```text
prompts/
```

Also delete any root-level README that came from the temporary Automation Pack. Keep your existing project `README.md`.

Do not delete:

- `AGENTS.md`
- `.codex/skills/`
- `.codex/environments/`
- `.codex/project-state.json`
- `docs/`
- `scripts/`
- `content-input/`

## Copy or replace

Copy these from v1.0 Stable:

- `.codex/policies/`
- `AGENTS.md` (replace existing)
- `CONTRIBUTING.md`
- `.github/`
- `.gitattributes`
- updated validation/manifest files

## Git commands

```powershell
cd "D:\UE-Portfolio"

if (Test-Path prompts) {
  git rm -r prompts
}

# Copy the v1.0 files into the repository, then:
git add .
git commit -m "refactor: adopt Codex policy workflow v1.0"
git push origin develop
```

## Safety boundary

Automation may repair one round of grounded High-severity review findings and prepare a draft PR. It must not merge the PR or begin the next task without user confirmation.
