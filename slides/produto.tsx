// ─── PRODUTO (15:57 → 17:50) ─────────────────────────────────
// Audio: 3 camadas → base → correção → séries cantadas → walkthrough → episódios novos
// ~20 slides | 0 stacks | 2 graphs (265: 3 camadas, 266: jornada)

import React from "react";
import { useCurrentFrame } from "remotion";
import { T, Spacer, AccentLine } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerProduto(
  R: Map<number, () => React.JSX.Element>,
  _useStackVisible: UseStackVisible,
) {

// 15:56.70 — "três camadas"
R.set(500, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.7} anim="anim-scaleIn" className="gradient-text">
      Tres camadas.
    </T>
  </div>
));

// 16:00.40 — "base fundamental"
R.set(501, () => (
  <div className="slide left">
    <AccentLine />
    <T size={48} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">
      1. Base fundamental.
    </T>
    <Spacer h={10} />
    <T size={38} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d2">
      O ingles que se repete no dia a dia.
    </T>
  </div>
));

// 16:04.20 — "2. Correção"
R.set(502, () => (
  <div className="slide left">
    <AccentLine />
    <T size={48} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">
      2. Correcao.
    </T>
    <Spacer h={10} />
    <T size={38} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d2">
      Os costumes de comunicacao que os nativos usam.
    </T>
  </div>
));

// 16:13.06 — "pronúncia, emendado, expressões, storytelling"
R.set(71, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showPron = time >= 973.68;
  const showEmendado = time >= 974.22;
  const showExpressoes = time >= 975.08;
  const showStory = time >= 975.74;
  const items = [
    { show: showPron, text: "Pronuncia" },
    { show: showEmendado, text: "Ingles emendado" },
    { show: showExpressoes, text: "Expressoes" },
    { show: showStory, text: "Storytelling" },
  ];
  return (
    <div className="slide left">
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10, marginTop: 10,
          opacity: item.show ? 1 : 0,
          transform: item.show ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#4ECDC4", boxShadow: "0 0 8px rgba(78,205,196,0.4)", flexShrink: 0,
          }} />
          <span style={{ fontSize: 34, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>{item.text}</span>
        </div>
      ))}
    </div>
  );
});

// 16:15.50 — "fluência de fato"
R.set(503, () => (
  <div className="slide left">
    <AccentLine />
    <T size={48} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">
      3. Fluencia real.
    </T>
    <Spacer h={10} />
    <T size={38} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d2">
      Discursos e episodios completos de serie.
    </T>
  </div>
));

// 16:28.54 — "base instalada, começa a entrar"
R.set(504, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      A <span className="teal" style={{ fontWeight: 600 }}>base instalada</span>. A fluencia comeca a aparecer.
    </T>
  </div>
));

// 16:32.62 — "repetição que treina fala e ouvido"
R.set(79, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp">
      Repeticao que treina tanto a <span className="bold">fala</span> quanto o <span className="teal" style={{ fontWeight: 600 }}>ouvido</span>.
    </T>
  </div>
));

// 16:37.52 — "deixa eu te mostrar na prática"
R.set(80, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={48} weight={600} opacity={0.7} anim="anim-blurIn" className="gradient-text">
      Na pratica.
    </T>
  </div>
));

// 16:37.90 — "na prática" (WALKTHROUGH)
R.set(505, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={52} weight={600} opacity={0.75} anim="anim-blurIn" className="gradient-text">
      Na pratica.
    </T>
  </div>
));

// 16:41.70 — "blocos essenciais"
R.set(506, () => (
  <div className="slide left">
    <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft">
      <span className="teal" style={{ fontWeight: 600 }}>Blocos essenciais</span>. Base do zero.
    </T>
  </div>
));

// 16:48.30 — "letra completa inglês e português"
R.set(507, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Letra completa em <span className="bold">ingles</span> e <span className="bold">portugues</span>.
    </T>
  </div>
));

// 16:52.50 — "música gruda, entende sem olhar"
R.set(508, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">
      A musica <span className="teal" style={{ fontWeight: 600 }}>gruda</span>. Voce entende sem olhar.
    </T>
  </div>
));

// 16:56.12 — "música gruda, entende sem olhar"
R.set(72, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showEntende = time >= 1017.82;
  return (
    <div className="slide center">
      <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp">
        A musica <span className="teal" style={{ fontWeight: 700 }}>gruda</span>.
      </T>
      <div style={{
        marginTop: 14,
        opacity: showEntende ? 1 : 0,
        transform: showEntende ? "translateY(0)" : "translateY(15px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={44} weight={500} opacity={0.55}>
          Voce entende <span className="bold">sem olhar</span>.
        </T>
      </div>
    </div>
  );
});

// 17:03.50 — "furos específicos"
R.set(509, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      O brasileiro tem <span className="red" style={{ fontWeight: 600 }}>furos especificos</span>.
    </T>
  </div>
));

// 17:07.10 — "pronúncia, emendado, expressões"
R.set(510, () => (
  <div className="slide left">
    <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft">Pronuncia. Emendado. Expressoes. Combinacoes.</T>
    <Spacer h={12} />
    <T size={44} weight={500} opacity={0.55} anim="anim-slideLeft" delay="d2">
      <span className="bold">5 trilhas</span> de correcao.
    </T>
  </div>
));

// 17:15.12 — "5 trilhas de correção"
R.set(73, () => (
  <div className="slide center">
    <T size={52} weight={700} opacity={0.8} anim="anim-scaleIn" className="teal glow-teal-text">
      5 trilhas de correcao.
    </T>
  </div>
));

// 17:18.74 — "identifica onde está travando"
R.set(511, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Identifica onde esta <span className="bold">travando</span> e vai <span className="teal" style={{ fontWeight: 600 }}>direto</span>.
    </T>
  </div>
));

// 17:26.10 — "episódios completos de série"
R.set(512, () => (
  <div className="slide center">
    <T size={48} weight={600} opacity={0.7} anim="anim-scaleIn" className="gradient-text">
      Episodios completos de serie.
    </T>
  </div>
));

// 17:29.90 — "diálogo real, velocidade real"
R.set(513, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.55} anim="anim-slideLeft">
      Dialogo <span className="bold">real</span>. Velocidade <span className="bold">real</span>. Expressao <span className="bold">real</span>.
    </T>
  </div>
));

// 17:37.50 — "todo mês episódios novos"
R.set(514, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Todo mes, <span className="teal" style={{ fontWeight: 600 }}>episodios novos</span>.
    </T>
  </div>
));

// 17:44.80 — "sem trava nenhuma"
R.set(515, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showPronto = time >= 1066.98;
  const showSeries = time >= 1068.06;
  const showSemTrava = time >= 1069.42;

  const nodeStyle = (show: boolean, isFinal: boolean): React.CSSProperties => ({
    padding: "10px 20px",
    borderRadius: 12,
    background: show
      ? isFinal ? "linear-gradient(135deg, rgba(78,205,196,0.12), rgba(167,139,250,0.06))" : "rgba(78,205,196,0.06)"
      : "rgba(255,255,255,0.02)",
    border: `1.5px solid ${show
      ? isFinal ? "rgba(78,205,196,0.25)" : "rgba(78,205,196,0.12)"
      : "rgba(255,255,255,0.04)"}`,
    opacity: show ? 1 : 0.15,
    transform: show ? "scale(1)" : "scale(0.85)",
    transition: "all 0.4s cubic-bezier(.16,1,.3,1)",
    boxShadow: show && isFinal ? "0 0 24px rgba(78,205,196,0.15)" : "none",
  });

  return (
    <div className="slide center">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* TRILHAS */}
        <div style={nodeStyle(true, false)}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#4ECDC4" }}>TRILHAS</span>
        </div>

        <span style={{ fontSize: 20, color: "#4ECDC4", opacity: showPronto ? 0.5 : 0.1, transition: "opacity 0.3s ease" }}>→</span>

        {/* PRONTO */}
        <div style={nodeStyle(showPronto, false)}>
          <span style={{ fontSize: 20, fontWeight: 700, color: showPronto ? "#fff" : "rgba(255,255,255,0.3)", transition: "color 0.3s ease" }}>PRONTO</span>
        </div>

        <span style={{ fontSize: 20, color: "#A78BFA", opacity: showSeries ? 0.5 : 0.1, transition: "opacity 0.3s ease" }}>→</span>

        {/* SÉRIES CANTADAS */}
        <div style={nodeStyle(showSeries, true)}>
          <span style={{
            fontSize: 20, fontWeight: 800,
            background: showSeries ? "linear-gradient(135deg, #4ECDC4, #A78BFA)" : "none",
            WebkitBackgroundClip: showSeries ? "text" : "unset",
            WebkitTextFillColor: showSeries ? "transparent" : "rgba(255,255,255,0.3)",
          }}>SÉRIES CANTADAS</span>
        </div>
      </div>

      {/* Sem trava */}
      <div style={{
        marginTop: 16,
        opacity: showSemTrava ? 1 : 0,
        transform: showSemTrava ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <span style={{
          fontSize: 36, fontWeight: 700,
          color: "#4ECDC4",
          textShadow: "0 0 20px rgba(78,205,196,0.3)",
        }}>Sem trava nenhuma.</span>
      </div>
    </div>
  );
});

} // end registerProduto
