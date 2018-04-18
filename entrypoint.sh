#!/usr/bin/env sh

set +e

exec node ./bin/timecloud-standalone.js --db=$MONGODB_URI --collection=$COLLECTION
