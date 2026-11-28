#!/bin/bash
# fnloop.sh N : reset if stuck on catch screen, then run N first-node attempts looking for a new aurora
if node shotq.js 2>&1|tail -1|grep -q "Apareció un Pokémon\|Elige un Pokémon"; then
  node ev.js "document.querySelector('.run-menu-btn--reset').click()" 1500 >/dev/null 2>&1
  node ev.js "const b=[...document.querySelectorAll('button')].find(b=>/REINICIAR DESDE EL PRINCIPIO/i.test(b.innerText));if(b)b.click()" 2500 >/dev/null 2>&1
fi
TEAMRE="${STARTRE:-Aron Nv5$}" timeout 560 node loop.js ${1:-45} 2>&1|tail -2|cut -c1-300
python3 -c "import json;print('total',json.load(open('attempts2.json'))['confirmados'])"
