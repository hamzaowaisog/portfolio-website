"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number };

// Constellation field that leans toward the cursor. Starts when idle, pauses off-screen,
// and draws a single static frame under reduced motion.
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    let w = 0, h = 0, raf = 0, running = false, onScreen = true;
    let pts: P[] = [];
    let rgb = "";
    const mouse = { x: -1e4, y: -1e4 };

    const readColor = () => (rgb = getComputedStyle(root).getPropertyValue("--accent").trim().replace(/ /g, ","));
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 15000));
      pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const link = 120, reach = 170;
      for (const p of pts) {
        if (!reduce) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
          if (d < reach) {
            p.x += (dx / d) * 0.35;
            p.y += (dy / d) * 0.35;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
      }
      // ponytail: O(n²) pair scan, fine at <=90 points; grid-bucket it if the count grows.
      ctx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / link) * 0.28})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < reach) {
          ctx.strokeStyle = `rgba(${rgb},${(1 - dm / reach) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(${rgb},0.7)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      const should = !reduce && onScreen && !document.hidden;
      if (should && !running) loop();
      if (!should) cancelAnimationFrame(raf);
      running = should;
      if (reduce) draw();
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onResize = () => {
      resize();
      if (reduce) draw();
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    const themeObs = new MutationObserver(() => {
      readColor();
      if (reduce) draw();
    });

    const start = () => {
      readColor();
      resize();
      io.observe(canvas);
      themeObs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", sync);
      canvas.style.opacity = "1";
      sync();
    };
    const idle = "requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 1200 }) : setTimeout(start, 300);

    return () => {
      if ("cancelIdleCallback" in window) cancelIdleCallback(idle as number);
      clearTimeout(idle as number);
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObs.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_75%)]"
    />
  );
}
