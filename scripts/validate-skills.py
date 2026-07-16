from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1] / ".codex" / "skills"
errors = []

for directory in sorted(p for p in root.iterdir() if p.is_dir()):
    skill = directory / "SKILL.md"
    agent = directory / "agents" / "openai.yaml"
    if not skill.exists():
        errors.append(f"{directory.name}: missing SKILL.md")
        continue
    text = skill.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        errors.append(f"{directory.name}: missing YAML frontmatter")
    if not re.search(r"^name:\s+[a-z0-9-]+$", text, re.MULTILINE):
        errors.append(f"{directory.name}: invalid or missing name")
    if not re.search(r"^description:\s+.+$", text, re.MULTILINE):
        errors.append(f"{directory.name}: missing description")
    if len(text.splitlines()) > 500:
        errors.append(f"{directory.name}: SKILL.md exceeds 500 lines")
    if not agent.exists():
        errors.append(f"{directory.name}: missing agents/openai.yaml")

if errors:
    print("\n".join(errors))
    sys.exit(1)

print(f"Validated {len(list(root.iterdir()))} skills.")
