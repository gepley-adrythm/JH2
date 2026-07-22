import { readFileSync } from "node:fs";
const p = JSON.parse(readFileSync("./clone-data/extracted/pages.json", "utf8"));
const d = p["aboutus"];
console.log(JSON.stringify({ title: d.title, description: d.description, ogImage: d.ogImage }, null, 2));
console.log("--- ALL blocks (type + text/src) ---");
d.blocks.forEach((b, i) => {
  const v = b.text || b.src || "";
  console.log(i, b.type, JSON.stringify(v.slice(0, 100)));
});
