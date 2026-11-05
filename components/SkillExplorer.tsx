"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  groups: { group: string; skills: { name: string; slugs: string[] }[] }[];
  projects: { slug: string; featured: boolean; card: React.ReactNode }[];
}

export default function SkillExplorer({ groups, projects }: Props) {
  const [active, setActive] = useState<{ name: string; slugs: string[] } | null>(null);
  const shown = active ? projects.filter((p) => active.slugs.includes(p.slug)) : projects.filter((p) => !p.featured);

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {groups.map(({ group, skills }) => (
          <fieldset key={group}>
            <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-subtle">{group}</legend>
            <ul className="flex flex-wrap gap-2">
              {skills.map((s) => {
                const on = active?.name === s.name;
                return (
                  <li key={s.name}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setActive(on ? null : s)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-left text-xs transition-colors duration-150",
                        on ? "border-accent bg-accent text-accent-ink" : "border-fg/10 bg-bg-elevated text-text-muted hover:border-accent/50 hover:text-text-primary",
                      )}
                    >
                      {s.name} <span className={cn("font-mono", on ? "opacity-80" : "text-text-subtle")}>{s.slugs.length}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>

      <div id="projects" className="mt-14 flex flex-wrap items-center gap-3 scroll-mt-24">
        <h3 className="text-lg font-semibold" aria-live="polite">
          {active ? `${shown.length} ${shown.length === 1 ? "project" : "projects"} using ${active.name}` : "More projects"}
        </h3>
        {active && (
          <button type="button" onClick={() => setActive(null)} className="btn-ghost !px-3 !py-1 text-xs">
            <X size={14} aria-hidden /> Clear filter
          </button>
        )}
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug} className="pop-in">
            {p.card}
          </li>
        ))}
      </ul>
    </>
  );
}
