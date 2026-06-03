# RewardLoop Promo v2 — Landscape Upgrade

Rebuild the existing Remotion promo as a polished **16:9 / 1920×1080** spot, ~**28 seconds @ 30fps** (840 frames — safely under the 10-min sandbox render cap), with **AI-generated background music** via ElevenLabs.

## Creative direction

- **Aesthetic**: "Kinetic Energy meets Premium Mobile App" — fast staggered entrances, bold orange-on-deep-brown palette already established (`#fbbf24`, `#ea580c`, cream `#fff7ed`, deep `#0d0703`), confident springs, cinematic restraint between beats.
- **Reuse** existing brand tokens in `remotion/src/theme.ts` and the existing `public/images/icon.png`.
- **Layout shift**: landscape lets us put **phone mockup on one side + headline/feature copy on the other**, instead of stacked. Much more "app promo" feeling.
- **Persistent layer**: keep the floating dots background drifting across the whole video for continuity between scenes.

## Scene plan (~840 frames total)

```text
00:00–00:03  SceneLogo         Icon spring-in + "RewardLoop" wordmark + tagline
00:03–00:08  SceneHook         "Play games. Earn real rewards." bold type, off-center
00:08–00:14  SceneMissions     Phone-left, copy-right: Today's Missions checklist
00:14–00:20  SceneGames        Three game cards (Spin / Trivia / Tap Dash) slide in
00:20–00:24  SceneStreak       Flame + day counter ticking 1 → 28
00:24–00:28  SceneRedeem       Balance counter + gift card grid (Amazon/Visa/PP/Apple)
00:28–00:28  SceneEnd          Logo lockup + "Get it on Google Play" badge
```

Transitions: mix of `fade` and `slide` from `@remotion/transitions` (already installed), reused consistently rather than a new effect each cut.

## Background music

- Generate a **~30s upbeat, modern, optimistic electronic track** ("warm synth pluck, light percussion, uplifting, app-promo energy, no vocals") via ElevenLabs Music API → save to `remotion/public/audio/bg.mp3`.
- Add as a Remotion `<Audio>` element at the root of `MainVideo` with `volume` ramp-in (0 → 0.55 over first 15 frames) and ramp-out at the tail.
- **Re-enable audio in the renderer** — current `scripts/render.mjs` has `muted: true`. The skill notes Nix ffmpeg lacks `libfdk_aac`, so we'll switch the renderer to `audioCodec: 'aac'` using the default encoder, or fall back to muxing the MP3 in with ffmpeg as a post-step if encoding fails.

## Files to change / add

- `remotion/src/Root.tsx` — change composition to `1920×1080`, `durationInFrames: 840`.
- `remotion/src/MainVideo.tsx` — re-choreograph scene order/durations, add `<Audio>`, adjust `FloatingDots` for landscape.
- `remotion/src/scenes/SceneLogo.tsx`, `SceneMissions.tsx`, `SceneGames.tsx`, `SceneStreak.tsx`, `SceneRedeem.tsx`, `SceneEnd.tsx` — re-layout each for landscape (split layouts, larger negative space, repositioned phone mockup).
- `remotion/src/scenes/SceneHook.tsx` — **new** hook scene right after the logo.
- `remotion/src/components/Phone.tsx` — minor sizing tweak so it fits a half-width column.
- `remotion/public/audio/bg.mp3` — **new**, generated.
- `remotion/scripts/render.mjs` — un-mute, ensure audio is encoded; output to `/mnt/documents/rewardloop-promo-v2.mp4` (keeps the original v1 intact for comparison).

## Technical notes

- ElevenLabs key: will check `secrets--fetch_secrets` for `ELEVENLABS_API_KEY` and request it via `add_secret` if missing before generating music.
- Render via existing `node scripts/render.mjs` flow. Total runtime well under the 600s cap at 1920×1080.
- App itself is untouched — this is purely a marketing asset under `remotion/` and `/mnt/documents/`.

## Deliverable

A single MP4: `/mnt/documents/rewardloop-promo-v2.mp4` (~28s, 1920×1080, with music), surfaced via a `<presentation-artifact>` tag so you can download and use it for Play Store feature graphics, social posts, or your website.
