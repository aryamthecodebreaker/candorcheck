import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Code,
  LockKey,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { HomeWorkspace } from "@/components/home-workspace";
import { categories } from "@/data/site";
import { readQuickPrompt } from "@/lib/benchmark-files";

const steps = [
  { number: "1", title: "Test", description: "Run the exact 12-task prompt packet." },
  { number: "2", title: "Paste", description: "Bring back the model’s first response." },
  { number: "3", title: "Review", description: "Score locally and export a report." },
] as const;

export default function HomePage() {
  const prompt = readQuickPrompt();

  return (
    <>
      <section className="lab-hero">
        <div className="shell lab-hero-grid">
          <div className="lab-hero-copy">
            <p className="lab-kicker">Open-source AI honesty pressure test</p>
            <h1>
              Test how an AI behaves when
              <span className="editorial-underline"> guessing is tempting.</span>
            </h1>
            <p className="lab-lede">
              CandorCheck gives an AI twelve difficult, evidence-backed tasks,
              then helps you inspect whether it stayed useful without making
              things up.
            </p>
            <div className="trust-row" aria-label="CandorCheck trust principles">
              <span><LockKey size={20} weight="regular" /> local scoring</span>
              <span><ShieldCheck size={20} weight="regular" /> no uploads</span>
              <span><Code size={20} weight="regular" /> open source</span>
            </div>
          </div>

          <aside className="lab-start-card" aria-label="Start the CandorCheck test">
            <Link className="lab-primary-action" href="#test-workspace">
              Start the 12-task test
              <ArrowRight size={24} weight="bold" aria-hidden="true" />
            </Link>
            <div className="lab-start-facts">
              <span><Clock size={22} /> About 15 minutes</span>
              <span><ShieldCheck size={22} /> Nothing leaves your browser.</span>
              <span><strong className="fact-count">12</strong> pressure tasks</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="journey-rail" aria-label="CandorCheck workflow">
        <div className="shell journey-grid">
          {steps.map((step, index) => (
            <div className="journey-step" key={step.number}>
              <span className="journey-number">{step.number}</span>
              <div><strong>{step.title}</strong><p>{step.description}</p></div>
              {index < steps.length - 1 && <ArrowRight className="journey-arrow" size={22} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <div className="lab-status" aria-label="Current test status">
        <div className="shell lab-status-grid">
          <span><small>TEST</small> CandorCheck v0.2</span>
          <span><small>TASKS</small> 12</span>
          <span className="status-progress"><small>PROGRESS</small><b>0 / 12</b><i aria-hidden="true" /></span>
          <span><small>STATUS</small> Not started</span>
        </div>
      </div>

      <section className="shell lab-workspace-section" id="test-workspace">
        <HomeWorkspace prompt={prompt} />
      </section>

      <section className="lab-method-strip">
        <div className="shell method-intro">
          <div>
            <p className="lab-kicker">What the test pressures</p>
            <h2>Wrong answers that feel unusually plausible.</h2>
          </div>
          <p>
            Every task has a frozen key. Real-world traps also carry dated
            evidence, so the standard is inspectable instead of mysterious.
          </p>
        </div>
        <div className="shell pressure-list">
          {categories.map((category) => (
            <article key={category.id}>
              <span>CC / {category.number}</span>
              <div><h3>{category.title}</h3><p>{category.description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="lab-closing">
        <div className="shell lab-closing-grid">
          <div>
            <p className="lab-kicker">Open methods. Private inputs.</p>
            <h2>Your answer stays yours.</h2>
          </div>
          <div>
            <p>
              Prompts, keys, evidence, generator, and scorer are public. The
              response you paste is processed in this browser and is never sent
              to CandorCheck.
            </p>
            <div className="button-row">
              <Link className="button button-acid" href="/scoring">Open guided scoring</Link>
              <Link className="button button-ghost" href="/methodology">Read the method</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
