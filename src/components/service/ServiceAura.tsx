"use client";

import { useEffect, useRef } from "react";
import { lights } from "@/lib/lights";

/**
 * The animated signature for a service page.
 *
 * A canvas field of slow, breathing light — one soft orb per light that the
 * service engages, orbiting a shared centre of gravity at a rate tied to a
 * calm respiratory rhythm (~5.5 breaths / minute). Because each service
 * declares a different set of lights, every service page gets a visually
 * distinct header from a single system: different colours, different orbital
 * geometry, different rhythm — while the underlying feeling (grounded,
 * balanced, warm) stays identical across the site.
 *
 * Cheap: one canvas, additive radial gradients, capped at 30fps, paused when
 * off-screen, and fully disabled under prefers-reduced-motion.
 */
export default function ServiceAura({
  lightIds,
  seed = 0,
  className,
}: {
  lightIds: number[];
  seed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const palette = lightIds
      .map((n) => lights.find((l) => l.n === n)?.color ?? "#8A6C55")
      .concat(["#B08D57"]);

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const orbs = palette.map((color, i) => {
      const k = i + seed * 0.37;
      return {
        color,
        // orbital radius as a fraction of the shorter side
        rx: 0.16 + ((k * 0.19) % 0.22),
        ry: 0.11 + ((k * 0.13) % 0.17),
        // phase offset spreads the constellation
        phase: (k * 2.399) % (Math.PI * 2),
        // slow, unequal periods so the pattern never visibly repeats
        speed: 0.055 + ((k * 0.017) % 0.045),
        size: 0.3 + ((k * 0.11) % 0.26),
      };
    });

    let raf = 0;
    let last = 0;
    let running = true;
    const t0 = performance.now();

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!running) return;
      if (now - last < 33) return; // cap ~30fps
      last = now;

      const t = (now - t0) / 1000;
      // 5.5 breaths per minute → 10.9s cycle
      const breath = 0.5 + 0.5 * Math.sin((t / 10.9) * Math.PI * 2);

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const cx = w * 0.5;
      const cy = h * 0.52;
      const base = Math.min(w, h);

      orbs.forEach((o, i) => {
        const a = t * o.speed + o.phase;
        const x = cx + Math.cos(a) * w * o.rx;
        const y = cy + Math.sin(a * 1.31 + o.phase) * h * o.ry;
        const r = base * o.size * (0.82 + breath * 0.3);

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, hexA(o.color, 0.5 - i * 0.03));
        g.addColorStop(0.42, hexA(o.color, 0.16));
        g.addColorStop(1, hexA(o.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
    };

    if (reduce) {
      // single static frame
      draw(performance.now());
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    const io = new IntersectionObserver(([e]) => (running = e.isIntersecting), {
      threshold: 0,
    });
    io.observe(canvas);

    const onVis = () => (running = !document.hidden);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [lightIds, seed]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}

function hexA(hex: string, a: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${Math.max(0, a)})`;
}
