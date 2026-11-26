#!/bin/bash
# tryboss.sh N "TYPE1|TYPE2|..." : full-restart loop until objective = Elección Táctica
# and the map-1 boss shows exactly one type from the list; then stop on the boss order screen.
RES="$2"
for it in $(seq 1 ${1:-10}); do
  if ! timeout 300 node leaderloop.js 60 "*" 2>&1 | grep -q HIT; then echo "it $it: no goal"; continue; fi
  path=$(node autopath.js 2>/dev/null | tail -1)
  for n in $path; do
    bash route.sh "$n" >/dev/null 2>&1
    node skip.js >/dev/null 2>&1
    node reject.js >/dev/null 2>&1
    node flee.js >/dev/null 2>&1
  done
  b=$(bash boss.sh show 2>&1 | tail -1)
  types=$(echo "$b" | grep -oE "RIVAL( [A-ZÁÉÍÓÚÑ]+ T[0-9])*" | grep -oE "[A-ZÁÉÍÓÚÑ]+ T[0-9]" | sed 's/ T[0-9]//' | tr '\n' ' ')
  echo "it $it boss: $(echo "$b" | cut -c1-110) | types: $types"
  nt=$(echo $types | wc -w)
  if [ "$nt" = "1" ] && echo "$types" | grep -qE "^($RES) ?$"; then echo "MATCH $types"; exit 0; fi
  node ev.js "document.querySelector('.run-menu-btn--reset').click();return 1" 100 >/dev/null 2>&1
  sleep 1.5
  node ev.js "const b=[...document.querySelectorAll('button')].filter(e=>e.offsetParent&&/REINICIAR DESDE EL PRINCIPIO/.test(e.innerText));b.length&&b[0].click();return b.length" 100 >/dev/null 2>&1
  sleep 2.5
done
