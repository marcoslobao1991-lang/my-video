// ─── SOLUÇÃO (11:17 → 14:15) ─────────────────────────────────
// Audio: formato + ciência → fluência = subconsciente → bicicleta/dirigir →
//        repetição massiva → Paul Nation 500 palavras → REPETIÇÃO MUSICAL →
//        Coldplay não funciona → séries → transformar em música → composição → testar
// ~35 slides | 1 stack | 2 graphs (262: 500 palavras, 269: 200 letras)

import React from "react";
import { T, Spacer, AccentLine, WaveformBars } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerSolucao(
  R: Map<number, () => React.JSX.Element>,
  useStackVisible: UseStackVisible,
) {

// 11:20.70 — "formato + ciência + lógica"
R.set(300, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.4} anim="anim-slideLeft">
      O <span className="bold">formato</span>. A <span className="bold">ciencia</span>. A <span className="bold">logica</span>.
    </T>
  </div>
));

// 11:24.90 — "o que colocar dentro da música?"
R.set(301, () => (
  <div className="slide center">
    <T size={48} weight={600} opacity={0.65} anim="anim-blurIn">
      O que colocar <span className="gradient-text" style={{ fontWeight: 700 }}>dentro</span> da musica?
    </T>
  </div>
));

// 11:28.60 — "de onde vem a fluência"
R.set(302, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      De onde vem a <span className="teal" style={{ fontWeight: 600 }}>fluencia</span>?
    </T>
  </div>
));

// 11:32.10 — "resposta sai antes de pensar"
R.set(303, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      A resposta sai <span className="bold">antes de voce pensar</span>.
    </T>
  </div>
));

// 11:39.40 — "inglês instalado no SUBCONSCIENTE"
R.set(304, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={60} weight={800} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      SUBCONSCIENTE.
    </T>
  </div>
));

// 11:46.70 — STACK: bicicleta / dirigir / digitar
R.set(305, () => {
  const v = [useStackVisible(305, 0), useStackVisible(305, 1), useStackVisible(305, 2)];
  return (
    <div className="slide left">
      {v[0] && <T size={46} weight={500} opacity={0.6} anim="anim-slideLeft" className="bold">Andar de bicicleta.</T>}
      {v[0] && <Spacer h={14} />}
      {v[1] && <T size={46} weight={500} opacity={0.6} anim="anim-slideLeft" className="bold">Dirigir.</T>}
      {v[1] && <Spacer h={14} />}
      {v[2] && <T size={46} weight={500} opacity={0.6} anim="anim-slideLeft" className="bold">Digitar no celular.</T>}
    </div>
  );
});

// 11:50.40 — "no começo era difícil"
R.set(306, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      No comeco era <span className="red" style={{ fontWeight: 600 }}>dificil</span>.
    </T>
    <Spacer h={14} />
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp" delay="d2">
      Hoje voce faz <span className="teal" style={{ fontWeight: 600 }}>sem pensar</span>.
    </T>
  </div>
));

// 11:57.70 — "o AUTOMÁTICO"
R.set(307, () => (
  <div className="slide center">
    <T size={60} weight={700} opacity={0.9} anim="anim-scaleIn" className="gradient-text">
      O automatico.
    </T>
  </div>
));

// 12:01.50 — "todas demandaram REPETIÇÃO"
R.set(308, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      Todas demandaram <span className="bold">repeticao</span>.
    </T>
  </div>
));

// 12:05.20 — "repetiu tanto que ficou automático"
R.set(309, () => (
  <div className="slide left">
    <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft">
      Repetiu tanto que ficou <span className="gradient-text" style={{ fontWeight: 600 }}>automatico</span>.
    </T>
  </div>
));

// 12:08.80 — "inglês é exatamente igual — REPETIÇÃO MASSIVA"
R.set(310, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={56} weight={800} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      REPETICAO MASSIVA.
    </T>
  </div>
));

// 12:16.20 — "do essencial"
R.set(311, () => (
  <div className="slide left">
    <AccentLine />
    <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft">
      Nao do ingles inteiro. Do <span className="bold">essencial</span>.
    </T>
  </div>
));

// 12:23.80 — "Paul Nation"
R.set(312, () => (
  <div className="slide left">
    <AccentLine />
    <T size={50} weight={700} opacity={0.8} anim="anim-slideLeft" className="bold">
      Paul Nation.
    </T>
    <Spacer h={8} />
    <T size={34} weight={400} opacity={0.3} anim="anim-slideLeft" delay="d2">
      Linguista.
    </T>
  </div>
));

// 12:27.50 — "500 palavras = 90%"
R.set(313, () => (
  <div className="slide center">
    <T size={80} weight={800} opacity={1} anim="anim-scaleIn" className="teal glow-teal-text">
      500
    </T>
    <Spacer h={8} />
    <T size={40} weight={400} opacity={0.4} anim="anim-fadeIn" delay="d2">
      palavras = <span className="bold">90%</span> das conversas.
    </T>
  </div>
));

// 12:31.40 — GRAPH 262: 500 palavras donut (fica ~5s)

// 12:38.60 — "REPETIÇÃO MUSICAL"
R.set(314, () => (
  <div className="slide center">
    <div className="double-glow" />
    <WaveformBars />
    <Spacer h={24} />
    <T size={60} weight={900} opacity={1} anim="anim-scaleIn" delay="d2" className="gradient-animated glow-gradient-text">
      REPETICAO MUSICAL.
    </T>
  </div>
));

// 12:42.40 — "repete sem perceber"
R.set(315, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Repete dezenas de vezes <span className="bold">sem perceber</span>.
    </T>
  </div>
));

// 12:49.40 — "Coldplay, Adele, Ed Sheeran"
R.set(316, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Coldplay. Adele. Ed Sheeran.
    </T>
    <Spacer h={14} />
    <T size={46} weight={600} opacity={0.65} anim="anim-fadeUp" delay="d2">
      <span className="red">Nao funciona</span>.
    </T>
  </div>
));

// 12:57.20 — "ninguém conversa como Coldplay canta"
R.set(317, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-blurIn">
      Ninguem <span className="bold">conversa</span> como Coldplay <span className="bold">canta</span>.
    </T>
  </div>
));

// 13:04.70 — "não seguem padrão de vocabulário"
R.set(318, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Musicas sao <span className="red" style={{ fontWeight: 600 }}>poesia</span>. Nao treinam seu ouvido.
    </T>
  </div>
));

// 13:12.10 — "decorar 200 letras ≠ 1 diálogo"
// GRAPH 269: 200 letras (fica ~4s)

// 13:16.10 — "o inglês real acontece nas séries"
R.set(319, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.6} anim="anim-fadeUp">
      O ingles real acontece nas <span className="teal" style={{ fontWeight: 700 }}>series</span>.
    </T>
  </div>
));

// 13:19.90 — "conversa, diálogo, expressão, gíria"
R.set(320, () => (
  <div className="slide left">
    <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft">Conversa. Dialogo. Expressao. Giria.</T>
    <Spacer h={10} />
    <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d2">Mesmas estruturas se <span className="bold">repetindo</span>.</T>
  </div>
));

// 13:27.70 — "E aí veio a ideia"
R.set(321, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.7} anim="anim-blurIn" className="gradient-text">
      E ai veio a ideia.
    </T>
  </div>
));

// 13:31.40 — "script da série → música"
R.set(322, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Pegar o <span className="bold">script real</span> de uma serie
    </T>
    <Spacer h={14} />
    <T size={48} weight={600} opacity={0.75} anim="anim-scaleIn" delay="d2" className="teal glow-teal-text">
      e transformar em musica.
    </T>
  </div>
));

// 13:39.00 — "30, 40, 50 vezes → reconhecer palavra por palavra"
R.set(323, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Ouviu <span className="bold">50 vezes</span>. Cena toca.
    </T>
    <Spacer h={10} />
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft" delay="d2">
      Reconhece <span className="teal" style={{ fontWeight: 600 }}>palavra por palavra</span>.
    </T>
  </div>
));

// 13:46.60 — "não é colocar batida por cima"
R.set(324, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Nao e colocar <span className="red" style={{ fontWeight: 600 }}>batida por cima</span>.
    </T>
  </div>
));

// 13:50.30 — "composição original"
R.set(325, () => (
  <div className="slide left">
    <AccentLine />
    <T size={44} weight={500} opacity={0.55} anim="anim-slideLeft">
      <span className="bold">Melodia</span>. <span className="bold">Arranjo</span>. <span className="bold">Producao</span>.
    </T>
  </div>
));

// 13:55.00 — "prazer, não obrigação"
R.set(326, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.5} anim="anim-fadeUp">
      <span className="teal" style={{ fontWeight: 600 }}>Prazer</span>. Nao <span className="red">obrigacao</span>.
    </T>
  </div>
));

// 13:59.80 — "primeiro episódio de série cantado"
R.set(327, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={48} weight={600} opacity={0.75} anim="anim-scaleIn" className="gradient-text">
      Primeiro episodio cantado.
    </T>
  </div>
));

// 14:05.90 — "tinha que testar"
R.set(328, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.5} anim="anim-blurIn">
      Tinha que <span className="bold">testar</span>.
    </T>
  </div>
));

// 14:11.10 — "fomos atrás dos PIORES"
R.set(329, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Nao nos melhores.
    </T>
    <Spacer h={16} />
    <T size={56} weight={700} opacity={0.9} anim="anim-scaleIn" delay="d2" className="red glow-red-text">
      Nos piores.
    </T>
  </div>
));

} // end registerSolucao
