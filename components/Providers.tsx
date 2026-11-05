"use client";

import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Lenis smooth scroll, loaded after hydration and skipped entirely for reduced motion.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: { destroy(): void } | undefined;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (!cancelled) lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 } });
    });
    return () => {
      cancelled = true;
      lenis?.destroy();
    };
  }, []);

  return children;
}
