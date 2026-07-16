#!/usr/bin/env python3
from pathlib import Path
import json
R=Path(__file__).resolve().parents[1]; d=json.loads((R/'docs/architecture/task-dependencies.json').read_text())
rows=['# Task Matrix','','| Task | Profile | Tier | Direct dependencies |','|---|---|---|---|']
for k,v in d.items(): rows.append(f"| {k} | {v['profile']} | {v['validationTier']} | {', '.join(v['dependsOn']) or 'None'} |")
(R/'docs/architecture/TASK-MATRIX.md').write_text('\n'.join(rows)+'\n')
g=['# Dependency Graph','','```mermaid','graph TD']
for k,v in d.items():
    if not v['dependsOn']: g.append(f'  {k}')
    for dep in v['dependsOn']: g.append(f'  {dep} --> {k}')
g.append('```'); (R/'docs/architecture/DEPENDENCY-GRAPH.md').write_text('\n'.join(g)+'\n')
print(f'Generated views for {len(d)} tasks')
