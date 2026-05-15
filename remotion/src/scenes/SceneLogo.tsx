import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Sora";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";
import { C } from "../theme";

const display = loadDisplay("normal", { weights: ["800", "900"] }).fontFamily;
const body = loadBody("normal", { weights: ["500", "700"] }).fontFamily;

export const SceneLogo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const iconScale = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const iconRot = interpolate(frame, [0, 60], [-30, 0], { extrapolateRight: "clamp" });
  const titleY = interpolate(spring({ frame: frame - 20, fps, config: { damping: 18 } }), [0, 1], [40, 0]);
  const titleOp = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });
  const tagOp = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" });
  const glow = 0.4 + Math.sin(frame / 8) * 0.15;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: display }}>
      <div style={{
        width: 360, height: 360, marginBottom: 60,
        transform: `scale(${iconScale}) rotate(${iconRot}deg)`,
        filter: `drop-shadow(0 0 80px rgba(245,158,11,${glow}))`,
      }}>
        <Img src={staticFile("images/icon.png")} style={{ width: "100%", height: "100%", borderRadius: 80 }} />
      </div>
      <div style={{
        fontSize: 110, fontWeight: 900, color: C.cream, letterSpacing: -3,
        transform: `translateY(${titleY}px)`, opacity: titleOp,
      }}>
        Reward<span style={{ color: C.orangeBright }}>Loop</span>
      </div>
      <div style={{
        marginTop: 24, fontFamily: body, fontWeight: 500,
        fontSize: 36, color: C.cream, opacity: tagOp * 0.7, letterSpacing: 6,
      }}>
        PLAY · EARN · REDEEM
      </div>
    </AbsoluteFill>
  );
};
