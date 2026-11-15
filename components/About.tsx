import Link from "next/link";
import { Award, GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import { credentials } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="py-section">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="text-display-md font-semibold">
            Intern to Software Engineer at Folio3. <span className="text-text-muted">Mobile, web and backend.</span>
          </h2>
          <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-text-muted">
            <p>
              I joined Folio3 in Karachi as an intern in 2024 and have worked there full-time since February 2025. Most of my work is React Native,
              React or Angular on the front and ASP.NET Core behind it, for clients in healthcare, agritech and real estate.
            </p>
            <p>
              Beyond my own tickets, I own the releases of{" "}
              <Link href="/projects/myendo-mobile" className="text-text-primary underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
                MyEndo
              </Link>
              , wrote the architecture RFCs for{" "}
              <Link href="/projects/ted2-frontend-monorepo" className="text-text-primary underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
                TED2
              </Link>
              , review my teammates&apos; pull requests and mentor interns. I also build complete systems on my own: two are in production use.
            </p>
          </div>
        </Reveal>

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
