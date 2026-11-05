"use client";

import { useRef } from "react";

const canMove = () => matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

// Wraps a CTA so it drifts a few pixels toward the cursor.
export default function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !canMove()) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
  };
  const reset = () => ref.current && (ref.current.style.transform = "");
  return (
    <span ref={ref} onPointerMove={move} onPointerLeave={reset} className="inline-block transition-transform duration-200 ease-out">
      {children}
    </span>
  );
}
