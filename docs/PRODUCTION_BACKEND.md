# Moving CHILL N’ KNOCK from static UX to production

This package is a client-only QA prototype. Publishing it on GitHub Pages makes the *preview* accessible, but does **not** turn the workflow into a secure networked multi-sided app. Avoid using it for real customer data or payments.

## Suggested service architecture

- **Front-end**: existing responsive screens; later split into modules/components, server-controlled permissions and secure API calls.
- **Auth**: managed provider (e.g. Supabase Auth / Firebase Auth). Real OAuth buttons require provider app IDs and redirect setup. No password storage in localStorage.
- **Core DB**: PostgreSQL or another managed database. Suggested entities: `profiles`, `venues`, `venue_members`, `runner_applications`, `runner_profiles`, `runner_verifications`, `booking_requests`, `runner_offers`, `runner_assignments`, `queue_snapshots`, `booking_events`, `messages`, `payments`, `deposits`, `refunds`, `event_tickets`.
- **Authorization**: default guest browse, User can access only own bookings/messages, Runner only offers/assigned tasks, Venue only its own requests/queue/policies; admins review verified partner applications. Implement authorization **on the server and database**, not by hiding client UI controls.
- **Booking state machine**: `submitted → waiting_for_runner → runner_accepted → waiting_for_venue → confirmed/declined/cancelled` or direct requests `submitted → waiting_for_venue → ...`. Use server timestamps and an append-only event log.
- **Queue ETA**: approved venue feed or timestamped runner report; publish `position_ahead`, `estimated_wait_minutes`, `source`, `last_updated_at`, confidence and notice it can change. Never show generated sample numbers as live.
- **Runner verification**: compliant identity-verification vendor / secure restricted document storage. Mask sensitive data, access controls, retention/deletion rules, manual review and audit logs.
- **Venue onboarding**: verify legal entity, manager rights, venue listing ownership, booking rules, and queue/hand-off authorization before approval.
- **Deposits / Refunds**: payment-provider hosted flow and server webhooks, agreed fee schedules, cancellation windows and legally compliant refunds. Money never flows through GitHub Pages alone.
- **Notifications**: web push / mobile notifications with consent, delivery logs, opt-outs.
- **Maps / rides**: licensed provider/API or safe outbound links; no fake real-time driver prices or availability.
- **Photos**: provider-licensed assets stored via cloud object storage or authorized CDN; strict upload validation.

## Event correctness rules

1. Booking submission does **not** equal venue confirmation.
2. Runner acceptance does **not** imply venue queue-transfer permission.
3. Deposit is not collected until amount, payer/payee, conditions and refund policy are surfaced and accepted.
4. Runner verified status must come only from a completed verification record.
5. No user's sensitive data should be accessible across roles; only minimum fields required for the job.

## Production deployment

Move to a backend-enabled host / separate API; enforce HTTPS, origin allowlisting, content security policy, secure session handling, RLS, audit logging, rate limits and fraud detection. Keep `?qa=1` out of the Production build. Add automated integration tests across three account types and external payment sandbox before launch.
