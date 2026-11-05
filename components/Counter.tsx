"use client";

import { useEffect, useRef } from "react";

// Server renders the final value; after hydration it counts up once (skipped for reduced motion).
export default function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now(), dur = 600;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(value * (1 - Math.pow(1 - k, 3))) + suffix;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, suffix]);
  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </>
  );
}
