#!/bin/bash
# dev-supervisor.sh <name> <port> <command...>
#
# Keeps a dev server alive through node_modules churn (git post-merge pnpm
# installs), SSH-session CPU spikes, and stray processes holding the port.
# The supervisor itself never exits, so the Replit workflow stays "running"
# and the preview recovers on its own instead of needing a manual restart.

NAME="$1"
PORT="$2"
shift 2

log() { echo "[supervisor:$NAME] $*"; }

CHILD=""
trap 'log "received stop signal; shutting down"; [ -n "$CHILD" ] && kill -TERM "$CHILD" 2>/dev/null; exit 0' TERM INT

while true; do
  # 1. Don't boot while dependencies are being rewritten underneath us.
  WAITED=0
  while pgrep -f "pnpm (install|i --frozen-lockfile|install --frozen-lockfile)" >/dev/null 2>&1; do
    [ "$WAITED" -eq 0 ] && log "pnpm install in progress; waiting for it to finish..."
    sleep 3
    WAITED=$((WAITED + 3))
    [ "$WAITED" -ge 120 ] && { log "waited 120s for pnpm install; proceeding anyway"; break; }
  done

  # 2. Free the port from stale/orphaned listeners (e.g. left by SSH sessions).
  STALE=$(lsof -t -i ":$PORT" -s TCP:LISTEN 2>/dev/null)
  if [ -n "$STALE" ]; then
    log "killing stale listener(s) on port $PORT: $STALE"
    kill $STALE 2>/dev/null
    sleep 1
    STALE=$(lsof -t -i ":$PORT" -s TCP:LISTEN 2>/dev/null)
    [ -n "$STALE" ] && kill -9 $STALE 2>/dev/null
    sleep 1
  fi

  # 3. Run the server in the foreground.
  log "starting: $*"
  START=$(date +%s)
  "$@" &
  CHILD=$!
  wait "$CHILD"
  CODE=$?
  CHILD=""
  RAN=$(( $(date +%s) - START ))

  # 4. Crash-loop backoff: quick restart after a long healthy run,
  #    slower retries if it keeps dying immediately.
  if [ "$RAN" -ge 60 ]; then
    BACKOFF=2
  else
    BACKOFF=$(( ${BACKOFF:-2} * 2 ))
    [ "$BACKOFF" -gt 30 ] && BACKOFF=30
  fi
  log "exited with code $CODE after ${RAN}s; restarting in ${BACKOFF}s"
  sleep "$BACKOFF"
done
