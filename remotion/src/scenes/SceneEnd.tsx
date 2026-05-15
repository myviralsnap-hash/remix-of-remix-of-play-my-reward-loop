import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Sora";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";
import { C } from "../theme";

const display = loadDisplay("normal", { weights: ["800"] }).fontFamily;
const body = loadBody("normal", { weights: ["500", "700"] }).fontFamily;

export const SceneEnd = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const iconSp = spring({ frame, fps, config: { damping: 12, stiffness: 110 } });
  const titleOp = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });
  const tagOp = interpolate(frame, [35, 60], [0, 1], { extrapolateRight: "clamp" });
  const badgeSp = spring({ frame: frame - 55, fps, config: { damping: 14 } });
  const glow = 0.4 + Math.sin(frame / 6) * 0.2;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: display }}>
      <div style={{
        width: 320, height: 320, transform: `scale(${iconSp})`,
        filter: `drop-shadow(0 0 80px rgba(245,158,11,${glow}))`, marginBottom: 50,
      }}>
        <Img src={staticFile("images/icon.png")} style={{ width: "100%", height: "100%", borderRadius: 72 }} />
      </div>
      <div style={{
        fontSize: 130, fontWeight: 800, color: C.cream, letterSpacing: -4, opacity: titleOp,
      }}>
        Reward<span style={{ color: C.orangeBright }}>Loop</span>
      </div>
      <div style={{
        fontFamily: body, fontWeight: 700, fontSize: 40, color: C.cream, opacity: tagOp * 0.85,
        marginTop: 20, letterSpacing: 6,
      }}>
        PLAY · EARN · REDEEM
      </div>
      <div style={{
        marginTop: 80, padding: "26px 60px", borderRadius: 9999,
        background: "#000", color: "#fff", display: "flex", alignItems: "center", gap: 20,
        transform: `scale(${badgeSp})`, opacity: badgeSp,
        boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
      }}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="#fff"><path d="M6 4l14 8-14 8z" /></svg>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: body, fontSize: 22, opacity: 0.8 }}>GET IT ON</div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>Google Play</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
