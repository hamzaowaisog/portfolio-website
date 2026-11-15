"use client";

import { cn } from "@/lib/utils";

// Cursor spotlight: sets the CSS vars read by .spotlight in globals.css.
export default function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <div onPointerMove={move} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}
