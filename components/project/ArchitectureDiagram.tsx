"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  direction?: "right" | "down" | "left";
  /** 0–1 position along the curve where the label is anchored (default auto) */
  labelT?: number;
  /** Manual vertical nudge for fine-tuned collision avoidance */
  labelOffsetY?: number;
}

export interface ArchDiagramProps {
  nodes: ArchNode[];
  edges: ArchEdge[];
  accentColor: string;
  title?: string;
}

const typeStyles: Record<ArchNode["type"], { bg: string; border: string; text: string }> = {
  client:   { bg: "fill-purple-500/10",  border: "stroke-purple-500/40",  text: "#c4b5fd" },
  api:      { bg: "fill-blue-500/10",    border: "stroke-blue-500/40",    text: "#93c5fd" },
  service:  { bg: "fill-sky-500/10",     border: "stroke-sky-500/40",     text: "#7dd3fc" },
  data:     { bg: "fill-cyan-500/10",    border: "stroke-cyan-500/40",    text: "#67e8f9" },
  infra:    { bg: "fill-yellow-500/10",  border: "stroke-yellow-500/40",  text: "#fde68a" },
  external: { bg: "fill-zinc-500/10",    border: "stroke-zinc-500/30",    text: "#a1a1aa" },
  ai:       { bg: "fill-violet-500/10",  border: "stroke-violet-500/40",  text: "#c4b5fd" },
};

function getLayout(count: number): { x: number; y: number }[] {
  const W = 900, H = 320;
  const cols = Math.min(count, 5);
  const rows = Math.ceil(count / cols);
  const xStep = W / cols;
  const yStep = H / rows;
  return Array.from({ length: count }, (_, i) => ({
    x: xStep * (i % cols) + xStep / 2,
    y: yStep * Math.floor(i / cols) + yStep / 2,
  }));
}

/**
 * Evaluate the point on the cubic bezier curve at parameter t.
 * Curve defined as: M x1 y1 C midX y1, midX y2, x2 y2
 * Control points: P0=(x1,y1), P1=(midX,y1), P2=(midX,y2), P3=(x2,y2)
 */
function bezierPoint(
  t: number,
  x1: number, y1: number,
  midX: number,
  x2: number, y2: number
): { x: number; y: number } {
  const mt = 1 - t;
  const bx = mt * mt * mt * x1
    + 3 * mt * mt * t * midX
    + 3 * mt * t * t * midX
    + t * t * t * x2;
  // y(t) = y1*(1-t)^2*(1+2t) + y2*t^2*(3-2t)
  const by = y1 * (mt * mt * (1 + 2 * t)) + y2 * (t * t * (3 - 2 * t));
  return { x: bx, y: by };
}

const NODE_W = 130;
const NODE_H = 52;

export default function ArchitectureDiagram({
  nodes,
  edges,
  accentColor,
  title,
}: ArchDiagramProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const layout = getLayout(nodes.length);
  const posMap: Record<string, { x: number; y: number }> = {};
  nodes.forEach((n, i) => { posMap[n.id] = layout[i]; });

  // Pre-compute label positions so we can detect overlaps and nudge them
  type LabelMeta = {
    i: number;
    lx: number;
    ly: number;
    label: string;
    labelW: number;
    labelH: number;
  };

  const labelMetas: LabelMeta[] = [];

  edges.forEach((edge, i) => {
    const from = posMap[edge.from];
    const to = posMap[edge.to];
    if (!from || !to || !edge.label) return;

    const x1 = from.x + NODE_W / 2;
    const y1 = from.y;
    const x2 = to.x - NODE_W / 2;
    const y2 = to.y;
    const midX = (x1 + x2) / 2;

    // Choose t: if edge has explicit labelT, use it;
    // otherwise for diagonal edges (crossing rows) stagger t by index
    const isDiagonal = Math.abs(y1 - y2) > 60;
    let t: number;
    if (edge.labelT !== undefined) {
      t = edge.labelT;
    } else if (isDiagonal) {
      // Spread diagonal-edge labels across 0.25–0.70 to avoid clustering at midpoint
      t = 0.25 + (i % 6) * 0.09;
    } else {
      t = 0.5;
    }

    const pt = bezierPoint(t, x1, y1, midX, x2, y2);
    const lx = pt.x;
    const ly = pt.y + (edge.labelOffsetY ?? 0);

    const labelW = edge.label.length * 6.5 + 18;
    const labelH = 18;

    labelMetas.push({ i, lx, ly, label: edge.label, labelW, labelH });
  });

  // Simple collision nudge: push overlapping labels apart vertically
  // Run 3 passes so cascading overlaps settle
  for (let pass = 0; pass < 3; pass++) {
    for (let a = 0; a < labelMetas.length; a++) {
      for (let b = a + 1; b < labelMetas.length; b++) {
        const A = labelMetas[a];
        const B = labelMetas[b];
        const overlapX = Math.abs(A.lx - B.lx) < (A.labelW + B.labelW) / 2 + 4;
        const overlapY = Math.abs(A.ly - B.ly) < (A.labelH + B.labelH) / 2 + 2;
        if (overlapX && overlapY) {
          const push = ((A.labelH + B.labelH) / 2 + 4 - Math.abs(A.ly - B.ly)) / 2;
          if (A.ly <= B.ly) {
            labelMetas[a].ly -= push;
            labelMetas[b].ly += push;
          } else {
            labelMetas[a].ly += push;
            labelMetas[b].ly -= push;
          }
        }
      }
    }
  }

  // Build a lookup map from edge index → resolved label position
  const labelPosMap: Record<number, { lx: number; ly: number }> = {};
  labelMetas.forEach(({ i, lx, ly }) => { labelPosMap[i] = { lx, ly }; });

  return (
    <div className="rounded-card border border-white/7 bg-bg-surface overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-bg-elevated">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: accentColor + "80" }} />
        <span className="ml-2 font-mono text-xs text-text-subtle">
          {title ?? "architecture.diagram"}
        </span>
      </div>

      {/* SVG */}
      <div className="p-4 overflow-x-auto">
        <svg
          ref={ref}
          viewBox="0 0 900 320"
          className="w-full max-w-full"
          style={{ minWidth: 480, height: "auto" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id={`arrow-${accentColor.replace("#", "")}`}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L8,4 L0,8 Z" fill={accentColor} fillOpacity={0.85} />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Strong background for label pills */}
            <filter id="label-shadow">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* ── Edges (paths) ─────────────────────────────────── */}
          {edges.map((edge, i) => {
            const from = posMap[edge.from];
            const to = posMap[edge.to];
            if (!from || !to) return null;

            const x1 = from.x + NODE_W / 2;
            const y1 = from.y;
            const x2 = to.x - NODE_W / 2;
            const y2 = to.y;
            const midX = (x1 + x2) / 2;
            const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

            return (
              <motion.path
                key={`edge-${i}`}
                d={d}
                fill="none"
                stroke={accentColor}
                strokeOpacity={0.55}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                markerEnd={`url(#arrow-${accentColor.replace("#", "")})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.12, ease: "easeInOut" }}
              />
            );
          })}

          {/* ── Edge labels (rendered above paths, after collision resolution) ── */}
          {edges.map((edge, i) => {
            if (!edge.label) return null;
            const pos = labelPosMap[i];
            if (!pos) return null;

            const { lx, ly } = pos;
            const labelW = edge.label.length * 6.5 + 18;
            const labelH = 18;

            return (
              <motion.g
                key={`label-${i}`}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                {/* Thick dark backing for max legibility */}
                <rect
                  x={lx - labelW / 2 - 1}
                  y={ly - labelH / 2 - 2}
                  width={labelW + 2}
                  height={labelH + 2}
                  rx={5}
                  fill="#060608"
                  strokeWidth={0}
                  filter="url(#label-shadow)"
                />
                {/* Colored pill border */}
                <rect
                  x={lx - labelW / 2}
                  y={ly - labelH / 2}
                  width={labelW}
                  height={labelH}
                  rx={5}
                  fill="#0d0d10"
                  stroke={accentColor}
                  strokeOpacity={0.6}
                  strokeWidth={1}
                />
                <text
                  x={lx}
                  y={ly + 5}
                  textAnchor="middle"
                  fill={accentColor}
                  fillOpacity={1}
                  fontSize={9.5}
                  fontFamily="var(--font-geist-mono), monospace"
                  fontWeight={600}
                  letterSpacing="0.02em"
                >
                  {edge.label}
                </text>
              </motion.g>
            );
          })}

          {/* ── Nodes ─────────────────────────────────────────── */}
          {nodes.map((node, i) => {
            const pos = posMap[node.id];
            const style = typeStyles[node.type];
            const x = pos.x - NODE_W / 2;
            const y = pos.y - NODE_H / 2;

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                filter="url(#glow)"
              >
                {/* Fill */}
                <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={8} className={style.bg} />
                {/* Border */}
                <rect
                  x={x} y={y} width={NODE_W} height={NODE_H} rx={8}
                  fill="none" stroke={style.text} strokeOpacity={0.35} strokeWidth={1}
                />
                <text
                  x={pos.x}
                  y={node.sublabel ? pos.y - 6 : pos.y + 5}
                  textAnchor="middle"
                  fill={style.text}
                  fontSize={12}
                  fontWeight={600}
                  fontFamily="var(--font-geist-sans), Inter, sans-serif"
                >
                  {node.label}
                </text>
                {node.sublabel && (
                  <text
                    x={pos.x}
                    y={pos.y + 11}
                    textAnchor="middle"
                    fill={style.text}
                    fillOpacity={0.5}
                    fontSize={9}
                    fontFamily="var(--font-geist-mono), monospace"
                  >
                    {node.sublabel}
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="px-4 pb-4 flex flex-wrap gap-3">
        {(["client", "api", "service", "data", "infra", "ai", "external"] as ArchNode["type"][])
          .filter((t) => nodes.some((n) => n.type === t))
          .map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-sm border"
                style={{ borderColor: typeStyles[t].text + "60", background: typeStyles[t].text + "15" }}
              />
              <span className="font-mono text-[10px] text-text-subtle capitalize">{t}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
