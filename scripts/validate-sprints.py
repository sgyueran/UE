#!/usr/bin/env python3
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
TASKS_PATH = ROOT / "docs" / "architecture" / "task-dependencies.json"
SPRINTS_PATH = ROOT / "docs" / "architecture" / "sprints.json"
SPRINT_PLAN_PATH = ROOT / "docs" / "architecture" / "sprint-plan.md"

errors = []


def err(message):
    errors.append(message)


def load_json(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        err(f"Cannot read {path.relative_to(ROOT)}: {exc}")
        return {}


tasks = load_json(TASKS_PATH)
sprint_config = load_json(SPRINTS_PATH)

if len(tasks) != 51:
    err(f"expected 51 tasks, found {len(tasks)}")

if sprint_config.get("schemaVersion") != 1:
    err("sprints.json schemaVersion must be 1")

sprints = sprint_config.get("sprints")
if not isinstance(sprints, list) or not sprints:
    err("sprints.json must contain a non-empty sprints list")
    sprints = []

task_ids = set(tasks)
seen_sprints = set()
ordered_tasks = []

for sprint in sprints:
    sid = sprint.get("id")
    if not isinstance(sid, str) or not re.fullmatch(r"SPRINT-\d{2}", sid):
        err(f"invalid sprint id: {sid}")
        continue
    if sid in seen_sprints:
        err(f"duplicate sprint id: {sid}")
    seen_sprints.add(sid)

    for key in ("title", "goal", "tasks"):
        if key not in sprint:
            err(f"{sid} missing {key}")

    sprint_tasks = sprint.get("tasks", [])
    if not isinstance(sprint_tasks, list) or not sprint_tasks:
        err(f"{sid} must contain tasks")
        continue
    for task_id in sprint_tasks:
        if task_id not in task_ids:
            err(f"{sid} contains unknown task {task_id}")
        ordered_tasks.append(task_id)

duplicates = sorted({task_id for task_id in ordered_tasks if ordered_tasks.count(task_id) > 1})
for task_id in duplicates:
    err(f"task appears in multiple Sprint slots: {task_id}")

missing = sorted(task_ids - set(ordered_tasks))
extra = sorted(set(ordered_tasks) - task_ids)
if missing:
    err(f"tasks missing from Sprint config: {', '.join(missing)}")
if extra:
    err(f"unknown tasks in Sprint config: {', '.join(extra)}")

position = {task_id: index for index, task_id in enumerate(ordered_tasks)}
for task_id, task in tasks.items():
    if task_id not in position:
        continue
    for dep in task.get("dependsOn", []):
        if dep not in position:
            err(f"{task_id} dependency {dep} is missing from Sprint config")
        elif position[dep] >= position[task_id]:
            err(f"{task_id} dependency {dep} must appear before {task_id}")

for rel in (
    "docs/architecture/sprint-plan.md",
    "docs/architecture/sprints.json",
    "scripts/sprint-context.py",
    "scripts/validate-sprints.py",
    ".codex/policies/sprint.policy.md",
):
    if not (ROOT / rel).exists():
        err(f"missing {rel}")

if SPRINT_PLAN_PATH.exists():
    plan = SPRINT_PLAN_PATH.read_text(encoding="utf-8")
    for sprint in sprints:
        sid = sprint.get("id")
        if sid and sid not in plan:
            err(f"sprint-plan.md missing {sid}")
    for task_id in sorted(task_ids):
        if task_id not in plan:
            err(f"sprint-plan.md missing {task_id}")

if errors:
    print(f"Sprint validation failed with {len(errors)} error(s):")
    for message in errors:
        print("-", message)
    sys.exit(1)

print(f"Sprint validation passed: {len(sprints)} sprints, {len(ordered_tasks)} tasks")
