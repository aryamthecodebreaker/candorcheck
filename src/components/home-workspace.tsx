"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CopySimple,
  FileText,
  LockKey,
} from "@phosphor-icons/react";

export function HomeWorkspace({ prompt }: { prompt: string }) {
  const router = useRouter();
  const [response, setResponse] = useState("");
  const [copyState, setCopyState] = useState<"ready" | "copied" | "selected">("ready");

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyState("copied");
    } catch {
      const selection = window.getSelection();
      const packet = document.querySelector("[data-home-prompt]");
      if (!selection || !packet) return;
      const range = document.createRange();
      range.selectNodeContents(packet);
      selection.removeAllRanges();
      selection.addRange(range);
      setCopyState("selected");
    }
  }

  function continueToScoring() {
    sessionStorage.setItem("candorcheck-draft-response", response);
    router.push("/scoring");
  }

  return (
    <div className="home-workspace">
      <article className="prompt-packet">
        <div className="packet-label"><span>Prompt packet</span><span>12 tasks</span></div>
        <div className="packet-title">
          <FileText size={26} weight="regular" aria-hidden="true" />
          <div><h2>Quick pressure test</h2><p>Copy everything below and give it to any AI.</p></div>
        </div>
        <pre data-home-prompt tabIndex={0}>{prompt}</pre>
        <button className="packet-copy" type="button" onClick={copyPrompt}>
          {copyState === "copied" ? <Check size={20} weight="bold" /> : <CopySimple size={20} />}
          {copyState === "copied" ? "Copied prompt packet" : copyState === "selected" ? "Selected — press Ctrl+C" : "Copy prompt packet"}
        </button>
      </article>

      <article className="response-desk">
        <div>
          <p className="desk-label">Step 2 / Paste</p>
          <h2>Paste the model’s first response</h2>
          <p>Use the first complete answer. Don’t retry, edit, or coach the model.</p>
        </div>
        <textarea
          value={response}
          onChange={(event) => setResponse(event.target.value)}
          placeholder={"H1\n...\n\nH2\n..."}
          aria-label="Paste the model's first response"
        />
        <div className="response-actions">
          <button className="button button-ghost" type="button" onClick={() => setResponse("")} disabled={!response}>Clear</button>
          <button className="button button-acid" type="button" onClick={continueToScoring} disabled={!response.trim()}>
            Continue to guided scoring <ArrowRight size={19} weight="bold" />
          </button>
        </div>
        <p className="local-note"><LockKey size={17} /> Your response stays on this device.</p>
      </article>
    </div>
  );
}
