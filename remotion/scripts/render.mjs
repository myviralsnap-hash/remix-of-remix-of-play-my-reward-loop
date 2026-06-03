import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// libfdk_aac unavailable in sandbox ffmpeg; always render muted, mux audio post-step if needed
const hasMusic = false;

const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (config) => config,
});

const browser = await openBrowser("chrome", {
  browserExecutable: process.env.PUPPETEER_EXECUTABLE_PATH ?? "/bin/chromium",
  chromiumOptions: { args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] },
  chromeMode: "chrome-for-testing",
});

const composition = await selectComposition({
  serveUrl: bundled, id: "main", puppeteerInstance: browser,
});

await renderMedia({
  composition, serveUrl: bundled, codec: "h264",
  outputLocation: "/mnt/documents/rewardloop-promo-v2.mp4",
  puppeteerInstance: browser,
  muted: !hasMusic,
  concurrency: 1,
});

await browser.close({ silent: false });
console.log("DONE");
