#!/usr/bin/env python3
from pathlib import Path
import argparse,json,sys
R=Path(__file__).resolve().parents[1]
d=json.loads((R/'docs/architecture/task-dependencies.json').read_text())
s=json.loads((R/'.codex/project-state.json').read_text())
ap=argparse.ArgumentParser(); ap.add_argument('tasks',nargs='+'); a=ap.parse_args()
tasks=[x.upper() for x in a.tasks]
errors=[]
if not 2 <= len(tasks) <= 3: errors.append('batch size must be 2 or 3 tasks')
for t in tasks:
    if t not in d: errors.append(f'unknown task {t}')
if not errors:
    profiles={d[t]['profile'] for t in tasks}
    if len(profiles)!=1: errors.append('all batch tasks must use the same profile')
    forbidden={'foundation','motion-interaction','threejs-media','testing-quality','deployment-release'}
    if profiles & forbidden: errors.append('this profile is not batch-safe')
    allowed=[]
    for t in tasks:
        missing=[x for x in d[t]['dependsOn'] if x not in s.get('completed',[]) and x not in tasks]
        if missing: errors.append(f'{t} blocked by {", ".join(missing)}')
        allowed += d[t].get('allowedFiles',[])
    exact=[x for x in allowed if '*' not in x]
    if len(exact)!=len(set(exact)): errors.append('task allowlists overlap on exact file paths')
if errors:
    print('Batch rejected:')
    for e in errors: print('-',e)
    raise SystemExit(1)
print('Batch eligible:',', '.join(tasks))
print('Each task must still have independent state and validation records.')
