import Link from "next/link";
import { categories } from "@/data/site";

const steps = [
  { number: "01", title: "Copy a pressure test", description: "Choose the 12-task quick form and paste it into any AI you want to examine." },
  { number: "02", title: "Keep the first response", description: "No retries or repairs. Record whether browsing, tools, memory, or custom settings were enabled." },
  { number: "03", title: "Score it on this device", description: "Review one task at a time, export the evidence, and compare reports locally if you choose." },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Open-source AI honesty pressure test</p>
          <h1>
            See when AI
            <br />
            <span className="hero-accent">starts guessing.</span>
          </h1>
          <p className="lede">
            CandorCheck gives you difficult, evidence-backed prompts, a guided
            local scorer, and portable reports—without uploading responses or
            pretending one test can rank every model.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/benchmark">Start a test <span aria-hidden="true">→</span></Link>
            <Link className="button button-light" href="/methodology">See how it works</Link>
          </div>
          <div className="hero-proof" aria-label="CandorCheck summary">
            <div className="proof-stat"><span className="proof-value">12</span><span className="proof-label">pressure tasks</span></div>
            <div className="proof-stat"><span className="proof-value">06</span><span className="proof-label">failure modes</span></div>
            <div className="proof-stat"><span className="proof-value">00</span><span className="proof-label">accounts needed</span></div>
            <div className="proof-stat"><span className="proof-value">00</span><span className="proof-label">responses uploaded</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">The whole journey</p><h2>Prompt to report in one sitting.</h2></div>
            <p>The product stays simple because the evidence—not a central authority—is the point.</p>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span className="step-number">STEP / {step.number}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">The target behavior</p><h2>Honest and useful under pressure.</h2></div>
            <p className="muted">The best response answers what it can, refuses only what it must, and never fills a gap with confidence.</p>
          </div>
          <div className="honesty-grid">
            <article className="honesty-card"><span className="honesty-icon" aria-hidden="true">×</span><h3>Confident invention</h3><p>Specific amounts, sources, actions, or explanations appear without evidence.</p></article>
            <article className="honesty-card"><span className="honesty-icon" aria-hidden="true">—</span><h3>Blanket refusal</h3><p>The model stays safe by abandoning details the prompt actually supports.</p></article>
            <article className="honesty-card ideal"><span className="honesty-icon" aria-hidden="true">✓</span><h3>Calibrated answer</h3><p>Supported parts are answered; unsupported parts are identified precisely.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">Six pressure families</p><h2>Wrong answers that feel unusually tempting.</h2></div>
            <p>Every public task has a deterministic seed, structured gold key, and dated evidence where real-world facts are involved.</p>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.id}>
                <span className="category-number">CC / {category.number}</span>
                <h3>{category.title}</h3><p>{category.description}</p>
                <span className="category-count">{category.count} tasks</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-acid">
        <div className="shell score-preview">
          <div className="score-orbit" aria-label="Local-only processing"><span className="score-orbit-value">LOCAL</span></div>
          <div>
            <p className="eyebrow">Your response stays yours</p>
            <h2>Open methods. Private inputs.</h2>
            <p className="lede">Prompts, keys, evidence, generator, and scorer are public. The response you paste is processed in your browser and is never submitted to us.</p>
            <div className="button-row">
              <Link className="button button-dark" href="/scoring">Open guided scoring</Link>
              <Link className="button button-light" href="/compare">Compare report files</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="eyebrow">Ready?</p>
          <h2>Give your AI a question worth being careful about.</h2>
          <p className="lede">Run the quick test now. Read the result as a transparent behavioral profile—not a universal ranking.</p>
          <div className="button-row"><Link className="button button-dark" href="/benchmark">Start the 12-task test</Link><Link className="button button-light" href="/methodology#limitations">Read the limits</Link></div>
        </div>
      </section>
    </>
  );
}
