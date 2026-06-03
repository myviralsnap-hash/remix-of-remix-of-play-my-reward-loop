## Goal

Give you ready-to-paste PowerShell commands (using your `SexyMimi` user path) to build and sign the next AAB from the current working code, then upload it to Play Console.

---

## Step 1 — Build the signed AAB

Open **PowerShell** (just search "PowerShell" in the Start menu) and paste this whole block:

```powershell
cd C:\Users\SexyMimi\Desktop\rewardloop
git pull
.\build-aab.ps1
```

When it prompts:
- **Keystore password** → type your `rewardloopAAB` keystore password, press Enter (typing is hidden, that's normal)
- **Key password** → just press Enter to reuse the same password (or type the key password if different)

The script will automatically:
1. Pull latest code from GitHub
2. `bun install` + `bun run build` (compile web app)
3. `bunx cap sync android` (copy build into Android wrapper)
4. Bump `versionCode` from 25 → 26
5. Sign and build the release AAB
6. Open File Explorer with the AAB selected

**Output file will be at:**
```
C:\Users\SexyMimi\Desktop\rewardloop\android\app\build\outputs\bundle\release\app-release.aab
```

Takes about 3–8 minutes total depending on your machine.

---

## Step 2 — Upload to Play Console

1. Go to https://play.google.com/console → click **RewardLoop**
2. Left sidebar → **Testing → Closed testing** (your tester track)
3. Click **Create new release**
4. Drag `app-release.aab` into the upload box
5. **Release notes** — paste something like:
   ```
   Stability fixes and UI polish.
   ```
6. Click **Next → Save → Review release → Start rollout to Closed testing**

Testers get the update notification within a few minutes to a couple hours.

---

## If something errors out

Common ones and quick fixes:

- **`git pull` says "your branch has diverged"** → run `git reset --hard origin/main` then re-run `.\build-aab.ps1`
- **`bun: command not found`** → close PowerShell and reopen it (it picks up bun after install)
- **Keystore password wrong** → script will error; just re-run and type carefully
- **`gradlew.bat` not found** → run `bunx cap sync android` once manually, then re-run script

Paste any error you hit and I'll give you the exact fix.
