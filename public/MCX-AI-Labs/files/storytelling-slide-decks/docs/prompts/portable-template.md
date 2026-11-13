# Portable audience-deck workflow

## Variables

BRAND_NAME, APPROVED_LOGO_URL_AND_LOCAL_FILE, PRIMARY_COLOR, ACCENT_COLOR, NEUTRAL_COLOR, BODY_FONT, DISPLAY_FONT, GAMMA_THEME_ID, AUDIENCE, APPLICATION, SOURCE_REGISTER, APPROVED_ASSET_URLS, CTA_URLS, CARD_COUNT, EVIDENCE_LIMITS.

## Prompt pattern

"Create a [CARD_COUNT]-card [BRAND_NAME] presentation for [AUDIENCE] making [DECISION]. Explain the problem and stakes, the brand's answer, evidence and a specific next step. Use only [SOURCE_REGISTER] and [APPROVED_ASSET_URLS]. Use [GAMMA_THEME_ID] and the exact approved logo without redrawing it. Keep claims tied to their scope. Mark unresolved claims [NEEDS VERIFY]. Preserve supplier attribution and distinguish concepts from completed projects. Include real QR images for [CTA_URLS]. Store speaking guidance as speaker notes, never slide paragraphs."

## Reuse sequence

1. Replace all brand variables and asset permissions.
2. Read the new sources. Build a claim register and reconcile contradictions.
3. Choose audience-specific decisions and CTAs. Do not just replace audience names.
4. Save the narrative and per-slide outline with notes and sources.
5. Create in Gamma with the exact saved request.
6. Inspect the actual decks, then save and apply targeted refinement prompts.
7. Decode QR images from the final deck/export and verify video or fallback behavior.
8. Keep source, prompt, asset and verification records. Duplicate the approved deck structure or convert it to a native Gamma template where available.
9. Record the human walkthrough only after the visible build matches the script.

## Refinement pattern

"Keep the approved content and sources. Match the actual website fonts and brand colors. Give every slide a photographic or material background that supports its subject, with cinematic grading, purposeful scale and restrained glass effects. No solid-white slides. Fix overflow before shrinking text. Keep supporting text readable. Align equal-sized real QR images on white quiet zones. Keep captions and all [NEEDS VERIFY] warnings visible. Preserve the original logo and source image meaning."

Adapted from the supplied Gamma prompt playbook's layout, QR, template-font, background, overflow and readability prompts. Save each actual request separately.

