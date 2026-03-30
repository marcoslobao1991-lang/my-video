// ─── PROBLEMA (2:45 → 7:30) ──────────────────────────────────
// Audio: Outro grupo crescendo → desistência → 15h vs 150h → Kris Nielson →
//        Todo curso = AULA → rotina real → fadiga cognitiva → Johns Hopkins →
//        A culpa é do FORMATO → 95% mesmo resultado
// ~45 slides | 3 stacks | 5 graphs (258, 259, 260, 267, 268)

import React from "react";
import { T, Spacer, AccentLine } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerProblema(
  R: Map<number, () => React.JSX.Element>,
  useStackVisible: UseStackVisible,
) {

// 2:45.20 — "todos passam"
R.set(100, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      <span className="bold">Todos</span> passam. Sem excecao.
    </T>
  </div>
));

// 2:48.20 — "porquê você não aprendeu inglês"
R.set(101, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      E tem tudo a ver com <span className="red" style={{ fontWeight: 600 }}>por que voce nao aprendeu</span> ingles ate agora.
    </T>
  </div>
));

// 2:54.70 — "destravaram de verdade"
R.set(102, () => (
  <div className="slide right">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideRight">
      Milhares destravaram o ingles <span className="teal" style={{ fontWeight: 600 }}>de verdade</span>.
    </T>
  </div>
));

// 3:04.20 — "outro grupo"
R.set(103, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.7} anim="anim-blurIn">
      Comecou a crescer um <span className="red" style={{ fontWeight: 700 }}>outro grupo</span>.
    </T>
  </div>
));

// 3:07.40 — "maior do que eu gostaria"
R.set(104, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.5} anim="anim-fadeUp">
      <span className="bold">Maior</span> do que eu gostaria de admitir.
    </T>
  </div>
));

// 3:10.50 — "desistiam e não voltavam"
R.set(105, () => (
  <div className="slide left">
    <T size={46} weight={500} opacity={0.6} anim="anim-slideLeft">
      <span className="red" style={{ fontWeight: 700 }}>Desistiam</span> e nao voltavam mais.
    </T>
  </div>
));

// 3:13.90 — STACK: achei conteúdo / didática / refizemos / mudei / contratei
R.set(106, () => {
  const v = [useStackVisible(106, 0), useStackVisible(106, 1), useStackVisible(106, 2), useStackVisible(106, 3), useStackVisible(106, 4)];
  return (
    <div className="slide left">
      {v[0] && <T size={40} weight={400} opacity={0.45} anim="anim-slideLeft">Achei que era o conteudo. <span className="bold">Melhorei.</span></T>}
      {v[0] && <Spacer h={8} />}
      {v[1] && <T size={40} weight={400} opacity={0.4} anim="anim-slideLeft">Achei que era a didatica. <span className="bold">Melhorei.</span></T>}
      {v[1] && <Spacer h={8} />}
      {v[2] && <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft">Refizemos modulos inteiros.</T>}
      {v[2] && <Spacer h={8} />}
      {v[3] && <T size={40} weight={400} opacity={0.3} anim="anim-slideLeft">Mudei a ordem das aulas.</T>}
      {v[3] && <Spacer h={8} />}
      {v[4] && <T size={40} weight={400} opacity={0.25} anim="anim-slideLeft">Contratei gente nova.</T>}
    </div>
  );
});

// 3:26.40 — "os números não mudavam"
R.set(107, () => (
  <div className="slide center">
    <T size={52} weight={700} opacity={0.9} color="#FF6B6B" anim="anim-scaleIn" className="glow-red-text">
      Os numeros nao mudavam.
    </T>
  </div>
));

// 3:29.70 — "cursos inacabados"
R.set(108, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Voce tem <span className="red" style={{ fontWeight: 600 }}>cursos inacabados</span> guardados ai agora.
    </T>
  </div>
));

// 3:33.60 — "fui medir as horas reais"
R.set(109, () => (
  <div className="slide left">
    <AccentLine />
    <T size={46} weight={500} opacity={0.6} anim="anim-slideLeft">
      Fui medir as <span className="bold">horas reais</span>.
    </T>
  </div>
));

// 3:39.60 — GRAPH 258: 15h vs 150h (fica ~19s até 3:58)
// Graph registered in GraphSlides.tsx, just needs timeline entry

// 3:58.70 — "não eram mais inteligentes"
R.set(110, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">
      Nao eram mais <span className="bold">inteligentes</span>.
    </T>
    <Spacer h={12} />
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp" delay="d2">
      So <span className="teal" style={{ fontWeight: 600 }}>persistiram</span> mais.
    </T>
  </div>
));

// 4:05.60 — "poderia ter parado aqui"
R.set(111, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-blurIn">
      Poderia ter <span className="bold">parado</span> aqui.
    </T>
  </div>
));

// 4:09.00 — "por que desistiam tão rápido"
R.set(112, () => (
  <div className="slide left">
    <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft">
      Por que <span className="red" style={{ fontWeight: 600 }}>desistiam</span> tao rapido?
    </T>
  </div>
));

// 4:15.30 — "padrão idêntico em todo lugar"
R.set(113, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">
      O <span className="bold">padrao</span> era identico em <span className="bold">todo lugar</span>.
    </T>
  </div>
));

// 4:21.90 — GRAPH 260: 90% abandono (fica ~7s)

// 4:29.00 — "Kris Nielson — 150 funcionários"
R.set(114, () => (
  <div className="slide left">
    <AccentLine />
    <T size={38} weight={400} opacity={0.35} anim="anim-fadeIn">2014</T>
    <Spacer h={8} />
    <T size={48} weight={600} opacity={0.7} anim="anim-slideLeft" delay="d2">
      <span className="bold">Kris Nielson</span>.
    </T>
    <Spacer h={8} />
    <T size={38} weight={400} opacity={0.4} anim="anim-slideLeft" delay="d3">
      150 funcionarios do governo americano.
    </T>
  </div>
));

// 4:36.00 — STACK: motivados / horário / melhor material
R.set(115, () => {
  const v = [useStackVisible(115, 0), useStackVisible(115, 1), useStackVisible(115, 2)];
  return (
    <div className="slide left">
      {v[0] && <T size={44} weight={500} opacity={0.6} anim="anim-slideLeft" className="teal">Motivados.</T>}
      {v[0] && <Spacer h={12} />}
      {v[1] && <T size={44} weight={500} opacity={0.6} anim="anim-slideLeft" className="teal">Horario liberado.</T>}
      {v[1] && <Spacer h={12} />}
      {v[2] && <T size={44} weight={500} opacity={0.6} anim="anim-slideLeft" className="teal">Melhor material.</T>}
    </div>
  );
});

// 4:40.80 — "quantos chegaram ao final?"
R.set(116, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Quantos chegaram ao final?
    </T>
  </div>
));

// 4:43.20 — "UM."
R.set(117, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={180} weight={900} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      1
    </T>
    <Spacer h={10} />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeIn" delay="d3">
      em 150.
    </T>
  </div>
));

// 4:46.20 — GRAPH 259: 150 dots (fica ~3s, depois segue)

// 4:49.20 — "o problema não podia ser o conteúdo"
R.set(118, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      O <span className="red" style={{ fontWeight: 600 }}>problema</span> nao podia ser o conteudo.
    </T>
  </div>
));

// 4:55.70 — "Todo curso = AULA"
R.set(119, () => (
  <div className="slide center">
    <T size={40} weight={400} opacity={0.35} anim="anim-fadeUp">Todo curso gira em torno de uma coisa.</T>
    <Spacer h={20} />
    <T size={80} weight={900} opacity={1} anim="anim-scaleIn" delay="d2" className="red glow-red-text">
      AULA.
    </T>
  </div>
));

// 5:02.60 — "aula em vídeo, ao vivo, jogo, VR"
R.set(120, () => (
  <div className="slide left">
    <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft">Muda a embalagem.</T>
    <Spacer h={10} />
    <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d2">Video. Ao vivo. Jogo. VR.</T>
    <Spacer h={14} />
    <T size={44} weight={500} opacity={0.55} anim="anim-slideLeft" delay="d3">
      Todos pedem a <span className="bold">mesma coisa</span>.
    </T>
  </div>
));

// 5:10.40 — STACK: sentar / prestar atenção / processar / energia mental
R.set(121, () => {
  const v = [useStackVisible(121, 0), useStackVisible(121, 1), useStackVisible(121, 2), useStackVisible(121, 3)];
  return (
    <div className="slide left">
      {v[0] && <T size={46} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">Sentar.</T>}
      {v[0] && <Spacer h={12} />}
      {v[1] && <T size={46} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">Prestar atencao.</T>}
      {v[1] && <Spacer h={12} />}
      {v[2] && <T size={46} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">Processar informacao.</T>}
      {v[2] && <Spacer h={12} />}
      {v[3] && <T size={46} weight={600} opacity={0.7} anim="anim-slideLeft" className="red glow-red-text">Gastar energia mental.</T>}
    </div>
  );
});

// 5:17.30 — "aula funciona pra adolescente"
R.set(122, () => (
  <div className="slide center">
    <T size={48} weight={600} opacity={0.7} anim="anim-fadeUp">
      Aula funciona pra <span className="teal" style={{ fontWeight: 700 }}>adolescente</span>.
    </T>
  </div>
));

// 5:22.70 — "cabeça fresca"
R.set(123, () => (
  <div className="slide right">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideRight">
      Pra quem chega com a cabeca <span className="teal" style={{ fontWeight: 600 }}>fresca</span>.
    </T>
  </div>
));

// 5:25.90 — "o adulto não chega assim"
R.set(124, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.7} anim="anim-blurIn">
      O adulto <span className="red" style={{ fontWeight: 700 }}>nao chega assim</span>.
    </T>
  </div>
));

// 5:29.30 — "sua rotina real"
R.set(125, () => (
  <div className="slide left">
    <AccentLine />
    <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft">
      Pensa na sua <span className="bold">rotina real</span>.
    </T>
  </div>
));

// 5:32.30 — "trabalho, mensagem, decisão, reunião..."
R.set(126, () => (
  <div className="slide left">
    <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft">Trabalho. Mensagem. Decisao.</T>
    <Spacer h={8} />
    <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft" delay="d2">Reuniao. Transito. Familia.</T>
    <Spacer h={14} />
    <T size={44} weight={500} opacity={0.55} anim="anim-slideLeft" delay="d3">
      <span className="red">Queimando energia</span> o dia inteiro.
    </T>
  </div>
));

// 5:45.10 — "curso pede pra sentar e prestar atenção"
R.set(127, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      E ai um curso pede pra voce <span className="bold">sentar e prestar atencao</span>.
    </T>
  </div>
));

// 5:48.80 — "ou não faz, ou abre e não presta atenção"
R.set(128, () => (
  <div className="slide left">
    <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft">
      Ou voce <span className="red" style={{ fontWeight: 600 }}>nao faz</span>.
    </T>
    <Spacer h={12} />
    <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft" delay="d2">
      Ou abre e <span className="red" style={{ fontWeight: 600 }}>nao presta atencao</span>.
    </T>
  </div>
));

// 5:55.00 — "academia que você não vai"
R.set(129, () => (
  <div className="slide center">
    <T size={42} weight={400} opacity={0.4} anim="anim-fadeUp">
      A academia que voce <span className="bold">nao vai</span>.
    </T>
    <Spacer h={8} />
    <T size={42} weight={400} opacity={0.4} anim="anim-fadeUp" delay="d2">
      O projeto que <span className="bold">nao sai da gaveta</span>.
    </T>
  </div>
));

// 6:04.30 — "se recusa a gastar mais energia"
R.set(130, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      Seu corpo se <span className="red" style={{ fontWeight: 600 }}>recusa</span>.
    </T>
  </div>
));

// 6:07.50 — "não é falta de vontade"
R.set(131, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Nao e falta de <span className="bold">vontade</span>. Nem de <span className="bold">motivacao</span>.
    </T>
  </div>
));

// 6:11.70 — "Johns Hopkins 2024"
R.set(132, () => (
  <div className="slide left">
    <AccentLine />
    <T size={38} weight={400} opacity={0.35} anim="anim-fadeIn">2024</T>
    <Spacer h={8} />
    <T size={52} weight={700} opacity={0.8} anim="anim-slideLeft" delay="d2" className="bold">
      Johns Hopkins.
    </T>
  </div>
));

// 6:17.10 — "tarefas mentais até esgotados"
R.set(133, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Voluntarios fazendo tarefas ate ficarem <span className="red" style={{ fontWeight: 600 }}>esgotados</span>.
    </T>
  </div>
));

// 6:23.30 — "ofereceram dinheiro"
R.set(134, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.6} anim="anim-fadeUp">
      Ofereceram <span className="bold">dinheiro</span>.
    </T>
  </div>
));

// 6:26.30 — "90% recusaram"
R.set(135, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={90} weight={900} opacity={1} anim="anim-scaleIn" className="red glow-red-text">
      90%
    </T>
    <Spacer h={10} />
    <T size={40} weight={400} opacity={0.35} anim="anim-fadeIn" delay="d3">
      recusaram e foram embora.
    </T>
  </div>
));

// 6:29.90 — "região de recompensa DESLIGADA"
R.set(136, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Regiao de recompensa:
    </T>
    <Spacer h={16} />
    <T size={60} weight={800} opacity={1} anim="anim-scaleIn" delay="d2" className="red glow-red-text">
      DESLIGADA.
    </T>
  </div>
));

// 6:35.58 — "FADIGA COGNITIVA"
R.set(137, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={70} weight={900} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      FADIGA COGNITIVA.
    </T>
  </div>
));

// 6:39.80 — GRAPH 268: Fadiga timeline (fica ~5s)

// 6:45.00 — "o inglês não entra"
R.set(138, () => (
  <div className="slide center">
    <T size={52} weight={600} opacity={0.7} anim="anim-blurIn">
      O ingles <span className="red" style={{ fontWeight: 700 }}>nao entra</span>.
    </T>
  </div>
));

// 6:49.30 — "se sente culpado"
R.set(139, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Se sente <span className="red" style={{ fontWeight: 600 }}>culpado</span>.
    </T>
  </div>
));

// 6:55.70 — "a culpa nunca foi dele"
R.set(140, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      A culpa <span className="bold">nunca</span> foi dele.
    </T>
  </div>
));

// 6:58.20 — "A culpa é do FORMATO."
R.set(141, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={40} weight={400} opacity={0.35} anim="anim-fadeUp">A culpa e do</T>
    <Spacer h={16} />
    <T size={80} weight={900} opacity={1} anim="anim-scaleIn" delay="d2" className="gradient-animated glow-gradient-text">
      FORMATO.
    </T>
  </div>
));

// 7:02.40 — "melhor curso e pior curso = mesmo resultado"
R.set(142, () => (
  <div className="slide center">
    <T size={42} weight={400} opacity={0.4} anim="anim-fadeUp">
      O <span className="teal" style={{ fontWeight: 600 }}>melhor</span> e o <span className="red" style={{ fontWeight: 600 }}>pior</span> curso do mundo
    </T>
    <Spacer h={10} />
    <T size={42} weight={400} opacity={0.4} anim="anim-fadeUp" delay="d2">
      dao o <span className="bold">mesmo resultado</span>.
    </T>
  </div>
));

// 7:08.70 — "os dois são AULA — esforço mental"
R.set(143, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Os dois sao <span className="red" style={{ fontWeight: 700 }}>aula</span>.
    </T>
    <Spacer h={16} />
    <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp" delay="d2">
      Aula exige <span className="bold">esforco mental</span>.
    </T>
  </div>
));

// 7:17.90 — "com a rotina que você leva, nunca"
R.set(144, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      Com a rotina que voce leva, <span className="red" style={{ fontWeight: 700 }}>nunca</span>.
    </T>
  </div>
));

// 7:21.00 — "o problema nunca foi O QUE"
R.set(145, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      O problema nunca foi <span className="bold">o que</span> ensinavam.
    </T>
    <Spacer h={16} />
    <T size={50} weight={600} opacity={0.8} anim="anim-scaleIn" delay="d3" className="gradient-text">
      E sim o jeito.
    </T>
  </div>
));

} // end registerProblema
