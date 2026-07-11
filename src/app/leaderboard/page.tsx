import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "Audited HallucinationBench results, inclusion rules, ranking order, and transparent evidence requirements.",
};

export default function LeaderboardPage() {
  return (
    <>
      <section className="shell page-hero">
        <p className="eyebrow">HallucinationBench v0.1 / Leaderboard</p>
        <h1 className="page-title">No result without its evidence.</h1>
        <p className="lede">
          Official entries require the untouched response, complete run metadata,
          a claim ledger, and blind judging. Model reputation earns zero points.
        </p>
      </section>

      <section className="shell section-tight">
        <div className="leaderboard-shell">
          <div className="table-scroll" role="region" aria-label="HallucinationBench leaderboard" tabIndex={0}>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Model</th>
                  <th>Reliability</th>
                  <th>Hallucination rate</th>
                  <th>Weighted burden</th>
                  <th>Coverage</th>
                  <th>Critical</th>
                  <th>Run date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={8}>
                    <div className="empty-leaderboard">
                      <span className="empty-mark" aria-hidden="true">∅</span>
                      <strong>No audited v0.1 submissions yet.</strong>
                      <p>
                        The table starts empty on purpose. Run a model, judge it
                        against the locked key, and retain the evidence before adding a row.
                      </p>
                      <Link className="button button-dark button-small" href="/benchmark">
                        Run the first benchmark
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell score-preview leaderboard-rules">
          <div>
            <p className="eyebrow">Inclusion gate</p>
            <h2>Auditable or unofficial.</h2>
          </div>
          <div className="prose">
            <ol>
              <li>Use the frozen v0.1 prompt in a standard run.</li>
              <li>Store the entire first response and exact model metadata.</li>
              <li>Blind the model identity before judging.</li>
              <li>Attach all per-task scores and the atomic claim ledger.</li>
              <li>Resolve judge disagreements before freezing the score.</li>
              <li>Publish enough evidence for another judge to reproduce the result.</li>
            </ol>
            <p>
              Non-standard and incomplete results may be shared as experiments,
              but cannot enter the official ranking.
            </p>
            <Link className="button button-light" href="/scoring">
              Open the scoring worksheet
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ranking order</p>
              <h2>Reliability leads. Severe fabrication breaks ties.</h2>
            </div>
            <p className="muted">
              Never rank on claim hallucination rate alone; a model can lower it
              by refusing answerable tasks.
            </p>
          </div>
          <div className="ranking-grid">
            {[
              ["01", "Higher Reliability Score"],
              ["02", "Fewer critical claims"],
              ["03", "Lower weighted burden"],
              ["04", "Higher correct coverage"],
              ["05", "Lower calibration error"],
              ["06", "Otherwise: tied result"],
            ].map(([number, label]) => (
              <div className="ranking-rule" key={number}>
                <span>{number}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
