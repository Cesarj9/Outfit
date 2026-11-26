#!/bin/bash
# wild ? screen: try rerolls for a new aurora; never flee if a hit, shiny or aurora card is visible
out=$(node attempt.js 2>&1); echo "$out" | cut -c1-300
if echo "$out" | grep -q '"hit":{'; then echo "NEW AURORA FOUND - NOT FLEEING"; exit 7; fi
if echo "$out" | grep -q 'NOT_CATCH_SCREEN'; then echo "UNKNOWN SCREEN - NOT FLEEING"; exit 8; fi
if echo "$out" | grep -qE 'card-(shiny|aurora)'; then echo "SHINY/AURORA VISIBLE - NOT FLEEING"; exit 9; fi
node flee.js
