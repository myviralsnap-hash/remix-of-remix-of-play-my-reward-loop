import React from "react";
import { C } from "../theme";

export const Phone: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  return (
    <div style={{
      width: 540, height: 1100, borderRadius: 64,
      background: "#0a0503", padding: 14,
      boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 2px #2a1a10",
      ...style,
    }}>
      <div style={{
        width: "100%", height: "100%", borderRadius: 52,
        background: C.cream, overflow: "hidden", position: "relative",
      }}>
        <div style={{
          position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 28, borderRadius: 9999, background: "#0a0503", zIndex: 10,
        }} />
        {children}
      </div>
    </div>
  );
};
