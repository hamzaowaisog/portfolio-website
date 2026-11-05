import Link from "next/link";
import { Award, GitPullRequest, GraduationCap, FileText, Rocket, Users } from "lucide-react";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { credentials, leadership } from "@/data/profile";

const icons = [Users, GitPullRequest, FileText, Rocket];

export default function Leadership() {
  return (
    <section id="leadership" className="py-section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Leadership</p>
          <h2 className="text-display-md font-semibold">
            Beyond my own tickets. <span className="text-text-muted">Helping the team ship.</span>
          </h2>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((item, i) => {
            const Icon = icons[i];
            const body = (
              <>
                <Icon size={20} className="text-accent" aria-hidden />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.body}</p>
              </>
            );
            return (
              <li key={item.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <TiltCard className="card h-full">
                    {item.slug ? (
                      <Link href={`/projects/${item.slug}`} className="block h-full rounded-card p-6">
                        {body}
                      </Link>
                    ) : (
                      <div className="p-6">{body}</div>
                    )}
                  </TiltCard>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal>
          <h3 className="mb-4 mt-16 font-mono text-xs uppercase tracking-[0.2em] text-text-subtle">Education &amp; certification</h3>
        </Reveal>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {credentials.map((c, i) => {
            const Icon = c.kind === "Education" ? GraduationCap : Award;
            return (
              <li key={c.title}>
                <Reveal delay={i * 0.06} className="card flex items-start gap-4 p-6">
                  <span className="rounded-xl border border-accent/30 bg-accent/10 p-2.5 text-accent">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-text-subtle">{c.kind}</p>
                    <p className="mt-1 font-semibold">{c.title}</p>
                    <p className="mt-0.5 text-sm text-text-muted">{c.detail}</p>
                  </div>
                  <span className="font-mono text-xs text-text-subtle">{c.period}</span>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
