import { readFileSync } from "node:fs";
import { join } from "node:path";

export function readHallucinationPrompt(): string {
  return readFileSync(
    join(process.cwd(), "prompts", "HallucinationBench-v0.1-Mega.md"),
    "utf8",
  );
}

export function readQuickPrompt(): string {
  const markdown = readFileSync(
    join(process.cwd(), "v0.2", "forms", "quick-01.md"),
    "utf8",
  );
  return markdown.replace(/^# .*?\r?\n+/, "").trim();
}

export function readQuickKey(): unknown {
  return JSON.parse(
    readFileSync(
      join(process.cwd(), "v0.2", "forms", "quick-01-key.json"),
      "utf8",
    ),
  );
}

export function extractTextFence(markdown: string): string {
  const match = markdown.match(/```text\r?\n([\s\S]*?)\r?\n```/);

  if (!match) {
    throw new Error("The benchmark prompt does not contain a text fence.");
  }

  return match[1].trim();
}
