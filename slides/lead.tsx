// ─── LEAD (0:00 → 1:24) ─────────────────────────────────────
// Audio: Demo Friends → promessa → universidades → repetição → música → objetivos
// 25 slides | 4 stacks

import React from "react";
import { useCurrentFrame } from "remotion";
import { T, Spacer, AccentLine, HeadphoneSVG } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerLead(
  R: Map<number, () => React.JSX.Element>,
  useStackVisible: UseStackVisible,
) {

// 0:00 — "uma cena de Friends"
R.set(1, () => (
  <div className="slide left">
    <div className="glow-teal" style={{ top: "20%", left: "-5%" }} />
    <T size={50} weight={500} opacity={0.7} anim="anim-slideLeft">
      Uma cena de <span className="teal" style={{ fontWeight: 700 }}>Friends</span>.
    </T>
  </div>
));

// 0:01.68 — "não do jeito acostumado"
R.set(2, () => (
  <div className="slide right">
    <T size={46} weight={400} opacity={0.45} anim="anim-slideRight">
      So que <span className="bold">nao</span> do jeito que voce ta acostumado.
    </T>
  </div>
));

// 0:03.42 — "uma única vez"
R.set(3, () => (
  <div className="slide center">
    <T size={56} weight={600} opacity={0.8} anim="anim-scaleIn" className="gradient-animated">
      Uma unica vez.
    </T>
  </div>
));

// 0:04.78 — "30, 40 vezes" → counter starts here (rendered by RepetitionCounter in VSLOverlay)
R.set(4, () => (
  <div className="slide center" />
));

// 0:06.98 — STACK: trânsito / academia / dormir
R.set(5, () => {
  const v = [useStackVisible(5, 0), useStackVisible(5, 1), useStackVisible(5, 2)];
  return (
    <div className="slide left">
      <div className="double-glow" />
      {v[0] && <T size={50} weight={600} opacity={0.7} anim="anim-slideLeft" className="teal">No transito.</T>}
      {v[0] && <Spacer h={18} />}
      {v[1] && <T size={50} weight={600} opacity={0.7} anim="anim-slideLeft" className="teal">Na academia.</T>}
      {v[1] && <Spacer h={18} />}
      {v[2] && <T size={50} weight={600} opacity={0.7} anim="anim-slideLeft" className="teal">Antes de dormir.</T>}
    </div>
  );
});

// 0:08.50 — "não porque alguém mandou"
R.set(28, () => (
  <div className="slide center">
    <T size={42} weight={400} opacity={0.45} anim="anim-fadeUp">
      Nao porque alguem <span className="red" style={{ fontWeight: 700 }}>mandou</span> voce ouvir.
    </T>
  </div>
));

// 0:09.42 — "grudou na cabeça"
R.set(6, () => (
  <div className="slide center">
    <T size={52} weight={600} opacity={0.7} anim="anim-blurIn">
      Porque <span className="bold">grudou</span> na sua cabeca.
    </T>
  </div>
));

// 0:14.76 — "cena real tocasse?"
R.set(7, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Quando a <span className="bold">cena real</span> tocasse?
    </T>
  </div>
));

// 0:18.12 — "Entender tudo." — payoff moment
R.set(8, () => (
  <div className="slide center">
    <div className="double-glow" />
    <div className="double-glow" />
    <T size={90} weight={900} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      Entender tudo.
    </T>
  </div>
));

// 0:19.20 — STACK: sem legenda / esforço / estudado
R.set(9, () => {
  const v = [useStackVisible(9, 0), useStackVisible(9, 1), useStackVisible(9, 2)];
  return (
    <div className="slide left">
      {v[0] && <T size={54} weight={600} opacity={0.8} anim="anim-slideLeft">Sem <span className="bold">legenda</span>.</T>}
      {v[0] && <Spacer h={16} />}
      {v[1] && <T size={54} weight={600} opacity={0.8} anim="anim-slideLeft">Sem <span className="bold">esforco</span>.</T>}
      {v[1] && <Spacer h={16} />}
      {v[2] && <T size={54} weight={600} opacity={0.8} anim="anim-slideLeft">Sem ter <span className="bold">estudado</span>.</T>}
    </div>
  );
});

// 0:23.16 — "SÉRIE CANTADA" → now a fullscreen graph in GraphSlides.tsx (ID 10)

// 0:24.24 — "mesmas estruturas"
R.set(11, () => (
  <div className="slide left">
    <AccentLine />
    <T size={44} weight={400} opacity={0.5} anim="anim-slideLeft">
      O ingles real se repete dentro das <span className="bold">mesmas estruturas</span>.
    </T>
  </div>
));

// 0:29.54 — "quando você conecta essas estruturas"
R.set(12, () => (
  <div className="slide center">
    <T size={42} weight={400} opacity={0.45} anim="anim-fadeUp">
      Quando voce <span className="bold">conecta</span> essas estruturas...
    </T>
  </div>
));

// 0:31.78 — "som embolado → faz sentido" — now a fullscreen graph (ID 29 in GraphSlides)
// 0:32.32 — phase 2 of same graph (ID 52 removed)

// 0:33.78 — "milhares de brasileiros"
R.set(13, () => (
  <div className="slide left">
    <T size={46} weight={500} opacity={0.6} anim="anim-slideLeft">
      <span className="bold">Milhares de brasileiros</span> ja estao usando.
    </T>
  </div>
));

// 0:38.34 — "Método com influência:"
R.set(87, () => (
  <div className="slide center">
    <T size={48} weight={600} opacity={0.7} anim="anim-fadeUp">
      Metodo com <span className="gradient-text" style={{ fontWeight: 800 }}>influencia</span>:
    </T>
  </div>
));

// 0:40.24 — STACK: Hopkins / McGill / Stanford / MIT
R.set(14, () => {
  const v = [useStackVisible(14, 0), useStackVisible(14, 1), useStackVisible(14, 2), useStackVisible(14, 3)];
  return (
    <div className="slide center">
      {v[0] && <T size={58} weight={700} opacity={0.9} anim="anim-blurIn" className="bold">Johns Hopkins</T>}
      {v[0] && <Spacer h={12} />}
      {v[1] && <T size={58} weight={700} opacity={0.9} anim="anim-blurIn" className="bold">McGill</T>}
      {v[1] && <Spacer h={12} />}
      {v[2] && <T size={58} weight={700} opacity={0.9} anim="anim-blurIn" className="bold">Stanford</T>}
      {v[2] && <Spacer h={12} />}
      {v[3] && <T size={58} weight={700} opacity={0.9} anim="anim-blurIn" className="gradient-animated glow-gradient-text">MIT</T>}
    </div>
  );
});

// 0:43.30 — "validado há décadas"
R.set(15, () => (
  <div className="slide left">
    <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft">
      <span className="bold">Validado ha decadas</span>.
    </T>
  </div>
));

// 0:45.66 — "formato ideal pra qualquer adulto"
R.set(16, () => (
  <div className="slide left">
    <div className="glow-purple" style={{ bottom: "15%", right: "5%" }} />
    <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft">
      O <span className="gradient-text" style={{ fontWeight: 600 }}>formato ideal</span> pra qualquer adulto.
    </T>
  </div>
));

// 0:46.98 — "INGLÊS EM DEFINITIVO" — punch
R.set(53, () => (
  <div className="slide center">
    <div className="double-glow" />
    <div className="double-glow" />
    <T size={80} weight={900} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      INGLES EM DEFINITIVO.
    </T>
  </div>
));

// 0:48.54 — "vou te mostrar como funciona"
R.set(17, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">
      Vou te mostrar <span className="bold">como funciona</span>.
    </T>
  </div>
));

// 0:51.68 — "o único método"
R.set(18, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={50} weight={500} opacity={0.7} anim="anim-blurIn">
      O <span className="gradient-animated" style={{ fontWeight: 700 }}>unico metodo</span> que voce vai precisar.
    </T>
  </div>
));

// 0:54.88 — "instalar fluência"
R.set(19, () => (
  <div className="slide left">
    <AccentLine />
    <T size={52} weight={700} opacity={0.9} anim="anim-slideLeft" className="teal glow-teal-text">
      Instalar fluencia no seu ouvido.
    </T>
  </div>
));

// 0:57.64 — "REPETIÇÃO."
R.set(20, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={100} weight={900} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      REPETICAO.
    </T>
  </div>
));

// 0:59.72 — "de um jeito gostoso"
R.set(21, () => (
  <div className="slide right">
    <T size={46} weight={500} opacity={0.55} anim="anim-slideRight">
      De um jeito <span className="teal" style={{ fontWeight: 600 }}>gostoso</span>.
    </T>
  </div>
));

// 1:01.48 — "Não porque precisa. Porque quer."
R.set(22, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.45} anim="anim-fadeUp">
      <span className="red">Nao</span> porque voce precisa.
    </T>
    <Spacer h={24} />
    <T size={54} weight={700} opacity={0.9} anim="anim-scaleIn" delay="d3" className="teal glow-teal-text">
      Porque voce quer.
    </T>
  </div>
));

// 1:05.82 — "A MÚSICA." + "ferramenta de repetição" @ 67.38s
R.set(23, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showSub = time >= 67.38;
  return (
    <div className="slide center">
      <div className="double-glow" />
      <HeadphoneSVG />
      <Spacer h={24} />
      <T size={100} weight={900} opacity={1} anim="anim-scaleIn" delay="d2" className="gradient-animated glow-gradient-text">
        A MUSICA.
      </T>
      <div style={{
        marginTop: 20,
        fontSize: 24, fontWeight: 500,
        color: "rgba(255,255,255,0.35)",
        letterSpacing: 2,
        opacity: showSub ? 1 : 0,
        transform: showSub ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        Ferramenta de <span style={{ color: "#4ECDC4", fontWeight: 700 }}>repeticao</span>.
      </div>
    </div>
  );
});

// 1:08.90 — "Fluência para:"
R.set(54, () => (
  <div className="slide center">
    <T size={52} weight={700} opacity={0.8} anim="anim-fadeUp" className="gradient-text glow-gradient-text">
      Fluencia para:
    </T>
  </div>
));

// 1:09.92 — STACK: objetivos
R.set(24, () => {
  const v = [useStackVisible(24, 0), useStackVisible(24, 1), useStackVisible(24, 2), useStackVisible(24, 3), useStackVisible(24, 4)];
  return (
    <div className="slide left">
      {v[0] && <T size={44} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">Multinacional.</T>}
      {v[0] && <Spacer h={12} />}
      {v[1] && <T size={44} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">Entrevista.</T>}
      {v[1] && <Spacer h={12} />}
      {v[2] && <T size={44} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">Series sem legenda.</T>}
      {v[2] && <Spacer h={12} />}
      {v[3] && <T size={44} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">Viagens.</T>}
      {v[3] && <Spacer h={12} />}
      {v[4] && <T size={44} weight={600} opacity={0.7} anim="anim-slideLeft" className="teal glow-teal-text">Emprego fora.</T>}
    </div>
  );
});

// 1:18.04 — "vai mudar completamente"
R.set(25, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">
      Vai <span className="gradient-text" style={{ fontWeight: 600 }}>mudar completamente</span>.
    </T>
  </div>
));

// 1:21.92 — "aprendizado de INGLÊS" — punch
R.set(55, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={32} weight={500} opacity={0.4} anim="anim-fadeUp">
      Aprendizado de
    </T>
    <Spacer h={8} />
    <T size={90} weight={900} opacity={1} anim="anim-scaleIn" delay="d2" className="gradient-animated glow-gradient-text">
      INGLES.
    </T>
  </div>
));

} // end registerLead
