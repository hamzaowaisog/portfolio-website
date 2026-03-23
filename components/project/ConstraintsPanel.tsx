"use client";

import SectionReveal from "@/components/SectionReveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ConstraintsPanelProps {
  constraints: string[];
  accentColor: string;
  nextProject?: { slug: string; title: string } | null;
}

export default function ConstraintsPanel({
  constraints,
  accentColor,
  nextProject,
}: ConstraintsPanelProps) {
  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Constraints */}
          <div>
            <SectionReveal>
              <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4 text-text-subtle">
                // Constraints & What I&apos;d Do Differently
              </p>
            </SectionReveal>

            <SectionReveal delay={0.05}>
              <h2 className="text-display-sm font-semibold text-text-primary mb-4">
                Honest retrospective
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <p className="text-text-muted mb-6 leading-relaxed">
                Every production system has trade-offs. These are the real constraints and improvement vectors I&apos;d address in the next iteration.
              </p>
            </SectionReveal>

            <div className="space-y-3">
              {constraints.map((c, i) => (
                <SectionReveal key={i} delay={0.1 + i * 0.07}>
                  <div className="flex items-start gap-3 p-4 rounded-card border border-yellow-500/10 bg-yellow-500/3">
                    <span className="text-yellow-500/60 mt-0.5 shrink-0 font-mono text-xs">
                      ↳
                    </span>
                    <p className="text-text-muted text-sm leading-relaxed">{c}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

          {/* Next project CTA */}
          {nextProject && (
            <SectionReveal delay={0.15} direction="left">
              <div className="p-6 rounded-card border border-white/7 bg-bg-surface h-fit">
                <p className="font-mono text-xs text-text-subtle mb-3">Next project →</p>
                <h3 className="text-text-primary text-lg font-semibold mb-4">
                  {nextProject.title}
                </h3>
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: accentColor }}
                >
                  View case study
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </SectionReveal>
          )}
        </div>
      </div>
    </section>
  );
}
