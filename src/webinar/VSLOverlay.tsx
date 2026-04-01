import React, { createContext, useContext } from "react";
import { AbsoluteFill, Audio, Video, useCurrentFrame, staticFile } from "remotion";
import { SLIDE_TIMELINE, FPS } from "./timeline";
import { SENTENCE_BOUNDARIES } from "./sentenceBoundaries";
import { GRAPH_SLIDES, GraphModeProvider } from "./GraphSlides";
import { getVisibleStackItems } from "./stackTimings";

// ─── Section registrations (same as horizontal) ────────────
import { registerLead } from "../../slides/lead";
import { registerCredencial } from "../../slides/credencial";
import { registerProblema } from "../../slides/problema";
import { registerMecanismo } from "../../slides/mecanismo";
import { registerSolucao } from "../../slides/solucao";
import { registerValidacao } from "../../slides/validacao";
import { registerProduto } from "../../slides/produto";
import { registerEmocional } from "../../slides/emocional";
import { registerPreco } from "../../slides/preco";
import { registerClose } from "../../slides/close";

// ─── Time context for stack sync ────────────────────────────
const TimeContext = createContext(0);
export const useVSLTime = () => useContext(TimeContext);
export function useStackVisible(slide: number, itemIndex: number): boolean {
  const time = useVSLTime();
  return itemIndex < getVisibleStackItems(slide, time);
}

// ─── Zoom: alternating at sentence boundaries ──────────────
function getVideoZoom(timeInSeconds: number): number {
  let count = 0;
  for (const boundary of SENTENCE_BOUNDARIES) {
    if (timeInSeconds >= boundary) count++;
  }
  return count % 2 === 0 ? 1.0 : 1.08;
}

// ─── Build registry ────────────────────────────────────────
function getCurrentSlide(frame: number): number {
  const timeInSeconds = frame / FPS;
  let currentSlide = 0;
  for (const entry of SLIDE_TIMELINE) {
    if (timeInSeconds >= entry.startTime) currentSlide = entry.slide;
  }
  return currentSlide;
}

const SLIDE_REGISTRY = new Map<number, () => React.JSX.Element>();
registerLead(SLIDE_REGISTRY, useStackVisible);
registerCredencial(SLIDE_REGISTRY, useStackVisible);
registerProblema(SLIDE_REGISTRY, useStackVisible);
registerMecanismo(SLIDE_REGISTRY, useStackVisible);
registerSolucao(SLIDE_REGISTRY, useStackVisible);
registerValidacao(SLIDE_REGISTRY, useStackVisible);
registerProduto(SLIDE_REGISTRY, useStackVisible);
registerEmocional(SLIDE_REGISTRY, useStackVisible);
registerPreco(SLIDE_REGISTRY, useStackVisible);
registerClose(SLIDE_REGISTRY, useStackVisible);

function SlideContent({ index }: { index: number }) {
  const SlideComponent = SLIDE_REGISTRY.get(index) || GRAPH_SLIDES.get(index);
  if (!SlideComponent) return null;
  return <SlideComponent />;
}

// ─── Layout constants (1080×1920) ──────────────────────────
const VIDEO_W = 720;      // narrower = shows more body height
const VIDEO_H = 1920 - 620; // stretches to bottom of screen
const SLIDE_HEIGHT = 620;
const VIDEO_TOP = 620;    // right below slides

// ─── CSS overrides for vertical layout ─────────────────────
const OVERLAY_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}

@keyframes graphEnter{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideFromRight{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}
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

.card{background:linear-gradient(145deg,rgba(78,205,196,.06),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.04);border-radius:16px;padding:28px 24px}

.cta-btn{display:inline-block;padding:16px 40px;border-radius:14px;background:linear-gradient(135deg,#4ECDC4,#A78BFA);font-size:22px;font-weight:700;color:#fff;letter-spacing:1px;text-transform:uppercase;box-shadow:0 0 40px rgba(78,205,196,.25),0 0 80px rgba(167,139,250,.15)}

.glow-teal{position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(78,205,196,.08),transparent 70%);pointer-events:none;filter:blur(60px)}
.glow-purple{position:absolute;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.07),transparent 70%);pointer-events:none;filter:blur(60px)}
.glow-red{position:absolute;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,107,.07),transparent 70%);pointer-events:none;filter:blur(60px)}

.waveform{display:flex;align-items:flex-end;gap:2px;height:40px}
.waveform .bar{width:3px;background:#4ECDC4;border-radius:2px}

.double-glow{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.double-glow::before{content:'';position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(78,205,196,.1),transparent 70%);top:25%;left:10%;filter:blur(80px)}
.double-glow::after{content:'';position:absolute;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.08),transparent 70%);bottom:25%;right:10%;filter:blur(80px)}

/* ── Slide override: full width, fit in top area ── */
.slide{display:flex;flex-direction:column;justify-content:center;width:100%;height:100%;padding:40px 48px;position:relative;overflow:hidden;background:#0A0A0A;color:#ffffff}
.slide.center{align-items:center;text-align:center}
.slide.left{align-items:flex-start;text-align:left;padding-left:56px}
.slide.right{align-items:flex-end;text-align:right;padding-right:56px}
`;

// ─── Composition ───────────────────────────────────────────
export const VSLOverlayComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const currentSlide = getCurrentSlide(frame);
  const timeInSeconds = frame / FPS;
  const isGraph = GRAPH_SLIDES.has(currentSlide);
  // Preço fullscreen: ancoragem, deliverables, money shot, CTAs, bônus
  // Fullscreen: ancoragem preço + garantia hero
  const PRECO_FULL = new Set([701, 702, 703, 707, 7071, 7072, 708, 710, 711, 713, 716, 718, 7081]);
  const GARANTIA_FULL = new Set([800, 804, 805]);
  const isPrecoFull = PRECO_FULL.has(currentSlide);
  const isGarantiaFull = GARANTIA_FULL.has(currentSlide);
  const isFullscreen = isGraph || isPrecoFull || isGarantiaFull;

  return (
    <TimeContext.Provider value={timeInSeconds}>
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: OVERLAY_STYLES }} />

      <Audio src={staticFile("vsl_audio_hq.mp3")} startFrom={0} volume={1} />

      {isFullscreen ? (
        /* ─── FULLSCREEN (graphs + preço) ─── */
        <AbsoluteFill key={`full-${currentSlide}`} style={{
          animation: (isPrecoFull || isGarantiaFull)
            ? "slideFromRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both"
            : "graphEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
          zIndex: 20,
        }}>
          <GraphModeProvider value="vertical">
            <SlideContent index={currentSlide} />
          </GraphModeProvider>
        </AbsoluteFill>
      ) : (
        <>
          {/* ─── TOP: Slides ─── */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: SLIDE_HEIGHT,
            overflow: "hidden", background: "#0A0A0A",
          }}>
            <GraphModeProvider value="vertical">
              <div key={`slide-${currentSlide}`} style={{ width: "100%", height: "100%" }}>
                <SlideContent index={currentSlide} />
              </div>
            </GraphModeProvider>
          </div>

          {/* ─── BOTTOM: Video ─── */}
          <div style={{
            position: "absolute", top: VIDEO_TOP, left: 0, width: 1080, height: 1920 - VIDEO_TOP,
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            background: "#0A0A0A",
          }}>
            <div style={{
              width: VIDEO_W, height: VIDEO_H,
              borderRadius: 24, padding: 3,
              background: "linear-gradient(160deg, #4ECDC4, #A78BFA 50%, rgba(78,205,196,0.3))",
              boxShadow: "0 0 50px rgba(78,205,196,0.12), 0 0 100px rgba(167,139,250,0.06)",
            }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: 21, overflow: "hidden", background: "#0A0A0A",
              }}>
                <Video
                  src={staticFile("vsl_marcos_linux.mp4")}
                  startFrom={0}
                  volume={0}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 3%",
                    transform: "scale(1)",
                    transformOrigin: "center 3%",
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── Progress bar ─── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.03)", zIndex: 10 }}>
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
