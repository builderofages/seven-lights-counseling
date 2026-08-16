"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Service } from "@/lib/services";
import { lights } from "@/lib/lights";
import ServiceAura from "@/components/service/ServiceAura";
import Magnetic from "@/components/motion/Magnetic";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * Per-service animated header.
 * Three layers, each moving at a different rate:
 *   1. the service's own ambient film (slow parallax)
 *   2. a canvas aura tuned to the lights this service engages
 *   3. a breathing light-column rail that reads as alignment / balance
 */
export default function ServiceHero({
  service,
  video,
  seed,
}: {
  service: Service;
  video: string;
  seed: number;
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
        media.current.style.transform = `translate3d(0, ${(y * 0.24).toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const engaged = service.lights.map((n) => lights.find((l) => l.n === n)!).filter(Boolean);
  const words = service.title.split(" ");

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink text-paper">
      <div ref={media} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover opacity-[0.42]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={service.image}
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <ServiceAura
        lightIds={service.lights}
        seed={seed}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.55] mix-blend-screen"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/35 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 grain-light" />

      {/* breathing light rail — the service's own lights, aligned */}
      <div className="absolute right-gutter top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {lights.map((l) => {
          const on = service.lights.includes(l.n);
          return (
            <div key={l.n} className="flex items-center gap-3">
              <span
                className="font-sans text-[0.625rem] font-semibold tracking-[0.16em] transition-opacity duration-700"
                style={{ color: on ? l.color : "#F5F0E8", opacity: on ? 0.95 : 0.22 }}
              >
                {l.name}
              </span>
              <span
                className="block h-px transition-all duration-[900ms] ease-out"
                style={{
                  width: on ? 54 : 20,
                  background: on ? l.color : "#F5F0E8",
                  opacity: on ? 1 : 0.2,
                  animation: on ? "breathe 7s ease-in-out infinite" : undefined,
                  animationDelay: `${l.n * 0.4}s`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="shell relative pb-14 pt-40">
        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-2 transition-all duration-1000 ease-out"
          style={{ opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(12px)" }}
        >
          <Link href="/services" className="link-sweep eyebrow text-paper/50">
            Services
          </Link>
          <span className="eyebrow text-paper/25">/</span>
          <span className="eyebrow text-clay">{service.index}</span>
          <span className="eyebrow text-paper/50">{service.eyebrow}</span>
        </div>

        <h1 className="mt-7 max-w-[16ch] font-display text-display-lg font-light">
          {words.map((w, i) => (
            <span key={i} className="split-word" style={{ "--wi": i } as React.CSSProperties}>
              <span
                style={{
                  transform: ready ? "none" : "translate3d(0,105%,0)",
                  transitionDelay: `${170 + i * 85}ms`,
                }}
              >
                {w}
              </span>
              {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </h1>

        <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p
            className="max-w-prose text-lede text-paper/72 transition-all duration-[1100ms] ease-out lg:col-span-6"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(18px)",
              transitionDelay: "560ms",
            }}
          >
            {service.lede}
          </p>

          <div
            className="flex flex-wrap items-center gap-3 transition-all duration-[1100ms] ease-out lg:col-span-5 lg:col-start-8 lg:justify-end"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(18px)",
              transitionDelay: "700ms",
            }}
          >
            <Magnetic strength={0.24}>
              <Link
                href="/begin"
                onClick={() => track("cta_click", { location: `service_hero_${service.slug}` })}
                className="btn-primary btn-lg !bg-paper !text-ink"
              >
                <span>Book a free call</span>
              </Link>
            </Magnetic>
            <a href={site.contact.phoneHref} className="btn-light btn-lg">
              <span>{site.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* engaged-lights strip (mobile) */}
      <div className="relative border-t border-paper/12 lg:hidden">
        <div className="shell flex items-center gap-4 py-4">
          <span className="eyebrow text-paper/35">Lights engaged</span>
          <span className="flex flex-wrap gap-2">
            {engaged.map((l) => (
              <span
                key={l.n}
                className="rounded-full px-3 py-1 font-sans text-[0.6875rem] font-medium"
                style={{ background: `${l.color}22`, color: l.color }}
              >
                {l.name}
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
