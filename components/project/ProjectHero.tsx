import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Status } from "@/components/ProjectCard";
import type { Project } from "@/lib/types";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/4 h-[360px] w-[560px] max-w-full rounded-full bg-accent/10 blur-3xl" />
      <div className="container-x relative">
        <Link href="/#work" className="group mb-10 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary">
          <ArrowLeft size={15} aria-hidden className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-xs text-text-subtle">
          <Status status={project.status} />
          <span>{project.period}</span>
          <span aria-hidden>·</span>
          <span className="text-text-muted">{project.role}</span>
        </div>
        <h1 className="max-w-4xl text-display-lg font-semibold">{project.title}</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-text-subtle">{project.domain}</p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-muted sm:text-xl">{project.elevatorPitch}</p>

        <ul aria-label="Stack" className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t.label} className="chip">
              {t.label}
            </li>
          ))}
        </ul>

        {project.metrics && (
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="card flex flex-col-reverse p-4">
                <dt className="mt-1 font-mono text-xs text-text-subtle">{m.label}</dt>
                <dd className="text-xl font-semibold text-accent">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
