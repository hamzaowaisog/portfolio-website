import Reveal from "@/components/Reveal";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { diagrams } from "@/data/diagrams";
import type { Project } from "@/lib/types";

export default function ArchitectureSection({ project }: { project: Project }) {
  const diagram = diagrams[project.slug];
  return (
    <section className="border-t border-fg/5 py-16">
      <div className="container-x space-y-14">
        <div className="grid gap-10 lg:grid-cols-2">
          {[
            ["The challenge", "Why it existed", project.challenge],
            ["The solution", "How it was built", project.solution],
          ].map(([eyebrow, h, body]) => (
            <Reveal key={eyebrow}>
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="mb-4 text-display-sm font-semibold">{h}</h2>
              <p className="text-lg leading-relaxed text-text-muted">{body}</p>
            </Reveal>
          ))}
        </div>

        {diagram && (
          <Reveal>
            <p className="eyebrow">Architecture</p>
            <h2 className="mb-2 text-display-sm font-semibold">How the pieces connect</h2>
            <p className="mb-6 text-sm text-text-subtle">Simplified, architecture-level view redrawn for this page. No client code or internal screenshots.</p>
            <ArchitectureDiagram {...diagram} />
          </Reveal>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="card p-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">Layers</h3>
            <ol className="space-y-2.5">
              {project.architectureOverview.map((layer, i) => (
                <li key={layer} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                  <span className="shrink-0 font-mono text-xs tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {layer}
                </li>
              ))}
            </ol>
          </Reveal>
          {project.architectureNote && (
            <Reveal delay={0.08} className="card p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">Request flow</h3>
              <p className="font-mono text-sm leading-loose text-text-muted">{project.architectureNote}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
