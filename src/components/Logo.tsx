"use client";

import { cn } from "@/lib/cn";

/**
 * SEVEN LIGHTS — identity mark.
 *
 * Seven horizontal strokes whose lengths are the chord widths of a circle at
 * seven evenly spaced heights. The circle is never drawn; the eye completes it.
 *
 * It reads as a sun crossing a horizon, an eye, and a spectrum at once — and
 * because the geometry is derived rather than decorative, it holds together at
 * 16px and engraves cleanly in one colour.
 */

const R = 12;
const YS = [-9.6, -6.4, -3.2, 0, 3.2, 6.4, 9.6];
const BARS = YS.map((y) => ({
  y: 16 + y,
  half: R * Math.sqrt(1 - (y / R) ** 2) * 0.9,
}));

export function LogoMark({
  className,
  animate = false,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn(className)}>
      <g stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
        {BARS.map((b, i) => (
          <line
            key={i}
            x1={16 - b.half}
            y1={b.y}
            x2={16 + b.half}
            y2={b.y}
            className={animate ? "logo-ray" : undefined}
            style={animate ? ({ "--i": i, transformOrigin: "16px center" } as React.CSSProperties) : undefined}
          />
        ))}
      </g>
    </svg>
  );
}

export function Wordmark({
  className,
  animate = false,
  compact = false,
}: {
  className?: string;
  animate?: boolean;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3.5", className)}>
      <LogoMark className="h-[1.9em] w-auto shrink-0" animate={animate} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.02em] font-normal tracking-[0.16em]">
          SEVEN LIGHTS
        </span>
        {!compact && (
          <span className="mt-[0.38em] font-sans text-[0.4em] font-medium uppercase tracking-[0.48em] opacity-50">
            Counseling
          </span>
        )}
      </span>
    </span>
  );
}

export function LogoStack({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <LogoMark className="h-12 w-auto" />
      <span className="mt-6 font-display text-lg tracking-[0.34em]">SEVEN LIGHTS</span>
      <span className="mt-2.5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.52em] opacity-50">
        Counseling
      </span>
    </div>
  );
}
