#!/bin/bash
# repeat fnloop until a HIT; args: rounds
for r in $(seq 1 ${1:-10}); do
  out=$(bash fnloop.sh 50); echo "$out"|tail -2
  echo "$out"|grep -q HIT && { echo FOUND; exit 0; }
done
