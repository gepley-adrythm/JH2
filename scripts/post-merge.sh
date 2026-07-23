#!/bin/bash
# Post-merge hook: keep it fast, never fail hard, never exceed the 20s
# postMerge timeout. The dev supervisors pause while install runs and
# restart the servers on their own afterwards, so failures here must not
# take the workspace down.

MARKER=/tmp/post-merge-degraded
rm -f "$MARKER"

pnpm install --frozen-lockfile --prefer-offline || {
  echo "post-merge: pnpm install FAILED (continuing)" >&2
  echo "$(date -Is) pnpm install failed" >> "$MARKER"
}

# DB push can hang on a live connection; cap it well under the 20s budget.
timeout 12 pnpm --filter db push || {
  echo "post-merge: db push FAILED or timed out (continuing)" >&2
  echo "$(date -Is) db push failed/timed out" >> "$MARKER"
}

# Never fail the merge hook — the dev supervisors keep the servers alive and
# /tmp/post-merge-degraded flags any degraded state for follow-up.
exit 0
