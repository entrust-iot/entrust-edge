#!/bin/bash

scripts=$(find . -name run.sh)

for a in $scripts
do
  echo executing $a
  $a
done
