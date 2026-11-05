import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import SkillExplorer from "./SkillExplorer";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/profile";

// Regexes can't cross to the client, so match skills to projects here and pass slugs.
export const skillIndex = skillGroups.map(({ group, skills }) => ({
  group,
  skills: skills
    .map(({ name, re }) => ({ name, slugs: projects.filter((p) => p.tags.some((t) => re.test(t.label))).map((p) => p.slug) }))
    .filter((s) => s.slugs.length > 0),
}));

export default function Skills() {
  return (
    <section id="skills" className="border-y border-fg/5 bg-bg-surface/40 py-section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Skills &amp; all projects</p>
          <h2 className="text-display-md font-semibold">
            Pick a skill to see where I used it. <span className="text-text-muted">Every project, not just the featured ones.</span>
          </h2>
        </Reveal>
        <SkillExplorer
          groups={skillIndex}
          projects={projects.map((p) => ({ slug: p.slug, featured: p.featured, card: <ProjectCard project={p} compact /> }))}
        />
      </div>
    </section>
  );
}
