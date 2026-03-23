"use client";

import SectionReveal from "./SectionReveal";
import ProjectCard from "./ProjectCard";
import { featuredProjects } from "@/data/projects";

export default function FeaturedProjects() {
  return (
    <section id="work" className="py-section bg-bg">
      <div className="max-w-container mx-auto px-6">
        <SectionReveal>
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-4">
            // Featured Work
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <h2 className="text-display-md font-semibold text-text-primary mb-3">
            Production systems,
            <span className="text-text-muted"> not toy apps.</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-text-muted text-lg max-w-2xl mb-16 leading-relaxed">
            Shipping real products across agritech, healthcare, and enterprise AI.
            Each case study shows the architecture, the decisions, and the honest trade-offs.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {featuredProjects.map((project, i) => (
            <SectionReveal key={project.slug} delay={0.1 + i * 0.1} className="h-full">
              <ProjectCard project={project} featured />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
