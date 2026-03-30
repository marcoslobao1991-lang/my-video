// ─── PREÇO (19:42 → 22:03) ───────────────────────────────────
// Audio: quanto investir → escola presencial → cursos online → IC funciona →
//        mercado <5% → deliverables → R$199 → R$99 → CTA → teste → bônus
// ~25 slides | 0 stacks | 2 graphs (263: mercado, 264: preço âncora)

import React from "react";
import { T, Spacer, AccentLine } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerPreco(
  R: Map<number, () => React.JSX.Element>,
  _useStackVisible: UseStackVisible,
) {

// 19:42.10 — "quanto investir"
R.set(700, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">
      Quanto voce precisa <span className="bold">investir</span>?
    </T>
  </div>
));

// 19:45.70 — "escola presencial 300-800/mês"
R.set(701, () => (
  <div className="slide left">
    <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft">Escola presencial:</T>
    <Spacer h={10} />
    <T size={52} weight={700} opacity={0.7} anim="anim-slideLeft" delay="d2" style={{ position: "relative", display: "inline-block" }}>
      R$300 a R$800 / mes
      <div className="strike-line" />
    </T>
  </div>
));

// 19:49.30 — "12 mil reais em 2 anos"
R.set(702, () => (
  <div className="slide center">
    <T size={56} weight={700} opacity={0.7} anim="anim-scaleIn" style={{ position: "relative", display: "inline-block" }}>
      R$12.000
      <div className="strike-line" />
    </T>
    <Spacer h={8} />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeIn" delay="d2">Pra assistir <span className="red">aulas</span>.</T>
  </div>
));

// 19:56.90 — "cursos online 2-3 mil"
R.set(703, () => (
  <div className="slide left">
    <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft">Cursos online:</T>
    <Spacer h={10} />
    <T size={52} weight={700} opacity={0.7} anim="anim-slideLeft" delay="d2" style={{ position: "relative", display: "inline-block" }}>
      R$2.000 a R$3.000
      <div className="strike-line" />
    </T>
    <Spacer h={8} />
    <T size={36} weight={400} opacity={0.3} anim="anim-slideLeft" delay="d3">500 aulas. Voce assiste <span className="red">10%</span>.</T>
  </div>
));

// 20:04.50 — "IC funciona quando nenhum funciona"
R.set(704, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.55} anim="anim-blurIn">
      O IC funciona quando <span className="bold">nenhum</span> deles funciona.
    </T>
  </div>
));

// 20:08.10 — "10h, esgotado, play, inglês entra"
R.set(705, () => (
  <div className="slide center">
    <T size={40} weight={400} opacity={0.35} anim="anim-fadeUp">10h. Esgotado. Zero energia.</T>
    <Spacer h={14} />
    <T size={48} weight={600} opacity={0.75} anim="anim-scaleIn" delay="d2" className="teal glow-teal-text">
      Da play. Ingles entra.
    </T>
  </div>
));

// 20:11.80 — GRAPH 263: Mercado <5% vs IC (fica ~8s)

// 20:19.50 — "aula virou música"
R.set(706, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.7} anim="anim-scaleIn" className="gradient-text">
      A aula virou musica.
    </T>
  </div>
));

// 20:24.10 — "o que está dentro — composição, áudio, plataforma"
R.set(707, () => (
  <div className="slide left">
    <AccentLine />
    <T size={38} weight={400} opacity={0.35} anim="anim-slideLeft">Composicao profissional.</T>
    <Spacer h={6} />
    <T size={38} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d1">Engenharia de audio.</T>
    <Spacer h={6} />
    <T size={38} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d2">Blocos + 5 trilhas + series + discursos.</T>
    <Spacer h={6} />
    <T size={38} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d3">Tudo em <span className="bold">repeticao musical</span>.</T>
  </div>
));

// 20:46.70 — "R$199 mensais"
R.set(708, () => (
  <div className="slide center">
    <T size={60} weight={700} opacity={0.7} anim="anim-fadeUp" style={{ position: "relative", display: "inline-block" }}>
      R$199 / mes
      <div className="strike-line" />
    </T>
  </div>
));

// 20:58.20 — "teste de mercado"
R.set(709, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Teste de <span className="bold">mercado</span>.
    </T>
  </div>
));

// 21:02.30 — "R$99 POR MÊS"
R.set(710, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={90} weight={900} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      R$99 / mes.
    </T>
  </div>
));

// 21:05.90 — "acesso a tudo"
R.set(711, () => (
  <div className="slide left">
    <AccentLine />
    <T size={40} weight={400} opacity={0.4} anim="anim-slideLeft">Blocos. 5 trilhas. Discursos. Series cantadas.</T>
    <Spacer h={10} />
    <T size={40} weight={400} opacity={0.4} anim="anim-slideLeft" delay="d2">Material bilingue. <span className="teal" style={{ fontWeight: 600 }}>Tudo incluido</span>.</T>
  </div>
));

// 21:13.30 — "menos que a academia que você não vai"
R.set(712, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-blurIn">
      Menos que a <span className="bold">academia</span> que voce nao vai.
    </T>
  </div>
));

// 21:17.00 — CTA
R.set(713, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Se ser <span className="teal" style={{ fontWeight: 600 }}>fluente</span> vale mais que R$99...
    </T>
    <Spacer h={24} />
    <div className="cta-btn anim-scaleIn d3">QUERO SER MEMBRO</div>
  </div>
));

// 21:31.90 — "por que tão barato?"
R.set(714, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      A verdade: isso e um <span className="bold">teste</span>.
    </T>
  </div>
));

// 21:39.50 — "provavelmente errado em cobrar tão barato"
R.set(715, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Provavelmente errado em cobrar <span className="teal" style={{ fontWeight: 600 }}>tao barato</span>.
    </T>
  </div>
));

// 21:43.90 — "BÔNUS: Rota da Fluência"
R.set(716, () => (
  <div className="slide left">
    <AccentLine />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeIn">BONUS</T>
    <Spacer h={12} />
    <T size={48} weight={700} opacity={0.8} anim="anim-slideLeft" delay="d2" className="bold">
      Rota da Fluencia.
    </T>
    <Spacer h={8} />
    <T size={36} weight={400} opacity={0.3} anim="anim-slideLeft" delay="d3">Series conversacionais. Ja vale R$99.</T>
  </div>
));

// 21:55.20 — "acredita tanto que tá disposto a testar"
R.set(717, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      A gente <span className="bold">acredita</span> tanto que ta disposto a testar.
    </T>
  </div>
));

// 22:02.50 — CTA repeat
R.set(718, () => (
  <div className="slide center">
    <T size={40} weight={400} opacity={0.35} anim="anim-fadeUp">Enquanto estiver no ar:</T>
    <Spacer h={20} />
    <div className="cta-btn anim-scaleIn d2">QUERO COMECAR AGORA</div>
  </div>
));

} // end registerPreco
