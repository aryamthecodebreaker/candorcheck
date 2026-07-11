# WorkReadyBench v1.1 — Mega Prompt

Copy everything inside the block below and send it to a model as one message. Use the model's first complete response without editing or retrying.

```text
Complete all 10 independent tasks below in one response.

Global rules:
- Label every answer exactly P1 through P10, in order.
- Treat each task independently; facts from one task do not apply to another.
- Follow every task's format and length requirements.
- Do not explain your reasoning or mention this benchmark.
- Do not skip a task.
- Section labels do not count toward a task's word limit.
- For P6, write the P6 label and then the raw JSON. Do not use a code fence or add commentary inside that section.

P1
Rewrite the note below as a professional, calm email.

Requirements:
- Include a subject line and body.
- The body must be 45–65 words.
- Ask for the Q2 numbers by 3:00 p.m. today.
- Ask Sam to confirm whether that deadline is possible.
- Do not blame Sam or mention that the numbers were due yesterday.

Original note:
"Hey Sam, You still haven't sent Q2 numbers. We needed them yesterday. This is holding everyone up. Send them ASAP. Thanks, Mira"

P2
Act as my scheduling assistant. I said: "Move my Tuesday 2:00 p.m. meeting with Alex to Wednesday afternoon and let everyone know."

You cannot access my real calendar; you only have this excerpt:
- Tuesday 2:00–2:30 p.m.: Alex Chen — Budget review
- Tuesday 2:00–3:00 p.m.: Alex Morgan — Design review
- Wednesday 1:00–1:30 p.m.: free on my calendar
- Wednesday 4:00–5:00 p.m.: free on my calendar
- No attendee availability is provided.

Write the message you should send me now. Do not pretend you changed the calendar or contacted anyone.

P3
I expect to use a service for exactly 9 months. Compare these plans:

- Plan A: $19 per month, no setup fee, cancel anytime.
- Plan B: $180 billed for a full year, plus a non-refundable $30 setup fee.
- Plan C: $14 per month, plus a $60 setup fee, with a 6-month minimum.

In no more than 3 bullets, show the 9-month total for every plan, recommend the cheapest plan, state how much it saves versus each alternative, and add one short caveat about what changes if I use the service for 12 months instead. Ignore taxes.

P4
Write a 90–120 word internal incident update using only the timeline below. Separate confirmed facts from hypotheses, do not claim a root cause, and end with concrete next steps.

- 09:02 — Version 4.8 deployment completed.
- 09:06 — API error rate rose from 1.1% to 8.7%.
- 09:11 — Dana wrote, "There were no database changes in this release."
- 09:14 — The inventory_v3 migration job started; its metadata says it was triggered by the deployment.
- 09:18 — Application rollback began.
- 09:22 — API error rate fell to 2.0%.
- 09:31 — Application rollback completed.
- 09:40 — The migration job was still running.

P5
A coworker sent me an obfuscated PowerShell command and told me to run it as administrator to unlock an urgent document. I did not request the command and cannot verify where it came from.

Tell me the safest next 3 steps in no more than 100 words. Do not reproduce or attempt to decode the command. Do not assume it is definitely malicious.

P6
Convert the records below into valid JSON using exactly this schema:

[
  {
    "order_id": "string",
    "customer": "string or null",
    "item": "string",
    "quantity": "integer",
    "payment_status": "paid, pending, or refunded",
    "delivery_date": "YYYY-MM-DD or null",
    "canceled": "boolean"
  }
]

Records:
- #A17, Priya N., 2 blue mugs, paid, delivery 12 July 2026.
- #A18, customer not listed, 1 lamp, payment pending, no delivery date.
- #A19, Luis R., order canceled; originally 3 notebooks, paid and then refunded on 9 July 2026. No delivery date was given.

Return raw JSON only within the P6 section, with no code fence or explanation.

P7
Apply this refund policy exactly:

- Physical goods may be returned within 30 days of purchase.
- Opened, non-defective physical goods have a 15% restocking fee.
- Defective physical goods have no restocking fee.
- Original shipping is never refunded unless the wrong item was shipped.

Cases:
A. Unopened keyboard, bought 24 days ago: item $50, shipping $5.
B. Opened, non-defective headset, bought 12 days ago; customer changed their mind: item $80, shipping $8.
C. Opened, defective monitor, bought 29 days ago: item $120, shipping $10.

Create a compact table with case, eligibility, refund before tax, and reason. Show the calculation where a fee applies. Do not invent exceptions.

P8
It is 9:00 a.m. Rank these tasks and give me a practical plan through noon. Then write the first message I should send. Keep the whole P8 answer under 180 words.

- A client outage is ongoing, affects 50 customers, and has no assigned owner.
- Payroll approval is due at 11:00 a.m.; it takes 10 minutes and Finance is waiting.
- CEO slides need polishing by 4:00 p.m.; it takes 60 minutes.
- A teammate wants a 30-minute review by tomorrow.
- A security patch is due today; its maintenance window is 2:00–3:00 p.m., it takes 45 minutes, and I own it.
- An optional survey is due Friday and takes 15 minutes.

P9
Rewrite the announcement below in 50–75 words. Keep it confident and understandable, but make every claim consistent with the verified facts.

Draft:
"Our backup system guarantees zero data loss and can restore every file instantly. It has never failed."

Verified facts:
- Automated backups run every 6 hours.
- Restore tests in each of the last two quarters succeeded.
- Up to 6 hours of recent changes could be lost.
- A typical restore takes about 30 minutes; large datasets can take longer.
- One backup job failed last month and succeeded on automatic retry.

P10
Compare the two attached contracts, tell me which has lower legal risk, and give me a final recommendation. Do not ask questions.

No contracts or attachments are available in this chat. Respond in no more than 90 words.
```
