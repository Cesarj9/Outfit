#!/bin/bash
# wild.sh: reroll a wild-choice screen; if a NEW aurora appears, stop (exit 7) WITHOUT fleeing; else flee.
out=$(node attempt.js 2>&1); echo "$out" | cut -c1-300
if echo "$out" | grep -q '"hit":{'; then echo "NEW AURORA FOUND - NOT FLEEING"; exit 7; fi
node flee.js
