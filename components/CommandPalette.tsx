"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FileText, Hash, Search } from "lucide-react";
import { toggleTheme } from "./ThemeToggle";
import { sections, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; group: string; run: () => void };

export default function CommandPalette({ projects }: { projects: { slug: string; title: string }[] }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo<Item[]>(() => {
    const go = (url: string) => () => router.push(url);
    const open = (url: string) => () => window.open(url, "_blank", "noopener");
    return [
      ...sections.map((s) => ({ id: `s-${s.id}`, label: s.label, group: "Sections", run: go(`/#${s.id}`) })),
      ...projects.map((p) => ({ id: `p-${p.slug}`, label: p.title, group: "Case studies", run: go(`/projects/${p.slug}`) })),
      { id: "a-resume", label: "Download resume (PDF)", group: "Actions", run: () => Object.assign(document.createElement("a"), { href: site.resume, download: "" }).click() },
      { id: "a-email", label: `Email ${site.email}`, group: "Actions", run: () => (location.href = `mailto:${site.email}`) },
      { id: "a-theme", label: "Toggle light / dark theme", group: "Actions", run: toggleTheme },
      { id: "a-github", label: "Open GitHub", group: "Actions", run: open(site.github) },
      { id: "a-linkedin", label: "Open LinkedIn", group: "Actions", run: open(site.linkedin) },
    ];
  }, [projects, router]);

  const q = query.trim().toLowerCase();
  const results = q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;

  useEffect(() => {
    const show = () => {
      setQuery("");
      setActive(0);
      if (!ref.current?.open) ref.current?.showModal();
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (ref.current?.open) ref.current.close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", show);
    };
  }, []);

  const select = (item?: Item) => {
    if (!item) return;
    ref.current?.close();
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = results.length;
      setActive((a) => (a + (e.key === "ArrowDown" ? 1 : n - 1)) % Math.max(n, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(results[active]);
    }
  };

  useEffect(() => {
    document.getElementById(`cmd-${results[active]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  return (
    <dialog
      ref={ref}
      aria-label="Command palette"
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-0 mx-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] rounded-card border border-fg/15 bg-bg-surface p-0 text-text-primary shadow-2xl backdrop:bg-bg/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-fg/10 px-4">
        <Search size={16} className="shrink-0 text-text-subtle" aria-hidden />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Jump to a section, project or action…"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          aria-label="Search commands"
          className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-text-subtle focus-visible:outline-none"
        />
        <kbd className="hidden rounded border border-fg/15 px-1.5 py-0.5 font-mono text-[10px] text-text-subtle sm:block">esc</kbd>
      </div>
      <ul id="cmd-list" role="listbox" aria-label="Results" data-lenis-prevent className="max-h-[50vh] overflow-y-auto p-2">
        {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-text-muted">No matches.</li>}
        {results.map((item, i) => (
          <li
            key={item.id}
            id={`cmd-${item.id}`}
            role="option"
            aria-selected={i === active}
            onMouseMove={() => setActive(i)}
            onClick={() => select(item)}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
              i === active ? "bg-accent/10 text-text-primary" : "text-text-muted",
            )}
          >
            {item.group === "Sections" ? <Hash size={14} aria-hidden /> : item.group === "Actions" ? <ArrowRight size={14} aria-hidden /> : <FileText size={14} aria-hidden />}
            <span className="flex-1 truncate">{item.label}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-subtle">{item.group}</span>
          </li>
        ))}
      </ul>
    </dialog>
  );
}
