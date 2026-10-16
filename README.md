# CHILL N’ KNOCK — Interactive Prototype

Responsive, single-page HTML/CSS/JavaScript prototype for a nightlife discovery and table-runner concept.

## Included files
- `index.html`: all app screens and demo interactions
- `logo.png`: project logo provided by the team

## Run locally
Open `index.html` in a browser or use VS Code Live Server.

## Publish with GitHub Pages
1. Create a public GitHub repository (or use an existing one).
2. Upload **both** `index.html` and `logo.png` into the repository root.
3. Open **Settings → Pages → Build and deployment**.
4. Select **Deploy from a branch**, choose **main** and **/(root)**, then save.
5. Open the GitHub Pages URL after deployment.

## How to test
Use the top-right role selector to switch between Nightlife User, Table Runner, and Venue Partner.

Nightlife User: Discover → Venue detail → Book a table / Get in line → Review → Submit → Track. Favorite venues, send demo messages, and inspect requests.

Table Runner: Available jobs → Job detail → Accept → Active jobs → Update progress → Complete → Earnings.

Venue Partner: Dashboard → Booking requests → Confirm / Decline; Queue management; Service policies; Analytics.

## Important limitations
- **Prototype only:** no live venue data, real booking, payments, authentication, location tracking, or real-time chat.
- Data and actions are stored in the current browser's `localStorage`, not synchronized across devices or users.
- Venue listings, images, prices, reviews, and runner profiles are illustrative and not verified live business information.
- The venue-policy toggles are UI simulations, not actual permission from a venue. Table booking or queue transfers must be verified directly with participating venues.
- External venue photos are sourced from Unsplash URLs and Google Fonts load over the internet. The app needs an internet connection for these assets.
- Avoid entering real personal information in this demo.

## Next steps for a real product
Connect a backend/database and authentication; model booking and queue rules; obtain venue permissions; implement role-based access, secure messaging, notifications, payment handling, and verified operational statuses.
