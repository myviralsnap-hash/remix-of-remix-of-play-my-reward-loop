# Finish email infrastructure + admin redemption alert

The email queue route and packages are in place. Now I'll finish wiring everything so admins get an email whenever a user requests a gift card redemption.

## Steps

1. **Scaffold transactional email system** — creates the `send-transactional-email` server route, unsubscribe handler, suppression handler, and registry (`src/lib/email-templates/`).

2. **Set up the email queue cron job** — schedules `process-email-queue` to run every minute so queued emails actually get sent.

3. **Create the "new redemption" email template** — branded RewardLoop email showing:
   - User name + email
   - Points amount + gift card brand
   - Recipient email
   - Link to admin redemptions page

4. **Trigger the email on redemption** — update `request_withdrawal` flow so that after a successful redemption request, the app calls the send endpoint with `recipientEmail = founder@rewardloop.fun` and the new-redemption template.

5. **Create `/unsubscribe` page** — required public page that handles the unsubscribe token from email footers.

## Technical details

- Sender domain: `notify.rewardloop.fun` (verified)
- Admin recipient: `founder@rewardloop.fun`
- Trigger location: client-side, right after `supabase.rpc('request_withdrawal', ...)` succeeds on the redemption page
- Idempotency key: `redemption-alert-${withdrawal.id}`
- Uses Lovable's built-in email infrastructure (no third-party service)

No database schema changes needed — the email infra tables already exist.
