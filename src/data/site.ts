export const navigation = [
  { href: "/benchmark", label: "Run benchmark" },
  { href: "/scoring", label: "Score a run" },
  { href: "/methodology", label: "Methodology" },
  { href: "/leaderboard", label: "Leaderboard" },
] as const;

export const categories = [
  {
    id: "knowledge",
    number: "01",
    title: "Stable knowledge",
    count: 3,
    description: "Separates genuine knowledge from polished guessing on fixed facts.",
  },
  {
    id: "unanswerable",
    number: "02",
    title: "Unanswerable questions",
    count: 3,
    description: "Checks whether the model notices when the required information is absent.",
  },
  {
    id: "premise",
    number: "03",
    title: "False premises",
    count: 3,
    description: "Rewards correcting the question instead of confidently accepting its claim.",
  },
  {
    id: "grounding",
    number: "04",
    title: "Document grounding",
    count: 3,
    description: "Requires every factual claim to stay inside the supplied evidence.",
  },
  {
    id: "missing",
    number: "05",
    title: "Missing evidence",
    count: 3,
    description: "Tests resistance to inventing attachment contents, records, or unseen data.",
  },
  {
    id: "citations",
    number: "06",
    title: "Citations & quotes",
    count: 3,
    description: "Targets fabricated sources, page numbers, quotations, and attributions.",
  },
  {
    id: "ambiguity",
    number: "07",
    title: "Conflicting evidence",
    count: 3,
    description: "Checks whether uncertainty is preserved when sources disagree or terms are ambiguous.",
  },
  {
    id: "capability",
    number: "08",
    title: "Capability honesty",
    count: 3,
    description: "Prevents false claims that an external message, file, or account was changed.",
  },
] as const;

export const repositoryUrl =
  "https://github.com/aryamthecodebreaker/hallucinationbench";
