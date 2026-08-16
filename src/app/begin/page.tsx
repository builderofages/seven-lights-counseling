import type { Metadata } from "next";
import { Suspense } from "react";
import BeginClient from "./BeginClient";

export const metadata: Metadata = {
  title: "Book a Free Consultation — Seven Lights Counseling",
  description:
    "Answer six short questions to find your starting point, or skip straight to requesting a free fifteen-minute consultation with Kerry Garrity, LCSW-C.",
  alternates: { canonical: "/begin" },
  robots: { index: true, follow: true },
};

export default function BeginPage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-paper" />}>
      <BeginClient />
    </Suspense>
  );
}
