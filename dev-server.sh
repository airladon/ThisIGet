#!/usr/bin/env sh
npm run watchWithMoreMemory &
flask run --host 0.0.0.0 &
# npm run watch & flask run --host 0.0.0.0