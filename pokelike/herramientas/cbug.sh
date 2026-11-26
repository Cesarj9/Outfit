#!/bin/bash
# cbug.sh node releaseName : catch node, reroll toward bugs, pick first bug (else first shiny/any), release releaseName if team full
NOREROLL=1 CATCH=1 bash route.sh $1 >/dev/null 2>&1
cards=$(node bugpick.js 2>&1 | tail -1); echo "$cards"
idx=$(echo "$cards" | tr '|' '\n' | grep -E "aurora" | head -1 | awk '{print $1}')
[ -z "$idx" ] && idx=$(echo "$cards" | tr '|' '\n' | grep BICHO | head -1 | awk '{print $1}')
[ -z "$idx" ] && idx=$(echo "$cards" | tr '|' '\n' | grep shiny | head -1 | awk '{print $1}')
[ -z "$idx" ] && idx=0
node pick.js $idx 2>&1 | tail -1 | cut -c1-60; sleep 1
node -e "require('./lib')(async p=>{console.log(/Equipo Lleno/.test(await p.evaluate(()=>document.body.innerText))?'FULL':'OK')})" 2>/dev/null | grep -q FULL && [ -n "$2" ] && node rel.js $2 2>&1 | tail -1 | cut -c1-30
node ev.js "return document.querySelector('.achx-goal').title" 100 2>&1 | tail -1
