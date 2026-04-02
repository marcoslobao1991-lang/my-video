// ─── VALIDAÇÃO (14:15 → 15:57) ───────────────────────────────
// Audio: piores alunos → teste → resultado → 1-2h/dia → decisão arriscada →
//        pausar vendas → música boa de verdade → produção → INGLÊS CANTADO
// ~25 slides | 0 stacks | 0 graphs

import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import { T, Spacer, AccentLine, WaveformBars } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerValidacao(
  R: Map<number, () => React.JSX.Element>,
  _useStackVisible: UseStackVisible,
) {

// 14:25.12 — "testar a reação natural"
R.set(76, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      Testar a <span className="gradient-text" style={{ fontWeight: 700 }}>reacao natural</span>.
    </T>
  </div>
));

// 14:28.94 — "todo curso da internet, nenhum"
R.set(400, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showNenhum = time >= 858.82;
  return (
    <div className="slide left">
      <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
        Ja tinham comprado <span className="bold">todo curso</span> da internet.
      </T>
      <div style={{
        marginTop: 10,
        opacity: showNenhum ? 1 : 0,
        transform: showNenhum ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={44} weight={400} opacity={0.45}>
          Nao conseguiam fazer <span className="red" style={{ fontWeight: 600 }}>nenhum</span>.
        </T>
      </div>
    </div>
  );
});

// 14:22.70 — "sem prazo, sem cobrança"
R.set(401, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Sem prazo. Sem cobranca.
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
R.set(404, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showAceitando = time >= 876.56;
  return (
    <div className="slide left">
      <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
        Tinham <span className="red" style={{ fontWeight: 600 }}>desistido</span> dos mais famosos.
      </T>
      <div style={{
        marginTop: 12,
        opacity: showAceitando ? 1 : 0,
        transform: showAceitando ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={46} weight={500} opacity={0.5}>
          Aceitando que <span className="red" style={{ fontWeight: 700 }}>nunca</span> iam aprender.
        </T>
      </div>
    </div>
  );
});

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

// 14:57.16 — "não tinha como tratar como experimento"
R.set(77, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp">
      Nao tinha mais como tratar isso como <span className="bold">experimento</span>.
    </T>
  </div>
));

// 15:00.00 — "decisão mais arriscada"
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
R.set(415, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showComposicao = time >= 931.14;
  return (
    <div className="slide left">
      <AccentLine />
      <T size={44} weight={500} opacity={0.5} anim="anim-slideLeft">
        <span className="bold">Scripts reais</span>. Dialogos exatos. Velocidade real.
      </T>
      <div style={{
        marginTop: 14,
        opacity: showComposicao ? 1 : 0,
        transform: showComposicao ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={46} weight={600} opacity={0.7}>
          <span className="gradient-text" style={{ fontWeight: 700 }}>Composicao musical profissional</span>.
        </T>
      </div>
    </div>
  );
});

// 15:33.40 — "meses de produção"
R.set(416, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      <span className="bold">Meses</span> de producao.
    </T>
  </div>
));

// 15:37.00 — "10 da noite, destruído, dá play"
R.set(417, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showEntra = time >= 942.48;
  return (
    <div className="slide center">
      <T size={42} weight={400} opacity={0.35} anim="anim-fadeUp">10 da noite. Destruido. Da <span className="bold">play</span>.</T>
      <div style={{
        marginTop: 14,
        opacity: showEntra ? 1 : 0,
        transform: showEntra ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 48, fontWeight: 700,
          color: "#4ECDC4",
          textShadow: "0 0 30px rgba(78,205,196,0.4), 0 0 60px rgba(78,205,196,0.15)",
        }}>O ingles entra mesmo assim.</span>
      </div>
    </div>
  );
});

// 15:44.50 — "INGLÊS CANTADO"
R.set(418, () => (
  <div className="slide center">
    <div className="double-glow" />
    <div className="double-glow" />
    <Img src={staticFile("logo-ic.png")} style={{
      width: 90, height: 90,
      filter: "drop-shadow(0 0 24px rgba(78,205,196,0.4))",
      animation: "scaleIn 0.5s cubic-bezier(.16,1,.3,1) both",
    }} />
    <Spacer h={20} />
    <div style={{ animation: "scaleIn 0.5s cubic-bezier(.16,1,.3,1) 0.2s both" }}>
      <span style={{ fontSize: 70, fontWeight: 900, color: "#fff" }}>inglês</span>
      <span style={{
        fontSize: 70, fontWeight: 900,
        color: "#4ECDC4",
        textShadow: "0 0 30px rgba(78,205,196,0.4)",
      }}>cantado</span>
    </div>
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
