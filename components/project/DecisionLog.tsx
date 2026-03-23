"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import type { EngineeringDecision } from "@/lib/types";

interface DecisionLogProps {
  decisions: EngineeringDecision[];
  accentColor: string;
}

export default function DecisionLog({ decisions, accentColor }: DecisionLogProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-container mx-auto px-6">
        <SectionReveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: accentColor }}>
            // Architecture Decision Records
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <h2 className="text-display-sm font-semibold text-text-primary mb-3">
            Engineering Decisions
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-text-muted mb-10 max-w-2xl leading-relaxed">
            The choices that shaped the architecture — with the reasoning that made each one worth the trade-off.
          </p>
        </SectionReveal>

        <div className="space-y-3">
          {decisions.map((d, i) => (
            <SectionReveal key={d.title} delay={0.1 + i * 0.06}>
              <div className="rounded-card border border-white/7 bg-bg-surface overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-elevated transition-colors"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: openIdx === i ? accentColor : "#4A4A55" }}
                    />
                    <span className="text-text-primary font-medium text-sm">
                      {d.title}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIdx === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} className="text-text-subtle" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5">
                        {[
                          { label: "Decision", content: d.decision, accent: false },
                          { label: "Reasoning", content: d.reason, accent: false },
                          { label: "Impact", content: d.impact, accent: true },
                        ].map((block) => (
                          <div key={block.label} className="pt-4">
                            <p
                              className="font-mono text-xs mb-2 tracking-wider uppercase"
                              style={{ color: block.accent ? accentColor : "#4A4A55" }}
                            >
                              {block.label}
                            </p>
                            <p className="text-text-muted text-sm leading-relaxed">
                              {block.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
