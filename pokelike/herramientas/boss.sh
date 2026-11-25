#!/bin/bash
# boss.sh [order...] : enter n8_0 (if on map), optionally reorder, fight
node map.js 2>/dev/null | grep -q "n8_0.*CLICK" && node go.js n8_0 >/dev/null 2>&1
node txt.js 3000 2>/dev/null | tr '\n' ' ' | grep -o '[A-Za-z. ]* | [A-Za-z ]*\(Gym\|League\)[^|]*\|OPPONENT.*\|RIVAL .*' | cut -c1-300
if [ "$1" = "show" ]; then exit 0; fi
[ $# -gt 0 ] && node order.js "$@" 2>/dev/null | tail -1
node fight.js 2>/dev/null | tail -1 | cut -c1-700
