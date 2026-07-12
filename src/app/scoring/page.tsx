import type { Metadata } from "next";
import Link from "next/link";
import { GuidedWorkbench, type QuickKey } from "@/components/guided-workbench";
import { readQuickKey } from "@/lib/benchmark-files";

export const metadata: Metadata = {
  title: "Score a response",
  description: "Review a CandorCheck response one task at a time and export a local, transparent score report.",
};

export default function ScoringPage() {
  const benchmarkKey = readQuickKey() as QuickKey;

  return (
    <>
      <section className="shell lab-page-head scoring-hero">
        <p className="lab-kicker">Step 2 / Paste · Step 3 / Review</p>
        <h1>Score the first response, one decision at a time.</h1>
        <p className="lede">
          Paste the first response, review each task against its frozen key, and
          export a portable report. The answer never leaves your browser.
        </p>
        <div className="button-row">
          <Link className="button button-light" href="/methodology#scoring">How scoring works</Link>
          <Link className="text-link" href="/benchmark">Need the prompt?</Link>
        </div>
      </section>
      <section className="shell section-tight">
        <GuidedWorkbench benchmarkKey={benchmarkKey} />
      </section>
    </>
  );
}
