# Data source audit — 5 November 2026

- Dataset A: `bangkok_venues_master(1).json` มี 17 venue records, structured menus, review summaries, price ranges, external source URLs
- Dataset B: `nightlife_venues_database.md` มีเนื้อหาภายในเป็น JSON array ของ 18 venue records แม้ชื่อไฟล์เป็น `.md`. มี overview/atmosphere/menu highlights/research notes
- Matched to 18 established IDs from CHILL N’ KNOCK baseline; do **not** replace these IDs with source file ids (`V001`, `tderm_x_455` etc.) because bookmarks, booking, and navigation reference existing keys
- Data priority for display: master overview and specific menu price with its `verified` flag > notes file overview/highlights. Master and MD disagree on some ratings and venue descriptions; no historical Google rating published as live
- The master source is not a live feed. A menu entry with `verified: true` indicates **as marked by the team's research file**, not independently revalidated by this build
- Original user-provided quoted comments are stored in `venue-research.js` for research context, but UI prioritizes paraphrased summaries and source labels. In-app ratings and venue ratings must be integrated through an authorized provider with proper attribution

## Unresolved identity
- VIRAL: research note identifies Tichuca, which is not assumed to be the same venue. Both sources lack validated data for an independent VIRAL record
- GUEST HOUSE: master references Guest House Kaset; original app venue name/logo is unconfirmed. No automatic cross-venue merge

## Data that should remain approximate
- `price_per_person` is an estimated **per-guest spend**, not table minimum, admission price, booking fee, or deposit. Budget filter uses this estimate
- Some source `hours` are from reviews and may be stale
- `google_rating`/count is stored as research metadata only and **not displayed as live**
- Booking availability, seat inventory and live queue data are not in these files

## Photo rights
User files include only image-source names such as "Google Maps / Restaurant Guru" but not actual licensed image bytes, URLs, or releases. This build does not bulk-copy photos from those websites and instead uses existing placeholder photos until local images are provided.
