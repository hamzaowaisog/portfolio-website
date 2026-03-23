"use client";

import SectionReveal from "@/components/SectionReveal";

interface TechnicalHighlightsProps {
  highlights: string[];
  accentColor: string;
}

export default function TechnicalHighlights({ highlights, accentColor }: TechnicalHighlightsProps) {
  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-container mx-auto px-6">
        <SectionReveal>
          <p
            className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: accentColor }}
          >
            // Technical Highlights
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <h2 className="text-display-sm font-semibold text-text-primary mb-10">
            What was built
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {highlights.map((item, i) => (
            <SectionReveal key={i} delay={0.07 + i * 0.05}>
              <div className="flex items-start gap-3 p-4 rounded-card border border-white/5 bg-bg-surface hover:border-white/10 hover:bg-bg-elevated transition-all">
                <span
                  className="mt-1 shrink-0 text-lg"
                  style={{ color: accentColor }}
                >
                  ◈
                </span>
                <p className="text-text-muted text-sm leading-relaxed">{item}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
