#!/usr/bin/env python3
from pathlib import Path
import argparse,json,subprocess,sys
ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'docs/architecture/task-dependencies.json'
def read(path):
    p=ROOT/path
    if p.is_dir(): return f'[Directory input: {path}]'
    return p.read_text(encoding='utf-8') if p.exists() else f'[Missing: {path}]'
def main():
    ap=argparse.ArgumentParser(); ap.add_argument('task'); ap.add_argument('--write',action='store_true'); ap.add_argument('--inspect',action='store_true'); a=ap.parse_args()
    tasks=json.loads(DATA.read_text()); tid=a.task.upper()
    if tid not in tasks: raise SystemExit(f'Unknown task: {tid}')
    m=tasks[tid]; state=json.loads((ROOT/'.codex/project-state.json').read_text())
    try: status=subprocess.check_output(['git','status','--short'],cwd=ROOT,text=True,stderr=subprocess.DEVNULL).strip()
    except Exception: status='GIT_NOT_AVAILABLE'
    parts=[f'# Minimal Context: {tid}',f"\nTitle: {m['title']}",f"Profile: {m['profile']}",f"Risk: {m['risk']}",f"Validation Tier: {m['validationTier']}",f"Dependencies: {', '.join(m['dependsOn']) or 'none'}",f"Completed dependencies: {', '.join(x for x in m['dependsOn'] if x in state.get('completed',[])) or 'none'}",f"Git status before task:\n```\n{status or 'clean'}\n```",'\n## Task Contract\n',read(f'docs/tasks/{tid}.md'),'\n## Task Profile\n',read(f"docs/task-profiles/{m['profile']}.md")]
    for x in m.get('inputs',[]):
        if not x.endswith('/'): parts += [f'\n## Routed Input: {x}\n',read(x)]
    for s in m.get('skills',[]): parts += [f'\n## Skill: {s}\n',read(f'.codex/skills/{s}/SKILL.md')]
    if a.inspect:
        parts += ['\n## Preflight Inspection\n- Inspect allowlisted files only.\n- Search for existing equivalent components, hooks, types, and styles.\n- Determine whether the task is already partially complete.\n- Preserve unknown user changes.']
    out='\n'.join(parts).strip()+'\n'
    if a.write:
        p=ROOT/'.codex/generated-context'/f'{tid}.md'; p.parent.mkdir(parents=True,exist_ok=True); p.write_text(out); print(p.relative_to(ROOT))
    else: print(out)
if __name__=='__main__': main()
