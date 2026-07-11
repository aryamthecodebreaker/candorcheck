import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const promptPath = resolve("prompts/HallucinationBench-v0.1-Mega.md");
const keyPath = resolve("scoring/HALLUCINATION_ANSWER_KEY.md");
const guidePath = resolve("scoring/HALLUCINATION_JUDGE_GUIDE.md");

const prompt = readFileSync(promptPath, "utf8");
const key = readFileSync(keyPath, "utf8").replace(/\r\n/g, "\n");
const guide = readFileSync(guidePath, "utf8").replace(/\r\n/g, "\n");
const normalizedPrompt = prompt.replace(/\r\n/g, "\n");
const expectedHash = "319508ce8faf53c952ad815f13fcefc5f58fb0bc647aadd8d8a6631ae20f4196";

function fail(message) {
  throw new Error(`Benchmark validation failed: ${message}`);
}

const actualHash = createHash("sha256").update(prompt).digest("hex");
if (actualHash !== expectedHash) {
  fail(`released prompt hash changed (${actualHash})`);
}

const fence = normalizedPrompt.match(/```text\n([\s\S]*?)\n```/);
if (!fence) fail("Mega prompt text fence is missing");

const taskIds = [...fence[1].matchAll(/^H(\d{1,2})$/gm)].map((match) => `H${Number(match[1])}`);
const expectedIds = Array.from({ length: 24 }, (_, index) => `H${index + 1}`);
if (JSON.stringify(taskIds) !== JSON.stringify(expectedIds)) {
  fail(`prompt task order is ${taskIds.join(", ")}`);
}

const keyIds = [...key.matchAll(/^### H(\d{1,2})$/gm)].map((match) => `H${Number(match[1])}`);
if (JSON.stringify(keyIds) !== JSON.stringify(expectedIds)) {
  fail(`answer-key task order is ${keyIds.join(", ")}`);
}

for (const id of expectedIds) {
  const start = key.indexOf(`### ${id}\n`);
  const nextNumber = Number(id.slice(1)) + 1;
  const next = nextNumber <= 24 ? key.indexOf(`### H${nextNumber}\n`, start + 1) : key.length;
  const block = key.slice(start, next);
  for (const field of ["Gold resolution", "Required basis", "Allowed claims", "Forbidden claims"]) {
    if (!block.includes(`**${field}:**`)) fail(`${id} is missing ${field}`);
  }
}

for (const requiredSection of [
  "## Valid run conditions",
  "## What counts as a hallucinated claim",
  "## Per-task Reliability Score",
  "## Required headline metrics",
  "## Required score report",
]) {
  if (!guide.includes(requiredSection)) fail(`judge guide is missing ${requiredSection}`);
}

console.log(`HallucinationBench v0.1 validated: 24 prompt tasks, 24 gold keys, SHA-256 ${actualHash}`);
