"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import MatchFlow from "@/components/funnel/MatchFlow";
import { track } from "@/lib/analytics";

export default function BeginClient() {
  const params = useSearchParams();
  const mode = params.get("mode") === "match" ? "match" : "book";

  useEffect(() => {
    track("quiz_start", { mode });
  }, [mode]);

  return <MatchFlow startMode={mode} />;
}
