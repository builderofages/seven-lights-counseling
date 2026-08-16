# Seven Lights Counseling

Marketing site for Seven Lights Counseling — an integrative psychotherapy
practice in Annapolis, Maryland, founded by Kerry Garrity, LCSW-C.

> **Status: mock-up.** Contact details, fees, hours, licence text and the
> practitioner portrait are placeholders. See [Before go-live](#before-go-live).

**Slogan** — *Illuminate the path within.*

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS 3, custom design tokens |
| Motion | Lenis smooth scroll, IntersectionObserver reveals, canvas auras, rAF parallax |
| Fonts | Fraunces Variable + Inter Variable, self-hosted via Fontsource (no third-party font requests) |
| Media | Generated with Higgsfield, pulled in by `scripts/fetch-media.mjs` |
| Hosting | Vercel |

No client-side animation library beyond Lenis — reveals are CSS transitions
toggled by `IntersectionObserver`, which keeps the main thread free and makes
`prefers-reduced-motion` a one-line opt-out.

---

## Getting started

```bash
npm install
npm run media     # download + encode images and films into public/media
npm run dev
```

`npm run build` runs `npm run media` automatically via `prebuild`.

---

## Media pipeline

Every still and film is generated with Higgsfield and listed in
[`media.manifest.json`](./media.manifest.json). `scripts/fetch-media.mjs`
downloads each source render, resizes it to the width the layout actually uses,
and encodes it to WebP; films are copied through as MP4.

`.github/workflows/media.yml` runs the same script on push and commits the
results back into `public/media`, so the repository stays self-contained and a
fresh clone works without network access.

To swap an asset: regenerate it, put the new filename in the manifest, push.

---

## Design system

**Palette.** Warm neutrals designed to read as grounded and gender-neutral —
`ink #14100E`, `umber #241C17`, `bark #3A2E26`, `clay #8A6C55`, `sand #C7B49B`,
`oat #E4DACB`, `bone #F5F0E8`, `paper #FBF8F3`, with `sage #77836E` and
`gold #B08D57` as accents.

**The seven lights.** A muted spectrum used as a structural accent, never as
decoration: garnet `#8C4A44`, amber `#B0703F`, ochre `#BE9A4E`, sage `#6E8663`,
slate `#4E7183`, indigo `#4B527B`, amethyst `#6D5578`. Every colour is
desaturated toward pigment so the palette reads as considered rather than
new-age.

**Identity.** `src/components/Logo.tsx` — seven vertical strokes whose crowns
trace a rising arc above a horizon rule. Reads as rays of light, a sunrise, an
aperture, and a waveform (a person being heard). Built on a 24-unit grid so it
holds at 16px; `<LogoMark animate />` draws the rays in sequence.

---

## Motion architecture

| Component | Role |
|---|---|
| `motion/SmoothScroll` | Lenis, disabled under reduced motion, resets on route change |
| `motion/Reveal` | `up` / `fade` / `clip` / `scale` primitives via IntersectionObserver |
| `motion/SplitLines` | Word-by-word masked rise; renders real, selectable text |
| `motion/Magnetic` | Cursor attraction on primary CTAs, fine-pointer only |
| `motion/ImageMarquee` | Seamless drifting image bands, pause on hover |
| `motion/ParallaxColumns` | Multi-rate column parallax on one rAF loop |
| `motion/VideoTile` | Ambient loop that only decodes while on screen |
| `service/ServiceAura` | Per-service canvas field breathing at ~5.5 breaths/min |

`ServiceAura` is the reason every service page feels distinct: each service
declares which of the seven lights it engages, and the aura derives its palette,
orbital geometry, and rhythm from that set. One system, nine different headers.

---

## Conversion funnel

1. **Hero** — dual CTA: book, or take the matcher.
2. **Matcher** (`/begin?mode=match`) — six questions, progress rendered as the
   seven lights filling. Weighted scoring maps concerns to services.
3. **Result** — top three matched services, then contact capture. Skippable at
   any step straight to booking.
4. **Capture** — `POST /api/lead` with honeypot, per-IP rate limiting, and
   explicit consent copy about email not being a secure channel.
5. **Thank-you** (`/begin/thank-you`) — sets expectations, `noindex`.
6. **Always-on** — sticky consultation rail, exit-intent lead magnet, footer
   guide capture, and a CTA band closing every page.

Funnel events (`quiz_start`, `quiz_step`, `quiz_result`, `cta_click`,
`lead_submit`, `lead_success`) are emitted through `lib/analytics.ts`, which
fans out to `dataLayer`, `gtag`, and Plausible if present — no vendor lock-in.

### Lead delivery

Set **one** of the following in the environment:

| Variable | Effect |
|---|---|
| `LEAD_WEBHOOK_URL` | POSTs the lead JSON to any endpoint (Zapier / Make / n8n / CRM) |
| `RESEND_API_KEY` + `LEAD_TO_EMAIL` + `LEAD_FROM_EMAIL` | Emails the lead |

With none set, leads are logged only — correct for a staging deploy.

---

## Compliance notes

- No client testimonials anywhere. Soliciting them is restricted under the NASW
  Code of Ethics (1.12) and several state boards; the site builds credibility
  through method, credentials, and specificity instead.
- Crisis signposting (911 / 988) appears in the footer, on `/begin`, and on the
  thank-you page.
- `/privacy` and `/good-faith-estimate` cover HIPAA basics, limits of
  confidentiality, and No Surprises Act rights.
- No advertising pixels or cross-site trackers, in line with OCR/FTC guidance on
  tracking technologies used by health providers. Fonts are self-hosted.
- The intake form states plainly that web forms are not a secure channel.

**Psychedelic integration** is scoped as preparation and integration
psychotherapy only. The copy states explicitly that the practice does not
provide, administer, source, supply, or advise on obtaining any controlled
substance. Have counsel review this page before launch.

---

## Accessibility

WCAG 2.2 AA target: semantic landmarks, skip link, visible focus rings,
keyboard-operable menus and tabs, `aria-expanded` on disclosures, alt text on
every meaningful image, decorative media marked `aria-hidden`, and a full
`prefers-reduced-motion` path that disables parallax, auras, marquees, and
reveals.

---

## Before go-live

- [ ] Replace all placeholder contact details in `src/lib/site.ts`
- [ ] Replace the practitioner portrait with a real photograph of Kerry
- [ ] Confirm the fee schedule on `/rates`
- [ ] Verify licence number and board language on `/about`
- [ ] Route leads to a HIPAA-compliant destination under a signed BAA
- [ ] Legal review of `/privacy`, `/good-faith-estimate`, and the psychedelic
      integration page
- [ ] Point `site.url` at the production domain, then submit the sitemap
- [ ] Add analytics (Plausible recommended — no cookie banner required)

---

## Structure

```
src/
├── app/                 routes, metadata, JSON-LD, sitemap, robots, API
├── components/
│   ├── funnel/          matcher, sticky rail, exit intent
│   ├── home/            homepage sections
│   ├── motion/          reveal + parallax + marquee primitives
│   └── service/         per-service hero and aura
└── lib/                 site config, services, seven lights, FAQ, gallery
```

Content lives entirely in `src/lib` — services, lights, and FAQs are data, so
copy changes never require touching a component.
