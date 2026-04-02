import React, { createContext, useContext } from "react";
import { AbsoluteFill, Audio, Video, useCurrentFrame, staticFile } from "remotion";
import { SLIDE_TIMELINE, FPS } from "./timeline";
import { LEAD_ZOOM_MAP } from "./leadZoom";
import { REST_ZOOM_MAP } from "./restZoom";
import { GRAPH_SLIDES, GraphModeProvider } from "./GraphSlides";
import { getVisibleStackItems } from "./stackTimings";

// ─── Time context for stack sync ────────────────────────────
const TimeContext = createContext(0);
const useVSLTime = () => useContext(TimeContext);
function useStackVisible(slide: number, itemIndex: number): boolean {
  const time = useVSLTime();
  return itemIndex < getVisibleStackItems(slide, time);
}

// ─── Zoom: breath-synced alternating 1.0 ↔ 1.08 (entire VSL) ──
function getVideoZoom(timeInSeconds: number): number {
  const map = timeInSeconds < 84.6 ? LEAD_ZOOM_MAP : REST_ZOOM_MAP;
  let zoom = 1.0;
  for (const entry of map) {
    if (timeInSeconds >= entry.t) zoom = entry.z;
  }
  return zoom;
}

// ─── Design DNA ─────────────────────────────────────────────
const C = {
  bg: "#0A0A0A",
  teal: "#4ECDC4",
  purple: "#A78BFA",
  yellow: "#FBBF24",
  red: "#FF6B6B",
  white: "#fff",
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}

@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
@keyframes blurIn{from{opacity:0;filter:blur(12px)}to{opacity:1;filter:blur(0)}}
@keyframes slideLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
@keyframes gradMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes lineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}

.anim-fadeUp{animation:fadeUp .7s ease both;}
.anim-blurIn{animation:blurIn .8s ease both;}
.anim-scaleIn{animation:scaleIn .7s ease both;}
.anim-slideLeft{animation:slideLeft .7s ease both;}
.anim-slideRight{animation:slideRight .7s ease both;}
.anim-fadeIn{animation:fadeIn .6s ease both;}
.fg{animation:lineGrow .8s cubic-bezier(.16,1,.3,1) both;transform-origin:left}

.d1{animation-delay:.1s}.d2{animation-delay:.25s}.d3{animation-delay:.4s}
.d4{animation-delay:.55s}.d5{animation-delay:.7s}.d6{animation-delay:.85s}.d7{animation-delay:1s}.d8{animation-delay:1.15s}

.gradient-text{background:linear-gradient(135deg,#4ECDC4,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gradient-animated{background:linear-gradient(135deg,#4ECDC4,#A78BFA,#4ECDC4);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradMove 3s ease infinite}
.teal{color:#4ECDC4}
.purple{color:#A78BFA}
.red{color:#FF6B6B}
.dim{opacity:.35}
.dim2{opacity:.2}
.dim3{opacity:.55}
.bold{font-weight:700;color:#fff}

.accent-line{width:48px;height:3px;background:linear-gradient(90deg,#4ECDC4,#A78BFA);border-radius:2px;margin-bottom:20px}
.accent-line-r{width:48px;height:3px;background:linear-gradient(90deg,#4ECDC4,#A78BFA);border-radius:2px;margin-bottom:20px;margin-left:auto}

.glow-teal-text{text-shadow:0 0 40px rgba(78,205,196,.4),0 0 80px rgba(78,205,196,.15)}
.glow-red-text{text-shadow:0 0 40px rgba(255,107,107,.4),0 0 80px rgba(255,107,107,.15)}
.glow-gradient-text{filter:drop-shadow(0 0 30px rgba(78,205,196,.3)) drop-shadow(0 0 60px rgba(167,139,250,.2))}

.strike-line{position:absolute;left:-4%;top:50%;width:108%;height:3px;background:#FF6B6B;transform:rotate(-4deg);border-radius:2px}

.card{background:linear-gradient(145deg,rgba(78,205,196,.06),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.04);border-radius:16px;padding:40px}

.cta-btn{display:inline-block;padding:20px 56px;border-radius:14px;background:linear-gradient(135deg,#4ECDC4,#A78BFA);font-size:28px;font-weight:700;color:#fff;letter-spacing:1px;text-transform:uppercase;box-shadow:0 0 40px rgba(78,205,196,.25),0 0 80px rgba(167,139,250,.15)}

.glow-teal{position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(78,205,196,.08),transparent 70%);pointer-events:none;filter:blur(80px)}
.glow-purple{position:absolute;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.07),transparent 70%);pointer-events:none;filter:blur(80px)}
.glow-red{position:absolute;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,107,.07),transparent 70%);pointer-events:none;filter:blur(80px)}

.waveform{display:flex;align-items:flex-end;gap:3px;height:60px}
.waveform .bar{width:4px;background:#4ECDC4;border-radius:2px}

.double-glow{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.double-glow::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(78,205,196,.1),transparent 70%);top:20%;left:20%;filter:blur(100px)}
.double-glow::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.08),transparent 70%);bottom:20%;right:20%;filter:blur(100px)}

/* Slides occupy LEFT 68% (1312px) — right 32% reserved for vertical video overlay */
.slide{display:flex;flex-direction:column;justify-content:center;width:68%;height:100%;padding:60px 40px 60px 60px;position:relative;overflow:hidden;background:#0A0A0A;color:#ffffff}
.slide.center{align-items:center;text-align:center}
.slide.left{align-items:flex-start;text-align:left;padding:60px 40px 60px 80px}
.slide.right{align-items:flex-end;text-align:right;padding:60px 40px 60px 60px}
`;

// ─── Helper: get current slide index based on frame ──────────
function getCurrentSlide(frame: number): number {
  const timeInSeconds = frame / FPS;
  let currentSlide = 0;
  for (const entry of SLIDE_TIMELINE) {
    if (timeInSeconds >= entry.startTime) {
      currentSlide = entry.slide;
    }
  }
  return currentSlide;
}

// ─── Scale for 68% width layout (1312px available) ───────────
// Only huge text needs reduction, body stays
const hScale = (px: number) => {
  if (px >= 150) return Math.round(px * 0.7);   // 220→154, 180→126, 150→105
  if (px >= 100) return Math.round(px * 0.8);   // 120→96, 100→80
  return px; // 90 and below stays
};

// ─── Helper tiny components ──────────────────────────────────
const T = ({
  children,
  size = 42,
  weight = 400,
  opacity = 1,
  color,
  className = "",
  style = {},
  anim = "anim-fadeUp",
  delay = "",
}: {
  children: React.ReactNode;
  size?: number;
  weight?: number;
  opacity?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  anim?: string;
  delay?: string;
}) => (
  <div
    className={`${anim} ${delay} ${className}`}
    style={{
      fontSize: hScale(size),
      fontWeight: weight,
      opacity,
      color: color || "#ffffff",
      lineHeight: 1.3,
      ...style,
    }}
  >
    {children}
  </div>
);

const Spacer = ({ h = 20 }: { h?: number }) => <div style={{ height: h }} />;

const AccentLine = ({ anim = "anim-fadeIn", delay = "", right = false }: { anim?: string; delay?: string; right?: boolean }) => (
  <div className={`${right ? "accent-line-r" : "accent-line"} ${anim} ${delay}`} />
);

const HeadphoneSVG = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="anim-fadeUp">
    <path d="M16 44V40C16 26.745 26.745 16 40 16C53.255 16 64 26.745 64 40V44" stroke="#4ECDC4" strokeWidth="3" strokeLinecap="round"/>
    <rect x="10" y="44" width="12" height="20" rx="4" fill="#4ECDC4" fillOpacity=".25" stroke="#4ECDC4" strokeWidth="2"/>
    <rect x="58" y="44" width="12" height="20" rx="4" fill="#4ECDC4" fillOpacity=".25" stroke="#4ECDC4" strokeWidth="2"/>
  </svg>
);

const WaveformBars = () => {
  const heights = [20, 35, 50, 40, 55, 30, 45, 60, 38, 52, 28, 44, 56, 34, 48, 42, 58, 26, 46, 36];
  return (
    <div className="waveform">
      {heights.map((h, i) => (
        <div key={i} className="bar" style={{ height: h, opacity: 0.4 + (h / 60) * 0.6 }} />
      ))}
    </div>
  );
};

// ─── ALL 258 SLIDES ──────────────────────────────────────────
const SLIDE_REGISTRY = new Map<number, () => JSX.Element>();  // S0 — moved to VSLSlides_unused.tsx  // S1 — moved to VSLSlides_unused.tsx

  // 3 — Você acabou de ouvir (audio: "Você acabou de ouvir uma cena de Friends")
  SLIDE_REGISTRY.set(2, () => (
    <div className="slide left">
      <div className="glow-teal" style={{ top: "25%", left: "-5%" }} />
      <T size={48} weight={400} opacity={0.7} anim="anim-slideLeft">
        Voce acabou de ouvir uma cena de <span className="teal" style={{ fontWeight: 700 }}>Friends</span>.
      </T>
    </div>
  ));

  // 4 — So que nao do jeito (audio: "só que não do jeito que você tá acostumado")
  SLIDE_REGISTRY.set(3, () => (
    <div className="slide right">
      <T size={48} weight={400} opacity={0.5} anim="anim-slideRight">
        So que nao do jeito que voce ta <span className="bold">acostumado</span>.
      </T>
    </div>
  ));

  // 5 — Uma unica vez (audio: "Você ouviu isso uma única vez")
  SLIDE_REGISTRY.set(4, () => (
    <div className="slide center">
      <T size={52} weight={400} opacity={0.7} anim="anim-fadeUp">
        Voce ouviu isso <span className="gradient-animated" style={{ fontWeight: 700 }}>uma unica vez</span>.
      </T>
    </div>
  ));

  // 6 — Agora imagina (audio: "Agora imagina você ouvindo isso")
  SLIDE_REGISTRY.set(5, () => (
    <div className="slide center">
      <T size={42} weight={400} opacity={0.3} anim="anim-blurIn">Agora imagina ouvindo isso</T>
    </div>
  ));

  // S6 DELETED — duplicate of S5

  // 8 — 30x / 40x (audio: "30, 40 vezes" — now @ 5.70s, synced!)
  SLIDE_REGISTRY.set(7, () => (
    <div className="slide center">
      <div style={{ position: "absolute", fontSize: 300, fontWeight: 900, color: "rgba(78,205,196,.02)", pointerEvents: "none" }} className="anim-fadeIn">40</div>
      <T size={60} weight={700} color="rgba(78,205,196,.3)" anim="anim-scaleIn">30x</T>
      <Spacer h={16} />
      <T size={hScale(220)} weight={900} color="#4ECDC4" anim="anim-scaleIn" delay="d2" className="glow-teal-text">40x</T>
    </div>
  ));

  // 9 — No transito / Na academia / Antes de dormir — stack synced (now @ 7.00s!)
  SLIDE_REGISTRY.set(8, () => {
    const v = [useStackVisible(9, 0), useStackVisible(9, 1), useStackVisible(9, 2)];
    return (
      <div className="slide left">
        {v[0] && <T size={44} weight={500} opacity={0.3} anim="anim-slideLeft" style={{ paddingLeft: 0 }}>No transito.</T>}
        {v[0] && <Spacer h={12} />}
        {v[1] && <T size={44} weight={500} opacity={0.4} anim="anim-slideLeft" style={{ paddingLeft: 30 }}>Na academia.</T>}
        {v[1] && <Spacer h={12} />}
        {v[2] && <T size={44} weight={500} opacity={0.55} anim="anim-slideLeft" style={{ paddingLeft: 60 }}>Antes de dormir.</T>}
      </div>
    );
  });

  // 10 — Grudou (audio: "grudou na sua cabeça, igual aquela música" — now @ 11.70s!)
  SLIDE_REGISTRY.set(9, () => (
    <div className="slide center">
      <T size={52} weight={500}>
        Porque <span className="gradient-animated" style={{ fontWeight: 700 }}>grudou</span> na sua cabeca.
      </T>
      <Spacer h={20} />
      <T size={28} opacity={0.25} anim="anim-fadeUp" delay="d2">
        Igual aquela musica que voce nao consegue parar de cantar.
      </T>
    </div>
  ));

  // 11 — Cena real tocasse (audio: "O que aconteceria quando a cena real tocasse?" — now @ 14.80s!)
  SLIDE_REGISTRY.set(10, () => (
    <div className="slide center">
      <T size={46} opacity={0.5} anim="anim-fadeUp">
        O que aconteceria quando a <span className="bold">cena real</span> tocasse?
      </T>
    </div>
  ));

  // 12 — Voce ia entender tudo (audio: "você ia entender tudo" — now @ 18.30s)
  SLIDE_REGISTRY.set(11, () => (
    <div className="slide center">
      <div className="glow-teal" style={{ top: "30%", left: "30%" }} />
      <T size={hScale(72)} weight={700} color="#4ECDC4" className="glow-teal-text" anim="anim-scaleIn">
        Voce ia entender tudo.
      </T>
    </div>
  ));

  // 13 — Sem legenda / Sem esforço / Sem ter estudado — stack synced (now @ 19.20s)
  SLIDE_REGISTRY.set(12, () => {
    const v = [useStackVisible(13, 0), useStackVisible(13, 1), useStackVisible(13, 2)];
    return (
      <div className="slide center">
        {v[0] && <T size={hScale(68)} weight={600} opacity={1} anim="anim-blurIn">Sem legenda.</T>}
        {v[0] && <Spacer h={8} />}
        {v[1] && <T size={hScale(68)} weight={600} opacity={0.4} anim="anim-blurIn">Sem esforco.</T>}
        {v[1] && <Spacer h={8} />}
        {v[2] && <T size={hScale(68)} weight={600} opacity={0.2} anim="anim-blurIn">Sem ter estudado nada.</T>}
      </div>
    );
  });

  // 14 — ISSO E UMA (audio: "Isso é uma" @ 22.30s)
  SLIDE_REGISTRY.set(13, () => (
    <div className="slide center">
      <T size={20} weight={600} color="#4ECDC4" style={{ letterSpacing: 8, textTransform: "uppercase" }} anim="anim-fadeUp">
        ISSO E UMA
      </T>
    </div>
  ));

  // 15 — Serie Cantada (audio: "série cantada" @ 23.20s)
  SLIDE_REGISTRY.set(14, () => (
    <div className="slide center">
      <div className="double-glow" />
      <T size={hScale(100)} weight={800} anim="anim-scaleIn">
        <span style={{ color: "#fff" }}>Serie </span>
        <span className="gradient-animated glow-gradient-text">Cantada</span>
      </T>
    </div>
  ));

  // 16 — A cada episodio (audio: "a cada episódio fica mais fácil")
  SLIDE_REGISTRY.set(15, () => (
    <div className="slide left">
      <T size={44} opacity={0.5} anim="anim-slideLeft">
        A cada episodio <span className="bold">fica mais facil</span>.
      </T>
    </div>
  ));

  // 17 — Mesmas estruturas (audio: "se repete dentro das mesmas estruturas")
  SLIDE_REGISTRY.set(16, () => (
    <div className="slide right">
      <T size={42} opacity={0.55} anim="anim-slideRight">
        o ingles se repete dentro das <span className="gradient-text" style={{ fontWeight: 700 }}>mesmas estruturas</span>
      </T>
    </div>
  ));

  // 18 — som embolado → faz sentido (audio: "som embolado começa a fazer sentido")
  SLIDE_REGISTRY.set(17, () => (
    <div className="slide center">
      <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="anim-fadeUp">
        <T size={42} opacity={0.35} anim="anim-fadeIn">som embolado</T>
        <T size={42} color="#4ECDC4" anim="anim-fadeIn" delay="d2" style={{ margin: "0 8px" }}>&#8594;</T>
        <T size={42} weight={700} anim="anim-fadeIn" delay="d3">faz sentido</T>
      </div>
    </div>
  ));

  // 19 — Milhares de brasileiros (audio: "milhares de brasileiros já estão usando" — now @ 33.80s)
  SLIDE_REGISTRY.set(18, () => (
    <div className="slide left">
      <AccentLine />
      <T size={44} weight={600} opacity={0.7} anim="anim-slideLeft">
        <span className="teal">Milhares</span> de brasileiros ja estao usando.
      </T>
      <Spacer h={12} />
      <T size={30} opacity={0.25} anim="anim-fadeUp" delay="d2">Para destravar o ingles de uma vez por todas.</T>
    </div>
  ));

  // 20 — universities — synced
  SLIDE_REGISTRY.set(19, () => {
    const unis = ["JOHNS HOPKINS", "McGILL", "STANFORD", "MIT"];
    return (
      <div className="slide left">
        {unis.map((u, i) => {
          if (!useStackVisible(20, i)) return null;
          return (
            <div key={u}>
              <T size={72} weight={900} opacity={[1, 0.85, 0.7, 0.55][i]} anim="anim-slideLeft">{u}</T>
              {i < 3 && <Spacer h={8} />}
            </div>
          );
        })}
      </div>
    );
  });

  // 21 — VALIDADO HA DECADAS
  SLIDE_REGISTRY.set(20, () => (
    <div className="slide center">
      <AccentLine />
      <T size={48} weight={700} anim="anim-fadeUp">VALIDADO HA DECADAS</T>
      <Spacer h={12} />
      <T size={28} opacity={0.3} anim="anim-fadeUp" delay="d2">Pesquisas em universidades de referencia mundial</T>
      <Spacer h={6} />
      <T size={28} opacity={0.25} anim="anim-fadeUp" delay="d3">confirmam o poder da musica no aprendizado</T>
    </div>
  ));

  // 22 — O unico metodo (audio: "único método que você vai precisar na vida, usando a única coisa capaz de instalar fluência")
  SLIDE_REGISTRY.set(21, () => (
    <div className="slide center">
      <T size={44} opacity={0.5} anim="anim-fadeUp">O unico metodo que voce</T>
      <Spacer h={8} />
      <T size={52} weight={700} anim="anim-fadeUp" delay="d2">
        vai <span className="gradient-animated">precisar na vida</span>.
      </T>
    </div>
  ));

  // 23 — REPETICAO reveal (audio: "a repetição" @ 57.60s — the big reveal)
  SLIDE_REGISTRY.set(22, () => (
    <div className="slide center">
      <div className="double-glow" />
      <T size={hScale(120)} weight={900} className="glow-teal-text" anim="anim-scaleIn" style={{ color: "#fff" }}>REPETICAO</T>
    </div>
  ));

  // 24 — De um jeito gostoso (audio: "repetição de um jeito gostoso que te faz querer mais")
  SLIDE_REGISTRY.set(23, () => (
    <div className="slide right">
      <T size={48} opacity={0.6} anim="anim-slideRight">
        de um jeito <span className="gradient-text" style={{ fontWeight: 700 }}>gostoso</span>
      </T>
      <Spacer h={12} />
      <T size={32} opacity={0.25} anim="anim-fadeUp" delay="d2">que te faz querer mais</T>
    </div>
  ));

  // 25 — Nao porque precisa, mas porque quer (audio: "não porque precisa, mas porque quer")
  SLIDE_REGISTRY.set(24, () => (
    <div className="slide center">
      <T size={48}>
        Nao porque <span style={{ opacity: 0.2 }}>precisa</span>. Mas porque <span className="teal" style={{ fontWeight: 700 }}>quer</span>.
      </T>
    </div>
  ));

  // 26 — A MUSICA (audio: "a música" @ 65.80s — second big reveal)
  SLIDE_REGISTRY.set(25, () => (
    <div className="slide center">
      <div className="double-glow" />
      <T size={hScale(150)} weight={900} className="gradient-animated glow-gradient-text" anim="anim-scaleIn">A MUSICA</T>
    </div>
  ));

  // 27 — Como ferramenta de repeticao (audio: "como ferramenta de repetição")
  SLIDE_REGISTRY.set(26, () => (
    <div className="slide center">
      <T size={32} opacity={0.25} anim="anim-blurIn">como ferramenta de repeticao</T>
    </div>
  ));

  // 28 — objectives — synced
  SLIDE_REGISTRY.set(27, () => {
    const items = ["Trabalhar numa multinacional", "Passar em qualquer entrevista", "Assistir series sem legenda", "Curtir viagens internacionais", "Arrumar um emprego fora"];
    return (
      <div className="slide left">
        {items.map((t, i) => {
          if (!useStackVisible(28, i)) return null;
          return (
            <div key={t}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#4ECDC4,#A78BFA)", borderRadius: 2, opacity: 0.5 }} />
                <T size={36} weight={500} opacity={0.55 + i * 0.08} anim="anim-slideLeft">{t}</T>
              </div>
              {i < 4 && <Spacer h={12} />}
            </div>
          );
        })}
      </div>
    );
  });

  // 29 — Fica aqui comigo (audio: "fica aqui comigo porque o que você vai ver vai mudar completamente")
  SLIDE_REGISTRY.set(28, () => (
    <div className="slide center">
      <T size={44} opacity={0.4} anim="anim-fadeUp">Fica aqui comigo.</T>
      <Spacer h={16} />
      <T size={48} weight={600} anim="anim-fadeUp" delay="d2">
        O que voce vai ver vai <span className="gradient-animated" style={{ fontWeight: 700 }}>mudar completamente</span>
      </T>
      <Spacer h={8} />
      <T size={36} opacity={0.25} anim="anim-fadeUp" delay="d3">a forma como voce enxerga o seu aprendizado.</T>
    </div>
  ));

  // 30 — me apresentar / Marcos Lobao (audio: "deixa eu me apresentar, Marcos Lobão")
  SLIDE_REGISTRY.set(29, () => (
    <div className="slide left">
      <T size={hScale(72)} weight={700} anim="anim-slideLeft">Marcos Lobao</T>
      <Spacer h={16} />
      <T size={28} opacity={0.35} anim="anim-slideLeft" delay="d2">Fundador da Fluency Route e Ingles Cantado</T>
    </div>
  ));

  // ═══ BLOCK 2 — CREDENCIAL ═══

  // 31 — Nunca fiz intercambio (audio: "nunca fiz intercâmbio, nunca morei fora")
  SLIDE_REGISTRY.set(30, () => (
    <div className="slide right">
      <T size={44} opacity={0.4} anim="anim-slideRight">Nunca fiz intercambio.</T>
      <Spacer h={8} />
      <T size={44} weight={600} anim="anim-slideRight" delay="d2">Nunca morei fora.</T>
    </div>
  ));

  // S31 DELETED — duplicate of S30

  // 33 — Empresa americana (audio: "cheguei a trabalhar pra uma empresa americana")
  SLIDE_REGISTRY.set(32, () => (
    <div className="slide center">
      <T size={44} anim="anim-fadeUp">
        Ja cheguei a trabalhar pra uma <span className="teal" style={{ fontWeight: 700 }}>empresa americana</span>.
      </T>
    </div>
  ));

  // 34 — Fundei a Fluency Route (audio: "fez fundar FluencyRoad")
  SLIDE_REGISTRY.set(33, () => (
    <div className="slide center">
      <T size={44} weight={500} anim="anim-fadeUp">Essa experiencia me fez fundar a</T>
      <Spacer h={16} />
      <T size={72} weight={800} anim="anim-scaleIn" delay="d2">FLUENCY ROUTE</T>
    </div>
  ));

  // 35 — Stats (audio: "30 países, 1 milhão de horas")
  SLIDE_REGISTRY.set(34, () => (
    <div className="slide center">
      {["30+ paises", "1M+ horas", "Milhoes de views"].map((s, i) => (
        <div key={s}>
          <T size={48} weight={700} anim="anim-scaleIn" delay={["d1", "d2", "d3"][i]}>{s}</T>
          {i < 2 && <Spacer h={16} />}
        </div>
      ))}
    </div>
  ));

  // 36 — Viralizou (audio: "a gente viralizou quando apresentou uma ideia simples")
  SLIDE_REGISTRY.set(35, () => (
    <div className="slide center">
      <T size={44} opacity={0.5} anim="anim-fadeUp">A gente <span className="bold">viralizou</span> quando apresentou uma ideia simples.</T>
    </div>
  ));

  // 37 — Aluno morava fora (audio: "aluno que morava fora, fazia aula nos EUA")
  SLIDE_REGISTRY.set(36, () => (
    <div className="slide left">
      <T size={42} weight={500} anim="anim-slideLeft">
        Aluno que morava fora, fazia aula presencial nos <span className="teal" style={{ fontWeight: 700 }}>Estados Unidos</span>.
      </T>
    </div>
  ));

  // 38 — A ultima parada (audio: "a última parada deles, poucos sabem")
  SLIDE_REGISTRY.set(37, () => (
    <div className="slide center">
      <T size={52} opacity={0.5} anim="anim-blurIn">A ultima parada.</T>
    </div>
  ));

  // 39 — Poucos sabem sobre mim (audio: "poucos sabem sobre mim")
  SLIDE_REGISTRY.set(38, () => (
    <div className="slide center">
      <T size={44} anim="anim-fadeUp">Uma coisa que <span className="bold">poucos sabem</span> sobre mim.</T>
    </div>
  ));

  // 40 — Cresci dentro da musica (audio: "cresci dentro da música antes de crescer dentro do inglês")
  SLIDE_REGISTRY.set(39, () => (
    <div className="slide left">
      <T size={48} anim="anim-slideLeft">
        Cresci dentro da <span className="teal" style={{ fontWeight: 700 }}>musica</span>.
      </T>
      <Spacer h={12} />
      <T size={36} opacity={0.3} anim="anim-slideLeft" delay="d2">Antes de crescer dentro do ingles.</T>
    </div>
  ));

  // 41 — Duas coisas sem conectar (audio: "duas coisas sem nunca conectar uma com a outra")
  SLIDE_REGISTRY.set(40, () => (
    <div className="slide center">
      <T size={44} opacity={0.6} anim="anim-fadeUp">Duas coisas sem conectar.</T>
      <Spacer h={24} />
      <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="anim-fadeUp d2">
        <T size={36} opacity={0.5}>Musica</T>
        <T size={36} color="#4ECDC4">x</T>
        <T size={36} opacity={0.5}>Ingles</T>
      </div>
    </div>
  ));

  // 42 — Ate que esse dia chegou (audio: "Até que esse dia chegou")
  SLIDE_REGISTRY.set(41, () => (
    <div className="slide center">
      <T size={48} anim="anim-blurIn">Ate que esse dia chegou.</T>
    </div>
  ));

  // 43 — Preciso te confessar (audio: "preciso te confessar uma coisa")
  SLIDE_REGISTRY.set(42, () => (
    <div className="slide center">
      <T size={44} opacity={0.5} anim="anim-blurIn">Preciso te <span className="bold">confessar</span> uma coisa.</T>
    </div>
  ));

  // 44 — Comecou a crescer outro grupo (audio: "a fluência começou a crescer um outro grupo")
  SLIDE_REGISTRY.set(43, () => (
    <div className="slide center">
      <T size={44} opacity={0.6} anim="anim-fadeUp">Comecou a crescer um <span className="red" style={{ fontWeight: 700 }}>outro grupo</span>.</T>
    </div>
  ));

  // ═══ BLOCK 3 — PROBLEMA ═══

  // 45 — Esse grupo era maior (audio: "esse grupo era maior do que eu gostaria de admitir")
  SLIDE_REGISTRY.set(44, () => {
    const v = [useStackVisible(44, 0), useStackVisible(44, 1), useStackVisible(44, 2)];
    return (
      <div className="slide left">
        {v[0] && <T size={42} weight={500} opacity={0.5} anim="anim-slideLeft">Queriam a fluencia <span className="bold">tanto quanto</span> os outros.</T>}
        {v[0] && <Spacer h={12} />}
        {v[1] && <T size={42} weight={500} opacity={0.4} anim="anim-slideLeft">Eles <span className="red" style={{ fontWeight: 700 }}>desistiam</span> e nao voltavam mais.</T>}
        {v[1] && <Spacer h={12} />}
        {v[2] && <T size={38} weight={400} opacity={0.3} anim="anim-slideLeft">E no comeco eu fiz o que qualquer dono de curso faria.</T>}
      </div>
    );
  });

  // S45 DELETED — duplicate of S44

  // 47 — Queriam / Desistiam / Nao voltavam
  // 47 — Achei conteúdo / didática / refizemos / mudei / contratei — STACK synced
  SLIDE_REGISTRY.set(46, () => {
    const v = [useStackVisible(46, 0), useStackVisible(46, 1), useStackVisible(46, 2), useStackVisible(46, 3), useStackVisible(46, 4)];
    return (
      <div className="slide left">
        {v[0] && <T size={38} weight={400} opacity={0.4} anim="anim-slideLeft">Achei que era o conteudo. <span className="bold">Melhorei.</span></T>}
        {v[0] && <Spacer h={8} />}
        {v[1] && <T size={38} weight={400} opacity={0.35} anim="anim-slideLeft">Achei que era a didatica. <span className="bold">Melhorei.</span></T>}
        {v[1] && <Spacer h={8} />}
        {v[2] && <T size={38} weight={400} opacity={0.3} anim="anim-slideLeft">Refizemos modulos inteiros.</T>}
        {v[2] && <Spacer h={8} />}
        {v[3] && <T size={38} weight={400} opacity={0.25} anim="anim-slideLeft">Mudei a ordem das aulas.</T>}
        {v[3] && <Spacer h={8} />}
        {v[4] && <T size={38} weight={400} opacity={0.2} anim="anim-slideLeft">Contratei gente nova.</T>}
      </div>
    );
  });

  // S47 DELETED — duplicate of S46

  // 49 — Os numeros nao mudavam
  SLIDE_REGISTRY.set(48, () => (
    <div className="slide center">
      <T size={52} weight={700} color="#FF6B6B" anim="anim-scaleIn">Os numeros nao mudavam.</T>
    </div>
  ));

  // 50 — cursos inacabados
  SLIDE_REGISTRY.set(49, () => (
    <div className="slide center">
      <T size={42} opacity={0.6}>
        Isso explica por que voce tem <span className="bold">cursos inacabados</span> agora mesmo.
      </T>
    </div>
  ));

  // 51 — Fui medir as horas REAIS
  SLIDE_REGISTRY.set(50, () => (
    <div className="slide left">
      <T size={44} anim="anim-slideLeft">
        Fui medir as horas <span className="teal" style={{ fontWeight: 700 }}>REAIS</span>.
      </T>
    </div>
  ));  // S51 — moved to VSLSlides_unused.tsx  // S52 — moved to VSLSlides_unused.tsx

  // 54 — Nao eram mais inteligentes
  SLIDE_REGISTRY.set(53, () => (
    <div className="slide center">
      <T size={44}>Nao eram mais inteligentes. <span className="bold">Persistiram mais.</span></T>
    </div>
  ));  // S54 — moved to VSLSlides_unused.tsx  // S56 — moved to VSLSlides_unused.tsx

  // 58 — Kris Nielson
  SLIDE_REGISTRY.set(57, () => (
    <div className="slide left">
      <AccentLine />
      <T size={44} weight={600} anim="anim-slideLeft">Kris Nielson — 2014</T>
      <Spacer h={12} />
      <T size={28} opacity={0.35} anim="anim-slideLeft" delay="d2">Estudo sobre desistencia em cursos de idiomas</T>
    </div>
  ));

  // 59 — 150 funcionarios
  SLIDE_REGISTRY.set(58, () => (
    <div className="slide center">
      <T size={44}>150 funcionarios do governo americano.</T>
    </div>
  ));  // S59 — moved to VSLSlides_unused.tsx  // S60 — moved to VSLSlides_unused.tsx  // S61 — moved to VSLSlides_unused.tsx

  // 63 — 1 em 150
  SLIDE_REGISTRY.set(62, () => (
    <div className="slide center">
      <T size={52} weight={600} anim="anim-blurIn">1 em 150.</T>
    </div>
  ));

  // 64 — O problema nao era o conteudo
  SLIDE_REGISTRY.set(63, () => (
    <div className="slide center">
      <T size={44} opacity={0.6} anim="anim-blurIn">Tem um <span className="bold">problema</span> nessa logica.</T>
    </div>
  ));

  // 65 — Todo curso do mundo = AULA
  SLIDE_REGISTRY.set(64, () => (
    <div className="slide center">
      <T size={40} opacity={0.5} anim="anim-fadeUp">Todo curso do mundo =</T>
      <Spacer h={8} />
      <T size={90} weight={900} color="#FF6B6B" anim="anim-scaleIn" delay="d2" className="glow-red-text">AULA</T>
    </div>
  ));

  // 66 — types — synced
  SLIDE_REGISTRY.set(65, () => {
    const items = ["Aula em video", "Aula ao vivo", "Com jogo", "Com nativo", "Com VR"];
    return (
      <div className="slide center">
        {items.map((t, i) => {
          if (!useStackVisible(65, i)) return null;
          return (
            <div key={t}>
              <T size={40} opacity={0.3} anim="anim-fadeUp">{t}</T>
              {i < 4 && <Spacer h={8} />}
            </div>
          );
        })}
      </div>
    );
  });

  // 67 — Todos pedem a mesma coisa
  SLIDE_REGISTRY.set(66, () => (
    <div className="slide center">
      <T size={44} opacity={0.7}>Todos pedem a mesma coisa:</T>
    </div>
  ));

  // 68 — Sentar / Prestar atenção / Processar / ENERGIA MENTAL — STACK synced
  SLIDE_REGISTRY.set(67, () => {
    const v = [useStackVisible(67, 0), useStackVisible(67, 1), useStackVisible(67, 2), useStackVisible(67, 3)];
    return (
      <div className="slide center">
        {v[0] && <T size={42} weight={500} opacity={0.4} anim="anim-fadeUp">Sentar.</T>}
        {v[0] && <Spacer h={10} />}
        {v[1] && <T size={42} weight={500} opacity={0.4} anim="anim-fadeUp">Prestar atencao.</T>}
        {v[1] && <Spacer h={10} />}
        {v[2] && <T size={42} weight={500} opacity={0.4} anim="anim-fadeUp">Processar informacao.</T>}
        {v[2] && <Spacer h={14} />}
        {v[3] && <T size={56} weight={800} color="#FF6B6B" anim="anim-scaleIn" className="glow-red-text">ENERGIA MENTAL.</T>}
      </div>
    );
  });

  // 69 — Sabe o que acontece? (audio: "E sabe o que acontece")
  SLIDE_REGISTRY.set(68, () => (
    <div className="slide center">
      <T size={46} opacity={0.6} anim="anim-blurIn">Sabe o que <span className="bold">acontece</span>?</T>
    </div>
  ));

  // 70 — O adulto nao chega assim
  SLIDE_REGISTRY.set(69, () => (
    <div className="slide center">
      <T size={44}>O adulto nao chega assim.</T>
    </div>
  ));  // S70 — moved to VSLSlides_unused.tsx  // S71 — moved to VSLSlides_unused.tsx  // S72 — moved to VSLSlides_unused.tsx  // S73 — moved to VSLSlides_unused.tsx

  // 75 — Academia / projeto na gaveta (audio: "academia que quer ir e não vai, projeto que não sai da gaveta")
  SLIDE_REGISTRY.set(74, () => (
    <div className="slide center">
      <T size={42} anim="anim-fadeUp">A academia que voce quer ir e <span className="red" style={{ fontWeight: 700 }}>nao vai</span>.</T>
      <Spacer h={12} />
      <T size={42} opacity={0.4} anim="anim-fadeUp" delay="d2">O projeto pessoal que nao sai da <span className="bold">gaveta</span>.</T>
    </div>
  ));

  // 76 — Seu corpo se recusa (audio: "isso não tem nada a ver com falta de vontade")
  SLIDE_REGISTRY.set(75, () => (
    <div className="slide center">
      <T size={42} opacity={0.5} anim="anim-fadeUp">E tambem nao e um problema so seu.</T>
    </div>
  ));

  // 77 — Nao e falta de vontade
  SLIDE_REGISTRY.set(76, () => (
    <div className="slide center">
      <T size={48} weight={500} anim="anim-fadeUp">Nao e falta de vontade.</T>
      <Spacer h={12} />
      <T size={42} opacity={0.5} anim="anim-fadeUp" delay="d2">Nem de motivacao.</T>
    </div>
  ));

  // 78 — JOHNS HOPKINS 2024
  SLIDE_REGISTRY.set(77, () => (
    <div className="slide left">
      <AccentLine />
      <T size={48} weight={700} anim="anim-slideLeft">JOHNS HOPKINS — 2024</T>
    </div>
  ));

  // 79 — Ofereceram DINHEIRO
  SLIDE_REGISTRY.set(78, () => (
    <div className="slide center">
      <T size={44}>
        Ofereceram <span className="teal" style={{ fontWeight: 700 }}>DINHEIRO</span> pra continuar.
      </T>
    </div>
  ));

  // 80 — 90% recusaram
  SLIDE_REGISTRY.set(79, () => (
    <div className="slide center">
      <T size={48} weight={600} anim="anim-scaleIn">90% recusaram e foram embora.</T>
    </div>
  ));

  // 81 — regiao de recompensa DESLIGADA
  // S80 — audio: "visita ao asilo, presenciou algo que mudou a pesquisa"
  SLIDE_REGISTRY.set(80, () => (
    <div className="slide center">
      <T size={42} opacity={0.5} anim="anim-fadeUp">Uma visita ao <span className="bold">asilo</span></T>
      <Spacer h={10} />
      <T size={42} opacity={0.5} anim="anim-fadeUp" delay="d2">mudou a direcao da pesquisa dele <span className="teal" style={{ fontWeight: 700 }}>pra sempre</span>.</T>
    </div>
  ));

  // 82 — FADIGA COGNITIVA
  SLIDE_REGISTRY.set(81, () => (
    <div className="slide center">
      <div className="glow-red" style={{ top: "25%", left: "25%" }} />
      <T size={90} weight={900} color="#FF6B6B" anim="anim-scaleIn" className="glow-red-text">FADIGA COGNITIVA</T>
    </div>
  ));

  // 83 — O aluno vai desistir (audio: "acontece o óbvio, o aluno vai desistir, se sente culpado")
  SLIDE_REGISTRY.set(82, () => (
    <div className="slide center">
      <T size={44} opacity={0.5} anim="anim-fadeUp">O aluno vai <span className="red" style={{ fontWeight: 700 }}>desistir</span>.</T>
      <Spacer h={16} />
      <T size={36} opacity={0.3} anim="anim-fadeUp" delay="d2">E se sentir culpado. Achar que nao leva jeito.</T>
    </div>
  ));

  // 84 — Acha que inglês é difícil demais (audio: "acha que o inglês é difícil demais")
  SLIDE_REGISTRY.set(83, () => (
    <div className="slide center">
      <T size={44} anim="anim-fadeUp">Acha que o ingles e <span className="red" style={{ fontWeight: 700 }}>dificil demais</span>.</T>
    </div>
  ));  // S84 — moved to VSLSlides_unused.tsx  // S85 — moved to VSLSlides_unused.tsx  // S86 — moved to VSLSlides_unused.tsx  // S87 — moved to VSLSlides_unused.tsx  // S88 — moved to VSLSlides_unused.tsx  // S89 — moved to VSLSlides_unused.tsx

  // 91 — Com a rotina
  // S90 — audio: "quem mais precisa chega destruído, sem energia pra aula"
  SLIDE_REGISTRY.set(90, () => (
    <div className="slide center">
      <T size={42} opacity={0.5} anim="anim-fadeUp">Quem mais precisa chega <span className="red" style={{ fontWeight: 700 }}>DESTRUIDO</span>.</T>
    </div>
  ));

  // 92 — O problema nunca foi O QUE
  SLIDE_REGISTRY.set(91, () => (
    <div className="slide center">
      <T size={44} anim="anim-fadeUp">O problema nunca foi O QUE ensinavam.</T>
    </div>
  ));  // S92 — moved to VSLSlides_unused.tsx  // S93 — moved to VSLSlides_unused.tsx

  // 95 — Quais sao os formatos
  SLIDE_REGISTRY.set(94, () => (
    <div className="slide center">
      <T size={44}>Quais sao os formatos disponiveis?</T>
    </div>
  ));

  // 96 — Precisava funcionar com fadiga
  SLIDE_REGISTRY.set(95, () => (
    <div className="slide left">
      <T size={42} anim="anim-slideLeft">Precisava funcionar com fadiga cognitiva.</T>
    </div>
  ));

  // 97 — criteria STACK — synced
  // S96 — audio: "pra entender é só pensar em tudo que você já tem no subconsciente"
  SLIDE_REGISTRY.set(96, () => (
    <div className="slide center">
      <T size={42} opacity={0.5} anim="anim-fadeUp">Tudo que voce ja tem no</T>
      <Spacer h={10} />
      <T size={56} weight={700} anim="anim-scaleIn" delay="d2" className="gradient-animated glow-gradient-text">SUBCONSCIENTE.</T>
    </div>
  ));  // S97 — moved to VSLSlides_unused.tsx  // S98 — moved to VSLSlides_unused.tsx

  // 100 — Crianca nao aguenta
  SLIDE_REGISTRY.set(99, () => (
    <div className="slide left">
      <T size={42} anim="anim-slideLeft">Crianca nao aguenta 5min de aula.</T>
    </div>
  ));

  // 101 — Mas fica HORAS
  SLIDE_REGISTRY.set(100, () => (
    <div className="slide right">
      <T size={42} anim="anim-slideRight">
        Mas fica <span className="teal" style={{ fontWeight: 700 }}>HORAS</span> aprendendo por musica.
      </T>
    </div>
  ));

  // 102 — Carga cognitiva leve
  SLIDE_REGISTRY.set(101, () => (
    <div className="slide center">
      <T size={44} weight={500}>Carga cognitiva leve.</T>
    </div>
  ));

  // 103 — MUSICA
  SLIDE_REGISTRY.set(102, () => (
    <div className="slide center">
      <div className="glow-teal" style={{ top: "30%", left: "30%" }} />
      <T size={90} weight={800} color="#4ECDC4" anim="anim-scaleIn" className="glow-teal-text">MUSICA</T>
    </div>
  ));

  // 104 — Por que nao fazer com adulto
  SLIDE_REGISTRY.set(103, () => (
    <div className="slide center">
      <T size={44}>Por que nao fazer com adulto tambem?</T>
    </div>
  ));

  // 105 — Um dos formatos mais antigos
  SLIDE_REGISTRY.set(104, () => (
    <div className="slide left">
      <T size={42} opacity={0.6} anim="anim-slideLeft">Um dos formatos mais antigos da civilizacao.</T>
    </div>
  ));

  // 106 — Todas as civilizacoes
  SLIDE_REGISTRY.set(105, () => (
    <div className="slide center">
      <T size={42}>Todas as civilizacoes ensinam por musica.</T>
    </div>
  ));  // S106 — moved to VSLSlides_unused.tsx  // S107 — moved to VSLSlides_unused.tsx

  // 109 — Senhor de 80 anos
  SLIDE_REGISTRY.set(108, () => (
    <div className="slide center">
      <T size={42}>Senhor de 80 anos cantando sozinho.</T>
    </div>
  ));

  // 110 — Nao lembrava o nome dos netos
  SLIDE_REGISTRY.set(109, () => (
    <div className="slide center">
      <T size={42} opacity={0.4} anim="anim-blurIn">Nao lembrava o nome dos netos.</T>
    </div>
  ));  // S110 — moved to VSLSlides_unused.tsx

  // 112 — Uma lingua que nunca estudou
  SLIDE_REGISTRY.set(111, () => (
    <div className="slide center">
      <T size={42} opacity={0.6}>Uma lingua que nunca estudou.</T>
    </div>
  ));

  // 113 — 40 anos depois
  // S112 — audio: "música que aprendeu há mais de 40 anos... tinha um detalhe"
  SLIDE_REGISTRY.set(112, () => (
    <div className="slide center">
      <T size={44} opacity={0.5} anim="anim-blurIn">So que tinha um <span className="bold">detalhe</span>.</T>
    </div>
  ));

  // 114 — O estudo que mostrou (audio: "esse foi o estudo que mostrou pra gente o que a música tem de especial")
  // S113 — audio: "o que a música tem de tão especial pra gravar conteúdo no cérebro"
  SLIDE_REGISTRY.set(113, () => (
    <div className="slide center">
      <T size={42} opacity={0.5} anim="anim-fadeUp">O que a musica tem de tao especial</T>
      <Spacer h={10} />
      <T size={44} weight={600} anim="anim-fadeUp" delay="d2">pra <span className="teal" style={{ fontWeight: 700 }}>gravar</span> conteudo no cerebro.</T>
    </div>
  ));

  // 115 — McGill University (audio: "foi na McGill University no Canadá que ele conseguiu")
  SLIDE_REGISTRY.set(114, () => (
    <div className="slide left">
      <AccentLine />
      <T size={48} weight={600} anim="anim-slideLeft">McGill University — Canada</T>
      <Spacer h={12} />
      <T size={30} opacity={0.3} anim="anim-fadeUp" delay="d2">Onde ele conseguiu provar.</T>
    </div>
  ));

  // S115 DELETED — duplicate of S114

  // 117 — Nature Neuroscience
  SLIDE_REGISTRY.set(116, () => (
    <div className="slide center">
      <T size={52} weight={700} anim="anim-fadeUp">Nature Neuroscience</T>
      <Spacer h={12} />
      <T size={28} opacity={0.3} anim="anim-fadeUp" delay="d2">uma das maiores revistas cientificas do mundo</T>
    </div>
  ));

  // 118 — Musica + prazer → DOPAMINA
  SLIDE_REGISTRY.set(117, () => (
    <div className="slide center">
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }} className="anim-fadeUp">
        <T size={42}>Musica + prazer</T>
        <T size={42} color="#4ECDC4">&#8594;</T>
        <T size={52} weight={700} color="#4ECDC4">DOPAMINA</T>
      </div>
    </div>
  ));  // S118 — moved to VSLSlides_unused.tsx  // S119 — moved to VSLSlides_unused.tsx  // S120 — moved to VSLSlides_unused.tsx  // S121 — moved to VSLSlides_unused.tsx

  // 123 — Complete a frase
  SLIDE_REGISTRY.set(122, () => (
    <div className="slide center">
      <T size={44} opacity={0.7}>Complete a frase:</T>
    </div>
  ));

  // 124 — Eu tenho tanto pra lhe falar
  SLIDE_REGISTRY.set(123, () => (
    <div className="slide center">
      <T size={38} opacity={0.6} style={{ fontStyle: "italic" }} anim="anim-blurIn">
        Eu tenho tanto pra lhe falar, mas com palavras nao sei dizer...
      </T>
    </div>
  ));

  // 125 — Como e grande meu amor por voce
  SLIDE_REGISTRY.set(124, () => (
    <div className="slide center">
      <T size={44} color="#4ECDC4" weight={600} anim="anim-fadeUp">Como e grande meu amor por voce.</T>
    </div>
  ));

  // 126 — A dona aranha subiu pela...
  SLIDE_REGISTRY.set(125, () => (
    <div className="slide center">
      <T size={44} opacity={0.6}>A dona aranha subiu pela...</T>
    </div>
  ));

  // 127 — PAREDE
  SLIDE_REGISTRY.set(126, () => (
    <div className="slide center">
      <T size={72} weight={800} anim="anim-scaleIn">PAREDE.</T>
    </div>
  ));

  // 128 — A educacao ignora isso
  SLIDE_REGISTRY.set(127, () => (
    <div className="slide center">
      <T size={44} anim="anim-fadeUp">A educacao ignora isso.</T>
      <Spacer h={12} />
      <T size={28} opacity={0.35} anim="anim-fadeUp" delay="d2">musica virou coisa de crianca</T>
    </div>
  ));

  // 129 — O adulto e quem MAIS precisa
  SLIDE_REGISTRY.set(128, () => (
    <div className="slide center">
      <T size={44}>
        O adulto e quem <span className="teal" style={{ fontWeight: 700 }}>MAIS</span> precisa.
      </T>
    </div>
  ));

  // 130 — O formato / A ciencia / A logica / Faltava
  SLIDE_REGISTRY.set(129, () => (
    <div className="slide center">
      <T size={42} opacity={0.6} anim="anim-fadeUp">O formato. A ciencia. A logica. Faltava:</T>
    </div>
  ));

  // 131 — O que colocar dentro da musica?
  SLIDE_REGISTRY.set(130, () => (
    <div className="slide center">
      <T size={48} color="#4ECDC4" weight={600} anim="anim-fadeUp">O que colocar dentro da musica?</T>
    </div>
  ));

  // 132 — De onde vem a fluencia?
  SLIDE_REGISTRY.set(131, () => (
    <div className="slide center">
      <T size={44} opacity={0.7}>De onde vem a fluencia?</T>
    </div>
  ));

  // 133 — Fluencia = ingles no subconsciente
  SLIDE_REGISTRY.set(132, () => (
    <div className="slide center">
      <T size={44}>Fluencia = ingles no subconsciente.</T>
    </div>
  ));

  // 134 — Subconsciente = AUTOMATICO
  // S133 — audio: "o automático do cérebro, todas essas coisas têm em comum"
  SLIDE_REGISTRY.set(133, () => (
    <div className="slide center">
      <T size={42} opacity={0.5} anim="anim-fadeUp">O que todas tem em <span className="bold">comum</span>?</T>
    </div>
  ));

  // 135 — skills STACK
  SLIDE_REGISTRY.set(134, () => {
  const v = [useStackVisible(134, 0), useStackVisible(134, 1), useStackVisible(134, 2)];
  return (
    <div className="slide left">
      {v[0] && <T size={42} weight={500} opacity={0.4} anim="anim-slideLeft">Andar de <span className="bold">bicicleta</span>.</T>}
      {v[0] && <Spacer h={12} />}
      {v[1] && <T size={42} weight={500} opacity={0.45} anim="anim-slideLeft"><span className="bold">Dirigir</span>.</T>}
      {v[1] && <Spacer h={12} />}
      {v[2] && <T size={42} weight={500} opacity={0.5} anim="anim-slideLeft"><span className="bold">Digitar</span> no celular.</T>}
    </div>
  );
});  // S402 — moved to VSLSlides_unused.tsx  // S403 — moved to VSLSlides_unused.tsx  // S404 — moved to VSLSlides_unused.tsx  // S405 — moved to VSLSlides_unused.tsx  // S408 — moved to VSLSlides_unused.tsx

// ═══ NEW SLIDES — Gap fills 29/03/2026 ═══

// #3 area — S53 (3:59-4:22) 23s → 3 novos
SLIDE_REGISTRY.set(410, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-fadeUp">Poderia ter parado aqui.</T>
    <Spacer h={12} />
    <T size={36} opacity={0.3} anim="anim-fadeUp" delay="d2">O metodo funcionava pra quem ia la e fazia.</T>
  </div>
));

SLIDE_REGISTRY.set(411, () => (
  <div className="slide center">
    <T size={44} anim="anim-blurIn">Quis entender por que <span className="red" style={{ fontWeight: 700 }}>desistiam</span> tao rapido.</T>
  </div>
));

SLIDE_REGISTRY.set(412, () => (
  <div className="slide center">
    <T size={42} opacity={0.6} anim="anim-fadeUp">O padrao era <span className="bold">identico</span> em todo lugar.</T>
    <Spacer h={12} />
    <T size={32} opacity={0.25} anim="anim-fadeUp" delay="d2">Nao importava o preco. Nem a metodologia. Nem o professor.</T>
  </div>
));

// #4 area — S62 (4:49-5:04) 15s → 2 novos
SLIDE_REGISTRY.set(413, () => (
  <div className="slide center">
    <T size={44} anim="anim-fadeUp">O problema <span className="red" style={{ fontWeight: 700 }}>nao podia</span> ser o conteudo.</T>
  </div>
));

SLIDE_REGISTRY.set(414, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-blurIn">Todo curso do mundo gira em torno de uma unica coisa:</T>
  </div>
));

// #5+6 area — S77+S78 (6:14-6:48) 34s → 4 novos
SLIDE_REGISTRY.set(415, () => (
  <div className="slide center">
    <T size={40} opacity={0.5} anim="anim-fadeUp">Colocaram voluntarios pra fazer tarefas mentais.</T>
    <Spacer h={12} />
    <T size={40} opacity={0.5} anim="anim-fadeUp" delay="d2">Por horas. Ate ficarem <span className="red" style={{ fontWeight: 700 }}>esgotados</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(416, () => (
  <div className="slide center">
    <T size={48} weight={700} anim="anim-scaleIn">90% recusaram o dinheiro.</T>
    <Spacer h={16} />
    <T size={36} opacity={0.3} anim="anim-fadeUp" delay="d2">E simplesmente foram embora.</T>
  </div>
));

SLIDE_REGISTRY.set(417, () => (
  <div className="slide center">
    <T size={40} opacity={0.5} anim="anim-blurIn">A regiao do cerebro que avalia <span className="bold">recompensa</span>:</T>
    <Spacer h={16} />
    <T size={56} weight={800} className="red glow-red-text" anim="anim-scaleIn" delay="d2">DESLIGADA.</T>
  </div>
));

SLIDE_REGISTRY.set(418, () => (
  <div className="slide center">
    <T size={40} opacity={0.4} anim="anim-fadeUp">O adulto chega com cansaco mental pra uma aula.</T>
    <Spacer h={16} />
    <T size={44} weight={700} anim="anim-fadeUp" delay="d2">O ingles <span className="red">nao entra</span>.</T>
  </div>
));

// #7 area — S83 (6:50-7:00) 10s → 1 novo
SLIDE_REGISTRY.set(419, () => (
  <div className="slide center">
    <T size={44} anim="anim-fadeUp">A culpa nunca foi dele.</T>
    <Spacer h={12} />
    <T size={44} anim="anim-fadeUp" delay="d2">A culpa e do <span className="gradient-animated" style={{ fontWeight: 800, fontSize: 52 }}>FORMATO</span>.</T>
  </div>
));

// #8 area — S95 (7:44-8:04) 20s → 3 novos
SLIDE_REGISTRY.set(420, () => (
  <div className="slide left">
    <T size={36} opacity={0.4} anim="anim-slideLeft">Tinha que funcionar dentro de varios criterios:</T>
  </div>
));

SLIDE_REGISTRY.set(421, () => {
  const v = [useStackVisible(421, 0), useStackVisible(421, 1), useStackVisible(421, 2)];
  return (
    <div className="slide left">
      {v[0] && <T size={40} weight={500} opacity={0.5} anim="anim-slideLeft"><span className="teal">1.</span> Sem esforco consciente</T>}
      {v[0] && <Spacer h={12} />}
      {v[1] && <T size={40} weight={500} opacity={0.5} anim="anim-slideLeft"><span className="teal">2.</span> Repetir 50x sem cansar</T>}
      {v[1] && <Spacer h={12} />}
      {v[2] && <T size={40} weight={500} opacity={0.5} anim="anim-slideLeft"><span className="teal">3.</span> Fazer porque quer, nao porque precisa</T>}
    </div>
  );
});

SLIDE_REGISTRY.set(422, () => (
  <div className="slide center">
    <T size={44} opacity={0.6} anim="anim-blurIn">Quando voce junta tudo isso,</T>
    <Spacer h={12} />
    <T size={48} weight={700} anim="anim-fadeUp" delay="d2">a resposta fica <span className="gradient-animated">obvia</span>.</T>
  </div>
));

// #10 area — S105 (9:07-9:21) 14s → 2 novos
SLIDE_REGISTRY.set(423, () => (
  <div className="slide center">
    <T size={40} opacity={0.5} anim="anim-fadeUp">A ciencia ja tinha resposta disso ha decadas.</T>
  </div>
));

SLIDE_REGISTRY.set(424, () => (
  <div className="slide left">
    <T size={36} opacity={0.4} anim="anim-slideLeft">Um trabalho em particular chamou a atencao.</T>
    <Spacer h={16} />
    <T size={44} weight={600} anim="anim-slideLeft" delay="d2">Robert Zatorre</T>
    <T size={28} opacity={0.3} anim="anim-fadeIn" delay="d3">Neurocientista</T>
  </div>
));

// #11 area — S111 (9:43-9:59) 17s → 2 novos
SLIDE_REGISTRY.set(425, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-fadeUp">Mesmo com a mente em completo <span className="red" style={{ fontWeight: 700 }}>declinio</span>,</T>
    <Spacer h={12} />
    <T size={42} opacity={0.5} anim="anim-fadeUp" delay="d2">ele cantava <span className="bold">palavra por palavra</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(426, () => (
  <div className="slide center">
    <T size={42} anim="anim-blurIn">Esqueciam o nome dos filhos.</T>
    <Spacer h={12} />
    <T size={42} anim="anim-blurIn" delay="d2">Mas cantavam musicas da adolescencia.</T>
  </div>
));

// #12 area — S117 (10:27-10:39) 12s → 1 novo
SLIDE_REGISTRY.set(427, () => (
  <div className="slide center">
    <T size={38} opacity={0.5} anim="anim-fadeUp">Entra mais facil. Grava mais forte.</T>
    <Spacer h={12} />
    <T size={44} weight={700} className="gradient-text" anim="anim-scaleIn" delay="d2">Dura mais tempo.</T>
  </div>
));

// #14 area — S136 (12:00-12:15) 15s → 2 novos
SLIDE_REGISTRY.set(428, () => (
  <div className="slide center">
    <T size={44} weight={700} className="gradient-animated" anim="anim-scaleIn">REPETICAO.</T>
    <Spacer h={16} />
    <T size={36} opacity={0.35} anim="anim-fadeUp" delay="d2">Voce repetiu tanto que ficou automatico.</T>
  </div>
));

SLIDE_REGISTRY.set(429, () => (
  <div className="slide center">
    <T size={42} opacity={0.6} anim="anim-fadeUp">Com ingles e <span className="bold">exatamente</span> igual.</T>
    <Spacer h={12} />
    <T size={36} opacity={0.3} anim="anim-fadeUp" delay="d2">Repeticao massiva do essencial.</T>
  </div>
));

// #16 area — S145 (12:52-13:05) 13s → 2 novos
SLIDE_REGISTRY.set(430, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-fadeUp">Senao tava todo mundo fluente por ai.</T>
  </div>
));

SLIDE_REGISTRY.set(431, () => (
  <div className="slide center">
    <T size={44} anim="anim-blurIn">Ninguem conversa como o <span className="teal" style={{ fontWeight: 700 }}>Coldplay</span> canta.</T>
  </div>
));

// #17 area — S153 (13:39-13:53) 14s → 2 novos
SLIDE_REGISTRY.set(432, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-fadeUp">Transformar dialogo real de serie em musica</T>
    <Spacer h={12} />
    <T size={42} weight={700} anim="anim-fadeUp" delay="d2"><span className="red">nao e simples</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(433, () => (
  <div className="slide center">
    <T size={40} opacity={0.4} anim="anim-fadeUp">Cada cena precisa de uma <span className="bold">composicao original</span>.</T>
    <Spacer h={12} />
    <T size={36} opacity={0.3} anim="anim-fadeUp" delay="d2">Melodia. Arranjo. Producao completa.</T>
  </div>
));

// #18-19 area — S281+S176 (15:10-15:33) 23s → 2 novos
SLIDE_REGISTRY.set(434, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-fadeUp">A musica tinha que ser <span className="bold">boa de verdade</span>.</T>
    <Spacer h={12} />
    <T size={36} opacity={0.3} anim="anim-fadeUp" delay="d2">Nao podia ser musica bobinha.</T>
  </div>
));

SLIDE_REGISTRY.set(435, () => (
  <div className="slide center">
    <T size={40} opacity={0.5} anim="anim-blurIn">Scripts de serie americanos.</T>
    <Spacer h={12} />
    <T size={40} opacity={0.5} anim="anim-blurIn" delay="d2">Dialogos exatos. Expressoes. Velocidade real.</T>
    <Spacer h={12} />
    <T size={40} weight={700} className="gradient-text" anim="anim-fadeUp" delay="d3">Composicao musical profissional.</T>
  </div>
));

// #23 area — S192 (17:59-18:22) 23s → 3 novos
SLIDE_REGISTRY.set(436, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-fadeUp">Isso e so o <span className="bold">comeco</span>.</T>
    <Spacer h={12} />
    <T size={36} opacity={0.3} anim="anim-fadeUp" delay="d2">O primeiro sinal de que seu cerebro gravou.</T>
  </div>
));

SLIDE_REGISTRY.set(437, () => (
  <div className="slide center">
    <T size={42} anim="anim-blurIn">Abre a serie. A cena real toca.</T>
    <Spacer h={16} />
    <T size={36} opacity={0.35} anim="anim-fadeUp" delay="d2">Mesmos personagens. Mesmas falas. 30, 40 vezes.</T>
  </div>
));

SLIDE_REGISTRY.set(438, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-fadeUp">Sem letra na tela. Sem musica.</T>
    <Spacer h={16} />
    <T size={48} weight={700} className="gradient-animated glow-gradient-text" anim="anim-scaleIn" delay="d2">Ingles real. Velocidade real.</T>
    <Spacer h={12} />
    <T size={36} opacity={0.35} anim="anim-fadeUp" delay="d3">E voce entende.</T>
  </div>
));

// ═══ GAP-FILL SLIDES (S439+) ═══

// S439 — "AULA funciona pra adolescente" (gap #27, 5:17)
SLIDE_REGISTRY.set(439, () => (
  <div className="slide center">
    <T size={64} weight={800} color="#FF6B6B" anim="anim-scaleIn" className="glow-red-text">AULA</T>
    <Spacer h={12} />
    <T size={42} opacity={0.5} anim="anim-fadeUp" delay="d2">funciona pra adolescente.</T>
  </div>
));

// S440 — "Cabeça FRESCA" (gap #27, 5:22)
SLIDE_REGISTRY.set(440, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-fadeUp">Pra quem chega com a cabeca</T>
    <Spacer h={10} />
    <T size={60} weight={800} color="#4ECDC4" anim="anim-scaleIn" delay="d2" className="glow-teal-text">FRESCA.</T>
  </div>
));

// S441 — Stack: Não faz a aula / Abre e não presta atenção (5:49)
SLIDE_REGISTRY.set(441, () => {
  const v = [useStackVisible(441, 0), useStackVisible(441, 1)];
  return (
    <div className="slide center">
      {v[0] && <T size={44} weight={600} opacity={0.5} anim="anim-fadeUp">Voce nao faz a aula.</T>}
      {v[0] && <Spacer h={12} />}
      {v[1] && <T size={44} weight={600} opacity={0.5} anim="anim-fadeUp">Abre e nao presta atencao.</T>}
    </div>
  );
});

// S443 — LATIM punch positivo (9:41)
SLIDE_REGISTRY.set(443, () => (
  <div className="slide center">
    <T size={80} weight={900} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">LATIM.</T>
  </div>
));

// S444 — A memória estava APAGANDO (9:32)
SLIDE_REGISTRY.set(444, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-blurIn">A memoria estava <span className="red" style={{ fontWeight: 700 }}>apagando</span>.</T>
  </div>
));

// S445 — Sem ninguém colocar nada pra tocar (9:34)
SLIDE_REGISTRY.set(445, () => (
  <div className="slide center">
    <T size={42} opacity={0.4} anim="anim-fadeUp">Sem ninguem colocar <span className="bold">nada</span> pra tocar.</T>
  </div>
));

// S446 — Cantando uma música de 40 ANOS atrás (9:36)
SLIDE_REGISTRY.set(446, () => (
  <div className="slide center">
    <T size={42} opacity={0.5} anim="anim-fadeUp">Cantando uma musica de</T>
    <Spacer h={10} />
    <T size={52} weight={700} color="#4ECDC4" anim="anim-scaleIn" delay="d2" className="glow-teal-text">40 ANOS atras.</T>
  </div>
));

// S442 — Cérebro no limite do CANSAÇO (5:52)
SLIDE_REGISTRY.set(442, () => {
  const v = [useStackVisible(442, 0), useStackVisible(442, 1), useStackVisible(442, 2)];
  return (
    <div className="slide left">
      {v[0] && <T size={42} weight={500} opacity={0.4} anim="anim-slideLeft">Cerebro no limite do <span className="red" style={{ fontWeight: 700 }}>cansaco</span>.</T>}
      {v[0] && <Spacer h={12} />}
      {v[1] && <T size={42} weight={500} opacity={0.45} anim="anim-slideLeft">A <span className="bold">academia</span> que voce quer ir e nao vai.</T>}
      {v[1] && <Spacer h={12} />}
      {v[2] && <T size={42} weight={500} opacity={0.5} anim="anim-slideLeft">O <span className="bold">projeto pessoal</span> que nao sai da gaveta.</T>}
    </div>
  );
});


// ─── Intermediate slides (IDs 500-656) — auto-generated ────
SLIDE_REGISTRY.set(500, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Voce <span className="bold">conecta</span> essas estruturas.</T>
  
  </div>
));

SLIDE_REGISTRY.set(501, () => (
  <div className="slide right">
    <T size={44} weight={500} opacity={0.4} anim="anim-slideRight">Qualquer adulto. Qualquer rotina.</T>
  </div>
));

SLIDE_REGISTRY.set(502, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Que <span className="teal">realmente</span> funciona na vida real.</T>
  </div>
));

SLIDE_REGISTRY.set(503, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-slideLeft">Assistir series <span className="bold">sem legenda</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(504, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-slideLeft">Ate arrumar um emprego <span className="bold">fora</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(505, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O seu proprio <span className="teal">aprendizado</span> de ingles.</T>
  
  </div>
));

SLIDE_REGISTRY.set(506, () => (
  <div className="slide right">
    <T size={44} weight={500} opacity={0.4} anim="anim-slideRight">Deixa eu me <span className="bold">apresentar</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(507, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-slideLeft">Sem nada do que dizem ser <span className="bold">obrigatorio</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(508, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Sem nada do que dizem ser <span className="red" style={{ fontWeight: 700 }}>obrigatorio</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(509, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Uma das <span className="teal">maiores</span> escolas de ingles do pais.</T>
  </div>
));

SLIDE_REGISTRY.set(510, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Milhoes de <span className="bold">visualizacoes</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(511, () => (
  <div className="slide center">
    <T size={42} weight={500} opacity={0.5} anim="anim-fadeUp">E mais de <span className="teal">1 milhao de horas</span> reproduzidas.</T>
  </div>
));

SLIDE_REGISTRY.set(512, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Essa ideia sozinha <span className="teal">mudou</span> tudo.</T>
  
  </div>
));

SLIDE_REGISTRY.set(513, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="bold">Largou</span> tudo. E mesmo assim desistiu.</T>
  </div>
));

SLIDE_REGISTRY.set(514, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">E esse grupo era <span className="red" style={{ fontWeight: 700 }}>maior</span> do que eu gostaria.</T>
  </div>
));

SLIDE_REGISTRY.set(515, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.4} anim="anim-fadeUp">Fiz o que qualquer <span className="bold">dono de curso</span> faria.</T>
  </div>
));

SLIDE_REGISTRY.set(516, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Mudei a ordem das aulas. <span className="bold">Contratei</span> gente nova.</T>
  </div>
));

SLIDE_REGISTRY.set(517, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="bold">Eu</span> fui fazer uma coisa que ninguem faz.</T>
  
  </div>
));

SLIDE_REGISTRY.set(518, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Eles so <span className="bold">persistiram</span> mais.</T>
  
  </div>
));

SLIDE_REGISTRY.set(519, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Pra quem ia la e <span className="bold">fazia</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(520, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-slideLeft">Fui olhar se acontecia com as <span className="bold">outras escolas</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(521, () => (
  <div className="slide left">
    
    <T size={48} weight={600} opacity={0.55} anim="anim-fadeUp">O <span className="red" style={{ fontWeight: 700 }}>padrao</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(522, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.5} anim="anim-fadeUp">Nao importava a <span className="bold">metodologia</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(523, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="bold">Gente</span> que estava motivada.</T>
  </div>
));

SLIDE_REGISTRY.set(524, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Com o <span className="teal">melhor material</span> disponivel.</T>
  </div>
));

SLIDE_REGISTRY.set(525, () => (
  <div className="slide right">
    <T size={44} weight={500} opacity={0.5} anim="anim-slideRight">Que ninguem tinha <span className="bold">percebido</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(526, () => (
  <div className="slide center">
    <T size={72} weight={500} opacity={0.7} anim="anim-scaleIn"><span className="red" style={{ fontWeight: 700 }}>Aula.</span></T>
  </div>
));

SLIDE_REGISTRY.set(527, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">Gastar <span className="red" style={{ fontWeight: 700 }}>energia mental</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(528, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="bold">Pensa</span> na sua rotina. A rotina <span className="bold">real</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(529, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Se acordou ja tinha coisa pra <span className="bold">resolver</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(530, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">A qualidade nao <span className="bold">importa</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(531, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.4} anim="anim-fadeUp">A importancia do projeto de <span className="teal">ingles</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(532, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="red" style={{ fontWeight: 700 }}>Mentalmente esgotados</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(533, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp"><span className="bold">Adivinha</span> o que aconteceu.</T>
  </div>
));

SLIDE_REGISTRY.set(534, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Isso tem nome.</T>
  </div>
));

SLIDE_REGISTRY.set(535, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Ela atinge <span className="bold">praticamente todo adulto</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(536, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Na <span className="bold">correria</span> do dia a dia.</T>
  </div>
));

SLIDE_REGISTRY.set(537, () => (
  <div className="slide center">
    
    <T size={48} weight={600} opacity={0.55} anim="anim-fadeUp">O ingles <span className="red" style={{ fontWeight: 700 }}>nao entra</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(538, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Por nao ter se <span className="bold">comprometido</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(539, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Novas <span className="teal">maneiras</span> de passar o mesmo conteudo.</T>
  </div>
));

SLIDE_REGISTRY.set(540, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Pra quem <span className="bold">levava</span> a vida agitada.</T>
  </div>
));

SLIDE_REGISTRY.set(541, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">Repetisse <span className="teal">30, 40, 50 vezes</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(542, () => (
  <div className="slide center">
    <T size={54} weight={500} opacity={0.6} anim="anim-scaleIn">Sem <span className="bold">cansar</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(543, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Porque <span className="bold">quer</span>. Nao porque <span className="bold">precisa</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(544, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Cresci dentro da <span className="teal">musica</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(545, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Eu cresci dentro da <span className="teal">musica</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(546, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Por isso funciona <span className="teal">tao bem</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(547, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">Eu quis <span className="bold">provar</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(548, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="bold">Todas</span> as civilizacoes.</T>
  </div>
));

SLIDE_REGISTRY.set(549, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Ensinam principios atraves de <span className="teal">musica</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(550, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-scaleIn">Robert <span className="bold">Zatorre</span>. Neurocientista.</T>
  
  </div>
));

SLIDE_REGISTRY.set(551, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">No corredor do <span className="bold">asilo</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(552, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">Cantando <span className="teal">palavra por palavra</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(553, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">A equipe disse que aquilo era <span className="bold">normal</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(554, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Cantavam o tempo todo. <span className="bold">Mesmo</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(555, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Musicas da <span className="teal">adolescencia</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(556, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Como se tivessem acabado de <span className="bold">aprender</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(557, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Gravar conteudo no <span className="teal">cerebro</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(558, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Provar o que todo mundo ja <span className="bold">sentia</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(559, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Provar o que todo mundo ja sentia por <span className="bold">experiencia</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(560, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Virou <span className="teal">referencia</span> mundial.</T>
  
  </div>
));

SLIDE_REGISTRY.set(561, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Essa <span className="teal">dopamina</span> turbina sua memoria.</T>
  </div>
));

SLIDE_REGISTRY.set(562, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">E e por isso que o que voce <span className="bold">ouve com prazer</span>, voce grava.</T>
  </div>
));

SLIDE_REGISTRY.set(563, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Mas com <span className="bold">palavra</span>...</T>
  </div>
));

SLIDE_REGISTRY.set(564, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp"><span className="bold">Sem pensar</span>, voce completa.</T>
  </div>
));

SLIDE_REGISTRY.set(565, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Musiquinha de <span className="bold">escola</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(566, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">E parou de ser levada a serio como <span className="teal">ferramenta</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(567, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Coisas que voce ja faz no <span className="bold">automatico</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(568, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="teal">Hoje</span> voce faz sem pensar.</T>
  </div>
));

SLIDE_REGISTRY.set(569, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">O <span className="bold">automatico</span> do nosso cerebro.</T>
  </div>
));

SLIDE_REGISTRY.set(570, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Com o ingles e <span className="bold">exatamente igual</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(571, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Pra instalar ele no seu <span className="teal">subconsciente</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(572, () => (
  <div className="slide center">
    <T size={52} weight={500} opacity={0.6} anim="anim-scaleIn">Mas do <span className="bold">essencial</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(573, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Mais de <span className="teal">90%</span> de tudo que e falado no dia a dia.</T>
  </div>
));

SLIDE_REGISTRY.set(574, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Dos <span className="bold">nativos americanos</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(575, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">De todas as <span className="teal">conversas</span> em ingles.</T>
  
  </div>
));

SLIDE_REGISTRY.set(576, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">Dezenas de <span className="bold">vezes</span>. Sem perceber.</T>
  </div>
));

SLIDE_REGISTRY.set(577, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Nao parece <span className="bold">estudo</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(578, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Ouvisse essa musica <span className="teal">30, 40, 50 vezes</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(579, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nao conseguia fazer <span className="red" style={{ fontWeight: 700 }}>nenhum</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(580, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nao fez <span className="red" style={{ fontWeight: 700 }}>nenhum</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(581, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Testar a reacao <span className="bold">natural</span> deles.</T>
  </div>
));

SLIDE_REGISTRY.set(582, () => (
  <div className="slide center">
    <T size={64} weight={500} opacity={0.65} anim="anim-scaleIn"><span className="teal">Resultado</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(583, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Tinham <span className="red" style={{ fontWeight: 700 }}>desistido</span> dos cursos mais famosos.</T>
  
  </div>
));

SLIDE_REGISTRY.set(584, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Ja aceitavam que <span className="bold">nao iam</span> aprender.</T>
  </div>
));

SLIDE_REGISTRY.set(585, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Sentindo a <span className="teal">influencia</span> comecar.</T>
  </div>
));

SLIDE_REGISTRY.set(586, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Esses <span className="bold">mesmos</span> alunos que tinham desistido.</T>
  </div>
));

SLIDE_REGISTRY.set(587, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Fazia <span className="bold">aula presencial</span> nos Estados Unidos.</T>
  </div>
));

SLIDE_REGISTRY.set(588, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Uma das decisoes mais <span className="red" style={{ fontWeight: 700 }}>arriscadas</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(589, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Se funcionou pros <span className="bold">piores</span> alunos...</T>
  
  </div>
));

SLIDE_REGISTRY.set(590, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Eu nao conseguia <span className="bold">fingir</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(591, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Tinha que ser o tipo que voce coloca no <span className="bold">carro</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(592, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Porque e <span className="teal">gostosa de ouvir</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(593, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">A velocidade <span className="bold">real</span>. As expressoes <span className="bold">reais</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(594, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O unico formato que voce <span className="teal">repete sem perceber</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(595, () => (
  <div className="slide center">
    <T size={52} weight={500} opacity={0.6} anim="anim-scaleIn">A <span className="bold">repeticao musical</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(596, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Tudo <span className="bold">organizado</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(597, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Aqui estao os <span className="bold">blocos essenciais</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(598, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Cada musica tem letra completa em <span className="teal">ingles e portugues</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(599, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">No <span className="bold">comeco</span> voce acompanha com os olhos.</T>
  </div>
));

SLIDE_REGISTRY.set(600, () => (
  <div className="slide center">
    <T size={52} weight={500} opacity={0.6} anim="anim-scaleIn">A musica <span className="teal">gruda</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(601, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Entender <span className="bold">sem precisar olhar</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(602, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O ingles ja comeca a <span className="teal">entrar</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(603, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O brasileiro tem <span className="bold">furos especificos</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(604, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O <span className="bold">vocabulario</span> ja esta la.</T>
  
  </div>
));

SLIDE_REGISTRY.set(605, () => {
  const v = [useStackVisible(605, 0), useStackVisible(605, 1), useStackVisible(605, 2), useStackVisible(605, 3)];
  return (
    <div className="slide left">
      {v[0] && <T size={40} weight={500} opacity={0.4} anim="anim-slideLeft"><span className="teal">Pronuncia</span>.</T>}
      {v[0] && <Spacer h={10} />}
      {v[1] && <T size={40} weight={500} opacity={0.45} anim="anim-slideLeft">Ingles <span className="bold">emendado</span>.</T>}
      {v[1] && <Spacer h={10} />}
      {v[2] && <T size={40} weight={500} opacity={0.5} anim="anim-slideLeft"><span className="bold">Expressoes</span>.</T>}
      {v[2] && <Spacer h={10} />}
      {v[3] && <T size={40} weight={500} opacity={0.55} anim="anim-slideLeft"><span className="bold">Combinacoes</span>.</T>}
    </div>
  );
});

SLIDE_REGISTRY.set(606, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">Cinco <span className="bold">trilhas de correcao</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(607, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Voce identifica onde esta <span className="bold">travando</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(608, () => (
  <div className="slide center">
    <T size={52} weight={500} opacity={0.55} anim="anim-fadeUp">E vai <span className="teal">direto</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(609, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp">A <span className="teal">fluencia</span> comeca a aparecer de verdade.</T>
  
  </div>
));

SLIDE_REGISTRY.set(610, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Episodios completos de <span className="teal">series</span>. Cena por cena.</T>
  </div>
));

SLIDE_REGISTRY.set(611, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Dialogo <span className="bold">real</span>. Velocidade <span className="bold">real</span>. Expressao <span className="bold">real</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(612, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-scaleIn">Tudo transformado em <span className="teal">musica</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(613, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">E todo mes entram <span className="bold">episodios novos</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(614, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">Te deixam <span className="bold">pronto</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(615, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">Sem <span className="teal">trava nenhuma</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(616, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">As <span className="bold">mesmas falas</span> que voce ouviu em musica.</T>
  </div>
));

SLIDE_REGISTRY.set(617, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">So que dessa vez <span className="red" style={{ fontWeight: 700 }}>sem musica</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(618, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Voce <span className="bold">entende</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(619, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp">Essa sensacao nao tem <span className="teal">comparacao</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(620, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nenhum curso ja te deu <span className="bold">isso</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(621, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Voce simplesmente <span className="bold">ouviu</span>. E a musica fez o resto.</T>
  </div>
));

SLIDE_REGISTRY.set(622, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O que antes era so <span className="bold">embolado</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(623, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O ouvido comeca a <span className="teal">reconhecer</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(624, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Chega um dia que voce <span className="bold">nao esperava</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(625, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O ingles ja esta <span className="teal">instalado</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(626, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Momentos antes <span className="bold">desperdicados</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(627, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Sem voce <span className="teal">perceber</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(628, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Quanto voce precisa <span className="bold">investir</span>?</T>
  
  </div>
));

SLIDE_REGISTRY.set(629, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O unico formato que <span className="teal">instala</span> o ingles no subconsciente.</T>
  </div>
));

SLIDE_REGISTRY.set(630, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Superior ao <span className="bold">mercado</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(631, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">So <span className="teal">RSLIDE_REGISTRY.set(631, () => (
  <div className="slide left">
    99</span> mensais.</T>
  
  </div>
));

SLIDE_REGISTRY.set(632, () => (
  <div className="slide center">
    <T size={52} weight={500} opacity={0.6} anim="anim-fadeUp">So <span className="teal">R$199</span> mensais.</T>
  </div>
));

SLIDE_REGISTRY.set(633, () => {
  const v = [useStackVisible(633, 0), useStackVisible(633, 1), useStackVisible(633, 2), useStackVisible(633, 3)];
  return (
    <div className="slide left">
      {v[0] && <T size={40} weight={500} opacity={0.4} anim="anim-slideLeft"><span className="teal">Blocos essenciais</span>.</T>}
      {v[0] && <Spacer h={10} />}
      {v[1] && <T size={40} weight={500} opacity={0.45} anim="anim-slideLeft"><span className="bold">5 trilhas</span> de correcao.</T>}
      {v[1] && <Spacer h={10} />}
      {v[2] && <T size={40} weight={500} opacity={0.5} anim="anim-slideLeft"><span className="bold">Series cantadas</span>.</T>}
      {v[2] && <Spacer h={10} />}
      {v[3] && <T size={40} weight={500} opacity={0.55} anim="anim-slideLeft">Material <span className="bold">bilingue</span>.</T>}
    </div>
  );
});

SLIDE_REGISTRY.set(634, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Material <span className="bold">bilingue</span>. Tudo incluido.</T>
  
  </div>
));

SLIDE_REGISTRY.set(635, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="teal">R$99</span> por mes.</T>
  
  </div>
));

SLIDE_REGISTRY.set(636, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Ser fluente vale mais que <span className="teal">R$99</span>?</T>
  
  </div>
));

SLIDE_REGISTRY.set(637, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Se ja tentou de tudo e <span className="red" style={{ fontWeight: 700 }}>nada funcionou</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(638, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">Por que a gente fez <span className="bold">isso</span>?</T>
  </div>
));

SLIDE_REGISTRY.set(639, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">A verdade: isso e um <span className="bold">teste</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(640, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">A gente ta errado em cobrar tao <span className="teal">barato</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(641, () => (
  <div className="slide center">
    <T size={52} weight={500} opacity={0.6} anim="anim-scaleIn">Quem entrar <span className="bold">agora</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(642, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Acesso <span className="teal">completo</span> a Rota da Fluencia.</T>
  </div>
));

SLIDE_REGISTRY.set(643, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="bold">Checkout seguro</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(644, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Voce <span className="bold">digita</span>. Pronto.</T>
  </div>
));

SLIDE_REGISTRY.set(645, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Deixa eu resolver uma <span className="bold">coisa</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(646, () => (
  <div className="slide center">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Um mes de <span className="teal">avaliacao</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(647, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.45} anim="anim-fadeUp">Voce pode cancelar <span className="bold">quando quiser</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(648, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp">Gostoso de <span className="teal">verdade</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(649, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Voce ta ouvindo <span className="bold">musica</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(650, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">O ingles ta entrando <span className="bold">junto</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(651, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Se nao gostar, <span className="bold">pede o dinheiro</span> de volta.</T>
  </div>
));

SLIDE_REGISTRY.set(652, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Um ingles que nenhum <span className="bold">curso</span> conseguiu te dar.</T>
  </div>
));

SLIDE_REGISTRY.set(653, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp">Voce nao chegou ate aqui por <span className="teal">acaso</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(654, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Porque o <span className="red" style={{ fontWeight: 700 }}>formato</span> nunca foi feito pra voce.</T>
  </div>
));

SLIDE_REGISTRY.set(655, () => (
  <div className="slide left">
    
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Serie sem <span className="bold">legenda</span>.</T>
  
  </div>
));

SLIDE_REGISTRY.set(656, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Voce <span className="bold">vai</span> lembrar.</T>
  </div>
));


// Split S44 (stack) — midpoint
SLIDE_REGISTRY.set(657, () => (
  <div className="slide left">
    <T size={42} weight={500} opacity={0.4} anim="anim-fadeUp">Eles <span className="red" style={{ fontWeight: 700 }}>nao voltavam</span> mais.</T>
  </div>
));

// Split S46 (stack) — after 'didatica' second mention
SLIDE_REGISTRY.set(658, () => (
  <div className="slide left">
    <T size={42} weight={500} opacity={0.45} anim="anim-slideLeft">Melhorou a <span className="bold">didatica</span>. De novo.</T>
  </div>
));

// ─── Rebuilt slides (135-298, 400-401) ────────────────
SLIDE_REGISTRY.set(299, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Um metodo com base em <span className="teal">pesquisas</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(300, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Neste video, vou te <span className="bold">mostrar</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(301, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Ja estava na sua <span className="bold">cara</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(259, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Vendedor <span className="bold">americano</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(261, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Uma ideia que mudou <span className="teal">milhares</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(262, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Largou <span className="bold">tudo</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(263, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Nenhum dono de escola te falaria isso.</T>
  </div>
));

SLIDE_REGISTRY.set(264, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Por que voce <span className="red" style={{ fontWeight: 700 }}>nao aprendeu</span> ate agora.</T>
  </div>
));

SLIDE_REGISTRY.set(265, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Milhares que <span className="teal">aprenderam</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(266, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">A qualidade nao <span className="bold">importa</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(267, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Cresci dentro da <span className="teal">musica</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(268, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Aulas pesadas demais pra <span className="bold">crianca</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(269, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Mudanca de <span className="bold">formato</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(270, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Musica <span className="teal">disfarca</span> o conteudo.</T>
  </div>
));

SLIDE_REGISTRY.set(271, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Por que nao com <span className="bold">adultos</span>?</T>
  </div>
));

SLIDE_REGISTRY.set(272, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">O fundamento <span className="bold">real</span> da musica.</T>
  </div>
));

SLIDE_REGISTRY.set(274, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Ver dentro do <span className="teal">cerebro</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(275, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Esquece o professor. Lembra a <span className="bold">musica</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(276, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">A resposta sai <span className="teal">antes</span> de pensar.</T>
  </div>
));

SLIDE_REGISTRY.set(277, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn"><span className="bold">Automatico</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(278, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Conteudo <span className="teal">disfarcado</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(279, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Musicas sao <span className="bold">poesia</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(280, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Resultado. Hora de <span className="teal">testar</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(281, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Nao podia <span className="bold">fingir</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(282, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Meses de <span className="teal">producao</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(283, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Algo <span className="bold">imperceptivel</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(284, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Nao por <span className="bold">estudar</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(285, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Composicao. Engenharia. <span className="teal">Masterizacao</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(286, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">5 trilhas. Series. <span className="bold">Discursos</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(287, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Teste de <span className="teal">mercado</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(289, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Series <span className="bold">conversacionais</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(290, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Talvez uma <span className="bold">ideia ruim</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(291, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Checkout <span className="teal">seguro</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(292, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Fone. <span className="bold">Play</span>. Ouvido.</T>
  </div>
));

SLIDE_REGISTRY.set(293, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">So dar <span className="teal">play</span> e ouvir.</T>
  </div>
));

SLIDE_REGISTRY.set(294, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Solicitar <span className="bold">reembolso</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(295, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Decisao de <span className="teal">permanencia</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(296, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Testamos nos <span className="bold">piores</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(297, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Continuaram. Mandaram <span className="teal">mensagem</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(298, () => (
  <div className="slide center">
    <T size={36} weight={600} opacity={0.4} anim="anim-blurIn">Nao diz nada sobre sua <span className="bold">capacidade</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(135, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">No <span className="bold">comeco</span> era dificil. Voce era travado.</T>
  </div>
));

SLIDE_REGISTRY.set(136, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O ingles que <span className="teal">importa</span> quando ta comecando.</T>
  </div>
));

SLIDE_REGISTRY.set(138, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">Nao do ingles <span className="bold">inteiro</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(141, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp"><span className="teal">500 palavras</span> = 90% das conversas.</T>
  </div>
));

SLIDE_REGISTRY.set(143, () => (
  <div className="slide center">
    <div className="glow-teal" style={{ top: "25%", left: "25%" }} />
    <T size={56} weight={700} opacity={0.6} anim="anim-scaleIn"><span className="bold">REPETICAO MUSICAL</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(144, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Conteudo entra pelo unico <span className="teal">canal</span> que seu cerebro nao fecha.</T>
  </div>
));

SLIDE_REGISTRY.set(150, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">A imersao se <span className="bold">solidifica</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(151, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">E se pegasse o <span className="bold">script</span> real de uma serie...</T>
  </div>
));

SLIDE_REGISTRY.set(152, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">...e transformasse em <span className="teal">musica</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(153, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Ouvisse <span className="bold">40, 50 vezes</span>...</T>
  </div>
));

SLIDE_REGISTRY.set(154, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nao e <span className="bold">batida por cima</span>.</T>
    <Spacer h={12} />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">Cada cena precisa de uma composicao original.</T>
  </div>
));

SLIDE_REGISTRY.set(156, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="bold">Melodia</span>. Arranjo. Producao completa.</T>
  </div>
));

SLIDE_REGISTRY.set(157, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">Musica que voce escuta por <span className="teal">prazer</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(158, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Primeiro episodio de <span className="bold">Serie Cantada</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(159, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nao nos <span className="bold">melhores</span>.</T>
    <Spacer h={12} />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">A gente foi atras dos piores.</T>
  </div>
));

SLIDE_REGISTRY.set(160, () => (
  <div className="slide center">
    <T size={56} weight={500} opacity={0.6} anim="anim-scaleIn">Nos <span className="red" style={{ fontWeight: 700 }}>PIORES</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(162, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Sem cobranca. Sem <span className="bold">prazo</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(164, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Entenda o <span className="bold">peso</span> disso.</T>
  </div>
));

SLIDE_REGISTRY.set(165, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Pessoas que tinham <span className="red" style={{ fontWeight: 700 }}>desistido</span>.</T>
    <Spacer h={12} />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">Dos cursos mais famosos da internet.</T>
  </div>
));

SLIDE_REGISTRY.set(167, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Achavam que <span className="red" style={{ fontWeight: 700 }}>NUNCA</span> iam aprender.</T>
    <Spacer h={12} />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">E agora estavam voltando.</T>
  </div>
));

SLIDE_REGISTRY.set(166, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Desistiram nas primeiras semanas. Agora <span className="teal">escutando</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(168, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp"><span className="teal">1 a 2 horas</span> por dia. De plataforma.</T>
  </div>
));

SLIDE_REGISTRY.set(171, () => (
  <div className="slide center">
    <T size={28} weight={600} opacity={0.35} anim="anim-blurIn">MENSAGEM DO ALUNO.</T>
  </div>
));

SLIDE_REGISTRY.set(172, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nao dava pra tratar como <span className="bold">experimento</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(176, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Todo mes entram <span className="bold">episodios novos</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(181, () => (
  <div className="slide center">
    <div className="glow-teal" style={{ top: "25%", left: "25%" }} />
    <T size={72} weight={900} opacity={0.7} anim="anim-scaleIn"><span className="teal">INGLES CANTADO</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(186, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Voce da <span className="bold">play</span> e comeca do zero.</T>
  </div>
));

SLIDE_REGISTRY.set(187, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Base instalada. <span className="teal">Repeticao</span> pra conversas reais.</T>
  </div>
));

SLIDE_REGISTRY.set(188, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Deixa eu te mostrar na <span className="bold">pratica</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(190, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0} anim="anim-fadeUp"></T>
  </div>
));

SLIDE_REGISTRY.set(191, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.4} anim="anim-fadeUp">Chuveiro. Transito. Lavando louca.</T>
  </div>
));

SLIDE_REGISTRY.set(192, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O ingles <span className="teal">entrou</span> sem pedir permissao.</T>
  </div>
));

SLIDE_REGISTRY.set(193, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Cerebro esgotado. Zero energia. Da <span className="bold">play</span>. O ingles entra.</T>
  </div>
));

SLIDE_REGISTRY.set(196, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nao porque ficou <span className="bold">estudando</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(197, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O ingles ja <span className="teal">estava la</span>. Gravado por musica.</T>
  </div>
));

SLIDE_REGISTRY.set(199, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Gravado por musica. Sem voce <span className="bold">perceber</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(201, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">2o episodio: mais facil. 3o: antecipa as falas. 5o: <span className="teal">estagio diferente</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(203, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O ingles deixa de ser <span className="bold">barreira</span>. Vira prazer.</T>
  </div>
));

SLIDE_REGISTRY.set(205, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Desce do <span className="bold">aviao</span>.</T>
    <Spacer h={12} />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">Orlando. Lisboa. Nao importa.</T>
  </div>
));

SLIDE_REGISTRY.set(206, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Pede <span className="bold">Uber</span>. Check-in. Conversa.</T>
  </div>
));

SLIDE_REGISTRY.set(207, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Sem <span className="bold">Google Tradutor</span>. Sem no no estomago.</T>
  </div>
));

SLIDE_REGISTRY.set(209, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Aparece a <span className="bold">vaga</span>. O dobro.</T>
  </div>
));

SLIDE_REGISTRY.set(210, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.55} anim="anim-fadeUp">"<span className="teal">Ingles fluente</span>."</T>
  </div>
));

SLIDE_REGISTRY.set(211, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Dessa vez voce <span className="bold">nao fecha</span> a aba.</T>
  </div>
));

SLIDE_REGISTRY.set(212, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Tudo isso no <span className="bold">transito</span>. Na academia. Antes de dormir.</T>
  </div>
));

SLIDE_REGISTRY.set(213, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nao porque teve <span className="bold">disciplina</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(215, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0} anim="anim-fadeUp"></T>
  </div>
));

SLIDE_REGISTRY.set(226, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O que esta <span className="bold">dentro</span>:</T>
  </div>
));

SLIDE_REGISTRY.set(227, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Composicao profissional. <span className="teal">Repeticao musical</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(228, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Funciona quando voce chega <span className="red" style={{ fontWeight: 700 }}>destruido</span> as 10 da noite.</T>
  </div>
));

SLIDE_REGISTRY.set(229, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.5} anim="anim-fadeUp">R$199 mensais.</T>
  </div>
));

SLIDE_REGISTRY.set(230, () => (
  <div className="slide center">
    <div className="glow-teal" style={{ top: "25%", left: "25%" }} />
    <T size={72} weight={900} opacity={0.7} anim="anim-scaleIn"><span className="teal">R$99/mes</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(231, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Com acesso a <span className="bold">TUDO</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(232, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Menos que a <span className="bold">academia</span> que voce nao vai.</T>
  </div>
));

SLIDE_REGISTRY.set(233, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">R$99/mes. Se voce consegue escutar <span className="teal">musicas</span>, voce consegue aprender ingles.</T>
  </div>
));

SLIDE_REGISTRY.set(234, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">Clique no botao aqui <span className="bold">embaixo</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(236, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Series conversacionais. Repeticao <span className="teal">progressiva</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(238, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nao da pra <span className="bold">manter</span> pra sempre.</T>
  </div>
));

SLIDE_REGISTRY.set(240, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Ja pode comecar <span className="teal">hoje</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(241, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">"Marcos, eu nao sei <span className="bold">cantar</span>."</T>
  </div>
));

SLIDE_REGISTRY.set(242, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nao pedi pra cantar. So <span className="bold">ouvir</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(243, () => (
  <div className="slide center">
    <div className="glow-teal" style={{ top: "25%", left: "25%" }} />
    <T size={52} weight={700} opacity={0.6} anim="anim-scaleIn"><span className="teal">30 DIAS</span> de garantia.</T>
  </div>
));

SLIDE_REGISTRY.set(244, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">100% de <span className="bold">reembolso</span>. 1 clique. Sem explicar nada.</T>
  </div>
));

SLIDE_REGISTRY.set(245, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">A gente sabe o que acontece quando voce da <span className="teal">play</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(246, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Pela primeira vez, treinar ingles ficou <span className="teal">gostoso</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(247, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Nao gostou? <span className="bold">Dinheiro de volta</span>. 1 clique.</T>
  </div>
));

SLIDE_REGISTRY.set(248, () => (
  <div className="slide center">
    <T size={52} weight={500} opacity={0.6} anim="anim-fadeUp">E se <span className="bold">funcionar</span>?</T>
  </div>
));

SLIDE_REGISTRY.set(249, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Dessa vez tem tudo pra <span className="teal">funcionar</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(250, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Voce ja tentou. Ja <span className="bold">comprou</span>. Ja parou.</T>
  </div>
));

SLIDE_REGISTRY.set(251, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O <span className="red" style={{ fontWeight: 700 }}>formato</span> nunca foi feito pra voce. Ate agora.</T>
  </div>
));

SLIDE_REGISTRY.set(252, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Existe um formato que seu cerebro <span className="teal">aceita</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(253, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">O mesmo que fez voce <span className="bold">decorar musicas</span> a vida inteira.</T>
  </div>
));

SLIDE_REGISTRY.set(254, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">So que agora as musicas tem <span className="teal">ingles dentro</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(256, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Voce vai <span className="bold">lembrar</span> desse momento.</T>
  </div>
));

SLIDE_REGISTRY.set(257, () => (
  <div className="slide center">
    <div className="glow-teal" style={{ top: "25%", left: "25%" }} />
    <T size={64} weight={900} opacity={0.7} anim="anim-scaleIn">COMECE <span className="teal">AGORA</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(400, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">Filho de <span className="bold">musico</span>. Tio <span className="bold">produtor</span>.</T>
  </div>
));

SLIDE_REGISTRY.set(401, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0} anim="anim-fadeUp"></T>
  </div>
));

// ─── Stack: S178 — 10 da noite / Inglês entra / Resultado ──
SLIDE_REGISTRY.set(178, () => {
  const v = [useStackVisible(178, 0), useStackVisible(178, 1), useStackVisible(178, 2)];
  return (
    <div className="slide center">
      {v[0] && <T size={44} weight={500} opacity={0.4} anim="anim-fadeUp">10 da noite. <span className="bold">Destruido</span>. Play.</T>}
      {v[0] && <Spacer h={14} />}
      {v[1] && <T size={48} weight={600} opacity={0.55} anim="anim-fadeUp">O ingles <span className="teal">entra mesmo assim</span>.</T>}
      {v[1] && <Spacer h={14} />}
      {v[2] && <T size={40} weight={500} opacity={0.4} anim="anim-fadeUp">Olha o <span className="bold">resultado</span>.</T>}
    </div>
  );
});

// ─── Stack: S255 — Chuveiro / Série sem legenda / Avião ──
SLIDE_REGISTRY.set(255, () => {
  const v = [useStackVisible(255, 0), useStackVisible(255, 1), useStackVisible(255, 2)];
  return (
    <div className="slide left">
      {v[0] && <T size={42} weight={500} opacity={0.4} anim="anim-slideLeft"><span className="teal">Chuveiro</span> cantarolando em ingles.</T>}
      {v[0] && <Spacer h={12} />}
      {v[1] && <T size={42} weight={500} opacity={0.45} anim="anim-slideLeft">Serie sem <span className="bold">legenda</span>.</T>}
      {v[1] && <Spacer h={12} />}
      {v[2] && <T size={42} weight={500} opacity={0.5} anim="anim-slideLeft">Aviao sem <span className="bold">Google Tradutor</span>.</T>}
    </div>
  );
});

// ─── Register graph slides (IDs 302-313) ──────────────
GRAPH_SLIDES.forEach((G, i) => SLIDE_REGISTRY.set(302 + i, () => <G />));

// ─── Slide content renderer ─────────────────────────────────
function SlideContent({ index }: { index: number }) {
  const SlideComponent = SLIDE_REGISTRY.get(index);
  if (!SlideComponent) return null;
  return <SlideComponent />;
}

// ─── Main composition (NO B-rolls — horizontal only has slides) ──
export const VSLComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const currentSlide = getCurrentSlide(frame);
  const timeInSeconds = frame / FPS;
  const zoom = getVideoZoom(timeInSeconds);

  return (
    <TimeContext.Provider value={timeInSeconds}>
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Audio */}
      <Audio src={staticFile("vsl_audio_hq.mp3")} startFrom={0} volume={1} />

      {/* Slide layer (left 68%) */}
      <GraphModeProvider value="horizontal">
        <AbsoluteFill key={`slide-${currentSlide}`}>
          <SlideContent index={currentSlide} />
        </AbsoluteFill>
      </GraphModeProvider>

      {/* Marcos video (right side) */}
      <div style={{
        position: "absolute",
        top: 24,
        right: 24,
        bottom: 24,
        width: 540,
        zIndex: 5,
        borderRadius: 20,
        padding: 2,
        background: "linear-gradient(160deg, #4ECDC4, #A78BFA 50%, rgba(78,205,196,0.3))",
        boxShadow: "0 0 40px rgba(78,205,196,0.15), 0 0 80px rgba(167,139,250,0.08)",
      }}>
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: 18,
          overflow: "hidden",
          background: "#0A0A0A",
        }}>
          <Video
            src={staticFile("vsl_marcos.mp4")}
            startFrom={0}
            volume={0}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${zoom})`,
            }}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "rgba(255,255,255,0.03)", zIndex: 10,
      }}>
        <div style={{
          height: "100%",
          width: `${((currentSlide + 1) / SLIDE_REGISTRY.size) * 100}%`,
          background: "linear-gradient(90deg,#4ECDC4,#A78BFA)",
          transition: "width .35s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
    </AbsoluteFill>
    </TimeContext.Provider>
  );
};
