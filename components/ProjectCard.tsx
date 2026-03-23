"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, getTagColor } from "@/lib/utils";
import type { Project } from "@/lib/types";

const statusStyle: Record<string, string> = {
  Production: "text-accent border-accent/30 bg-accent/5",
  Research: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  Internal: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  POC: "text-orange-400 border-orange-400/30 bg-orange-400/5",
};

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, (v) => `${v}px`);
  const glowY = useTransform(mouseY, (v) => `${v}px`);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <Link href={`/projects/${project.slug}`} className="block group h-full">
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-card border border-white/7 bg-bg-surface",
          "transition-all duration-400 h-full flex flex-col",
          "hover:border-white/15 hover:shadow-card-hover"
        )}
        onMouseMove={handleMouseMove}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Cursor glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(320px circle at ${glowX} ${glowY}, ${project.accentColor}10, transparent 60%)`,
          }}
        />

        <div className={cn("flex flex-col flex-1", featured ? "p-7" : "p-6")}>
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex-1 min-w-0">
              {/* Status + Year */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border",
                    statusStyle[project.status]
                  )}
                >
                  {project.status}
                </span>
                <span className="font-mono text-xs text-text-subtle">
                  {project.year}
                </span>
              </div>
              <h3
                className={cn(
                  "font-semibold text-text-primary group-hover:text-white transition-colors",
                  featured ? "text-xl" : "text-base"
                )}
              >
                {project.title}
              </h3>
            </div>
            <ArrowUpRight
              size={18}
              className="text-text-subtle shrink-0 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </div>

          {/* Domain */}
          <p className="font-mono text-xs text-text-subtle mb-3 tracking-wide uppercase">
            {project.domain}
          </p>

          {/* Pitch — grows to fill */}
          <p
            className={cn(
              "text-text-muted leading-relaxed flex-1",
              featured ? "text-sm" : "text-xs"
            )}
          >
            {project.elevatorPitch}
          </p>

          {/* Divider + Tags pushed to bottom */}
          <div className="mt-5">
            <div className="h-px bg-white/5 mb-5" />
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, featured ? 6 : 4).map((tag) => (
                <span
                  key={tag.label}
                  className={cn(
                    "px-2 py-0.5 rounded border text-xs font-mono",
                    getTagColor(tag.category)
                  )}
                >
                  {tag.label}
                </span>
              ))}
              {project.tags.length > (featured ? 6 : 4) && (
                <span className="px-2 py-0.5 rounded border border-white/10 text-xs font-mono text-text-subtle">
                  +{project.tags.length - (featured ? 6 : 4)}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
