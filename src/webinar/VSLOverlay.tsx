import React, { createContext, useContext } from "react";
import { AbsoluteFill, Video, useCurrentFrame, staticFile } from "remotion";
import { SLIDE_TIMELINE, FPS } from "./timeline";
import { SENTENCE_BOUNDARIES } from "./sentenceBoundaries";
import { GRAPH_SLIDES, GraphModeProvider } from "./GraphSlides";
import { getVisibleStackItems } from "./stackTimings";

// ─── Time context: lets any slide know the current playback time ──
const TimeContext = createContext(0);
export const useVSLTime = () => useContext(TimeContext);

// ─── Hook for stack items: returns true if this item should be visible ──
export function useStackVisible(slide: number, itemIndex: number): boolean {
  const time = useVSLTime();
  return itemIndex < getVisibleStackItems(slide, time);
}

// ─── Zoom: hard cut alternating at each real sentence boundary ──
// Even sentence = scale 1.0, Odd sentence = scale 1.10 — no transition
function getVideoZoom(timeInSeconds: number): number {
  let count = 0;
  for (const boundary of SENTENCE_BOUNDARIES) {
    if (timeInSeconds >= boundary) {
      count++;
    }
  }
  return count % 2 === 0 ? 1.0 : 1.10;
}

// ─── Which slides use DARK background (0-indexed) ───────────
// All others get transparent background
const DARK_SLIDES = new Set([
  // ─── Estruturais ───
  0,   // USE FONES
  1,   // DEMO placeholder
  29,  // Transition line

  // ─── Lead reveals ───
  7,   // 30x/40x
  11,  // Voce ia entender tudo
  12,  // Sem legenda / Sem esforco / Sem ter estudado
  13,  // ISSO E UMA (setup)
  14,  // SERIE CANTADA
  16,  // mesmas estruturas (stack)
  17,  // som embolado → faz sentido
  19,  // universities STACK
  21,  // vai precisar na vida
  22,  // REPETICAO
  24,  // nao porque precisa, mas porque quer
  25,  // A MUSICA
  27,  // objectives STACK

  // ─── Credencial ───
  30,  // Marcos Lobão
  34,  // FLUENCY ROUTE
  35,  // stats STACK

  // ─── Problema — emotional weight ───
  44,  // começou a crescer outro grupo
  45,  // Maior do que eu gostaria
  46,  // Queriam / Desistiam / Nao voltavam
  47,  // fixes tried STACK
  49,  // cursos inacabados agora mesmo
  50,  // fui medir as horas REAIS
  51,  // 15 HORAS
  52,  // 150 HORAS
  53,  // nao eram mais inteligentes
  55,  // padrao identico em todo lugar
  56,  // 90%
  57,  // Kris Nielson
  59,  // Motivados / Horario / Melhor material
  60,  // Quantos chegaram ao final?
  61,  // 1 (alone)
  62,  // 1 em 150
  63,  // O problema nao era o conteudo
  64,  // Todo curso = AULA
  65,  // types STACK
  67,  // Sentar / Prestar atencao / Gastar energia
  69,  // O adulto nao chega assim
  70,  // Sua rotina real
  71,  // routine STACK
  77,  // JOHNS HOPKINS 2024
  78,  // Ofereceram DINHEIRO
  79,  // 90% recusaram
  80,  // regiao recompensa DESLIGADA
  81,  // FADIGA COGNITIVA
  82,  // O ingles nao entra
  83,  // Se sente culpado
  84,  // A culpa nunca foi dele
  85,  // FORMATO
  87,  // 95%
  88,  // porque os dois sao AULA
  89,  // ESFORCO MENTAL
  90,  // com a rotina que voce leva
  91,  // O problema nunca foi O QUE
  92,  // Era o JEITO. Ate agora.
  94,  // Quais sao os formatos
  96,  // criteria STACK

  // ─── Solução ───
  102, // MUSICA
  106, // Robert Zatorre
  110, // Cantando em LATIM
  116, // Nature Neuroscience
  117, // Musica + prazer → DOPAMINA
  118, // Dopamina → MEMORIA
  122, // Complete a frase
  123, // Eu tenho tanto pra lhe falar
  124, // Como e grande meu amor
  125, // A dona aranha
  126, // PAREDE
  133, // Subconsciente = AUTOMATICO
  134, // skills STACK
  137, // REPETICAO callback
  140, // Paul Nation
  141, // 500 palavras = 90%
  142, // DEMO placeholder music
  143, // REPETICAO MUSICAL
  145, // Coldplay / Adele / Ed Sheeran
  152, // transformasse em MUSICA
  155, // Nao e colocar batida por cima
  156, // Melodia / Arranjo / Producao

  // ─── Validação ───
  164, // DEMO testimonial
  165, // Entenda o peso disso
  166, // Pessoas que DESISTIRAM
  167, // Achavam que NUNCA
  168, // Estavam voltando
  169, // 1-2 HORAS POR DIA
  171, // DEMO student message
  175, // A musica tinha que ser BOA
  176, // No carro / No churrasco / No fone
  180, // DEMO result audio
  181, // INGLES CANTADO
  185, // 2. Correcao
  189, // WALKTHROUGH placeholder

  // ─── Emocional ───
  191, // Chuveiro / Transito / Lavando louca
  194, // Abre a serie
  195, // Sem letra / Sem musica / Ingles real
  200, // Voce nao decorou
  201, // progress STACK
  205, // Desce do aviao
  206, // Pede Uber / Check-in / Conversa
  214, // Porque deu PLAY
  251, // O formato nunca foi feito pra voce
  255, // Chuveiro / Serie / Aviao STACK
  256, // Vai lembrar desse momento

  // ─── Preço (TODO dark) ───
  215, // Transition
  216, // Quanto precisa investir
  217, // Escola presencial
  218, // R$12.000 strikethrough
  219, // Cursos online
  220, // 500 aulas, 10%
  221, // IC funciona quando nenhum
  222, // 22h. Esgotado. Play.
  223, // Mercado <5%
  226, // O que esta dentro
  227, // deliverables STACK
  228, // Unico formato subconsciente
  229, // R$199 strikethrough
  230, // R$99
  231, // Com acesso a TUDO
  234, // CTA with arrow
  236, // BONUS
  237, // 2 plataformas
  239, // CTA repeat with arrow

  // ─── Garantia ───
  243, // 30 DIAS DE GARANTIA
  244, // 100% reembolso
  247, // Nao gostou? Dinheiro de volta
  248, // E se funcionar?
  249, // Dessa vez tem tudo pra funcionar
  250, // Voce ja tentou / Ja comprou / Ja parou
  254, // So que agora musicas tem ingles dentro
  257, // CTA FINAL with arrow

  // ─── Graph slides (all dark) ───
  258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269,
]);

// ─── CSS for 9:16 overlay ───────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}

/* ── progress bar (9:16) ── */
.progress-bar{position:absolute;top:0;left:0;height:2px;z-index:999;background:linear-gradient(90deg,#4ECDC4,#A78BFA);transition:width .35s cubic-bezier(.4,0,.2,1);}

/* ── glow backgrounds (scaled for 9:16) ── */
.glow-teal{position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(78,205,196,.08),transparent 70%);pointer-events:none;filter:blur(60px);}
.glow-purple{position:absolute;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.07),transparent 70%);pointer-events:none;filter:blur(60px);}
.glow-red{position:absolute;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,107,.07),transparent 70%);pointer-events:none;filter:blur(60px);}

/* ── slide wrapper (9:16 vertical) ── */
.slide{display:flex;flex-direction:column;justify-content:center;width:100%;height:100%;padding:80px 48px;position:relative;overflow:hidden;color:#ffffff;}
.slide.center{align-items:center;text-align:center;}
.slide.left{align-items:flex-start;text-align:left;padding-left:56px;}
.slide.right{align-items:flex-end;text-align:right;padding-right:56px;}

/* ── dark bg for slides that dominate ── */
.slide-dark{background:#0A0A0A;}
.slide-transparent{background:transparent;}

/* ── B-roll overlay: force dark slides to be transparent with text shadow ── */
.broll-force-transparent .slide-dark{background:transparent;text-shadow:0 2px 12px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.6);}

/* ── text utils ── */
.gradient-text{background:linear-gradient(135deg,#4ECDC4,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.gradient-animated{background:linear-gradient(135deg,#4ECDC4,#A78BFA,#4ECDC4);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradMove 3s ease infinite;}
.teal{color:#4ECDC4;}
.purple{color:#A78BFA;}
.red{color:#FF6B6B;}
.dim{opacity:.35;}
.dim2{opacity:.2;}
.dim3{opacity:.55;}
.bold{font-weight:700;color:#fff;}

.accent-line{width:48px;height:3px;background:linear-gradient(90deg,#4ECDC4,#A78BFA);border-radius:2px;margin-bottom:20px;}
.accent-line-r{width:48px;height:3px;background:linear-gradient(90deg,#4ECDC4,#A78BFA);border-radius:2px;margin-bottom:20px;margin-left:auto;}

/* ── glow text ── */
.glow-teal-text{text-shadow:0 0 40px rgba(78,205,196,.4),0 0 80px rgba(78,205,196,.15);}
.glow-red-text{text-shadow:0 0 40px rgba(255,107,107,.4),0 0 80px rgba(255,107,107,.15);}
.glow-gradient-text{filter:drop-shadow(0 0 30px rgba(78,205,196,.3)) drop-shadow(0 0 60px rgba(167,139,250,.2));}

/* ── overlay text shadow for readability over video ── */
.ovr-shadow{text-shadow:0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5);}

/* ── strikethrough line ── */
.strike-line{position:absolute;left:-4%;top:50%;width:108%;height:3px;background:#FF6B6B;transform:rotate(-4deg);border-radius:2px;}

/* ── card (9:16) ── */
.card{background:linear-gradient(145deg,rgba(78,205,196,.06),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.04);border-radius:16px;padding:28px 24px;width:100%;max-width:380px;}

/* ── CTA button (9:16) ── */
.cta-btn{display:inline-block;padding:16px 40px;border-radius:14px;background:linear-gradient(135deg,#4ECDC4,#A78BFA);font-size:22px;font-weight:700;color:#fff;letter-spacing:1px;text-transform:uppercase;box-shadow:0 0 40px rgba(78,205,196,.25),0 0 80px rgba(167,139,250,.15);}

/* ── animations ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes blurIn{from{opacity:0;filter:blur(12px)}to{opacity:1;filter:blur(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
@keyframes slideLeft{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideRight{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
@keyframes gradMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}
@keyframes lineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}

.anim-fadeUp{animation:fadeUp .7s ease both;}
.anim-blurIn{animation:blurIn .8s ease both;}
.anim-scaleIn{animation:scaleIn .7s ease both;}
.anim-slideLeft{animation:slideLeft .7s ease both;}
.anim-slideRight{animation:slideRight .7s ease both;}
.anim-fadeIn{animation:fadeIn .6s ease both;}
.fg{animation:lineGrow .8s cubic-bezier(.16,1,.3,1) both;transform-origin:left}

.d1{animation-delay:.1s}
.d2{animation-delay:.25s}
.d3{animation-delay:.4s}
.d4{animation-delay:.55s}
.d5{animation-delay:.7s}
.d6{animation-delay:.85s}
.d7{animation-delay:1s}
.d8{animation-delay:1.15s}

/* ── waveform bars (9:16) ── */
.waveform{display:flex;align-items:flex-end;gap:2px;height:40px;}
.waveform .bar{width:3px;background:#4ECDC4;border-radius:2px;}

/* ── double glow bg ── */
.double-glow{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.double-glow::before{content:'';position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(78,205,196,.1),transparent 70%);top:25%;left:10%;filter:blur(80px);}
.double-glow::after{content:'';position:absolute;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.08),transparent 70%);bottom:25%;right:10%;filter:blur(80px);}
`;

// ─── vScale: font sizing for 9:16 vertical (1080x1920) ──────
// Generous sizing — readable on mobile, impactful
const vScale = (px: number) => {
  if (px >= 200) return Math.round(px * 0.68);  // 220→150, 200→136
  if (px >= 150) return Math.round(px * 0.73);  // 180→131, 160→117, 150→110
  if (px >= 100) return Math.round(px * 0.78);  // 120→94, 100→78
  if (px >= 80) return Math.round(px * 0.83);   // 90→75, 80→66
  if (px >= 60) return Math.round(px * 0.88);   // 72→63, 68→60, 60→53
  if (px >= 42) return Math.round(px * 0.93);   // 48→45, 44→41, 42→39
  return px; // 40 and below stays as-is
};

// ─── Helper: get current slide index based on frame ─────────
// Timeline is sorted by startTime — find the last entry where time >= startTime
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

// ─── Helper tiny components ─────────────────────────────────
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
      fontSize: vScale(size),
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

/* Overlay-aware T: adds text-shadow when transparent */
const OT = ({
  children,
  size = 42,
  weight = 400,
  opacity = 1,
  color,
  className = "",
  style = {},
  anim = "anim-fadeUp",
  delay = "",
  ovr = false,
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
  ovr?: boolean;
}) => (
  <div
    className={`${anim} ${delay} ${className} ${ovr ? "ovr-shadow" : ""}`}
    style={{
      fontSize: vScale(size),
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

// ─── ALL 258 SLIDES (9:16 overlay version) ──────────────────
const slides: (() => JSX.Element)[] = [

  // ═══ BLOCK 1 — LEAD ═══

  // 1 — USE FONES [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" style={{ top: "30%", left: "35%" }} />
      <HeadphoneSVG />
      <Spacer h={24} />
      <T size={28} weight={500} opacity={0.5} anim="anim-blurIn" delay="d2">USE FONES</T>
    </div>
  ),

  // 2 — DEMO placeholder [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="card anim-scaleIn" style={{ padding: "48px 56px", minWidth: 360 }}>
        <T size={16} weight={600} opacity={0.4} style={{ letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>DEMO — SERIE CANTADA</T>
        <Spacer h={16} />
        <WaveformBars />
        <Spacer h={24} />
        <T size={20} weight={500} opacity={0.35}>FRIENDS S01E01</T>
      </div>
    </div>
  ),

  // 3 — AGORA A CENA ORIGINAL [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={36} weight={400} opacity={0.2} anim="anim-blurIn" ovr>AGORA A CENA ORIGINAL</OT>
    </div>
  ),

  // 4 — Voce acabou de ouvir [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={48} weight={400} opacity={0.7} anim="anim-slideLeft" ovr>
        Voce acabou de ouvir uma cena de <span className="teal" style={{ fontWeight: 700 }}>Friends</span>.
      </OT>
    </div>
  ),

  // 5 — So que nao do jeito [TRANSPARENT]
  () => (
    <div className="slide right slide-transparent">
      <OT size={48} weight={400} opacity={0.5} anim="anim-slideRight" ovr>
        So que nao do jeito que voce ta <span className="bold">acostumado</span>.
      </OT>
    </div>
  ),

  // 6 — uma unica vez [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={400} opacity={0.7} ovr>
        Voce ouviu isso <span className="gradient-animated" style={{ fontWeight: 700 }}>uma unica vez</span>.
      </OT>
    </div>
  ),

  // 7 — Agora imagina ouvindo isso [TRANSPARENT]
  () => (
    <div className="slide right slide-transparent">
      <OT size={42} weight={400} opacity={0.35} anim="anim-slideRight" ovr>Agora imagina ouvindo isso</OT>
    </div>
  ),

  // 8 — 30x / 40x [DARK]
  () => (
    <div className="slide center slide-dark">
      <div style={{ position: "absolute", fontSize: 200, fontWeight: 900, color: "rgba(78,205,196,.02)", pointerEvents: "none" }} className="anim-fadeIn">40</div>
      <T size={60} weight={700} color="rgba(78,205,196,.3)" anim="anim-scaleIn">30x</T>
      <Spacer h={16} />
      <T size={220} weight={900} color="#4ECDC4" anim="anim-scaleIn" delay="d2" className="glow-teal-text">40x</T>
    </div>
  ),

  // 9 — No transito / Na academia / Antes de dormir [TRANSPARENT] — synced to speech
  () => {
    const v = [useStackVisible(9, 0), useStackVisible(9, 1), useStackVisible(9, 2)];
    return (
      <div className="slide left slide-transparent">
        {v[0] && <OT size={44} weight={500} opacity={0.3} anim="anim-slideLeft" style={{ paddingLeft: 0 }} ovr>No transito.</OT>}
        {v[0] && <Spacer h={12} />}
        {v[1] && <OT size={44} weight={500} opacity={0.4} anim="anim-slideLeft" style={{ paddingLeft: 16 }} ovr>Na academia.</OT>}
        {v[1] && <Spacer h={12} />}
        {v[2] && <OT size={44} weight={500} opacity={0.55} anim="anim-slideLeft" style={{ paddingLeft: 32 }} ovr>Antes de dormir.</OT>}
      </div>
    );
  },

  // 10 — grudou [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={500} ovr>
        Porque <span className="gradient-animated" style={{ fontWeight: 700 }}>grudou</span> na sua cabeca.
      </OT>
      <Spacer h={20} />
      <OT size={28} opacity={0.3} anim="anim-fadeUp" delay="d2" ovr>
        Igual aquela musica que voce nao consegue parar de cantar.
      </OT>
    </div>
  ),

  // 11 — cena real tocasse [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.5} ovr>
        O que aconteceria quando a <span className="bold">cena real</span> tocasse?
      </OT>
    </div>
  ),

  // 12 — Voce ia entender tudo [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" style={{ top: "30%", left: "30%" }} />
      <T size={64} weight={700} color="#4ECDC4" className="glow-teal-text" anim="anim-scaleIn">
        Voce ia entender tudo.
      </T>
    </div>
  ),

  // 13 — Sem legenda / Sem esforco / Sem ter estudado [DARK] — synced
  () => {
    const v = [useStackVisible(13, 0), useStackVisible(13, 1), useStackVisible(13, 2)];
    return (
      <div className="slide center slide-dark">
        {v[0] && <T size={68} weight={600} opacity={1} anim="anim-blurIn">Sem legenda.</T>}
        {v[0] && <Spacer h={8} />}
        {v[1] && <T size={68} weight={600} opacity={0.4} anim="anim-blurIn">Sem esforco.</T>}
        {v[1] && <Spacer h={8} />}
        {v[2] && <T size={68} weight={600} opacity={0.2} anim="anim-blurIn">Sem ter estudado nada.</T>}
      </div>
    );
  },

  // 14 — ISSO E UMA [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={20} weight={600} color="#4ECDC4" style={{ letterSpacing: 8, textTransform: "uppercase" }} anim="anim-fadeUp" ovr>
        ISSO E UMA
      </OT>
    </div>
  ),

  // 15 — Serie Cantada [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="double-glow" />
      <T size={100} weight={800} anim="anim-scaleIn">
        <span style={{ color: "#fff" }}>Serie </span>
        <span className="gradient-animated glow-gradient-text">Cantada</span>
      </T>
    </div>
  ),

  // 16 — A cada episodio [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={44} opacity={0.5} anim="anim-slideLeft" ovr>
        A cada episodio <span className="bold">fica mais facil</span>.
      </OT>
    </div>
  ),

  // 17 — mesmas estruturas [TRANSPARENT]
  () => (
    <div className="slide right slide-transparent">
      <OT size={42} opacity={0.55} anim="anim-slideRight" ovr>
        o ingles se repete dentro das <span className="gradient-text" style={{ fontWeight: 700 }}>mesmas estruturas</span>
      </OT>
    </div>
  ),

  // 18 — som embolado → faz sentido [DARK]
  () => (
    <div className="slide center slide-dark">
      <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="anim-fadeUp">
        <T size={42} opacity={0.35} anim="anim-fadeIn">som embolado</T>
        <T size={42} color="#4ECDC4" anim="anim-fadeIn" delay="d2" style={{ margin: "0 8px" }}>&#8594;</T>
        <T size={42} weight={700} anim="anim-fadeIn" delay="d3">faz sentido</T>
      </div>
    </div>
  ),

  // 19 — milhares de brasileiros [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <AccentLine />
      <OT size={42} opacity={0.6} anim="anim-slideLeft" ovr>
        <span className="bold">milhares de brasileiros</span> ja estao usando
      </OT>
    </div>
  ),

  // 20 — universities [DARK] — synced
  () => {
    const unis = ["JOHNS HOPKINS", "McGILL", "STANFORD", "MIT"];
    return (
      <div className="slide left slide-dark">
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
  },

  // 21 — VALIDADO HA DECADAS [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <AccentLine />
      <OT size={48} weight={700} anim="anim-fadeUp" ovr>VALIDADO HA DECADAS</OT>
      <Spacer h={12} />
      <OT size={28} opacity={0.3} anim="anim-fadeUp" delay="d2" ovr>Pesquisas em universidades de referencia mundial</OT>
      <Spacer h={6} />
      <OT size={28} opacity={0.25} anim="anim-fadeUp" delay="d3" ovr>confirmam o poder da musica no aprendizado</OT>
    </div>
  ),

  // 22 — vai precisar na vida [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} ovr>
        O unico metodo que voce <span className="gradient-text" style={{ fontWeight: 700 }}>vai precisar na vida</span>.
      </OT>
    </div>
  ),

  // 23 — REPETICAO [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={100} weight={800} className="glow-teal-text" anim="anim-scaleIn" style={{ color: "#fff" }}>REPETICAO</T>
    </div>
  ),

  // 24 — de um jeito gostoso [TRANSPARENT]
  () => (
    <div className="slide right slide-transparent">
      <OT size={48} opacity={0.6} anim="anim-slideRight" ovr>
        de um jeito <span className="gradient-text" style={{ fontWeight: 700 }}>gostoso</span>
      </OT>
    </div>
  ),

  // 25 — Nao porque precisa [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} ovr>
        Nao porque <span style={{ opacity: 0.25 }}>precisa</span>. Mas porque <span className="bold">quer</span>.
      </OT>
    </div>
  ),

  // 26 — A MUSICA [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="double-glow" />
      <T size={150} weight={900} className="gradient-animated glow-gradient-text" anim="anim-scaleIn">A MUSICA</T>
    </div>
  ),

  // 27 — como ferramenta de repeticao [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={32} opacity={0.2} anim="anim-blurIn" ovr>como ferramenta de repeticao</OT>
    </div>
  ),

  // 28 — objectives [DARK] — synced
  () => {
    const items = ["Trabalhar numa multinacional", "Passar em qualquer entrevista", "Assistir series sem legenda", "Curtir viagens internacionais", "Arrumar um emprego fora"];
    return (
      <div className="slide left slide-dark">
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
  },

  // 29 — O que voce vai ver [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.55} ovr>
        O que voce vai ver vai <span className="bold">mudar completamente</span>...
      </OT>
    </div>
  ),

  // 30 — Transition [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div className="anim-scaleIn" style={{ width: 120, height: 3, background: "linear-gradient(90deg,#4ECDC4,#A78BFA)", borderRadius: 2 }} />
    </div>
  ),

  // ═══ BLOCK 2 — CREDENCIAL ═══

  // 31 — Marcos Lobao [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={72} weight={700} anim="anim-slideLeft" ovr>Marcos Lobao</OT>
      <Spacer h={16} />
      <OT size={28} opacity={0.35} anim="anim-slideLeft" delay="d2" ovr>Fundador da Fluency Route e Ingles Cantado</OT>
    </div>
  ),

  // 32 — Nunca fiz intercambio [TRANSPARENT]
  () => (
    <div className="slide right slide-transparent">
      <OT size={44} opacity={0.4} anim="anim-slideRight" delay="d1" ovr>Nunca fiz intercambio.</OT>
      <Spacer h={8} />
      <OT size={44} weight={600} anim="anim-slideRight" delay="d2" ovr>Nunca morei fora.</OT>
    </div>
  ),

  // 33 — Aprendi ingles aqui [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <AccentLine />
      <OT size={48} anim="anim-fadeUp" ovr>
        Aprendi ingles aqui, <span className="teal">do Brasil</span>.
      </OT>
    </div>
  ),

  // 34 — Vendedor pra empresa americana [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={48} weight={700} anim="anim-slideLeft" ovr>Vendedor pra empresa americana.</OT>
      <Spacer h={16} />
      <OT size={30} opacity={0.35} anim="anim-slideLeft" delay="d2" ovr>convencer americano a comprar</OT>
    </div>
  ),

  // 35 — FLUENCY ROUTE [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={72} weight={800} anim="anim-scaleIn" ovr>FLUENCY ROUTE</OT>
    </div>
  ),

  // 36 — stats [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      {["30+ paises", "1M+ horas", "Milhoes de views"].map((s, i) => (
        <div key={s}>
          <OT size={48} weight={700} anim="anim-scaleIn" delay={["d1", "d2", "d3"][i]} ovr>{s}</OT>
          {i < 2 && <Spacer h={16} />}
        </div>
      ))}
    </div>
  ),

  // 37 — Fluencia e habilidade [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} ovr>Fluencia e habilidade.</OT>
      <Spacer h={12} />
      <OT size={44} anim="anim-fadeUp" delay="d2" ovr>
        Habilidade = <span className="gradient-text" style={{ fontWeight: 700 }}>repeticao</span>.
      </OT>
    </div>
  ),

  // 38 — Aluno nos EUA [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={40} weight={500} anim="anim-slideLeft" ovr>
        Aluno nos EUA largou aula presencial pra usar nossa plataforma.
      </OT>
    </div>
  ),

  // 39 — A ultima parada [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.4} anim="anim-blurIn" ovr>A ultima parada.</OT>
    </div>
  ),

  // 40 — Uma coisa que poucos sabem [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} anim="anim-fadeUp" ovr>Uma coisa que poucos sabem sobre mim.</OT>
    </div>
  ),

  // 41 — Cresci dentro da musica [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={48} anim="anim-slideLeft" ovr>
        Cresci dentro da <span className="teal" style={{ fontWeight: 700 }}>musica</span>.
      </OT>
    </div>
  ),

  // 42 — Duas coisas sem conectar [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.6} anim="anim-fadeUp" ovr>Duas coisas sem conectar.</OT>
      <Spacer h={24} />
      <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="anim-fadeUp d2">
        <OT size={36} opacity={0.5} ovr>Musica</OT>
        <OT size={36} color="#4ECDC4" ovr>x</OT>
        <OT size={36} opacity={0.5} ovr>Ingles</OT>
      </div>
    </div>
  ),

  // 43 — Ate que esse dia chegou [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} anim="anim-blurIn" ovr>Ate que esse dia chegou.</OT>
    </div>
  ),

  // 44 — E tem tudo a ver [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>
        E tem tudo a ver com por que voce <span className="bold">nao aprendeu ingles ate agora</span>.
      </OT>
    </div>
  ),

  // ═══ BLOCK 3 — PROBLEMA ═══

  // 45 — Comecou a crescer [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={44} opacity={0.6} anim="anim-slideLeft" ovr>Comecou a crescer um outro grupo.</OT>
    </div>
  ),

  // 46 — Maior do que eu gostaria [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.4} anim="anim-blurIn" ovr>Maior do que eu gostaria de admitir.</OT>
    </div>
  ),

  // 47 — Queriam / Desistiam / Nao voltavam [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={600} opacity={1} anim="anim-fadeUp" delay="d1" ovr>Queriam a fluencia.</OT>
      <Spacer h={8} />
      <OT size={48} weight={600} opacity={0.45} anim="anim-fadeUp" delay="d2" ovr>Desistiam.</OT>
      <Spacer h={8} />
      <OT size={48} weight={600} opacity={0.2} anim="anim-fadeUp" delay="d3" ovr>Nao voltavam.</OT>
    </div>
  ),

  // 48 — fixes tried [DARK] — synced
  () => {
    const items = ["Melhorei o conteudo.", "Melhorei a didatica.", "Refiz modulos.", "Mudei a ordem.", "Contratei gente nova."];
    return (
      <div className="slide left slide-dark">
        {items.map((t, i) => {
          if (!useStackVisible(47, i)) return null;
          return (
            <div key={t}>
              <T size={36} opacity={0.3} anim="anim-slideLeft">{t}</T>
              {i < 4 && <Spacer h={8} />}
            </div>
          );
        })}
      </div>
    );
  },

  // 49 — Os numeros nao mudavam [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={52} weight={700} color="#FF6B6B" anim="anim-scaleIn" ovr>Os numeros nao mudavam.</OT>
    </div>
  ),

  // 50 — cursos inacabados [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>
        Isso explica por que voce tem <span className="bold">cursos inacabados</span> agora mesmo.
      </OT>
    </div>
  ),

  // 51 — Fui medir as horas REAIS [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={44} anim="anim-slideLeft" ovr>
        Fui medir as horas <span className="teal" style={{ fontWeight: 700 }}>REAIS</span>.
      </OT>
    </div>
  ),

  // 52 — 15 HORAS [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-red" style={{ top: "25%", left: "30%" }} />
      <T size={120} weight={900} opacity={0.6} color="#FF6B6B" anim="anim-scaleIn">15 HORAS</T>
    </div>
  ),

  // 53 — 150 HORAS [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" style={{ top: "25%", left: "30%" }} />
      <T size={120} weight={900} color="#4ECDC4" anim="anim-scaleIn" className="glow-teal-text">150 HORAS</T>
    </div>
  ),

  // 54 — Nao eram mais inteligentes [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>Nao eram mais inteligentes. <span className="bold">Persistiram mais.</span></OT>
    </div>
  ),

  // 55 — Por que eles desistiam [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.7} ovr>Por que eles desistiam tao rapido?</OT>
    </div>
  ),

  // 56 — O padrao era identico [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={44} anim="anim-slideLeft" ovr>O padrao era identico em todo lugar.</OT>
    </div>
  ),

  // 57 — 90% [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-red" style={{ top: "20%", left: "25%" }} />
      <T size={180} weight={900} color="#FF6B6B" anim="anim-scaleIn" className="glow-red-text">90%</T>
    </div>
  ),

  // 58 — Kris Nielson [DARK]
  () => (
    <div className="slide left slide-dark">
      <AccentLine />
      <T size={44} weight={600} anim="anim-slideLeft">Kris Nielson — 2014</T>
      <Spacer h={12} />
      <T size={28} opacity={0.35} anim="anim-slideLeft" delay="d2">Estudo sobre desistencia em cursos de idiomas</T>
    </div>
  ),

  // 59 — 150 funcionarios [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>150 funcionarios do governo americano.</OT>
    </div>
  ),

  // 60 — Motivados / Horario / Melhor material [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} anim="anim-fadeUp" delay="d1" ovr>Motivados.</OT>
      <Spacer h={8} />
      <OT size={42} anim="anim-fadeUp" delay="d2" ovr>Horario liberado.</OT>
      <Spacer h={8} />
      <OT size={42} anim="anim-fadeUp" delay="d3" ovr>Melhor material.</OT>
    </div>
  ),

  // 61 — Quantos chegaram ao final? [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.7} anim="anim-fadeUp" ovr>Quantos chegaram ao final?</OT>
    </div>
  ),

  // 62 — 1 [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={220} weight={900} anim="anim-scaleIn" style={{ color: "#fff" }}>1</T>
    </div>
  ),

  // 63 — 1 em 150 [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={52} weight={600} anim="anim-blurIn">1 em 150.</T>
    </div>
  ),

  // 64 — O problema nao era o conteudo [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} anim="anim-fadeUp" ovr>O problema nao era o conteudo.</OT>
    </div>
  ),

  // 65 — Todo curso do mundo = AULA [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={40} opacity={0.5} anim="anim-fadeUp" ovr>Todo curso do mundo =</OT>
      <Spacer h={8} />
      <OT size={90} weight={900} color="#FF6B6B" anim="anim-scaleIn" delay="d2" className="glow-red-text" ovr>AULA</OT>
    </div>
  ),

  // 66 — types [DARK] — synced
  () => {
    const items = ["Aula em video", "Aula ao vivo", "Com jogo", "Com nativo", "Com VR"];
    return (
      <div className="slide center slide-dark">
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
  },

  // 67 — Todos pedem a mesma coisa [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.7} ovr>Todos pedem a mesma coisa:</OT>
    </div>
  ),

  // 68 — Sentar / Prestar atencao / Gastar energia [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} anim="anim-fadeUp" delay="d1" ovr>Sentar.</OT>
      <Spacer h={8} />
      <OT size={44} anim="anim-fadeUp" delay="d2" ovr>Prestar atencao.</OT>
      <Spacer h={8} />
      <OT size={44} anim="anim-fadeUp" delay="d3" ovr>Gastar energia mental.</OT>
    </div>
  ),

  // 69 — Aula funciona pra adolescente [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} ovr>Aula funciona pra adolescente.</OT>
    </div>
  ),

  // 70 — O adulto nao chega assim [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>O adulto nao chega assim.</OT>
    </div>
  ),

  // 71 — Sua rotina real [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={28} opacity={0.4} anim="anim-slideLeft" style={{ letterSpacing: 3, textTransform: "uppercase" }} ovr>Sua rotina real:</OT>
    </div>
  ),

  // 72 — routine STACK [DARK] — synced to speech
  () => {
    const items = ["Trabalho", "Mensagem, e-mail", "Decisao", "Reuniao, transito", "Conta, familia"];
    return (
      <div className="slide left slide-dark">
        {items.map((t, i) => {
          const show = useStackVisible(71, i);
          if (!show) return null;
          return (
            <div key={t}>
              <T size={40} weight={500} opacity={0.4 + i * 0.1} anim="anim-slideLeft">{t}</T>
              {i < 4 && <Spacer h={8} />}
            </div>
          );
        })}
      </div>
    );
  },

  // 73 — O dia inteiro queimando energia [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} ovr>O dia inteiro queimando energia mental.</OT>
    </div>
  ),

  // 74 — 22h → aula de ingles? [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="anim-fadeUp">
        <OT size={48} opacity={0.5} ovr>22h</OT>
        <OT size={48} color="#4ECDC4" ovr>&#8594;</OT>
        <OT size={48} opacity={0.5} ovr>aula de ingles?</OT>
      </div>
    </div>
  ),

  // 75 — Ou nao faz [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Ou nao faz. Ou abre e nao presta atencao.</OT>
    </div>
  ),

  // 76 — Academia que nao vai [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={42} opacity={0.6} anim="anim-slideLeft" ovr>Academia que nao vai. Projeto na gaveta.</OT>
    </div>
  ),

  // 77 — Nao e falta de vontade [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={500} anim="anim-fadeUp" ovr>Nao e falta de vontade.</OT>
      <Spacer h={12} />
      <OT size={42} opacity={0.5} anim="anim-fadeUp" delay="d2" ovr>Nem de motivacao.</OT>
    </div>
  ),

  // 78 — JOHNS HOPKINS 2024 [DARK]
  () => (
    <div className="slide left slide-dark">
      <AccentLine />
      <T size={48} weight={700} anim="anim-slideLeft">JOHNS HOPKINS — 2024</T>
    </div>
  ),

  // 79 — Ofereceram DINHEIRO [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>
        Ofereceram <span className="teal" style={{ fontWeight: 700 }}>DINHEIRO</span> pra continuar.
      </OT>
    </div>
  ),

  // 80 — 90% recusaram [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={600} anim="anim-scaleIn" ovr>90% recusaram e foram embora.</OT>
    </div>
  ),

  // 81 — regiao de recompensa DESLIGADA [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>
        A regiao de recompensa do cerebro: <span className="red" style={{ fontWeight: 700 }}>DESLIGADA</span>.
      </OT>
    </div>
  ),

  // 82 — FADIGA COGNITIVA [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-red" style={{ top: "25%", left: "25%" }} />
      <T size={90} weight={900} color="#FF6B6B" anim="anim-scaleIn" className="glow-red-text">FADIGA COGNITIVA</T>
    </div>
  ),

  // 83 — O ingles nao entra [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>O ingles nao entra.</OT>
    </div>
  ),

  // 84 — Se sente culpado [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>Se sente culpado. Acha que nao leva jeito.</OT>
    </div>
  ),

  // 85 — A culpa nunca foi dele [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} anim="anim-fadeUp" ovr>A culpa nunca foi dele.</OT>
    </div>
  ),

  // 86 — A culpa e do FORMATO [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={42} opacity={0.6} anim="anim-fadeUp">A culpa e do</T>
      <T size={90} weight={900} anim="anim-scaleIn" delay="d2">FORMATO.</T>
    </div>
  ),

  // 87 — O melhor curso e o pior curso [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>O melhor curso e o pior curso</OT>
    </div>
  ),

  // 88 — 95% [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-red" style={{ top: "20%", left: "30%" }} />
      <T size={160} weight={900} color="#FF6B6B" anim="anim-scaleIn" className="glow-red-text">95%</T>
      <Spacer h={12} />
      <T size={32} opacity={0.4} anim="anim-fadeUp" delay="d2">dao o mesmo resultado</T>
    </div>
  ),

  // 89 — Porque os dois sao AULA [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>Porque os dois sao <span className="bold" style={{ fontSize: 36 }}>AULA</span>.</OT>
    </div>
  ),

  // 90 — ESFORCO MENTAL [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={64} weight={700} anim="anim-scaleIn">ESFORCO MENTAL</T>
      <Spacer h={16} />
      <T size={32} opacity={0.4} anim="anim-fadeUp" delay="d2">A unica coisa que o adulto nao tem.</T>
    </div>
  ),

  // 91 — Com a rotina [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.7} ovr>Com a rotina que voce leva, nao ia dar certo nunca.</OT>
    </div>
  ),

  // 92 — O problema nunca foi O QUE [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} anim="anim-fadeUp" ovr>O problema nunca foi O QUE ensinavam.</OT>
    </div>
  ),

  // 93 — Era o JEITO [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={64} weight={700} anim="anim-scaleIn" ovr>Era o JEITO.</OT>
      <Spacer h={16} />
      <OT size={32} opacity={0.3} anim="anim-fadeUp" delay="d2" ovr>Ate agora.</OT>
    </div>
  ),

  // ═══ BLOCK 4 — SOLUCAO ═══

  // 94 — Se o problema e o formato [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.7} ovr>Se o problema e o formato...</OT>
    </div>
  ),

  // 95 — Quais sao os formatos [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>Quais sao os formatos disponiveis?</OT>
    </div>
  ),

  // 96 — Precisava funcionar com fadiga [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={42} anim="anim-slideLeft" ovr>Precisava funcionar com fadiga cognitiva.</OT>
    </div>
  ),

  // 97 — criteria STACK [DARK] — synced
  () => {
    const items = ["Sem esforco consciente", "Repete 50x sem cansar", "Faz porque quer"];
    return (
      <div className="slide left slide-dark">
        {items.map((t, i) => {
          if (!useStackVisible(96, i)) return null;
          return (
            <div key={t}>
              <T size={40} weight={500} opacity={0.5 + i * 0.15} anim="anim-slideLeft">{t}</T>
              {i < 2 && <Spacer h={12} />}
            </div>
          );
        })}
      </div>
    );
  },

  // 98 — A resposta fica obvia [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={600} anim="anim-blurIn" ovr>A resposta fica obvia.</OT>
    </div>
  ),

  // 99 — Curso de ingles pra criancas [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} ovr>Curso de ingles pra criancas.</OT>
    </div>
  ),

  // 100 — Crianca nao aguenta [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={42} anim="anim-slideLeft" ovr>Crianca nao aguenta 5min de aula.</OT>
    </div>
  ),

  // 101 — Mas fica HORAS [TRANSPARENT]
  () => (
    <div className="slide right slide-transparent">
      <OT size={42} anim="anim-slideRight" ovr>
        Mas fica <span className="teal" style={{ fontWeight: 700 }}>HORAS</span> aprendendo por musica.
      </OT>
    </div>
  ),

  // 102 — Carga cognitiva leve [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} ovr>Carga cognitiva leve.</OT>
    </div>
  ),

  // 103 — MUSICA [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" style={{ top: "30%", left: "30%" }} />
      <T size={90} weight={800} color="#4ECDC4" anim="anim-scaleIn" className="glow-teal-text">MUSICA</T>
    </div>
  ),

  // 104 — Por que nao fazer com adulto [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>Por que nao fazer com adulto tambem?</OT>
    </div>
  ),

  // 105 — Um dos formatos mais antigos [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={42} opacity={0.6} anim="anim-slideLeft" ovr>Um dos formatos mais antigos da civilizacao.</OT>
    </div>
  ),

  // 106 — Todas as civilizacoes [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Todas as civilizacoes ensinam por musica.</OT>
    </div>
  ),

  // 107 — Robert Zatorre [DARK]
  () => (
    <div className="slide left slide-dark">
      <AccentLine />
      <T size={44} weight={600} anim="anim-slideLeft">Robert Zatorre — Neurocientista</T>
    </div>
  ),

  // 108 — Uma visita a um asilo [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} anim="anim-blurIn" ovr>Uma visita a um asilo.</OT>
    </div>
  ),

  // 109 — Senhor de 80 anos [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Senhor de 80 anos cantando sozinho.</OT>
    </div>
  ),

  // 110 — Nao lembrava o nome dos netos [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.4} anim="anim-blurIn" ovr>Nao lembrava o nome dos netos.</OT>
    </div>
  ),

  // 111 — Cantando em LATIM [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} ovr>
        Cantando em <span className="teal" style={{ fontWeight: 700 }}>LATIM</span>.
      </OT>
    </div>
  ),

  // 112 — Uma lingua que nunca estudou [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>Uma lingua que nunca estudou.</OT>
    </div>
  ),

  // 113 — 40 anos depois [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>
        <span className="teal" style={{ fontWeight: 700 }}>40 anos</span> depois. Palavra por palavra.
      </OT>
    </div>
  ),

  // 114 — Esqueciam os filhos [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Esqueciam os filhos. Cantavam musicas da adolescencia.</OT>
    </div>
  ),

  // 115 — O que a musica tem de tao especial? [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.7} ovr>O que a musica tem de tao especial?</OT>
    </div>
  ),

  // 116 — McGill University [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <AccentLine />
      <OT size={48} weight={600} anim="anim-slideLeft" ovr>McGill University — Canada</OT>
    </div>
  ),

  // 117 — Nature Neuroscience [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={52} weight={700} anim="anim-fadeUp">Nature Neuroscience</T>
      <Spacer h={12} />
      <T size={28} opacity={0.3} anim="anim-fadeUp" delay="d2">uma das maiores revistas cientificas do mundo</T>
    </div>
  ),

  // 118 — Musica + prazer → DOPAMINA [DARK]
  () => (
    <div className="slide center slide-dark">
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }} className="anim-fadeUp">
        <T size={42}>Musica + prazer</T>
        <T size={42} color="#4ECDC4">&#8594;</T>
        <T size={52} weight={700} color="#4ECDC4">DOPAMINA</T>
      </div>
    </div>
  ),

  // 119 — Dopamina → MEMORIA [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" style={{ top: "30%", left: "30%" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }} className="anim-fadeUp">
        <T size={42}>Dopamina</T>
        <T size={42} color="#4ECDC4">&#8594;</T>
        <T size={56} weight={700} className="teal glow-teal-text">MEMORIA</T>
      </div>
    </div>
  ),

  // 120 — Entra mais facil / Grava mais forte / Dura mais tempo [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} anim="anim-fadeUp" delay="d1" ovr>Entra mais facil.</OT>
      <Spacer h={8} />
      <OT size={42} weight={600} anim="anim-fadeUp" delay="d2" ovr>Grava mais forte.</OT>
      <Spacer h={8} />
      <OT size={42} weight={700} anim="anim-fadeUp" delay="d3" ovr>Dura mais tempo.</OT>
    </div>
  ),

  // 121 — Esquece o que o professor falou [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={40} opacity={0.4} anim="anim-slideLeft" ovr>Esquece o que o professor falou ontem.</OT>
    </div>
  ),

  // 122 — Lembra a letra de 20 anos atras [TRANSPARENT]
  () => (
    <div className="slide right slide-transparent">
      <OT size={44} weight={700} anim="anim-slideRight" ovr>Lembra a letra de 20 anos atras.</OT>
    </div>
  ),

  // 123 — Complete a frase [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={44} opacity={0.7}>Complete a frase:</T>
    </div>
  ),

  // 124 — Eu tenho tanto pra lhe falar [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={38} opacity={0.6} style={{ fontStyle: "italic" }} anim="anim-blurIn">
        Eu tenho tanto pra lhe falar, mas com palavras nao sei dizer...
      </T>
    </div>
  ),

  // 125 — Como e grande meu amor por voce [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={44} color="#4ECDC4" weight={600} anim="anim-fadeUp">Como e grande meu amor por voce.</T>
    </div>
  ),

  // 126 — A dona aranha subiu pela... [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={44} opacity={0.6}>A dona aranha subiu pela...</T>
    </div>
  ),

  // 127 — PAREDE [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={72} weight={800} anim="anim-scaleIn">PAREDE.</T>
    </div>
  ),

  // 128 — A educacao ignora isso [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} anim="anim-fadeUp" ovr>A educacao ignora isso.</OT>
      <Spacer h={12} />
      <OT size={28} opacity={0.35} anim="anim-fadeUp" delay="d2" ovr>musica virou coisa de crianca</OT>
    </div>
  ),

  // 129 — O adulto e quem MAIS precisa [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>
        O adulto e quem <span className="teal" style={{ fontWeight: 700 }}>MAIS</span> precisa.
      </OT>
    </div>
  ),

  // 130 — O formato / A ciencia / A logica / Faltava [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} anim="anim-fadeUp" ovr>O formato. A ciencia. A logica. Faltava:</OT>
    </div>
  ),

  // 131 — O que colocar dentro da musica? [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} color="#4ECDC4" weight={600} anim="anim-fadeUp" ovr>O que colocar dentro da musica?</OT>
    </div>
  ),

  // 132 — De onde vem a fluencia? [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.7} ovr>De onde vem a fluencia?</OT>
    </div>
  ),

  // 133 — Fluencia = ingles no subconsciente [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>Fluencia = ingles no subconsciente.</OT>
    </div>
  ),

  // 134 — Subconsciente = AUTOMATICO [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>
        Subconsciente = <span className="gradient-animated" style={{ fontWeight: 700, fontSize: 56 }}>AUTOMATICO</span>.
      </OT>
    </div>
  ),

  // 135 — skills STACK [DARK]
  () => (
    <div className="slide left slide-dark">
      {["Andar de bicicleta", "Dirigir", "Digitar no celular"].map((t, i) => (
        <div key={t}>
          <T size={40} opacity={0.5 + i * 0.15} anim="anim-slideLeft" delay={["d1", "d2", "d3"][i]}>{t}</T>
          {i < 2 && <Spacer h={10} />}
        </div>
      ))}
    </div>
  ),

  // 136 — No comeco era dificil [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>No comeco era dificil. Hoje e automatico.</OT>
    </div>
  ),

  // 137 — O que todas tem em comum? [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} opacity={0.7} ovr>O que todas tem em comum?</OT>
    </div>
  ),

  // 138 — REPETICAO callback [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" style={{ top: "25%", left: "30%" }} />
      <T size={100} weight={900} className="glow-teal-text" anim="anim-scaleIn" style={{ color: "#fff" }}>REPETICAO</T>
    </div>
  ),

  // 139 — Com ingles e igual [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>Com ingles e igual.</OT>
    </div>
  ),

  // 140 — Nao do ingles inteiro. Do ESSENCIAL. [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>
        Nao do ingles inteiro. Do <span className="teal" style={{ fontWeight: 700 }}>ESSENCIAL</span>.
      </OT>
    </div>
  ),

  // 141 — Paul Nation [DARK]
  () => (
    <div className="slide left slide-dark">
      <AccentLine />
      <T size={44} weight={600} anim="anim-slideLeft">Paul Nation — Linguista</T>
    </div>
  ),

  // 142 — 500 palavras = 90% [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} anim="anim-scaleIn" ovr>
        <span className="teal" style={{ fontWeight: 700 }}>500</span> palavras = <span className="teal" style={{ fontWeight: 700 }}>90%</span> das conversas
      </OT>
    </div>
  ),

  // 143 — DEMO placeholder music [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="card anim-scaleIn" style={{ padding: "48px 56px", minWidth: 360 }}>
        <T size={16} weight={600} opacity={0.4} style={{ letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>DEMO — REPETICAO MUSICAL</T>
        <Spacer h={16} />
        <WaveformBars />
      </div>
    </div>
  ),

  // 144 — REPETICAO MUSICAL [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={72} weight={800} className="gradient-animated glow-gradient-text" anim="anim-scaleIn">REPETICAO MUSICAL</T>
    </div>
  ),

  // 145 — Conteudo disfarcado [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Conteudo disfarcado. Nao parece estudo.</OT>
    </div>
  ),

  // 146 — Coldplay / Adele / Ed Sheeran [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} anim="anim-fadeUp" delay="d1" ovr>Coldplay.</OT>
      <Spacer h={6} />
      <OT size={44} anim="anim-fadeUp" delay="d2" ovr>Adele.</OT>
      <Spacer h={6} />
      <OT size={44} anim="anim-fadeUp" delay="d3" ovr>Ed Sheeran.</OT>
    </div>
  ),

  // 147 — Nao funciona [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} opacity={0.4} weight={600} anim="anim-blurIn" ovr>Nao funciona.</OT>
    </div>
  ),

  // 148 — Ninguem conversa como Coldplay canta [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>
        Ninguem conversa como <span style={{ opacity: 0.35 }}>Coldplay</span> canta.
      </OT>
    </div>
  ),

  // 149 — 200 letras ≠ 1 dialogo [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }} className="anim-fadeUp">
        <OT size={42} opacity={0.5} ovr>200 letras decoradas</OT>
        <OT size={52} color="#FF6B6B" weight={700} ovr>&#8800;</OT>
        <OT size={42} weight={700} ovr>1 dialogo entendido</OT>
      </div>
    </div>
  ),

  // 150 — O ingles real acontece nas SERIES [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>
        O ingles real acontece nas <span className="teal" style={{ fontWeight: 700 }}>SERIES</span>.
      </OT>
    </div>
  ),

  // 151 — As mesmas estruturas [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>As mesmas estruturas, episodio apos episodio.</OT>
    </div>
  ),

  // 152 — E se pegasse o script [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} anim="anim-fadeUp" ovr>E se pegasse o script de uma serie...</OT>
    </div>
  ),

  // 153 — ...e transformasse em MUSICA? [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>
        ...e transformasse em <span className="gradient-animated" style={{ fontWeight: 700, fontSize: 56 }}>MUSICA</span>?
      </OT>
    </div>
  ),

  // 154 — Ouvisse 40, 50 vezes [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>Ouvisse 40, 50 vezes...</OT>
    </div>
  ),

  // 155 — Reconhecer palavra por palavra [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} color="#4ECDC4" weight={500} ovr>Reconhecer palavra por palavra.</OT>
    </div>
  ),

  // 156 — Nao e colocar batida por cima [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={40} opacity={0.4} anim="anim-slideLeft" ovr>Nao e colocar batida por cima.</OT>
    </div>
  ),

  // 157 — Melodia / Arranjo / Producao completa [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} anim="anim-fadeUp" delay="d1" ovr>Melodia.</OT>
      <Spacer h={8} />
      <OT size={42} weight={500} anim="anim-fadeUp" delay="d2" ovr>Arranjo.</OT>
      <Spacer h={8} />
      <OT size={42} weight={700} anim="anim-fadeUp" delay="d3" ovr>Producao completa.</OT>
    </div>
  ),

  // 158 — Musica que voce escuta por PRAZER [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>
        Musica que voce escuta por <span className="gradient-animated" style={{ fontWeight: 700 }}>PRAZER</span>.
      </OT>
    </div>
  ),

  // 159 — Primeiro episodio [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} anim="anim-blurIn" ovr>Primeiro episodio de Serie Cantada.</OT>
    </div>
  ),

  // 160 — Nao testamos nos melhores [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>Nao testamos nos melhores.</OT>
    </div>
  ),

  // 161 — Testamos nos PIORES [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} ovr>
        Testamos nos <span className="teal" style={{ fontWeight: 700 }}>PIORES</span>.
      </OT>
    </div>
  ),

  // 162 — Ja tinham comprado todo curso [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={40} opacity={0.4} anim="anim-slideLeft" ovr>Ja tinham comprado todo curso da internet.</OT>
    </div>
  ),

  // 163 — Sem cobranca / Sem prazo [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Sem cobranca. Sem prazo.</OT>
    </div>
  ),

  // 164 — Resultado? [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={56} weight={700} anim="anim-blurIn" ovr>Resultado?</OT>
    </div>
  ),

  // 165 — DEMO placeholder testimonial [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="card anim-scaleIn" style={{ padding: "48px 56px", minWidth: 360 }}>
        <T size={16} weight={600} opacity={0.4} style={{ letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>DEPOIMENTO</T>
        <Spacer h={16} />
        <WaveformBars />
      </div>
    </div>
  ),

  // 166 — Entenda o peso disso [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} ovr>Entenda o peso disso.</OT>
    </div>
  ),

  // 167 — Pessoas que DESISTIRAM [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>
        Pessoas que <span className="red" style={{ fontWeight: 700 }}>DESISTIRAM</span> dos cursos mais famosos
      </OT>
    </div>
  ),

  // 168 — Achavam que NUNCA [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>
        Achavam que <span className="red" style={{ fontWeight: 700 }}>NUNCA</span> iam aprender.
      </OT>
    </div>
  ),

  // ═══ BLOCK 5 — VALIDACAO ═══

  // 169 — Estavam voltando [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} color="#4ECDC4" weight={600} anim="anim-fadeUp" ovr>Estavam voltando. Queriam mais.</OT>
    </div>
  ),

  // 170 — 1-2 HORAS POR DIA [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" style={{ top: "25%", left: "25%" }} />
      <T size={100} weight={900} color="#4ECDC4" anim="anim-scaleIn" className="glow-teal-text">1-2 HORAS POR DIA</T>
    </div>
  ),

  // 171 — Aluno nos EUA, aula presencial [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={40} anim="anim-slideLeft" ovr>Aluno nos EUA, aula presencial com nativo</OT>
    </div>
  ),

  // 172 — DEMO student message [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="card anim-scaleIn" style={{ padding: "48px 56px", minWidth: 360 }}>
        <T size={16} weight={600} opacity={0.4} style={{ letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>MENSAGEM DO ALUNO</T>
        <Spacer h={16} />
        <div style={{ width: 280, height: 160, background: "rgba(255,255,255,.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,.06)" }} />
      </div>
    </div>
  ),

  // 173 — Nao dava pra tratar como experimento [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Nao dava pra tratar como experimento.</OT>
    </div>
  ),

  // 174 — Pausei as vendas [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={700} anim="anim-scaleIn" ovr>Pausei as vendas da Fluency Route.</OT>
    </div>
  ),

  // 175 — Se funcionou pros piores [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>Se funcionou pros piores...</OT>
    </div>
  ),

  // 176 — A musica tinha que ser BOA [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>
        A musica tinha que ser <span className="teal" style={{ fontWeight: 700 }}>BOA</span> de verdade.
      </OT>
    </div>
  ),

  // 177 — No carro / No churrasco / No fone [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      {["No carro.", "No churrasco.", "No fone."].map((t, i) => (
        <div key={t}>
          <OT size={42} opacity={0.4 + i * 0.15} anim="anim-slideLeft" delay={["d1", "d2", "d3"][i]} ovr>{t}</OT>
          {i < 2 && <Spacer h={10} />}
        </div>
      ))}
    </div>
  ),

  // 178 — Scripts reais + producao profissional [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Scripts reais + producao profissional.</OT>
    </div>
  ),

  // 179 — 10 da noite. Destruido. Play. [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} anim="anim-fadeUp" ovr>10 da noite. Destruido. Play.</OT>
    </div>
  ),

  // 180 — O ingles entra mesmo assim [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div className="glow-teal" style={{ top: "30%", left: "30%" }} />
      <OT size={48} color="#4ECDC4" weight={600} anim="anim-fadeUp" ovr>O ingles entra mesmo assim.</OT>
    </div>
  ),

  // 181 — DEMO result audio [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="card anim-scaleIn" style={{ padding: "48px 56px", minWidth: 360 }}>
        <T size={16} weight={600} opacity={0.4} style={{ letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>RESULTADO — AUDIO</T>
        <Spacer h={16} />
        <WaveformBars />
      </div>
    </div>
  ),

  // 182 — INGLES CANTADO [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="double-glow" />
      <T size={100} weight={900} className="gradient-animated glow-gradient-text" anim="anim-scaleIn">INGLES CANTADO</T>
    </div>
  ),

  // 183 — Primeira plataforma [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Primeira plataforma construida em cima de musica.</OT>
    </div>
  ),

  // 184 — 3 camadas [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={600} anim="anim-fadeUp" ovr>3 camadas:</OT>
    </div>
  ),

  // 185 — 1. Base fundamental [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <AccentLine />
      <OT size={48} weight={600} anim="anim-slideLeft" ovr>1. Base fundamental</OT>
    </div>
  ),

  // 186 — 2. Correcao [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <AccentLine />
      <OT size={48} weight={600} anim="anim-slideLeft" ovr>2. Correcao</OT>
      <Spacer h={12} />
      <OT size={28} opacity={0.35} anim="anim-slideLeft" delay="d2" ovr>pronuncia, emendado, expressoes</OT>
    </div>
  ),

  // 187 — 3. Fluencia real [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <AccentLine />
      <OT size={48} weight={600} anim="anim-slideLeft" ovr>3. Fluencia real</OT>
      <Spacer h={12} />
      <OT size={28} opacity={0.35} anim="anim-slideLeft" delay="d2" ovr>series + discursos</OT>
    </div>
  ),

  // 188 — Base instalada → repeticao [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Base instalada &#8594; repeticao pra conversas reais.</OT>
    </div>
  ),

  // 189 — Deixa eu te mostrar [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} anim="anim-fadeUp" ovr>Deixa eu te mostrar na pratica.</OT>
    </div>
  ),

  // 190 — WALKTHROUGH placeholder [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="card anim-scaleIn" style={{ padding: "56px 64px", minWidth: 400 }}>
        <T size={20} weight={600} opacity={0.4} style={{ letterSpacing: 4, textTransform: "uppercase" }}>DEMONSTRACAO DO APP</T>
        <Spacer h={24} />
        <div style={{ width: 320, height: 200, background: "rgba(255,255,255,.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,.06)" }} />
      </div>
    </div>
  ),

  // 191 — Transition [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div className="anim-scaleIn" style={{ width: 120, height: 3, background: "linear-gradient(90deg,#4ECDC4,#A78BFA)", borderRadius: 2 }} />
    </div>
  ),

  // ═══ BLOCK 6 — EMOCIONAL ═══

  // 192 — Chuveiro / Transito / Lavando louca [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      {["Chuveiro.", "Transito.", "Lavando louca."].map((t, i) => (
        <div key={t}>
          <OT size={44} opacity={0.4 + i * 0.15} anim="anim-slideLeft" delay={["d1", "d2", "d3"][i]} ovr>{t}</OT>
          {i < 2 && <Spacer h={10} />}
        </div>
      ))}
    </div>
  ),

  // 193 — Cantando em ingles sem perceber [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} color="#4ECDC4" weight={600} anim="anim-fadeUp" ovr>Cantando em ingles sem perceber.</OT>
    </div>
  ),

  // 194 — Seu cerebro gravou [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} ovr>Seu cerebro gravou. O ingles entrou.</OT>
    </div>
  ),

  // 195 — Abre a serie [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Abre a serie. A cena real toca.</OT>
    </div>
  ),

  // 196 — Sem letra / Sem musica / Ingles real [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} anim="anim-fadeUp" delay="d1" ovr>Sem letra.</OT>
      <Spacer h={8} />
      <OT size={44} anim="anim-fadeUp" delay="d2" ovr>Sem musica.</OT>
      <Spacer h={8} />
      <OT size={44} weight={600} anim="anim-fadeUp" delay="d3" ovr>Ingles real.</OT>
    </div>
  ),

  // 197 — Voce entende [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div className="glow-teal" style={{ top: "25%", left: "25%" }} />
      <OT size={90} weight={800} color="#4ECDC4" anim="anim-scaleIn" className="glow-teal-text" ovr>Voce entende.</OT>
    </div>
  ),

  // 198 — Nao porque estudou [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.4} ovr>Nao porque estudou.</OT>
    </div>
  ),

  // 199 — Porque o ingles ja estava la [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={700} ovr>Porque o ingles ja estava la.</OT>
    </div>
  ),

  // 200 — Gravado por musica [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} className="gradient-text" style={{ fontWeight: 600 }} ovr>Gravado por musica. Sem voce perceber.</OT>
    </div>
  ),

  // 201 — Voce nao decorou [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Voce nao decorou. Voce ouviu.</OT>
    </div>
  ),

  // 202 — progress STACK [DARK]
  () => (
    <div className="slide left slide-dark">
      {["2 episodio: mais facil.", "3: antecipa as falas.", "5: estagio diferente."].map((t, i) => (
        <div key={t}>
          <T size={40} weight={500} opacity={0.5 + i * 0.2} anim="anim-slideLeft" delay={["d1", "d2", "d3"][i]}>{t}</T>
          {i < 2 && <Spacer h={10} />}
        </div>
      ))}
    </div>
  ),

  // 203 — Som embolado → tem forma callback [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="anim-fadeUp">
        <OT size={42} opacity={0.35} ovr>Som embolado</OT>
        <OT size={42} color="#4ECDC4" ovr>&#8594;</OT>
        <OT size={42} weight={700} ovr>tem forma</OT>
      </div>
    </div>
  ),

  // 204 — Ingles deixa de ser barreira [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>
        Ingles deixa de ser barreira. Vira <span className="gradient-text" style={{ fontWeight: 700 }}>prazer</span>.
      </OT>
    </div>
  ),

  // 205 — Chega um dia que voce nao esperava [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} anim="anim-blurIn" ovr>Chega um dia que voce nao esperava.</OT>
    </div>
  ),

  // 206 — Desce do aviao [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={500} ovr>Desce do aviao.</OT>
    </div>
  ),

  // 207 — Pede Uber / Check-in / Conversa [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} anim="anim-fadeUp" delay="d1" ovr>Pede Uber.</OT>
      <Spacer h={8} />
      <OT size={42} anim="anim-fadeUp" delay="d2" ovr>Check-in.</OT>
      <Spacer h={8} />
      <OT size={42} anim="anim-fadeUp" delay="d3" ovr>Conversa.</OT>
    </div>
  ),

  // 208 — Sem Google Tradutor [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Sem Google Tradutor. Sem no no estomago.</OT>
    </div>
  ),

  // 209 — O ingles ja esta ali [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} color="#4ECDC4" weight={600} ovr>O ingles ja esta ali. Instalado.</OT>
    </div>
  ),

  // 210 — Aparece a vaga [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>Aparece a vaga. O dobro.</OT>
    </div>
  ),

  // 211 — 'Ingles fluente.' [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={500} style={{ fontStyle: "italic" }} anim="anim-fadeUp" ovr>&ldquo;Ingles fluente.&rdquo;</OT>
    </div>
  ),

  // 212 — Dessa vez voce nao fecha a aba [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={700} ovr>Dessa vez voce nao fecha a aba.</OT>
    </div>
  ),

  // 213 — Tudo isso no transito callback [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>Tudo isso no transito. Na academia. Antes de dormir.</OT>
    </div>
  ),

  // 214 — Nao porque teve disciplina [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.4} ovr>Nao porque teve disciplina.</OT>
    </div>
  ),

  // 215 — Porque deu PLAY [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div className="glow-teal" style={{ top: "25%", left: "30%" }} />
      <OT size={90} weight={900} color="#4ECDC4" anim="anim-scaleIn" className="glow-teal-text" ovr>Porque deu PLAY.</OT>
    </div>
  ),

  // 216 — Transition [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div className="anim-scaleIn" style={{ width: 120, height: 3, background: "linear-gradient(90deg,#4ECDC4,#A78BFA)", borderRadius: 2 }} />
    </div>
  ),

  // ═══ BLOCK 7 — PRECO ═══

  // 217 — Quanto precisa investir? [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={500} ovr>Quanto precisa investir?</OT>
    </div>
  ),

  // 218 — Escola presencial [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={40} opacity={0.4} anim="anim-slideLeft" ovr>Escola presencial: R$300-800/mes</OT>
    </div>
  ),

  // 219 — 2 anos = R$12.000 [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div style={{ position: "relative", display: "inline-block" }}>
        <OT size={64} weight={700} anim="anim-fadeUp" ovr>2 anos = R$12.000</OT>
        <div className="strike-line anim-scaleIn d2" />
      </div>
    </div>
  ),

  // 220 — Cursos online [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={40} opacity={0.4} anim="anim-slideLeft" ovr>Cursos online: R$2.000-3.000</OT>
    </div>
  ),

  // 221 — 500 aulas. Assiste 10%. [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <div style={{ position: "relative", display: "inline-block" }}>
        <OT size={48} weight={500} anim="anim-fadeUp" ovr>500 aulas. Assiste 10%.</OT>
        <div className="strike-line anim-scaleIn d2" />
      </div>
    </div>
  ),

  // 222 — Ingles Cantado funciona [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={600} ovr>Ingles Cantado funciona quando nenhum funciona.</OT>
    </div>
  ),

  // 223 — 22h. Esgotado. Play. [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} ovr>22h. Esgotado. Play. Ingles entra.</OT>
    </div>
  ),

  // 224 — Mercado: menos de 5% [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      <OT size={40} color="#FF6B6B" weight={500} anim="anim-slideLeft" ovr>Mercado: menos de 5% de conclusao.</OT>
    </div>
  ),

  // 225 — Nossos alunos: 1-2h/dia [TRANSPARENT]
  () => (
    <div className="slide right slide-transparent">
      <OT size={44} color="#4ECDC4" weight={600} anim="anim-slideRight" ovr>Nossos alunos: 1-2h/dia.</OT>
    </div>
  ),

  // 226 — Porque a aula virou musica [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} ovr>Porque a aula virou musica.</OT>
    </div>
  ),

  // 227 — O que esta dentro [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} ovr>O que esta dentro:</OT>
    </div>
  ),

  // 228 — deliverables STACK [DARK]
  () => (
    <div className="slide left slide-dark">
      {["Composicao profissional", "Blocos Essenciais", "5 Trilhas de Correcao", "Discursos Historicos", "Series Cantadas", "Repeticao Musical"].map((t, i) => (
        <div key={t}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ECDC4", opacity: 0.6 }} />
            <T size={36} weight={500} opacity={0.55 + i * 0.07} anim="anim-slideLeft" delay={["d1", "d2", "d3", "d4", "d5", "d6"][i]}>{t}</T>
          </div>
          {i < 5 && <Spacer h={8} />}
        </div>
      ))}
    </div>
  ),

  // 229 — O unico formato que instala [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>O unico formato que instala ingles no subconsciente.</OT>
    </div>
  ),

  // 230 — R$199/mes strikethrough [DARK]
  () => (
    <div className="slide center slide-dark">
      <div style={{ position: "relative", display: "inline-block" }}>
        <T size={72} weight={700} opacity={0.5} anim="anim-fadeUp">R$199/mes</T>
        <div className="strike-line anim-scaleIn d2" />
      </div>
    </div>
  ),

  // 231 — R$99/mes + Plano Anual [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" style={{ top: "25%", left: "25%" }} />
      <T size={120} weight={900} color="#4ECDC4" anim="anim-scaleIn" className="glow-teal-text">R$99/mês</T>
      <div style={{height:12}}/>
      <T size={22} weight={600} opacity={0.35} anim="anim-fadeUp" delay="d3" style={{letterSpacing:5,textTransform:"uppercase"}}>PLANO ANUAL</T>
    </div>
  ),

  // 232 — Com acesso a TUDO [DARK]
  () => (
    <div className="slide center slide-dark">
      <T size={48} weight={600}>Com acesso a TUDO.</T>
    </div>
  ),

  // 233 — Menos que a academia [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.7} ovr>Menos que a academia que voce nao vai.</OT>
    </div>
  ),

  // 234 — O unico formato que funciona as 22h [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>O unico formato que funciona as 22h.</OT>
    </div>
  ),

  // 235 — CTA com seta [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" />
      <T size={36} weight={700} anim="anim-fadeUp">Clique aqui embaixo</T>
      <div style={{height:24}}/>
      <svg className="anim-fadeUp d3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{animation:"fadeUp .6s cubic-bezier(.16,1,.3,1) .4s both, float 2s ease-in-out infinite 1s"}}>
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  ),

  // 236 — Teste de mercado [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>Teste de mercado. Pode sair do ar.</OT>
    </div>
  ),

  // 237 — BONUS [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={600} anim="anim-fadeUp" ovr>
        BONUS: <span className="teal">Rota da Fluencia</span> inclusa.
      </OT>
    </div>
  ),

  // 238 — 2 plataformas pelo preco de 1 [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} color="#4ECDC4" weight={600} ovr>2 plataformas pelo preco de 1.</OT>
    </div>
  ),

  // 239 — Nao da pra manter pra sempre [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>Nao da pra manter pra sempre.</OT>
    </div>
  ),

  // 240 — CTA repeat com seta [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" />
      <T size={36} weight={700} anim="anim-fadeUp">Clique aqui embaixo</T>
      <div style={{height:24}}/>
      <svg className="anim-fadeUp d3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{animation:"fadeUp .6s cubic-bezier(.16,1,.3,1) .4s both, float 2s ease-in-out infinite 1s"}}>
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  ),

  // ═══ BLOCK 8 — GARANTIA + FECHAMENTO ═══

  // 241 — Ja pode comecar hoje [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} color="#4ECDC4" weight={600} ovr>Ja pode comecar hoje.</OT>
    </div>
  ),

  // 242 — 'Marcos, eu nao sei cantar.' [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} style={{ fontStyle: "italic" }} ovr>&ldquo;Marcos, eu nao sei cantar.&rdquo;</OT>
    </div>
  ),

  // 243 — Nao pedi pra cantar [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} ovr>Nao pedi pra cantar. So ouvir.</OT>
    </div>
  ),

  // 244 — 30 DIAS DE GARANTIA [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="glow-teal" style={{ top: "25%", left: "25%" }} />
      <T size={90} weight={900} color="#4ECDC4" anim="anim-scaleIn" className="glow-teal-text">30 DIAS DE GARANTIA</T>
    </div>
  ),

  // 245 — 100% de reembolso [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={40} anim="anim-fadeUp" delay="d1" ovr>100% de reembolso.</OT>
      <Spacer h={8} />
      <OT size={40} anim="anim-fadeUp" delay="d2" ovr>1 clique.</OT>
      <Spacer h={8} />
      <OT size={40} anim="anim-fadeUp" delay="d3" ovr>Sem explicar nada.</OT>
    </div>
  ),

  // 246 — A gente sabe o que acontece [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>A gente sabe o que acontece quando voce da play.</OT>
    </div>
  ),

  // 247 — Pela primeira vez [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>
        Pela primeira vez, treinar ingles ficou <span className="gradient-text" style={{ fontWeight: 700 }}>gostoso</span>.
      </OT>
    </div>
  ),

  // 248 — Nao gostou? Dinheiro de volta. [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} weight={500} ovr>Nao gostou? Dinheiro de volta. 1 clique.</OT>
    </div>
  ),

  // 249 — E se funcionar? [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={52} color="#4ECDC4" weight={700} anim="anim-blurIn" ovr>E se funcionar?</OT>
    </div>
  ),

  // 250 — Dessa vez tem tudo pra funcionar [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={700} ovr>Dessa vez tem tudo pra funcionar.</OT>
    </div>
  ),

  // 251 — Voce ja tentou / Ja comprou / Ja parou [TRANSPARENT]
  () => (
    <div className="slide left slide-transparent">
      {["Voce ja tentou.", "Ja comprou.", "Ja parou."].map((t, i) => (
        <div key={t}>
          <OT size={42} opacity={0.4 + i * 0.15} anim="anim-slideLeft" delay={["d1", "d2", "d3"][i]} ovr>{t}</OT>
          {i < 2 && <Spacer h={10} />}
        </div>
      ))}
    </div>
  ),

  // 252 — O formato nunca foi feito pra voce [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>
        O formato nunca foi feito pra voce. <span className="gradient-animated" style={{ fontWeight: 700 }}>Ate agora.</span>
      </OT>
    </div>
  ),

  // 253 — Existe um formato que seu cerebro aceita [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} ovr>Existe um formato que seu cerebro aceita.</OT>
    </div>
  ),

  // 254 — O mesmo que fez voce decorar musicas [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={42} opacity={0.6} ovr>O mesmo que fez voce decorar musicas a vida inteira.</OT>
    </div>
  ),

  // 255 — So que agora as musicas tem ingles dentro [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={44} color="#4ECDC4" weight={600} ovr>So que agora as musicas tem ingles dentro.</OT>
    </div>
  ),

  // 256 — Chuveiro / Serie / Aviao STACK [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={40} anim="anim-fadeUp" delay="d1" ovr>Chuveiro cantarolando.</OT>
      <Spacer h={8} />
      <OT size={40} anim="anim-fadeUp" delay="d2" ovr>Serie sem legenda.</OT>
      <Spacer h={8} />
      <OT size={40} anim="anim-fadeUp" delay="d3" ovr>Aviao sem tradutor.</OT>
    </div>
  ),

  // 257 — Voce vai lembrar desse momento [TRANSPARENT]
  () => (
    <div className="slide center slide-transparent">
      <OT size={48} weight={600} anim="anim-blurIn" ovr>Voce vai lembrar desse momento.</OT>
    </div>
  ),

  // 258 — CTA FINAL com seta [DARK]
  () => (
    <div className="slide center slide-dark">
      <div className="double-glow" />
      <T size={48} weight={800} anim="anim-scaleIn">COMECE AGORA</T>
      <div style={{height:32}}/>
      <svg className="anim-fadeUp d3" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#arrow-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{animation:"fadeUp .6s cubic-bezier(.16,1,.3,1) .4s both, float 2s ease-in-out infinite 1s"}}>
        <defs><linearGradient id="arrow-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4ECDC4"/><stop offset="100%" stopColor="#A78BFA"/></linearGradient></defs>
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  ),

  // ═══ GAP FILLS (270+) [DARK] ═══════════════════════════════

  // 270 — #1 curtir viagens / emprego fora
  () => (
    <div className="slide left slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-slideLeft">Curtir de verdade <span className="bold">viagens internacionais</span>.</T>
      <Spacer h={16} />
      <T size={42} weight={400} opacity={0.3} anim="anim-slideLeft" delay="d2">Ou ate arrumar um <span className="bold">emprego fora</span>.</T>
    </div>
  ),

  // 271 — #2 vendedor
  () => (
    <div className="slide right slide-dark">
      <T size={42} weight={400} opacity={0.4} anim="anim-slideRight">Como <span className="gradient-animated" style={{ fontWeight: 700 }}>vendedor</span>.</T>
      <Spacer h={16} />
      <T size={28} opacity={0.25} anim="anim-fadeUp" delay="d2">Convencendo americano pao-duro a comprar.</T>
    </div>
  ),

  // 272 — #3a fluencia e habilidade
  () => (
    <div className="slide center slide-dark">
      <T size={44} weight={500} opacity={0.7} anim="anim-fadeUp">A <span className="teal" style={{ fontWeight: 700 }}>fluencia</span> e uma habilidade.</T>
      <Spacer h={16} />
      <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">E habilidades so entram no subconsciente atraves de repeticao.</T>
    </div>
  ),

  // 273 — #3b essa ideia mudou milhares
  () => (
    <div className="slide left slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-slideLeft">Essa ideia sozinha mudou a forma que <span className="bold">milhares de pessoas</span> enxergavam o proprio aprendizado.</T>
    </div>
  ),

  // 274 — #4 largou tudo
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">Largou tudo pra usar a <span className="bold">nossa plataforma</span>.</T>
      <Spacer h={20} />
      <T size={30} opacity={0.25} anim="anim-fadeUp" delay="d2">E durante anos a Fluency Road foi o lugar onde as pessoas iam quando ja tinham tentado de tudo.</T>
    </div>
  ),

  // 275 — #5a nenhum dono de escola
  () => (
    <div className="slide center slide-dark">
      <T size={44} weight={500} opacity={0.6} anim="anim-blurIn">Uma coisa que <span className="red" style={{ fontWeight: 700 }}>nenhum dono de escola</span> te falaria abertamente.</T>
    </div>
  ),

  // 276 — #5b por que nao aprendeu
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">E tem tudo a ver com o <span className="bold">porque voce nao aprendeu ingles</span> ate agora.</T>
    </div>
  ),

  // 277 — #5c apesar dos milhares
  () => (
    <div className="slide left slide-dark">
      <T size={38} weight={400} opacity={0.4} anim="anim-slideLeft">Apesar dos milhares que aprenderam ingles com a gente...</T>
      <Spacer h={16} />
      <T size={38} weight={400} opacity={0.3} anim="anim-slideLeft" delay="d2">...a fluencia realmente comecou a crescer <span className="bold">um outro grupo</span>.</T>
    </div>
  ),

  // 278 — #6 qualidade nao importa
  () => (
    <div className="slide right slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-slideRight">A qualidade da academia ou a importancia do projeto <span className="red" style={{ fontWeight: 700 }}>nao importa</span>.</T>
      <Spacer h={20} />
      <T size={30} opacity={0.25} anim="anim-fadeUp" delay="d2">Seu corpo simplesmente se recusa a gastar mais energia.</T>
    </div>
  ),

  // 279 — #7 nunca contei, cresci na musica
  () => (
    <div className="slide center slide-dark">
      <T size={38} weight={400} opacity={0.4} style={{ fontStyle: "italic" }} anim="anim-blurIn">Eu nunca contei isso em publico...</T>
      <Spacer h={20} />
      <T size={42} weight={500} opacity={0.6} anim="anim-fadeUp" delay="d2">Eu cresci dentro da <span className="gradient-animated" style={{ fontWeight: 700 }}>musica</span>.</T>
    </div>
  ),

  // 280 — #8a aulas pesadas
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">As aulas sao <span className="red" style={{ fontWeight: 700 }}>pesadas</span> e entediantes demais pra uma crianca.</T>
    </div>
  ),

  // 281 — #8b mudanca de formato
  () => (
    <div className="slide left slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-slideLeft">A <span className="teal" style={{ fontWeight: 700 }}>mudanca de formato</span> foi uma das primeiras coisas que a gente debateu.</T>
    </div>
  ),

  // 282 — #9a musica disfarca
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">A musica <span className="teal" style={{ fontWeight: 700 }}>disfarca</span> o conteudo.</T>
      <Spacer h={16} />
      <T size={42} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">E elas repetem varias e varias vezes.</T>
      <Spacer h={16} />
      <T size={36} weight={500} opacity={0.5} anim="anim-fadeUp" delay="d3">Sem perceber.</T>
    </div>
  ),

  // 283 — #9b por que nao com adultos
  () => (
    <div className="slide center slide-dark">
      <T size={44} weight={500} opacity={0.7} anim="anim-blurIn">Por que a gente nao faz isso com <span className="gradient-animated" style={{ fontWeight: 700 }}>adultos</span>?</T>
    </div>
  ),

  // 284 — #10 fundamento real
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">Eu quis entender o <span className="bold">fundamento real</span> da musica.</T>
      <Spacer h={20} />
      <T size={30} opacity={0.25} anim="anim-fadeUp" delay="d2">E acabei caindo em um dos formatos mais antigos da civilizacao humana.</T>
    </div>
  ),

  // 285 — #11a gravar no cerebro
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.6} anim="anim-fadeUp">O que a musica tem de tao especial pra <span className="teal" style={{ fontWeight: 700 }}>gravar</span> conteudo no cerebro?</T>
    </div>
  ),

  // 286 — #11b dentro do cerebro
  () => (
    <div className="slide center slide-dark">
      <T size={38} weight={400} opacity={0.4} anim="anim-blurIn">Provar isso nao e simples.</T>
      <Spacer h={20} />
      <T size={42} weight={500} opacity={0.6} anim="anim-fadeUp" delay="d2">Ele precisou ver o que acontecia <span className="bold">dentro do cerebro</span> em tempo real.</T>
    </div>
  ),

  // 287 — #12 esquece professor, lembra musica
  () => (
    <div className="slide center slide-dark">
      <T size={38} weight={400} opacity={0.4} anim="anim-fadeUp">Voce esquece o que o professor falou ontem.</T>
      <Spacer h={20} />
      <T size={42} weight={500} opacity={0.7} anim="anim-fadeUp" delay="d2">Mas lembra a letra de uma musica de <span className="teal" style={{ fontWeight: 700 }}>20 anos atras</span>.</T>
    </div>
  ),

  // 288 — #13a resposta sai antes de pensar
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">Fluencia e aquele momento onde a <span className="bold">resposta sai antes de voce pensar</span>.</T>
    </div>
  ),

  // 289 — #13b automatico
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">Voce assiste serie em ingles...</T>
      <Spacer h={12} />
      <T size={42} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">Esquece que nao tem legenda.</T>
      <Spacer h={20} />
      <T size={52} weight={700} color="#4ECDC4" className="glow-teal-text" anim="anim-scaleIn" delay="d3">AUTOMATICO.</T>
    </div>
  ),

  // 290 — #14 conteudo disfarcado
  () => (
    <div className="slide right slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-slideRight">O conteudo vem <span className="teal" style={{ fontWeight: 700 }}>disfarcado</span>.</T>
      <Spacer h={16} />
      <T size={36} weight={400} opacity={0.3} anim="anim-slideRight" delay="d2">Ele nao parece um estudo.</T>
    </div>
  ),

  // 291 — #15 musicas sao poesia
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">As musicas sao <span style={{ fontStyle: "italic" }}>poesia</span>.</T>
      <Spacer h={16} />
      <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">Elas nao seguem um padrao de vocabulario que treina o seu ouvido.</T>
    </div>
  ),

  // 292 — #16 resultado, testar
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">A gente gostou tanto do <span className="bold">resultado</span>.</T>
      <Spacer h={20} />
      <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">So que tinha um detalhe: a gente tinha que <span className="bold">testar</span>.</T>
    </div>
  ),

  // 293 — #17 nao podia fingir
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">Eu nao conseguia fingir que nao estava vendo aquilo.</T>
      <Spacer h={20} />
      <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">E continuar vendendo um produto que so funcionava pra <span className="red" style={{ fontWeight: 700 }}>5%</span>.</T>
    </div>
  ),

  // 294 — #18 meses de producao
  () => (
    <div className="slide left slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-slideLeft">Foram <span className="bold">meses de producao</span>.</T>
      <Spacer h={20} />
      <T size={36} weight={400} opacity={0.3} anim="anim-slideLeft" delay="d2">Tudo construido com um unico objetivo:</T>
      <Spacer h={16} />
      <T size={40} weight={600} color="#4ECDC4" anim="anim-fadeUp" delay="d3">Apertar o play e o ingles entra.</T>
    </div>
  ),

  // 295 — #19 algo imperceptivel
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">Nas primeiras semanas acontece uma coisa <span className="bold">quase imperceptivel</span>.</T>
    </div>
  ),

  // 296 — #20 nao por estudar
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.4} anim="anim-fadeUp"><span className="red" style={{ fontWeight: 500 }}>Nao</span> porque voce ficou estudando.</T>
      <Spacer h={12} />
      <T size={42} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2"><span className="red" style={{ fontWeight: 500 }}>Nao</span> por forca de vontade.</T>
      <Spacer h={12} />
      <T size={42} weight={400} opacity={0.2} anim="anim-fadeUp" delay="d3"><span className="red" style={{ fontWeight: 500 }}>Nao</span> por energia mental que voce nao tem.</T>
    </div>
  ),

  // 297 — #21a composicao, engenharia
  () => (
    <div className="slide left slide-dark">
      <T size={36} weight={400} opacity={0.4} anim="anim-slideLeft">Composicao profissional.</T>
      <Spacer h={10} />
      <T size={36} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d2">Engenharia de audio.</T>
      <Spacer h={10} />
      <T size={36} weight={400} opacity={0.3} anim="anim-slideLeft" delay="d3">Adaptacao melodica.</T>
      <Spacer h={10} />
      <T size={36} weight={400} opacity={0.25} anim="anim-slideLeft" delay="d4">Masterizacao e edicao.</T>
    </div>
  ),

  // 298 — #21b 5 trilhas, series
  () => (
    <div className="slide left slide-dark">
      <T size={36} weight={500} opacity={0.5} anim="anim-slideLeft">5 trilhas completas.</T>
      <Spacer h={10} />
      <T size={36} weight={500} opacity={0.4} anim="anim-slideLeft" delay="d2">Discursos historicos em musica.</T>
      <Spacer h={10} />
      <T size={36} weight={500} opacity={0.35} anim="anim-slideLeft" delay="d3">Series cena por cena.</T>
      <Spacer h={16} />
      <T size={40} weight={600} color="#4ECDC4" anim="anim-fadeUp" delay="d4">Tudo em cima da repeticao musical.</T>
    </div>
  ),

  // 299 — #22 teste de mercado
  () => (
    <div className="slide center slide-dark">
      <T size={38} weight={400} opacity={0.4} anim="anim-fadeUp">A gente resolveu fazer um <span className="bold">teste de mercado</span>.</T>
      <Spacer h={20} />
      <T size={42} weight={500} opacity={0.6} anim="anim-fadeUp" delay="d2">Assinatura anual.</T>
    </div>
  ),

  // 300 — #23 convido a clicar
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">Eu te convido a clicar no <span className="teal" style={{ fontWeight: 700 }}>botao aqui embaixo</span>.</T>
      <Spacer h={20} />
      <T size={30} opacity={0.25} anim="anim-fadeUp" delay="d2">E por que a gente fez isso? A verdade...</T>
    </div>
  ),

  // 301 — #24a series conversacionais
  () => (
    <div className="slide center slide-dark">
      <T size={38} weight={400} opacity={0.4} anim="anim-fadeUp">Series conversacionais organizadas pra repeticao.</T>
      <Spacer h={16} />
      <T size={42} weight={500} opacity={0.6} anim="anim-fadeUp" delay="d2">Que sozinho ja vale <span className="teal" style={{ fontWeight: 700 }}>R$99</span>.</T>
    </div>
  ),

  // 302 — #24b talvez ideia ruim
  () => (
    <div className="slide center slide-dark">
      <T size={38} weight={400} opacity={0.4} style={{ fontStyle: "italic" }} anim="anim-blurIn">Talvez isso seja uma ideia ruim.</T>
      <Spacer h={20} />
      <T size={42} weight={500} opacity={0.6} anim="anim-fadeUp" delay="d2">Mas a gente acredita tanto que ta <span className="bold">disposto a testar</span>.</T>
    </div>
  ),

  // 303 — #25 checkout seguro
  () => (
    <div className="slide left slide-dark">
      <T size={38} weight={400} opacity={0.4} anim="anim-slideLeft">Checkout seguro. Pagar.me.</T>
      <Spacer h={12} />
      <T size={38} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d2">Seus dados. Inscricao.</T>
      <Spacer h={12} />
      <T size={42} weight={500} opacity={0.6} anim="anim-slideLeft" delay="d3">Em menos de <span className="teal" style={{ fontWeight: 700 }}>1 minuto</span>: login e senha.</T>
    </div>
  ),

  // 304 — #26a fone, play
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={500} opacity={0.6} anim="anim-fadeUp">Coloca o fone. Da <span className="teal" style={{ fontWeight: 700 }}>play</span>.</T>
      <Spacer h={16} />
      <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">E o seu ouvido faz o trabalho pesado pra voce.</T>
    </div>
  ),

  // 305 — #26b so dar play
  () => (
    <div className="slide center slide-dark">
      <T size={38} weight={400} opacity={0.4} anim="anim-fadeUp">Nao precisa mais nada.</T>
      <Spacer h={16} />
      <T size={44} weight={600} color="#4ECDC4" anim="anim-scaleIn" delay="d2">So dar o play e ouvir.</T>
    </div>
  ),

  // 306 — #27a solicitar reembolso
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">Clicar em <span className="teal" style={{ fontWeight: 700 }}>solicitar reembolso</span>.</T>
      <Spacer h={16} />
      <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">So isso. Sem explicar nada. Sem pedir ajuda.</T>
    </div>
  ),

  // 307 — #27b decisao permanencia
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">A decisao de permanencia vai estar a <span className="bold">um clique</span> de distancia.</T>
    </div>
  ),

  // 308 — #28a testamos nos piores
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={500} opacity={0.6} anim="anim-fadeUp">A gente ja testou nos <span className="red" style={{ fontWeight: 700 }}>piores alunos</span> que a gente tinha.</T>
    </div>
  ),

  // 309 — #28b continuaram
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">E eles <span className="teal" style={{ fontWeight: 700 }}>continuaram</span>.</T>
      <Spacer h={16} />
      <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">Mandaram mensagem. Pediram mais.</T>
      <Spacer h={20} />
      <T size={36} weight={400} opacity={0.25} anim="anim-fadeUp" delay="d3">Porque pela primeira vez, treinar ingles ficou <span className="gradient-animated" style={{ fontWeight: 700 }}>gostoso de verdade</span>.</T>
    </div>
  ),

  // 310 — #29 nao diz nada sobre capacidade
  () => (
    <div className="slide center slide-dark">
      <T size={42} weight={400} opacity={0.5} anim="anim-fadeUp">O ingles que voce nao conseguiu aprender <span className="red" style={{ fontWeight: 700 }}>nao diz nada</span> sobre a sua capacidade.</T>
      <Spacer h={20} />
      <T size={38} weight={500} opacity={0.5} anim="anim-fadeUp" delay="d2">E sim sobre o <span className="bold">formato</span> que voce usou.</T>
    </div>
  ),
];

// ─── Append graph slides (258-269) ──────────────────────────
const allSlides = [...slides, ...GRAPH_SLIDES.map(G => () => <G />)];

// ─── Slide content renderer ─────────────────────────────────
// When forceBrollOverlay=true, dark slides become transparent overlay (B-roll visible behind)
function SlideContent({ index, forceBrollOverlay = false }: { index: number; forceBrollOverlay?: boolean }) {
  const SlideComponent = allSlides[index] || allSlides[0];
  if (forceBrollOverlay) {
    return (
      <div style={{ width: "100%", height: "100%" }} className="broll-force-transparent">
        <SlideComponent />
      </div>
    );
  }
  return <SlideComponent />;
}

// ─── Main composition ────────────────────────────────────────
// ─── B-roll mapping ──────────────────────────────────────────
const BROLLS: Array<{ startTime: number; duration: number; file: string }> = [
  { startTime: 68.52, duration: 4.1, file: "broll/01_objetivos_aspiracao.mp4" },
  { startTime: 334.04, duration: 4.1, file: "broll/02_correria_rotina.mp4" },
  { startTime: 351.80, duration: 4.1, file: "broll/03_destruido_sofa.mp4" },
  { startTime: 375.80, duration: 4.1, file: "broll/04_laboratorio_estudo.mp4" },
  { startTime: 486.24, duration: 4.1, file: "broll/05_criancas_cantando.mp4" },
  { startTime: 523.72, duration: 4.1, file: "broll/06_crianca_fone.mp4" },
  { startTime: 561.40, duration: 4.1, file: "broll/07_asilo_corredor.mp4" },
  { startTime: 565.84, duration: 4.1, file: "broll/08_idoso_cantando.mp4" },
  { startTime: 677.40, duration: 4.1, file: "broll/09_sofa_fone_play.mp4" },
  { startTime: 921.04, duration: 4.1, file: "broll/10_churrasco_fone.mp4" },
  { startTime: 1075.84, duration: 4.1, file: "broll/11_chuveiro_cantando.mp4" },
  { startTime: 1148.60, duration: 4.1, file: "broll/12_aeroporto_confiante.mp4" },
];

function getActiveBroll(timeInSeconds: number) {
  return BROLLS.find(b => timeInSeconds >= b.startTime && timeInSeconds < b.startTime + b.duration);
}

export const VSLOverlayComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const currentSlide = getCurrentSlide(frame);
  const timeInSeconds = frame / FPS;
  const activeBroll = getActiveBroll(timeInSeconds);
  const isDark = DARK_SLIDES.has(currentSlide);
  const zoom = getVideoZoom(timeInSeconds);

  return (
    <TimeContext.Provider value={timeInSeconds}>
      <AbsoluteFill style={{ backgroundColor: "#0A0A0A", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
        <style dangerouslySetInnerHTML={{ __html: STYLES }} />

        {/* Layer 0: Marcos video (always playing for audio sync) */}
        <AbsoluteFill style={{ zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("vsl_marcos.mp4")}
            startFrom={0}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${zoom})`,
            }}
          />
        </AbsoluteFill>

        {/* Layer 1: Dark cover — hides Marcos when slide is DARK and no B-roll */}
        {isDark && !activeBroll && (
          <AbsoluteFill style={{ zIndex: 1, backgroundColor: "#0A0A0A" }} />
        )}

        {/* Layer 2: B-roll video (replaces Marcos when active) */}
        {activeBroll && (
          <AbsoluteFill style={{ zIndex: 2 }}>
            <Video
              src={staticFile(activeBroll.file)}
              startFrom={0}
              volume={0}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AbsoluteFill>
        )}

        {/* Layer 3: Slide content */}
        <GraphModeProvider value="vertical">
          <AbsoluteFill style={{ zIndex: 3 }} key={`slide-${currentSlide}`}>
            <SlideContent index={currentSlide} forceBrollOverlay={!!activeBroll} />
          </AbsoluteFill>
        </GraphModeProvider>

        {/* Progress bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "rgba(255,255,255,0.03)", zIndex: 10,
        }}>
          <div style={{
            height: "100%",
            width: `${((currentSlide + 1) / 311) * 100}%`,
            background: "linear-gradient(90deg,#4ECDC4,#A78BFA)",
            transition: "width .35s cubic-bezier(.4,0,.2,1)",
          }} />
        </div>
      </AbsoluteFill>
    </TimeContext.Provider>
  );
};
