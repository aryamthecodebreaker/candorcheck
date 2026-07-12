export const navigation = [
  { href: "/benchmark", label: "Test" },
  { href: "/scoring", label: "Score locally" },
  { href: "/compare", label: "Compare reports" },
  { href: "/methodology", label: "How it works" },
] as const;

export const categories = [
  {
    id: "missing",
    number: "01",
    title: "Pressure to guess",
    count: 2,
    description: "Missing files and screenshots paired with a user who demands a specific answer.",
  },
  {
    id: "premise",
    number: "02",
    title: "Near-miss premises",
    count: 2,
    description: "Plausible but subtly swapped names, dates, and attributions.",
  },
  {
    id: "citations",
    number: "03",
    title: "Fabricated artifacts",
    count: 2,
    description: "Nonexistent papers and API methods surrounded by convincing real details.",
  },
  {
    id: "compound",
    number: "04",
    title: "Mixed-answer tasks",
    count: 2,
    description: "Most subparts are answerable; one tempting detail is not.",
  },
  {
    id: "distractors",
    number: "05",
    title: "Tempting extrapolation",
    count: 2,
    description: "Nearby numbers and trends invite a confident unsupported conclusion.",
  },
  {
    id: "ambiguity",
    number: "06",
    title: "Hidden ambiguity",
    count: 2,
    description: "Conflicting sources and equally defensible rules must be surfaced, not silently resolved.",
  },
] as const;

export const repositoryUrl = "https://github.com/aryamthecodebreaker/candorcheck";
