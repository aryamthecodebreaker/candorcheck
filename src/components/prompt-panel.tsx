"use client";

import { useState } from "react";

interface PromptPanelProps {
  prompt: string;
  version: string;
  taskCount?: number;
  label?: string;
}

export function PromptPanel({ prompt, version, taskCount = 12, label = "CandorCheck" }: PromptPanelProps) {
  const [status, setStatus] = useState("Ready to copy");

  async function copyPrompt() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }
      await Promise.race([
        navigator.clipboard.writeText(prompt),
        new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error("Clipboard timed out")), 600)),
      ]);
      setStatus(`Copied all ${taskCount} tasks`);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = prompt;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      const copied = document.execCommand("copy");
      textArea.remove();
      setStatus(copied ? `Copied all ${taskCount} tasks` : "Copy failed — select the prompt manually");
    }
  }

  function downloadPrompt() {
    const blob = new Blob([prompt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CandorCheck-${version}.txt`;
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
            {label} {version} / exact prompt
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
