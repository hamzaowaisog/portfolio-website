"use client";

import SectionReveal from "./SectionReveal";

const principles = [
  {
    number: "01",
    title: "Ship Incrementally",
    body: "Environments (dev/QA/staging/prod) are not deployment ceremonies. They are safety nets that keep teams moving fast without fear.",
  },
  {
    number: "02",
    title: "Respect the Domain",
    body: "Strong backends with clear domain separation outlast any framework. Business rules belong in the service layer, not scattered across controllers.",
  },
  {
    number: "03",
    title: "Protect the User",
    body: "Offline storage for field workers, encrypted analytics identifiers for health data, source-traceable AI responses — reliability is a feature.",
  },
  {
    number: "04",
    title: "Make Trade-offs Visible",
    body: "The best engineering decisions are documented. Architecture choices that live only in Slack are technical debt waiting to materialize.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-section bg-bg">
      <div className="max-w-container mx-auto px-6">
        {/* Section label */}
        <SectionReveal>
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-4">
            // About
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: identity copy */}
          <div>
            <SectionReveal delay={0.05}>
              <h2 className="text-display-md font-semibold text-text-primary mb-6">
                I build software that works under{" "}
                <span className="text-accent">real operational pressure</span>,
                not just in demo conditions.
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <p className="text-text-muted text-lg leading-relaxed mb-5">
                My engineering style is pragmatic and product-aware: design clean
                boundaries, keep operations observable, and make architecture
                choices that support long-term change.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p className="text-text-muted text-lg leading-relaxed mb-5">
                I work best at the intersection of software architecture and delivery — translating complex business processes into maintainable service boundaries, from offline agritech field apps to source-aware AI retrieval pipelines.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="text-text-muted text-lg leading-relaxed">
                I optimize for systems that are{" "}
                <span className="text-text-primary">understandable by teams</span>,{" "}
                <span className="text-text-primary">trusted by users</span>, and{" "}
                <span className="text-text-primary">resilient in production</span>.
              </p>
            </SectionReveal>
          </div>

          {/* Right: Operating Principles */}
          <div className="space-y-4">
            {principles.map((p, i) => (
              <SectionReveal key={p.number} delay={0.1 + i * 0.07}>
                <div className="group p-5 rounded-card border border-white/7 bg-bg-surface hover:border-accent/20 hover:bg-bg-elevated transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-accent/60 mt-1 shrink-0">
                      {p.number}
                    </span>
                    <div>
                      <h3 className="text-text-primary font-medium mb-1.5">
                        {p.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
