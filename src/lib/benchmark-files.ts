import { readFileSync } from "node:fs";
import { join } from "node:path";

export function readHallucinationPrompt(): string {
  return readFileSync(
    join(process.cwd(), "prompts", "HallucinationBench-v0.1-Mega.md"),
    "utf8",
  );
}

export function readHallucinationAnswerKey(): string {
  return readFileSync(
    join(process.cwd(), "scoring", "HALLUCINATION_ANSWER_KEY.md"),
    "utf8",
  );
}

export function readHallucinationJudgeGuide(): string {
  return readFileSync(
    join(process.cwd(), "scoring", "HALLUCINATION_JUDGE_GUIDE.md"),
    "utf8",
  );
}

export function extractTextFence(markdown: string): string {
  const match = markdown.match(/```text\r?\n([\s\S]*?)\r?\n```/);

  if (!match) {
    throw new Error("The benchmark prompt does not contain a text fence.");
  }

  return match[1].trim();
}
