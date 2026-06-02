
## Admin Redemption Review Panel

Build a secure admin-only page where you review pending gift card redemptions, mark them as paid (after manually sending the code) or rejected (refunds points), and get an email alert whenever a new request comes in.

### What you'll get

1. **Admin role system** — secure `user_roles` table; your account flagged as `admin`.
2. **Admin route** at `/app/admin/redemptions` — only visible if you're an admin; everyone else gets redirected.
3. **Pending queue** — list of all pending withdrawals showing: user name, brand, amount, recipient email, points cost, date requested.
4. **Approve flow** — paste the gift card code, click "Mark as Delivered" → status flips to `paid`, code stored in `admin_notes`, user's Redemption History updates to "delivered".
5. **Reject flow** — enter a reason, click "Reject" → status flips to `rejected`, **points are automatically refunded** to the user.
6. **Email alert** — when a user submits a redemption, you get an email at your address with the details and a link to the admin panel. Uses Lovable's built-in email system (no API keys).

### Technical pieces

- **DB migration**:
  - `app_role` enum (`admin`, `user`)
  - `user_roles` table + `has_role(uuid, app_role)` SECURITY DEFINER function (avoids RLS recursion)
  - New RLS policies on `withdrawals`: admins can SELECT all rows; admins can UPDATE status/admin_notes
  - New `approve_withdrawal(id, code)` and `reject_withdrawal(id, reason)` SECURITY DEFINER functions — reject refunds points atomically and logs a `withdrawal_refund` transaction
  - Seed your account as admin (you'll tell me your email after migration runs)
- **Email infra**: scaffold transactional email + create `new-redemption-request` template; trigger from `request_withdrawal` via a small server function that fires after insert
- **Admin UI**: `/app/admin/redemptions` route gated by `has_role` check; table of pending items with action dialogs

### What stays manual (for now)

You'll still get the gift card code yourself (from Amazon, Visa, etc.) and paste it into the approve dialog. Auto-fulfillment via Tango/Reloadly can be added later as a drop-in upgrade.

### Open question

After the migration runs, tell me:
1. The **email address** that should receive the alerts (probably your account email).
2. Whether you've already set up a custom email domain in Lovable Cloud — if not, I'll guide you through the one-time domain setup so emails don't get spam-filtered.
