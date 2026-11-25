#!/bin/bash
# prints best path (node ids) from clickable nodes to n8_0. TEAMN env = team size
node map.js 2>/dev/null | python3 -c "
import sys,os,re
team=int(os.environ.get('TEAMN','6'))
N={};A={};C=[]
for l in sys.stdin:
  p=l.split()
  if not p or not p[0].startswith('n'): continue
  nid=p[0]; spr=p[1]; click='CLICK' in p
  m=re.search(r'-> ?(\S*) @',l); nxt=[x.rstrip('*') for x in (m.group(1).split(',') if m and m.group(1) else [])]
  N[nid]=spr; A[nid]=[x for x in nxt if x!=nid and x!='n0_0']
  if click: C.append(nid)
trainers={'hiker','fisher','policeman','scientist','fire-spitter','old-guy','team-rocket','ace-trainer','swimmer','biker','lass','youngster','beauty'}
def sc(s,row):
  if s=='bug-catcher': return float(os.environ.get('BUGSC','0.8'))
  if s=='hiker': return float(os.environ.get('HIKESC','3.5'))
  if s in trainers: return 3.5
  if s=='grass': return float(os.environ.get('GRASSSC','2.5'))
  if s=='pokeball': return float(os.environ.get('PBSC','2.0')) if team<6 else 0.5
  if s=='item-icon': return float(os.environ.get('ITEMSC','1.0'))
  if s=='poke-center': return float(os.environ.get('CENTERSC','2.5')) if row>=6 else 0.5
  if s=='question-mark': return 1.2
  if s=='move-tutor': return float(os.environ.get('TUTORSC','1.0'))
  if s=='legendary-encounter': return float(os.environ.get('LEGSC','6'))
  if s=='trade-icon': return 0.2
  if s=='mistery-trainer': return 0
  return 1
from functools import lru_cache
@lru_cache(None)
def best(n):
  if n=='n8_0': return (0,('n8_0',))
  opts=[best(x) for x in A.get(n,[]) if x in N]
  if not opts: return (-99,(n,))
  b=max(opts)
  row=int(n[1:].split('_')[0])
  return (b[0]+sc(N[n],row),(n,)+b[1])
r=max(best(c) for c in C)
print(' '.join(x for x in r[1] if x!='n8_0'), '#', round(r[0],1), ' '.join(N[x] for x in r[1] if x!='n8_0'))
"
