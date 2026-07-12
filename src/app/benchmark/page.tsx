import type { Metadata } from "next";
import Link from "next/link";
import { PromptPanel } from "@/components/prompt-panel";
import { extractTextFence, readHallucinationPrompt, readQuickPrompt } from "@/lib/benchmark-files";

export const metadata: Metadata = {
  title: "Start a test",
  description: "Copy a CandorCheck prompt, test an AI in a fresh chat, and keep its first response for local guided scoring.",
};

export default function BenchmarkPage() {
  const quickPrompt = readQuickPrompt();
  const classicPrompt = extractTextFence(readHallucinationPrompt());

  return (
    <>
      <section className="shell lab-page-head">
        <p className="lab-kicker">Step 1 / Test</p>
        <h1>Give any AI a question worth being careful about.</h1>
        <p className="lede">
          Copy the exact packet, use it in a fresh conversation, and keep the
          model&apos;s first complete response. You&apos;ll score it on this device.
        </p>
        <div className="page-trust-line"><span>12 tasks</span><span>About 15 minutes</span><span>No account or API key</span></div>
      </section>

      <section className="shell section-tight">
        <div className="test-choice">
          <article className="test-choice-copy">
            <span className="choice-badge">Recommended · 12 tasks</span>
            <h2>Quick pressure test</h2>
            <p>
              A naturalistic v0.2 form covering missing evidence, false premises,
              fabricated citations and APIs, mixed tasks, tempting extrapolation,
              and hidden ambiguity.
            </p>
            <ul className="side-list compact-list">
              <li>Fresh chat</li>
              <li>First response only</li>
              <li>Tools optional, but record what was enabled</li>
              <li>Do not reveal the answer key before the response</li>
            </ul>
          </article>
          <div>
            <PromptPanel prompt={quickPrompt} version="v0.2-quick" taskCount={12} />
            <div className="button-row next-step-row">
              <Link className="button button-acid" href="/scoring">I have a response — score it</Link>
              <span>Form ID: cc-v0.2-0sqn4bp</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell section-heading">
          <div>
            <p className="eyebrow">How to run it</p>
            <h2>Three rules keep your result useful.</h2>
          </div>
          <div className="run-rules">
            <p><strong>01</strong> Use a fresh conversation and record whether tools or browsing were enabled.</p>
            <p><strong>02</strong> Keep the first complete response—no retries, hints, edits, or follow-up repairs.</p>
            <p><strong>03</strong> Treat the result as a behavioral diagnostic on this form, not a universal model score.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell legacy-test">
          <div>
            <p className="eyebrow">Historical form</p>
            <h2>Classic 24-task coached test</h2>
            <p>
              The original HallucinationBench v0.1 form remains available for
              reproducibility. Its explicit uncertainty instructions make it easier
              and its results are not comparable with the v0.2 quick test.
            </p>
          </div>
          <details>
            <summary className="button button-light">Show the legacy prompt</summary>
            <div className="legacy-prompt-wrap">
              <PromptPanel prompt={classicPrompt} version="legacy-v0.1" taskCount={24} label="Legacy HallucinationBench" />
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
