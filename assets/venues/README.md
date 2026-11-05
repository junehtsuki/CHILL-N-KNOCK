# Adding real venue photos

The shipped pictures are **generic illustrative Unsplash images**, not photographs of the named businesses.

1. Obtain permission from the owner/photographer before using photos of a real venue.
2. Put the photos here using simple lowercase IDs: `onyx.jpg`, `muin.jpg`, `chupa.jpg`, etc.
3. In `upgrade.js`, update the corresponding venue object's image property to `image:'assets/venues/onyx.jpg'` (or `.png` / `.webp`).
4. Keep venue photos reasonably compressed (e.g. WebP under 250–400KB for most cards).
5. Never assert the generic photo is a confirmed photo of a real venue.

The app keeps the original first-version home and detail layout. No user photos or real identity-document uploads are included.
