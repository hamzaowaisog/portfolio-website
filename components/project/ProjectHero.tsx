"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn, getTagColor } from "@/lib/utils";
import type { Project } from "@/lib/types";

const statusStyle: Record<string, string> = {
  Production: "text-accent border-accent/30 bg-accent/5",
  Research: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  Internal: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  POC: "text-orange-400 border-orange-400/30 bg-orange-400/5",
};

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[400px] opacity-[0.07] blur-[100px] pointer-events-none rounded-full"
        style={{ background: project.accentColor }}
      />

      <div className="max-w-container mx-auto px-6 relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            All Projects
          </Link>
        </motion.div>

        {/* Metadata row */}
        <motion.div
          className="flex flex-wrap items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border",
              statusStyle[project.status]
            )}
          >
            {project.status}
          </span>
          <span className="font-mono text-xs text-text-subtle">{project.year}</span>
          <span className="font-mono text-xs text-text-subtle">·</span>
          <span className="font-mono text-xs text-text-muted">{project.role}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-display-lg font-semibold text-text-primary mb-6 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.title}
        </motion.h1>

        {/* Elevator pitch */}
        <motion.p
          className="text-text-muted text-xl leading-relaxed max-w-3xl mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.elevatorPitch}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className={cn(
                "px-2.5 py-1 rounded border text-xs font-mono",
                getTagColor(tag.category)
              )}
            >
              {tag.label}
            </span>
          ))}
        </motion.div>

        {/* Metrics */}
        {project.metrics && (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-card border border-white/7 bg-bg-surface text-center"
              >
                <p
                  className="text-lg font-semibold mb-1"
                  style={{ color: project.accentColor }}
                >
                  {m.value}
                </p>
                <p className="text-text-subtle text-xs font-mono">{m.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
