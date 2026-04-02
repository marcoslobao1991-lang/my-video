// ─── MECANISMO (7:27 → 11:17) ────────────────────────────────
// Audio: formato → critérios → música × crianças → civilizações → Zatorre → asilo →
//        latim → McGill → dopamina → "completa a frase" → educação ignora
// ~40 slides | 1 stack | 1 graph (261: dopamina)

import React from "react";
import { staticFile, useCurrentFrame } from "remotion";
import { T, Spacer, AccentLine, HeadphoneSVG } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerMecanismo(
  R: Map<number, () => React.JSX.Element>,
  useStackVisible: UseStackVisible,
) {

// 7:27.10 — "se o problema é o formato"
R.set(200, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Se o problema e o <span className="bold">formato</span>...
    </T>
  </div>
));

// 7:34.50 — "quais formatos?"
R.set(201, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.65} anim="anim-blurIn">
      Quais <span className="gradient-text" style={{ fontWeight: 700 }}>formatos</span>?
    </T>
  </div>
));

// 7:41.70 — "funcionar com fadiga cognitiva"
R.set(202, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Funcionar com quem ja esta em <span className="red" style={{ fontWeight: 600 }}>fadiga cognitiva</span>.
    </T>
  </div>
));

// 7:46.00 — STACK: critérios
R.set(203, () => {
  const v = [useStackVisible(203, 0), useStackVisible(203, 1), useStackVisible(203, 2)];
  return (
    <div className="slide left">
      <AccentLine />
      {v[0] && <T size={44} weight={500} opacity={0.6} anim="anim-slideLeft">Sem <span className="bold">esforco consciente</span>.</T>}
      {v[0] && <Spacer h={14} />}
      {v[1] && <T size={44} weight={500} opacity={0.6} anim="anim-slideLeft">Repetir <span className="bold">50 vezes</span> sem cansar.</T>}
      {v[1] && <Spacer h={14} />}
      {v[2] && <T size={44} weight={500} opacity={0.6} anim="anim-slideLeft">Porque <span className="teal" style={{ fontWeight: 600 }}>quer</span>, nao porque precisa.</T>}
    </div>
  );
});

// 7:57.00 — "a resposta fica óbvia"
R.set(204, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.7} anim="anim-scaleIn" className="gradient-text">
      A resposta fica obvia.
    </T>
  </div>
));

// 8:02.46 — "cresci dentro da MÚSICA"
R.set(205, () => (
  <div className="slide center">
    <div className="glow-teal" style={{ top: "25%", left: "10%" }} />
    <HeadphoneSVG />
    <Spacer h={20} />
    <T size={60} weight={800} opacity={1} anim="anim-scaleIn" delay="d2" className="gradient-animated glow-gradient-text">
      MUSICA.
    </T>
  </div>
));

// 8:07.60 — "curso pra crianças"
R.set(206, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Montamos um curso pra <span className="bold">criancas</span>.
    </T>
  </div>
));

// 8:12.24 — "não faz aula pra criança" + "espera que assistam" @ 494.64
R.set(207, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showEspera = time >= 494.64;
  return (
    <div className="slide center">
      <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
        Voce nao faz <span className="red" style={{ fontWeight: 600 }}>aula</span> pra crianca.
      </T>
      <div style={{
        marginTop: 14,
        opacity: showEspera ? 1 : 0,
        transform: showEspera ? "translateY(0)" : "translateY(15px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={40} weight={400} opacity={0.4}>
          E espera que elas <span className="bold">assistam</span> aulas e fiquem estudando.
        </T>
      </div>
    </div>
  );
});

// 8:22.10 — "pesadas e entediantes demais"
R.set(208, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.5} anim="anim-blurIn">
      <span className="red">Pesadas</span> e <span className="red">entediantes</span> demais.
    </T>
  </div>
));

// 8:23.02 — "a resposta: Música" — synced @ 508.34
R.set(209, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showMusica = time >= 508.34;
  return (
    <div className="slide center">
      <T size={40} weight={400} opacity={0.3} anim="anim-fadeUp">A resposta veio na hora.</T>
      <div style={{
        marginTop: 20,
        opacity: showMusica ? 1 : 0,
        transform: showMusica ? "scale(1)" : "scale(0.6)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 70, fontWeight: 800,
          color: "#4ECDC4",
          textShadow: "0 0 40px rgba(78,205,196,0.4), 0 0 80px rgba(78,205,196,0.15)",
        }}>
          Musica.
        </span>
      </div>
    </div>
  );
});

// 8:29.70 — vertical chain FULLSCREEN in GraphSlides (ID 210)

// 8:37.50 — "por que não com adultos?"
R.set(211, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={50} weight={600} opacity={0.8} anim="anim-scaleIn" className="gradient-text">
      Por que nao com adultos?
    </T>
  </div>
));

// 8:41.60 — "criança 5 min aula / horas com música"
R.set(212, () => (
  <div className="slide left">
    <T size={44} weight={500} opacity={0.5} anim="anim-slideLeft">
      <span className="red">5 minutos</span> de aula? Impossivel.
    </T>
    <Spacer h={14} />
    <T size={44} weight={500} opacity={0.5} anim="anim-slideLeft" delay="d2">
      <span className="teal" style={{ fontWeight: 600 }}>Horas</span> aprendendo por musica? Sem perceber.
    </T>
  </div>
));

// 8:48.80 — "carga cognitiva leve"
R.set(213, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      Carga cognitiva <span className="teal" style={{ fontWeight: 600 }}>leve</span>.
    </T>
  </div>
));

// 8:56.80 — "fundamento real da música"
R.set(214, () => (
  <div className="slide left">
    <AccentLine />
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      O <span className="bold">fundamento real</span>.
    </T>
  </div>
));

// 9:04.00 — "formatos mais antigos da civilização"
R.set(215, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Um dos formatos mais <span className="bold">antigos</span> da civilizacao humana.
    </T>
  </div>
));

// 9:07.60 — "todas as civilizações ensinam por música"
R.set(216, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.6} anim="anim-blurIn">
      <span className="bold">Todas</span> ensinam por <span className="teal" style={{ fontWeight: 600 }}>musica</span>.
    </T>
  </div>
));

// 9:15.20 — "Robert Zatorre — neurocientista"
R.set(217, () => (
  <div className="slide left">
    <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="anim-slideLeft">
      <img src={staticFile("photos/zatorre.jpg")} style={{
        width: 90, height: 90, borderRadius: "50%", objectFit: "cover",
        border: "2px solid rgba(78,205,196,0.4)",
        boxShadow: "0 0 20px rgba(78,205,196,0.15)",
      }} />
      <div>
        <T size={52} weight={700} opacity={0.85}><span className="bold">Robert Zatorre</span>.</T>
        <T size={34} weight={400} opacity={0.3}>Neurocientista — McGill</T>
      </div>
    </div>
  </div>
));

// 9:22.50 — "visita ao asilo"
R.set(218, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Uma visita ao <span className="bold">asilo</span>.
    </T>
  </div>
));

// 9:29.90 — "não lembrava o nome dos netos"
R.set(219, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Ja nao <span className="red" style={{ fontWeight: 600 }}>lembrava</span> o nome dos netos.
    </T>
  </div>
));

// 9:33.40 — "memória apagando"
R.set(220, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.6} anim="anim-blurIn">
      A memoria estava <span className="red" style={{ fontWeight: 700 }}>apagando</span>.
    </T>
  </div>
));

// 9:36.90 — "cantando uma música de 40 anos"
R.set(221, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Cantando uma musica de
    </T>
    <Spacer h={14} />
    <T size={70} weight={800} opacity={1} anim="anim-scaleIn" delay="d2" className="teal glow-teal-text">
      40 ANOS.
    </T>
  </div>
));

// 9:40.50 — "em LATIM"
R.set(222, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={80} weight={900} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      LATIM.
    </T>
    <Spacer h={10} />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeIn" delay="d3">
      Uma lingua que ele nunca estudou.
    </T>
  </div>
));

// 9:47.80 — "cantando palavra por palavra"
R.set(223, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      <span className="bold">Palavra</span> por <span className="bold">palavra</span>.
    </T>
  </div>
));

// 9:54.22 — "esqueciam filhos / cantavam adolescência" @ 597.26
R.set(224, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showCantavam = time >= 597.26;
  return (
    <div className="slide left">
      <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
        Esqueciam o nome dos <span className="red">filhos</span>.
      </T>
      <div style={{
        marginTop: 10,
        opacity: showCantavam ? 1 : 0,
        transform: showCantavam ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={44} weight={400} opacity={0.45}>
          Cantavam musicas da <span className="teal" style={{ fontWeight: 600 }}>adolescencia</span>.
        </T>
      </div>
    </div>
  );
});

// 10:02.50 — "o que a música tem de especial"
R.set(225, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      O que a musica tem de tao especial pra <span className="bold">gravar</span> no cerebro.
    </T>
  </div>
));

// 10:08.44 — "provar não é simples"
R.set(66, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Provar o que todo mundo ja sentia? <span className="bold">Nao e simples</span>.
    </T>
  </div>
));

// 10:12.26 — "McGill University"
R.set(226, () => (
  <div className="slide left">
    <AccentLine />
    <T size={52} weight={700} opacity={0.85} anim="anim-slideLeft" className="bold">
      McGill University.
    </T>
    <Spacer h={8} />
    <T size={34} weight={400} opacity={0.3} anim="anim-slideLeft" delay="d2">
      Canada.
    </T>
  </div>
));

// 10:21.10 — "Nature Neuroscience"
R.set(227, () => (
  <div className="slide center">
    <T size={48} weight={600} opacity={0.7} anim="anim-scaleIn" className="gradient-text">
      Nature Neuroscience.
    </T>
    <Spacer h={8} />
    <T size={34} weight={400} opacity={0.3} anim="anim-fadeIn" delay="d2">
      Uma das maiores revistas cientificas do mundo.
    </T>
  </div>
));

// 10:28.50 — "DOPAMINA"
R.set(228, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={80} weight={900} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      DOPAMINA.
    </T>
  </div>
));

// 10:32.40 — GRAPH 261: Dopamina flow (fica ~5s)

// 10:34.34 — FULLSCREEN graph in GraphSlides (ID 229)

// 10:38.54 — "esquece professor / lembra música 20 anos" — synced
R.set(230, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showLembra = time >= 640.70;
  return (
    <div className="slide center">
      <T size={42} weight={400} opacity={0.4} anim="anim-fadeUp">
        Voce <span className="red">esquece</span> o que o professor falou ontem.
      </T>
      <div style={{
        marginTop: 14,
        opacity: showLembra ? 1 : 0,
        transform: showLembra ? "translateY(0)" : "translateY(15px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={42} weight={400} opacity={0.4}>
          Mas <span className="teal" style={{ fontWeight: 600 }}>lembra</span> uma musica de 20 anos.
        </T>
      </div>
    </div>
  );
});

// 10:44.18 — "Completa a frase."
R.set(231, () => (
  <div className="slide center">
    <AccentLine />
    <T size={50} weight={600} opacity={0.7} anim="anim-blurIn">
      <span className="bold">Completa</span> a frase.
    </T>
  </div>
));

// 10:45.74 — "Eu tenho tanto pra lhe falar..."
R.set(232, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.6} anim="anim-fadeUp" style={{ fontStyle: "italic" }}>
      Eu tenho tanto pra lhe falar...
    </T>
  </div>
));

// 10:54.10 — "Como é grande meu amor por você"
R.set(233, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={52} weight={600} opacity={0.85} anim="anim-scaleIn" className="gradient-text" style={{ fontStyle: "italic" }}>
      Como e grande meu amor por voce.
    </T>
  </div>
));

// 11:00.40 — "A dona aranha subiu pela..."
R.set(234, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.6} anim="anim-fadeUp" style={{ fontStyle: "italic" }}>
      A dona aranha subiu pela...
    </T>
  </div>
));

// 11:03.00 — "PAREDE."
R.set(235, () => (
  <div className="slide center">
    <T size={80} weight={800} opacity={1} anim="anim-scaleIn" className="teal glow-teal-text">
      PAREDE.
    </T>
  </div>
));

// 11:05.90 — "educação ignora"
R.set(236, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      A educacao <span className="red" style={{ fontWeight: 600 }}>ignora</span> isso.
    </T>
  </div>
));

// 11:09.60 — "virou coisa de criança"
R.set(237, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Musica virou <span className="bold">coisa de crianca</span>.
    </T>
  </div>
));

// 11:13.40 — "o adulto é quem MAIS precisa"
R.set(238, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={48} weight={600} opacity={0.75} anim="anim-scaleIn">
      O adulto e quem <span className="gradient-animated" style={{ fontWeight: 800 }}>mais precisa</span>.
    </T>
  </div>
));

} // end registerMecanismo
