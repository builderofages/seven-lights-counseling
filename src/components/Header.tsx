"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Wordmark, LogoMark } from "@/components/Logo";
import { cn } from "@/lib/cn";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);
  const lastY = useRef(0);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY.current && !mega);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mega]);

  useEffect(() => {
    setMenu(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setMega(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMega(false), 170);
  };

  const dark = !scrolled && (pathname === "/" || pathname === "/approach");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-[transform,background-color,backdrop-filter,border-color] duration-[650ms] ease-out",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled || mega
            ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
        onMouseLeave={closeMega}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-8">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className={cn(
              "group relative z-10 transition-colors duration-500",
              dark ? "text-paper" : "text-ink",
            )}
          >
            <Wordmark className="text-[15px] sm:text-[17px]" />
          </Link>

          <nav
            aria-label="Primary"
            className={cn(
              "hidden items-center gap-9 lg:flex",
              dark ? "text-paper/85" : "text-bark",
            )}
          >
            <button
              type="button"
              onMouseEnter={openMega}
              onFocus={openMega}
              onClick={() => setMega((v) => !v)}
              aria-expanded={mega}
              className={cn(
                "link-sweep font-sans text-[0.8125rem] font-medium tracking-[0.02em] transition-colors",
                dark ? "hover:text-paper" : "hover:text-ink",
                pathname.startsWith("/services") && "text-clay",
              )}
            >
              Services
            </button>
            {site.nav.slice(1).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onMouseEnter={closeMega}
                className={cn(
                  "link-sweep font-sans text-[0.8125rem] font-medium tracking-[0.02em] transition-colors",
                  dark ? "hover:text-paper" : "hover:text-ink",
                  pathname === n.href && "text-clay",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.contact.phoneHref}
              className={cn(
                "hidden font-sans text-[0.8125rem] font-medium tracking-[0.02em] transition-colors xl:block",
                dark ? "text-paper/75 hover:text-paper" : "text-bark hover:text-ink",
              )}
            >
              {site.contact.phone}
            </a>
            <Link
                href={site.cta.primary.href}
                className={cn("btn-md", dark ? "btn-light" : "btn-primary")}
              >
                <span>Book a consultation</span>
              </Link>

            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden",
                dark ? "border-paper/25 text-paper" : "border-ink/15 text-ink",
              )}
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-5 bg-current" />
              </span>
            </button>
          </div>
        </div>

        {/* ---------- Mega panel ---------- */}
        <div
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          className={cn(
            "pointer-events-none absolute inset-x-0 top-full hidden origin-top border-b border-ink/10 bg-paper/95 backdrop-blur-xl transition-all duration-[560ms] ease-out lg:block",
            mega ? "pointer-events-auto opacity-100" : "-translate-y-3 opacity-0",
          )}
          aria-hidden={!mega}
        >
          <div className="shell grid grid-cols-12 gap-10 py-10">
            <div className="col-span-3">
              <p className="eyebrow">Where to begin</p>
              <p className="mt-5 font-display text-[1.35rem] leading-[1.25] text-ink">
                Not sure which door is yours?
              </p>
              <p className="mt-3 max-w-[26ch] font-sans text-[0.875rem] leading-relaxed text-bark/70">
                Answer six questions and we&rsquo;ll point you to the right starting
                point — no email required to see the result.
              </p>
              <Link href="/begin?mode=match" className="btn-ghost btn-sm mt-6">
                <span>Find your starting point</span>
              </Link>
            </div>

            <div className="col-span-9 grid grid-cols-3 gap-x-8 gap-y-1">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-start gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-ink/[0.035]"
                >
                  <span className="mt-[3px] font-sans text-[0.625rem] font-semibold tracking-[0.14em] text-clay/70">
                    {s.index}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[0.98rem] leading-tight text-ink">
                      {s.navTitle}
                    </span>
                    <span className="mt-1 block truncate font-sans text-[0.78rem] text-bark/55">
                      {s.eyebrow}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Mobile overlay ---------- */}
      <div
        className={cn(
          "fixed inset-0 z-[100] flex flex-col bg-ink text-paper transition-[clip-path] duration-[780ms] ease-out lg:hidden",
          menu ? "[clip-path:inset(0_0_0%_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between">
          <Wordmark className="text-[15px]" />
          <button
            type="button"
            onClick={() => setMenu(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <div className="shell flex-1 overflow-y-auto pb-10 pt-6">
          <nav className="flex flex-col">
            {[{ label: "Services", href: "/services" }, ...site.nav.slice(1), { label: "Contact", href: "/contact" }].map(
              (n, i) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="border-b border-paper/10 py-5 font-display text-[1.9rem] leading-none tracking-[-0.02em] transition-opacity duration-500"
                  style={{
                    opacity: menu ? 1 : 0,
                    transform: menu ? "none" : "translateY(14px)",
                    transition: `opacity 620ms cubic-bezier(.16,1,.3,1) ${140 + i * 60}ms, transform 620ms cubic-bezier(.16,1,.3,1) ${140 + i * 60}ms`,
                  }}
                >
                  {n.label}
                </Link>
              ),
            )}
          </nav>

          <div className="mt-9 grid grid-cols-2 gap-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-lg border border-paper/10 px-3 py-3 font-sans text-[0.8rem] leading-snug text-paper/70"
              >
                {s.navTitle}
              </Link>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3">
            <Link href={site.cta.primary.href} className="btn-light btn-lg w-full">
              <span>Book a free consultation</span>
            </Link>
            <a href={site.contact.phoneHref} className="py-3 text-center font-sans text-sm text-paper/60">
              {site.contact.phone}
            </a>
          </div>

          <div className="mt-10 flex justify-center opacity-30">
            <LogoMark className="h-8 w-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
