"use client";

import SectionReveal from "@/components/SectionReveal";
import ArchitectureDiagram from "@/components/project/ArchitectureDiagram";
import { diagrams } from "@/data/diagrams";
import type { Project } from "@/lib/types";

interface ArchitectureSectionProps {
  project: Project;
}

export default function ArchitectureSection({ project }: ArchitectureSectionProps) {
  const diagram = diagrams[project.slug];

  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-container mx-auto px-6 space-y-12">

        {/* Challenge + Solution — 2 col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Challenge */}
          <div>
            <SectionReveal>
              <p
                className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: project.accentColor }}
              >
                // The Challenge
              </p>
            </SectionReveal>

            <SectionReveal delay={0.05}>
              <h2 className="text-display-sm font-semibold text-text-primary mb-4">
                Why this system exists
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <p className="text-text-muted leading-relaxed text-lg">
                {project.challenge}
              </p>
            </SectionReveal>
          </div>

          {/* Solution */}
          <div>
            <SectionReveal delay={0.05}>
              <p
                className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: project.accentColor }}
              >
                // The Solution
              </p>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="text-display-sm font-semibold text-text-primary mb-4">
                How it was built
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="text-text-muted leading-relaxed text-lg">
                {project.solution}
              </p>
            </SectionReveal>
          </div>
        </div>

        {/* Architecture Diagram — full width */}
        {diagram && (
          <div>
            <SectionReveal>
              <p
                className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: project.accentColor }}
              >
                // System Architecture
              </p>
            </SectionReveal>

            <SectionReveal delay={0.07}>
              <h2 className="text-display-sm font-semibold text-text-primary mb-6">
                How the pieces connect
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <ArchitectureDiagram
                nodes={diagram.nodes}
                edges={diagram.edges}
                title={diagram.title}
                accentColor={project.accentColor}
              />
            </SectionReveal>
          </div>
        )}

        {/* Architecture layer list + flow note */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Numbered layer list */}
          <SectionReveal delay={0.08}>
            <div className="rounded-card border border-white/7 bg-bg-surface overflow-hidden h-full">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-bg-elevated">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: project.accentColor + "80" }}
                />
                <span className="ml-2 font-mono text-xs text-text-subtle">
                  architecture.layers
                </span>
              </div>
              <div className="p-5 space-y-2.5">
                {project.architectureOverview.map((layer, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="font-mono text-xs mt-0.5 shrink-0 tabular-nums"
                      style={{ color: project.accentColor }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-mono text-xs text-text-muted leading-relaxed">
                      {layer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Data flow note */}
          {project.architectureNote && (
            <SectionReveal delay={0.14}>
              <div className="rounded-card border border-white/7 bg-bg-surface overflow-hidden h-full">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-bg-elevated">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: project.accentColor + "80" }}
                  />
                  <span className="ml-2 font-mono text-xs text-text-subtle">
                    data.flow
                  </span>
                </div>
                <div className="p-5">
                  <p
                    className="font-mono text-xs mb-3"
                    style={{ color: project.accentColor + "90" }}
                  >
                    &gt; request lifecycle
                  </p>
                  <p className="font-mono text-xs text-text-muted leading-loose">
                    {project.architectureNote}
                  </p>
                </div>
              </div>
            </SectionReveal>
          )}
        </div>

      </div>
    </section>
  );
}
