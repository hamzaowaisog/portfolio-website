import { Github, Linkedin } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-fg/5 py-8">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs text-text-subtle">
          © {new Date().getFullYear()} {site.name} · {site.role}
        </p>
        <p className="font-mono text-xs text-text-subtle">
          Press <kbd className="rounded border border-fg/15 px-1">⌘K</kbd> to jump anywhere
        </p>
        <div className="flex items-center gap-1">
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-md p-2 text-text-subtle hover:text-text-primary">
            <Github size={16} aria-hidden />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-md p-2 text-text-subtle hover:text-text-primary">
            <Linkedin size={16} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
