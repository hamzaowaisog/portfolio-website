import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { experience } from "@/data/profile";
import { cn } from "@/lib/utils";

export default function Experience() {
  return (
    <section id="experience" className="border-y border-fg/5 bg-bg-surface/40 py-section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Experience</p>
          <h2 className="text-display-md font-semibold">
            Intern to Software Engineer. <span className="text-text-muted">Same company, growing scope.</span>
          </h2>
        </Reveal>

        <ol className="relative mt-14 space-y-12 pl-8 sm:pl-12">
          <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-fg/10 sm:left-[9px]" />
          {/* Draws down as the timeline scrolls past (CSS scroll-driven; static where unsupported). */}
          <span aria-hidden className="scroll-line absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-accent to-accent-2 sm:left-[9px]" />
          {experience.map((role) => (
            <li key={role.title + role.org} className="relative">
              <span
                aria-hidden
                className={cn(
                  "absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg sm:-left-12 sm:h-5 sm:w-5",
                  role.current && "bg-accent shadow-[0_0_16px_rgb(var(--accent))]",
                )}
              />
              <Reveal>
                <p className="font-mono text-xs text-text-subtle">{role.period}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">
                  {role.title} <span className="font-normal text-text-muted">· {role.org}, {role.place}</span>
                </h3>
                <ul className="mt-4 grid gap-2 lg:grid-cols-2">
                  {role.points.map((pt) => (
                    <li key={pt.text} className="text-sm leading-relaxed text-text-muted">
                      {pt.slug ? (
                        <Link href={`/projects/${pt.slug}`} className="group inline hover:text-text-primary">
                          {pt.text}
                          <ArrowUpRight size={13} aria-hidden className="ml-0.5 inline align-[-1px] text-accent opacity-70 transition-opacity group-hover:opacity-100" />
                        </Link>
                      ) : (
                        pt.text
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
