"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Continuously drifting band of imagery. Duplicated once and translated by
 * -50% so the loop is seamless; pauses on hover and under reduced motion.
 */
export default function ImageMarquee({
  items,
  speed = 68,
  reverse = false,
  height = "h-[16rem] sm:h-[21rem]",
  className,
}: {
  items: { src: string; alt: string }[];
  speed?: number;
  reverse?: boolean;
  height?: string;
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("mask-fade-x group relative overflow-hidden", className)}>
      <div
        className="flex w-max gap-4 will-change-transform group-hover:[animation-play-state:paused] sm:gap-6"
        style={{
          animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {doubled.map((it, i) => (
          <figure
            key={i}
            className={cn("relative shrink-0 overflow-hidden rounded-xl", height)}
            style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : i % 3 === 1 ? "4 / 3" : "1 / 1" }}
          >
            <Image
              src={it.src}
              alt={i < items.length ? it.alt : ""}
              aria-hidden={i >= items.length}
              fill
              sizes="(min-width:640px) 26rem, 18rem"
              className="object-cover transition-transform duration-[700ms] ease-out hover:scale-[1.06]"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
