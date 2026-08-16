"use client";

import { useEffect, useRef, useState } from "react";
import ServiceAura from "@/components/service/ServiceAura";

export default function PageHero({
  eyebrow,
  title,
  lede,
  video,
  poster,
  lightIds = [1, 3, 5, 7],
  seed = 2,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  video?: string;
  poster?: string;
  lightIds?: number[];
  seed?: number;
  children?: React.ReactNode;
}) {
  const media = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const loop = () => {
      const y = window.scrollY;
      if (media.current && y < window.innerHeight * 1.3) {
        media.current.style.transform = `translate3d(0, ${(y * 0.22).toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const words = title.split(" ");

  return (
    <section className="relative flex min-h-[72svh] flex-col justify-end overflow-hidden bg-contrast text-onc">
      {video && (
        <div ref={media} className="absolute inset-0 will-change-transform">
          <video
            className="h-full w-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden="true"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}

      <ServiceAura
        lightIds={lightIds}
        seed={seed}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-50 mix-blend-screen"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/75 to-scrim/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-scrim/80 via-scrim/25 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 grain-light" />

      <div className="shell relative pb-16 pt-40">
        <p
          className="eyebrow text-accent transition-all duration-1000 ease-out"
          style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(12px)" }}
        >
          {eyebrow}
        </p>

        <h1 className="mt-7 max-w-[17ch] font-display text-display-lg font-light">
          {words.map((w, i) => (
            <span key={i} className="split-word" style={{ "--wi": i } as React.CSSProperties}>
              <span
                style={{
                  transform: ready ? "none" : "translate3d(0,105%,0)",
                  transitionDelay: `${160 + i * 80}ms`,
                }}
              >
                {w}
              </span>
              {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </h1>

        {lede && (
          <p
            className="mt-8 max-w-prose text-lede text-onc/70 transition-all duration-[1100ms] ease-out"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(18px)",
              transitionDelay: "520ms",
            }}
          >
            {lede}
          </p>
        )}

        {children && (
          <div
            className="mt-10 transition-all duration-[1100ms] ease-out"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(18px)",
              transitionDelay: "660ms",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
