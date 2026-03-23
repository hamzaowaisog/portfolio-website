"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const GITHUB_URL = "https://github.com/hamzaowaisog"; // TODO: Update with real GitHub
const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-hamza-27b84724a/"; // TODO: Update with real LinkedIn

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 20);
      if (y > lastY && y > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          atTop ? "py-5" : "py-3",
          !atTop && "bg-bg/80 backdrop-blur-xl border-b border-white/5",
        )}
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className='max-w-container mx-auto px-6 flex items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='group flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full bg-accent group-hover:shadow-accent-glow transition-all duration-300' />
            <span className='font-mono text-sm text-text-primary tracking-tight'>
              mhamza.dev
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className='relative text-sm text-text-muted hover:text-text-primary transition-colors duration-200 group'
              >
                {link.label}
                <span className='absolute -bottom-0.5 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300 ease-out' />
              </a>
            ))}
          </nav>

          {/* Social + Mobile Toggle */}
          <div className='flex items-center gap-3'>
            <a
              href={GITHUB_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 text-text-muted hover:text-text-primary transition-colors duration-200'
              aria-label='GitHub'
            >
              <Github size={17} />
            </a>
            <a
              href={LINKEDIN_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 text-text-muted hover:text-text-primary transition-colors duration-200'
              aria-label='LinkedIn'
            >
              <Linkedin size={17} />
            </a>
            <button
              className='md:hidden p-2 text-text-muted hover:text-text-primary transition-colors'
              onClick={() => setMobileOpen((v) => !v)}
              aria-label='Toggle menu'
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className='fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className='text-2xl font-light text-text-primary hover:text-accent transition-colors'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <div className='flex items-center gap-6 mt-4'>
              <a
                href={GITHUB_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='text-text-muted hover:text-text-primary'
              >
                <Github size={20} />
              </a>
              <a
                href={LINKEDIN_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='text-text-muted hover:text-text-primary'
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
