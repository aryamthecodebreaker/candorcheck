import Link from "next/link";
import { categories } from "@/data/site";

const steps = [
  {
    number: "01",
    title: "Copy one fixed prompt",
    description:
      "Use the exact 24-part prompt in a fresh chat with tools, browsing, files, and memory disabled.",
  },
  {
    number: "02",
    title: "Keep the first response",
    description:
      "No retries, edits, hints, or follow-up questions. Preserve the complete H1–H24 output and run metadata.",
  },
  {
    number: "03",
    title: "Score every claim",
    description:
      "Use the evidence-based answer key and browser-local worksheet to measure errors, coverage, and abstention.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Open factual-reliability benchmark</p>
          <h1>
            One prompt.
            <br />
            <span className="hero-accent">24 traps.</span>
            <br />
            No hand-waving.
          </h1>
          <p className="lede">
            HallucinationBench measures when an AI model invents facts, accepts
            false premises, misuses evidence, or pretends to know what it
            cannot know—without rewarding a model that simply refuses everything.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/benchmark">
              Run the benchmark <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button-light" href="/scoring">
              Score a response
            </Link>
          </div>
          <div className="hero-proof" aria-label="Benchmark summary">
            <div className="proof-stat">
              <span className="proof-value">24</span>
              <span className="proof-label">independent tests</span>
            </div>
            <div className="proof-stat">
              <span className="proof-value">08</span>
              <span className="proof-label">failure modes</span>
            </div>
            <div className="proof-stat">
              <span className="proof-value">01</span>
              <span className="proof-label">message to send</span>
            </div>
            <div className="proof-stat">
              <span className="proof-value">00</span>
              <span className="proof-label">tools required</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The complete run</p>
              <h2>From blank chat to defensible score.</h2>
            </div>
            <p>
              The protocol is intentionally boring: one frozen input, one
              untouched output, and an explicit key. Reproducibility beats vibes.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span className="step-number">STEP / {step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The real target</p>
              <h2>Honest and useful—not merely cautious.</h2>
            </div>
            <p className="muted">
              Hallucination and over-refusal are scored separately so either
              failure remains visible.
            </p>
          </div>
          <div className="honesty-grid">
            <article className="honesty-card">
              <span className="honesty-icon" aria-hidden="true">×</span>
              <h3>Confident invention</h3>
              <p>
                A polished answer asserts facts, sources, or actions that the
                prompt does not support.
              </p>
            </article>
            <article className="honesty-card">
              <span className="honesty-icon" aria-hidden="true">—</span>
              <h3>Blanket refusal</h3>
              <p>
                The model avoids falsehoods by declining answerable questions.
                Low hallucination, low usefulness.
              </p>
            </article>
            <article className="honesty-card ideal">
              <span className="honesty-icon" aria-hidden="true">✓</span>
              <h3>Calibrated answer</h3>
              <p>
                It answers what the evidence permits, corrects bad premises,
                and states the exact boundary of uncertainty.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Eight test families</p>
              <h2>Different ways to sound right while being wrong.</h2>
            </div>
            <p>
              Each family includes multiple cases so one lucky answer cannot
              define a model’s result.
            </p>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.id}>
                <span className="category-number">HB / {category.number}</span>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className="category-count">
                  {category.count} tests
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-acid">
        <div className="shell score-preview">
          <div className="score-orbit" aria-label="Illustrative score of 82">
            <span className="score-orbit-value">82</span>
          </div>
          <div>
            <p className="eyebrow">A score with receipts</p>
            <h2>One headline. Four guardrails.</h2>
            <p className="lede">
              Every result keeps fabrication, coverage, abstention, and severe
              failures visible. The headline score never gets to hide the evidence.
            </p>
            <div className="score-list" aria-label="Illustrative component scores">
              <div className="score-line">
                <span>Hallucination severity</span>
                <span>07.4% ↓</span>
              </div>
              <div className="score-line">
                <span>Correct coverage</span>
                <span>87.5% ↑</span>
              </div>
              <div className="score-line">
                <span>Abstention F1</span>
                <span>91.7% ↑</span>
              </div>
              <div className="score-line">
                <span>Fabricated citations</span>
                <span>0</span>
              </div>
            </div>
            <Link className="button button-dark" href="/methodology">
              Read the methodology
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="eyebrow">Ready to test a model?</p>
          <h2>One paste is all it takes to start.</h2>
          <p className="lede">
            Use a fresh chat, preserve the first complete response, and let the
            scoring evidence—not the model name—decide the result.
          </p>
          <div className="button-row">
            <Link className="button button-dark" href="/benchmark">
              Copy the 24-part prompt
            </Link>
            <Link className="button button-light" href="/methodology#protocol">
              Check the run protocol
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
