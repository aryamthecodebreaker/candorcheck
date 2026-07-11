"use client";

interface DocumentDownloadsProps {
  answerKey: string;
  judgeGuide: string;
}

export function DocumentDownloads({ answerKey, judgeGuide }: DocumentDownloadsProps) {
  function download(content: string, name: string) {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="button-row">
      <button
        className="button button-dark"
        type="button"
        onClick={() => download(judgeGuide, "HallucinationBench-v0.1-Judge-Guide.md")}
      >
        Download judge guide
      </button>
      <button
        className="button button-light"
        type="button"
        onClick={() => download(answerKey, "HallucinationBench-v0.1-Answer-Key.md")}
      >
        Download answer key
      </button>
    </div>
  );
}
