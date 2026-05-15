import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Sora";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";
import { C } from "../theme";
import { Phone } from "../components/Phone";

const display = loadDisplay("normal", { weights: ["800", "900"] }).fontFamily;
const body = loadBody("normal", { weights: ["500", "700"] }).fontFamily;

const missions = [
  { title: "Daily Login", reward: "+50", done: true },
  { title: "Watch a Featured Video", reward: "+100", done: true },
  { title: "Play Trivia (3 rounds)", reward: "+150", done: false },
  { title: "Spin the Wheel", reward: "+75", done: false },
];

export const SceneMissions = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headlineY = interpolate(spring({ frame, fps, config: { damping: 18 } }), [0, 1], [-40, 0]);
  const headlineOp = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const phoneSp = spring({ frame: frame - 10, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 140, fontFamily: display }}>
      <div style={{
        fontSize: 84, fontWeight: 900, color: C.cream, letterSpacing: -2,
        transform: `translateY(${headlineY}px)`, opacity: headlineOp, textAlign: "center", lineHeight: 1.05,
      }}>
        Daily missions,<br /><span style={{ color: C.orangeBright }}>real points.</span>
      </div>
      <div style={{ marginTop: 80, transform: `translateY(${(1 - phoneSp) * 200}px)`, opacity: phoneSp }}>
        <Phone>
          <div style={{ padding: "80px 32px 32px", fontFamily: body }}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 38, color: C.ink, marginBottom: 6 }}>
              Today's Missions
            </div>
            <div style={{ fontSize: 22, color: "#78716c", marginBottom: 28 }}>2 of 4 complete</div>
            <div style={{ height: 14, background: "#fde6c8", borderRadius: 9999, overflow: "hidden", marginBottom: 32 }}>
              <div style={{
                width: `${interpolate(frame, [30, 70], [0, 50], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                height: "100%", background: `linear-gradient(90deg, ${C.orangeBright}, ${C.orangeDeep})`,
              }} />
            </div>
            {missions.map((m, i) => {
              const sp = spring({ frame: frame - 30 - i * 8, fps, config: { damping: 18 } });
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 18, padding: "22px 22px",
                  background: m.done ? "#fff" : "#fff", borderRadius: 22, marginBottom: 14,
                  boxShadow: "0 4px 14px rgba(245,158,11,0.12)",
                  transform: `translateX(${(1 - sp) * 60}px)`, opacity: sp,
                  border: `2px solid ${m.done ? "#fde6c8" : "transparent"}`,
                }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 9999,
                    background: m.done ? C.green : "#fde6c8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 900, fontSize: 26,
                  }}>{m.done ? "✓" : ""}</div>
                  <div style={{ flex: 1, fontWeight: 700, fontSize: 24, color: C.ink }}>{m.title}</div>
                  <div style={{
                    background: `linear-gradient(135deg, ${C.orangeBright}, ${C.orangeDeep})`,
                    color: "#fff", padding: "8px 16px", borderRadius: 9999,
                    fontWeight: 800, fontSize: 22, fontFamily: display,
                  }}>{m.reward}</div>
                </div>
              );
            })}
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};
