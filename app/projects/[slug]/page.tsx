import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import Reveal from "@/components/Reveal";
import ProjectHero from "@/components/project/ProjectHero";
import ArchitectureSection from "@/components/project/ArchitectureSection";
import AIFactoryTerminal from "@/components/project/AIFactoryTerminal";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) return {};
  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.elevatorPitch,
    alternates: { canonical: url },
    openGraph: { title: `${project.title} · case study`, description: project.elevatorPitch, url, type: "article" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <main id="main">
      <ProjectHero project={project} />
      {project.screenshots && (
        <section className="border-t border-fg/5 py-16">
          <div className="container-x">
            <p className="eyebrow">Screens</p>
            <h2 className="mb-3 text-display-sm font-semibold">What it looks like</h2>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-text-muted">{project.screenshots.note}</p>
            <div className={project.screenshots.portrait ? "grid grid-cols-2 gap-4 md:grid-cols-4" : "grid gap-4 md:grid-cols-2"}>
              {project.screenshots.items.map((s) => (
                <a key={s.src} href={s.src} target="_blank" rel="noreferrer" className="card overflow-hidden">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={project.screenshots!.portrait ? 600 : 1600}
                    height={project.screenshots!.portrait ? 1258 : 1000}
                    sizes={project.screenshots!.portrait ? "(min-width: 768px) 25vw, 50vw" : "(min-width: 768px) 50vw, 100vw"}
                    className="h-auto w-full"
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <ArchitectureSection project={project} />
      {slug === "ai-factory" && <AIFactoryTerminal />}

      <section className="border-t border-fg/5 py-16">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Decisions</p>
            <h2 className="mb-8 text-display-sm font-semibold">Engineering decisions</h2>
          </Reveal>
          <div className="space-y-3">
            {project.engineeringDecisions.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.04}>
                <details className="card group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-card p-5 font-medium hover:bg-fg/[0.03] [&::-webkit-details-marker]:hidden">
                    {d.title}
                    <ChevronDown size={16} aria-hidden className="shrink-0 text-text-subtle transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="grid gap-4 border-t border-fg/5 px-5 pb-5 md:grid-cols-3">
                    {(
                      [
                        ["Decision", d.decision],
                        ["Why", d.reason],
                        ["Impact", d.impact],
                      ] as const
                    ).map(([label, text]) => (
                      <div key={label} className="pt-4">
                        <p className="mb-1.5 font-mono text-xs uppercase tracking-wider text-text-subtle">{label}</p>
                        <p className="text-sm leading-relaxed text-text-muted">{text}</p>
                      </div>
                    ))}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-fg/5 py-16">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow">Highlights</p>
              <h2 className="mb-6 text-display-sm font-semibold">What I built</h2>
            </Reveal>
            <ul className="space-y-3">
              {project.technicalHighlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-text-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow">Scope</p>
              <h2 className="mb-6 text-display-sm font-semibold">My role and honest notes</h2>
            </Reveal>
            <ul className="space-y-3">
              {project.constraints.map((c) => (
                <li key={c} className="card p-4 text-sm leading-relaxed text-text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-fg/5 py-16">
        <div className="container-x">
          <Link href={`/projects/${next.slug}`} className="card group flex items-center justify-between gap-6 p-6 hover:border-accent/40 sm:p-8">
            <span>
              <span className="block font-mono text-xs uppercase tracking-wider text-text-subtle">Next case study</span>
              <span className="mt-1 block text-xl font-semibold sm:text-2xl">{next.title}</span>
            </span>
            <ArrowUpRight size={24} aria-hidden className="shrink-0 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
