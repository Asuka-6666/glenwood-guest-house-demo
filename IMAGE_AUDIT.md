# Glenwood Demo — Image Quality Audit

Last updated: 12 July 2026

AI enhancement is intentionally deferred until the final project stage. No generated image is currently used by the website.

## Key real-property images

| Use | Current source | Resolution | Decision |
|---|---|---:|---|
| Hero / exterior | `glenwood-exterior-restored.webp` | 1800×1254 | Non-generative Lanczos restoration of the 600×418 source. Preserves exact geometry and is now used by the Hero. |
| Garden story hero | `glenwood-cottage-2026-garden-01-5189b0e1fd.jpg` | 1200×900 | Good. Keep. |
| Secondary garden | `garden-4a2cc6853c.jpg` | 350×262 | Acceptable only in a smaller supporting tile. Do not use full width. |
| Story interior | `glenwood-guesthouse-2026-room5-01-d59942049a.jpg` | 1200×900 | Replaced the former 140×140 lounge image. Good. |
| Double Room | `glenwood-guesthouse-2026-room4-01-double-efc9837bf7.jpg` | 900×1200 | Good. Keep. |
| Double bathroom | `glenwood-guesthouse-2026-room4-02-bathroom-054cffbf85.jpg` | 900×1200 | Good. Keep. |
| Twin Room | `glenwood-guesthouse-2026-room3-01-twin-02-879f5ee859.jpg` | 900×1200 | Good. Keep. |
| Family Suite | `glenwood-guesthouse-2026-room7-01-family-suite-ce5cdf52e9.jpg` | 900×1200 | Good. Keep. |
| Family bathroom | `glenwood-guesthouse-2026-room7-02-bathroom-67a2c09baa.jpg` | 900×1200 | Good. Keep. |
| Cottage interior | `glenwood-cottage-2026-bi-fold-pic-01-7156531510.jpg` | 900×1200 | Good for the current interior-led Cottage presentation. |
| Cottage supporting image | `2023-glenwood-cottage-first-picture-a4460521e4.jpg` | 600×800 | Usable at moderate size. Owner exterior photography still required. |

## Local-area imagery

| Current source | Resolution | Risk | Planned treatment |
|---|---:|---|---|
| `around-woodland-restored.webp` | 1200×902 | Deterministic restoration of a 250×188 source; true fine detail remains limited | Used with reduced card height and overlay. Replace with authorised high-resolution photography before launch. |
| `around-eryri-restored.webp` | 1200×900 | Deterministic restoration of a 240×180 source; true fine detail remains limited | Used with reduced card height and overlay. Replace before launch. |
| `around-castles-restored.webp` | 1200×939 | Deterministic restoration of a 350×274 source | Used with reduced card height and overlay. Replace if the owner supplies an authorised original. |

## Final-stage AI decision rules

AI editing may be considered only after all functional and responsive tasks are complete, and only under these constraints:

- Preserve the exact building structure, room layout, furniture, windows, garden features and real-world setting.
- Limit edits to resolution enhancement, noise reduction, exposure and colour consistency.
- Reject any output that invents details or changes the property.
- Do not generate a specific tourist attraction and present it as documentary photography.
- Save AI-treated files separately and label them as concept-enhanced assets in project documentation.
- Obtain the property owner’s approval before public use.

## AI enhancement result

One tightly constrained AI restoration was attempted on the exterior photograph at the final image stage. It was rejected and is not referenced by the website because the model reinterpreted sign lettering, garden detail and small architectural textures. The accepted Hero asset instead uses deterministic Lanczos upscaling, median denoising and restrained unsharp masking; it does not invent detail.

## Owner photography still needed

- High-resolution exterior and entrance/parking photograph
- Natural Marie and Sid portrait
- Breakfast and dining photographs
- Garden stream, conservatory and terrace
- Complete Garden Cottage exterior, rooms and private terrace
- Authorised high-resolution local-area photography
