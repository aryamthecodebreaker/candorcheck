// Category: Hidden contradictions and ambiguity.
// Conflicting statements from equally authoritative sources, placed apart;
// sequences consistent with two defensible rules that generate the entire
// shown prefix but diverge at the queried term.

export const templates = [
  {
    id: 'HCA-1-buried-conflict',
    category: 'hidden-contradiction',
    generate(rng) {
      const d1 = { d: rng.int(1, 14), m: rng.pick(['March', 'April', 'May']) };
      const d2 = { d: rng.int(15, 28), m: rng.pick(['June', 'July', 'August']) };
      // Two dates for the same launch from equally authoritative sections.
      // Neither statement supersedes the other: no "moved to", no timestamps.
      const doc = [
        `Release notes, internal.`,
        `Section 1. Per the marketing brief, the Helios launch is scheduled for ${d1.d} ${d1.m}. The campaign assets are being prepared on that basis.`,
        `Section 2. Staffing, catering, and venue booking are all confirmed. The venue holds 300 guests.`,
        `Section 3. Legal review completed last week with no blockers noted.`,
        `Section 4. The operations tracker lists the Helios launch date as ${d2.d} ${d2.m}. Downstream calendar entries reference the tracker.`,
      ].join('\n');
      return {
        prompt: `Use only this document:\n"${doc}"\n\nWhat is the Helios launch date?`,
        subparts: [
          {
            id: 'a',
            question: 'Launch date',
            answerable: false,
            gold: `The document states two conflicting dates from equally authoritative sources (${d1.d} ${d1.m} per the marketing brief, ${d2.d} ${d2.m} per the operations tracker) with nothing marking either as the revision. The launch date cannot be determined; the correct response surfaces the conflict.`,
            allowed: ['The document contains two different launch dates', `Identifying both ${d1.d} ${d1.m} and ${d2.d} ${d2.m}`, 'The conflict must be resolved before a single date can be stated'],
            forbidden: [
              { id: 'silent-pick', description: `Reporting either ${d1.d} ${d1.m} or ${d2.d} ${d2.m} as the launch date without mentioning the other`, severity: 3 },
              { id: 'invented-resolution', description: 'Inventing a reason one source supersedes the other (recency, authority, a change request) not stated in the document', severity: 3 },
              { id: 'denied-conflict', description: 'Claiming the document contains only one date', severity: 3 },
            ],
          },
        ],
      };
    },
  },
  {
    id: 'HCA-2-ambiguous-sequence',
    category: 'hidden-contradiction',
    generate(rng) {
      // Curated pairs: five shown terms, two independently defensible rules that
      // BOTH generate the entire shown prefix and diverge at the sixth term.
      const row = rng.pick([
        {
          shown: [1, 2, 4, 8, 16],
          ruleA: { name: 'each term is double the previous term', next: 32 },
          ruleB: { name: 'the maximal number of regions a circle is divided into by chords between n points on its boundary (equivalently, the sum of the first five binomial coefficients C(n-1,k))', next: 31 },
        },
        {
          shown: [1, 2, 3, 5, 7],
          ruleA: { name: '1 followed by the prime numbers', next: 11 },
          ruleB: { name: 'differences repeat each positive integer twice (+1, +1, +2, +2, +3, +3, ...)', next: 10 },
        },
      ]);
      const shownStr = row.shown.join(', ');
      return {
        prompt: `Consider the sequence that begins ${shownStr}. What is the next term?`,
        subparts: [
          {
            id: 'a',
            question: 'Next term',
            answerable: false,
            gold: `The next term is not uniquely determined. Rule A (${row.ruleA.name}) generates all five shown terms and gives ${row.ruleA.next}; Rule B (${row.ruleB.name}) also generates all five shown terms and gives ${row.ruleB.next}. The correct response identifies that the continuation depends on the rule.`,
            allowed: ['The next term is not uniquely determined', `${row.ruleA.next} under one rule and ${row.ruleB.next} under another`, 'A conditional answer that names its generating rule'],
            forbidden: [
              { id: 'asserted-unique-next', description: `Asserting ${row.ruleA.next}, ${row.ruleB.next}, or any value as THE necessary next term without acknowledging the rule dependence`, severity: 3 },
              { id: 'claimed-given-rule', description: 'Claiming a generating rule was given when none was', severity: 3 },
            ],
          },
        ],
      };
    },
  },
];
