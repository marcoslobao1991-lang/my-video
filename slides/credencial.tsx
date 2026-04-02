// ─── CREDENCIAL (1:24 → 2:45) ────────────────────────────────
// Audio: Marcos Lobão → nunca fiz intercâmbio → vendedor → Fluency Route → viralizou → música × inglês → confessar
// 20 slides | 0 stacks

import React from "react";
import { useCurrentFrame } from "remotion";
import { T, Spacer, AccentLine } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerCredencial(
  R: Map<number, () => React.JSX.Element>,
  _useStackVisible: UseStackVisible,
) {

// 1:24.84 — "Marcos Lobão"
R.set(30, () => (
  <div className="slide left">
    <AccentLine />
    <T size={68} weight={700} opacity={0.9} anim="anim-slideLeft">
      Marcos Lobao.
    </T>
    <Spacer h={12} />
    <T size={30} weight={400} opacity={0.3} anim="anim-fadeIn" delay="d3">
      Fundador — Fluency Route & Ingles Cantado
    </T>
  </div>
));

// 1:29.56 — "nunca fiz intercâmbio"
R.set(31, () => (
  <div className="slide right">
    <T size={46} weight={500} opacity={0.5} anim="anim-slideRight">
      <span className="bold">Nunca</span> fiz intercambio.
    </T>
    <Spacer h={10} />
    <T size={46} weight={500} opacity={0.5} anim="anim-slideRight" delay="d2">
      <span className="bold">Nunca</span> morei fora.
    </T>
  </div>
));

// 1:33.06 — "sem nada do que dizem ser obrigatório"
R.set(32, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Sem nada do que dizem ser <span className="red" style={{ fontWeight: 700 }}>obrigatorio</span>.
    </T>
  </div>
));

// 1:36.52 — "empresa americana"
R.set(33, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.6} anim="anim-fadeUp">
      <span className="teal" style={{ fontWeight: 700 }}>Empresa americana</span>.
    </T>
  </div>
));

// 1:39.20 — "vendedor — convencer americano"
R.set(50, () => (
  <div className="slide right">
    <T size={50} weight={600} opacity={0.65} anim="anim-slideRight">
      <span className="bold">Vendedor</span>.
    </T>
    <Spacer h={10} />
    <T size={38} weight={400} opacity={0.35} anim="anim-slideRight" delay="d2">
      Convencendo americano a comprar.
    </T>
  </div>
));

// 1:43.58 — "FLUENCY ROUTE" → fullscreen graph in GraphSlides (ID 34)

// 1:46.80 — absorbed into graph 34

// 1:49.74 — "30 países / 1M horas" → fullscreen graph in GraphSlides (ID 36)

// 1:53.88 — "milhões de visualizações"
R.set(37, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.7} anim="anim-blurIn">
      <span className="gradient-text">Milhoes</span> de visualizacoes.
    </T>
  </div>
));

// 1:56.88 — "viralizou — ideia simples"
R.set(38, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      A gente <span className="bold">viralizou</span> com uma ideia simples.
    </T>
  </div>
));

// 1:59.76 — "fluência → habilidade → repetição" chain
R.set(39, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  // 119.76 "fluência", 120.50 "habilidade", 124.10 "repetição"
  const showFluencia = time >= 119.76;
  const showHabilidade = time >= 120.50;
  const showRepeticao = time >= 124.10;

  const nodeStyle = (show: boolean, color: string, glow: string): React.CSSProperties => ({
    padding: "14px 28px",
    borderRadius: 14,
    background: show ? `rgba(${glow},0.08)` : "rgba(255,255,255,0.02)",
    border: `1.5px solid ${show ? color : "rgba(255,255,255,0.04)"}`,
    opacity: show ? 1 : 0.15,
    transform: show ? "scale(1)" : "scale(0.85)",
    transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
    boxShadow: show ? `0 0 24px rgba(${glow},0.15)` : "none",
  });

  const arrowStyle = (show: boolean): React.CSSProperties => ({
    fontSize: 28,
    opacity: show ? 0.6 : 0.1,
    transition: "opacity 0.4s ease",
    background: "linear-gradient(135deg, #4ECDC4, #A78BFA)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  });

  return (
    <div className="slide center">
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* FLUÊNCIA */}
        <div style={nodeStyle(showFluencia, "#4ECDC4", "78,205,196")}>
          <div style={{
            fontSize: 28, fontWeight: 800,
            color: showFluencia ? "#4ECDC4" : "rgba(255,255,255,0.3)",
            transition: "color 0.4s ease",
            textShadow: showFluencia ? "0 0 20px rgba(78,205,196,0.3)" : "none",
          }}>FLUÊNCIA</div>
        </div>

        <div style={arrowStyle(showHabilidade)}>→</div>

        {/* HABILIDADE */}
        <div style={nodeStyle(showHabilidade, "#A78BFA", "167,139,250")}>
          <div style={{
            fontSize: 28, fontWeight: 800,
            color: showHabilidade ? "#A78BFA" : "rgba(255,255,255,0.3)",
            transition: "color 0.4s ease",
            textShadow: showHabilidade ? "0 0 20px rgba(167,139,250,0.3)" : "none",
          }}>HABILIDADE</div>
        </div>

        <div style={arrowStyle(showRepeticao)}>→</div>

        {/* REPETIÇÃO */}
        <div style={{
          ...nodeStyle(showRepeticao, "#4ECDC4", "78,205,196"),
          ...(showRepeticao ? {
            background: "linear-gradient(135deg, rgba(78,205,196,0.12), rgba(167,139,250,0.06))",
            border: "1.5px solid rgba(78,205,196,0.25)",
            boxShadow: "0 0 30px rgba(78,205,196,0.2), 0 0 60px rgba(167,139,250,0.1)",
          } : {}),
        }}>
          <div style={{
            fontSize: 28, fontWeight: 900,
            background: showRepeticao ? "linear-gradient(135deg, #4ECDC4, #A78BFA)" : "none",
            WebkitBackgroundClip: showRepeticao ? "text" : "unset",
            WebkitTextFillColor: showRepeticao ? "transparent" : "rgba(255,255,255,0.3)",
            filter: showRepeticao ? "drop-shadow(0 0 16px rgba(78,205,196,0.4))" : "none",
            transition: "filter 0.4s ease",
          }}>REPETIÇÃO</div>
        </div>
      </div>
    </div>
  );
});

// 2:05.28 — "essa ideia mudou milhares"
R.set(40, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      Mudou <span className="gradient-text" style={{ fontWeight: 600 }}>milhares</span>.
    </T>
  </div>
));

// 2:10.32 — "aluno morava fora, largou tudo"
R.set(41, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showLargou = time >= 133.32;
  return (
    <div className="slide left">
      <T size={44} weight={400} opacity={0.5} anim="anim-slideLeft">
        Morava nos <span className="teal" style={{ fontWeight: 600 }}>EUA</span>. Fazia aula presencial.
      </T>
      <div style={{
        opacity: showLargou ? 1 : 0,
        transform: showLargou ? "translateX(0)" : "translateX(-30px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        marginTop: 10,
      }}>
        <T size={44} weight={600} opacity={0.7}>
          <span className="bold">Largou tudo</span> pra usar a nossa plataforma.
        </T>
      </div>
    </div>
  );
});

// 2:16.02 — "tentado de tudo, nada funcionou"
R.set(42, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Ja tinham tentado <span className="bold">tudo</span>.
    </T>
    <Spacer h={10} />
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp" delay="d2">
      E <span className="red">nada</span> tinha funcionado.
    </T>
  </div>
));

// 2:22.08 — "última parada"
R.set(51, () => (
  <div className="slide center">
    <T size={52} weight={500} opacity={0.55} anim="anim-blurIn">
      A <span className="bold">ultima parada</span>.
    </T>
  </div>
));

// 2:24.22 — "poucos sabem sobre mim"
R.set(43, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Uma coisa que <span className="bold">poucos sabem</span>.
    </T>
  </div>
));

// 2:27.20 — "cresci dentro da música" — with waveform
R.set(44, () => (
  <div className="slide left">
    <div className="glow-teal" style={{ top: "25%", left: "-5%" }} />
    <div className="waveform" style={{ marginBottom: 20, opacity: 0.6, animation: "fadeIn 0.5s ease both" }}>
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i} className="bar" style={{
          height: 8 + Math.sin(i * 0.8) * 20 + Math.random() * 10,
          animation: `float ${0.8 + i * 0.08}s ease infinite alternate`,
          animationDelay: `${i * 0.05}s`,
        }} />
      ))}
    </div>
    <T size={50} weight={600} opacity={0.75} anim="anim-slideLeft">
      Cresci dentro da <span className="teal" style={{ fontWeight: 700 }}>musica</span>.
    </T>
    <Spacer h={10} />
    <T size={36} weight={400} opacity={0.3} anim="anim-slideLeft" delay="d2">
      Antes de crescer dentro do ingles.
    </T>
  </div>
));

// 2:31.88 — "filho de músico, tio produtor"
R.set(45, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-slideLeft">
      Filho de <span className="bold">musico</span>. Tio <span className="bold">produtor</span>.
    </T>
  </div>
));

// 2:35.70 — "duas coisas sem conectar"
R.set(46, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Duas coisas sem <span className="red">conectar</span>.
    </T>
  </div>
));

// 2:38.18 — "até que esse dia chegou" — dramatic pivot
R.set(47, () => (
  <div className="slide center">
    <div className="double-glow" />
    <div className="double-glow" />
    <T size={60} weight={700} opacity={0.9} anim="anim-blurIn" className="gradient-animated glow-gradient-text">
      Ate que esse dia chegou.
    </T>
  </div>
));

// 2:40.92 — "preciso te confessar"
R.set(48, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.5} anim="anim-fadeUp">
      Preciso te <span className="bold">confessar</span> uma coisa.
    </T>
  </div>
));

// 2:42.58 — "nenhum dono de escola te falaria"
R.set(49, () => (
  <div className="slide left">
    <AccentLine />
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Que <span className="red" style={{ fontWeight: 600 }}>nenhum dono de escola</span> te falaria.
    </T>
  </div>
));

} // end registerCredencial
