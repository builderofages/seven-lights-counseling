"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

/**
 * Persistent conversion rail. Appears after the hero, retreats while the
 * user is actively reading a form, and never covers the footer CTA.
 */
export default function StickyConsult() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sl_rail_dismissed") === "1") setDismissed(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const nearEnd = y + window.innerHeight > doc.scrollHeight - 900;
      setShow(y > window.innerHeight * 0.85 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hiddenOn = ["/begin", "/contact"];
  if (dismissed || hiddenOn.some((p) => pathname.startsWith(p))) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[80] px-gutter pb-4 transition-all duration-[700ms] ease-out sm:pb-6",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-3xl items-center gap-4 rounded-full border border-ink/10 bg-paper/90 py-2.5 pl-6 pr-2.5 shadow-[0_18px_50px_-20px_rgba(20,16,14,0.4)] backdrop-blur-xl">
        <span className="hidden min-w-0 flex-1 font-sans text-[0.8125rem] leading-snug text-bark/80 sm:block">
          Free 15-minute consultation — no cost, no obligation.
        </span>
        <span className="min-w-0 flex-1 font-sans text-[0.8125rem] leading-snug text-bark/80 sm:hidden">
          Free 15-min consultation
        </span>
        <Link
          href={site.cta.primary.href}
          onClick={() => track("cta_click", { location: "sticky_rail" })}
          className="btn-primary btn-sm shrink-0"
        >
          <span>Book now</span>
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            sessionStorage.setItem("sl_rail_dismissed", "1");
            setDismissed(true);
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-bark/40 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
