import React, { createContext, useContext } from "react";
import { useCurrentFrame, staticFile, Img, OffthreadVideo } from "remotion";

// Context: tells GraphWrap if we're in vertical or horizontal mode
const GraphModeContext = createContext<"horizontal" | "vertical">("horizontal");
export const GraphModeProvider = GraphModeContext.Provider;

// ─── Design DNA (shared with VSL) ──────────────────────────
const C = {
  bg: "#0A0A0A",
  teal: "#4ECDC4",
  purple: "#A78BFA",
  red: "#FF6B6B",
  white: "#fff",
  dim: "rgba(255,255,255,0.35)",
  card: "linear-gradient(145deg, rgba(78,205,196,0.06), rgba(255,255,255,0.01))",
  border: "rgba(255,255,255,0.04)",
  gradient: "linear-gradient(135deg, #4ECDC4, #A78BFA)",
};

const GRAPH_STYLES = `
@keyframes fillBar{from{width:0}to{width:var(--target-w)}}
@keyframes fillBarH{from{height:0}to{height:var(--target-h)}}
@keyframes dotFade{0%{opacity:1}100%{opacity:0.06}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 20px rgba(78,205,196,0.4)}50%{box-shadow:0 0 40px rgba(78,205,196,0.8)}}
@keyframes countUp{from{opacity:0;transform:scale(0.5)}to{opacity:1;transform:scale(1)}}
@keyframes slideIn{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
@keyframes growCircle{from{stroke-dashoffset:var(--circ)}to{stroke-dashoffset:var(--target-offset)}}
@keyframes energyDrain{from{width:100%}to{width:var(--energy)}}
@keyframes stackReveal{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes popIn{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
@keyframes travelArc{0%{offset-distance:0%;opacity:0}10%{opacity:1}90%{opacity:1}100%{offset-distance:100%;opacity:0}}
`;

// ─── Shared wrapper ─────────────────────────────────────────
// Adapts to horizontal (68% left, centered) or vertical (full screen)
// Scale: 1.2× for visual impact
const GraphWrap = ({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) => {
  const mode = useContext(GraphModeContext);
  const isV = mode === "vertical";
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: isV ? "100%" : "68%",
      height: "100%",
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      padding: isV ? "80px 48px" : "48px 40px",
      background: C.bg, color: C.white,
      fontFamily: "'DM Sans', sans-serif", overflow: "hidden",
    }}>
      <style dangerouslySetInnerHTML={{ __html: GRAPH_STYLES }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(78,205,196,0.07), transparent 70%)", top: "15%", left: "20%", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ transform: `scale(${isV ? 1.65 : 1.45})`, transformOrigin: "center center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {title && <div style={{ fontSize: 22, fontWeight: 600, opacity: 0.4, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14, animation: "fadeIn .5s ease both" }}>{title}</div>}
        {subtitle && <div style={{ fontSize: 18, opacity: 0.3, marginBottom: 36, animation: "fadeIn .5s ease .2s both" }}>{subtitle}</div>}
        {children}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 1: 15h vs 150h — Progressive reveal synced to speech
// Graph starts at 219.6s. "15 horas" @ 221.6. "Enquanto" @ 230.7. "150 horas" @ 235.6.
// ═══════════════════════════════════════════════════════════
export const Graph_15vs150 = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS; // absolute time in VSL (useCurrentFrame = global)

  // Absolute timestamps from Whisper:
  // Graph appears @ 219.6s
  // "15 horas" @ 221.6s
  // "Enquanto os que deram certo" @ 230.7s
  // "100, 150 horas" @ 235.1s

  const show15h = t >= 220.0;
  const show150h = t >= 230.70;
  const show10x = t >= 235.56;

  // 150h bar grows from 230.70 ("Enquanto") to 235.56 ("150") — ~5s
  const bar150progress = !show150h ? 0 : Math.min(1, (t - 230.70) / (235.56 - 230.70));

  return (
    <GraphWrap title="HORAS REAIS DE TREINO">
      <div style={{ width: "80%", maxWidth: 600 }}>
        {/* 15h bar — appears first */}
        <div style={{ marginBottom: 40, opacity: show15h ? 1 : 0, transition: "opacity 0.5s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 18, opacity: 0.5 }}>Quem desistiu</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: C.red }}>15h</span>
          </div>
          <div style={{ width: "100%", height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
            {show15h && <div style={{
              height: "100%", borderRadius: 8, background: C.red,
              // @ts-ignore
              "--target-w": "10%", width: "var(--target-w)",
              animation: "fillBar 1s cubic-bezier(.16,1,.3,1) .3s both",
              boxShadow: "0 0 20px rgba(255,107,107,0.3)",
            } as React.CSSProperties} />}
          </div>
          <div style={{ fontSize: 14, opacity: 0.25, marginTop: 6 }}>em meses de plataforma</div>
        </div>
        {/* 150h bar — grows progressively from "Enquanto" to "150" */}
        <div style={{ opacity: show150h ? 1 : 0, transition: "opacity 0.5s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 18, opacity: 0.5 }}>Quem deu certo</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: C.teal }}>{Math.round(bar150progress * 150)}h</span>
          </div>
          <div style={{ width: "100%", height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
            <div style={{
              height: "100%", borderRadius: 8,
              background: `linear-gradient(90deg, ${C.teal}, ${C.purple})`,
              width: `${bar150progress * 100}%`,
              boxShadow: bar150progress > 0.9
                ? `0 0 30px rgba(78,205,196,0.4)`
                : `0 0 15px rgba(78,205,196,0.2)`,
              transition: "box-shadow 0.3s ease",
            }} />
          </div>
          <div style={{ fontSize: 14, opacity: 0.25, marginTop: 6 }}>nos primeiros meses</div>
        </div>
        {/* 10x label — appears when bar completes */}
        <div style={{
          textAlign: "center", marginTop: 40,
          opacity: show10x ? 1 : 0,
          transform: show10x ? "scale(1)" : "scale(0.7)",
          transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(.16,1,.3,1)",
        }}>
          <span style={{ fontSize: 48, fontWeight: 800, background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>10×</span>
          <span style={{ fontSize: 20, opacity: 0.4, marginLeft: 12 }}>mais treino</span>
        </div>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 2: 150 dots → 1 (Kris Nielson)
// ═══════════════════════════════════════════════════════════
export const Graph_150Dots = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  // 280.86 "Sabe quantos" — graph enters, dots visible
  // 282.58 "Um" — dots fade, 1 glows, "1" appears
  // 283.98 "150" — "em 150" appears
  const showUm = t >= 282.58;
  const show150 = t >= 283.98;

  const dots = Array.from({ length: 150 }, (_, i) => i);
  return (
    <GraphWrap title="KRIS NIELSON — 2014" subtitle="150 funcionários do governo americano">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, width: 310, justifyContent: "center" }}>
        {dots.map(i => (
          <div key={i} style={{
            width: 16, height: 16, borderRadius: "50%",
            background: (showUm && i === 74) ? C.teal : showUm ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.5)",
            transition: "background 0.6s ease",
            boxShadow: (showUm && i === 74) ? `0 0 20px ${C.teal}` : "none",
            animation: (showUm && i === 74) ? "pulseGlow 1.5s ease infinite" : "none",
          }} />
        ))}
      </div>
      <div style={{ marginTop: 32, textAlign: "center", opacity: showUm ? 1 : 0, transform: showUm ? "scale(1)" : "scale(0.5)", transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(.16,1,.3,1)" }}>
        <span style={{ fontSize: 72, fontWeight: 900, color: C.teal, textShadow: `0 0 40px rgba(78,205,196,0.5)` }}>1</span>
        <span style={{ fontSize: 24, opacity: show150 ? 0.4 : 0, marginLeft: 8, transition: "opacity 0.3s ease" }}>em 150</span>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 3: 90% abandono — Fill bar
// ═══════════════════════════════════════════════════════════
export const Graph_90Abandono = () => (
  <GraphWrap title="ABANDONO DOS CURSOS">
    <div style={{ width: "70%", maxWidth: 500 }}>
      <div style={{ width: "100%", height: 48, borderRadius: 12, background: "rgba(255,255,255,0.04)", overflow: "hidden", position: "relative" }}>
        <div style={{
          height: "100%", borderRadius: 12, background: `linear-gradient(90deg, ${C.red}, #ff4444)`,
          // @ts-ignore
          "--target-w": "90%", width: "var(--target-w)",
          animation: "fillBar 2s cubic-bezier(.16,1,.3,1) .3s both",
          boxShadow: "0 0 30px rgba(255,107,107,0.4)",
        } as React.CSSProperties} />
        <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.3 }}>de todos os cursos</div>
      </div>
      <div style={{ textAlign: "center", marginTop: 40, animation: "countUp .8s ease 1.5s both" }}>
        <span style={{ fontSize: 120, fontWeight: 900, color: C.red, textShadow: "0 0 60px rgba(255,107,107,0.4)" }}>90%</span>
      </div>
      <div style={{ textAlign: "center", fontSize: 20, opacity: 0.4, animation: "fadeIn .5s ease 2s both" }}>desistem antes de terminar</div>
    </div>
  </GraphWrap>
);

// ═══════════════════════════════════════════════════════════
// GRAPH 4: Cérebro + Dopamina flow
// ═══════════════════════════════════════════════════════════
export const Graph_Dopamina = () => (
  <GraphWrap>
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      {/* Music icon */}
      <div style={{ textAlign: "center", animation: "popIn .5s ease .3s both" }}>
        <div style={{ fontSize: 56 }}>🎵</div>
        <div style={{ fontSize: 14, opacity: 0.4, marginTop: 8 }}>Música</div>
      </div>
      {/* Arrow */}
      <div style={{ fontSize: 28, color: C.teal, animation: "fadeIn .4s ease .6s both" }}>→</div>
      {/* Brain */}
      <div style={{ textAlign: "center", animation: "popIn .5s ease .8s both" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(78,205,196,0.1)", border: `2px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🧠</div>
        <div style={{ fontSize: 14, opacity: 0.4, marginTop: 8 }}>Prazer</div>
      </div>
      {/* Arrow */}
      <div style={{ fontSize: 28, color: C.purple, animation: "fadeIn .4s ease 1.1s both" }}>→</div>
      {/* Dopamine */}
      <div style={{ textAlign: "center", animation: "popIn .5s ease 1.3s both" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.teal}, ${C.purple})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 800, color: "#fff",
          boxShadow: `0 0 30px rgba(78,205,196,0.4)`,
        }}>DOPA</div>
        <div style={{ fontSize: 14, opacity: 0.4, marginTop: 8 }}>Dopamina</div>
      </div>
      {/* Arrow */}
      <div style={{ fontSize: 28, color: C.purple, animation: "fadeIn .4s ease 1.6s both" }}>→</div>
      {/* Memory */}
      <div style={{ textAlign: "center", animation: "popIn .5s ease 1.8s both" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(167,139,250,0.15)", border: `2px solid ${C.purple}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 800, color: C.purple,
          boxShadow: `0 0 30px rgba(167,139,250,0.3)`,
        }}>MEM</div>
        <div style={{ fontSize: 14, opacity: 0.4, marginTop: 8 }}>Memória</div>
      </div>
    </div>
    <div style={{ marginTop: 48, textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 600, animation: "fadeUp .6s ease 2.2s both", opacity: 0 }}>
        <span style={{ opacity: 0.5 }}>Entra</span> <span style={{ color: C.teal }}>mais fácil</span>
        <span style={{ opacity: 0.3, margin: "0 12px" }}>·</span>
        <span style={{ opacity: 0.5 }}>Grava</span> <span style={{ color: C.purple }}>mais forte</span>
        <span style={{ opacity: 0.3, margin: "0 12px" }}>·</span>
        <span style={{ opacity: 0.5 }}>Dura</span> <span style={{ color: C.teal }}>mais tempo</span>
      </div>
    </div>
  </GraphWrap>
);

// ═══════════════════════════════════════════════════════════
// GRAPH 5: 500 palavras = 90% — Donut chart
// ═══════════════════════════════════════════════════════════
export const Graph_500Words = () => {
  const size = 220;
  const stroke = 24;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const target = circ * 0.1; // 90% filled = 10% gap
  return (
    <GraphWrap title="PAUL NATION — LINGUISTA">
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={stroke} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#donutGrad)" strokeWidth={stroke}
            strokeLinecap="round" strokeDasharray={circ}
            style={{
              // @ts-ignore
              "--circ": circ, "--target-offset": target,
              strokeDashoffset: "var(--circ)",
              animation: "growCircle 2s cubic-bezier(.16,1,.3,1) .5s both",
            } as React.CSSProperties}
          />
          <defs>
            <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={C.teal} />
              <stop offset="100%" stopColor={C.purple} />
            </linearGradient>
          </defs>
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: C.teal, animation: "countUp .6s ease 1.5s both" }}>90%</div>
          <div style={{ fontSize: 14, opacity: 0.4 }}>das conversas</div>
        </div>
      </div>
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <div style={{ fontSize: 36, fontWeight: 800, animation: "slideIn .6s ease 2s both" }}>
          <span style={{ background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>500</span>
          <span style={{ opacity: 0.5, fontSize: 22, marginLeft: 8 }}>palavras</span>
        </div>
        <div style={{ fontSize: 16, opacity: 0.3, marginTop: 8, animation: "fadeIn .5s ease 2.3s both" }}>cobrem 90% de tudo que é falado no dia a dia</div>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 6: Mercado <5% vs IC 1-2h/dia
// ═══════════════════════════════════════════════════════════
export const Graph_MercadoVsIC = () => (
  <GraphWrap title="POR QUE É DIFERENTE">
    <div style={{ display: "flex", gap: 80, alignItems: "flex-end" }}>
      {/* Mercado */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 18, opacity: 0.35, marginBottom: 16 }}>Cursos tradicionais</div>
        <div style={{ width: 140, height: 300, borderRadius: 16, background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
          <div style={{
            width: "100%", borderRadius: "0 0 16px 16px",
            background: C.red,
            // @ts-ignore
            "--target-h": "5%", height: "var(--target-h)",
            animation: "fillBarH 1s ease .5s both",
            boxShadow: `0 0 30px rgba(255,107,107,0.4)`,
          } as React.CSSProperties} />
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, color: C.red, marginTop: 16, animation: "countUp .5s ease 1.2s both", textShadow: "0 0 40px rgba(255,107,107,0.3)" }}>&lt;5%</div>
        <div style={{ fontSize: 16, opacity: 0.3 }}>terminam</div>
      </div>
      {/* IC */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 18, opacity: 0.35, marginBottom: 16 }}>Inglês Cantado</div>
        <div style={{ width: 140, height: 300, borderRadius: 16, background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
          <div style={{
            width: "100%", borderRadius: "0 0 16px 16px",
            background: `linear-gradient(0deg, ${C.teal}, ${C.purple})`,
            // @ts-ignore
            "--target-h": "85%", height: "var(--target-h)",
            animation: "fillBarH 1.5s cubic-bezier(.16,1,.3,1) .8s both",
            boxShadow: `0 0 40px rgba(78,205,196,0.35)`,
          } as React.CSSProperties} />
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, color: C.teal, marginTop: 16, animation: "countUp .5s ease 1.8s both", textShadow: "0 0 40px rgba(78,205,196,0.3)" }}>1-2h</div>
        <div style={{ fontSize: 16, opacity: 0.3 }}>por dia, no automático</div>
      </div>
    </div>
  </GraphWrap>
);

// ═══════════════════════════════════════════════════════════
// GRAPH 7: Preço âncora — Fullscreen vertical comparison
// ═══════════════════════════════════════════════════════════
export const Graph_PrecoAncora = () => (
  <GraphWrap>
    <div style={{ width: "90%", maxWidth: 560, display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Header */}
      <div style={{ textAlign: "center", animation: "fadeIn .5s ease both" }}>
        <div style={{ fontSize: 16, fontWeight: 600, opacity: 0.25, letterSpacing: 3, textTransform: "uppercase" }}>COMPARATIVO DE INVESTIMENTO</div>
      </div>

      {/* R$12.000 — Escola */}
      <div style={{ animation: "slideIn .6s ease .3s both" }}>
        <div style={{ padding: "24px 28px", borderRadius: 16, background: "rgba(255,107,107,0.06)", border: "1px solid rgba(255,107,107,0.12)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, opacity: 0.35, marginBottom: 6 }}>Escola presencial</div>
              <div style={{ fontSize: 13, opacity: 0.2 }}>2 anos · 3x por semana · aulas</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: C.red }}>R$12.000</div>
              <div style={{ position: "absolute", left: "-4%", top: "50%", width: "108%", height: 3, background: C.red, transform: "rotate(-4deg)", borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </div>

      {/* R$3.000 — Cursos online */}
      <div style={{ animation: "slideIn .6s ease .7s both" }}>
        <div style={{ padding: "24px 28px", borderRadius: 16, background: "rgba(255,107,107,0.04)", border: "1px solid rgba(255,107,107,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, opacity: 0.35, marginBottom: 6 }}>Cursos online</div>
              <div style={{ fontSize: 13, opacity: 0.2 }}>500 aulas · você assiste 10%</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: C.red, opacity: 0.7 }}>R$3.000</div>
              <div style={{ position: "absolute", left: "-4%", top: "50%", width: "108%", height: 3, background: C.red, transform: "rotate(-4deg)", borderRadius: 2, opacity: 0.7 }} />
            </div>
          </div>
        </div>
      </div>

      {/* R$199 riscado */}
      <div style={{ animation: "slideIn .6s ease 1.1s both" }}>
        <div style={{ padding: "20px 28px", borderRadius: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 15, opacity: 0.25 }}>Valor normal IC</div>
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 28, fontWeight: 600, opacity: 0.35 }}>R$199</div>
              <div style={{ position: "absolute", left: "-4%", top: "50%", width: "108%", height: 2, background: "rgba(255,255,255,0.3)", transform: "rotate(-4deg)", borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </div>

      {/* R$99 — THE ONE */}
      <div style={{ animation: "slideIn .6s ease 1.6s both" }}>
        <div style={{
          padding: "28px 32px", borderRadius: 18,
          background: "linear-gradient(135deg, rgba(78,205,196,0.1), rgba(167,139,250,0.05))",
          border: "1px solid rgba(78,205,196,0.2)",
          boxShadow: "0 0 40px rgba(78,205,196,0.08), 0 0 80px rgba(167,139,250,0.04)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: C.teal, marginBottom: 6 }}>Inglês Cantado</div>
              <div style={{ fontSize: 13, opacity: 0.35 }}>Acesso completo · cancela quando quiser</div>
            </div>
            <div style={{
              fontSize: 44, fontWeight: 900,
              background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 24px rgba(78,205,196,0.35))",
            }}>R$99</div>
          </div>
          <div style={{ marginTop: 12, fontSize: 14, opacity: 0.3, textAlign: "center" }}>por mês — menos que R$3,30/dia</div>
        </div>
      </div>
    </div>
  </GraphWrap>
);

// ═══════════════════════════════════════════════════════════
// GRAPH 8: 3 Camadas da plataforma
// ═══════════════════════════════════════════════════════════
export const Graph_3Camadas = () => (
  <GraphWrap>
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "80%", maxWidth: 480 }}>
      {/* Layer 3 — Fluência */}
      <div style={{
        padding: "20px 24px", borderRadius: 14,
        background: `linear-gradient(135deg, rgba(167,139,250,0.12), rgba(78,205,196,0.06))`,
        border: `1px solid rgba(167,139,250,0.15)`,
        animation: "stackReveal .6s ease 1.2s both",
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.purple, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>3. FLUÊNCIA REAL</div>
        <div style={{ fontSize: 15, opacity: 0.45 }}>Séries cantadas + Discursos históricos</div>
      </div>
      {/* Layer 2 — Correção */}
      <div style={{
        padding: "20px 24px", borderRadius: 14,
        background: `linear-gradient(135deg, rgba(78,205,196,0.08), rgba(167,139,250,0.04))`,
        border: `1px solid rgba(78,205,196,0.1)`,
        animation: "stackReveal .6s ease .7s both",
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.teal, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>2. CORREÇÃO</div>
        <div style={{ fontSize: 15, opacity: 0.45 }}>Pronúncia · Emendado · Expressões · Collocations · Storytelling</div>
      </div>
      {/* Layer 1 — Base */}
      <div style={{
        padding: "24px 24px", borderRadius: 14,
        background: `linear-gradient(135deg, rgba(78,205,196,0.12), rgba(255,255,255,0.02))`,
        border: `1px solid rgba(78,205,196,0.15)`,
        animation: "stackReveal .6s ease .3s both",
        boxShadow: `0 0 30px rgba(78,205,196,0.08)`,
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.teal, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>1. BASE FUNDAMENTAL</div>
        <div style={{ fontSize: 15, opacity: 0.45 }}>O inglês que realmente se repete no dia a dia</div>
      </div>
    </div>
  </GraphWrap>
);

// ═══════════════════════════════════════════════════════════
// GRAPH 9: Jornada do episódio — Timeline steps
// ═══════════════════════════════════════════════════════════
export const Graph_JornadaEpisodio = () => {
  const steps = [
    { ep: "1°", label: "Acompanha\ncom a letra", delay: ".3s" },
    { ep: "2°", label: "Fica\nmais fácil", delay: ".6s" },
    { ep: "3°", label: "Antecipa\nas falas", delay: ".9s" },
    { ep: "5°", label: "Estágio\ndiferente", delay: "1.2s", highlight: true },
  ];
  return (
    <GraphWrap title="PROGRESSÃO POR EPISÓDIO">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{
              textAlign: "center", animation: `popIn .5s ease ${s.delay} both`,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: s.highlight ? C.gradient : "rgba(255,255,255,0.06)",
                border: s.highlight ? "none" : `1px solid rgba(255,255,255,0.08)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 800,
                color: s.highlight ? "#fff" : "rgba(255,255,255,0.5)",
                boxShadow: s.highlight ? `0 0 30px rgba(78,205,196,0.4)` : "none",
              }}>{s.ep}</div>
              <div style={{ fontSize: 12, opacity: 0.35, marginTop: 8, whiteSpace: "pre-line", lineHeight: 1.3 }}>{s.label}</div>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: 40, height: 2,
                background: `linear-gradient(90deg, rgba(78,205,196,0.3), rgba(167,139,250,0.3))`,
                animation: `fadeIn .3s ease ${parseFloat(s.delay) + 0.2}s both`,
                marginBottom: 24,
              }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 10: 95% mesmo resultado
// ═══════════════════════════════════════════════════════════
export const Graph_95Resultado = () => (
  <GraphWrap>
    <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
      {/* Melhor curso */}
      <div style={{ textAlign: "center", animation: "popIn .5s ease .3s both" }}>
        <div style={{ fontSize: 48 }}>🏆</div>
        <div style={{ fontSize: 14, opacity: 0.4, marginTop: 8 }}>Melhor curso</div>
      </div>
      {/* = sign */}
      <div style={{ fontSize: 48, fontWeight: 300, opacity: 0.2, animation: "fadeIn .4s ease .8s both" }}>=</div>
      {/* Pior curso */}
      <div style={{ textAlign: "center", animation: "popIn .5s ease .6s both" }}>
        <div style={{ fontSize: 48 }}>📦</div>
        <div style={{ fontSize: 14, opacity: 0.4, marginTop: 8 }}>Pior curso</div>
      </div>
    </div>
    <div style={{ marginTop: 40, textAlign: "center" }}>
      <div style={{ fontSize: 100, fontWeight: 900, color: C.red, animation: "countUp .6s ease 1.2s both", textShadow: "0 0 60px rgba(255,107,107,0.3)" }}>95%</div>
      <div style={{ fontSize: 20, opacity: 0.4, animation: "fadeIn .5s ease 1.6s both" }}>mesmo resultado — porque os dois são <span style={{ color: C.red, fontWeight: 700 }}>AULA</span></div>
    </div>
  </GraphWrap>
);

// ═══════════════════════════════════════════════════════════
// GRAPH 11: Fadiga cognitiva — Energy timeline
// ═══════════════════════════════════════════════════════════
export const Graph_FadigaTimeline = () => {
  const hours = [
    { time: "8h", energy: "100%", label: "Acordou", color: C.teal },
    { time: "12h", energy: "70%", label: "Trabalho", color: C.teal },
    { time: "18h", energy: "30%", label: "Reunião", color: "#FBBF24" },
    { time: "22h", energy: "5%", label: "Aula?", color: C.red },
  ];
  return (
    <GraphWrap title="SUA ENERGIA MENTAL NO DIA">
      <div style={{ width: "85%", maxWidth: 520, display: "flex", flexDirection: "column", gap: 14 }}>
        {hours.map((h, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, animation: `slideIn .5s ease ${0.3 + i * 0.3}s both` }}>
            <div style={{ width: 36, fontSize: 14, fontWeight: 600, opacity: 0.5, textAlign: "right" }}>{h.time}</div>
            <div style={{ flex: 1, height: 24, borderRadius: 6, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 6, background: h.color,
                // @ts-ignore
                "--target-w": h.energy, width: "var(--target-w)",
                animation: `fillBar 1s ease ${0.5 + i * 0.3}s both`,
                opacity: 0.7,
              } as React.CSSProperties} />
            </div>
            <div style={{ width: 70, fontSize: 13, opacity: i === 3 ? 0.8 : 0.35, color: i === 3 ? C.red : C.white, fontWeight: i === 3 ? 700 : 400 }}>{h.label}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, textAlign: "center", animation: "fadeIn .5s ease 2s both" }}>
        <span style={{ fontSize: 18, opacity: 0.4 }}>Energia pra aula de inglês: </span>
        <span style={{ fontSize: 24, fontWeight: 800, color: C.red }}>ZERO</span>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 12: 200 letras ≠ 1 diálogo
// ═══════════════════════════════════════════════════════════
export const Graph_200vs1 = () => (
  <GraphWrap>
    <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
      {/* 200 letras */}
      <div style={{ textAlign: "center", animation: "popIn .5s ease .3s both" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 2, width: 120, justifyContent: "center" }}>
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} style={{ fontSize: 10, opacity: 0.15 + Math.random() * 0.2 }}>🎵</div>
          ))}
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, marginTop: 12, opacity: 0.6 }}>200</div>
        <div style={{ fontSize: 14, opacity: 0.35 }}>letras decoradas</div>
      </div>
      {/* ≠ */}
      <div style={{ fontSize: 64, fontWeight: 300, color: C.red, animation: "popIn .5s ease .8s both", textShadow: `0 0 30px rgba(255,107,107,0.3)` }}>≠</div>
      {/* 1 diálogo */}
      <div style={{ textAlign: "center", animation: "popIn .5s ease 1.1s both" }}>
        <div style={{
          width: 100, height: 70, borderRadius: 16, border: `1px solid rgba(255,255,255,0.08)`,
          background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, opacity: 0.25,
        }}>💬 ...</div>
        <div style={{ fontSize: 32, fontWeight: 800, marginTop: 12, color: C.red }}>1</div>
        <div style={{ fontSize: 14, opacity: 0.35 }}>diálogo entendido</div>
      </div>
    </div>
  </GraphWrap>
);

// ═══════════════════════════════════════════════════════════
// GRAPH 14: SÉRIE CANTADA + Fluência area chart (combined)
// Phase 1 (22.34s): Friends frame + waveform + title centered
// Phase 2 (24.24s): slides up, arrow, area chart appears below
// ═══════════════════════════════════════════════════════════
export const Graph_SerieCantadaFull = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  // Whisper timestamps:
  // 22.34s "Isso" — graph enters
  // 23.16s "série" — title lands
  // 24.24s "a cada novo episódio" — phase 2, slide up + chart
  // 25.90s "o inglês real se repete" — subtitle 1
  // 28.20s "mesmas estruturas" — subtitle 2

  const showTitle = t >= 22.8;    // title animates in ~0.4s before "série" at 23.16
  const phase2 = t >= 24.24;      // slide up + chart
  const showFacil = t >= 24.90;   // "fica mais fácil" @ 24.90s
  const showRepete = t >= 25.90;  // "porque o inglês real se repete" @ 25.90s
  const showEstruturas = t >= 28.20; // "mesmas estruturas" @ 28.20s

  const bars = [0.3,0.6,0.9,0.5,0.8,1,0.7,0.4,0.9,0.6,0.8,0.5,1,0.7,0.3,0.8,0.6,0.9,0.4,0.7];

  // Area chart — 6 episodes, last one = 100% (FLUENTE)
  const W = 320;
  const H = 140;
  // Saturation curve — rises fast at start, levels off toward FLUENTE (like 1 - e^-x)
  const episodes = [
    { ep: 1, y: 0.35 }, { ep: 2, y: 0.56 }, { ep: 3, y: 0.72 },
    { ep: 4, y: 0.84 }, { ep: 5, y: 0.93 }, { ep: 6, y: 1.0 },
  ];

  // Use many interpolated points for a smooth curve (not jagged segments)
  const CURVE_POINTS = 60;
  const allPts: Array<{x: number; y: number}> = [];
  for (let i = 0; i <= CURVE_POINTS; i++) {
    const pct = i / CURVE_POINTS;
    // Interpolate Y from episode data
    const epIdx = pct * (episodes.length - 1);
    const lo = Math.floor(epIdx);
    const hi = Math.min(lo + 1, episodes.length - 1);
    const frac = epIdx - lo;
    const yVal = episodes[lo].y + (episodes[hi].y - episodes[lo].y) * frac;
    allPts.push({ x: pct * W, y: H - yVal * H });
  }

  // Progress: 0→1 over 3.5s — linear, curve shape is in the data
  const chartDuration = 3.5;
  const rawProgress = !phase2 ? 0 : Math.min(1, (t - 24.24) / chartDuration);
  const chartDone = rawProgress >= 0.99;

  // Slice visible points based on progress
  const visibleCount = Math.round(rawProgress * CURVE_POINTS) + 1;
  const visiblePts = allPts.slice(0, Math.min(visibleCount, allPts.length));

  const linePath = visiblePts.length > 1
    ? visiblePts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
    : "";
  const lastPt = visiblePts[visiblePts.length - 1];
  const areaPath = visiblePts.length > 1
    ? `${linePath} L${lastPt.x.toFixed(1)},${H} L0,${H} Z`
    : "";

  // For dot visibility — map episode index to progress threshold
  const totalLen = episodes.length - 1;
  const eased = rawProgress;
  const pts = episodes.map((ep, i) => ({
    x: (i / totalLen) * W,
    y: H - ep.y * H,
  }));

  return (
    <GraphWrap>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        width: "90%", maxWidth: 540,
        transform: phase2 ? "translateY(-60px)" : "translateY(0)",
        transition: "transform 0.8s cubic-bezier(.16,1,.3,1)",
      }}>
        {/* ─── PHASE 1: Series frame + title ─── */}
        <div style={{
          width: "100%", borderRadius: 16, padding: 3,
          background: C.gradient,
          boxShadow: `0 0 40px rgba(78,205,196,0.15), 0 0 80px rgba(167,139,250,0.08)`,
          animation: "scaleIn .5s cubic-bezier(.16,1,.3,1) both",
          transform: phase2 ? "scale(0.65)" : "scale(1)",
          transition: "transform 0.8s cubic-bezier(.16,1,.3,1)",
        }}>
          <div style={{ borderRadius: 13, overflow: "hidden", position: "relative" }}>
            <Img src={staticFile("friends.jpg")} style={{
              width: "100%", height: "auto", display: "block",
              filter: "brightness(0.65)",
            }} />
            {/* Waveform overlay */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
              background: "linear-gradient(transparent, rgba(10,10,10,0.95))",
              display: "flex", alignItems: "flex-end", justifyContent: "center",
              gap: 3, paddingBottom: 14,
            }}>
              {bars.map((h, i) => (
                <div key={i} style={{
                  width: 5, borderRadius: 3,
                  background: `linear-gradient(0deg, ${C.teal}, ${C.purple})`,
                  height: h * 32, opacity: 0.8,
                  animation: `float ${0.8 + i * 0.1}s ease infinite alternate`,
                  animationDelay: `${i * 0.05}s`,
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Title — appears synced with "série cantada" */}
        <div style={{
          marginTop: phase2 ? 8 : 20,
          textAlign: "center",
          opacity: showTitle ? 1 : 0,
          transform: showTitle ? "scale(1)" : "scale(0.7)",
          transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(.16,1,.3,1), margin-top 0.8s cubic-bezier(.16,1,.3,1)",
        } as React.CSSProperties}>
          <div style={{
            fontSize: phase2 ? 24 : 38, fontWeight: 900, lineHeight: 1,
            background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 30px rgba(78,205,196,0.4))",
            transition: "font-size 0.8s cubic-bezier(.16,1,.3,1)",
          }}>
            SÉRIE CANTADA
          </div>
          {!phase2 && (
            <div style={{ fontSize: 14, opacity: 0.3, marginTop: 8 }}>
              A cena vira música. O inglês gruda.
            </div>
          )}
        </div>

        {/* ─── PHASE 2: Arrow + area chart ─── */}
        {phase2 && (
          <>
            {/* Arrow */}
            <div style={{ margin: "12px 0 8px", animation: "fadeIn .3s ease both" }}>
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                <path d="M10 0 L10 20 M3 15 L10 22 L17 15" stroke="url(#arrowG2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs><linearGradient id="arrowG2" x1="10" y1="0" x2="10" y2="22"><stop offset="0%" stopColor={C.teal} /><stop offset="100%" stopColor={C.purple} /></linearGradient></defs>
              </svg>
            </div>

            {/* Area chart */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              width: "100%",
              animation: "fadeUp .6s ease .2s both",
            }}>
              <div style={{
                fontSize: 10, fontWeight: 600, letterSpacing: 3, opacity: 0.2,
                textTransform: "uppercase", marginBottom: 8,
              }}>
                COMPREENSÃO
              </div>
              <div style={{ width: W, position: "relative" }}>
                <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
                  <defs>
                    <linearGradient id="af2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.teal} stopOpacity="0.35" />
                      <stop offset="100%" stopColor={C.teal} stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={C.teal} />
                      <stop offset="100%" stopColor={C.purple} />
                    </linearGradient>
                  </defs>

                  {[0.25, 0.5, 0.75].map(p => (
                    <line key={p} x1={0} y1={H * (1 - p)} x2={W} y2={H * (1 - p)}
                      stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
                  ))}

                  {/* Area fill — grows with progress */}
                  {areaPath && (
                    <path d={areaPath} fill="url(#af2)" />
                  )}

                  {/* Line — draws progressively */}
                  {linePath && (
                    <path d={linePath} fill="none" stroke="url(#lg2)" strokeWidth={2.5}
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{ filter: "drop-shadow(0 0 6px rgba(78,205,196,0.4))" }}
                    />
                  )}

                  {/* Glowing dot at the tip of the curve */}
                  {lastPt && rawProgress > 0 && (
                    <circle cx={lastPt.x} cy={lastPt.y} r={5}
                      fill={C.teal}
                      style={{ filter: `drop-shadow(0 0 8px ${C.teal})` }}
                    />
                  )}

                  {/* Episode dots — appear when curve reaches them */}
                  {pts.map((p, i) => {
                    const dotThreshold = i / totalLen;
                    const visible = eased >= dotThreshold;
                    return (
                      <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 5 : 3}
                        fill={i === pts.length - 1 ? C.purple : C.teal}
                        style={{
                          opacity: visible ? 1 : 0,
                          transition: "opacity 0.2s ease",
                          filter: i === pts.length - 1 ? `drop-shadow(0 0 8px ${C.purple})` : "none",
                        }}
                      />
                    );
                  })}

                  {/* FLUENTE — positioned at last point, lights up when chart arrives */}
                  <text
                    x={pts[pts.length - 1].x + 8}
                    y={pts[pts.length - 1].y + 4}
                    fill={chartDone ? C.teal : "rgba(255,255,255,0.15)"}
                    fontSize={12} fontWeight={800} letterSpacing={2}
                    style={{
                      transition: "fill 0.4s ease",
                      filter: chartDone ? `drop-shadow(0 0 8px rgba(78,205,196,0.5))` : "none",
                    }}
                  >
                    FLUENTE
                  </text>
                </svg>

                <div style={{ position: "relative", width: W, height: 20, marginTop: 6 }}>
                  {episodes.map((ep, i) => (
                    <div key={ep.ep} style={{
                      position: "absolute",
                      left: (i / (episodes.length - 1)) * W,
                      transform: "translateX(-50%)",
                      fontSize: 10, fontWeight: 600,
                      color: ep.ep === 6 ? C.teal : "rgba(255,255,255,0.3)",
                    }}>
                      Ep{ep.ep}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Subtitles — synced to word-level timestamps */}
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <div style={{
                fontSize: 17, fontWeight: 600,
                opacity: showFacil ? 1 : 0, transition: "opacity 0.4s ease",
              }}>
                <span style={{ opacity: 0.5 }}>A cada novo episódio</span>{" "}
                <span style={{ color: C.teal, fontWeight: 800 }}>fica mais fácil</span>
              </div>
              <div style={{
                fontSize: 15, marginTop: 8,
                opacity: showRepete ? 1 : 0, transition: "opacity 0.4s ease",
              }}>
                <span style={{ opacity: 0.35 }}>porque o inglês</span>{" "}
                <span style={{ color: C.teal, fontWeight: 700 }}>se repete</span>{" "}
                <span style={{ opacity: showEstruturas ? 0.35 : 0, transition: "opacity 0.4s ease" }}>dentro das</span>{" "}
                <span style={{
                  fontWeight: 800,
                  opacity: showEstruturas ? 1 : 0, transition: "opacity 0.4s ease",
                  background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>mesmas estruturas</span>
              </div>
            </div>
          </>
        )}
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 16: Som embolado → Faz sentido (LEAD 31.78s)
// Phase 1: chaos centered — big red text + floating fragments
// Phase 2 (32.32s): chaos shrinks up + fades, arrow, "faz sentido" centered
// ═══════════════════════════════════════════════════════════
export const Graph_EmboladoSentido = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  // Whisper: 31.06 "o que antes" — graph enters
  //          31.78 "som" 31.86 "embolado"
  //          32.32 "começa" — phase 2
  //          32.90 "fazer sentido"
  const phase2 = t >= 32.32;

  const fragments = [
    { text: "th", x: "10%", y: "12%", size: 44, rot: -15 },
    { text: "sh", x: "78%", y: "18%", size: 38, rot: 12 },
    { text: "ch", x: "18%", y: "75%", size: 36, rot: -8 },
    { text: "wh", x: "82%", y: "68%", size: 40, rot: 18 },
    { text: "-tion", x: "62%", y: "10%", size: 32, rot: -22 },
    { text: "-ing", x: "12%", y: "48%", size: 34, rot: 10 },
    { text: "?", x: "90%", y: "42%", size: 52, rot: 15 },
    { text: "?", x: "5%", y: "28%", size: 46, rot: -20 },
    { text: "ght", x: "52%", y: "80%", size: 30, rot: -12 },
    { text: "ough", x: "42%", y: "22%", size: 28, rot: 8 },
    { text: "?", x: "70%", y: "78%", size: 40, rot: -5 },
    { text: "wr", x: "35%", y: "68%", size: 32, rot: 14 },
  ];

  return (
    <GraphWrap>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        width: "90%", maxWidth: 540,
        transform: phase2 ? "translateY(-60px)" : "translateY(0)",
        transition: "transform 0.8s cubic-bezier(.16,1,.3,1)",
      }}>
        {/* ─── Som embolado — chaos orbiting the text ─── */}
        <div style={{
          position: "relative",
          transform: phase2 ? "scale(0.45)" : "scale(1)",
          opacity: phase2 ? 0.15 : 1,
          transition: "transform 0.8s cubic-bezier(.16,1,.3,1), opacity 0.6s ease",
        }}>
          {/* Fragments orbiting around the main text */}
          <div style={{ position: "relative", display: "inline-block" }}>
            {fragments.map((f, i) => {
              // Position fragments in a cloud around center
              const angle = (i / fragments.length) * Math.PI * 2;
              const radius = 120 + (i % 3) * 40;
              const ox = Math.cos(angle) * radius;
              const oy = Math.sin(angle) * radius;
              return (
                <div key={i} style={{
                  position: "absolute",
                  left: "50%", top: "50%",
                  marginLeft: ox, marginTop: oy,
                  fontSize: f.size, fontWeight: 800,
                  color: "rgba(255,107,107,0.35)",
                  transform: `translate(-50%, -50%) rotate(${f.rot}deg)`,
                  animation: `pulse 1.2s ease infinite alternate, float 1.8s ease infinite alternate`,
                  animationDelay: `${i * 0.1}s, ${i * 0.15}s`,
                  fontStyle: "italic",
                }}>
                  {f.text}
                </div>
              );
            })}

            {/* Main text */}
            <div style={{
              fontSize: 64, fontWeight: 900,
              color: C.red,
              textShadow: `0 0 40px rgba(255,107,107,0.4), 0 0 80px rgba(255,107,107,0.15)`,
              animation: "scaleIn 0.5s cubic-bezier(.16,1,.3,1) both",
              position: "relative", zIndex: 2,
              whiteSpace: "nowrap",
            }}>
              Som embolado.
            </div>
          </div>
        </div>

        {/* ─── Arrow + Faz sentido ─── */}
        {phase2 && (
          <>
            {/* Arrow */}
            <div style={{ margin: "12px 0 8px", animation: "fadeIn .3s ease both" }}>
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                <path d="M10 0 L10 20 M3 15 L10 22 L17 15" stroke="url(#arrowEmb)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs><linearGradient id="arrowEmb" x1="10" y1="0" x2="10" y2="22"><stop offset="0%" stopColor={C.red} /><stop offset="100%" stopColor={C.teal} /></linearGradient></defs>
              </svg>
            </div>

            {/* Faz sentido — clarity */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              animation: "fadeUp 0.6s cubic-bezier(.16,1,.3,1) both",
            }}>
              <div style={{
                fontSize: 52, fontWeight: 800,
                background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(78,205,196,0.4)) drop-shadow(0 0 60px rgba(167,139,250,0.2))",
              }}>
                Faz sentido.
              </div>
              <div style={{
                marginTop: 20, fontSize: 26, fontWeight: 500,
                color: C.teal, opacity: 0.4, fontStyle: "italic", letterSpacing: 1,
                animation: "fadeIn 0.5s ease 0.4s both",
              }}>
                Hey, how are you?
              </div>
            </div>
          </>
        )}
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 17: Globo + Impacto (CREDENCIAL 109.74s)
// Globe with trails from Brazil + animated counters
// 109.74s "30" países, 110.96s "1" milhão, 113.88s "vídeos"
// ═══════════════════════════════════════════════════════════
export const Graph_FluencyGlobo = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;
  const localFrame = Math.max(0, frame - 103.58 * FPS); // frames since graph appeared

  // Phase timestamps
  const showBullet = t >= 106.46;  // "uma das maiores"
  const showGlobe = t >= 109.40;   // "mais de" (just before "30")
  const show30 = t >= 109.74;
  const show1M = t >= 110.96;
  const showVideos = t >= 113.88;

  // Continuous rotation
  const rot = localFrame * 0.3;

  const arcs = [
    { angle: -30, dist: 0.7, delay: 0.15 },
    { angle: -50, dist: 0.85, delay: 0.3 },
    { angle: -15, dist: 0.5, delay: 0.25 },
    { angle: 20, dist: 0.6, delay: 0.4 },
    { angle: 35, dist: 0.75, delay: 0.5 },
    { angle: 42, dist: 0.9, delay: 0.6 },
    { angle: 55, dist: 0.7, delay: 0.7 },
    { angle: 65, dist: 0.95, delay: 0.8 },
    { angle: 80, dist: 0.85, delay: 0.9 },
    { angle: 100, dist: 0.8, delay: 1.0 },
    { angle: 125, dist: 0.85, delay: 1.1 },
    { angle: 150, dist: 0.7, delay: 1.15 },
    { angle: -65, dist: 0.6, delay: 0.35 },
    { angle: -20, dist: 0.9, delay: 0.55 },
    { angle: 8, dist: 0.45, delay: 0.45 },
    { angle: 48, dist: 0.65, delay: 0.65 },
    { angle: -40, dist: 0.55, delay: 0.2 },
    { angle: 90, dist: 0.75, delay: 0.85 },
    { angle: 110, dist: 0.6, delay: 1.05 },
    { angle: 140, dist: 0.9, delay: 1.2 },
  ];

  const globeR = 90;
  const cx = 160;
  const cy = 105;
  const brX = cx - 20;
  const brY = cy + 18;

  return (
    <GraphWrap>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", width: "90%", maxWidth: 540,
        transform: showGlobe ? "translateY(-30px)" : "translateY(0)",
        transition: "transform 0.8s cubic-bezier(.16,1,.3,1)",
      }}>
        {/* ─── Logo + FLUENCY ROUTE ─── */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <Img src={staticFile("logo-ic.png")} style={{
            width: 64, height: 64,
            marginBottom: 12,
            filter: "drop-shadow(0 0 16px rgba(78,205,196,0.3))",
            animation: "scaleIn 0.5s cubic-bezier(.16,1,.3,1) both",
          }} />
          <div style={{
            fontSize: 56, fontWeight: 900, lineHeight: 1,
            background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(78,205,196,0.3))",
            animation: "scaleIn 0.5s cubic-bezier(.16,1,.3,1) 0.2s both",
          }}>
            FLUENCY ROUTE
          </div>
          {/* Bullet — "Uma das maiores escolas" */}
          <div style={{
            fontSize: 16, fontWeight: 500, marginTop: 12,
            color: "rgba(255,255,255,0.4)",
            opacity: showBullet ? 1 : 0,
            transform: showBullet ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}>
            Uma das maiores escolas de ingles do Brasil
          </div>
        </div>

        {/* ─── Globe (appears phase 3) ─── */}
        <div style={{
          position: "relative", width: 320, height: 220,
          opacity: showGlobe ? 1 : 0,
          transform: showGlobe ? "scale(1)" : "scale(0.5)",
          transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(.16,1,.3,1)",
          marginTop: 8,
        }}>
          <svg width={320} height={220} viewBox="0 0 320 220" style={{ overflow: "visible" }}>
            <defs>
              <radialGradient id="globeGlow2" cx="35%" cy="35%">
                <stop offset="0%" stopColor="rgba(78,205,196,0.12)" />
                <stop offset="50%" stopColor="rgba(167,139,250,0.04)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <linearGradient id="arcG2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={C.teal} stopOpacity="0.9" />
                <stop offset="100%" stopColor={C.purple} stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={C.teal} stopOpacity="0.2" />
                <stop offset="50%" stopColor={C.purple} stopOpacity="0.1" />
                <stop offset="100%" stopColor={C.teal} stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Outer ring — orbiting */}
            <ellipse cx={cx} cy={cy} rx={globeR + 20} ry={globeR + 20}
              fill="none" stroke="url(#ringG)" strokeWidth={1}
              strokeDasharray="8 12"
              style={{ transform: `rotate(${rot}deg)`, transformOrigin: `${cx}px ${cy}px` }}
            />
            <ellipse cx={cx} cy={cy} rx={globeR + 35} ry={globeR + 35}
              fill="none" stroke="rgba(167,139,250,0.06)" strokeWidth={0.5}
              strokeDasharray="4 16"
              style={{ transform: `rotate(${-rot * 0.7}deg)`, transformOrigin: `${cx}px ${cy}px` }}
            />

            {/* Globe body */}
            <circle cx={cx} cy={cy} r={globeR} fill="url(#globeGlow2)"
              stroke="rgba(78,205,196,0.2)" strokeWidth={2} />

            {/* Grid lines — rotating */}
            {[-0.6, -0.2, 0.2, 0.6].map((lat, i) => (
              <ellipse key={`lat${i}`} cx={cx} cy={cy + lat * globeR * 0.7}
                rx={globeR * Math.sqrt(1 - lat * lat * 0.5)} ry={6 + Math.abs(lat) * 4}
                fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={0.8}
                style={{ transform: `rotate(${rot * 0.15}deg)`, transformOrigin: `${cx}px ${cy}px` }}
              />
            ))}
            {[0, 45, 90, 135].map((lon, i) => (
              <ellipse key={`lon${i}`} cx={cx} cy={cy} rx={10 + i * 3} ry={globeR}
                fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={0.8}
                style={{ transform: `rotate(${lon + rot * 0.15}deg)`, transformOrigin: `${cx}px ${cy}px` }}
              />
            ))}

            {/* Arc trails */}
            {show30 && arcs.map((arc, i) => {
              const rad = (arc.angle * Math.PI) / 180;
              const endX = brX + Math.cos(rad) * globeR * arc.dist;
              const endY = brY + Math.sin(rad) * globeR * arc.dist * 0.55;
              const midX = (brX + endX) / 2 + Math.sin(rad) * 15;
              const midY = Math.min(brY, endY) - 25 - arc.dist * 25;
              return (
                <React.Fragment key={i}>
                  <path
                    d={`M${brX},${brY} Q${midX},${midY} ${endX},${endY}`}
                    fill="none" stroke="url(#arcG2)" strokeWidth={1.5}
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 200, strokeDashoffset: 200,
                      animation: `fillBar 0.8s ease ${arc.delay}s both`,
                      opacity: 0.7,
                    }}
                  />
                  {/* Traveling particle on arc */}
                  <circle r={2} fill={C.teal}
                    style={{
                      offsetPath: `path('M${brX},${brY} Q${midX},${midY} ${endX},${endY}')`,
                      offsetDistance: "0%",
                      animation: `travelArc 1.2s ease ${arc.delay + 0.2}s both`,
                      filter: `drop-shadow(0 0 4px ${C.teal})`,
                      opacity: 0,
                    } as React.CSSProperties}
                  />
                </React.Fragment>
              );
            })}

            {/* Destination dots — pulsing */}
            {show30 && arcs.map((arc, i) => {
              const rad = (arc.angle * Math.PI) / 180;
              const endX = brX + Math.cos(rad) * globeR * arc.dist;
              const endY = brY + Math.sin(rad) * globeR * arc.dist * 0.55;
              return (
                <React.Fragment key={`dot${i}`}>
                  <circle cx={endX} cy={endY} r={3} fill={C.purple}
                    style={{
                      opacity: 0, animation: `fadeIn .3s ease ${arc.delay + 0.7}s both`,
                      filter: `drop-shadow(0 0 6px ${C.purple})`,
                    }}
                  />
                  {/* Pulse ring */}
                  <circle cx={endX} cy={endY} r={6} fill="none"
                    stroke={C.purple} strokeWidth={0.5}
                    style={{
                      opacity: 0,
                      animation: `fadeIn .3s ease ${arc.delay + 0.7}s both, pulse 2s ease ${arc.delay + 1}s infinite`,
                    }}
                  />
                </React.Fragment>
              );
            })}

            {/* Brazil — glowing beacon */}
            <circle cx={brX} cy={brY} r={8} fill="none" stroke={C.teal} strokeWidth={1.5}
              style={{ animation: "pulse 1.5s ease infinite", opacity: 0.5 }}
            />
            <circle cx={brX} cy={brY} r={14} fill="none" stroke={C.teal} strokeWidth={0.5}
              style={{ animation: "pulse 2s ease 0.5s infinite", opacity: 0.25 }}
            />
            <circle cx={brX} cy={brY} r={5} fill={C.teal}
              style={{ filter: `drop-shadow(0 0 12px ${C.teal}) drop-shadow(0 0 24px ${C.teal})` }}
            />
            <text x={brX - 7} y={brY - 12} fill={C.teal} fontSize={9} fontWeight={800} opacity={0.8}
              letterSpacing={2}>
              BRASIL
            </text>

            {/* Continuous particles — pop endlessly from globe center */}
            {showGlobe && Array.from({ length: 20 }, (_, i) => {
              // Each particle cycles on a loop using frame
              const seed = i * 137.5; // golden angle spread
              const cycleLen = 60 + (i % 4) * 15; // frames per cycle (2-2.5s)
              const cycleFrame = (localFrame + Math.floor(seed)) % cycleLen;
              const progress = cycleFrame / cycleLen; // 0→1

              const angle = (seed % 360) * (Math.PI / 180);
              const maxDist = globeR * 0.85;
              const dist = progress * maxDist;
              const px = cx + Math.cos(angle) * dist;
              const py = cy + Math.sin(angle) * dist * 0.65;
              const size = 1.5 + (i % 3);
              const fade = progress < 0.1 ? progress * 10 : progress > 0.7 ? (1 - progress) / 0.3 : 1;
              const color = i % 3 === 0 ? C.teal : i % 3 === 1 ? C.purple : "rgba(255,255,255,0.6)";

              return (
                <circle key={`p${i}`} cx={px} cy={py} r={size * (0.5 + progress * 0.5)}
                  fill={color}
                  style={{
                    opacity: fade * 0.7,
                    filter: `drop-shadow(0 0 3px ${color})`,
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Counters */}
        <div style={{ display: "flex", gap: 40, marginTop: 8 }}>
          <div style={{
            textAlign: "center",
            opacity: show30 ? 1 : 0, transform: show30 ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, color: C.teal,
              textShadow: `0 0 30px rgba(78,205,196,0.4)` }}>30+</div>
            <div style={{ fontSize: 13, opacity: 0.4, marginTop: 6, fontWeight: 600, letterSpacing: 2 }}>PAÍSES</div>
          </div>
          <div style={{
            textAlign: "center",
            opacity: show1M ? 1 : 0, transform: show1M ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1,
              background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(78,205,196,0.3))" }}>1M+</div>
            <div style={{ fontSize: 13, opacity: 0.4, marginTop: 6, fontWeight: 600, letterSpacing: 2 }}>HORAS</div>
          </div>
          <div style={{
            textAlign: "center",
            opacity: showVideos ? 1 : 0, transform: showVideos ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, color: C.purple,
              textShadow: `0 0 30px rgba(167,139,250,0.4)` }}>M+</div>
            <div style={{ fontSize: 13, opacity: 0.4, marginTop: 6, fontWeight: 600, letterSpacing: 2 }}>VIEWS</div>
          </div>
        </div>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 18: Energy drain — synced to speech items
// Each routine item drains the bar until ZERO
// ═══════════════════════════════════════════════════════════
export const Graph_EnergyDrain = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const items = [
    { word: "Trabalho", time: 333.68 },
    { word: "Mensagem", time: 334.52 },
    { word: "E-mail", time: 335.62 },
    { word: "Decisao", time: 335.82 },
    { word: "Problemas", time: 336.64 },
    { word: "Reuniao", time: 337.20 },
    { word: "Transito", time: 337.84 },
    { word: "Familia", time: 338.56 },
  ];

  // Count how many items are visible
  const visibleCount = items.filter(i => t >= i.time).length;
  const energyPct = Math.max(0, 100 - (visibleCount / items.length) * 100);
  const isZero = visibleCount >= items.length;

  // Color transitions: teal → yellow → red
  const barColor = energyPct > 50 ? "#4ECDC4" : energyPct > 20 ? "#FBBF24" : "#FF6B6B";
  const glowColor = energyPct > 50 ? "rgba(78,205,196,0.3)" : energyPct > 20 ? "rgba(251,191,36,0.3)" : "rgba(255,107,107,0.4)";

  return (
    <GraphWrap title="ENERGIA MENTAL">
      <div style={{ width: "85%", maxWidth: 480, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Energy bar */}
        <div style={{ width: "100%", height: 36, borderRadius: 10, background: "rgba(255,255,255,0.04)", overflow: "hidden", position: "relative" }}>
          <div style={{
            height: "100%", borderRadius: 10,
            background: barColor,
            width: `${energyPct}%`,
            transition: "width 0.4s ease, background 0.4s ease",
            boxShadow: `0 0 20px ${glowColor}`,
          }} />
        </div>

        {/* Percentage */}
        <div style={{
          fontSize: 48, fontWeight: 900, marginTop: 16,
          color: barColor,
          textShadow: `0 0 30px ${glowColor}`,
          transition: "color 0.4s ease",
        }}>
          {Math.round(energyPct)}%
        </div>

        {/* Items appearing as they drain */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 20 }}>
          {items.map((item, i) => {
            const show = t >= item.time;
            return (
              <div key={i} style={{
                padding: "6px 14px", borderRadius: 8,
                background: show ? "rgba(255,107,107,0.08)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${show ? "rgba(255,107,107,0.15)" : "rgba(255,255,255,0.04)"}`,
                opacity: show ? 1 : 0.15,
                transform: show ? "scale(1)" : "scale(0.85)",
                transition: "all 0.3s ease",
              }}>
                <span style={{
                  fontSize: 16, fontWeight: 600,
                  color: show ? "#FF6B6B" : "rgba(255,255,255,0.3)",
                  transition: "color 0.3s ease",
                }}>{item.word}</span>
              </div>
            );
          })}
        </div>

        {/* ZERO label */}
        {isZero && (
          <div style={{
            marginTop: 20, fontSize: 20, fontWeight: 800,
            color: "#FF6B6B",
            textShadow: "0 0 20px rgba(255,107,107,0.4)",
            animation: "countUp 0.5s cubic-bezier(.16,1,.3,1) both",
          }}>
            Energia pra aula de ingles: ZERO
          </div>
        )}
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 19: Johns Hopkins Brain — reward center shuts off
// 371.86 "2024 JH" → 376.34 "voluntários" → 382.00 "dinheiro"
// 385.94 "90%" → 391.36 "recompensa desligada"
// ═══════════════════════════════════════════════════════════
export const Graph_JHBrain = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const showVoluntarios = t >= 376.34;
  const showDinheiro = t >= 382.00;
  const show90 = t >= 385.94;
  const showDesligada = t >= 391.36;

  // Brain reward glow: starts bright, dims with fatigue, dies at 90%
  const rewardGlow = !showVoluntarios ? 1.0
    : !showDinheiro ? 0.6
    : !show90 ? 0.3
    : 0;

  // Brain outline color
  const brainColor = show90 ? "rgba(255,107,107,0.3)" : "rgba(78,205,196,0.2)";

  const cx = 160;
  const cy = 100;

  return (
    <GraphWrap title="JOHNS HOPKINS — 2024">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "90%", maxWidth: 480 }}>

        {/* Brain SVG — realistic shape */}
        <div style={{ position: "relative", width: 360, height: 280 }}>
          <svg width={360} height={280} viewBox="0 0 360 280" style={{ overflow: "visible" }}>
            {/* Brain — realistic outline using bezier curves */}
            {/* Left hemisphere */}
            <path d={`
              M180,240
              C180,240 165,235 155,220
              C140,195 110,180 95,150
              C80,120 75,95 82,70
              C88,48 105,32 125,25
              C145,18 162,22 175,35
              C178,38 180,45 180,50
            `} fill="none" stroke={brainColor} strokeWidth={2.5}
              style={{ transition: "stroke 0.8s ease" }} />
            {/* Right hemisphere */}
            <path d={`
              M180,240
              C180,240 195,235 205,220
              C220,195 250,180 265,150
              C280,120 285,95 278,70
              C272,48 255,32 235,25
              C215,18 198,22 185,35
              C182,38 180,45 180,50
            `} fill="none" stroke={brainColor} strokeWidth={2.5}
              style={{ transition: "stroke 0.8s ease" }} />

            {/* Brain sulci (folds) — left */}
            <path d={`M100,130 Q125,105 155,115`} fill="none" stroke={brainColor} strokeWidth={1.5}
              style={{ transition: "stroke 0.8s ease" }} />
            <path d={`M90,100 Q115,75 145,80`} fill="none" stroke={brainColor} strokeWidth={1.5}
              style={{ transition: "stroke 0.8s ease" }} />
            <path d={`M110,165 Q135,145 160,155`} fill="none" stroke={brainColor} strokeWidth={1.2}
              style={{ transition: "stroke 0.8s ease" }} />
            <path d={`M120,60 Q140,45 160,52`} fill="none" stroke={brainColor} strokeWidth={1.2}
              style={{ transition: "stroke 0.8s ease" }} />

            {/* Brain sulci — right */}
            <path d={`M260,130 Q235,105 205,115`} fill="none" stroke={brainColor} strokeWidth={1.5}
              style={{ transition: "stroke 0.8s ease" }} />
            <path d={`M270,100 Q245,75 215,80`} fill="none" stroke={brainColor} strokeWidth={1.5}
              style={{ transition: "stroke 0.8s ease" }} />
            <path d={`M250,165 Q225,145 200,155`} fill="none" stroke={brainColor} strokeWidth={1.2}
              style={{ transition: "stroke 0.8s ease" }} />
            <path d={`M240,60 Q220,45 200,52`} fill="none" stroke={brainColor} strokeWidth={1.2}
              style={{ transition: "stroke 0.8s ease" }} />

            {/* Center divide */}
            <line x1={180} y1={50} x2={180} y2={240} stroke={brainColor} strokeWidth={1}
              style={{ transition: "stroke 0.8s ease" }} />

            {/* Brain stem */}
            <path d={`M170,235 Q175,260 180,268 Q185,260 190,235`} fill="none"
              stroke={brainColor} strokeWidth={2} style={{ transition: "stroke 0.8s ease" }} />

            {/* Reward center — glowing core in the middle */}
            <circle cx={180} cy={160} r={28}
              fill={rewardGlow > 0 ? `rgba(78,205,196,${rewardGlow * 0.15})` : "rgba(255,107,107,0.05)"}
              stroke={rewardGlow > 0 ? `rgba(78,205,196,${rewardGlow * 0.5})` : "rgba(255,107,107,0.2)"}
              strokeWidth={2.5}
              style={{
                filter: rewardGlow > 0
                  ? `drop-shadow(0 0 ${rewardGlow * 40}px rgba(78,205,196,${rewardGlow * 0.7}))`
                  : "drop-shadow(0 0 10px rgba(255,107,107,0.2))",
                transition: "all 0.8s ease",
              }}
            />
            <text x={180} y={164} textAnchor="middle" fontSize={11} fontWeight={700}
              fill={rewardGlow > 0 ? `rgba(78,205,196,${rewardGlow})` : "rgba(255,107,107,0.6)"}
              style={{ transition: "fill 0.8s ease" }}
            >
              {showDesligada ? "OFF" : "REWARD"}
            </text>

            {/* Pulse rings when active */}
            {rewardGlow > 0.3 && (
              <>
                <circle cx={180} cy={160} r={38} fill="none"
                  stroke={`rgba(78,205,196,${rewardGlow * 0.2})`} strokeWidth={1.5}
                  style={{ animation: "pulse 2s ease infinite" }} />
                <circle cx={180} cy={160} r={50} fill="none"
                  stroke={`rgba(78,205,196,${rewardGlow * 0.1})`} strokeWidth={0.8}
                  style={{ animation: "pulse 2.5s ease 0.5s infinite" }} />
              </>
            )}

            {/* Neural activity dots — fade with glow */}
            {[
              { x: 130, y: 90 }, { x: 230, y: 85 }, { x: 115, y: 140 }, { x: 245, y: 135 },
              { x: 150, y: 60 }, { x: 210, y: 55 }, { x: 140, y: 185 }, { x: 220, y: 180 },
            ].map((dot, i) => (
              <circle key={i} cx={dot.x} cy={dot.y} r={3}
                fill={rewardGlow > 0 ? `rgba(78,205,196,${rewardGlow * 0.4})` : "rgba(255,255,255,0.03)"}
                style={{
                  animation: rewardGlow > 0.3 ? `pulse ${1.5 + i * 0.2}s ease infinite` : "none",
                  transition: "fill 0.8s ease",
                }}
              />
            ))}
          </svg>

          {/* $ icon — appears at "dinheiro", rejected at 90% */}
          {showDinheiro && (
            <div style={{
              position: "absolute", right: 20, top: "30%",
              fontSize: 48, fontWeight: 900,
              color: show90 ? "rgba(255,107,107,0.15)" : "#FBBF24",
              textShadow: show90 ? "none" : "0 0 20px rgba(251,191,36,0.4)",
              animation: show90 ? "none" : "pulse 1.5s ease infinite",
              textDecoration: show90 ? "line-through" : "none",
              transition: "color 0.5s ease, text-shadow 0.5s ease",
            }}>
              $
            </div>
          )}
        </div>

        {/* Status text */}
        <div style={{ textAlign: "center", marginTop: 8 }}>
          {/* Voluntários phase */}
          {showVoluntarios && !show90 && (
            <div style={{ fontSize: 16, opacity: 0.4, animation: "fadeIn 0.4s ease both" }}>
              {showDinheiro
                ? "Ofereceram dinheiro pra continuar..."
                : "Voluntarios fazendo tarefas ate a exaustao..."
              }
            </div>
          )}

          {/* 90% — the punch */}
          {show90 && (
            <div style={{ animation: "countUp 0.5s cubic-bezier(.16,1,.3,1) both" }}>
              <span style={{
                fontSize: 80, fontWeight: 900,
                color: "#FF6B6B",
                textShadow: "0 0 40px rgba(255,107,107,0.5), 0 0 80px rgba(255,107,107,0.2)",
              }}>90%</span>
              <div style={{ fontSize: 18, opacity: 0.5, marginTop: 4 }}>
                recusaram o dinheiro
              </div>
            </div>
          )}

          {/* Desligada label */}
          {showDesligada && (
            <div style={{
              marginTop: 12, fontSize: 16, fontWeight: 700, letterSpacing: 3,
              color: "#FF6B6B", opacity: 0.6,
              animation: "fadeIn 0.4s ease both",
            }}>
              RECOMPENSA: DESLIGADA
            </div>
          )}
        </div>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 20: Música vertical chain — DISFARÇA → REPETE → APRENDEM
// 512.14 "disfarça", 513.72 "repetem", 515.76 "aprendem"
// ═══════════════════════════════════════════════════════════
export const Graph_MusicaVertical = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const showDisfarça = t >= 512.14;
  const showRepete = t >= 513.72;
  const showAprendem = t >= 515.76;

  const items = [
    { show: showDisfarça, text: "DISFARÇA O CONTEÚDO", color: C.teal, glowColor: "78,205,196" },
    { show: showRepete, text: "REPETE VÁRIAS VEZES", color: C.teal, glowColor: "78,205,196" },
    { show: showAprendem, text: "APRENDEM SEM PERCEBER", color: C.purple, glowColor: "167,139,250" },
  ];

  return (
    <GraphWrap>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: "85%", maxWidth: 480 }}>
        {/* Headphone + MÚSICA header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, animation: "fadeIn 0.5s ease both" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke={C.teal} strokeWidth="2" strokeLinecap="round" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" fill={C.teal} opacity="0.3" stroke={C.teal} strokeWidth="1.5" />
          </svg>
          <span style={{ fontSize: 20, fontWeight: 700, color: C.teal, letterSpacing: 3, textShadow: `0 0 15px rgba(78,205,196,0.3)` }}>MÚSICA</span>
        </div>

        {items.map((item, i) => (
          <React.Fragment key={i}>
            {/* Arrow */}
            {i > 0 && (
              <div style={{
                margin: "10px 0",
                opacity: item.show ? 0.5 : 0.05,
                transition: "opacity 0.4s ease",
              }}>
                <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
                  <path d="M10 0 L10 22 M3 17 L10 24 L17 17" stroke={`rgba(${item.glowColor},0.5)`}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            {/* Node */}
            <div style={{
              width: "100%",
              padding: "24px 32px",
              borderRadius: 18,
              background: item.show
                ? i === 2
                  ? `linear-gradient(135deg, rgba(${item.glowColor},0.12), rgba(78,205,196,0.04))`
                  : `rgba(${item.glowColor},0.06)`
                : "rgba(255,255,255,0.02)",
              border: `2px solid ${item.show
                ? `rgba(${item.glowColor},${i === 2 ? 0.3 : 0.15})`
                : "rgba(255,255,255,0.04)"}`,
              opacity: item.show ? 1 : 0.1,
              transform: item.show ? "scale(1) translateY(0)" : "scale(0.9) translateY(10px)",
              transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
              boxShadow: item.show
                ? `0 0 ${i === 2 ? 40 : 24}px rgba(${item.glowColor},${i === 2 ? 0.2 : 0.1})`
                : "none",
              textAlign: "center",
            }}>
              <span style={{
                fontSize: 28, fontWeight: 800, letterSpacing: 2,
                color: item.show ? item.color : "rgba(255,255,255,0.2)",
                textShadow: item.show ? `0 0 20px rgba(${item.glowColor},0.35)` : "none",
                transition: "color 0.4s ease, text-shadow 0.4s ease",
              }}>
                {item.text}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 21: Asilo — Memories fading vs Music persisting
// 562.26 "asilo" → 568.42 "cantando" → 570.56 "não lembrava"
// 578.28 "40 anos" → 581.56 "LATIM" → 594.36 "esqueciam filhos"
// ═══════════════════════════════════════════════════════════
export const Graph_AsiloMemoria = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  // Phases synced to speech
  const showCantando = t >= 568.42;    // "cantando sozinho"
  const showNaoLembrava = t >= 570.56; // "não lembrava nomes"
  const show40anos = t >= 578.28;      // "40 anos atrás"
  const showLatim = t >= 581.56;       // "LATIM" — the bomb
  const showPalavra = t >= 586.92;     // "palavra por palavra"
  const showEsqueciam = t >= 594.36;   // "esqueciam nome dos filhos"

  // Memories that fade
  const memories = [
    { text: "Nomes dos netos", fadeAt: showNaoLembrava },
    { text: "Onde estava", fadeAt: showNaoLembrava },
    { text: "Rostos familiares", fadeAt: show40anos },
    { text: "Conversas recentes", fadeAt: show40anos },
    { text: "Nome dos filhos", fadeAt: showEsqueciam },
  ];

  // Music line intensity
  const musicGlow = !showCantando ? 0.2
    : !show40anos ? 0.5
    : !showLatim ? 0.8
    : 1.0;

  return (
    <GraphWrap>
      <div style={{ display: "flex", gap: 40, width: "90%", maxWidth: 520, alignItems: "stretch" }}>

        {/* LEFT: Memories fading */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
          <div style={{
            fontSize: 14, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase",
            color: "rgba(255,107,107,0.4)", marginBottom: 8,
          }}>
            MEMÓRIA
          </div>
          {memories.map((m, i) => (
            <div key={i} style={{
              padding: "10px 16px", borderRadius: 10,
              background: m.fadeAt ? "rgba(255,107,107,0.04)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${m.fadeAt ? "rgba(255,107,107,0.1)" : "rgba(255,255,255,0.06)"}`,
              transition: "all 0.8s ease",
              position: "relative",
              overflow: "hidden",
            }}>
              <span style={{
                fontSize: 16, fontWeight: 500,
                color: m.fadeAt ? "rgba(255,107,107,0.25)" : "rgba(255,255,255,0.5)",
                transition: "color 0.8s ease",
                textDecoration: m.fadeAt ? "line-through" : "none",
              }}>
                {m.text}
              </span>
              {/* Strikethrough line */}
              {m.fadeAt && (
                <div style={{
                  position: "absolute", left: 0, top: "50%", width: "100%", height: 1,
                  background: "rgba(255,107,107,0.3)",
                  animation: "fillBar 0.6s ease both",
                }} />
              )}
            </div>
          ))}
        </div>

        {/* CENTER: Divider line */}
        <div style={{
          width: 2, borderRadius: 1,
          background: `linear-gradient(180deg, rgba(255,107,107,0.15), rgba(78,205,196,${musicGlow * 0.4}))`,
          transition: "background 0.8s ease",
        }} />

        {/* RIGHT: Music persisting */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div style={{
            fontSize: 14, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase",
            color: `rgba(78,205,196,${0.3 + musicGlow * 0.4})`,
            transition: "color 0.5s ease",
            marginBottom: 8,
          }}>
            MÚSICA
          </div>

          {/* Music waveform — always alive */}
          <div style={{ display: "flex", alignItems: "center", gap: 2, height: 50 }}>
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} style={{
                width: 4, borderRadius: 2,
                background: musicGlow >= 0.8
                  ? `linear-gradient(0deg, ${C.teal}, ${C.purple})`
                  : C.teal,
                height: (8 + Math.sin(i * 0.7) * 20 + 10) * musicGlow,
                opacity: 0.3 + musicGlow * 0.5,
                animation: showCantando ? `float ${0.8 + i * 0.08}s ease infinite alternate` : "none",
                animationDelay: `${i * 0.05}s`,
                transition: "height 0.8s ease, opacity 0.5s ease",
              }} />
            ))}
          </div>

          {/* 40 ANOS */}
          {show40anos && (
            <div style={{
              fontSize: 48, fontWeight: 900, lineHeight: 1,
              color: C.teal,
              textShadow: `0 0 30px rgba(78,205,196,0.5)`,
              animation: "countUp 0.5s cubic-bezier(.16,1,.3,1) both",
            }}>
              40 ANOS
            </div>
          )}

          {/* LATIM — the bomb */}
          {showLatim && (
            <div style={{
              animation: "countUp 0.4s cubic-bezier(.16,1,.3,1) both",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: showPalavra ? 56 : 44, fontWeight: 900,
                background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(78,205,196,0.5)) drop-shadow(0 0 60px rgba(167,139,250,0.3))",
                transition: "font-size 0.5s ease",
              }}>
                LATIM
              </div>
              <div style={{
                fontSize: 13, opacity: 0.3, marginTop: 6,
              }}>
                Uma lingua que nunca estudou
              </div>
            </div>
          )}

          {/* "Palavra por palavra" */}
          {showPalavra && (
            <div style={{
              fontSize: 16, fontWeight: 600, color: C.teal, opacity: 0.6,
              animation: "fadeIn 0.4s ease both",
              letterSpacing: 2,
            }}>
              PALAVRA POR PALAVRA
            </div>
          )}

          {/* Bottom: "esqueciam filhos / cantavam adolescência" */}
          {showEsqueciam && (
            <div style={{
              marginTop: 8, textAlign: "center",
              animation: "fadeUp 0.5s ease both",
              padding: "12px 20px", borderRadius: 12,
              background: "linear-gradient(135deg, rgba(78,205,196,0.08), rgba(167,139,250,0.04))",
              border: "1px solid rgba(78,205,196,0.15)",
            }}>
              <div style={{ fontSize: 14, color: C.red, opacity: 0.5 }}>
                Esqueciam o nome dos filhos
              </div>
              <div style={{ fontSize: 14, color: C.teal, fontWeight: 700, marginTop: 4 }}>
                Cantavam musicas da adolescencia
              </div>
            </div>
          )}
        </div>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 22: Entra fácil → Grava forte → Dura mais (vertical)
// 635.36 "entra fácil", 636.32 "grava forte", 637.28 "mais tempo"
// ═══════════════════════════════════════════════════════════
export const Graph_EntraGravaFica = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const showEntra = t >= 635.36;
  const showGrava = t >= 636.32;
  const showDura = t >= 637.28;

  const items = [
    { show: showEntra, text: "ENTRA MAIS FÁCIL", color: C.teal, glowColor: "78,205,196" },
    { show: showGrava, text: "GRAVA MAIS FORTE", color: C.teal, glowColor: "78,205,196" },
    { show: showDura, text: "DURA MAIS TEMPO", color: C.purple, glowColor: "167,139,250" },
  ];

  return (
    <GraphWrap title="O QUE ENTRA COM MÚSICA">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: "85%", maxWidth: 480 }}>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div style={{
                margin: "10px 0",
                opacity: item.show ? 0.5 : 0.05,
                transition: "opacity 0.4s ease",
              }}>
                <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
                  <path d="M10 0 L10 22 M3 17 L10 24 L17 17" stroke={`rgba(${item.glowColor},0.5)`}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            <div style={{
              width: "100%",
              padding: "24px 32px",
              borderRadius: 18,
              background: item.show
                ? i === 2
                  ? `linear-gradient(135deg, rgba(${item.glowColor},0.12), rgba(78,205,196,0.04))`
                  : `rgba(${item.glowColor},0.06)`
                : "rgba(255,255,255,0.02)",
              border: `2px solid ${item.show
                ? `rgba(${item.glowColor},${i === 2 ? 0.3 : 0.15})`
                : "rgba(255,255,255,0.04)"}`,
              opacity: item.show ? 1 : 0.1,
              transform: item.show ? "scale(1) translateY(0)" : "scale(0.9) translateY(10px)",
              transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
              boxShadow: item.show
                ? `0 0 ${i === 2 ? 40 : 24}px rgba(${item.glowColor},${i === 2 ? 0.2 : 0.1})`
                : "none",
              textAlign: "center",
            }}>
              <span style={{
                fontSize: 28, fontWeight: 800, letterSpacing: 2,
                color: item.show ? item.color : "rgba(255,255,255,0.2)",
                textShadow: item.show ? `0 0 20px rgba(${item.glowColor},0.35)` : "none",
                transition: "color 0.4s ease, text-shadow 0.4s ease",
              }}>
                {item.text}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 23: Paul Nation — card + 500 palavras donut
// 746.20 "Paul", 750.44 "500", 752.58 "90%"
// ═══════════════════════════════════════════════════════════
export const Graph_PaulNation500 = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const showPaul = t >= 746.20;
  const show500 = t >= 750.44;
  const show90 = t >= 752.58;

  // Donut chart
  const size = 180;
  const stroke = 20;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;

  // Progress: donut fills from 500→90%
  const donutProgress = !show500 ? 0 : !show90 ? 0.3 : Math.min(1, (t - 752.58) / 1.5);
  const targetOffset = circ * (1 - 0.9 * donutProgress);

  return (
    <GraphWrap>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "90%", maxWidth: 480 }}>

        {/* Paul Nation card */}
        <div style={{
          display: "flex", alignItems: "center", gap: 20,
          padding: "16px 24px", borderRadius: 16,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(78,205,196,0.1)",
          opacity: showPaul ? 1 : 0.1,
          transform: showPaul ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.5s ease",
          marginBottom: 24,
        }}>
          <Img src={staticFile("photos/paulnation.jpg")} style={{
            width: 64, height: 64, borderRadius: "50%", objectFit: "cover",
            border: `2px solid rgba(78,205,196,0.3)`,
          }} />
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.white, opacity: 0.8 }}>Paul Nation</div>
            <div style={{ fontSize: 14, opacity: 0.3 }}>Linguista — Victoria University</div>
          </div>
        </div>

        {/* Donut + 500 */}
        <div style={{
          position: "relative", width: size, height: size,
          opacity: show500 ? 1 : 0,
          transform: show500 ? "scale(1)" : "scale(0.7)",
          transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(.16,1,.3,1)",
        }}>
          <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke="rgba(255,255,255,0.04)" strokeWidth={stroke} />
            {show90 && (
              <circle cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke="url(#donutGrad2)" strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={targetOffset}
                style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1)" }}
              />
            )}
            <defs>
              <linearGradient id="donutGrad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={C.teal} />
                <stop offset="100%" stopColor={C.purple} />
              </linearGradient>
            </defs>
          </svg>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              fontSize: 44, fontWeight: 900, color: C.teal,
              textShadow: `0 0 20px rgba(78,205,196,0.4)`,
            }}>
              {show90 ? "90%" : "500"}
            </div>
            <div style={{ fontSize: 13, opacity: 0.4 }}>
              {show90 ? "das conversas" : "palavras"}
            </div>
          </div>
        </div>

        {/* Bottom label */}
        <div style={{
          marginTop: 20, textAlign: "center",
          opacity: show90 ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          <span style={{
            fontSize: 18, fontWeight: 600,
            background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>500 palavras</span>
          <span style={{ fontSize: 16, opacity: 0.4 }}> cobrem 90% do dia a dia</span>
        </div>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 24: OUVIR 50X → CENA REAL → OUVIDO RECONHECE (vertical)
// 818.46 "50 vezes", 819.66 "cena real", 821.62 "reconhecer"
// ═══════════════════════════════════════════════════════════
export const Graph_Ouvir50Reconhece = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const show50 = t >= 818.46;
  const showCena = t >= 819.66;
  const showReconhece = t >= 821.62;

  // 50x bar fills from 816.06 to 818.46 (~2.4s)
  const barProgress = t < 816.06 ? 0 : Math.min(1, (t - 816.06) / 2.4);

  const items = [
    {
      show: show50,
      title: "OUVIR 50×",
      color: C.teal,
      glowColor: "78,205,196",
      hasBar: true,
    },
    {
      show: showCena,
      title: "CENA REAL TOCA",
      color: C.teal,
      glowColor: "78,205,196",
      hasBar: false,
    },
    {
      show: showReconhece,
      title: "OUVIDO RECONHECE",
      color: C.purple,
      glowColor: "167,139,250",
      hasBar: false,
    },
  ];

  return (
    <GraphWrap>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: "85%", maxWidth: 480 }}>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div style={{
                margin: "10px 0",
                opacity: item.show ? 0.5 : 0.05,
                transition: "opacity 0.4s ease",
              }}>
                <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
                  <path d="M10 0 L10 22 M3 17 L10 24 L17 17" stroke={`rgba(${item.glowColor},0.5)`}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            <div style={{
              width: "100%",
              padding: "20px 32px",
              borderRadius: 18,
              background: item.show
                ? i === 2
                  ? `linear-gradient(135deg, rgba(${item.glowColor},0.12), rgba(78,205,196,0.04))`
                  : `rgba(${item.glowColor},0.06)`
                : "rgba(255,255,255,0.02)",
              border: `2px solid ${item.show
                ? `rgba(${item.glowColor},${i === 2 ? 0.3 : 0.15})`
                : "rgba(255,255,255,0.04)"}`,
              opacity: item.show ? 1 : (i === 0 && barProgress > 0) ? 0.6 : 0.1,
              transform: item.show ? "scale(1) translateY(0)" : "scale(0.9) translateY(10px)",
              transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
              boxShadow: item.show
                ? `0 0 ${i === 2 ? 40 : 24}px rgba(${item.glowColor},${i === 2 ? 0.2 : 0.1})`
                : "none",
              textAlign: "center",
            }}>
              <span style={{
                fontSize: 28, fontWeight: 800, letterSpacing: 2,
                color: item.show ? item.color : "rgba(255,255,255,0.2)",
                textShadow: item.show ? `0 0 20px rgba(${item.glowColor},0.35)` : "none",
                transition: "color 0.4s ease, text-shadow 0.4s ease",
              }}>
                {item.title}
              </span>
              {/* Progress bar for 50x */}
              {item.hasBar && (
                <div style={{
                  width: "100%", height: 6, borderRadius: 3,
                  background: "rgba(255,255,255,0.06)",
                  marginTop: 12, overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%", borderRadius: 3,
                    background: show50
                      ? `linear-gradient(90deg, ${C.teal}, ${C.purple})`
                      : C.teal,
                    width: `${barProgress * 100}%`,
                    boxShadow: `0 0 8px rgba(78,205,196,0.3)`,
                    transition: show50 ? "background 0.3s ease" : undefined,
                  }} />
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 25: 3 Camadas — fluency tank filling in 3 phases
// 960.94 "primeira: base", 965.36 "segunda: correção", 976.94 "terceira: fluência"
// ═══════════════════════════════════════════════════════════
export const Graph_3CamadasTanque = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const showBase = t >= 960.94;
  const showCorrecao = t >= 965.36;
  const showFluencia = t >= 976.94;

  // Tank fill: 0→33% (base), 33→66% (correção), 66→100% (fluência)
  const baseDur = 3.0;
  const corDur = 3.0;
  const fluDur = 4.0;

  let fillPct = 0;
  if (showFluencia) {
    const p = Math.min(1, (t - 976.94) / fluDur);
    fillPct = 66 + p * 34;
  } else if (showCorrecao) {
    const p = Math.min(1, (t - 965.36) / corDur);
    fillPct = 33 + p * 33;
  } else if (showBase) {
    const p = Math.min(1, (t - 960.94) / baseDur);
    fillPct = p * 33;
  }

  const tankH = 280;
  const tankW = 120;
  const fillH = (fillPct / 100) * tankH;
  const isFull = fillPct >= 99;

  // Fill color transitions
  const fillColor = fillPct > 66
    ? `linear-gradient(0deg, ${C.teal}, ${C.purple})`
    : fillPct > 33
      ? `linear-gradient(0deg, ${C.teal}, rgba(78,205,196,0.7))`
      : C.teal;

  const phases = [
    { label: "1. BASE", sub: "O ingles que se repete", show: showBase, y: 85 },
    { label: "2. CORRECAO", sub: "Pronuncia, expressoes, emendado", show: showCorrecao, y: 50 },
    { label: "3. FLUENCIA REAL", sub: "Series cantadas + discursos", show: showFluencia, y: 15 },
  ];

  return (
    <GraphWrap title="3 CAMADAS DA FLUÊNCIA">
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>

        {/* Tank */}
        <div style={{
          width: tankW, height: tankH,
          borderRadius: 20,
          border: `2px solid rgba(78,205,196,0.15)`,
          background: "rgba(255,255,255,0.02)",
          position: "relative",
          overflow: "hidden",
          boxShadow: isFull
            ? `0 0 40px rgba(78,205,196,0.2), 0 0 80px rgba(167,139,250,0.1)`
            : "none",
          transition: "box-shadow 0.5s ease",
        }}>
          {/* Fill liquid */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: fillH,
            background: fillColor,
            borderRadius: "0 0 18px 18px",
            transition: "background 0.5s ease",
            boxShadow: `0 -4px 20px rgba(78,205,196,0.2)`,
          }} />

          {/* Phase lines at 33% and 66% */}
          <div style={{
            position: "absolute", bottom: `${33}%`, left: 0, right: 0,
            height: 1, background: "rgba(255,255,255,0.08)",
          }} />
          <div style={{
            position: "absolute", bottom: `${66}%`, left: 0, right: 0,
            height: 1, background: "rgba(255,255,255,0.08)",
          }} />

          {/* FLUENTE label at top */}
          {isFull && (
            <div style={{
              position: "absolute", top: 8, left: 0, right: 0,
              textAlign: "center",
              fontSize: 14, fontWeight: 800, letterSpacing: 3,
              background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 8px rgba(78,205,196,0.5))",
              animation: "countUp 0.4s cubic-bezier(.16,1,.3,1) both",
            }}>
              FLUENTE
            </div>
          )}
        </div>

        {/* Labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {phases.map((p, i) => (
            <div key={i} style={{
              opacity: p.show ? 1 : 0.1,
              transform: p.show ? "translateX(0)" : "translateX(15px)",
              transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
            }}>
              <div style={{
                fontSize: 18, fontWeight: 800, letterSpacing: 2,
                color: p.show
                  ? i === 2 ? C.purple : C.teal
                  : "rgba(255,255,255,0.2)",
                textShadow: p.show ? `0 0 15px rgba(${i === 2 ? "167,139,250" : "78,205,196"},0.3)` : "none",
                transition: "color 0.4s ease",
              }}>
                {p.label}
              </div>
              <div style={{
                fontSize: 14, opacity: p.show ? 0.4 : 0.1,
                marginTop: 4, transition: "opacity 0.4s ease",
              }}>
                {p.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 26: Compreensão por episódio v2 (EMOCIONAL callback)
// 1126.78 "mais fácil", 1127.58 "terceiro", 1133.88 "quinto diferente"
// ═══════════════════════════════════════════════════════════
export const Graph_CompreensaoEp2 = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const episodes = [
    { ep: "2°", label: "Mais fácil", y: 0.30, time: 1126.78 },
    { ep: "3°", label: "Antecipa falas", y: 0.55, time: 1127.58 },
    { ep: "4°", label: "", y: 0.72, time: 1131.00 },
    { ep: "5°", label: "Estágio diferente", y: 1.0, time: 1133.88 },
  ];

  const W = 320;
  const H = 160;
  const CURVE_POINTS = 40;
  const allPts: Array<{x: number; y: number}> = [];
  for (let i = 0; i <= CURVE_POINTS; i++) {
    const pct = i / CURVE_POINTS;
    const epIdx = pct * (episodes.length - 1);
    const lo = Math.floor(epIdx);
    const hi = Math.min(lo + 1, episodes.length - 1);
    const frac = epIdx - lo;
    const yVal = episodes[lo].y + (episodes[hi].y - episodes[lo].y) * frac;
    allPts.push({ x: pct * W, y: H - yVal * H });
  }

  const rawProgress = t < 1124.50 ? 0 : Math.min(1, (t - 1124.50) / 10);
  const visibleCount = Math.round(rawProgress * CURVE_POINTS) + 1;
  const visiblePts = allPts.slice(0, Math.min(visibleCount, allPts.length));
  const linePath = visiblePts.length > 1
    ? visiblePts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
    : "";
  const lastPt = visiblePts[visiblePts.length - 1];
  const areaPath = visiblePts.length > 1
    ? `${linePath} L${lastPt.x.toFixed(1)},${H} L0,${H} Z`
    : "";

  const pts = episodes.map((ep, i) => ({
    x: (i / (episodes.length - 1)) * W,
    y: H - ep.y * H,
  }));

  return (
    <GraphWrap title="COMPREENSÃO POR EPISÓDIO">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "85%", maxWidth: 480 }}>
        <div style={{ width: W, position: "relative" }}>
          <div style={{
            position: "absolute", top: -6, right: 0,
            fontSize: 12, fontWeight: 800, letterSpacing: 2,
            background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            opacity: rawProgress >= 0.95 ? 1 : 0.15,
            filter: rawProgress >= 0.95 ? `drop-shadow(0 0 8px rgba(78,205,196,0.5))` : "none",
            transition: "opacity 0.5s ease",
          }}>FLUENTE</div>

          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="af3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.teal} stopOpacity="0.35" />
                <stop offset="100%" stopColor={C.teal} stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="lg3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={C.teal} />
                <stop offset="100%" stopColor={C.purple} />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map(p => (
              <line key={p} x1={0} y1={H * (1 - p)} x2={W} y2={H * (1 - p)}
                stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
            ))}
            {areaPath && <path d={areaPath} fill="url(#af3)" />}
            {linePath && <path d={linePath} fill="none" stroke="url(#lg3)" strokeWidth={2.5}
              strokeLinecap="round" strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(78,205,196,0.4))" }} />}
            {lastPt && rawProgress > 0 && (
              <circle cx={lastPt.x} cy={lastPt.y} r={5} fill={C.teal}
                style={{ filter: `drop-shadow(0 0 8px ${C.teal})` }} />
            )}
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 5 : 3}
                fill={i === pts.length - 1 ? C.purple : C.teal}
                style={{
                  opacity: t >= episodes[i].time ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  filter: i === pts.length - 1 ? `drop-shadow(0 0 8px ${C.purple})` : "none",
                }} />
            ))}
            <text x={pts[pts.length - 1].x + 8} y={pts[pts.length - 1].y + 4}
              fill={rawProgress >= 0.95 ? C.teal : "rgba(255,255,255,0.15)"}
              fontSize={12} fontWeight={800} letterSpacing={2}
              style={{ transition: "fill 0.4s ease", filter: rawProgress >= 0.95 ? `drop-shadow(0 0 8px rgba(78,205,196,0.5))` : "none" }}>
              FLUENTE
            </text>
          </svg>

          <div style={{ position: "relative", width: W, height: 20, marginTop: 6 }}>
            {episodes.map((ep, i) => (
              <div key={i} style={{
                position: "absolute",
                left: (i / (episodes.length - 1)) * W,
                transform: "translateX(-50%)",
                fontSize: 11, fontWeight: 600,
                color: t >= ep.time ? C.teal : "rgba(255,255,255,0.3)",
                transition: "color 0.3s ease",
              }}>{ep.ep}</div>
            ))}
          </div>
        </div>

        {/* Labels appearing with speech */}
        <div style={{ marginTop: 16, textAlign: "center" }}>
          {episodes.filter(e => e.label).map((ep, i) => (
            <div key={i} style={{
              fontSize: 16, fontWeight: 600, marginTop: 4,
              opacity: t >= ep.time ? 1 : 0,
              transition: "opacity 0.4s ease",
              color: i === episodes.filter(e => e.label).length - 1 ? C.purple : "rgba(255,255,255,0.5)",
            }}>
              {ep.ep}: <span style={{ fontWeight: 700 }}>{ep.label}</span>
            </div>
          ))}
        </div>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 27: EMBOLADO → TEM FORMA → PRAZER (vertical compound)
// 1138.10 "embolado", 1139.16 "forma", 1145.46 "prazer"
// ═══════════════════════════════════════════════════════════
export const Graph_EmboladoFormaPrazer = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const showEmbolado = t >= 1138.10;
  const showForma = t >= 1139.16;
  const showPrazer = t >= 1145.26;

  const items = [
    { show: showEmbolado, text: "SOM EMBOLADO", color: C.red, glowColor: "255,107,107" },
    { show: showForma, text: "COMEÇA A TER FORMA", color: C.white, glowColor: "255,255,255" },
    { show: showPrazer, text: "PRAZER", color: C.teal, glowColor: "78,205,196", isFinal: true },
  ];

  return (
    <GraphWrap>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: "85%", maxWidth: 480 }}>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div style={{
                margin: "10px 0",
                opacity: item.show ? 0.5 : 0.05,
                transition: "opacity 0.4s ease",
              }}>
                <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
                  <path d="M10 0 L10 22 M3 17 L10 24 L17 17"
                    stroke={i === 1 ? "rgba(255,255,255,0.3)" : `rgba(${item.glowColor},0.5)`}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            <div style={{
              width: "100%",
              padding: "24px 32px",
              borderRadius: 18,
              background: item.show
                ? (item as any).isFinal
                  ? `linear-gradient(135deg, rgba(78,205,196,0.12), rgba(167,139,250,0.06))`
                  : i === 0
                    ? "rgba(255,107,107,0.06)"
                    : "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.02)",
              border: `2px solid ${item.show
                ? (item as any).isFinal ? "rgba(78,205,196,0.3)" : i === 0 ? "rgba(255,107,107,0.15)" : "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.04)"}`,
              opacity: item.show ? 1 : 0.1,
              transform: item.show ? "scale(1) translateY(0)" : "scale(0.9) translateY(10px)",
              transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
              boxShadow: item.show && (item as any).isFinal
                ? `0 0 40px rgba(78,205,196,0.2), 0 0 80px rgba(167,139,250,0.1)`
                : item.show && i === 0
                  ? "0 0 20px rgba(255,107,107,0.1)"
                  : "none",
              textAlign: "center",
            }}>
              <span style={{
                fontSize: (item as any).isFinal ? 36 : 28, fontWeight: 800, letterSpacing: 2,
                color: item.show ? item.color : "rgba(255,255,255,0.2)",
                textShadow: item.show ? `0 0 20px rgba(${item.glowColor},0.35)` : "none",
                transition: "color 0.4s ease, text-shadow 0.4s ease",
              }}>
                {item.text}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 28: Olha o que está dentro — fullscreen mega stack
// All deliverables synced word-level
// ═══════════════════════════════════════════════════════════
export const Graph_OQueEstaDentro = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const items = [
    { text: "Composicao profissional", time: 1222.52, color: "rgba(255,255,255,0.5)" },
    { text: "Engenharia de audio", time: 1224.12, color: "rgba(255,255,255,0.5)" },
    { text: "Masterizacao e edicao", time: 1226.16, color: "rgba(255,255,255,0.5)" },
    { text: "Blocos essenciais — base do zero", time: 1229.12, color: C.teal },
    { text: "5 trilhas que corrigem cada furo", time: 1231.20, color: C.teal },
    { text: "Discursos historicos em musica", time: 1234.64, color: C.purple },
    { text: "Series completas, cena por cena", time: 1236.82, color: C.purple },
    { text: "Producao profissional", time: 1239.14, color: C.white },
  ];

  const showRepeticao = t >= 1240.48;

  return (
    <GraphWrap title="O QUE ESTÁ DENTRO">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "85%", maxWidth: 500 }}>
        {items.map((item, i) => {
          const show = t >= item.time;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, marginTop: i === 0 ? 0 : 10,
              opacity: show ? 1 : 0,
              transform: show ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                background: item.color,
                boxShadow: `0 0 8px ${item.color}60`,
              }} />
              <span style={{ fontSize: 20, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>
                {item.text}
              </span>
            </div>
          );
        })}

        {/* Repetição musical — punch final */}
        <div style={{
          marginTop: 20, width: "100%", textAlign: "center",
          opacity: showRepeticao ? 1 : 0,
          transform: showRepeticao ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}>
          <div style={{
            padding: "14px 24px", borderRadius: 14,
            background: "linear-gradient(135deg, rgba(78,205,196,0.1), rgba(167,139,250,0.05))",
            border: "1px solid rgba(78,205,196,0.2)",
            boxShadow: "0 0 24px rgba(78,205,196,0.1)",
          }}>
            <span style={{
              fontSize: 22, fontWeight: 800,
              background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Tudo em cima da repeticao musical.</span>
          </div>
        </div>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 29: CTA FINAL — fullscreen logo + arrow
// ═══════════════════════════════════════════════════════════
export const Graph_CTAFinal = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const localFrame = Math.max(0, frame - 1458.8 * FPS);
  const pulse = Math.sin(localFrame * 0.08) * 0.5 + 0.5;

  return (
    <GraphWrap>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Logo */}
        <Img src={staticFile("logo-ic.png")} style={{
          width: 100, height: 100,
          filter: `drop-shadow(0 0 ${20 + pulse * 20}px rgba(78,205,196,${0.3 + pulse * 0.2}))`,
          animation: "scaleIn 0.6s cubic-bezier(.16,1,.3,1) both",
        }} />

        {/* Branding */}
        <div style={{ marginTop: 20, animation: "scaleIn 0.6s cubic-bezier(.16,1,.3,1) 0.2s both" }}>
          <span style={{ fontSize: 64, fontWeight: 900, color: C.white }}>inglês</span>
          <span style={{
            fontSize: 64, fontWeight: 900, color: C.teal,
            textShadow: `0 0 ${20 + pulse * 15}px rgba(78,205,196,${0.3 + pulse * 0.15})`,
          }}>cantado</span>
        </div>

        {/* Subtitle */}
        <div style={{
          marginTop: 12, fontSize: 18, fontWeight: 500, opacity: 0.3,
          letterSpacing: 3, textTransform: "uppercase",
          animation: "fadeIn 0.5s ease 0.5s both",
        }}>
          Fluency Route
        </div>

        {/* Arrow pointing down — animated */}
        <div style={{ marginTop: 36, animation: "fadeIn 0.5s ease 0.8s both" }}>
          <svg width="48" height="60" viewBox="0 0 48 60" style={{
            animation: "float 1.2s ease infinite alternate",
            filter: `drop-shadow(0 0 12px rgba(78,205,196,0.4))`,
          }}>
            <defs>
              <linearGradient id="ctaFinalArrow" x1="24" y1="0" x2="24" y2="55">
                <stop offset="0%" stopColor={C.teal} />
                <stop offset="100%" stopColor={C.purple} />
              </linearGradient>
            </defs>
            <path d="M24 0 L24 44 M10 36 L24 50 L38 36" stroke="url(#ctaFinalArrow)"
              strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* CTA text */}
        <div style={{
          marginTop: 20,
          animation: "fadeUp 0.6s ease 1s both",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 22, fontWeight: 500, opacity: 0.4 }}>
            Clica no botao abaixo
          </div>
          <div style={{
            marginTop: 8, fontSize: 26, fontWeight: 700,
            background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Te vejo la dentro.
          </div>
        </div>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 30: Inglês real nas séries — Friends scene playing + stack
// ═══════════════════════════════════════════════════════════
export const Graph_InglesNasSeries = () => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const t = frame / FPS;

  const showConversa = t >= 797.74;
  const showDialogo = t >= 798.24;
  const showExpressao = t >= 799.12;
  const showGiria = t >= 799.86;
  const showEmenda = t >= 800.16;
  const showEstruturas = t >= 801.80;

  const items = [
    { show: showConversa, text: "Conversa" },
    { show: showDialogo, text: "Dialogo natural" },
    { show: showExpressao, text: "Expressao" },
    { show: showGiria, text: "Giria" },
    { show: showEmenda, text: "Emenda de palavra" },
  ];

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: C.bg, fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", overflow: "hidden",
    }}>
      {/* Video frame with gradient border */}
      <div style={{
        width: "96%", maxWidth: 680,
        borderRadius: 20, padding: 3,
        background: C.gradient,
        boxShadow: `0 0 40px rgba(78,205,196,0.12), 0 0 80px rgba(167,139,250,0.06)`,
        animation: "scaleIn 0.5s cubic-bezier(.16,1,.3,1) both",
      }}>
        <div style={{ borderRadius: 17, overflow: "hidden", position: "relative" }}>
          <OffthreadVideo
            src={staticFile("friends_cena.mp4")}
            volume={0}
            style={{
              width: "100%", height: "auto", display: "block",
              filter: "brightness(0.8)",
            }}
          />
          {/* Bottom gradient overlay for text readability */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "40%",
            background: "linear-gradient(transparent, rgba(10,10,10,0.9))",
          }} />
          {/* Title over video */}
          <div style={{
            position: "absolute", bottom: 16, left: 20, right: 20,
            fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.7)",
            animation: "fadeIn 0.5s ease 0.3s both",
          }}>
            O ingles real acontece nas <span style={{ color: C.teal, fontWeight: 800 }}>series</span>.
          </div>
        </div>
      </div>

      {/* Stack items below video */}
      <div style={{ marginTop: 20, width: "96%", maxWidth: 680 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10, marginTop: 8,
            opacity: item.show ? 1 : 0,
            transform: item.show ? "translateX(0)" : "translateX(-20px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: C.teal, boxShadow: `0 0 6px rgba(78,205,196,0.4)`, flexShrink: 0,
            }} />
            <span style={{ fontSize: 32, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>{item.text}</span>
          </div>
        ))}

        {/* Mesmas estruturas */}
        <div style={{
          marginTop: 14,
          opacity: showEstruturas ? 1 : 0,
          transform: showEstruturas ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}>
          <span style={{
            fontSize: 34, fontWeight: 800,
            background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Mesmas estruturas se repetindo.</span>
        </div>
      </div>
    </div>
  );
};

// ─── Export as Map (ID → component) ─────────────────────────
// Graph IDs and their approximate Whisper timestamps:
//   258: 15h vs 150h        → 3:39 (219.6s)  — PROBLEMA
//   259: 150 dots (Kris)    → 6:26 (386.3s)  — PROBLEMA
//   260: 90% abandono       → 4:20 (260.5s)  — PROBLEMA
//   261: Dopamina           → 10:29 (629.1s) — MECANISMO
//   262: 500 palavras       → 12:30 (750.4s) — SOLUÇÃO
//   263: Mercado vs IC      → 20:13 (1213.5s)— PREÇO
//   264: Preço âncora       → 19:47 (1186.9s)— PREÇO
//   265: 3 Camadas          → 15:57 (957.4s) — PRODUTO
//   266: Jornada episódio   → 16:37 (997s)   — PRODUTO
//   267: 95% resultado      → 7:04 (424s)    — PROBLEMA
//   268: Fadiga timeline    → 6:36 (395.6s)  — PROBLEMA
//   269: 200 letras ≠ 1     → 13:11 (790.9s) — SOLUÇÃO

export const GRAPH_SLIDES = new Map<number, () => React.JSX.Element>([
  [258, Graph_15vs150],
  [259, Graph_150Dots],
  [260, Graph_90Abandono],
  [261, Graph_Dopamina],
  [262, Graph_500Words],
  [263, Graph_MercadoVsIC],
  [264, Graph_PrecoAncora],
  [265, Graph_3Camadas],
  [266, Graph_JornadaEpisodio],
  [267, Graph_95Resultado],
  [268, Graph_FadigaTimeline],
  [269, Graph_200vs1],
  [10, Graph_SerieCantadaFull],
  [29, Graph_EmboladoSentido],
  [34, Graph_FluencyGlobo],
  [57, Graph_EnergyDrain],
  [60, Graph_JHBrain],
  [210, Graph_MusicaVertical],
  [229, Graph_EntraGravaFica],
  [67, Graph_PaulNation500],
  [75, Graph_Ouvir50Reconhece],
  [78, Graph_3CamadasTanque],
  [81, Graph_CompreensaoEp2],
  [82, Graph_EmboladoFormaPrazer],
  [68, Graph_InglesNasSeries],
  [86, Graph_OQueEstaDentro],
  [818, Graph_CTAFinal],
]);
