# ChatGPT / Claude Reusable Skill: `ux-persona-builder`

**Name:** `ux-persona-builder`

**Description:**
Build evidence-linked UX/user-research and B2B personas from whatever inputs are available: product context, interview transcripts, call notes, survey exports, analytics/usage data, MIT/RAND implementation studies, or public community sources (Reddit, G2). Clusters observations by goals and behaviors rather than demographics alone, produces 3–4 persona cards with a confidence label (`Grounded` vs `Inferred`), and outputs an evidence appendix mapping every claim back to its source.

## Workflow
1. **Detect input type(s)** present in the conversation or uploaded files. Support combining multiple internal and external sources in one run.
2. **Extract atomic observations** per source: goals, pain points, behaviors, context, and short verbatim quotes. Tag each observation with its source ID (`[Source 1]` through `[Source 5]`).
3. **Cluster** observations into 3–4 segments by **goal + behavior similarity**, never by demographics alone. Flag any non-converting traffic segments as `[Non-ICP]`.
4. **Synthesize persona cards**: name/archetype, primary goal, top pain points, one verbatim quote, 3 concrete behavior scenarios, product needs, and a `Grounded` / `Inferred` confidence label.
5. **Run the evidence linter**: every claim must trace to at least one tagged observation. Cut or relabel anything that does not.
6. **Output**: Persona cards + a scenario comparison table + a plain-text evidence appendix (persona -> source list).
