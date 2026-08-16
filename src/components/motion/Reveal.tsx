"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** animation primitive */
  variant?: "up" | "fade" | "clip" | "scale";
  /** ms */
  delay?: number;
  /** 0–1, portion of viewport before firing */
  threshold?: number;
  once?: boolean;
};

/**
 * IntersectionObserver-driven reveal. Deliberately CSS-transition based
 * rather than JS-tweened so it stays smooth under Lenis and costs nothing
 * on the main thread.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  variant = "up",
  delay = 0,
  threshold = 0.18,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-in");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);

    // fallback: if the observer has not fired within 1.4s (slow hydration,
    // an element already fully in view on load, or a headless capture) reveal
    // anyway rather than leave a blank hole in the page.
    const fallback = setTimeout(() => el.classList.add("is-in"), 1400);

    return () => {
      clearTimeout(fallback);
      io.disconnect();
    };
  }, [threshold, once]);

  const variantClass =
    variant === "up"
      ? "r-up"
      : variant === "fade"
        ? "r-fade"
        : variant === "clip"
          ? "r-clip"
          : "r-scale";

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={cn(variantClass, className)}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Component>
  );
}
