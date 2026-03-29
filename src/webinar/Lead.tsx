import {
  AbsoluteFill,
  Video,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";
import { COLORS, FONT } from "./design";

// ─── Timing constants (in frames at 30fps) ───────────────────
const FPS = 30;

// Part 1: App music playing (trimmed to ~25s for the lead)
const MUSIC_START = 0;
const MUSIC_DURATION = 25 * FPS; // 750 frames

// Part 2: Real scene playing (~15s)
const SCENE_START = MUSIC_DURATION;
const SCENE_DURATION = 15 * FPS; // 450 frames

// Part 3: VSL talk with slides (~85s)
const VSL_START = SCENE_START + SCENE_DURATION;
const VSL_DURATION = 85 * FPS; // 2550 frames

const TOTAL = VSL_START + VSL_DURATION;

// ─── Animated text helpers ───────────────────────────────────

const FadeUp: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  return (
    <div
      style={{
        opacity: interpolate(progress, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(progress, [0, 1], [24, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── Part 1: App recording — music playing ───────────────────

const AppMusicSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in from black
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  // Fade out to black at the end
  const fadeOut = interpolate(
    frame,
    [MUSIC_DURATION - 30, MUSIC_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* App recording centered — vertical video in horizontal frame */}
      <div
        style={{
          opacity: fadeIn * fadeOut,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: `0 0 60px rgba(78,205,196,0.08)`,
          border: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        <Video
          src={staticFile("app_musica.mp4")}
          startFrom={30 * FPS} // Start from 30s in — skip initial navigation, jump to music playing
          style={{
            height: 900,
            width: "auto",
          }}
        />
      </div>

      {/* Subtle label */}
      <FadeUp delay={30}>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 4,
            color: COLORS.teal,
            textTransform: "uppercase",
            fontFamily: FONT.family,
            opacity: fadeOut,
          }}
        >
          SÉRIE CANTADA — FRIENDS S01E01
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

// ─── Part 2: App recording — real scene ──────────────────────

const RealSceneSection: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [SCENE_DURATION - 30, SCENE_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: fadeIn * fadeOut,
          borderRadius: 20,
          overflow: "hidden",
          border: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        <Video
          src={staticFile("app_cena.mp4")}
          style={{
            height: 900,
            width: "auto",
          }}
        />
      </div>

      <FadeUp delay={10}>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 4,
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            fontFamily: FONT.family,
            opacity: fadeOut,
          }}
        >
          CENA ORIGINAL — FRIENDS S01E01
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};

// ─── Part 3: VSL talk + slides ───────────────────────────────

// VSL segments with slide visuals synced to speech
// Timestamps from Whisper (relative to VSL start)
const VSL_SEGMENTS: Array<{
  start: number; // seconds into VSL
  end: number;
  visual: "none" | "40x" | "serie_cantada" | "institutions" | "repetition" | "music" | "goals" | "intro";
  text?: string;
}> = [
  { start: 0, end: 3, visual: "none" }, // "Você acabou de ouvir..."
  { start: 3, end: 4.4, visual: "none" }, // "Você ouviu uma única vez"
  { start: 4.8, end: 14.4, visual: "40x" }, // "30, 40 vezes... grudou"
  { start: 14.7, end: 22, visual: "none" }, // "entender tudo, sem legenda"
  { start: 22.3, end: 28.7, visual: "serie_cantada" }, // "Isso é uma série cantada"
  { start: 29.2, end: 38.1, visual: "none" }, // "estruturas... milhares"
  { start: 38.3, end: 48.3, visual: "institutions" }, // "Johns Hopkins, McGill..."
  { start: 48.5, end: 58.1, visual: "repetition" }, // "repetição"
  { start: 58.1, end: 66.3, visual: "music" }, // "a música"
  { start: 66.6, end: 82.8, visual: "goals" }, // "multinacional, entrevista..."
  { start: 83.1, end: 85, visual: "intro" }, // "deixa eu me apresentar"
];

const SlideOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const activeSegment = VSL_SEGMENTS.find(
    (s) => currentTime >= s.start && currentTime < s.end
  );
  const visual = activeSegment?.visual || "none";

  const fadeProgress = (delay: number) =>
    spring({
      frame: frame - delay * fps,
      fps,
      config: { damping: 20, stiffness: 100 },
    });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT.family,
      }}
    >
      {/* 40× */}
      {visual === "40x" && (
        <FadeUp>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 200,
                fontWeight: 900,
                color: COLORS.teal,
                lineHeight: 1,
                textShadow: `0 0 60px ${COLORS.teal}25`,
                letterSpacing: -5,
              }}
            >
              40×
            </div>
          </div>
        </FadeUp>
      )}

      {/* SÉRIE CANTADA */}
      {visual === "serie_cantada" && (
        <FadeUp>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 5,
                color: COLORS.teal,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ISSO É UMA
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: COLORS.textPrimary,
                lineHeight: 1.1,
              }}
            >
              SÉRIE
              <br />
              <span style={{ color: COLORS.teal }}>CANTADA</span>
            </div>
          </div>
        </FadeUp>
      )}

      {/* Institutions */}
      {visual === "institutions" && (
        <FadeUp>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            {["JOHNS HOPKINS", "McGILL", "STANFORD", "MIT"].map(
              (name, i) => (
                <FadeUp key={name} delay={activeSegment!.start + i * 0.4}>
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 800,
                      color: COLORS.textPrimary,
                      letterSpacing: 2,
                      lineHeight: 1.4,
                    }}
                  >
                    {name}
                  </div>
                </FadeUp>
              )
            )}
            <div
              style={{
                width: 60,
                height: 3,
                backgroundColor: COLORS.teal,
                borderRadius: 2,
                marginTop: 8,
              }}
            />
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 3,
                color: COLORS.textMuted,
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              VALIDADO HÁ DÉCADAS
            </div>
          </div>
        </FadeUp>
      )}

      {/* REPETIÇÃO */}
      {visual === "repetition" && (
        <FadeUp>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: COLORS.textPrimary,
                letterSpacing: 3,
              }}
            >
              REPETIÇÃO
            </div>
            <div
              style={{
                width: 60,
                height: 3,
                backgroundColor: COLORS.teal,
                borderRadius: 2,
                margin: "20px auto",
              }}
            />
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: COLORS.textSecondary,
              }}
            >
              a única coisa capaz de instalar fluência
            </div>
          </div>
        </FadeUp>
      )}

      {/* A MÚSICA */}
      {visual === "music" && (
        <FadeUp>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 90,
                fontWeight: 900,
                color: COLORS.teal,
                letterSpacing: 2,
                textShadow: `0 0 40px ${COLORS.teal}20`,
              }}
            >
              A MÚSICA
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: COLORS.textMuted,
                marginTop: 16,
              }}
            >
              como ferramenta de repetição
            </div>
          </div>
        </FadeUp>
      )}

      {/* Goals list */}
      {visual === "goals" && (
        <FadeUp>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            {[
              "Trabalhar numa multinacional",
              "Passar em qualquer entrevista",
              "Assistir séries sem legenda",
              "Curtir viagens internacionais",
              "Arrumar emprego fora",
            ].map((goal, i) => (
              <FadeUp key={goal} delay={activeSegment!.start + i * 0.6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 3,
                      backgroundColor: COLORS.teal,
                      borderRadius: 2,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 600,
                      color: COLORS.textPrimary,
                    }}
                  >
                    {goal}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
      )}

      {/* "Deixa eu me apresentar" — transition */}
      {visual === "intro" && (
        <div
          style={{
            opacity: interpolate(
              frame - activeSegment!.start * fps,
              [0, 15],
              [0, 1],
              { extrapolateRight: "clamp" }
            ),
          }}
        >
          <div
            style={{
              width: 60,
              height: 3,
              backgroundColor: COLORS.teal,
              borderRadius: 2,
            }}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};

const VSLSection: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in from black
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Slides area (85% left) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "85%",
          height: "100%",
          opacity: fadeIn,
        }}
      >
        <SlideOverlay />
      </div>

      {/* You in the corner (15% right) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "15%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            borderLeft: `1px solid ${COLORS.cardBorder}`,
          }}
        >
          <Video
            src={staticFile("vsl_lead.mp4")}
            style={{
              height: "100%",
              width: "auto",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── FULL LEAD COMPOSITION ───────────────────────────────────

export const LeadComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Part 1: App music */}
      <Sequence from={MUSIC_START} durationInFrames={MUSIC_DURATION}>
        <AppMusicSection />
      </Sequence>

      {/* Part 2: Real scene */}
      <Sequence from={SCENE_START} durationInFrames={SCENE_DURATION}>
        <RealSceneSection />
      </Sequence>

      {/* Part 3: VSL + slides */}
      <Sequence from={VSL_START} durationInFrames={VSL_DURATION}>
        <VSLSection />
      </Sequence>
    </AbsoluteFill>
  );
};
