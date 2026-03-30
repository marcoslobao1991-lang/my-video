// ─── VALIDAÇÃO (14:15 → 15:57) ───────────────────────────────
// Audio: piores alunos → teste → resultado → 1-2h/dia → decisão arriscada →
//        pausar vendas → música boa de verdade → produção → INGLÊS CANTADO
// ~25 slides | 0 stacks | 0 graphs

import React from "react";
import { T, Spacer, AccentLine, WaveformBars } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerValidacao(
  R: Map<number, () => React.JSX.Element>,
  _useStackVisible: UseStackVisible,
) {

// 14:15.20 — "todo curso da internet, nenhum"
R.set(400, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Ja tinham comprado <span className="bold">todo curso</span> da internet.
    </T>
    <Spacer h={10} />
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft" delay="d2">
      Nao conseguiam fazer <span className="red" style={{ fontWeight: 600 }}>nenhum</span>.
    </T>
  </div>
));

// 14:22.70 — "sem prazo, sem cobrança"
R.set(401, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Sem prazo. Sem cobranca. Reacao <span className="bold">natural</span>.
    </T>
  </div>
));

// 14:28.40 — "Resultado."
R.set(402, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={60} weight={700} opacity={0.9} anim="anim-scaleIn" className="gradient-text">
      Resultado.
    </T>
  </div>
));

// 14:30.40 — "entenda o peso disso"
R.set(403, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-blurIn">
      Entenda o <span className="bold">peso</span> disso.
    </T>
  </div>
));

// 14:34.30 — "desistido dos mais famosos"
R.set(404, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Tinham <span className="red" style={{ fontWeight: 600 }}>desistido</span> dos mais famosos.
    </T>
  </div>
));

// 14:37.90 — "aceitando que nunca iam aprender"
R.set(405, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.5} anim="anim-fadeUp">
      Aceitando que <span className="red" style={{ fontWeight: 700 }}>nunca</span> iam aprender.
    </T>
  </div>
));

// 14:41.50 — "estavam voltando, queriam mais"
R.set(406, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.6} anim="anim-blurIn">
      Estavam <span className="teal" style={{ fontWeight: 700 }}>voltando</span>. Queriam mais.
    </T>
  </div>
));

// 14:45.40 — "1 a 2 HORAS por dia"
R.set(407, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={80} weight={800} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      1-2h / dia.
    </T>
  </div>
));

// 14:52.50 — "aluno nos EUA, professor nativo"
R.set(408, () => (
  <div className="slide left">
    <T size={42} weight={400} opacity={0.4} anim="anim-slideLeft">
      Morava nos EUA. Professor <span className="bold">nativo</span>.
    </T>
  </div>
));

// 14:60.00 — "decisão mais arriscada"
R.set(409, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">
      A decisao mais <span className="bold">arriscada</span> da minha carreira.
    </T>
  </div>
));

// 15:03.60 — "PAUSAR AS VENDAS"
R.set(410, () => (
  <div className="slide center">
    <T size={56} weight={700} opacity={0.85} anim="anim-scaleIn" className="red glow-red-text">
      Pausar as vendas.
    </T>
  </div>
));

// 15:07.10 — "funcionou pros piores"
R.set(411, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-blurIn">
      Se funcionou pros <span className="red">piores</span>...
    </T>
  </div>
));

// 15:14.70 — "só 5% conseguiam sentar e fazer"
R.set(412, () => (
  <div className="slide center">
    <T size={70} weight={800} opacity={1} anim="anim-scaleIn" className="red glow-red-text">
      5%
    </T>
    <Spacer h={10} />
    <T size={38} weight={400} opacity={0.35} anim="anim-fadeIn" delay="d3">
      conseguiam sentar e fazer.
    </T>
  </div>
));

// 15:18.50 — "música boa de verdade"
R.set(413, () => (
  <div className="slide left">
    <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft">
      A musica tinha que ser <span className="teal" style={{ fontWeight: 700 }}>boa de verdade</span>.
    </T>
  </div>
));

// 15:22.10 — "no carro, no churrasco, no fone"
R.set(414, () => (
  <div className="slide left">
    <T size={42} weight={400} opacity={0.4} anim="anim-slideLeft">No carro. No churrasco. No fone.</T>
    <Spacer h={10} />
    <T size={42} weight={400} opacity={0.4} anim="anim-slideLeft" delay="d2">Porque e <span className="teal" style={{ fontWeight: 600 }}>gostosa de ouvir</span>.</T>
  </div>
));

// 15:25.70 — "scripts reais, produção profissional"
R.set(415, () => (
  <div className="slide left">
    <AccentLine />
    <T size={44} weight={500} opacity={0.5} anim="anim-slideLeft">
      <span className="bold">Scripts reais</span>. Producao <span className="bold">profissional</span>.
    </T>
  </div>
));

// 15:33.40 — "meses de produção"
R.set(416, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      <span className="bold">Meses</span> de producao.
    </T>
  </div>
));

// 15:37.00 — "10 da noite, destruído, dá play"
R.set(417, () => (
  <div className="slide center">
    <T size={42} weight={400} opacity={0.35} anim="anim-fadeUp">10 da noite. Destruido. Da <span className="bold">play</span>.</T>
    <Spacer h={14} />
    <T size={48} weight={600} opacity={0.75} anim="anim-scaleIn" delay="d2" className="teal glow-teal-text">
      O ingles entra mesmo assim.
    </T>
  </div>
));

// 15:44.50 — "INGLÊS CANTADO"
R.set(418, () => (
  <div className="slide center">
    <div className="double-glow" />
    <WaveformBars />
    <Spacer h={24} />
    <T size={70} weight={900} opacity={1} anim="anim-scaleIn" delay="d2" className="gradient-animated glow-gradient-text">
      INGLES CANTADO.
    </T>
  </div>
));

// 15:48.10 — "primeira plataforma de inglês em música"
R.set(419, () => (
  <div className="slide left">
    <AccentLine />
    <T size={44} weight={500} opacity={0.55} anim="anim-slideLeft">
      A <span className="bold">primeira</span> plataforma de ingles em cima de musica.
    </T>
  </div>
));

// 15:51.80 — "único canal que o cérebro não fecha"
R.set(420, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.6} anim="anim-blurIn">
      O unico canal que seu cerebro <span className="teal" style={{ fontWeight: 700 }}>nao fecha</span>.
    </T>
  </div>
));

} // end registerValidacao
