# Complete 11-Step Prompts & Skill Workflow (Mercury CRM · AI Lab 03)

All prompts below follow the MasterClass Executive x Graphite **Synthetic Research & CX Discovery** curriculum, customized for **Mercury CRM**.

---

## STEP 2: Reusable Skill Setup (`ux-persona-builder`)

- **Skill Name:** `ux-persona-builder`
- **Description:**
  Build evidence-linked UX and B2B research personas from first-party product context, customer interviews, exit survey verbatims, support logs, MIT/RAND implementation studies, and external community signals (Reddit, G2). Clusters observations by goals and behaviors rather than demographics alone, produces 3–4 persona cards with a confidence label (`Grounded` vs `Inferred`), and outputs an evidence appendix mapping every claim back to its source.

- **Skill Workflow Instructions:**
```markdown
## Workflow
1. **Detect input type(s)** present in the conversation or uploaded files: first-party product/rebrand context, industry failure studies (MIT/RAND), external community threads (Reddit/G2), survey verbatims, or website copy.
2. **Extract atomic observations** per source: goals, pain points, behaviors, context, and verbatim quotes. Tag each observation with its source ID (`[Source 1]` through `[Source 5]`).
3. **Cluster** observations into 3-4 B2B segments by **goal + behavior similarity**, never by demographics alone. Also flag any non-converting traffic traps (`[Non-ICP]`) to exclude from marketing spend.
4. **Synthesize persona cards**: archetype name, one-line summary, primary goal, top pain points, verbatim quote, 3 concrete Day-1 scenarios, product needs, and a `Grounded` / `Inferred` confidence badge.
5. **Run the Evidence Linter**: every claim must trace to at least one tagged observation. Cut or relabel `[Inferred]` anything that does not.
6. **Output**: Persona cards + a scenario comparison table + an Evidence Appendix mapping every claim to its source.
```

---

## STEP 3: Prompt 1 — Obvious Persona & Use Case (Converge)
> **Prompt:**
> Identify the most obvious B2B customer personas and use cases from the Mercury CRM data packet provided (`Mercury_CRM_Market_Packet.txt`). Focus on the strongest, most recurring patterns.
> For each persona, include: who they are, their main goal, their biggest pain point, key behaviors or characteristics, a grounded verbatim quote, and the evidence (`[Source ID]`) that supports this persona.
> Also identify who is searching for AI tools in the traffic data (`[Source 5]`) but NOT converting so we do not waste paid marketing budget on them.
> Then identify the primary use case: what job are they trying to get done, what triggers the need, how are they currently solving it, and what outcome are they trying to achieve. Keep it concise and grounded only in the provided data.

---

## STEP 4: Prompt 2 — Non-Obvious Persona & Use Case (Diverge)
> **Prompt:**
> Identify a non-obvious B2B customer persona and use case from the Mercury CRM data provided. Look beyond the dominant single-business pattern for a smaller, emerging, or unexpected audience that carries higher lifetime value and is supported by evidence (`[Source 4]`).
> For the persona, include: who they are, what makes them different from the obvious personas, their main goal, their key pain point, unexpected behaviors, and the evidence that supports this persona.
> Then identify the primary use case: what job are they trying to get done, what triggers the need, how are they currently solving it, what outcome are they trying to achieve, and why is this use case easy to overlook.

---

## STEP 5: Map Concrete Scenarios Per Persona
> **Prompt:**
> For each persona (obvious and non-obvious), map 3 concrete, specific tasks they would actually attempt on Day 1 on our onboarding page (not vague motivations). Output as a structured comparison table with Goal, Core Friction, Scenario 1, Scenario 2, and Scenario 3.

---

## STEP 6: Check Your Evidence (Evidence Linter Audit)
> **Prompt:**
> Run the Step 6 Evidence Linter across all persona cards. Confirm every claim ties back to a real observation in Sources 1–5. Flag any unsupported assumptions as `[Inferred]` and output the verified Claims Register.

---

## STEP 7: Section-by-Section User Testing & 80/20 Stack Ranking
> **Prompt:**
> - **Persona:** Speed-to-Lead Sam (High-Volume Inbound Sales Floor Manager — Mortgage, Lending & Legal)
> - **Scenario:** Test whether the AI Voice Receptionist can answer a 7 PM borrower call naturally and warm-transfer to a closer without spending weeks on carrier setup.
> - **Page:** Mercury CRM current signup flow (Hero -> Step 1 Account -> Step 2 Carrier API/Webhook Setup -> Step 3 Blank AI Prompt Box).
>
> Walk this page as this persona trying to complete this scenario, section by section. For each section: does it help, create friction, or do nothing?
> End with: 1) What works, 2) What doesn't, 3) Gaps, and **4) Stack-rank the top friction points using the 80/20 Pareto rule** so engineering knows what to fix first.

---

## STEP 8: Survey Bias Self-Critique & 40-Buyer Synthetic Panel
> **Prompt Part A (Survey Self-Critique):**
> Draft 4 post-trial onboarding survey questions, then critique your own questions for leading wording, bias, or confusion, and output the revised neutral survey.
>
> **Prompt Part B (40-Respondent Synthetic Panel):**
> - **Persona pool:** Speed-to-Lead Sam (45%), Field-Crew Carlos (35%), Agency Architect Alex (20%), sampled across company tenure (1–15 yrs) and technical confidence (1–5).
> - **Prototype:** Current 3-step DIY trial signup flow.
> - **Task:** Sign up and get a working AI receptionist answering a test call within 15 minutes.
>
> Generate 40 synthetic B2B respondents sampled and varied from the pool. Record Completed vs. Abandoned (+ exact drop-off step), Confidence (1–5), and one verbatim reaction. Then aggregate the results into a summary distribution table.

---

## STEP 9: CRO / Synthetic Split Testing (Tool-First vs. Diagnosis-First)
> **Prompt:**
> - **Variant A (Tool-First DIY Trial):** Lead with *"Start Your 14-Day Free CRM Trial"* and drop the user into the self-serve workspace to connect carrier keys and write prompts.
> - **Variant B (Diagnosis-First + Instant Live Proof):** Lead with *"Enter Your Cell Number for a 60-Second Live AI Receptionist Call + Book a 5-Day Revenue & Speed-to-Lead Diagnostic"* (plus 1-click industry snapshot selector).
> - **Personas:** Speed-to-Lead Sam, Field-Crew Carlos, Agency Architect Alex.
>
> For each persona: which variant do they choose, and why, in one sentence? Then note where personas disagree, and what that disagreement implies for how our main page should route traffic.

---

## STEP 10: Product Ideation (8 Evidence-Anchored Ideas)
> **Prompt:**
> Using the personas and the known frictions/gaps surfaced in Steps 7–9, generate 8 concrete product and GTM ideas. For each include:
> - Name + one-line description
> - Which friction/gap it resolves, and for which persona
> - One named risk or open question
> Favor ideas that resolve a friction shared across multiple personas.

---

## STEP 11: Product Evaluation (DVF Scorecard & Steelman Objection)
> **Prompt:**
> - **Idea:** The 60-Second Pre-Verified Phone Sandbox + 5-Day Revenue Diagnostic Wedge (with 1-Click Industry Snapshots)
> - **Personas:** Speed-to-Lead Sam, Field-Crew Carlos, Agency Architect Alex
>
> 1. Per persona: does this solve their friction? Rate 1–5, one sentence why.
> 2. Steelman the strongest objection — business angle and user angle.
> 3. Score Desirability / Viability / Feasibility, 1–5 each, with reasoning.
> 4. What would need to be true for this to fail after shipping, and what guardrail prevents it?
