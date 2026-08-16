"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Three columns of imagery scrolling at different rates against the page.
 * Uses a single rAF loop and transform-only writes, so it stays at 60fps
 * alongside Lenis.
 */
export default function ParallaxColumns({
  columns,
  className,
}: {
  columns: { src: string; alt: string }[][];
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const cols = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const rates = [-0.05, 0.035, -0.07];
    let raf = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      // progress: -1 (below viewport) → 1 (above viewport)
      const p = (window.innerHeight / 2 - (r.top + r.height / 2)) / (window.innerHeight / 2 + r.height / 2);
      cols.current.forEach((c, i) => {
        if (c) c.style.transform = `translate3d(0, ${(p * (rates[i % rates.length] ?? 0) * 160).toFixed(1)}px, 0)`;
      });
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrap} className={cn("grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6", className)}>
      {columns.map((col, ci) => (
        <div
          key={ci}
          ref={(el) => {
            cols.current[ci] = el;
          }}
          className={cn(
            "flex flex-col gap-4 will-change-transform md:gap-6",
            ci === 2 && "hidden md:flex",
          )}
        >
          {col.map((it, i) => (
            <figure
              key={i}
              className="group relative overflow-hidden rounded-xl"
              style={{ aspectRatio: (ci + i) % 3 === 0 ? "3 / 4" : (ci + i) % 3 === 1 ? "1 / 1" : "4 / 5" }}
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(min-width:768px) 30vw, 46vw"
                className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.035]"
              />
              <span className="absolute inset-0 bg-ink/5 transition-opacity duration-700 group-hover:opacity-0" />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
