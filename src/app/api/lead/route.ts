import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = {
  name?: string;
  email?: string;
  phone?: string;
  concerns?: string[];
  urgency?: string;
  format?: string;
  funding?: string;
  message?: string;
  recommended?: string;
  source?: string;
  intent?: string;
  consent?: boolean;
  /** honeypot */
  company?: string;
};

const rate = new Map<string, { n: number; t: number }>();

function limited(ip: string) {
  const now = Date.now();
  const e = rate.get(ip);
  if (!e || now - e.t > 60_000) {
    rate.set(ip, { n: 1, t: now });
    return false;
  }
  e.n += 1;
  return e.n > 8;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Lead;
  try {
    body = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // honeypot — silently accept so bots do not learn
  if (body.company) return NextResponse.json({ ok: true });

  if (!body.email || !isEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const record = {
    receivedAt: new Date().toISOString(),
    source: body.source ?? "unknown",
    intent: body.intent ?? "consultation",
    name: body.name?.slice(0, 120),
    email: body.email.slice(0, 200),
    phone: body.phone?.slice(0, 40),
    concerns: body.concerns?.slice(0, 12),
    urgency: body.urgency,
    format: body.format,
    funding: body.funding,
    recommended: body.recommended,
    message: body.message?.slice(0, 4000),
    consent: !!body.consent,
    ip,
  };

  // ---------------------------------------------------------------
  // Delivery. Configure ONE of these in the environment and the lead
  // is routed automatically. With none set the lead is logged only —
  // which is correct for a staging/mock deployment.
  //
  //   LEAD_WEBHOOK_URL   any endpoint (Zapier / Make / n8n / CRM)
  //   RESEND_API_KEY + LEAD_TO_EMAIL + LEAD_FROM_EMAIL
  //
  // NOTE: intake data is PHI-adjacent. Before go-live, route to a
  // HIPAA-compliant destination under a signed BAA (e.g. Hushmail,
  // Paubox, SimplePractice, Spruce). Do not send PHI through a
  // generic marketing tool.
  // ---------------------------------------------------------------
  try {
    if (process.env.LEAD_WEBHOOK_URL) {
      await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } else if (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? "Seven Lights <noreply@sevenlightscounseling.com>",
          to: [process.env.LEAD_TO_EMAIL],
          subject: `New enquiry — ${record.name ?? record.email}`,
          text: Object.entries(record)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v ?? "—"}`)
            .join("\n"),
        }),
      });
    } else {
      console.info("[lead] no delivery channel configured:", record);
    }
  } catch (err) {
    console.error("[lead] delivery failed", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
