import Reveal from "@/components/Reveal";

// Illustrative walk through the AI Factory gates. Steps mirror the case study; no numbers or output are real.
const steps = [
  "selecting a model for each step (cost logged per step)",
  "data-model / ERD gate: checking schema impact",
  "writing tests before the implementation",
  "generating the implementation",
  "running checks in a sealed container",
  "merge gate: change verified",
];

const lines = [
  <>
    <span className="text-text-subtle">$</span> <span className="text-text-primary">factory run &quot;&lt;plain-English change request&gt;&quot;</span>
  </>,
  ...steps.map((s) => (
    <>
      <span className="text-accent">✓</span> <span className="text-text-muted">{s}</span>
    </>
  )),
  <>
    <span className="text-accent">→</span> <span className="text-text-primary">pull request opened for review</span>
  </>,
];

export default function AIFactoryTerminal() {
  return (
    <section className="border-t border-fg/5 py-16">
      <div className="container-x">
        <p className="eyebrow">Pipeline walkthrough</p>
        <h2 className="mb-2 text-display-sm font-semibold">A request, gate by gate</h2>
        <p className="mb-6 text-sm text-text-subtle">Illustrative run: shows the order of the gates, not real output.</p>
        <Reveal className="card overflow-hidden font-mono text-sm">
          <div className="flex items-center gap-1.5 border-b border-fg/5 bg-bg-elevated px-4 py-3" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          </div>
          <ol className="space-y-1.5 overflow-x-auto p-5">
            {lines.map((line, i) => (
              <li key={i} className="stagger whitespace-nowrap" style={{ "--i": i * 2 } as React.CSSProperties}>
                {line}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
