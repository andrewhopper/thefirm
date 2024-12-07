#!/bin/bash

# Kill existing screen sessions if they exist
screen -S websocket-server -X quit >/dev/null 2>&1
screen -S worker -X quit >/dev/null 2>&1

# Start each service in a new screen session
screen -dmS websocket-server bash -c "tsx src/websocker-server.ts"
screen -dmS worker bash -c "tsx src/workers/index.ts"

# List running screen sessions
echo "Started services in screen sessions. Use 'screen -ls' to list sessions."
echo "To attach to a session, use: screen -r [session-name]"
screen -ls