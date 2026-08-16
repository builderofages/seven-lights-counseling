"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { lights } from "@/lib/lights";
import { LogoMark } from "@/components/Logo";
import Reveal from "@/components/motion/Reveal";
import { track } from "@/lib/analytics";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    track("lead_submit", { source: "footer_guide" });
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer_guide", intent: "guide" }),
      });
      if (!r.ok) throw new Error();
      setState("done");
      track("lead_success", { source: "footer_guide" });
    } catch {
      setState("error");
    }
  }

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* ambient film */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.13]"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/media/curtain.webp"
        aria-hidden="true"
      >
        <source src="/media/curtain.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/95 to-ink" />
      <div className="grain pointer-events-none absolute inset-0 grain-light" />

      {/* seven-light rule, breathing */}
      <div className="relative flex h-[3px] w-full">
        {lights.map((l, i) => (
          <span
            key={l.n}
            className="h-full flex-1 animate-breathe"
            style={{ background: l.color, animationDelay: `${i * 0.55}s` }}
          />
        ))}
      </div>

      {/* ---------- guide capture ---------- */}
      <div className="relative border-b border-paper/10">
        <div className="shell grid gap-10 py-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-clay">Free guide</p>
              <p className="mt-5 max-w-[22ch] font-display text-display-sm font-light">
                What the first three sessions actually look like.
              </p>
              <p className="mt-4 max-w-[46ch] font-sans text-[0.9375rem] leading-relaxed text-paper/55">
                Written by Kerry. What gets asked, what you never have to
                disclose, what changes and when. One email — no sequence, no
                newsletter.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={100}>
              {state === "done" ? (
                <p className="rounded-2xl border border-paper/15 bg-paper/[0.04] p-6 font-sans text-[0.9375rem] leading-relaxed text-paper/75">
                  On its way — check your inbox in a minute or two.
                </p>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                  <label className="sr-only" htmlFor="footer-email">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="h-[3.1rem] flex-1 rounded-full border border-paper/20 bg-transparent px-6 font-sans text-[0.9375rem] text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-clay"
                  />
                  <button type="submit" disabled={state === "sending"} className="btn-light btn-md">
                    <span>{state === "sending" ? "Sending…" : "Send it"}</span>
                  </button>
                </form>
              )}
              {state === "error" && (
                <p className="mt-3 font-sans text-[0.8125rem] text-light-1">
                  That did not send. Try again, or email us directly.
                </p>
              )}
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------- main columns ---------- */}
      <div className="shell relative grid gap-14 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <LogoMark className="h-9 w-auto text-paper" />
            <p className="mt-7 max-w-[30ch] font-display text-[1.6rem] font-light leading-[1.2] tracking-[-0.02em]">
              {site.slogan}.
            </p>
            <p className="mt-6 max-w-[36ch] font-sans text-[0.875rem] leading-relaxed text-paper/50">
              Integrative psychotherapy for young adults and adults, in Annapolis
              and by telehealth across {site.contact.region}.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-9 space-y-1.5">
            <a href={site.contact.phoneHref} className="link-sweep block font-sans text-sm text-paper/80">
              {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="link-sweep block font-sans text-sm text-paper/80">
              {site.contact.email}
            </a>
            <p className="pt-3 font-sans text-sm leading-relaxed text-paper/45">
              {site.contact.addressLine1}
              <br />
              {site.contact.addressLine2}
            </p>
          </Reveal>

          <Reveal delay={130} className="mt-8">
            <p className="eyebrow text-paper/35">Hours</p>
            <dl className="mt-4 space-y-1.5">
              {site.contact.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-6 font-sans text-[0.8125rem] text-paper/50">
                  <dt>{h.day}</dt>
                  <dd className="text-paper/70">{h.time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {site.footerNav.map((col, i) => (
            <Reveal key={col.title} delay={i * 70}>
              <p className="eyebrow text-paper/35">{col.title}</p>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-sweep font-sans text-[0.875rem] text-paper/65 transition-colors hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ---------- crisis ---------- */}
      <div className="shell relative">
        <Reveal className="rounded-2xl border border-light-1/25 bg-light-1/[0.07] p-6 sm:p-8">
          <p className="eyebrow text-light-1/90">In an emergency</p>
          <p className="mt-4 max-w-[64ch] font-sans text-[0.9375rem] leading-relaxed text-paper/70">
            Seven Lights Counseling is an outpatient practice and does not provide
            emergency or crisis services. If you or someone else is in immediate
            danger, call <strong className="text-paper">911</strong>. For urgent
            mental-health support at any hour, call or text{" "}
            <a href={site.crisis.href} className="link-sweep font-medium text-paper">
              {site.crisis.line}
            </a>{" "}
            — the {site.crisis.label}.
          </p>
        </Reveal>
      </div>

      {/* ---------- giant wordmark ---------- */}
      <div className="relative mt-20 select-none overflow-hidden" aria-hidden="true">
        <p className="mask-fade-b whitespace-nowrap px-2 text-center font-display text-[clamp(3.5rem,15.5vw,15rem)] font-light leading-[0.85] tracking-[-0.045em] text-paper/[0.07]">
          Seven Lights
        </p>
      </div>

      <div className="shell relative flex flex-col gap-5 border-t border-paper/10 py-8 text-[0.75rem] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.clinician.licenseNote}.
        </p>
        <p className="max-w-[52ch] sm:text-right">
          Information on this site is educational and is not a substitute for
          individual clinical advice, diagnosis, or treatment.
        </p>
      </div>
    </footer>
  );
}
