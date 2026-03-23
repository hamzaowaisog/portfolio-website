"use client";

import SectionReveal from "./SectionReveal";
import ProjectCard from "./ProjectCard";
import { secondaryProjects } from "@/data/projects";

export default function AllProjects() {
  return (
    <section className="py-section bg-bg-surface">
      <div className="max-w-container mx-auto px-6">
        <SectionReveal>
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-4">
            // More Work
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <h2 className="text-display-sm font-semibold text-text-primary mb-12">
            Platform architecture,
            <span className="text-text-muted"> explored in depth.</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {secondaryProjects.map((project, i) => (
            <SectionReveal key={project.slug} delay={0.1 + i * 0.08} className="h-full">
              <ProjectCard project={project} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
