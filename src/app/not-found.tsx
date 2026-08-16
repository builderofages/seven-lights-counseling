import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-contrast pb-24 pt-[calc(var(--header-h)+4rem)] text-onc">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/doorway.webp"
        aria-hidden="true"
      >
        <source src="/media/prism.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/85 to-scrim/60" />
      <div className="grain pointer-events-none absolute inset-0 grain-light" />

      <div className="shell relative text-center">
        <LogoMark className="mx-auto h-9 w-auto text-accent" animate />
        <p className="eyebrow mt-9 text-accent">404</p>
        <h1 className="mt-6 max-w-[19ch] font-display text-display-lg font-light">
          This page is not here.
        </h1>
        <p className="mx-auto mt-6 max-w-[46ch] text-lede text-onc/60">
          Which is a small inconvenience, and easily solved. Everything the
          practice offers is one link away.
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary btn-lg !bg-onc !text-scrim">
            <span>Back to the beginning</span>
          </Link>
          <Link href="/services" className="btn-light btn-lg">
            <span>See all services</span>
          </Link>
          <a href={site.contact.phoneHref} className="btn-light btn-lg">
            <span>{site.contact.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
