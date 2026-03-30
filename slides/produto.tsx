// ─── PRODUTO (15:57 → 17:50) ─────────────────────────────────
// Audio: 3 camadas → base → correção → séries cantadas → walkthrough → episódios novos
// ~20 slides | 0 stacks | 2 graphs (265: 3 camadas, 266: jornada)

import React from "react";
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

// 16:04.20 — "costumes de comunicação"
R.set(502, () => (
  <div className="slide left">
    <AccentLine />
    <T size={48} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">
      2. Correcao.
    </T>
    <Spacer h={10} />
    <T size={38} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d2">
      Pronuncia. Ingles emendado. Expressoes.
    </T>
  </div>
));

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

// 16:23.10 — "cena por cena, produção profissional"
R.set(504, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      <span className="bold">Cena por cena</span>. Producao <span className="teal" style={{ fontWeight: 600 }}>profissional</span>.
    </T>
  </div>
));

// 16:30.60 — GRAPH 265: 3 Camadas (fica ~7s)

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

// 17:18.70 — "identifica onde está travando"
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
R.set(515, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.7} anim="anim-blurIn" className="teal glow-teal-text">
      Sem trava nenhuma.
    </T>
  </div>
));

} // end registerProduto
