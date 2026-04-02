// ─── EMOCIONAL (17:50 → 19:42) ───────────────────────────────
// Audio: chuveiro cantando → série sem legenda → entende → não decorou →
//        segundo episódio → embolado vira forma → desce do avião → vaga dobro →
//        trânsito/academia instalando → porque deu play
// ~20 slides | 0 stacks

import React from "react";
import { useCurrentFrame } from "remotion";
import { T, Spacer, AccentLine } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerEmocional(
  R: Map<number, () => React.JSX.Element>,
  _useStackVisible: UseStackVisible,
) {

// 17:53.00 — "chuveiro, trânsito, lavando louça — cantando em inglês"
R.set(600, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      No chuveiro. No transito. Lavando louca.
    </T>
    <Spacer h={16} />
    <T size={48} weight={600} opacity={0.75} anim="anim-scaleIn" delay="d2" className="teal glow-teal-text">
      Cantando em ingles.
    </T>
  </div>
));

// 18:00.20 — "primeiro sinal"
R.set(601, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      O primeiro sinal de que o cerebro <span className="bold">gravou</span>.
    </T>
  </div>
));

// 18:07.90 — "abre a série, cena real toca"
R.set(602, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      Abre a serie. <span className="bold">Cena real</span> toca.
    </T>
  </div>
));

// 18:15.20 — "30, 40 vezes em música"
R.set(603, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      As mesmas falas que voce ouviu <span className="bold">30, 40 vezes</span>.
    </T>
  </div>
));

// 17:57.54 — "sem letra, sem música / E VOCÊ ENTENDE" @ 1101.96
R.set(604, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showEntende = time >= 1101.96;
  return (
    <div className="slide center">
      <T size={42} weight={400} opacity={0.35} anim="anim-fadeUp">Sem letra. Sem musica.</T>
      <div style={{
        marginTop: 16,
        opacity: showEntende ? 1 : 0,
        transform: showEntende ? "scale(1)" : "scale(0.6)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 52, fontWeight: 800,
          background: "linear-gradient(135deg, #4ECDC4, #A78BFA)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 30px rgba(78,205,196,0.4)) drop-shadow(0 0 60px rgba(167,139,250,0.2))",
        }}>E voce entende.</span>
      </div>
    </div>
  );
});

// 18:30.80 — "inglês já estava lá, gravado por música"
R.set(605, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.55} anim="anim-blurIn">
      O ingles ja estava la. Gravado por <span className="teal" style={{ fontWeight: 600 }}>musica</span>.
    </T>
  </div>
));

// 18:38.30 — "essa sensação não tem comparação"
R.set(606, () => (
  <div className="slide center">
    <T size={48} weight={600} opacity={0.7} anim="anim-fadeUp" className="gradient-text">
      Sem comparacao.
    </T>
  </div>
));

// 18:46.30 — "segundo episódio, mais fácil"
R.set(607, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Segundo episodio: <span className="teal" style={{ fontWeight: 600 }}>mais facil</span>.
    </T>
  </div>
));

// 18:49.80 — "terceiro, antecipa as falas"
R.set(608, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Terceiro: <span className="bold">antecipa</span> as falas.
    </T>
  </div>
));

// 18:57.30 — "embolado começa a ter forma"
R.set(609, () => (
  <div className="slide center">
    <T size={42} weight={400} opacity={0.35} anim="anim-fadeUp"><span className="red">Embolado</span></T>
    <Spacer h={14} />
    <T size={48} weight={600} opacity={0.75} anim="anim-blurIn" delay="d2" className="gradient-text">
      comeca a ter forma.
    </T>
  </div>
));

// 19:04.60 — "inglês vira prazer"
R.set(610, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={52} weight={700} opacity={0.9} anim="anim-scaleIn" className="teal glow-teal-text">
      Ingles vira prazer.
    </T>
  </div>
));

// 19:08.80 — "desce do avião"
R.set(611, () => (
  <div className="slide left">
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
      Desce do aviao. Orlando. Lisboa.
    </T>
    <Spacer h={10} />
    <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft" delay="d2">
      Pede o Uber. Faz check-in. Conversa com o atendente.
    </T>
  </div>
));

// 19:15.02 — "sem abrir o Google Tradutor"
R.set(74, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.55} anim="anim-fadeUp">
      Sem abrir o <span className="bold">Google Tradutor</span>.
    </T>
    <Spacer h={12} />
    <T size={38} weight={400} opacity={0.3} anim="anim-fadeIn" delay="d2">
      Porque o ingles ja esta ali <span className="teal" style={{ fontWeight: 600 }}>instalado</span>.
    </T>
  </div>
));

// 19:19.40 — "vaga que paga o dobro — inglês fluente"
R.set(612, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showFluente = time >= 1165.18;
  const showAba = time >= 1168.46;
  return (
    <div className="slide center">
      <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
        Vaga que paga o <span className="bold">dobro</span>.
      </T>
      <div style={{
        marginTop: 14,
        opacity: showFluente ? 1 : 0,
        transform: showFluente ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 48, fontWeight: 700,
          color: "#4ECDC4",
          textShadow: "0 0 30px rgba(78,205,196,0.4)",
        }}>Ingles fluente.</span>
      </div>
      <div style={{
        marginTop: 10,
        opacity: showAba ? 1 : 0,
        transform: showAba ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={40} weight={400} opacity={0.35}>
          Voce <span className="bold">nao fecha</span> a aba.
        </T>
      </div>
    </div>
  );
});

// 19:30.70 — "trânsito, academia, fone — instalando fluência"
R.set(613, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Momentos que antes eram <span className="red">desperdicados</span>.
    </T>
    <Spacer h={14} />
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp" delay="d2">
      Agora instalando <span className="teal" style={{ fontWeight: 600 }}>fluencia</span>.
    </T>
  </div>
));

// 19:38.60 — "porque você deu PLAY"
R.set(614, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={56} weight={700} opacity={0.9} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      Porque voce deu play.
    </T>
  </div>
));

} // end registerEmocional
