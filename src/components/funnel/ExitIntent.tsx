"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/Logo";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const KEY = "sl_exit_seen";

export default function ExitIntent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    if (pathname.startsWith("/begin")) return;
    if (localStorage.getItem(KEY) === "1") return;

    let armed = false;
    const arm = setTimeout(() => (armed = true), 18000);

    const onLeave = (e: MouseEvent) => {
      if (!armed || e.clientY > 8 || e.relatedTarget) return;
      fire();
    };

    // mobile: fire on rapid upward scroll near top after dwell
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (armed && lastY - y > 90 && y < 380) fire();
      lastY = y;
    };

    const fire = () => {
      setOpen(true);
      localStorage.setItem(KEY, "1");
      track("exit_intent_shown", { path: pathname });
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
    };

    document.addEventListener("mouseout", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(arm);
      cleanup();
    };
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    track("lead_submit", { source: "exit_intent" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit_intent", intent: "guide" }),
      });
      if (!res.ok) throw new Error();
      setState("done");
      track("lead_success", { source: "exit_intent" });
    } catch {
      setState("error");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Before you go"
    >
      <button
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-scrim/55 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "relative w-full max-w-lg overflow-hidden rounded-3xl bg-surface p-8 shadow-[0_40px_120px_-40px_rgba(20,16,14,0.7)] sm:p-10",
          "animate-[rayIn_0ms]",
        )}
        style={{ animation: "none" }}
      >
        <div className="flex h-[3px] w-full absolute inset-x-0 top-0">
          {["#8C4A44", "#B0703F", "#BE9A4E", "#6E8663", "#4E7183", "#4B527B", "#6D5578"].map((c) => (
            <span key={c} className="h-full flex-1" style={{ background: c }} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-fgm/40 transition-colors hover:bg-fg/5 hover:text-fg"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        {state === "done" ? (
          <div className="py-4 text-center">
            <LogoMark className="mx-auto h-8 w-auto text-accent" />
            <p className="mt-6 font-display text-display-sm">It&rsquo;s on its way.</p>
            <p className="mx-auto mt-3 max-w-[34ch] font-sans text-[0.9375rem] leading-relaxed text-fgm/70">
              Check your inbox in the next minute or two. If nothing arrives,
              look in promotions or spam.
            </p>
            <button onClick={() => setOpen(false)} className="btn-ghost btn-md mt-7">
              <span>Close</span>
            </button>
          </div>
        ) : (
          <>
            <LogoMark className="h-7 w-auto text-accent" />
            <p className="eyebrow mt-6">Before you go</p>
            <h2 className="mt-4 font-display text-[1.9rem] leading-[1.12] tracking-[-0.025em]">
              What the first three sessions actually look like
            </h2>
            <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-fgm/70">
              A short, plain-language guide to starting therapy — what gets asked,
              what you never have to disclose, what changes and when. Written by
              Kerry. No newsletter, no sequence, one email.
            </p>

            <form onSubmit={submit} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="exit-email">
                Email address
              </label>
              <input
                id="exit-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="h-[3.1rem] flex-1 rounded-full border border-line/15 bg-transparent px-6 font-sans text-[0.9375rem] outline-none transition-colors placeholder:text-fgm/35 focus:border-accent"
              />
              <button type="submit" disabled={state === "sending"} className="btn-primary btn-md sm:w-auto">
                <span>{state === "sending" ? "Sending…" : "Send it"}</span>
              </button>
            </form>

            {state === "error" && (
              <p className="mt-3 font-sans text-[0.8125rem] text-light-1">
                Something went wrong. Please try again, or email us directly.
              </p>
            )}

            <p className="mt-4 font-sans text-[0.75rem] leading-relaxed text-fgm/45">
              Your address is used once, for this guide. It is never sold or added
              to a marketing list.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
