import React from "react";

export const IconSpin: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

export const IconTrivia: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7v.5" />
    <circle cx="12" cy="17.5" r="0.5" fill={color} />
  </svg>
);

export const IconTapDash: React.FC<{ size?: number; color?: string }> = ({ size = 80, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  </svg>
);

export const IconFlame: React.FC<{ size?: number }> = ({ size = 280 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <radialGradient id="fl" cx="50%" cy="65%" r="55%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#fbbf24" />
        <stop offset="70%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#7c2d12" />
      </radialGradient>
    </defs>
    <path fill="url(#fl)" d="M50 8 C 56 22, 72 28, 72 48 C 72 68, 60 82, 50 92 C 40 82, 28 68, 28 48 C 28 32, 38 28, 44 18 C 46 24, 50 24, 50 8 Z" />
    <path fill="#fef9c3" opacity="0.8" d="M50 50 C 53 56, 60 60, 60 70 C 60 80, 55 86, 50 90 C 45 86, 40 80, 40 70 C 40 62, 46 60, 50 50 Z" />
  </svg>
);

export const IconGift: React.FC<{ size?: number; color?: string }> = ({ size = 60, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M3 11h18v10H3z" opacity="0.95" />
    <path d="M2 7h20v4H2z" />
    <path d="M11 7h2v14h-2z" opacity="0.7" />
    <path d="M12 7s-3-5-6-3 2 3 6 3z M12 7s3-5 6-3-2 3-6 3z" stroke={color} strokeWidth="0.5" />
  </svg>
);

export const IconPlay: React.FC<{ size?: number; color?: string }> = ({ size = 56, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M6 4l14 8-14 8z" />
  </svg>
);
