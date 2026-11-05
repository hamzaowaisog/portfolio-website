"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Fades/slides in once when scrolled into view (CSS in globals.css; static under reduced motion).
export default function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.shown = "";
        io.disconnect();
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={delay ? ({ "--d": `${delay * 1000}ms` } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
