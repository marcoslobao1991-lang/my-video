// ─── CLOSE (22:03 → 24:24) ───────────────────────────────────
// Audio: checkout → não sei cantar → 30 dias garantia → reembolso →
//        funcionou pros piores → gostoso de verdade → e se funcionar →
//        formato nunca foi feito pra você → músicas têm inglês → CTA final
// ~20 slides | 0 stacks

import React from "react";
import { staticFile } from "remotion";
import { T, Spacer, AccentLine } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerClose(
  R: Map<number, () => React.JSX.Element>,
  _useStackVisible: UseStackVisible,
) {

// 22:06.20 — "checkout seguro processado pela Pagar.me"
R.set(800, () => (
  <div className="slide center">
    <div className="double-glow" />

    {/* Shield grande */}
    <svg width="100" height="110" viewBox="0 0 70 80" className="anim-scaleIn" style={{ marginBottom: 28, filter: "drop-shadow(0 0 30px rgba(78,205,196,0.4))" }}>
      <defs>
        <linearGradient id="lockGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path d="M35 4 L64 18 L64 40 C64 58 48 72 35 78 C22 72 6 58 6 40 L6 18 Z" fill="none" stroke="url(#lockGrad)" strokeWidth="2.5" />
      <rect x="23" y="34" width="24" height="18" rx="4" fill="none" stroke="url(#lockGrad)" strokeWidth="2" />
      <path d="M29 34 V28 C29 22 41 22 41 28 V34" fill="none" stroke="url(#lockGrad)" strokeWidth="2" />
      <circle cx="35" cy="43" r="3" fill="url(#lockGrad)" />
    </svg>

    <T size={56} weight={800} opacity={0.9} anim="anim-fadeUp" delay="d1" className="bold">
      Pagamento 100% seguro.
    </T>

    <Spacer h={40} />

    {/* Card Pagar.me grande */}
    <div className="anim-scaleIn d3" style={{
      padding: "32px 56px", borderRadius: 24,
      background: "linear-gradient(145deg, rgba(78,205,196,0.06), rgba(255,255,255,0.02))",
      border: "1px solid rgba(78,205,196,0.12)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
      boxShadow: "0 0 40px rgba(78,205,196,0.06)",
    }}>
      <T size={32} weight={400} opacity={0.4}>processado por</T>
      <img src={staticFile("photos/pagarme.svg")} style={{ height: 64, opacity: 0.9 }} />
      <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, rgba(78,205,196,0.3), transparent)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <img src={staticFile("photos/stone.png")} style={{ height: 44, opacity: 0.6 }} />
        <T size={30} weight={500} opacity={0.4}>Grupo Stone</T>
      </div>
      <T size={26} weight={400} opacity={0.25}>Empresa listada na Nasdaq — NYSE: STNE</T>
    </div>

    <Spacer h={24} />
    <T size={30} weight={400} opacity={0.25} anim="anim-fadeIn" delay="d6">
      Seus dados protegidos com criptografia bancaria.
    </T>
  </div>
));

// 22:12.00 — "login e senha em menos de 1 minuto"
R.set(8001, () => (
  <div className="slide center">
    <T size={40} weight={400} opacity={0.35} anim="anim-fadeUp">Menos de 1 minuto.</T>
    <Spacer h={14} />
    <T size={46} weight={600} opacity={0.7} anim="anim-blurIn" delay="d2">
      Login e senha no seu <span className="teal" style={{ fontWeight: 700 }}>e-mail</span>.
    </T>
  </div>
));

// 22:17.10 — "começar a ouvir hoje"
R.set(801, () => (
  <div className="slide center">
    <T size={48} weight={600} opacity={0.7} anim="anim-blurIn">
      Comecar a ouvir <span className="gradient-text" style={{ fontWeight: 800 }}>hoje</span>.
    </T>
  </div>
));

// 22:20.60 — "não sei cantar"
R.set(802, () => (
  <div className="slide center">
    <T size={48} weight={500} opacity={0.5} anim="anim-fadeUp">
      <span className="red" style={{ fontStyle: "italic" }}>"Eu nao sei cantar."</span>
    </T>
  </div>
));

// 22:26.00 — "não pedi pra cantar, vai ouvir"
R.set(8021, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Nao pedi pra cantar.
    </T>
    <Spacer h={16} />
    <T size={50} weight={700} opacity={0.8} anim="anim-scaleIn" delay="d2">
      Voce vai <span className="teal" style={{ fontWeight: 800 }}>ouvir</span>.
    </T>
  </div>
));

// 22:32.00 — "coloca o fone, dá play"
R.set(8022, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
      Coloca o fone. Da <span className="teal" style={{ fontWeight: 600 }}>play</span>.
    </T>
    <Spacer h={8} />
    <T size={38} weight={400} opacity={0.3} anim="anim-fadeUp" delay="d2">
      Seu ouvido faz o trabalho pesado.
    </T>
  </div>
));

// 22:35.60 — "só dar play"
R.set(803, () => (
  <div className="slide center">
    <T size={52} weight={700} opacity={0.8} anim="anim-scaleIn" className="gradient-text">
      So dar play.
    </T>
  </div>
));

// ════════════════════════════════════════════════════════════
// BLOCO GARANTIA — FULLSCREEN SURREAL
// ════════════════════════════════════════════════════════════

// 22:39.60 — "30 DIAS" — GARANTIA HERO
R.set(804, () => (
  <div className="slide center">
    <div className="double-glow" />
    {/* Shield icon */}
    <svg width="80" height="90" viewBox="0 0 80 90" className="anim-scaleIn" style={{ marginBottom: 20, filter: "drop-shadow(0 0 30px rgba(78,205,196,0.4))" }}>
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path d="M40 5 L72 20 L72 45 C72 65 55 80 40 87 C25 80 8 65 8 45 L8 20 Z" fill="none" stroke="url(#shieldGrad)" strokeWidth="3" />
      <text x="40" y="52" textAnchor="middle" fill="url(#shieldGrad)" fontSize="28" fontWeight="900">✓</text>
    </svg>
    <T size={90} weight={900} opacity={1} anim="anim-scaleIn" delay="d1" className="gradient-animated glow-gradient-text">
      30 DIAS.
    </T>
    <Spacer h={8} />
    <T size={40} weight={500} opacity={0.4} anim="anim-fadeIn" delay="d3">
      Pra decidir. <span className="bold">Nao 7.</span>
    </T>
    <Spacer h={6} />
    <T size={36} weight={400} opacity={0.25} anim="anim-fadeIn" delay="d4">
      30 dias completos.
    </T>
  </div>
));

// 22:47.30 — "100% reembolso" — GARANTIA DETAIL
R.set(805, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={80} weight={900} opacity={1} anim="anim-scaleIn" className="teal glow-teal-text">
      100%
    </T>
    <Spacer h={4} />
    <T size={44} weight={600} opacity={0.6} anim="anim-fadeUp" delay="d2">
      do seu investimento de volta.
    </T>
    <Spacer h={28} />
    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
      {[
        "Um clique dentro da plataforma",
        "Sem explicar nada",
        "Sem pedir ajuda",
        "Sem avisar ninguem",
      ].map((item, i) => (
        <div key={i} className={`anim-slideLeft d${i + 1}`} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="teal" style={{ fontSize: 18 }}>✓</span>
          <T size={30} weight={400} opacity={0.4}>{item}</T>
        </div>
      ))}
    </div>
  </div>
));

// 22:58.30 — "a decisão é sua"
R.set(806, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={48} weight={600} opacity={0.7} anim="anim-blurIn">
      A decisao e <span className="gradient-text" style={{ fontWeight: 800 }}>sua</span>.
    </T>
    <Spacer h={12} />
    <T size={42} weight={400} opacity={0.35} anim="anim-fadeUp" delay="d2">
      A um clique de distancia.
    </T>
  </div>
));

// 23:05.60 — "a gente sabe o que acontece quando dá play"
R.set(807, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.55} anim="anim-blurIn">
      A gente <span className="bold">sabe</span> o que acontece
    </T>
    <Spacer h={8} />
    <T size={44} weight={500} opacity={0.55} anim="anim-blurIn" delay="d2">
      quando voce da <span className="teal" style={{ fontWeight: 700 }}>play</span>.
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
