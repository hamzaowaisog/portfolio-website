import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

const dot: Record<Project["status"], string> = {
  Production: "bg-emerald-500",
  "In progress": "bg-amber-500",
  "Internal R&D": "bg-accent-2",
  Internal: "bg-text-subtle",
  Research: "bg-text-subtle",
};

export function Status({ status }: { status: Project["status"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-fg/10 px-2 py-0.5 font-mono text-[11px] text-text-muted">
      <span className={cn("h-1.5 w-1.5 rounded-full", dot[status])} aria-hidden />
      {status}
    </span>
  );
}

export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const tags = project.tags.slice(0, compact ? 4 : 5);
  return (
    <TiltCard className="card group h-full transition-colors hover:border-accent/40">
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col rounded-card p-6 focus-visible:outline-offset-0">
        <div className="mb-4 flex items-center gap-2">
          <Status status={project.status} />
          <span className="font-mono text-[11px] text-text-subtle">{project.period}</span>
          <ArrowUpRight size={18} aria-hidden className="ml-auto text-text-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
        <h3 className={cn("font-semibold tracking-tight text-text-primary", compact ? "text-base" : "text-xl")}>{project.title}</h3>
        <p className="mb-3 mt-1 font-mono text-[11px] uppercase tracking-wider text-text-subtle">{project.domain}</p>
        <p className={cn("flex-1 leading-relaxed text-text-muted", compact ? "line-clamp-3 text-sm" : "line-clamp-4 text-sm")}>{project.elevatorPitch}</p>
        <ul aria-label="Stack" className="mt-5 flex flex-wrap gap-1.5 border-t border-fg/5 pt-4">
          {tags.map((t) => (
            <li key={t.label} className="chip">
              {t.label}
            </li>
          ))}
          {project.tags.length > tags.length && <li className="chip">+{project.tags.length - tags.length}</li>}
        </ul>
      </Link>
    </TiltCard>
  );
}
