import type { Metadata } from "next";
import Link from "next/link";
import { PromptPanel } from "@/components/prompt-panel";
import { extractTextFence, readHallucinationPrompt } from "@/lib/benchmark-files";

export const metadata: Metadata = {
  title: "Run the benchmark",
  description:
    "Copy the exact HallucinationBench v0.1 Mega prompt and run all 24 factual-reliability tests in one message.",
};

export default function BenchmarkPage() {
  const markdown = readHallucinationPrompt();
  const prompt = extractTextFence(markdown);

  return (
    <>
      <section className="shell page-hero">
        <p className="eyebrow">HallucinationBench v0.1 / Run</p>
        <h1 className="page-title">Copy once. Test all 24 behaviors.</h1>
        <p className="lede">
          This is the canonical Mega prompt. Follow the run conditions exactly,
          keep the first response untouched, and score it under a blind ID.
        </p>
      </section>

      <section className="shell section-tight">
        <div className="instruction-grid" aria-label="Run checklist">
          <article className="instruction-card">
            <strong>1. Start clean</strong>
            <p>Open a fresh chat with no earlier conversation or custom instructions.</p>
          </article>
          <article className="instruction-card">
            <strong>2. Disable assistance</strong>
            <p>Turn off browsing, tools, files, connectors, and persistent memory.</p>
          </article>
          <article className="instruction-card">
            <strong>3. Preserve output</strong>
            <p>Keep only the first complete response. Do not retry, repair, or continue it.</p>
          </article>
        </div>

        <div className="page-layout">
          <div>
            <PromptPanel prompt={prompt} version="v0.1" />
            <div className="callout run-warning">
              <strong>Before sending:</strong> make sure the model has enough output
              capacity for 24 short sections. A truncated result is provisional and
              must report its actual coverage.
            </div>
          </div>
          <aside className="side-card" aria-label="Standard run requirements">
            <h2>Standard run</h2>
            <ul className="side-list">
              <li>Exact prompt, unchanged</li>
              <li>Fresh conversation</li>
              <li>Tools and memory off</li>
              <li>First response only</li>
              <li>All H1–H24 sections</li>
              <li>Blind ID before judging</li>
            </ul>
            <div className="button-row">
              <Link className="button button-dark button-small" href="/scoring">
                Score the output
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="shell score-preview protocol-preview">
          <div>
            <p className="eyebrow">Record with every run</p>
            <h2>Metadata makes comparisons credible.</h2>
          </div>
          <div className="prose">
            <ul>
              <li>Blind submission ID, such as <code>HB-001</code></li>
              <li>Provider and exact model/version string</li>
              <li>Run date, interface or API, and changed settings</li>
              <li>Whether tools, browsing, files, connectors, and memory were disabled</li>
              <li>Whether the output is the first response with no retries or edits</li>
            </ul>
            <p>
              If any standard condition is unknown or violated, the response can
              still be scored, but it must be labeled <strong>non-standard</strong>.
            </p>
            <Link className="button button-light" href="/methodology#protocol">
              Full evaluation protocol
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
