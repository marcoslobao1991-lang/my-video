// ─── Webinar Slides Design System ─────────────────────────────
// Extraído do app Inglês Cantado — premium dark theme

export const COLORS = {
  bg: "#0A0A0A",
  card: "#111111",
  cardBorder: "rgba(255,255,255,0.04)",
  cardBorderHover: "rgba(255,255,255,0.08)",

  teal: "#4ECDC4",
  purple: "#A78BFA",
  yellow: "#FBBF24",
  red: "#FF6B6B",
  blue: "#3b82f6",

  textPrimary: "#ffffff",
  textSecondary: "rgba(255,255,255,0.5)",
  textMuted: "rgba(255,255,255,0.3)",
  textDim: "rgba(255,255,255,0.15)",
} as const;

export const GRADIENTS = {
  cta: "linear-gradient(135deg, #4ECDC4, #A78BFA)",
  card: (color: string, opacity = 0.06) =>
    `linear-gradient(145deg, ${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}, rgba(255,255,255,0.01))`,
  tealCard: "linear-gradient(145deg, rgba(78,205,196,0.06), rgba(255,255,255,0.01))",
  purpleCard: "linear-gradient(145deg, rgba(167,139,250,0.06), rgba(255,255,255,0.01))",
  redCard: "linear-gradient(145deg, rgba(255,107,107,0.08), rgba(255,255,255,0.01))",
  yellowCard: "linear-gradient(145deg, rgba(251,191,36,0.06), rgba(255,255,255,0.01))",
  progress: "linear-gradient(90deg, #4ECDC4, #A78BFA)",
} as const;

export const SHADOWS = {
  glow: (color: string) => `0 4px 20px ${color}30`,
  tealGlow: "0 4px 20px rgba(78,205,196,0.25)",
  purpleGlow: "0 4px 20px rgba(167,139,250,0.25)",
  subtle: "0 2px 12px rgba(0,0,0,0.5)",
} as const;

export const RADIUS = {
  card: 14,
  cardLarge: 20,
  button: 25,
  small: 8,
} as const;

export const FONT = {
  family: "'DM Sans', -apple-system, sans-serif",
  heroSize: 72,
  titleSize: 48,
  subtitleSize: 28,
  bodySize: 20,
  labelSize: 13,
  microSize: 11,
} as const;

// ─── Reusable styles ──────────────────────────────────────────

export const slideBase: React.CSSProperties = {
  backgroundColor: COLORS.bg,
  fontFamily: FONT.family,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "80px 120px",
  position: "relative",
  overflow: "hidden",
};

export const cardStyle: React.CSSProperties = {
  background: GRADIENTS.tealCard,
  border: `1px solid ${COLORS.cardBorder}`,
  borderRadius: RADIUS.card,
  padding: "32px 40px",
};

export const labelStyle: React.CSSProperties = {
  fontSize: FONT.labelSize,
  fontWeight: 700,
  letterSpacing: 2.5,
  textTransform: "uppercase" as const,
  color: COLORS.textSecondary,
};

export const heroTextStyle: React.CSSProperties = {
  fontSize: FONT.heroSize,
  fontWeight: 800,
  color: COLORS.textPrimary,
  letterSpacing: -1,
  lineHeight: 1.1,
};

export const subtitleStyle: React.CSSProperties = {
  fontSize: FONT.subtitleSize,
  fontWeight: 500,
  color: COLORS.textSecondary,
  lineHeight: 1.6,
  textAlign: "center" as const,
  maxWidth: 800,
};

export const accentLine = (color = COLORS.teal, width = 60): React.CSSProperties => ({
  width,
  height: 3,
  backgroundColor: color,
  borderRadius: 2,
});

export const glowDot = (color = COLORS.teal): React.CSSProperties => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: color,
  boxShadow: `0 0 12px ${color}60`,
});
