"use client";

import SectionReveal from "./SectionReveal";

const capabilities = [
  {
    area: "Backend & API",
    icon: "⬡",
    color: "text-blue-400",
    borderColor: "group-hover:border-blue-500/30",
    items: [
      ".NET 6 / ASP.NET Core Web API",
      "FastAPI (Python)",
      "Entity Framework Core",
      "SQL Server · PostgreSQL · MySQL",
      "Hangfire + Quartz.NET",
      "JWT + ASP.NET Identity",
      "REST API architecture",
      "Multi-tenant data patterns",
    ],
  },
  {
    area: "Mobile & Frontend",
    icon: "◈",
    color: "text-purple-400",
    borderColor: "group-hover:border-purple-500/30",
    items: [
      "React Native (0.79 / 0.81)",
      "Next.js (App Router)",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query + Zustand",
      "React Navigation",
      "Offline-first (SQLite / MMKV)",
      "Tailwind CSS + Framer Motion",
    ],
  },
  {
    area: "Platform & Operations",
    icon: "◎",
    color: "text-yellow-400",
    borderColor: "group-hover:border-yellow-500/30",
    items: [
      "Turborepo Monorepos",
      "Docker + Docker Compose",
      "Fastlane (iOS + Android)",
      "Multi-environment config",
      "CI/CD principles",
      "Swagger / OpenAPI",
      "Azure Storage · S3",
      "PostHog Analytics",
    ],
  },
  {
    area: "AI & Data",
    icon: "⬢",
    color: "text-accent",
    borderColor: "group-hover:border-accent/30",
    items: [
      "LangChain + Pinecone",
      "RAG pipeline architecture",
      "Hybrid retrieval strategy",
      "Langfuse (LLM observability)",
      "PostgreSQL vector workflows",
      "Ingestion mode design",
      "Prompt engineering",
      "Source-traceable responses",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-section bg-bg-surface">
      <div className="max-w-container mx-auto px-6">
        <SectionReveal>
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-4">
            // Engineering Capabilities
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <h2 className="text-display-md font-semibold text-text-primary mb-4">
            Not just syntax —
            <span className="text-text-muted"> deployed in production.</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-text-muted text-lg max-w-2xl mb-16 leading-relaxed">
            Every capability below is grounded in a shipped project. Grouped by what
            I actually use them for, not just what I can list.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => (
            <SectionReveal key={cap.area} delay={0.1 + i * 0.08}>
              <div
                className={`group h-full p-6 rounded-card border border-white/7 bg-bg hover:bg-bg-elevated transition-all duration-300 ${cap.borderColor}`}
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className={`text-lg ${cap.color}`}>{cap.icon}</span>
                  <h3 className="text-text-primary text-sm font-medium">
                    {cap.area}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-text-muted text-sm"
                    >
                      <span className="text-text-subtle mt-1.5 shrink-0 text-xs">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
