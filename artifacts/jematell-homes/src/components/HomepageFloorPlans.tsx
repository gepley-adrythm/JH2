"use client";
import { FloorPlanTiersSection } from "../views/ContentPageFloorPlans";

const STUB_SECTION = {
  heading: { type: "h2" as const, text: "Explore Floor Plans" },
  blocks: [] as never[],
};

export function HomepageFloorPlans() {
  return <FloorPlanTiersSection section={STUB_SECTION} />;
}
