"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Word-by-word masked rise for display headlines.
 * Renders real text (each word wrapped) so it stays selectable and
 * fully readable to screen readers and crawlers.
 */
export default function SplitLines({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            if (once) io.unobserve(el);
          }
        }),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const words = text.split(" ");

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={cn(className)}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {words.map((w, i) => (
        <span key={i} className="split-word" style={{ "--wi": i } as React.CSSProperties}>
          <span>{w}</span>
          {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </Component>
  );
}
