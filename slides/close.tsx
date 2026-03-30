// ─── CLOSE (22:03 → 24:24) ───────────────────────────────────
// Audio: checkout → não sei cantar → 30 dias garantia → reembolso →
//        funcionou pros piores → gostoso de verdade → e se funcionar →
//        formato nunca foi feito pra você → músicas têm inglês → CTA final
// ~20 slides | 0 stacks

import React from "react";
import { T, Spacer, AccentLine } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerClose(
  R: Map<number, () => React.JSX.Element>,
  _useStackVisible: UseStackVisible,
) {

// 22:06.20 — "checkout seguro"
R.set(800, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Checkout <span className="teal" style={{ fontWeight: 600 }}>seguro</span>. Menos de 1 minuto.
    </T>
  </div>
));

// 22:17.10 — "começar a ouvir hoje"
R.set(801, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      Comecar a ouvir <span className="bold">hoje</span>.
    </T>
  </div>
));

// 22:20.60 — "não sei cantar — não pedi pra cantar"
R.set(802, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      <span className="red">Nao sei cantar</span>?
    </T>
    <Spacer h={16} />
    <T size={46} weight={500} opacity={0.6} anim="anim-fadeUp" delay="d2">
      Nao pedi pra cantar. Voce vai <span className="teal" style={{ fontWeight: 600 }}>ouvir</span>.
    </T>
  </div>
));

// 22:35.60 — "só dar play"
R.set(803, () => (
  <div className="slide center">
    <T size={48} weight={600} opacity={0.65} anim="anim-scaleIn" className="gradient-text">
      So dar play.
    </T>
  </div>
));

// 22:39.60 — "30 DIAS"
R.set(804, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={80} weight={900} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      30 DIAS.
    </T>
    <Spacer h={12} />
    <T size={38} weight={400} opacity={0.3} anim="anim-fadeIn" delay="d3">
      Pra decidir. Nao 7.
    </T>
  </div>
));

// 22:47.30 — "100% reembolso"
R.set(805, () => (
  <div className="slide center">
    <T size={60} weight={700} opacity={0.9} anim="anim-scaleIn" className="teal glow-teal-text">
      100% de volta.
    </T>
    <Spacer h={10} />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeIn" delay="d2">
      Um clique. Sem explicar nada.
    </T>
  </div>
));

// 22:58.30 — "sem avisar ninguém"
R.set(806, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      A decisao e <span className="bold">sua</span>. A um clique.
    </T>
  </div>
));

// 23:05.60 — "a gente sabe o que acontece quando dá play"
R.set(807, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-blurIn">
      A gente <span className="bold">sabe</span> o que acontece quando voce da play.
    </T>
  </div>
));

// 23:16.50 — "continuaram, pediram mais"
R.set(808, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">
      <span className="teal" style={{ fontWeight: 600 }}>Continuaram</span>. Pediram mais.
    </T>
  </div>
));

// 23:20.10 — "gostoso de verdade"
R.set(809, () => (
  <div className="slide center">
    <T size={48} weight={600} opacity={0.7} anim="anim-scaleIn" className="gradient-text">
      Gostoso de verdade.
    </T>
  </div>
));

// 23:27.20 — "inglês entrando junto"
R.set(810, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Voce ta ouvindo musica. O ingles ta <span className="teal" style={{ fontWeight: 600 }}>entrando junto</span>.
    </T>
  </div>
));

// 23:31.10 — "se não gostar → dinheiro de volta"
R.set(811, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Nao gostou? <span className="bold">Dinheiro de volta</span>.
    </T>
    <Spacer h={16} />
    <T size={50} weight={600} opacity={0.75} anim="anim-scaleIn" delay="d2" className="teal glow-teal-text">
      E se funcionar?
    </T>
  </div>
));

// 23:38.50 — "nenhum curso conseguiu te dar"
R.set(812, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      Um ingles que <span className="bold">nenhum curso</span> conseguiu te dar.
    </T>
  </div>
));

// 23:42.10 — "você não chegou aqui por acaso"
R.set(813, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.6} anim="anim-fadeUp" className="gradient-text">
      Voce nao chegou aqui por acaso.
    </T>
  </div>
));

// 23:49.50 — "o formato nunca foi feito pra você"
R.set(814, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      O <span className="red" style={{ fontWeight: 600 }}>formato</span> nunca foi feito pra voce.
    </T>
    <Spacer h={14} />
    <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp" delay="d2">
      Ate agora.
    </T>
  </div>
));

// 23:56.70 — "seu cérebro sempre aceitou"
R.set(815, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-blurIn">
      Existe um formato que seu cerebro <span className="teal" style={{ fontWeight: 600 }}>sempre aceitou</span>.
    </T>
  </div>
));

// 24:04.10 — "as músicas têm inglês dentro"
R.set(816, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={48} weight={600} opacity={0.75} anim="anim-scaleIn" className="gradient-text">
      As musicas tem ingles dentro.
    </T>
  </div>
));

// 24:11.60 — "chuveiro, série, avião — vai lembrar desse momento"
R.set(817, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Voce vai <span className="bold">lembrar</span> desse momento.
    </T>
  </div>
));

// 24:18.80 — CTA FINAL
R.set(818, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeIn">Clica no botao abaixo.</T>
    <Spacer h={24} />
    <div className="cta-btn anim-scaleIn d2">QUERO SER MEMBRO GOLD</div>
    <Spacer h={24} />
    <T size={32} weight={400} opacity={0.25} anim="anim-fadeIn" delay="d4">Te vejo dentro do Ingles Cantado.</T>
  </div>
));

} // end registerClose
