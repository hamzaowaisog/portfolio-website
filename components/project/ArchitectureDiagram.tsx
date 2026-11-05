export interface ArchNode {
  id: string;
  label: string;
  sublabel?: string;
  type: "client" | "api" | "service" | "data" | "infra" | "external" | "ai";
}

export interface ArchEdge {
  from: string;
  to: string;
  label?: string;
  /** 0–1 position along the curve for the label (default 0.5). */
  labelT?: number;
  labelOffsetY?: number;
}

export interface DiagramData {
  title: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
  /** Columns in the grid layout (default min(count, 5)). */
  cols?: number;
}

// Colour = border tone only; text stays text-primary so labels pass AA in both themes.
const tone: Record<ArchNode["type"], string> = {
  client: "stroke-accent-2",
  ai: "stroke-accent-2",
  api: "stroke-accent",
  service: "stroke-accent",
  data: "stroke-emerald-500",
  infra: "stroke-amber-500",
  external: "stroke-text-subtle",
};
const legend: [string, ArchNode["type"][]][] = [
  ["Client / AI", ["client", "ai"]],
  ["API / service", ["api", "service"]],
  ["Data", ["data"]],
  ["Infra", ["infra"]],
  ["External", ["external"]],
];

const COL = 200;
const NW = 132;
const NH = 52;
const ROW = 140;

type P = { x: number; y: number };
const cubic = (t: number, a: P, b: P, c: P, d: P): P => {
  const m = 1 - t;
  const k = [m * m * m, 3 * m * m * t, 3 * m * t * t, t * t * t];
  return { x: k[0] * a.x + k[1] * b.x + k[2] * c.x + k[3] * d.x, y: k[0] * a.y + k[1] * b.y + k[2] * c.y + k[3] * d.y };
};

// Edge leaves the side facing its target: vertical for same-column nodes, horizontal otherwise.
function route(f: P, t: P): [P, P, P, P] {
  if (Math.abs(f.x - t.x) < 1) {
    const s = Math.sign(t.y - f.y) || 1;
    const a = { x: f.x, y: f.y + (s * NH) / 2 };
    const d = { x: t.x, y: t.y - (s * NH) / 2 };
    const my = (a.y + d.y) / 2;
    return [a, { x: a.x, y: my }, { x: d.x, y: my }, d];
  }
  const s = Math.sign(t.x - f.x);
  const a = { x: f.x + (s * NW) / 2, y: f.y };
  const d = { x: t.x - (s * NW) / 2, y: t.y };
  const mx = (a.x + d.x) / 2;
  return [a, { x: mx, y: a.y }, { x: mx, y: d.y }, d];
}

export default function ArchitectureDiagram({ title, nodes, edges, cols }: DiagramData) {
  const c = cols ?? Math.min(nodes.length, 5);
  const W = c * COL;
  const rows = Math.ceil(nodes.length / c);
  const H = rows * ROW;
  const pos: Record<string, P> = {};
  nodes.forEach((n, i) => (pos[n.id] = { x: (W / c) * (i % c) + W / c / 2, y: ROW * Math.floor(i / c) + ROW / 2 }));

  const paths = edges.flatMap((e) => (pos[e.from] && pos[e.to] ? [{ e, pts: route(pos[e.from], pos[e.to]) }] : []));
  const labels = paths
    .filter((p) => p.e.label)
    .map(({ e, pts }) => {
      const pt = cubic(e.labelT ?? 0.5, ...pts);
      return { text: e.label!, x: pt.x, y: pt.y + (e.labelOffsetY ?? 0), w: e.label!.length * 6 + 16 };
    });
  // A label never sits on a node: lift it to just above or below the box, whichever is nearer.
  for (const l of labels)
    for (const p of Object.values(pos))
      if (Math.abs(l.x - p.x) < (l.w + NW) / 2 && Math.abs(l.y - p.y) < NH / 2 + 9)
        l.y = l.y <= p.y ? p.y - NH / 2 - 12 : p.y + NH / 2 + 12;
  // ponytail: pairwise vertical nudge, O(n²) per pass; fine for <15 labels.
  for (let pass = 0; pass < 3; pass++)
    for (let a = 0; a < labels.length; a++)
      for (let b = a + 1; b < labels.length; b++) {
        const A = labels[a], B = labels[b];
        const dy = Math.abs(A.y - B.y);
        if (Math.abs(A.x - B.x) < (A.w + B.w) / 2 + 4 && dy < 20) {
          const push = ((20 - dy) / 2) * (A.y <= B.y ? 1 : -1);
          A.y -= push;
          B.y += push;
        }
      }

  const desc = `${title}: ${nodes.map((n) => n.label).join(", ")}.`;

  return (
    <figure className="card overflow-hidden">
      <figcaption className="flex items-center gap-2 border-b border-fg/5 bg-bg-elevated px-4 py-3 font-mono text-xs text-text-subtle">
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
        {title}
      </figcaption>
      <div className="overflow-x-auto p-4" tabIndex={0} role="region" aria-label={`${title} diagram, scrollable`}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={desc} className="h-auto w-full min-w-[640px]">
          <defs>
            <marker id="arch-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L8,4 L0,8 Z" className="fill-accent" />
            </marker>
          </defs>

          {paths.map(({ pts: [a, b, c2, d] }, i) => (
            <path
              key={i}
              style={{ "--i": nodes.length + i } as React.CSSProperties}
              d={`M ${a.x} ${a.y} C ${b.x} ${b.y}, ${c2.x} ${c2.y}, ${d.x} ${d.y}`}
              fill="none"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              markerEnd="url(#arch-arrow)"
              className="stagger stroke-accent/60"
            />
          ))}

          {nodes.map((n, i) => {
            const p = pos[n.id];
            return (
              <g key={n.id} className="stagger" style={{ "--i": i } as React.CSSProperties}>
                <rect x={p.x - NW / 2} y={p.y - NH / 2} width={NW} height={NH} rx={10} strokeWidth={1.25} className={`fill-bg-elevated ${tone[n.type]}`} />
                <text x={p.x} y={n.sublabel ? p.y - 5 : p.y + 4} textAnchor="middle" fontSize={12.5} fontWeight={600} className="fill-text-primary">
                  {n.label}
                </text>
                {n.sublabel && (
                  <text x={p.x} y={p.y + 12} textAnchor="middle" fontSize={9.5} className="fill-text-muted font-mono">
                    {n.sublabel}
                  </text>
                )}
              </g>
            );
          })}

          {labels.map((l, i) => (
            <g key={i} className="stagger" style={{ "--i": nodes.length + paths.length + i } as React.CSSProperties}>
              <rect x={l.x - l.w / 2} y={l.y - 9} width={l.w} height={18} rx={9} strokeWidth={1} className="fill-bg-surface stroke-accent/40" />
              <text x={l.x} y={l.y + 3.5} textAnchor="middle" fontSize={9.5} fontWeight={600} className="fill-text-primary font-mono">
                {l.text}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 px-4 pb-4" aria-label="Legend">
        {legend
          .filter(([, types]) => nodes.some((n) => types.includes(n.type)))
          .map(([name, types]) => (
            <li key={name} className="flex items-center gap-1.5 font-mono text-[11px] text-text-subtle">
              <svg width="12" height="12" aria-hidden>
                <rect x="1" y="1" width="10" height="10" rx="3" strokeWidth="1.5" className={`fill-none ${tone[types[0]]}`} />
              </svg>
              {name}
            </li>
          ))}
      </ul>
    </figure>
  );
}
