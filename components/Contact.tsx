"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import SectionReveal from "./SectionReveal";

const EMAIL = "hamzaowais31@gmail.com"; // TODO: Update with real email
const GITHUB_URL = "https://github.com/hamzaowaisog"; // TODO: Update with real GitHub
const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-hamza-27b84724a/"; // TODO: Update with real LinkedIn

export default function Contact() {
  return (
    <section id="contact" className="py-section bg-bg">
      <div className="max-w-container mx-auto px-6">
        <SectionReveal>
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-4">
            // Contact
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: CTA */}
          <div>
            <SectionReveal delay={0.05}>
              <h2 className="text-display-md font-semibold text-text-primary mb-6">
                Let&apos;s discuss{" "}
                <span className="text-accent">backend architecture</span>
                {" "}over coffee.
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                Currently open to senior platform engineering roles where architecture quality
                and delivery outcomes both matter. I bring full-stack thinking to every layer —
                from API design to mobile release pipelines.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-all shadow-accent-glow"
                >
                  <Mail size={15} />
                  Send an email
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-bg-elevated text-text-primary text-sm hover:border-white/25 transition-all"
                >
                  <Linkedin size={15} />
                  LinkedIn
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-bg-elevated text-text-primary text-sm hover:border-white/25 transition-all"
                >
                  <Github size={15} />
                  GitHub
                </a>
              </div>
            </SectionReveal>
          </div>

          {/* Right: Terminal-style resume CTA */}
          <SectionReveal delay={0.2} direction="left">
            <div className="rounded-card border border-white/10 bg-bg-surface overflow-hidden shadow-card">
              {/* Terminal titlebar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-bg-elevated">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-accent/60" />
                <span className="ml-3 font-mono text-xs text-text-subtle">
                  terminal
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-sm">
                <div className="text-text-muted mb-1">
                  <span className="text-accent">→ </span>
                  <span className="text-text-subtle">$ </span>
                  <motion.span
                    className="text-text-primary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    npx muhammad-hamza --resume
                  </motion.span>
                </div>
                <motion.div
                  className="text-text-muted text-xs leading-loose"
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-text-subtle">Resolving platform_engineer_resume...</p>
                  <p>
                    <span className="text-accent">✓ </span>
                    Muhammad Hamza — Full-Stack Platform Engineer
                  </p>
                  <p>
                    <span className="text-accent">✓ </span>
                    React Native · .NET · Next.js · FastAPI · RAG
                  </p>
                  <p>
                    <span className="text-accent">✓ </span>
                    6+ production systems shipped
                  </p>
                  <p className="mt-2 text-text-subtle">
                    Download: platform_engineer_resume.pdf
                    <span className="animate-pulse"> ▊</span>
                  </p>
                </motion.div>

                <motion.a
                  href="/Muhammad-Hamza-Resume.pdf"
                  download="Muhammad-Hamza-Resume.pdf"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg border border-accent/25 bg-accent/5 text-accent text-xs hover:bg-accent/10 transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <Terminal size={13} />
                  Download Resume
                </motion.a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
