"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Github, Linkedin, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { sections, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const openPalette = () => window.dispatchEvent(new Event("open-palette"));

export default function Navbar() {
  const home = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);
  const iconBtn = "rounded-full p-2 text-text-muted transition-colors hover:bg-fg/5 hover:text-text-primary";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-fg/10 bg-bg/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2 font-mono text-sm" aria-label={`${site.name}, home`}>
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent))]" />
          mhamza<span className="text-text-subtle">.dev</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {sections.map((s) => (
            <a key={s.id} href={href(s.id)} className="text-sm text-text-muted transition-colors hover:text-text-primary">
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={openPalette} className={cn(iconBtn, "flex items-center gap-1.5 sm:border sm:border-fg/10 sm:px-3 sm:py-1.5")} aria-label="Open command palette">
            <Command size={15} />
            <span className="hidden font-mono text-xs sm:inline">K</span>
          </button>
          <ThemeToggle />
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={cn(iconBtn, "hidden sm:block")}>
            <Github size={17} />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={cn(iconBtn, "hidden sm:block")}>
            <Linkedin size={17} />
          </a>
          <button
            type="button"
            className={cn(iconBtn, "md:hidden")}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="container-x flex flex-col pb-4 md:hidden">
          {sections.map((s) => (
            <a key={s.id} href={href(s.id)} onClick={() => setOpen(false)} className="border-b border-fg/5 py-3 text-base text-text-primary">
              {s.label}
            </a>
          ))}
          <div className="flex gap-2 pt-3">
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={iconBtn}>
              <Github size={18} />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={iconBtn}>
              <Linkedin size={18} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
