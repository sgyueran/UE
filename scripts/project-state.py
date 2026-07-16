#!/usr/bin/env python3
from pathlib import Path
import argparse,json,subprocess,datetime,sys
ROOT=Path(__file__).resolve().parents[1]
SP=ROOT/'.codex/project-state.json'; DP=ROOT/'docs/architecture/task-dependencies.json'
VALID={'not_started','in_progress','implemented','validating','completed','blocked'}
def load(): return json.loads(SP.read_text()),json.loads(DP.read_text())
def save(s): SP.write_text(json.dumps(s,indent=2)+"\n")
def now(): return datetime.datetime.now(datetime.timezone.utc).isoformat()
def git(*args):
    try:return subprocess.check_output(['git',*args],cwd=ROOT,text=True,stderr=subprocess.DEVNULL).strip()
    except:return None
p=argparse.ArgumentParser(); p.add_argument('action',choices=['start','implemented','validating','validation-result','complete','block','recover']); p.add_argument('task',nargs='?'); p.add_argument('reason',nargs='?'); p.add_argument('--commands',nargs='*',default=[]); a=p.parse_args()
s,d=load()
if a.action=='recover':
    print(json.dumps({'state':s,'gitHead':git('rev-parse','--short','HEAD'),'gitStatus':git('status','--short')},indent=2)); sys.exit()
if not a.task or a.task not in d: sys.exit('A valid TASK-XXX is required')
t=a.task; missing=[x for x in d[t]['dependsOn'] if x not in s['completed'] and x not in s['waived']]
if a.action=='start':
    if missing: sys.exit(f'Blocked by dependencies: {missing}')
    if s.get('inProgress') not in (None,t): sys.exit(f'Another task is in progress: {s["inProgress"]}')
    s.update(currentTask=t,status='in_progress',inProgress=t,dirtyAtLastCheck=bool(git('status','--short')),baselineCommit=git('rev-parse','HEAD'),preExistingChanges=(git('status','--short') or '').splitlines())
elif a.action=='implemented':
    if s.get('inProgress')!=t: sys.exit('Task must be started first')
    s['status']='implemented'
elif a.action=='validating':
    if s.get('inProgress')!=t or s.get('status') not in ('implemented','validating'): sys.exit('Task must be implemented first')
    s['status']='validating'; s['lastValidation']={'task':t,'timestamp':now(),'commands':[],'result':'running'}
elif a.action=='validation-result':
    if s.get('inProgress')!=t or s.get('status')!='validating': sys.exit('Task must be validating first')
    result=(a.reason or '').lower()
    if result not in ('passed','failed'): sys.exit('Result must be passed or failed')
    s['lastValidation']={'task':t,'timestamp':now(),'commands':a.commands,'result':result}
elif a.action=='complete':
    lv=s.get('lastValidation') or {}
    if s.get('inProgress')!=t or lv.get('task')!=t or lv.get('result')!='passed': sys.exit('Validation result must be recorded as passed before completion')
    if t not in s['completed']: s['completed'].append(t)
    s.update(status='completed',inProgress=None,lastCommit=git('rev-parse','HEAD'))
elif a.action=='block':
    reason=a.reason or 'Unspecified blocker'
    s['blocked']=[x for x in s['blocked'] if x.get('task')!=t] + [{'task':t,'reason':reason,'timestamp':now()}]
    s.update(currentTask=t,status='blocked',inProgress=None)
save(s); print(json.dumps(s,indent=2))
