type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Payload }) => void;
  }
}

/**
 * Vendor-agnostic funnel event bus.
 * Pushes to dataLayer (GTM), gtag, and Plausible if present, and always
 * mirrors to a local queue so events survive before any tag loads.
 */
export function track(event: string, props: Payload = {}) {
  if (typeof window === "undefined") return;

  const payload = { event, ...props, ts: Date.now() };

  (window.dataLayer ||= []).push(payload);
  window.gtag?.("event", event, props);
  window.plausible?.(event, { props });

  if (process.env.NODE_ENV === "development") {
    console.debug("[funnel]", event, props);
  }
}

export const FUNNEL_STEPS = [
  "quiz_start",
  "quiz_step",
  "quiz_result",
  "lead_submit",
  "lead_success",
] as const;
