import type { Metadata } from "next";
import { ReportCompare } from "@/components/report-compare";

export const metadata: Metadata = {
  title: "Compare reports locally",
  description: "Load two CandorCheck report files and compare their behavior locally without submitting either result.",
};

export default function ComparePage() {
  return (
    <>
      <section className="shell page-hero">
        <p className="eyebrow">CandorCheck / Local comparison</p>
        <h1 className="page-title">Compare reports—not reputations.</h1>
        <p className="lede">
          Load two exported reports on this device. Same-form reports can be read
          directly; different forms remain useful diagnostics but are not rankings.
        </p>
      </section>
      <section className="shell section-tight">
        <ReportCompare />
      </section>
      <section className="section section-acid">
        <div className="shell section-heading">
          <div>
            <p className="eyebrow">Comparison rules</p>
            <h2>The conditions travel with the score.</h2>
          </div>
          <p>
            Form ID, run conditions, model label, and review type remain visible.
            CandorCheck never turns community files into an official leaderboard.
          </p>
        </div>
      </section>
    </>
  );
}
