import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Sequence } from "remotion";
import {
  COLORS, GRADIENTS, SHADOWS, RADIUS, FONT,
  slideBase, labelStyle, heroTextStyle, subtitleStyle, accentLine, glowDot,
} from "./design";

// ─── Animated helpers ────────────────────────────────────────

const FadeUp: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0, children, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 100 } });
  return (
    <div style={{
      opacity: interpolate(progress, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
      ...style,
    }}>
      {children}
    </div>
  );
};

const ScaleIn: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0, children, style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 120 } });
  return (
    <div style={{
      opacity: interpolate(progress, [0, 1], [0, 1]),
      transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
      ...style,
    }}>
      {children}
    </div>
  );
};

// Fake waveform bars
const Waveform: React.FC<{ color?: string; bars?: number }> = ({ color = COLORS.teal, bars = 40 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 60 }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = 15 + Math.sin((frame * 0.15) + i * 0.8) * 20 + Math.cos((frame * 0.1) + i * 1.2) * 10;
        return (
          <div key={i} style={{
            width: 4,
            height: Math.max(4, h),
            backgroundColor: color,
            borderRadius: 2,
            opacity: 0.6 + Math.sin(i * 0.3) * 0.3,
            transition: "height 0.1s",
          }} />
        );
      })}
    </div>
  );
};

// ─── SLIDE 01: Logo / Title ──────────────────────────────────

export const Slide01_Logo: React.FC = () => {
  return (
    <AbsoluteFill style={slideBase}>
      {/* Subtle radial glow behind logo */}
      <div style={{
        position: "absolute",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.teal}08, transparent 70%)`,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }} />

      <FadeUp>
        <div style={{
          ...labelStyle,
          color: COLORS.teal,
          letterSpacing: 6,
          marginBottom: 24,
        }}>
          FLUENCY ROUTE APRESENTA
        </div>
      </FadeUp>

      <FadeUp delay={10}>
        <div style={{
          fontSize: 86,
          fontWeight: 800,
          color: COLORS.textPrimary,
          letterSpacing: -1,
          lineHeight: 1.1,
          textAlign: "center" as const,
        }}>
          INGLÊS
          <span style={{ color: COLORS.teal }}> CANTADO</span>
        </div>
      </FadeUp>

      <FadeUp delay={20}>
        <div style={{ ...accentLine(COLORS.teal, 80), marginTop: 32, marginBottom: 32 }} />
      </FadeUp>

      <FadeUp delay={28}>
        <div style={{
          ...subtitleStyle,
          fontSize: 22,
          maxWidth: 600,
        }}>
          O primeiro método de inglês construído
          <br />inteiramente em cima de música.
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

// ─── SLIDE 02: "Você conhece essa cena?" ─────────────────────

export const Slide02_CenaReal: React.FC = () => {
  return (
    <AbsoluteFill style={slideBase}>
      <FadeUp>
        <div style={{
          ...labelStyle,
          color: COLORS.textMuted,
          letterSpacing: 4,
          marginBottom: 40,
        }}>
          FRIENDS — S01E01
        </div>
      </FadeUp>

      <FadeUp delay={8}>
        <div style={{
          width: 800,
          height: 450,
          borderRadius: RADIUS.cardLarge,
          background: GRADIENTS.card(COLORS.red, 0.08),
          border: `1px solid rgba(255,107,107,0.12)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Play icon */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{
              width: 0,
              height: 0,
              borderTop: "14px solid transparent",
              borderBottom: "14px solid transparent",
              borderLeft: "22px solid white",
              marginLeft: 4,
            }} />
          </div>
          <div style={{
            marginTop: 20,
            fontSize: 15,
            fontWeight: 600,
            color: COLORS.textSecondary,
            letterSpacing: 1.5,
          }}>
            CENA ORIGINAL
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={18}>
        <div style={{
          ...subtitleStyle,
          marginTop: 40,
          fontSize: 24,
        }}>
          Você conhece essa cena.
          <br />Mas nunca ouviu ela <span style={{ color: COLORS.teal, fontWeight: 700 }}>assim</span>.
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

// ─── SLIDE 03: "Agora em música" — Waveform ─────────────────

export const Slide03_SerieCantada: React.FC = () => {
  return (
    <AbsoluteFill style={slideBase}>
      <FadeUp>
        <div style={{
          ...labelStyle,
          color: COLORS.teal,
          letterSpacing: 4,
          marginBottom: 20,
        }}>
          SÉRIE CANTADA
        </div>
      </FadeUp>

      <FadeUp delay={8}>
        <div style={{
          fontSize: 52,
          fontWeight: 800,
          color: COLORS.textPrimary,
          textAlign: "center" as const,
          lineHeight: 1.2,
          marginBottom: 48,
        }}>
          A mesma cena.
          <br />Transformada em <span style={{ color: COLORS.teal }}>música</span>.
        </div>
      </FadeUp>

      <FadeUp delay={16}>
        <div style={{
          background: GRADIENTS.tealCard,
          border: `1px solid rgba(78,205,196,0.12)`,
          borderRadius: RADIUS.card,
          padding: "36px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}>
          <Waveform />
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={glowDot()} />
            <div style={{
              fontSize: 15,
              fontWeight: 600,
              color: COLORS.teal,
              letterSpacing: 1,
            }}>
              Friends S01E01 — Cena 1
            </div>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={24}>
        <div style={{
          ...subtitleStyle,
          marginTop: 40,
          fontSize: 20,
        }}>
          Produção musical profissional. Diálogo real. Letra que gruda.
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

// ─── SLIDE 04: "Imagina ouvindo 40x" ────────────────────────

export const Slide04_Repeticao: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={slideBase}>
      {/* Big number background */}
      <div style={{
        position: "absolute",
        fontSize: 400,
        fontWeight: 900,
        color: COLORS.teal,
        opacity: 0.03,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -55%)",
        lineHeight: 1,
        fontFamily: FONT.family,
      }}>
        40×
      </div>

      <FadeUp>
        <div style={{
          ...labelStyle,
          color: COLORS.textMuted,
          letterSpacing: 4,
          marginBottom: 32,
        }}>
          REPETIÇÃO INVISÍVEL
        </div>
      </FadeUp>

      <ScaleIn delay={10}>
        <div style={{
          fontSize: 120,
          fontWeight: 900,
          color: COLORS.teal,
          letterSpacing: -3,
          lineHeight: 1,
          textShadow: `0 0 40px ${COLORS.teal}20`,
        }}>
          40×
        </div>
      </ScaleIn>

      <FadeUp delay={20}>
        <div style={{
          ...subtitleStyle,
          marginTop: 40,
          fontSize: 26,
          lineHeight: 1.8,
        }}>
          No trânsito. Na academia. Antes de dormir.
          <br />
          <span style={{ color: COLORS.textMuted }}>Não porque alguém mandou —</span>
          <br />
          <span style={{ color: COLORS.textPrimary, fontWeight: 700 }}>
            porque grudou na sua cabeça.
          </span>
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

// ─── SLIDE 05: "Quando a cena real tocar..." ─────────────────

export const Slide05_Resultado: React.FC = () => {
  return (
    <AbsoluteFill style={slideBase}>
      {/* Subtle teal glow */}
      <div style={{
        position: "absolute",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.teal}06, transparent 70%)`,
        bottom: -100,
        right: -100,
      }} />

      <FadeUp>
        <div style={{
          fontSize: 46,
          fontWeight: 800,
          color: COLORS.textPrimary,
          textAlign: "center" as const,
          lineHeight: 1.4,
          maxWidth: 900,
        }}>
          Quando a cena real tocar —
        </div>
      </FadeUp>

      <FadeUp delay={12}>
        <div style={{
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.teal,
          textAlign: "center" as const,
          lineHeight: 1.2,
          marginTop: 16,
          textShadow: `0 0 30px ${COLORS.teal}15`,
        }}>
          você entende tudo.
        </div>
      </FadeUp>

      <FadeUp delay={22}>
        <div style={{ ...accentLine(COLORS.teal, 80), marginTop: 48, marginBottom: 48 }} />
      </FadeUp>

      <FadeUp delay={28}>
        <div style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
        }}>
          {["Sem legenda", "Sem esforço", "Sem ter estudado"].map((text, i) => (
            <FadeUp key={text} delay={32 + i * 6}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}>
                <div style={accentLine(COLORS.teal, 16)} />
                <div style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: COLORS.textSecondary,
                  letterSpacing: 0.5,
                }}>
                  {text}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

// ─── COMPOSIÇÃO COM MOTION ───────────────────────────────────
// Cada slide dura 4s (120 frames a 30fps)

export const WowBlock: React.FC = () => {
  const SLIDE_DURATION = 120; // 4 seconds per slide

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={SLIDE_DURATION}>
        <Slide01_Logo />
      </Sequence>
      <Sequence from={SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
        <Slide02_CenaReal />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 2} durationInFrames={SLIDE_DURATION}>
        <Slide03_SerieCantada />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 3} durationInFrames={SLIDE_DURATION}>
        <Slide04_Repeticao />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 4} durationInFrames={SLIDE_DURATION}>
        <Slide05_Resultado />
      </Sequence>
    </AbsoluteFill>
  );
};
