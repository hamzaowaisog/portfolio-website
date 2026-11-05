import { ArrowDown, Download, Mail } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import Counter from "./Counter";
import Magnetic from "./Magnetic";
import { site } from "@/lib/site";

// Sources: build_resume_v6.py + Resume_v5_ATS ("270+ REST endpoints and 730+ automated tests across own full-stack builds").
const stats = [
  { value: 7, suffix: "", label: "clients shipped for" },
  { value: 270, suffix: "+", label: "REST endpoints designed" },
  { value: 730, suffix: "+", label: "automated tests written" },
  { value: 2, suffix: "", label: "solo products in production" },
];

const stack = ["React Native", "TypeScript", "Angular", "Next.js", "ASP.NET Core", "C#", "PostgreSQL", "LLM / RAG"];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-accent-2/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgb(var(--fg)/0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>
      <HeroCanvas />

      <div className="container-x relative">
        <p className="rise mb-6 inline-flex items-center gap-2 rounded-full border border-fg/10 bg-bg-surface/60 px-3 py-1 font-mono text-xs text-text-muted backdrop-blur" style={d(0)}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          Software Engineer at Folio3 · {site.location}
        </p>

        <h1 className="text-display-xl font-semibold tracking-tight">
          <span className="rise-solid inline-block" style={d(40)}>Muhammad</span>{" "}
          <span className="rise-solid inline-block bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent" style={d(110)}>
            Hamza
          </span>
        </h1>

        <p className="rise-solid mt-4 text-display-sm font-medium text-text-primary" style={d(160)}>
          {site.role} <span className="text-text-muted">· {site.stack}</span>
        </p>

        <p className="rise-solid mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg" style={d(220)}>
          I progressed from intern to Software Engineer at Folio3, shipping production systems for 7 clients across healthcare,
          agritech, land sales and livestock media, and I take hard problems from prototype to production.
        </p>

        <div className="rise mt-7 flex flex-wrap items-center gap-3" style={d(280)}>
          <Magnetic>
            <a href={site.resume} download className="btn-primary">
              <Download size={16} aria-hidden /> Download resume
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn-ghost">
              <Mail size={16} aria-hidden /> Contact me
            </a>
          </Magnetic>
          <a href="#work" className="ml-1 hidden items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary sm:inline-flex">
            View work <ArrowDown size={14} aria-hidden />
          </a>
        </div>

        <dl className="rise mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-card border border-fg/10 bg-fg/10 sm:grid-cols-4" style={d(340)}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-bg-surface/80 px-4 py-4 backdrop-blur">
              <dt className="mt-1 text-xs leading-snug text-text-muted">{s.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-text-primary">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>

        <ul aria-label="Core stack" className="rise mt-6 flex flex-wrap gap-2" style={d(400)}>
          {stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
