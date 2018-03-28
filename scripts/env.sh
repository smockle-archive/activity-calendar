#!/usr/bin/env bash

# Abort if any command exits with error.
set -e

# By default, Bash takes the error status of the last item in pipeline.
# Instead, exit when any item in the pipeline fails.
set -o pipefail

# Create file, if it doesn’t exist
touch .env

# Declare variables
cat <<EOF > .env
IFTTT_EVENT=
IFTTT_KEY=
PORT=
EOF

# Assign variables
perl -pi -e "s/IFTTT_EVENT=/IFTTT_EVENT=$IFTTT_EVENT/g" .env
perl -pi -e "s/IFTTT_KEY=/IFTTT_KEY=$IFTTT_KEY/g" .env
perl -pi -e "s/PORT=/PORT=$PORT/g" .env
