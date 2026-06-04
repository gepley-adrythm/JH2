---
name: Floor-plan tier image ordering
description: How tier images map to tiers in the "Explore Floor Plans" sections of jematell-homes location/region pages
---

# Floor-plan tier image ordering

In `clone-data/extracted/pages.json`, the enriched "Explore Floor Plans" section
(present on every location/region page and Build-On-Your-Lot) lays out each tier as
**image THEN h4 THEN p** — i.e. each floor-plan blueprint image comes *immediately
before* the `<h4>` it belongs to (an image-on-top card layout). There is also a
trailing decorative image (an aerial photo) after the final tier's body.

`FloorPlanTiersSection` (artifacts/jematell-homes/src/pages/ContentPage.tsx) must
therefore hold each image as *pending* and attach it to the **next** tier's h4, then
discard any trailing image left after the last tier.

**Why:** an earlier version attached an image to the tier whose title was already set
(image-after assumption). With image-before data this is off-by-one: every tier showed
the next tier's blueprint, the first blueprint was dropped, and the "Over 3,000 Sq Ft"
tier ended up showing the trailing aerial *photo* instead of its 3771-sqft blueprint.

**How to apply:** if you ever "simplify" the tier grouping or re-extract this content,
keep the image-before-h4 mapping (and the trailing-image discard). All four CDN images
(1849 / 2616 / 3771 sqft floor plans + the aerial) return HTTP 200; the blueprint was
never missing, only mis-assigned.
