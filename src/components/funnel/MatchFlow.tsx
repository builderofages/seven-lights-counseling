"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const SPECTRUM = ["#8C4A44", "#B0703F", "#BE9A4E", "#6E8663", "#4E7183", "#4B527B", "#6D5578"];

type Step = {
  key: "concerns" | "duration" | "history" | "format" | "funding" | "urgency";
  question: string;
  help: string;
  multi?: boolean;
  options: { value: string; label: string; hint?: string; maps?: string[] }[];
};

const STEPS: Step[] = [
  {
    key: "concerns",
    question: "What is bringing you here?",
    help: "Choose as many as apply. There is no wrong combination — most people pick three or four.",
    multi: true,
    options: [
      { value: "substance", label: "Drinking, drugs, or a compulsive habit", maps: ["substance-use-recovery"] },
      { value: "anxiety", label: "Anxiety, worry, or panic", maps: ["anxiety-depression"] },
      { value: "depression", label: "Low mood, flatness, or exhaustion", maps: ["anxiety-depression"] },
      { value: "trauma", label: "Something that happened to me", maps: ["complex-trauma-ptsd"] },
      { value: "childhood", label: "How I was raised is still running things", maps: ["attachment-codependency", "complex-trauma-ptsd"] },
      { value: "relationships", label: "A relationship, or a pattern in relationships", maps: ["adult-relationships"] },
      { value: "boundaries", label: "I over-give and cannot say no", maps: ["attachment-codependency"] },
      { value: "burnout", label: "Stress, overwhelm, or burnout", maps: ["stress-burnout"] },
      { value: "meaning", label: "Faith, meaning, or what my life is for", maps: ["spiritual-exploration"] },
      { value: "integration", label: "Integrating a psychedelic or non-ordinary experience", maps: ["psychedelic-integration"] },
      { value: "unsure", label: "Something is wrong and I cannot name it", maps: ["individual-therapy"] },
    ],
  },
  {
    key: "duration",
    question: "How long has this been going on?",
    help: "An honest guess is fine.",
    options: [
      { value: "recent", label: "Weeks — something changed recently" },
      { value: "months", label: "Months" },
      { value: "years", label: "Years" },
      { value: "always", label: "As long as I can remember" },
    ],
  },
  {
    key: "history",
    question: "Have you worked with a therapist before?",
    help: "This shapes where we start, not whether you are welcome.",
    options: [
      { value: "never", label: "No, this would be my first time" },
      { value: "some", label: "Yes, briefly" },
      { value: "lots", label: "Yes, more than once" },
      { value: "current", label: "I am seeing someone now and considering a change" },
    ],
  },
  {
    key: "format",
    question: "How would you like to meet?",
    help: "You can change this at any point — many clients mix the two.",
    options: [
      { value: "in-person", label: "In person in Annapolis" },
      { value: "video", label: "Secure video, anywhere in Maryland" },
      { value: "either", label: "Either is fine" },
    ],
  },
  {
    key: "funding",
    question: "How are you thinking about paying?",
    help: "Seven Lights is out-of-network. Answering honestly here saves you a call.",
    options: [
      { value: "private", label: "Privately, out of pocket" },
      { value: "superbill", label: "Out of pocket, with a superbill for reimbursement" },
      { value: "eap", label: "Through an employer benefit or HSA/FSA" },
      { value: "reduced", label: "I would need a reduced fee to make this work" },
      { value: "unsure", label: "I do not know yet" },
    ],
  },
  {
    key: "urgency",
    question: "How soon would you like to begin?",
    help: "This practice is not an emergency service — if you are in crisis right now, call or text 988.",
    options: [
      { value: "asap", label: "As soon as there is an opening" },
      { value: "weeks", label: "In the next few weeks" },
      { value: "exploring", label: "I am just exploring for now" },
    ],
  },
];

type Answers = Partial<Record<Step["key"], string[]>>;

export default function MatchFlow({ startMode = "match" }: { startMode?: "match" | "book" }) {
  const router = useRouter();
  const [phase, setPhase] = useState<"quiz" | "result">(startMode === "book" ? "result" : "quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    company: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");

  const current = STEPS[step];
  const progress = phase === "result" ? 1 : step / STEPS.length;

  const recommended = useMemo(() => {
    const picked = answers.concerns ?? [];
    const tally = new Map<string, number>();
    STEPS[0].options.forEach((o) => {
      if (!picked.includes(o.value)) return;
      o.maps?.forEach((slug, idx) => {
        tally.set(slug, (tally.get(slug) ?? 0) + (idx === 0 ? 2 : 1));
      });
    });
    const ranked = [...tally.entries()].sort((a, b) => b[1] - a[1]).map(([s]) => s);
    const list = (ranked.length ? ranked : ["individual-therapy"])
      .map((slug) => services.find((s) => s.slug === slug)!)
      .filter(Boolean);
    return list.slice(0, 3);
  }, [answers]);

  function choose(value: string) {
    const key = current.key;
    setAnswers((prev) => {
      const existing = prev[key] ?? [];
      if (current.multi) {
        return {
          ...prev,
          [key]: existing.includes(value)
            ? existing.filter((v) => v !== value)
            : [...existing, value],
        };
      }
      return { ...prev, [key]: [value] };
    });
    if (!current.multi) {
      setTimeout(() => next(), 220);
    }
  }

  function next() {
    track("quiz_step", { step: current.key, index: step });
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else {
      track("quiz_result", { recommended: recommended[0]?.slug });
      setPhase("result");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    track("lead_submit", { source: "begin", recommended: recommended[0]?.slug });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "begin",
          intent: "consultation",
          concerns: answers.concerns,
          urgency: answers.urgency?.[0],
          format: answers.format?.[0],
          funding: answers.funding?.[0],
          recommended: recommended[0]?.slug,
        }),
      });
      if (!res.ok) throw new Error();
      track("lead_success", { source: "begin" });
      router.push("/begin/thank-you");
    } catch {
      setState("error");
    }
  }

  const selected = answers[current?.key] ?? [];

  return (
    <div className="relative min-h-[100svh] bg-paper pb-24 pt-[calc(var(--header-h)+3rem)]">
      {/* progress: seven lights fill */}
      <div className="fixed inset-x-0 top-[var(--header-h)] z-[60] flex h-[3px] bg-ink/[0.07]">
        {SPECTRUM.map((c, i) => {
          const seg = 1 / 7;
          const fill = Math.min(1, Math.max(0, (progress - i * seg) / seg));
          return (
            <span key={c} className="relative h-full flex-1 overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 transition-[width] duration-700 ease-out"
                style={{ width: `${fill * 100}%`, background: c }}
              />
            </span>
          );
        })}
      </div>

      <div className="shell">
        {phase === "quiz" ? (
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between">
              <p className="eyebrow">
                Step {step + 1} of {STEPS.length}
              </p>
              <button
                type="button"
                onClick={() => {
                  track("quiz_skip", { at: current.key });
                  setPhase("result");
                }}
                className="link-sweep font-sans text-[0.8125rem] text-bark/50"
              >
                Skip — just book a call
              </button>
            </div>

            <div key={current.key} className="r-up is-in mt-9">
              <h1 className="max-w-[18ch] font-display text-display-md font-light">
                {current.question}
              </h1>
              <p className="mt-4 max-w-[52ch] font-sans text-[0.9375rem] leading-relaxed text-bark/60">
                {current.help}
              </p>

              <div
                className={cn(
                  "mt-10 grid gap-2.5",
                  current.multi ? "sm:grid-cols-2" : "sm:grid-cols-1",
                )}
              >
                {current.options.map((o, idx) => {
                  const on = selected.includes(o.value);
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => choose(o.value)}
                      aria-pressed={on}
                      className={cn(
                        "group flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-500 ease-out",
                        on
                          ? "border-ink bg-ink text-paper"
                          : "border-ink/12 bg-transparent text-ink hover:border-ink/35 hover:bg-ink/[0.025]",
                      )}
                      style={{ transitionDelay: `${idx * 12}ms` }}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                          on ? "border-paper bg-paper" : "border-ink/25",
                        )}
                      >
                        {on && (
                          <svg viewBox="0 0 24 24" className="h-3 w-3 text-ink" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M4 12l5 5L20 6" />
                          </svg>
                        )}
                      </span>
                      <span className="font-sans text-[0.9375rem] leading-snug">{o.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 flex items-center gap-4">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="btn-ghost btn-md"
                  >
                    <span>Back</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={next}
                  disabled={selected.length === 0}
                  className="btn-primary btn-lg disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <span>{step === STEPS.length - 1 ? "See where to start" : "Continue"}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ---------------- RESULT + CAPTURE ---------------- */
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              {recommended.length > 0 && (answers.concerns?.length ?? 0) > 0 ? (
                <div className="r-up is-in">
                  <p className="eyebrow">Based on your answers</p>
                  <h1 className="mt-6 font-display text-display-md font-light">
                    Start here.
                  </h1>
                  <p className="mt-5 max-w-[46ch] font-sans text-[0.9375rem] leading-relaxed text-bark/65">
                    This is a starting point, not a diagnosis. Kerry will confirm
                    or redirect it on the call — that is exactly what the call is
                    for.
                  </p>

                  <div className="mt-9 space-y-3">
                    {recommended.map((s, i) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className={cn(
                          "group flex items-center gap-4 rounded-2xl border p-3 transition-colors",
                          i === 0
                            ? "border-ink/20 bg-bone"
                            : "border-ink/10 hover:border-ink/25",
                        )}
                      >
                        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image src={s.image} alt="" fill sizes="64px" className="object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          {i === 0 && (
                            <span className="block font-sans text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-clay">
                              Closest match
                            </span>
                          )}
                          <span className="mt-0.5 block font-display text-[1.05rem] leading-tight text-ink">
                            {s.title}
                          </span>
                          <span className="mt-1 block font-sans text-[0.78rem] text-bark/55">
                            {s.duration}
                          </span>
                        </span>
                        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-bark/40 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="r-up is-in">
                  <p className="eyebrow">Book a consultation</p>
                  <h1 className="mt-6 font-display text-display-md font-light">
                    Fifteen minutes, free, by phone.
                  </h1>
                  <p className="mt-5 max-w-[44ch] font-sans text-[0.9375rem] leading-relaxed text-bark/65">
                    Tell Kerry what is going on in whatever words you have. If this
                    is not the right practice for you, she will tell you and point
                    you somewhere better.
                  </p>
                </div>
              )}

              <div className="mt-10 rounded-2xl border border-ink/10 bg-bone/60 p-6">
                <p className="eyebrow">If you are in crisis</p>
                <p className="mt-3 font-sans text-[0.875rem] leading-relaxed text-bark/70">
                  This practice cannot respond to emergencies. Call{" "}
                  <strong className="text-ink">911</strong>, or call or text{" "}
                  <a href={site.crisis.href} className="link-sweep font-medium text-ink">
                    988
                  </a>{" "}
                  for the Suicide &amp; Crisis Lifeline, available 24/7.
                </p>
              </div>
            </div>

            {/* form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <form onSubmit={submit} className="r-up is-in rounded-3xl border border-ink/10 bg-bone/50 p-7 sm:p-9">
                <p className="font-display text-[1.5rem] font-light leading-tight text-ink">
                  Request your consultation
                </p>
                <p className="mt-2 font-sans text-[0.875rem] text-bark/60">
                  Replies within one business day.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" required>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="sl-input"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="sl-input"
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="Phone" hint="Optional but faster">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="sl-input"
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Best time to reach you" hint="Optional">
                    <input
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="sl-input"
                      placeholder="Weekday mornings"
                    />
                  </Field>
                </div>

                {/* honeypot */}
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                />

                <label className="mt-7 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-ink/25 accent-[#14100E]"
                  />
                  <span className="font-sans text-[0.8125rem] leading-relaxed text-bark/65">
                    I understand that email and web forms are not secure channels
                    and agree to be contacted about a consultation. I will not
                    include sensitive clinical detail here.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="btn-primary btn-lg mt-7 w-full"
                >
                  <span>{state === "sending" ? "Sending…" : "Request consultation"}</span>
                </button>

                {state === "error" && (
                  <p className="mt-4 font-sans text-[0.8125rem] text-light-1">
                    That did not go through. Please try again, or email{" "}
                    <a className="underline" href={`mailto:${site.contact.email}`}>
                      {site.contact.email}
                    </a>
                    .
                  </p>
                )}

                <p className="mt-5 text-center font-sans text-[0.75rem] text-bark/45">
                  Prefer to speak now?{" "}
                  <a href={site.contact.phoneHref} className="link-sweep font-medium text-ink">
                    {site.contact.phone}
                  </a>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="eyebrow text-bark/60">
          {label}
          {required && <span className="text-clay"> *</span>}
        </span>
        {hint && <span className="font-sans text-[0.6875rem] text-bark/40">{hint}</span>}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
