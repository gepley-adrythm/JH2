---
name: Jematell audit JS budget drift
description: The initial-JS-gzip audit gate is already at/over its configured budget from accumulated feature work, not any single change.
---

The `pnpm --filter @workspace/jematell-homes run audit` speed check enforces an
initial-JS-gzip budget (`CONFIG.initialJsGzipBudgetKB` in `scripts/audit.mjs`,
currently 180KB). The script's own comment says it was set with headroom over a
~139KB measurement, but by mid-2026 the real bundle had already drifted to
~180.7KB before any new feature work — i.e. the gate is failing on baseline,
not on the specific change you just made.

**Why this matters:** if you add a new feature and the audit fails on the JS
budget, don't assume you caused a meaningful regression. Diff-test first:
`git show HEAD:<file>` the touched files back to their committed version,
rebuild, and re-run the audit to see the pre-change number. If it's already
over/near budget without your change, the failure is pre-existing drift, not
something introduced by your edit — note that explicitly rather than clawing
back kB from an unrelated feature to force a pass.

**How to apply:** when this audit step fails, isolate your diff's real
contribution (usually well under 1KB for markup/copy tweaks) before attributing
the failure to your own work. If genuinely pre-existing, flag it for a
dedicated bundle-trim pass rather than fixing it inside an unrelated task.
