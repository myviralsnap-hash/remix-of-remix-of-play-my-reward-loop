import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { TransitionSeries, springTiming, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { C, gradDark } from "./theme";
import { SceneLogo } from "./scenes/SceneLogo";
import { SceneMissions } from "./scenes/SceneMissions";
import { SceneGames } from "./scenes/SceneGames";
import { SceneStreak } from "./scenes/SceneStreak";
import { SceneRedeem } from "./scenes/SceneRedeem";
import { SceneEnd } from "./scenes/SceneEnd";

const FloatingDots = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const dots = Array.from({ length: 28 });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {dots.map((_, i) => {
        const seed = i * 137.5;
        const x = (seed % width);
        const baseY = ((seed * 1.7) % height);
        const drift = Math.sin((frame + i * 20) / 40) * 30;
        const op = 0.15 + (i % 3) * 0.08;
        const size = 4 + (i % 4) * 2;
        return (
          <div key={i} style={{
            position: "absolute", left: x, top: baseY + drift,
            width: size, height: size, borderRadius: 9999,
            background: i % 2 ? C.orangeBright : C.gold, opacity: op,
            filter: "blur(0.5px)",
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

export const MainVideo = () => {
  return (
    <AbsoluteFill style={{ background: gradDark }}>
      <FloatingDots />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={110}><SceneLogo /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
        <TransitionSeries.Sequence durationInFrames={120}><SceneMissions /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={130}><SceneGames /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })} />
        <TransitionSeries.Sequence durationInFrames={120}><SceneStreak /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
        <TransitionSeries.Sequence durationInFrames={120}><SceneRedeem /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
        <TransitionSeries.Sequence durationInFrames={130}><SceneEnd /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
