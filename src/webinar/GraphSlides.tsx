import React, { createContext, useContext } from "react";
import { useCurrentFrame } from "remotion";

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
      <div style={{ transform: `scale(${isV ? 1.15 : 1.45})`, transformOrigin: "center center", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
  const show150h = t >= 230.7;
  const show10x = t >= 235.5;

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
        {/* 150h bar — appears when "Enquanto os que deram certo" */}
        <div style={{ opacity: show150h ? 1 : 0, transition: "opacity 0.6s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 18, opacity: 0.5 }}>Quem deu certo</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: C.teal }}>150h</span>
          </div>
          <div style={{ width: "100%", height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)" }}>
            {show150h && <div style={{
              height: "100%", borderRadius: 8, background: `linear-gradient(90deg, ${C.teal}, ${C.purple})`,
              // @ts-ignore
              "--target-w": "100%", width: "var(--target-w)",
              animation: "fillBar 1.5s cubic-bezier(.16,1,.3,1) .3s both",
              boxShadow: `0 0 30px rgba(78,205,196,0.3)`,
            } as React.CSSProperties} />}
          </div>
          <div style={{ fontSize: 14, opacity: 0.25, marginTop: 6 }}>nos primeiros meses</div>
        </div>
        {/* 10x label — appears last */}
        <div style={{ textAlign: "center", marginTop: 40, opacity: show10x ? 1 : 0, transition: "opacity 0.5s ease" }}>
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
  const dots = Array.from({ length: 150 }, (_, i) => i);
  return (
    <GraphWrap title="KRIS NIELSON — 2014" subtitle="150 funcionários do governo americano">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, width: 310, justifyContent: "center" }}>
        {dots.map(i => (
          <div key={i} style={{
            width: 16, height: 16, borderRadius: "50%",
            background: i === 74 ? C.teal : "rgba(255,255,255,0.5)",
            animation: i === 74
              ? "pulseGlow 1.5s ease infinite 2s"
              : `dotFade .4s ease ${0.8 + i * 0.008}s both`,
            boxShadow: i === 74 ? `0 0 20px ${C.teal}` : "none",
          }} />
        ))}
      </div>
      <div style={{ marginTop: 32, textAlign: "center", animation: "countUp .6s ease 2.5s both" }}>
        <span style={{ fontSize: 72, fontWeight: 900, color: C.teal, textShadow: `0 0 40px rgba(78,205,196,0.5)` }}>1</span>
        <span style={{ fontSize: 24, opacity: 0.4, marginLeft: 8 }}>em 150</span>
      </div>
    </GraphWrap>
  );
};

// ═══════════════════════════════════════════════════════════
// GRAPH 3: 90% abandono — Fill bar
// ═══════════════════════════════════════════════════════════
export const Graph_90Abandono = () => (
  <GraphWrap title="TAXA DE ABANDONO">
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
  <GraphWrap title="CONCLUSÃO DE CURSO">
    <div style={{ display: "flex", gap: 60, alignItems: "flex-end" }}>
      {/* Mercado */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 14, opacity: 0.35, marginBottom: 12 }}>Média do mercado</div>
        <div style={{ width: 100, height: 200, borderRadius: 12, background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
          <div style={{
            width: "100%", borderRadius: "0 0 12px 12px",
            background: C.red,
            // @ts-ignore
            "--target-h": "5%", height: "var(--target-h)",
            animation: "fillBarH 1s ease .5s both",
            boxShadow: `0 0 20px rgba(255,107,107,0.3)`,
          } as React.CSSProperties} />
        </div>
        <div style={{ fontSize: 36, fontWeight: 900, color: C.red, marginTop: 12, animation: "countUp .5s ease 1.2s both" }}>&lt;5%</div>
        <div style={{ fontSize: 13, opacity: 0.3 }}>conclusão</div>
      </div>
      {/* IC */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 14, opacity: 0.35, marginBottom: 12 }}>Inglês Cantado</div>
        <div style={{ width: 100, height: 200, borderRadius: 12, background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
          <div style={{
            width: "100%", borderRadius: "0 0 12px 12px",
            background: `linear-gradient(0deg, ${C.teal}, ${C.purple})`,
            // @ts-ignore
            "--target-h": "85%", height: "var(--target-h)",
            animation: "fillBarH 1.5s cubic-bezier(.16,1,.3,1) .8s both",
            boxShadow: `0 0 30px rgba(78,205,196,0.3)`,
          } as React.CSSProperties} />
        </div>
        <div style={{ fontSize: 36, fontWeight: 900, color: C.teal, marginTop: 12, animation: "countUp .5s ease 1.8s both" }}>1-2h</div>
        <div style={{ fontSize: 13, opacity: 0.3 }}>por dia</div>
      </div>
    </div>
  </GraphWrap>
);

// ═══════════════════════════════════════════════════════════
// GRAPH 7: Preço âncora — Stack descending
// ═══════════════════════════════════════════════════════════
export const Graph_PrecoAncora = () => (
  <GraphWrap>
    <div style={{ width: "80%", maxWidth: 500, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* R$12.000 */}
      <div style={{ animation: "slideIn .5s ease .3s both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 28, borderRadius: 6, background: "rgba(255,107,107,0.15)" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 6, background: `linear-gradient(90deg, rgba(255,107,107,0.3), rgba(255,107,107,0.1))` }} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.red, position: "relative", minWidth: 120 }}>
            R$12.000
            <div style={{ position: "absolute", left: "-4%", top: "50%", width: "108%", height: 2, background: C.red, transform: "rotate(-4deg)" }} />
          </div>
        </div>
        <div style={{ fontSize: 13, opacity: 0.25, marginTop: 4, marginLeft: 4 }}>Escola presencial (2 anos)</div>
      </div>
      {/* R$3.000 */}
      <div style={{ animation: "slideIn .5s ease .6s both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 28, borderRadius: 6, background: "rgba(255,107,107,0.1)" }}>
            <div style={{ width: "25%", height: "100%", borderRadius: 6, background: "rgba(255,107,107,0.2)" }} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.red, position: "relative", minWidth: 120, opacity: 0.7 }}>
            R$3.000
            <div style={{ position: "absolute", left: "-4%", top: "50%", width: "108%", height: 2, background: C.red, transform: "rotate(-4deg)" }} />
          </div>
        </div>
        <div style={{ fontSize: 13, opacity: 0.25, marginTop: 4, marginLeft: 4 }}>Cursos online famosos</div>
      </div>
      {/* R$199 */}
      <div style={{ animation: "slideIn .5s ease .9s both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.04)" }}>
            <div style={{ width: "8%", height: "100%", borderRadius: 6, background: "rgba(255,255,255,0.08)" }} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, opacity: 0.4, position: "relative", minWidth: 120 }}>
            R$199
            <div style={{ position: "absolute", left: "-4%", top: "50%", width: "108%", height: 2, background: "rgba(255,255,255,0.3)", transform: "rotate(-4deg)" }} />
          </div>
        </div>
      </div>
      {/* R$99 — THE ONE */}
      <div style={{ animation: "slideIn .5s ease 1.4s both", marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 36, borderRadius: 8, background: "rgba(78,205,196,0.08)" }}>
            <div style={{ width: "4%", height: "100%", borderRadius: 8, background: C.gradient, boxShadow: `0 0 20px rgba(78,205,196,0.3)` }} />
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", minWidth: 120, filter: "drop-shadow(0 0 20px rgba(78,205,196,0.3))" }}>
            R$99
          </div>
        </div>
        <div style={{ fontSize: 14, opacity: 0.4, marginTop: 4, marginLeft: 4 }}>por mês — Inglês Cantado</div>
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
]);
