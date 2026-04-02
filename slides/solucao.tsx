// ─── SOLUÇÃO (11:17 → 14:15) ─────────────────────────────────
// Audio: formato + ciência → fluência = subconsciente → bicicleta/dirigir →
//        repetição massiva → Paul Nation 500 palavras → REPETIÇÃO MUSICAL →
//        Coldplay não funciona → séries → transformar em música → composição → testar
// ~35 slides | 1 stack | 2 graphs (262: 500 palavras, 269: 200 letras)

import React from "react";
import { staticFile, useCurrentFrame, OffthreadVideo } from "remotion";
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

// 11:50.40 — "no começo difícil / sem pensar" @ 715.72
R.set(306, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showSemPensar = time >= 715.72;
  return (
    <div className="slide center">
      <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
        No comeco era <span className="red" style={{ fontWeight: 600 }}>dificil</span>.
      </T>
      <div style={{
        marginTop: 14,
        opacity: showSemPensar ? 1 : 0,
        transform: showSemPensar ? "translateY(0)" : "translateY(15px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={44} weight={400} opacity={0.4}>
          Hoje voce faz <span className="teal" style={{ fontWeight: 600 }}>sem pensar</span>.
        </T>
      </div>
    </div>
  );
});

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

// 12:13.64 — "não do inglês inteiro / Do ESSENCIAL" @ 738.04
R.set(311, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showEssencial = time >= 737.70;
  return (
    <div className="slide left">
      <AccentLine />
      <T size={46} weight={500} opacity={0.55} anim="anim-slideLeft">
        Nao do ingles inteiro.
      </T>
      <div style={{
        marginTop: 12,
        opacity: showEssencial ? 1 : 0,
        transform: showEssencial ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={50} weight={700} opacity={0.8}>
          Do <span className="teal" style={{ fontWeight: 800 }}>essencial</span>.
        </T>
      </div>
    </div>
  );
});

// 12:23.80 — "Paul Nation"
R.set(312, () => (
  <div className="slide left">
    <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="anim-slideLeft">
      <img src={staticFile("photos/paulnation.jpg")} style={{
        width: 90, height: 90, borderRadius: "50%", objectFit: "cover",
        border: "2px solid rgba(78,205,196,0.4)",
        boxShadow: "0 0 20px rgba(78,205,196,0.15)",
      }} />
      <div>
        <T size={50} weight={700} opacity={0.8}><span className="bold">Paul Nation</span>.</T>
        <T size={34} weight={400} opacity={0.3}>Linguista — Victoria University</T>
      </div>
    </div>
  </div>
));

// 12:30.44 — "500 palavras = 90%" — sync 90% @ 752.58
R.set(313, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const show90 = time >= 751.42;
  return (
    <div className="slide center">
      <T size={80} weight={800} opacity={1} anim="anim-scaleIn" className="teal glow-teal-text">
        500
      </T>
      <Spacer h={8} />
      <div style={{
        opacity: show90 ? 1 : 0,
        transform: show90 ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={40} weight={400} opacity={0.4}>
          palavras = <span className="bold">90%</span> das conversas.
        </T>
      </div>
    </div>
  );
});

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

// 12:47.30 — "conteúdo vem disfarçado"
R.set(69, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      O conteudo vem <span className="teal" style={{ fontWeight: 600 }}>disfarcado</span>. Nao parece estudo.
    </T>
  </div>
));

// 12:50.50 — "Coldplay, Adele / Não funciona" @ 775.22
R.set(316, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showNao = time >= 775.22;
  return (
    <div className="slide center">
      <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
        Coldplay. Adele. Ed Sheeran.
      </T>
      <div style={{
        marginTop: 14,
        opacity: showNao ? 1 : 0,
        transform: showNao ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 46, fontWeight: 700,
          color: "#FF6B6B",
          textShadow: "0 0 30px rgba(255,107,107,0.4)",
        }}>
          Nao funciona.
        </span>
      </div>
    </div>
  );
});

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

// 13:14.92 — "inglês real nas séries" → fullscreen graph in GraphSlides (ID 68)

// 13:24.98 — "o inglês essencial que Paul Nation identificou"
R.set(70, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp">
      O <span className="gradient-text" style={{ fontWeight: 700 }}>ingles essencial</span> que Paul Nation identificou.
    </T>
  </div>
));

// 13:27.72 — "E aí veio a ideia"
R.set(321, () => (
  <div className="slide center">
    <T size={50} weight={600} opacity={0.7} anim="anim-blurIn" className="gradient-text">
      E ai veio a ideia.
    </T>
  </div>
));

// 13:31.40 — "script da série → música"
R.set(322, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showTransformar = time >= 812.84;
  return (
    <div className="slide center">
      <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
        Pegar o <span className="bold">script real</span> de uma serie
      </T>
      <div style={{
        marginTop: 14,
        opacity: showTransformar ? 1 : 0,
        transform: showTransformar ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 48, fontWeight: 600,
          color: "#4ECDC4",
          textShadow: "0 0 30px rgba(78,205,196,0.4)",
        }}>e transformar em musica.</span>
      </div>
    </div>
  );
});

// 13:39.00 — "30, 40, 50 vezes → reconhecer palavra por palavra"
R.set(323, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showReconhece = time >= 821.62;
  return (
    <div className="slide left">
      <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
        Ouviu <span className="bold">50 vezes</span>. Cena toca.
      </T>
      <div style={{
        marginTop: 10,
        opacity: showReconhece ? 1 : 0,
        transform: showReconhece ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={44} weight={400} opacity={0.45}>
          Reconhece <span className="teal" style={{ fontWeight: 600 }}>palavra por palavra</span>.
        </T>
      </div>
    </div>
  );
});

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

// 14:11.10 — "não nos melhores / NOS PIORES" @ 855.18
R.set(329, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showPiores = time >= 854.60;
  return (
    <div className="slide center">
      <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
        Nao nos melhores.
      </T>
      <div style={{
        marginTop: 16,
        opacity: showPiores ? 1 : 0,
        transform: showPiores ? "scale(1)" : "scale(0.6)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 56, fontWeight: 800,
          color: "#FF6B6B",
          textShadow: "0 0 40px rgba(255,107,107,0.5), 0 0 80px rgba(255,107,107,0.2)",
        }}>Nos piores.</span>
      </div>
    </div>
  );
});

} // end registerSolucao
