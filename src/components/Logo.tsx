"use client";

import { cn } from "@/lib/cn";

/**
 * SEVEN LIGHTS — identity mark.
 *
 * Seven vertical strokes whose crowns trace a rising arc.
 * Reads simultaneously as: rays of light, a sunrise over a horizon,
 * an aperture opening, and a sound wave — a person being heard.
 * Built on a strict 24-unit grid so it stays crisp at 16px.
 */
export function LogoMark({
  className,
  animate = false,
}: {
  className?: string;
  animate?: boolean;
}) {
  // crown heights trace a shallow arc; 7 strokes, centre tallest
  const bars = [
    { x: 2, h: 7.5 },
    { x: 5.5, h: 11 },
    { x: 9, h: 14 },
    { x: 12.5, h: 15.5 },
    { x: 16, h: 14 },
    { x: 19.5, h: 11 },
    { x: 23, h: 7.5 },
  ];

  return (
    <svg
      viewBox="0 0 25 22"
      fill="none"
      aria-hidden="true"
      className={cn("overflow-visible", className)}
    >
      <g stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
        {bars.map((b, i) => (
          <line
            key={i}
            x1={b.x}
            y1={18.5}
            x2={b.x}
            y2={18.5 - b.h}
            className={animate ? "logo-ray" : undefined}
            style={
              animate
                ? ({ "--i": i, transformOrigin: `${b.x}px 18.5px` } as React.CSSProperties)
                : undefined
            }
          />
        ))}
      </g>
      {/* horizon */}
      <line
        x1="0.5"
        y1="21"
        x2="24.5"
        y2="21"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.42"
      />
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
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-[1.55em] w-auto shrink-0" animate={animate} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.02em] font-medium tracking-[0.13em] uppercase">
          Seven Lights
        </span>
        {!compact && (
          <span className="mt-[0.34em] font-sans text-[0.42em] font-medium uppercase tracking-[0.42em] opacity-55">
            Counseling
          </span>
        )}
      </span>
    </span>
  );
}

/** Full lock-up for the footer / print / share cards. */
export function LogoStack({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <LogoMark className="h-10 w-auto" />
      <span className="mt-5 font-display text-lg font-medium uppercase tracking-[0.34em]">
        Seven Lights
      </span>
      <span className="mt-2 font-sans text-[0.6rem] font-medium uppercase tracking-[0.5em] opacity-55">
        Counseling
      </span>
    </div>
  );
}
