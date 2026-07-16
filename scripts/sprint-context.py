#!/usr/bin/env python3
from pathlib import Path
import argparse
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]
TASKS_PATH = ROOT / "docs" / "architecture" / "task-dependencies.json"
SPRINTS_PATH = ROOT / "docs" / "architecture" / "sprints.json"
STATE_PATH = ROOT / ".codex" / "project-state.json"


def git_status():
    try:
        return subprocess.check_output(
            ["git", "status", "--short"],
            cwd=ROOT,
            text=True,
            stderr=subprocess.DEVNULL,
        ).strip()
    except Exception:
        return "GIT_NOT_AVAILABLE"


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def resolve_sprint(sprints, requested, completed):
    sid = requested.upper()
    if sid == "NEXT":
        for sprint in sprints:
            if any(task not in completed for task in sprint["tasks"]):
                return sprint
        raise SystemExit("All Sprint tasks are completed.")
    for sprint in sprints:
        if sprint["id"] == sid:
            return sprint
    raise SystemExit(f"Unknown sprint: {requested}")


def task_line(task_id, task, completed):
    deps = task.get("dependsOn", [])
    missing = [dep for dep in deps if dep not in completed]
    status = "completed" if task_id in completed else "blocked" if missing else "ready"
    dep_text = ", ".join(deps) if deps else "none"
    missing_text = ", ".join(missing) if missing else "none"
    return (
        f"| {task_id} | {task['title']} | {status} | {task['profile']} | "
        f"{task['validationTier']} | {dep_text} | {missing_text} |"
    )


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("sprint", help="SPRINT-XX or NEXT")
    parser.add_argument("--write", action="store_true")
    parser.add_argument("--inspect", action="store_true")
    args = parser.parse_args()

    tasks = load_json(TASKS_PATH)
    config = load_json(SPRINTS_PATH)
    state = load_json(STATE_PATH)
    completed = set(state.get("completed", []))
    sprint = resolve_sprint(config["sprints"], args.sprint, completed)

    lines = [
        f"# Sprint Context: {sprint['id']}",
        "",
        f"Title: {sprint['title']}",
        f"Goal: {sprint['goal']}",
        f"Task count: {len(sprint['tasks'])}",
        f"Completed tasks in Sprint: {sum(1 for task in sprint['tasks'] if task in completed)}",
        "Git status before Sprint planning:",
        "```",
        git_status() or "clean",
        "```",
        "",
        "## Tasks",
        "",
        "| Task | Title | Status | Profile | Validation Tier | Dependencies | Missing Dependencies |",
        "|---|---|---|---|---|---|---|",
    ]
    for task_id in sprint["tasks"]:
        lines.append(task_line(task_id, tasks[task_id], completed))

    lines += [
        "",
        "## Execution Rules",
        "",
        "- Sprint context is planning context only.",
        "- Execute one task at a time unless an explicit Sprint batch is authorized.",
        "- Each task keeps its own Allowed Files and validation commands.",
        "- Do not mark Sprint completion in `.codex/project-state.json`.",
    ]

    if args.inspect:
        lines += [
            "",
            "## Preflight Inspection",
            "",
            "- Confirm the next task has no missing dependencies.",
            "- Inspect only the selected task's Allowed Files before editing.",
            "- Preserve unknown user changes.",
            "- Do not start a later task from the Sprint automatically.",
        ]

    lines += ["", "## Task Details", ""]
    for task_id in sprint["tasks"]:
        task = tasks[task_id]
        allowed = ", ".join(task.get("allowedFiles", []))
        validation = ", ".join(task.get("validationCommands", []))
        lines += [
            f"### {task_id}: {task['title']}",
            "",
            f"- Profile: {task['profile']}",
            f"- Risk: {task['risk']}",
            f"- Validation Tier: {task['validationTier']}",
            f"- Allowed Files: {allowed}",
            f"- Validation Commands: {validation}",
            "",
        ]

    output = "\n".join(lines).rstrip() + "\n"
    if args.write:
        out = ROOT / ".codex" / "generated-context" / f"{sprint['id']}.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(output, encoding="utf-8")
        print(out.relative_to(ROOT))
    else:
        print(output)


if __name__ == "__main__":
    main()
