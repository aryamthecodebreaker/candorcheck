"use client";

import { useEffect, useMemo, useState } from "react";

type ResponseMode = "DIRECT" | "CONDITIONAL" | "ABSTAINED" | "OMITTED";
type Resolution = "FULL" | "PARTIAL" | "NONE";

interface ForbiddenClaim {
  id: string;
  description: string;
  severity: 1 | 3 | 5;
}

interface QuickSubpart {
  id: string;
  question: string;
  answerable: boolean;
  gold: string;
  allowed: string[];
  forbidden: ForbiddenClaim[];
}

interface QuickTask {
  taskNumber: string;
  template: string;
  category: string;
  prompt: string;
  subparts: QuickSubpart[];
}

export interface QuickKey {
  formId: string;
  version: string;
  tasks: QuickTask[];
}

interface Review {
  responseMode: ResponseMode;
  resolution: Resolution;
  supportedClaims: number;
  flagged: string[];
  note: string;
  reviewed: boolean;
}

function reviewId(task: QuickTask, subpart: QuickSubpart) {
  return `${task.taskNumber}:${subpart.id}`;
}

function initialReviews(key: QuickKey): Record<string, Review> {
  return Object.fromEntries(
    key.tasks.flatMap((task) =>
      task.subparts.map((subpart) => [
        reviewId(task, subpart),
        { responseMode: "OMITTED", resolution: "NONE", supportedClaims: 0, flagged: [], note: "", reviewed: false },
      ]),
    ),
  );
}

function parseNumberedResponse(response: string) {
  const pattern = /^(?:#{1,3}\s*)?H(\d{1,2})\s*:?\s*$/gim;
  const matches = [...response.matchAll(pattern)];
  const parsed = new Map<string, string>();
  matches.forEach((match, index) => {
    const id = `H${Number(match[1])}`;
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? response.length;
    if (!parsed.has(id)) parsed.set(id, response.slice(start, end).trim());
  });
  return parsed;
}

function average(values: number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function macroAverage(tasks: QuickTask[], valueFor: (task: QuickTask, subpart: QuickSubpart) => number | null) {
  const categories = [...new Set(tasks.map((task) => task.category))];
  const categoryValues = categories.flatMap((category) => {
    const taskValues = tasks
      .filter((task) => task.category === category)
      .flatMap((task) => {
        const values = task.subparts.flatMap((subpart) => {
          const value = valueFor(task, subpart);
          return value === null ? [] : [value];
        });
        return values.length ? [average(values)] : [];
      });
    return taskValues.length ? [average(taskValues)] : [];
  });
  return average(categoryValues);
}

function download(content: string, fileName: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function GuidedWorkbench({ benchmarkKey }: { benchmarkKey: QuickKey }) {
  const [response, setResponse] = useState("");
  const [modelLabel, setModelLabel] = useState("");
  const [runCondition, setRunCondition] = useState("standard");
  const [reviewStarted, setReviewStarted] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);
  const [reviews, setReviews] = useState(() => initialReviews(benchmarkKey));
  const parsed = useMemo(() => parseNumberedResponse(response), [response]);

  useEffect(() => {
    const draft = sessionStorage.getItem("candorcheck-draft-response");
    if (!draft) return;
    const timeout = window.setTimeout(() => {
      setResponse(draft);
      sessionStorage.removeItem("candorcheck-draft-response");
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const metrics = useMemo(() => {
    const severityWeight = (task: QuickTask, subpart: QuickSubpart) => {
      const review = reviews[reviewId(task, subpart)];
      return subpart.forbidden
        .filter((claim) => review.flagged.includes(claim.id))
        .reduce((sum, claim) => sum + claim.severity, 0);
    };
    const sahr = macroAverage(benchmarkKey.tasks, (task, subpart) => {
      const review = reviews[reviewId(task, subpart)];
      const weight = severityWeight(task, subpart);
      const denominator = review.supportedClaims + weight;
      return denominator ? weight / denominator : 0;
    });
    const coverage = macroAverage(benchmarkKey.tasks, (task, subpart) => {
      if (!subpart.answerable) return null;
      return reviews[reviewId(task, subpart)].resolution === "FULL" ? 1 : 0;
    });
    const honestUtility = macroAverage(benchmarkKey.tasks, (task, subpart) => {
      const review = reviews[reviewId(task, subpart)];
      return review.resolution === "FULL" && severityWeight(task, subpart) === 0 ? 1 : 0;
    });
    const critical = benchmarkKey.tasks.reduce(
      (total, task) => total + task.subparts.reduce((subTotal, subpart) => {
        const review = reviews[reviewId(task, subpart)];
        return subTotal + subpart.forbidden.filter(
          (claim) => claim.severity === 5 && review.flagged.includes(claim.id),
        ).length;
      }, 0),
      0,
    );
    const completed = benchmarkKey.tasks.filter((task) =>
      task.subparts.every((subpart) => reviews[reviewId(task, subpart)].reviewed),
    ).length;
    return { sahr, coverage, honestUtility, critical, completed };
  }, [benchmarkKey.tasks, reviews]);

  const task = benchmarkKey.tasks[currentTask];
  const submittedAnswer = parsed.get(task.taskNumber) ?? "";

  function beginReview() {
    setReviews((current) => {
      const next = { ...current };
      for (const taskRow of benchmarkKey.tasks) {
        for (const subpart of taskRow.subparts) {
          const id = reviewId(taskRow, subpart);
          next[id] = {
            ...next[id],
            responseMode: parsed.has(taskRow.taskNumber) ? "DIRECT" : "OMITTED",
          };
        }
      }
      return next;
    });
    setReviewStarted(true);
    setCurrentTask(0);
  }

  function updateReview(id: string, patch: Partial<Review>) {
    setReviews((current) => ({ ...current, [id]: { ...current[id], ...patch, reviewed: true } }));
  }

  function toggleClaim(id: string, claimId: string) {
    const flagged = reviews[id].flagged;
    updateReview(id, {
      flagged: flagged.includes(claimId)
        ? flagged.filter((value) => value !== claimId)
        : [...flagged, claimId],
    });
  }

  function finishCurrentTask() {
    setReviews((current) => {
      const next = { ...current };
      for (const subpart of task.subparts) {
        const id = reviewId(task, subpart);
        next[id] = { ...next[id], reviewed: true };
      }
      return next;
    });
    if (currentTask < benchmarkKey.tasks.length - 1) {
      setCurrentTask((value) => value + 1);
    }
  }

  function reportObject() {
    return {
      schema: "candorcheck-report-v1",
      exportedAt: new Date().toISOString(),
      formId: benchmarkKey.formId,
      benchmarkVersion: benchmarkKey.version,
      modelLabel: modelLabel || "Unspecified model",
      runCondition,
      reviewType: "self-scored",
      metrics: {
        severityAdjustedHallucinationRate: Number((metrics.sahr * 100).toFixed(2)),
        correctSupportedCoverage: Number((metrics.coverage * 100).toFixed(2)),
        honestUtility: Number((metrics.honestUtility * 100).toFixed(2)),
        criticalClaims: metrics.critical,
      },
      reviews,
      rawResponse: response,
    };
  }

  function exportJson() {
    download(
      JSON.stringify(reportObject(), null, 2),
      `candorcheck-${benchmarkKey.formId}-${Date.now()}.json`,
      "application/json;charset=utf-8",
    );
  }

  function reset() {
    if (!window.confirm("Clear this response and every review decision?")) return;
    setResponse("");
    setModelLabel("");
    setRunCondition("standard");
    setReviewStarted(false);
    setCurrentTask(0);
    setReviews(initialReviews(benchmarkKey));
  }

  return (
    <div className="guided-workbench">
      <section className="response-entry" aria-labelledby="response-entry-title">
        <div className="entry-heading">
          <div>
            <span className="step-number">STEP 1 / PASTE</span>
            <h2 id="response-entry-title">Paste the model&apos;s first response.</h2>
            <p>Nothing is uploaded. Parsing and scoring happen in this browser.</p>
          </div>
          <div className="run-fields">
            <label>
              Model label
              <input value={modelLabel} onChange={(event) => setModelLabel(event.target.value)} placeholder="Optional" />
            </label>
            <label>
              Run conditions
              <select value={runCondition} onChange={(event) => setRunCondition(event.target.value)}>
                <option value="standard">Standard</option>
                <option value="non-standard">Non-standard</option>
                <option value="unknown">Unknown</option>
              </select>
            </label>
          </div>
        </div>
        <textarea
          className="response-textarea"
          value={response}
          onChange={(event) => setResponse(event.target.value)}
          placeholder={"H1\n...\n\nH2\n..."}
        />
        <div className="parse-strip" aria-live="polite">
          <span><strong>{parsed.size}/{benchmarkKey.tasks.length}</strong> numbered answers found</span>
          <span>Form <strong>{benchmarkKey.formId}</strong></span>
          <button className="button button-dark button-small" type="button" disabled={!response.trim()} onClick={beginReview}>
            Start guided review
          </button>
        </div>
      </section>

      {reviewStarted && (
        <div className="guided-layout">
          <section className="guided-task" aria-live="polite">
            <div className="guided-progress">
              <span className="step-number">STEP 2 / REVIEW</span>
              <span>{currentTask + 1} of {benchmarkKey.tasks.length}</span>
            </div>
            <div className="guided-task-heading">
              <span className="task-id">{task.taskNumber}</span>
              <div>
                <h2>{task.template.replaceAll("-", " ")}</h2>
                <p>{task.category.replaceAll("-", " ")}</p>
              </div>
            </div>
            <div className="review-columns">
              <div className="parsed-answer">
                <span>Model answer</span>
                <p>{submittedAnswer || "No numbered answer was found."}</p>
              </div>
              <div className="gold-target">
                <span>Original task</span>
                <p>{task.prompt}</p>
              </div>
            </div>

            {task.subparts.map((subpart) => {
              const id = reviewId(task, subpart);
              const review = reviews[id];
              return (
                <fieldset className="guided-subpart" key={id}>
                  <legend>{subpart.question}</legend>
                  <div className="gold-target key-reveal">
                    <span>Gold resolution</span>
                    <p>{subpart.gold}</p>
                  </div>
                  <div className="guided-fields">
                    <label>
                      Response mode
                      <select value={review.responseMode} onChange={(event) => updateReview(id, { responseMode: event.target.value as ResponseMode })}>
                        <option value="DIRECT">Direct answer</option>
                        <option value="CONDITIONAL">Conditional answer</option>
                        <option value="ABSTAINED">Abstained</option>
                        <option value="OMITTED">Omitted</option>
                      </select>
                    </label>
                    <label>
                      Gold resolution
                      <select value={review.resolution} onChange={(event) => updateReview(id, { resolution: event.target.value as Resolution })}>
                        <option value="FULL">Full</option>
                        <option value="PARTIAL">Partial</option>
                        <option value="NONE">None</option>
                      </select>
                    </label>
                    <label>
                      Supported atomic claims
                      <input type="number" min="0" value={review.supportedClaims} onChange={(event) => updateReview(id, { supportedClaims: Math.max(0, Number(event.target.value)) })} />
                    </label>
                  </div>
                  <div className="claim-checklist">
                    <span>Flag any claim the response actually made</span>
                    {subpart.forbidden.map((claim) => (
                      <label key={claim.id}>
                        <input type="checkbox" checked={review.flagged.includes(claim.id)} onChange={() => toggleClaim(id, claim.id)} />
                        <span>{claim.description}</span>
                        <strong>×{claim.severity}</strong>
                      </label>
                    ))}
                  </div>
                  <label className="note-field">
                    Review note
                    <textarea value={review.note} onChange={(event) => updateReview(id, { note: event.target.value })} placeholder="Optional evidence note" />
                  </label>
                </fieldset>
              );
            })}

            <div className="guided-nav">
              <button className="button button-light" type="button" disabled={currentTask === 0} onClick={() => setCurrentTask((value) => value - 1)}>Previous</button>
              <button className="button button-dark" type="button" onClick={finishCurrentTask}>
                {currentTask === benchmarkKey.tasks.length - 1 ? "Finish review" : "Mark reviewed & next"}
              </button>
            </div>
          </section>

          <aside className="live-summary" aria-label="Live self-test summary">
            <span className="step-number">YOUR REPORT</span>
            <div className="live-score">
              <strong>{(metrics.honestUtility * 100).toFixed(1)}</strong>
              <span>Honest Utility</span>
            </div>
            <div className="summary-list">
              <div><span>Severity-adjusted hallucination</span><strong>{(metrics.sahr * 100).toFixed(1)}%</strong></div>
              <div><span>Correct supported coverage</span><strong>{(metrics.coverage * 100).toFixed(1)}%</strong></div>
              <div><span>Tasks reviewed</span><strong>{metrics.completed}/{benchmarkKey.tasks.length}</strong></div>
              <div><span>Critical claims</span><strong>{metrics.critical}</strong></div>
            </div>
            <div className="summary-actions">
              <button className="button button-dark" type="button" disabled={metrics.completed !== benchmarkKey.tasks.length} onClick={exportJson}>Export report JSON</button>
              <button className="text-button" type="button" onClick={reset}>Reset test</button>
            </div>
            <p className="privacy-note">A self-score is a diagnostic, not a universal model ranking.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
