#!/bin/bash
# usage: route.sh node1 node2 ... ; pokeball nodes -> cnode (flee unless new aurora); others -> go.js; stops on aurora or non-map screen
for n in "$@"; do
  spr=$(node map.js 2>/dev/null | awk -v id=$n '$1==id{print $2}')
  if [ "$spr" = "pokeball" ] && [ -n "$CATCH" ]; then
    out=$(STAY=1 node cnode.js $n 2>&1 | grep -v agent-proxy); echo "$n: $out"; exit 5
  elif [ "$spr" = "pokeball" ]; then
    out=$(node cnode.js $n 2>&1 | grep -v agent-proxy); echo "$n: $out"
    echo "$out" | grep -q "NEW AURORA" && exit 2
  else
    out=$(node go.js $n 2>&1 | grep -v agent-proxy); echo "$n($spr): $(echo "$out" | grep -E '^TEAM|^SCREEN')"
    echo "$out" | grep -qiE "Objeto Encontrado|Item Found|Tutor de|Move Tutor|Intercambio|Trade Offer|apareci|appeared|¡Reliquia!|Relic!|Equipo lleno|Team Full|Elige un|Choose one|Elige su evoluci" && { echo "$out" | tail -1 | cut -c1-600; exit 3; }
    alive=$(echo "$out" | grep "^TEAM" | grep -oE "[0-9]+%" | awk -F% "\$1>25" | wc -l); tot=$(echo "$out" | grep "^TEAM" | grep -oE "[0-9]+%" | wc -l); need=$([ $tot -ge 5 ] && echo 4 || ([ $tot -ge 3 ] && echo 2 || echo 1)); [ "$alive" -lt "$need" ] && { echo "LOW HP: $alive healthy"; exit 4; }
    echo "$out" | grep -q "^SCREEN MAP" || { echo "$out" | tail -1 | cut -c1-600; exit 3; }
  fi
done
