import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Sora";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";
import { C } from "../theme";

const display = loadDisplay("normal", { weights: ["800"] }).fontFamily;
const body = loadBody("normal", { weights: ["500", "700"] }).fontFamily;

const cards = [
  { name: "Amazon", emoji: "📦", color: "#FF9900" },
  { name: "Visa", emoji: "💳", color: "#1A1F71" },
  { name: "PayPal", emoji: "💰", color: "#003087" },
  { name: "Apple", emoji: "🍎", color: "#1c1917" },
];

export const SceneRedeem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const points = Math.floor(interpolate(frame, [10, 50], [2480, 5000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: display, padding: 60 }}>
      <div style={{
        fontSize: 84, fontWeight: 800, color: C.cream, letterSpacing: -2,
        textAlign: "center", lineHeight: 1.05, opacity: headOp, marginBottom: 30,
      }}>
        Redeem for <span style={{ color: C.orangeBright }}>real rewards.</span>
      </div>

      <div style={{
        marginTop: 20, padding: "30px 70px", borderRadius: 9999,
        background: `linear-gradient(135deg, ${C.orangeBright}, ${C.orangeDeep})`,
        boxShadow: "0 24px 50px rgba(234,88,12,0.5)",
        opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 26, color: "rgba(255,255,255,0.85)", letterSpacing: 3 }}>
          YOUR BALANCE
        </div>
        <div style={{ fontSize: 110, fontWeight: 800, color: "#fff", letterSpacing: -3, lineHeight: 1, marginTop: 6 }}>
          {points.toLocaleString()} <span style={{ fontSize: 50 }}>pts</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26, marginTop: 80, width: 880 }}>
        {cards.map((c, i) => {
          const sp = spring({ frame: frame - 40 - i * 8, fps, config: { damping: 16 } });
          return (
            <div key={i} style={{
              padding: 32, borderRadius: 28, background: c.color, color: "#fff",
              transform: `scale(${sp}) rotate(${(i % 2 ? 1 : -1) * (1 - sp) * 10}deg)`, opacity: sp,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              display: "flex", alignItems: "center", gap: 20,
            }}>
              <div style={{ fontSize: 64 }}>{c.emoji}</div>
              <div>
                <div style={{ fontFamily: body, fontSize: 22, opacity: 0.7, fontWeight: 500 }}>Gift Card</div>
                <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1 }}>{c.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
