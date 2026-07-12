"use client";

import { useState } from "react";

interface CandorReport {
  schema: string;
  formId: string;
  modelLabel: string;
  runCondition: string;
  reviewType: string;
  metrics: {
    severityAdjustedHallucinationRate: number;
    correctSupportedCoverage: number;
    honestUtility: number;
    criticalClaims: number;
  };
}

function parseReport(text: string): CandorReport | null {
  try {
    const value = JSON.parse(text) as CandorReport;
    return value.schema === "candorcheck-report-v1" && value.metrics ? value : null;
  } catch {
    return null;
  }
}

function ReportSlot({ label, report, onReport }: { label: string; report: CandorReport | null; onReport: (report: CandorReport | null) => void }) {
  const [error, setError] = useState("");

  async function load(file: File | undefined) {
    if (!file) return;
    const parsed = parseReport(await file.text());
    if (!parsed) {
      setError("That file is not a CandorCheck report.");
      onReport(null);
      return;
    }
    setError("");
    onReport(parsed);
  }

  return (
    <section className="compare-slot">
      <span className="step-number">{label}</span>
      {!report ? (
        <label className="report-drop">
          <strong>Choose a report JSON</strong>
          <span>Exported from the guided scorer</span>
          <input type="file" accept="application/json,.json" onChange={(event) => load(event.target.files?.[0])} />
        </label>
      ) : (
        <div className="loaded-report">
          <div>
            <strong>{report.modelLabel}</strong>
            <span>{report.formId}</span>
          </div>
          <button className="text-button" type="button" onClick={() => onReport(null)}>Replace</button>
        </div>
      )}
      {error && <p className="status-warn" role="alert">{error}</p>}
    </section>
  );
}

export function ReportCompare() {
  const [left, setLeft] = useState<CandorReport | null>(null);
  const [right, setRight] = useState<CandorReport | null>(null);
  const comparable = Boolean(left && right && left.formId === right.formId);

  return (
    <div className="compare-workspace">
      <div className="compare-inputs">
        <ReportSlot label="REPORT A" report={left} onReport={setLeft} />
        <ReportSlot label="REPORT B" report={right} onReport={setRight} />
      </div>

      {left && right && (
        <section className="comparison-result" aria-live="polite">
          <div className={comparable ? "comparison-notice status-good" : "comparison-notice status-warn"}>
            <strong>{comparable ? "Same form — direct comparison is reasonable." : "Different forms — read side by side, not as a ranking."}</strong>
            <span>Both reports remain on this device.</span>
          </div>
          <div className="comparison-table" role="table" aria-label="Local report comparison">
            <div className="comparison-row comparison-head" role="row">
              <span role="columnheader">Metric</span>
              <strong role="columnheader">{left.modelLabel}</strong>
              <strong role="columnheader">{right.modelLabel}</strong>
            </div>
            {[
              ["Honest Utility ↑", left.metrics.honestUtility, right.metrics.honestUtility, "%"],
              ["Correct supported coverage ↑", left.metrics.correctSupportedCoverage, right.metrics.correctSupportedCoverage, "%"],
              ["Severity-adjusted hallucination ↓", left.metrics.severityAdjustedHallucinationRate, right.metrics.severityAdjustedHallucinationRate, "%"],
              ["Critical claims ↓", left.metrics.criticalClaims, right.metrics.criticalClaims, ""],
            ].map(([name, a, b, suffix]) => (
              <div className="comparison-row" role="row" key={String(name)}>
                <span role="rowheader">{name}</span>
                <strong role="cell">{a}{suffix}</strong>
                <strong role="cell">{b}{suffix}</strong>
              </div>
            ))}
          </div>
          <p className="privacy-note">
            Compare behavior under documented conditions. CandorCheck does not certify that one model is universally better.
          </p>
        </section>
      )}
    </div>
  );
}
