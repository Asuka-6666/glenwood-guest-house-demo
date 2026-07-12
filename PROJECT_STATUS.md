# Glenwood Guest House Demo — Progress Tracker

Last updated: 12 July 2026 — booking layout and room-media stabilisation pass

Status legend: `DONE` · `IN PROGRESS` · `DEFERRED` · `OWNER INPUT`

## Current working state

The project is a responsive, one-page client demo with a configuration-driven Demo booking flow. Property details, review data, room facts, room-image mappings and FAQ content are primarily maintained in `site-config.js`. The booking interface demonstrates date selection, suitable rooms, room details and the hand-off point to a future live provider; it does not claim to provide live inventory or payment.

The established visual direction is retained: North Wales landscape, forest green and warm ivory, editorial typography, a visible direct-booking path, family-run positioning and an immersive gallery. Current work prioritises reliability and responsive layout. AI image generation or AI restoration is explicitly deferred at the user's request.

## Completed in the current pass

- Replaced the stale temporary Hero image reference with the existing non-generative Glenwood exterior image.
- Changed the Hero treatment to preserve the whole house without stretching while still filling the viewport.
- Forced all booking result cards to use the same available width and the same image/content columns.
- Aligned every room-selection button to the same left edge and raised it to meet the brown divider.
- Rebuilt View Room media as a consistent, full-width horizontal image sequence with identical display dimensions.
- Confirmed room-detail photos against the official filenames: Room 4 for Double, Room 3 for Twin, and Room 7 for Family Suite.
- Excluded duplicate thumbnails and the very small Room 4 composite because they repeat existing views and would visibly reduce quality.
- Expanded the static asset audit so missing images directly under `image/` can no longer escape detection.

## Feature status

| Area | Status | Notes |
|---|---|---|
| One-page content structure | DONE | Hero, welcome, rooms, reasons, reviews, explore, cottage, map, FAQ and final CTA are present. |
| Responsive navigation | DONE | Mobile menu and persistent Book action were exercised at the target mobile widths. |
| Demo booking flow | DONE | Validation, sample availability, preferred-room selection, room choice and provider hand-off explanation are implemented. |
| Live booking connection | OWNER INPUT | Requires Glenwood's provider, inventory setup and approved URL. |
| Booking result layout | DONE | Equal-width cards and aligned actions completed in this pass. |
| Room detail modal | DONE | Accurate configured facts and room-specific official photos, with uniform media sizing. |
| Gallery | DONE | Filters, captions, lightbox, keyboard control and touch swipe are implemented. |
| Find Us | DONE | Address, English Google Map and external directions are present. |
| Review presentation | DONE | Booking score, pinned-note treatment and Google-style review cards are implemented. |
| Accessibility interactions | DONE | ESC, backdrop close, focus entry/return, focus trapping and visible focus states are implemented. |
| Static integrity audit | DONE | Anchors, duplicate IDs, local assets, alt text, external-link rel and CSS braces are checked. |
| Multi-width visual audit | DONE | Browser-rendered at 320, 390, 430, 768, 1024, 1366 and 1920px with no page-level horizontal overflow. |
| AI image work | DEFERRED | No AI-created or AI-edited image should be introduced until the user resumes this stage. |

## Approved room-image mapping

| Website room | Official source set used |
|---|---|
| Double Room | `glenwood-guesthouse-2026-room4-01-double-efc9837bf7.jpg`; `glenwood-guesthouse-2026-room4-02-bathroom-054cffbf85.jpg` |
| Twin Room | `glenwood-guesthouse-2026-room3-01-twin-02-879f5ee859.jpg`; `2023-glenwood-room-3-twin-459acb064e.jpg` |
| Family Suite | `glenwood-guesthouse-2026-room7-01-family-suite-ce5cdf52e9.jpg`; `glenwood-guesthouse-2026-room7-02-bathroom-67a2c09baa.jpg` |

Small duplicate thumbnails are intentionally not displayed. A low-resolution Room 4 composite is also omitted because its two views already exist as separate, clearer images.

## Owner confirmation still required

- Real booking provider, approved live URL and Booking.com/channel-manager synchronisation
- Live prices, inventory, breakfast inclusion and payment flow
- Check-in/check-out, cancellation, minimum-stay, child, pet and accessibility policies
- Permission and final source links for displayed reviews
- Original high-resolution property, room, breakfast and host photography
- Host-approved welcome wording, host photograph, official email, privacy and cookie policies

## Known limitations

- The booking flow is an explicit Demo and cannot confirm a real reservation.
- Some official source photographs are below modern full-screen resolution.
- The Hero uses a deterministic enlarged WebP based on the genuine exterior photo; it is not AI-generated.
- Live prices, inventory and provider completion remain unavailable until the owner supplies the booking-system details.

## Next checkpoint

1. Obtain owner-approved live booking-provider details and policies.
2. Replace Demo hand-off with the approved live booking URL or provider component.
3. Add owner-approved host, breakfast and higher-resolution property photography when supplied.
4. Keep AI image work paused until explicitly resumed.

## 12 July responsive verification evidence

- Hero inspected at desktop and mobile sizes; the whole house remains visible without image stretching.
- Removed the duplicate mobile background layer exposed by screenshot testing.
- Booking result cards measured at equal widths; action buttons share the same horizontal start and their top edge matches the brown divider.
- At 390px, all three result cards measured 358px wide and all action buttons measured 324px wide.
- Double, Twin and Family detail dialogs were opened at 390px and 1366px.
- Every room-detail image measured 390×396px on mobile and 578×630px on desktop.
- All seven target viewport widths reported zero page-level horizontal overflow.
- Mobile menu, Gallery, room dialog and booking drawer open/close paths were exercised; focus/scroll lock cleared after closing.

## Reliability and media-control pass

- Removed observer-dependent content hiding after full-page testing exposed blank sections during fast scrolling and delayed observer delivery.
- All 36 formerly animated content blocks now remain visible by default; JavaScript delay or failure no longer hides core page content.
- Added Previous/Next controls and a live `1 / 2` counter to every View Room photo sequence.
- Verified the room-photo controls at 390px and 1366px; both advance from the first to the second photo without page overflow.
- Replaced the Gallery lightbox's empty initial image source with a genuine Glenwood image, preventing a broken root-image request.
- Runtime audit reports no unnamed buttons, page errors, failed HTTP responses or page-level horizontal overflow.

## Eviivo-style booking interaction pass

- Studied the supplied Lansdowne Eviivo booking flow and reproduced its interaction hierarchy inside Glenwood's existing on-page booking overlay; no new page or external navigation was introduced.
- Retained Glenwood's forest green, ivory, bracken brown and editorial type system rather than copying Eviivo's branding.
- Rebuilt the desktop flow as: editable date/guest search bar → horizontal room results → room/rate details → Continue → stay summary.
- Room results now use a consistent three-column structure: 230px photo gallery, flexible room information, and a 190px price/Continue panel.
- Added room capacity and facility highlights, expandable room details, direct-booking terms, live-price boundaries and a clear Continue action.
- Selecting a room now hides the result list and advances to the Continue step; `Back to rooms` restores the same results without losing the search.
- Live prices, breakfast terms and cancellation policies remain explicitly delegated to the approved live booking provider rather than being invented in the Demo.
- Desktop verification at 1366×900 measured all three cards at 1127px wide with identical `230 / 705 / 190` columns and zero horizontal overflow.
- Mobile verification at 390px measured all three stacked cards at 343px wide with zero horizontal overflow.

## Boutique room-card refinement

- Refined the result cards from a tightly joined three-column list into individual accommodation cards with 20px desktop padding, 24px column gaps, subtle rounded corners, lighter borders and restrained shadows.
- Moved `View more photos` below each image as a quiet text action instead of a competing button.
- Reorganised each room around a clear decision hierarchy: audience label, room name, four comparable highlights, one natural-language summary and an expandable details section.
- Expanded room details now contain three consistent groups: room highlights, best-for guidance and booking notes.
- Reworked the purchase panel to use `This stay`, `Your room choice`, an honest breakfast/live-terms note, one primary `Choose this room` button and one secondary text action.
- Breakfast is not described as included because owner confirmation is still missing; the live provider remains the source of truth.
- Added a persistent selected-room state. Returning from step 3 highlights the chosen card, shows a `Selected` badge and changes the primary button label/state.
- Added a dedicated tablet layout: image and room information share the first row, while the booking action occupies the full second row.
- Mobile ordering is now image → photo link → room information → expandable details → stay note → primary selection action.
- Verified at 1366px, 820px and 390px with zero horizontal overflow and consistent image/card sizing.

## Room-detail Gallery layout fix

- Kept the existing modal structure and right-hand content unchanged; only the left Gallery stage and its switching logic were modified.
- The desktop Gallery now fills the modal's complete height. At 1366×900, modal, media stage and active image all measured 760px high.
- Replaced the horizontal scroll track with a fixed image stage. Only the active image is displayed, so switching images cannot change modal height or create a scrollbar.
- Every image uses `object-fit: cover` within the same fixed stage and is never stretched out of proportion.
- Previous/Next controls remain absolutely positioned 16px above the bottom centre of the image area.
- Multi-image verification showed both Double Room images at 578×760px; Gallery `scrollWidth` and `clientWidth` both measured 578px.
- A single-image room automatically hides the paging controls while retaining the same full-height image stage.
- Mobile uses image-first/detail-second stacking with a 40vh media stage. At 390×844, the active image and media stage both measured 360×338px with zero horizontal overflow.

## Portable production Demo release

- Moved the requested homepage image to `image/hero/exec-040131c2-6b38-4ab4-913c-fa48cf54ef5a.png` and made it the production Hero source.
- Added a minimal Vite build layer around the existing HTML/CSS/JavaScript without changing the site's visual design or Demo booking boundaries.
- Added `package.json`, lock file, `vite.config.js`, `main.js` and a strict static-image preparation script.
- Image preparation validates exact path casing before every build, protecting Linux deployments from Windows-only case mismatches.
- Root deployment uses Vite base `/`; `VITE_BASE_PATH` supports documented subdirectory builds and was verified with `/glenwood-demo/`.
- Added Netlify redirects/configuration, Vercel configuration and Cloudflare Pages build instructions.
- Added and executed `start-demo.bat` and `start-demo.ps1`; both served the production `dist` successfully at port 8080.
- `npm install`, root production build, subdirectory production build and final root production build completed successfully.
- Production preview verified Hero/images, anchors, Gallery/lightbox, FAQ, room modal, phone/external links and all three Demo booking steps.
- Production browser audit reported no console warnings/errors, broken images, unnamed buttons or horizontal overflow.
- Final `dist` contains 36 files and measures 8.48 MiB.
- Created `release/glenwood-demo/` and `release/glenwood-demo.zip`; the ZIP contains no `node_modules`, `.git`, `.env` or development cache.
- Extracted the ZIP into a separate verification directory and served its `dist` independently; the page, Hero and assets loaded with no console errors or horizontal overflow.
