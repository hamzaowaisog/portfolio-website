"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const GITHUB_URL = "https://github.com/hamzaowaisog";
const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-hamza-27b84724a/";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-white/5 bg-bg py-8'>
      <div className='max-w-container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='flex items-center gap-2'>
          <span className='w-1.5 h-1.5 rounded-full bg-accent' />
          <span className='font-mono text-sm text-text-muted'>
            Muhammad Hamza · {year}
          </span>
        </div>

        <p className='font-mono text-xs text-text-subtle text-center'>
          Platform Engineer · React Native · .NET · Next.js
        </p>

        <div className='flex items-center gap-4'>
          <a
            href={GITHUB_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-text-subtle hover:text-text-primary transition-colors'
            aria-label='GitHub'
          >
            <Github size={16} />
          </a>
          <a
            href={LINKEDIN_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-text-subtle hover:text-text-primary transition-colors'
            aria-label='LinkedIn'
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
