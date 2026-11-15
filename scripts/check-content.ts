// Run: node scripts/check-content.ts — fails if a skill matches no project or a link/diagram points at a missing slug.
import assert from "node:assert/strict";
import { projects } from "../data/projects.ts";
import { experience, skillGroups } from "../data/profile.ts";
import { diagrams } from "../data/diagrams.ts";

const slugs = new Set(projects.map((p) => p.slug));
for (const { skills } of skillGroups)
  for (const s of skills) assert.ok(projects.some((p) => p.tags.some((t) => s.re.test(t.label))), `skill matches nothing: ${s.name}`);
for (const r of experience) for (const pt of r.points) if (pt.slug) assert.ok(slugs.has(pt.slug), `bad slug: ${pt.slug}`);
for (const [k, d] of Object.entries(diagrams)) {
  assert.ok(slugs.has(k), `diagram for missing project: ${k}`);
  const ids = new Set(d.nodes.map((n) => n.id));
  for (const e of d.edges) assert.ok(ids.has(e.from) && ids.has(e.to), `${k}: edge ${e.from}->${e.to}`);
}
assert.equal(projects.filter((p) => p.featured).map((p) => p.slug).join(),
  "myendo-mobile,ted2-frontend-monorepo,angus-media-sale-book,landteller,ai-factory,malani-wholesale");
console.log(`ok: ${projects.length} projects, ${Object.keys(diagrams).length} diagrams`);
