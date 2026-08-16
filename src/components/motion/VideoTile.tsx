"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * A looping ambient tile that only decodes and plays while it is on screen.
 * Keeps a page full of motion from costing a page full of decoders.
 */
export default function VideoTile({
  src,
  poster,
  className,
  ratio = "4 / 5",
  label,
}: {
  src: string;
  poster: string;
  className?: string;
  ratio?: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      className={cn("group relative overflow-hidden rounded-2xl bg-umber", className)}
      style={{ aspectRatio: ratio }}
    >
      <video
        ref={ref}
        className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-hidden={!label}
      >
        <source src={src} type="video/mp4" />
      </video>
      {label && (
        <>
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 font-sans text-[0.75rem] uppercase tracking-[0.16em] text-paper/85">
            {label}
          </figcaption>
        </>
      )}
    </figure>
  );
}
