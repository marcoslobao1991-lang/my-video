import React from "react";

// ─── Scale for 68% width layout (1312px available) ───────────
export const hScale = (px: number) => {
  if (px >= 150) return Math.round(px * 0.77);
  if (px >= 100) return Math.round(px * 0.88);
  return Math.round(px * 1.1);
};

// ─── T: text block with animation ───────────────────────────
export const T = ({
  children, size = 42, weight = 400, opacity = 1, color,
  className = "", style = {}, anim = "anim-fadeUp", delay = "",
}: {
  children: React.ReactNode; size?: number; weight?: number;
  opacity?: number; color?: string; className?: string;
  style?: React.CSSProperties; anim?: string; delay?: string;
}) => (
  <div className={`${anim} ${delay} ${className}`}
    style={{ fontSize: hScale(size), fontWeight: weight, opacity, color: color || "#ffffff", lineHeight: 1.3, ...style }}>
    {children}
  </div>
);

// ─── Spacer ─────────────────────────────────────────────────
export const Spacer = ({ h = 20 }: { h?: number }) => <div style={{ height: h }} />;

// ─── AccentLine ─────────────────────────────────────────────
export const AccentLine = ({ anim = "anim-fadeIn", delay = "", right = false }: { anim?: string; delay?: string; right?: boolean }) => (
  <div className={`${right ? "accent-line-r" : "accent-line"} ${anim} ${delay}`} />
);

// ─── HeadphoneSVG ───────────────────────────────────────────
export const HeadphoneSVG = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="anim-fadeUp">
    <path d="M16 44V40C16 26.745 26.745 16 40 16C53.255 16 64 26.745 64 40V44" stroke="#4ECDC4" strokeWidth="3" strokeLinecap="round"/>
    <rect x="10" y="44" width="12" height="20" rx="4" fill="#4ECDC4" fillOpacity=".25" stroke="#4ECDC4" strokeWidth="2"/>
    <rect x="58" y="44" width="12" height="20" rx="4" fill="#4ECDC4" fillOpacity=".25" stroke="#4ECDC4" strokeWidth="2"/>
  </svg>
);

// ─── WaveformBars ───────────────────────────────────────────
export const WaveformBars = () => {
  const heights = [20, 35, 50, 40, 55, 30, 45, 60, 38, 52, 28, 44, 56, 34, 48, 42, 58, 26, 46, 36];
  return (
    <div className="waveform">
      {heights.map((h, i) => (
        <div key={i} className="bar" style={{ height: h, opacity: 0.4 + (h / 60) * 0.6 }} />
      ))}
    </div>
  );
};
