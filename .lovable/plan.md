## Plan

Build a new Play Store promo screenshot by combining the **new neon black/teal/gold wheel** screenshot with the **"Spin to win bonus points / Every spin grants points — no losses"** orange header overlay from the old Play Store asset.

### Steps

1. Copy both uploaded images into `/tmp/` so a Python/PIL script can read them.
2. Write a short Pillow script that:
   - Loads the new wheel screenshot (`wheel_replacement_google_play.jpg`) as the base.
   - Draws the orange gradient header band across the top (matching the old screenshot's orange→amber gradient).
   - Renders the headline **"Spin to win bonus points"** (bold white, large) and subline **"Every spin grants points — no losses"** (lighter white) centered over the orange band.
   - Tucks the existing "Reward Wheel / Balance: 0 pts" app header just below, so the composition mirrors the old Play Store asset but with the new wheel visible underneath.
3. Save the result to `/mnt/documents/playstore-wheel-v2.jpg` at Play Store screenshot proportions.
4. QA: open the rendered image, confirm text is crisp, no clipping, wheel fully visible, bottom nav intact.
5. Deliver via `<presentation-artifact>` so you can download and upload it to Play Console as the replacement screenshot.

### Notes

- I'll keep the same copy as the original Play Store screenshot for consistency. If you'd rather have different wording (e.g. "Spin the neon wheel" / "Win up to 100 points per spin"), tell me and I'll swap it in.
- Output will be a single JPG sized to match the source (≈1080 wide) — Play Console accepts that directly.

Ready to switch to build mode and generate it?
