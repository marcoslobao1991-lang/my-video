import React, { createContext, useContext } from "react";
import { AbsoluteFill, Audio, Video, useCurrentFrame, staticFile } from "remotion";
import { SLIDE_TIMELINE, FPS } from "./timeline";
import { LEAD_ZOOM_MAP } from "./leadZoom";
import { REST_ZOOM_MAP } from "./restZoom";
import { GRAPH_SLIDES, GraphModeProvider } from "./GraphSlides";
import { getVisibleStackItems } from "./stackTimings";

// ─── Section registrations ──────────────────────────────────
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
const useVSLTime = () => useContext(TimeContext);
function useStackVisible(slide: number, itemIndex: number): boolean {
  const time = useVSLTime();
  return itemIndex < getVisibleStackItems(slide, time);
}

// ─── Zoom ───────────────────────────────────────────────────
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

.slide{display:flex;flex-direction:column;justify-content:center;width:68%;height:100%;padding:60px 40px 60px 60px;position:relative;overflow:hidden;background:#0A0A0A;color:#ffffff}
.slide.center{align-items:center;text-align:center}
.slide.left{align-items:flex-start;text-align:left;padding:60px 40px 60px 80px}
.slide.right{align-items:flex-end;text-align:right;padding:60px 40px 60px 60px}
`;

// ─── Build registry from sections ───────────────────────────
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

const SLIDE_REGISTRY = new Map<number, () => React.JSX.Element>();

// Register all sections
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


// ─── Render ─────────────────────────────────────────────────

function SlideContent({ index }: { index: number }) {
  const SlideComponent = SLIDE_REGISTRY.get(index) || GRAPH_SLIDES.get(index);
  if (!SlideComponent) return null;
  return <SlideComponent />;
}

export const VSLComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const currentSlide = getCurrentSlide(frame);
  const timeInSeconds = frame / FPS;
  const zoom = getVideoZoom(timeInSeconds);

  return (
    <TimeContext.Provider value={timeInSeconds}>
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <Audio src={staticFile("vsl_audio_hq.mp3")} startFrom={0} volume={1} />

      <GraphModeProvider value="horizontal">
        <AbsoluteFill key={`slide-${currentSlide}`}>
          <SlideContent index={currentSlide} />
        </AbsoluteFill>
      </GraphModeProvider>

      <div style={{
        position: "absolute", top: 24, right: 24, bottom: 24,
        width: 540, zIndex: 5, borderRadius: 20, padding: 2,
        background: "linear-gradient(160deg, #4ECDC4, #A78BFA 50%, rgba(78,205,196,0.3))",
        boxShadow: "0 0 40px rgba(78,205,196,0.15), 0 0 80px rgba(167,139,250,0.08)",
      }}>
        <div style={{ width: "100%", height: "100%", borderRadius: 18, overflow: "hidden", background: "#0A0A0A" }}>
          <Video src={staticFile("vsl_marcos.mp4")} startFrom={0} volume={0}
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }} />
        </div>
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.03)", zIndex: 10 }}>
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
