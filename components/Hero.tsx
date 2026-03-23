"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const words = ["Platform", "Engineer."];
const tagline = "I build resilient, cross-platform product systems — translating complex business operations into elegant web and mobile architecture.";

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-bg to-bg opacity-90" />

      {/* Dot grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#FAFAFA" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Accent glow top-left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
      {/* Subtle blue glow right */}
      <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px]" />

      {/* Animated line traces */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          x1="0" y1="35%" x2="100%" y2="35%"
          stroke="#00F260" strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 1, ease: "easeInOut" }}
        />
        <motion.line
          x1="0" y1="65%" x2="100%" y2="65%"
          stroke="#00F260" strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg">
      <BackgroundGrid />

      <div className="relative z-10 max-w-container mx-auto px-6 text-center pt-24">
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-accent tracking-wider">
            Available for senior engineering roles
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="overflow-hidden mb-4">
          <motion.p
            className="text-sm font-mono text-text-muted tracking-[0.2em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Muhammad Hamza
          </motion.p>
        </div>

        <div className="mb-6">
          <motion.h1
            className="text-display-xl font-semibold text-text-primary leading-none tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block">Full-Stack</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-accent to-text-primary">
              Platform
            </span>
            <span className="block">Engineer.</span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {tagline}
        </motion.p>

        {/* Vertical stack tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {["React Native", ".NET / ASP.NET Core", "Next.js", "FastAPI + RAG", "Turborepo"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-tag border border-white/10 bg-bg-elevated text-text-muted font-mono text-xs"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-all duration-200 shadow-accent-glow"
          >
            View Case Studies
            <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 bg-bg-elevated text-text-primary text-sm hover:border-white/25 hover:bg-bg-surface transition-all duration-200"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent to-text-subtle"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
