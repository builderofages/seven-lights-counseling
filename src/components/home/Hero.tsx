"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

const SPECTRUM = ["#8C4A44", "#B0703F", "#BE9A4E", "#6E8663", "#4E7183", "#4B527B", "#6D5578"];

export default function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
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
      if (media.current && y < window.innerHeight * 1.2) {
        media.current.style.transform = `translate3d(0, ${(y * 0.28).toFixed(1)}px, 0) scale(${(1 + y * 0.00012).toFixed(4)})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const words = "Illuminate the path within".split(" ");

  return (
    <section
      ref={wrap}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-paper"
    >
      {/* ---- media ---- */}
      <div ref={media} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/hero.webp"
          aria-hidden="true"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 grain-light" />

      {/* ---- content ---- */}
      <div className="shell relative pb-14 pt-36 sm:pb-16">
        <div
          className="flex items-center gap-4 transition-all duration-1000 ease-out"
          style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(14px)" }}
        >
          <span className="flex gap-[3px]">
            {SPECTRUM.map((c, i) => (
              <span
                key={c}
                className="block h-3.5 w-[3px] rounded-full transition-transform duration-700 ease-out"
                style={{
                  background: c,
                  transform: ready ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "bottom",
                  transitionDelay: `${240 + i * 55}ms`,
                }}
              />
            ))}
          </span>
          <p className="eyebrow text-paper/60">
            <span className="hidden sm:inline">Annapolis, Maryland · Telehealth statewide</span>
            <span className="sm:hidden">Annapolis, MD · Telehealth</span>
          </p>
        </div>

        <h1 className="mt-7 max-w-[15ch] font-display text-display-xl font-light">
          {words.map((w, i) => (
            <span key={i} className="split-word" style={{ "--wi": i } as React.CSSProperties}>
              <span
                style={{
                  transform: ready ? "none" : "translate3d(0,105%,0)",
                  transitionDelay: `${180 + i * 90}ms`,
                }}
              >
                {w}
              </span>
              {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p
            className="max-w-prose text-lede text-paper/72 transition-all duration-[1100ms] ease-out lg:col-span-6"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(20px)",
              transitionDelay: "620ms",
            }}
          >
            Integrative psychotherapy for young adults and adults — addiction and
            recovery, complex trauma, anxiety, attachment, and the questions
            underneath all of it. Held by one clinician, in one room, for as long
            as the work takes.
          </p>

          <div
            className="flex flex-wrap items-center gap-3 transition-all duration-[1100ms] ease-out lg:col-span-6 lg:justify-end"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(20px)",
              transitionDelay: "760ms",
            }}
          >
            <Link
                href={site.cta.primary.href}
                onClick={() => track("cta_click", { location: "hero_primary" })}
                className="btn-primary btn-lg !bg-paper !text-ink"
              >
                <span>Book a free 15-minute call</span>
              </Link>
            <Link
              href={site.cta.secondary.href}
              onClick={() => track("cta_click", { location: "hero_secondary" })}
              className="btn-light btn-lg"
            >
              <span>Find your starting point</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ---- credibility rail ---- */}
      <div className="relative border-t border-paper/12">
        <div className="shell flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-5 font-sans text-[0.72rem] uppercase tracking-[0.16em] text-paper/45">
          <span>Kerry Garrity, LCSW-C</span>
          <span className="hidden sm:inline">Trauma-informed · IFS · Somatic</span>
          <span className="hidden md:inline">Ages 18+</span>
          <span className="hidden lg:inline">Superbills for out-of-network</span>
          <span className="flex items-center gap-2 text-sage">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sage" />
            </span>
            Accepting new clients
          </span>
        </div>
      </div>
    </section>
  );
}
