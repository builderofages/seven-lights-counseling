"use client";

import { cn } from "@/lib/cn";
import { lights } from "@/lib/lights";

/**
 * SEVEN LIGHTS — identity mark.
 *
 * An archway built from seven nested arcs rising off a single baseline.
 *
 * The arch is the idea: a threshold you walk through, which is what the
 * slogan promises. Read outward it is growth — each arc a wider reach than
 * the last. Read as light it is a halo of seven. It is drawn with one stroke
 * weight on one baseline, so it engraves, embroiders, stamps in foil, and
 * still resolves at 16px. The optional spectrum fill gives each arc one of
 * the seven light colours without the mark ever becoming a rainbow.
 */

const ARCS = [3.2, 4.6, 6.0, 7.4, 8.8, 10.2, 11.6];
const BASE = 25.5;
const CX = 16;

function arcPath(r: number) {
  return `M ${CX - r} ${BASE} A ${r} ${r} 0 0 1 ${CX + r} ${BASE}`;
}

export function LogoMark({
  className,
  animate = false,
  spectrum = false,
}: {
  className?: string;
  animate?: boolean;
  spectrum?: boolean;
}) {
  return (
    <svg viewBox="0 0 32 30" fill="none" aria-hidden="true" className={cn(className)}>
      <g strokeWidth="1.25" strokeLinecap="round">
        {ARCS.map((r, i) => (
          <path
            key={r}
            d={arcPath(r)}
            stroke={spectrum ? lights[i].color : "currentColor"}
            pathLength={1}
            className={animate ? "logo-arc" : undefined}
            style={animate ? ({ "--i": 6 - i } as React.CSSProperties) : undefined}
          />
        ))}
        <line
          x1={CX - 13.2}
          y1={BASE}
          x2={CX + 13.2}
          y2={BASE}
          stroke="currentColor"
          opacity={0.45}
        />
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
      <LogoMark className="h-[2.05em] w-auto shrink-0" animate={animate} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.02em] font-normal tracking-[0.17em]">
          SEVEN LIGHTS
        </span>
        {!compact && (
          <span className="mt-[0.4em] font-sans text-[0.4em] font-medium uppercase tracking-[0.5em] opacity-50">
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
      <LogoMark className="h-14 w-auto" spectrum />
      <span className="mt-6 font-display text-lg tracking-[0.34em]">SEVEN LIGHTS</span>
      <span className="mt-2.5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.52em] opacity-50">
        Counseling
      </span>
    </div>
  );
}
