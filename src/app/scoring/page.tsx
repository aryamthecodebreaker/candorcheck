import type { Metadata } from "next";
import Link from "next/link";
import { ScoreWorkbench } from "@/components/score-workbench";

export const metadata: Metadata = {
  title: "Score a response",
  description:
    "Parse, manually judge, calculate, and export a HallucinationBench v0.1 result entirely in your browser.",
};

export default function ScoringPage() {
  return (
    <>
      <section className="shell page-hero scoring-hero">
        <p className="eyebrow">HallucinationBench v0.1 / Scorer</p>
        <h1 className="page-title">Turn 24 answers into an evidence trail.</h1>
        <p className="lede">
          Parse the model’s untouched output, apply the human judge key, and
          export a complete scorecard. No response data leaves your browser.
        </p>
        <div className="button-row">
          <Link className="button button-light" href="/methodology#claims">
            Read claim-counting rules
          </Link>
        </div>
      </section>
      <section className="shell section-tight">
        <ScoreWorkbench />
      </section>
    </>
  );
}
