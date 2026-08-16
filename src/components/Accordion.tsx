"use client";

import { useState } from "react";
import type { Faq } from "@/lib/faq";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export default function Accordion({ items, tone = "light" }: { items: Faq[]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("border-t", tone === "dark" ? "border-paper/12" : "border-ink/[0.13]")}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal
            key={f.q}
            delay={Math.min(i * 40, 220)}
            className={cn("border-b", tone === "dark" ? "border-paper/12" : "border-ink/[0.13]")}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "flex-1 font-display text-[clamp(1.05rem,1.7vw,1.35rem)] font-light leading-[1.32] tracking-[-0.015em] transition-colors",
                    tone === "dark" ? "text-paper" : "text-ink",
                  )}
                >
                  {f.q}
                </span>
                <span
                  className={cn(
                    "relative mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                    tone === "dark"
                      ? "border-paper/20 text-paper group-hover:border-paper"
                      : "border-ink/15 text-ink group-hover:border-ink",
                  )}
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span
                    className={cn(
                      "absolute h-3 w-px bg-current transition-transform duration-[520ms] ease-out",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              className="grid transition-[grid-template-rows] duration-[620ms] ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "max-w-[72ch] pb-8 pr-14 text-[1rem] leading-[1.75] transition-opacity duration-500",
                    tone === "dark" ? "text-paper/60" : "text-bark/75",
                    isOpen ? "opacity-100" : "opacity-0",
                  )}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
