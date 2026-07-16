#!/usr/bin/env python3
from pathlib import Path
import json,re,sys
ROOT=Path(__file__).resolve().parents[1]
errors=[]

def err(x): errors.append(x)
try: data=json.loads((ROOT/'docs/architecture/task-dependencies.json').read_text())
except Exception as e: print(f'Cannot read dependency data: {e}'); raise SystemExit(1)
manifest=json.loads((ROOT/'blueprint.manifest.json').read_text())
state=json.loads((ROOT/'.codex/project-state.json').read_text())
if manifest.get('version')!='4.3': err('manifest version must be 4.3')
if len(data)!=51: err(f'expected 51 tasks, found {len(data)}')
profiles={p.stem for p in (ROOT/'docs/task-profiles').glob('*.md')}
if len(profiles)!=7: err(f'expected 7 profiles, found {len(profiles)}')
skills={p.parent.name for p in (ROOT/'.codex/skills').glob('*/SKILL.md')}
if len(skills)!=10: err(f'expected 10 skills, found {len(skills)}')
required=['scripts/task-context.py','scripts/generate-task-docs.py','scripts/project-state.py','docs/architecture/VALIDATION-TIERS.md','AGENTS.md']
for r in required:
    if not (ROOT/r).exists(): err(f'missing {r}')
ids=set(data)
for tid,m in data.items():
    p=ROOT/'docs/tasks'/f'{tid}.md'
    if not p.exists(): err(f'missing task file {tid}'); continue
    text=p.read_text()
    if not text.startswith(f'# {tid}: {m["title"]}'):
        err(f'{tid} title mismatch')
    for key in ('profile','skills','validationTier','allowedFiles','inputs','acceptance','validationCommands'):
        if key not in m: err(f'{tid} missing metadata {key}')
    if m.get('profile') not in profiles: err(f'{tid} unknown profile {m.get("profile")}')
    for s in m.get('skills',[]):
        if s not in skills: err(f'{tid} unknown skill {s}')
    if m.get('validationTier') not in {'fast','standard','full'}: err(f'{tid} invalid validation tier')
    if not m.get('allowedFiles'): err(f'{tid} has empty allowlist')
    if len(m.get('acceptance',[]))<2: err(f'{tid} needs at least 2 task-specific acceptance items')
    if not m.get('validationCommands'): err(f'{tid} has no validation commands')
    for dep in m.get('dependsOn',[]):
        if dep not in ids: err(f'{tid} unknown dependency {dep}')
    for section in ('Dependencies','Inputs','Skills','Allowed Files','Deliverable','Task-Specific Acceptance','Validation Commands','Finish'):
        if f'## {section}' not in text: err(f'{tid} missing section {section}')
    if '## Forbidden Changes' in text or '## Completion Report' in text:
        err(f'{tid} contains duplicated verbose sections')
# cycle check
seen=set(); stack=set()
def visit(n):
    if n in stack: err(f'dependency cycle at {n}'); return
    if n in seen: return
    stack.add(n)
    for d in data[n].get('dependsOn',[]): visit(d)
    stack.remove(n); seen.add(n)
for n in data: visit(n)
# state integrity
for k in state.get('completed',[]):
    if k not in ids: err(f'state unknown completed task {k}')
for group in ('blocked','waived'):
    vals=state.get(group,[])
    if isinstance(vals,list):
        for x in vals:
            tid=x if isinstance(x,str) else x.get('task')
            if tid and tid not in ids: err(f'state unknown {group} task {tid}')
# generated views mention all IDs
for rel in ('docs/architecture/TASK-MATRIX.md','docs/architecture/DEPENDENCY-GRAPH.md'):
    t=(ROOT/rel).read_text()
    for tid in ids:
        if tid not in t: err(f'{rel} missing {tid}')
if errors:
    print(f'Blueprint validation failed with {len(errors)} error(s):')
    for e in errors: print('-',e)
    raise SystemExit(1)
print(f'Blueprint validation passed: {len(data)} tasks, {len(profiles)} profiles, {len(skills)} skills')
