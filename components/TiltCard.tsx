"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

const canTilt = () => matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

// Cursor spotlight (CSS vars read by .spotlight in globals.css) plus a small 3D tilt.
export default function TiltCard({ children, className, max = 4 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    if (canTilt()) el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg)`;
  };
  const reset = () => ref.current && (ref.current.style.transform = "");
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={reset} className={cn("spotlight transition-transform duration-300 ease-out", className)}>
      {children}
    </div>
  );
}
