import { Download, Github, Linkedin, Mail } from "lucide-react";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-section">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="container-x relative text-center">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mx-auto max-w-3xl text-display-lg font-semibold">
            Have a hard problem? <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Let&apos;s talk.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-muted">
            I&apos;m open to software engineering roles across mobile, web and backend. Email is the fastest way to reach me.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <a href={`mailto:${site.email}`} className="btn-primary">
              <Mail size={16} aria-hidden /> {site.email}
            </a>
          </Magnetic>
          <a href={site.resume} download className="btn-ghost">
            <Download size={16} aria-hidden /> Resume (PDF)
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Linkedin size={16} aria-hidden /> LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Github size={16} aria-hidden /> GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}
