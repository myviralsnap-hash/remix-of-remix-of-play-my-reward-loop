## Play Store listing assets for RewardLoop

I'll prepare all the copy + visual assets you need to fill out the store listing.

### 1. Store listing copy (drafted as a downloadable file)

Write `/mnt/documents/rewardloop-store-listing.md` containing:

- **App name** (max 30 chars): `RewardLoop — Play & Earn`
- **Short description** (max 80 chars): a punchy one-liner about earning points by playing daily
- **Full description** (max 4000 chars): structured with intro hook, "What you can do" bullets (Daily missions, Spin the wheel, Trivia, Tap Dash, Streaks, Referrals, Redemptions), "Why players love it", a brief disclosure that rewards depend on availability/region and ads fund the platform, and contact line
- 2–3 alternate short-description variants so you can A/B
- Suggested **tags**: Rewards, Casual, Trivia, Mini games, Loyalty

### 2. App icon — 512×512 PNG

Generated via `imagegen` (premium quality for crisp edges):
- RewardLoop "loop" mark: a stylized circular loop forming a coin/gift shape
- Brand orange gradient (matches `--brand` token: warm orange `#f59e0b` family) on a clean background
- No text inside the icon (Play Store rejects icons with readable text in most cases — and it scales down to launcher sizes)
- Saved to `/mnt/documents/rewardloop-icon-512.png`

### 3. Feature graphic — 1024×500 PNG

Generated via `imagegen` (premium):
- Bold orange gradient background matching the in-app brand header
- Loop/coin motif on the left, wordmark "RewardLoop" + tagline "Play. Earn. Redeem." on the right
- Safe zone respected (no critical content within 100px of edges — Play often crops for different surfaces)
- No screenshots embedded (Google discourages mock device frames in feature graphics)
- Saved to `/mnt/documents/rewardloop-feature-1024x500.png`

### 4. QA pass

After generation, inspect both images at full size for: cropping, edge artifacts, text legibility at small sizes (icon at 48px), and brand-color accuracy. Re-generate if anything looks off.

### What I'm NOT doing in this step

- **Phone screenshots** — those need to come from the actual running app (you'll capture 4–8 from the preview/device). I can give you a shot list and the recommended order. If you want, I can also build a screenshot-frame template later that overlays captions on raw screenshots.
- **Promo video** — optional, skip unless you want it.
- No code changes to the app itself.

### Deliverables

Three files in your downloads:
1. `rewardloop-store-listing.md` — all copy, ready to paste into Play Console
2. `rewardloop-icon-512.png` — app icon
3. `rewardloop-feature-1024x500.png` — feature graphic

Plus a screenshot shot list in chat.
