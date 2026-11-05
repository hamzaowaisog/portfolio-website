import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "@/data/projects";

export default function Work() {
  return (
    <section id="work" className="py-section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Featured work</p>
          <h2 className="text-display-md font-semibold">
            Recent and strongest first. <span className="text-text-muted">Each one opens into a full case study.</span>
          </h2>
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <ProjectCard project={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
