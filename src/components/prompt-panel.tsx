"use client";

import { useState } from "react";

interface PromptPanelProps {
  prompt: string;
  version: string;
}

export function PromptPanel({ prompt, version }: PromptPanelProps) {
  const [status, setStatus] = useState("Ready to copy");

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("Copied all 24 tasks");
    } catch {
      setStatus("Copy failed — select the prompt manually");
    }
  }

  function downloadPrompt() {
    const blob = new Blob([prompt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `HallucinationBench-${version}-Mega.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("Prompt downloaded");
  }

  return (
    <div className="prompt-panel">
      <div className="prompt-toolbar">
        <div>
          <div className="prompt-toolbar-label">
            <span className="status-dot" aria-hidden="true" />
            HallucinationBench {version} / exact prompt
          </div>
          <span className="sr-status" aria-live="polite">
            {status}
          </span>
        </div>
        <div className="prompt-actions">
          <button className="button button-small" type="button" onClick={downloadPrompt}>
            Download .txt
          </button>
          <button className="button button-small button-acid" type="button" onClick={copyPrompt}>
            {status.startsWith("Copied") ? "Copied ✓" : "Copy all"}
          </button>
        </div>
      </div>
      <pre className="prompt-content" tabIndex={0}>
        {prompt}
      </pre>
    </div>
  );
}
