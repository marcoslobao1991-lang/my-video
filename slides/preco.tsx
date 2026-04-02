// ─── PREÇO (19:42 → 22:03) ───────────────────────────────────
// Audio: quanto investir → escola presencial → cursos online → IC funciona →
//        mercado <5% → deliverables → R$199 → R$99 → CTA → teste → bônus
// ~25 slides | 0 stacks | 2 graphs (263: mercado, 264: preço âncora)
// FULLSCREEN slides — designed for MAXIMUM conversion

import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import { T, Spacer, AccentLine } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerPreco(
  R: Map<number, () => React.JSX.Element>,
  useStackVisible: UseStackVisible,
) {

// 19:42.10 — "quanto investir"
R.set(700, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp">A pergunta que fica:</T>
    <Spacer h={20} />
    <T size={60} weight={700} opacity={0.9} anim="anim-blurIn" delay="d2" className="bold">
      Quanto voce precisa <span className="gradient-text">investir</span>?
    </T>
  </div>
));

// 19:45.70 — "escola presencial 300-800/mês"
R.set(701, () => (
  <div className="slide center">
    <T size={32} weight={400} opacity={0.25} anim="anim-fadeIn">Escola presencial</T>
    <Spacer h={16} />
    <div className="anim-scaleIn d2" style={{ position: "relative", display: "inline-block" }}>
      <T size={72} weight={800} opacity={0.6}>R$300 a R$800</T>
    </div>
    <Spacer h={6} />
    <T size={34} weight={400} opacity={0.25} anim="anim-fadeIn" delay="d3">por mes</T>
  </div>
));

// 19:49.30 — "12 mil reais em 2 anos"
R.set(702, () => (
  <div className="slide center">
    <T size={32} weight={400} opacity={0.2} anim="anim-fadeIn">2 anos depois:</T>
    <Spacer h={20} />
    <div className="anim-scaleIn d2" style={{ position: "relative", display: "inline-block" }}>
      <T size={100} weight={900} className="red glow-red-text">R$12.000</T>
    </div>
    <Spacer h={16} />
    <T size={38} weight={500} opacity={0.4} anim="anim-fadeUp" delay="d4">
      Pra assistir <span className="red" style={{ fontWeight: 700 }}>aulas</span>.
    </T>
  </div>
));

// 19:56.90 — "cursos online 2-3 mil"
R.set(703, () => (
  <div className="slide center">
    <T size={32} weight={400} opacity={0.25} anim="anim-fadeIn">Cursos online</T>
    <Spacer h={16} />
    <div className="anim-scaleIn d2" style={{ position: "relative", display: "inline-block" }}>
      <T size={72} weight={800} opacity={0.6}>R$2.000 a R$3.000</T>
    </div>
    <Spacer h={12} />
    <T size={38} weight={500} opacity={0.4} anim="anim-fadeUp" delay="d3">
      500 aulas. Voce assiste <span className="red" style={{ fontWeight: 700 }}>10%</span>.
    </T>
  </div>
));

// 20:04.50 — "IC funciona quando nenhum funciona" — com branding
R.set(704, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showNenhum = time >= 1206.38;
  return (
    <div className="slide center">
      <div className="double-glow" />
      <div className="double-glow" />
      {/* Logo + branding */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, animation: "scaleIn 0.5s cubic-bezier(.16,1,.3,1) both" }}>
        <Img src={staticFile("logo-ic.png")} style={{
          width: 52, height: 52,
          filter: "drop-shadow(0 0 16px rgba(78,205,196,0.3))",
        }} />
        <div>
          <span style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>inglês</span>
          <span style={{ fontSize: 36, fontWeight: 900, color: "#4ECDC4", textShadow: "0 0 20px rgba(78,205,196,0.3)" }}>cantado</span>
        </div>
      </div>
      {/* Funciona quando nenhum funciona */}
      <T size={44} weight={500} opacity={0.6} anim="anim-fadeUp" delay="d2">
        Funciona quando
      </T>
      <div style={{
        marginTop: 8,
        opacity: showNenhum ? 1 : 0,
        transform: showNenhum ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 48, fontWeight: 800,
          color: "#FF6B6B",
          textShadow: "0 0 30px rgba(255,107,107,0.4)",
        }}>nenhum outro funciona.</span>
      </div>
    </div>
  );
});

// 20:08.10 — "10h, esgotado, play, inglês entra" — com logo IC
R.set(705, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showPlay = time >= 1210.24;
  return (
    <div className="slide center">
      <div className="double-glow" />
      {/* Mini logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, opacity: 0.4 }}>
        <Img src={staticFile("logo-ic.png")} style={{ width: 28, height: 28 }} />
        <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>inglês</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#4ECDC4" }}>cantado</span>
      </div>
      <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp">10h da noite. Esgotado. Zero energia.</T>
      <div style={{
        marginTop: 20,
        opacity: showPlay ? 1 : 0,
        transform: showPlay ? "scale(1)" : "scale(0.6)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 56, fontWeight: 800,
          color: "#4ECDC4",
          textShadow: "0 0 30px rgba(78,205,196,0.4), 0 0 60px rgba(78,205,196,0.15)",
        }}>Da play. Ingles entra.</span>
      </div>
    </div>
  );
});

// 20:11.80 — GRAPH 263: Mercado <5% vs IC (fica ~8s)

// 20:19.50 — "aula virou música"
R.set(706, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={60} weight={700} opacity={0.9} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      A aula virou musica.
    </T>
  </div>
));

// 20:24.10 — "masterização, plataforma profissional"
R.set(707, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showComp = time >= 1222.52;
  const showEng = time >= 1224.12;
  const showMaster = time >= 1226.16;
  const items = [
    { show: showComp, text: "Composicao profissional" },
    { show: showEng, text: "Engenharia de audio" },
    { show: showMaster, text: "Masterizacao e edicao" },
  ];
  return (
    <div className="slide left">
      <T size={38} weight={400} opacity={0.4} anim="anim-fadeUp">
        Olha o que esta <span className="bold">dentro</span>:
      </T>
      <Spacer h={16} />
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10, marginTop: 8,
          opacity: item.show ? 1 : 0,
          transform: item.show ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#4ECDC4", boxShadow: "0 0 8px rgba(78,205,196,0.4)", flexShrink: 0,
          }} />
          <span style={{ fontSize: 30, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>{item.text}</span>
        </div>
      ))}
    </div>
  );
});

// 20:29.10 — "blocos + 5 trilhos + correção"
R.set(7071, () => (
  <div className="slide center">
    <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
      {[
        { text: "Blocos essenciais que instalam a base", delay: "d1" },
        { text: "5 trilhas que corrigem cada furo", delay: "d2" },
      ].map((item, i) => (
        <div key={i} className={`anim-slideLeft ${item.delay}`} style={{
          padding: "14px 28px", borderRadius: 14,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.04)",
          width: "100%", maxWidth: 540,
        }}>
          <T size={32} weight={400} opacity={0.5}>{item.text}</T>
        </div>
      ))}
    </div>
  </div>
));

// 20:34.60 — GRAPH 264: Preço âncora

// 20:36.30 — "discursos em música, séries cena por cena"
R.set(7072, () => (
  <div className="slide center">
    <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
      {[
        { text: "Discursos historicos transformados em musica", delay: "d1" },
        { text: "Series completas, cena por cena", delay: "d2" },
      ].map((item, i) => (
        <div key={i} className={`anim-slideLeft ${item.delay}`} style={{
          padding: "14px 28px", borderRadius: 14,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.04)",
          width: "100%", maxWidth: 540,
        }}>
          <T size={32} weight={400} opacity={0.5}>{item.text}</T>
        </div>
      ))}
    </div>
  </div>
));

// 20:40.48 — "repetição musical, único formato subconsciente"
R.set(7073, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={46} weight={700} opacity={0.85} anim="anim-scaleIn" className="teal glow-teal-text">
      Repeticao musical.
    </T>
    <Spacer h={14} />
    <T size={34} weight={400} opacity={0.3} anim="anim-fadeIn" delay="d2">
      O unico formato que instala ingles no <span className="bold">subconsciente</span>.
    </T>
  </div>
));

// 20:45.80 — "nível superior ao mercado, decidiu cobrar R$199"
// 708 — "nível superior / ia cobrar R$199 / R$2.500" progressive
R.set(708, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showCobrar = time >= 1250.14;
  const show199 = time >= 1251.44;
  const show2500 = time >= 1254.36;
  return (
    <div className="slide center">
      <T size={34} weight={400} opacity={0.25} anim="anim-fadeIn">Nivel muito superior ao mercado.</T>
      <Spacer h={20} />
      <div style={{
        opacity: showCobrar ? 1 : 0,
        transform: showCobrar ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <T size={36} weight={500} opacity={0.4}>A gente ia cobrar:</T>
      </div>
      <div style={{
        marginTop: 14,
        opacity: show199 ? 1 : 0,
        transform: show199 ? "scale(1)" : "scale(0.6)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{ fontSize: 80, fontWeight: 900, color: "#fff" }}>R$199</span>
        <span style={{ fontSize: 40, fontWeight: 400, opacity: 0.4, marginLeft: 8 }}>/mes</span>
      </div>
      <div style={{
        marginTop: 8,
        opacity: show2500 ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        <span style={{ fontSize: 28, opacity: 0.2 }}>menos de R$2.500 por ano</span>
      </div>
    </div>
  );
});

// 20:55.70 — "conteúdo que seu cérebro aguenta"
R.set(7081, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.55} anim="anim-blurIn">
      O tipo de conteudo que o seu cerebro
    </T>
    <Spacer h={8} />
    <T size={48} weight={700} opacity={0.8} anim="anim-blurIn" delay="d2" className="teal glow-teal-text">
      aguenta.
    </T>
  </div>
));

// 20:58.20 — "teste de mercado, assinatura anual R$99"
R.set(709, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showTeste = time >= 1259.34;
  return (
    <div className="slide center">
      <div className="double-glow" />
      <T size={36} weight={400} opacity={0.3} anim="anim-fadeUp">
        A gente resolveu fazer um
      </T>
      <div style={{
        marginTop: 16,
        opacity: showTeste ? 1 : 0,
        transform: showTeste ? "scale(1)" : "scale(0.6)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 56, fontWeight: 900, color: "#fff",
        }}>teste de mercado.</span>
      </div>
    </div>
  );
});

// 21:02.30 — "R$99 POR MÊS" — THE MONEY SHOT
R.set(710, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={28} weight={500} opacity={0.25} anim="anim-fadeIn">Acesso completo por apenas</T>
    <Spacer h={20} />
    <T size={120} weight={900} opacity={1} anim="anim-scaleIn" delay="d1" className="gradient-animated glow-gradient-text">
      R$99/mes
    </T>
    <Spacer h={10} />
    <T size={34} weight={500} opacity={0.3} anim="anim-fadeIn" delay="d3">plano anual</T>
    <Spacer h={28} />
    <div className="anim-fadeUp d5" style={{
      padding: "10px 28px", borderRadius: 50,
      background: "rgba(78,205,196,0.08)",
      border: "1px solid rgba(78,205,196,0.15)",
    }}>
      <T size={26} weight={600} opacity={0.5} className="teal">menos que R$3,30 por dia</T>
    </div>
  </div>
));

// 21:05.90 — "acesso a tudo" — STACK synced to speech
R.set(711, () => {
  const v = [
    useStackVisible(711, 0),
    useStackVisible(711, 1),
    useStackVisible(711, 2),
    useStackVisible(711, 3),
    useStackVisible(711, 4),
  ];
  return (
  <div className="slide center">
    <T size={42} weight={600} opacity={0.5} anim="anim-fadeIn">Com acesso a <span className="bold">tudo</span>:</T>
    <Spacer h={32} />
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 560, alignItems: "stretch" }}>
      {[
        { text: "Blocos essenciais", show: v[0] },
        { text: "5 trilhas completas", show: v[1] },
        { text: "Discursos historicos", show: v[2] },
        { text: "Series cantadas", show: v[3] },
        { text: "Material bilingue completo", show: v[4] },
      ].map((item, i) => item.show && (
        <div key={i} className="anim-slideLeft" style={{
          display: "flex", alignItems: "center", gap: 16,
          padding: "16px 24px", borderRadius: 14,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}>
          <span className="teal" style={{ fontSize: 24, fontWeight: 700 }}>✓</span>
          <T size={40} weight={500} opacity={0.65}>{item.text}</T>
        </div>
      ))}
    </div>
  </div>
  );
});

// 21:13.30 — "menos que a academia que você não vai"
R.set(712, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={48} weight={500} opacity={0.7} anim="anim-blurIn">
      Menos que a <span className="bold">academia</span>
    </T>
    <Spacer h={8} />
    <T size={48} weight={500} opacity={0.7} anim="anim-blurIn" delay="d2">
      que voce <span className="red" style={{ fontWeight: 700 }}>nao vai</span>.
    </T>
  </div>
));

// 20:29.12 — mega stack: tudo que está dentro
R.set(84, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const items = [
    { text: "Blocos essenciais — base do zero", time: 1229.12, color: "#4ECDC4" },
    { text: "5 trilhas que corrigem cada furo", time: 1231.20, color: "#4ECDC4" },
    { text: "Discursos historicos em musica", time: 1234.64, color: "#A78BFA" },
    { text: "Series completas, cena por cena", time: 1236.82, color: "#A78BFA" },
    { text: "Producao profissional", time: 1239.14, color: "#fff" },
  ];
  const showRepeticao = time >= 1240.48;
  return (
    <div className="slide left">
      <T size={32} weight={400} opacity={0.3} anim="anim-fadeIn">Olha o que esta dentro:</T>
      <Spacer h={14} />
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10, marginTop: 8,
          opacity: time >= item.time ? 1 : 0,
          transform: time >= item.time ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: item.color, boxShadow: `0 0 8px ${item.color}40`, flexShrink: 0,
          }} />
          <span style={{ fontSize: 26, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>{item.text}</span>
        </div>
      ))}
      <div style={{
        marginTop: 18,
        opacity: showRepeticao ? 1 : 0,
        transform: showRepeticao ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <span style={{
          fontSize: 30, fontWeight: 800,
          background: "linear-gradient(135deg, #4ECDC4, #A78BFA)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Tudo em cima da repeticao musical.</span>
      </div>
    </div>
  );
});

// 21:02.02 — "ser fluente vale mais que R$99?"
R.set(83, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showFluente = time >= 1283.32;
  const showR99 = time >= 1284.54;
  return (
    <div className="slide center">
      <div className="double-glow" />
      <T size={40} weight={400} opacity={0.4} anim="anim-fadeUp">
        Se voce acha que ser
      </T>
      <div style={{
        marginTop: 10,
        opacity: showFluente ? 1 : 0,
        transform: showFluente ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 60, fontWeight: 900,
          background: "linear-gradient(135deg, #4ECDC4, #A78BFA)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 20px rgba(78,205,196,0.4))",
        }}>FLUENTE</span>
      </div>
      <div style={{
        marginTop: 10,
        opacity: showR99 ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        <T size={38} weight={400} opacity={0.4}>
          vale mais que <span className="bold">R$99 por mes</span>...
        </T>
      </div>
    </div>
  );
});

// 21:11.80 — CTA PRINCIPAL
R.set(713, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">
      Se ser <span className="teal" style={{ fontWeight: 700 }}>fluente</span> vale mais que
    </T>
    <Spacer h={12} />
    <T size={72} weight={900} opacity={1} anim="anim-scaleIn" delay="d1" className="gradient-animated glow-gradient-text">
      R$99 mensais
    </T>
    <Spacer h={30} />
    <T size={34} weight={600} opacity={0.5} anim="anim-fadeIn" delay="d3" className="gradient-text">
      comeca agora
    </T>
    <Spacer h={20} />
    <svg width="60" height="80" viewBox="0 0 60 80" className="anim-fadeUp d4" style={{ filter: "drop-shadow(0 0 20px rgba(78,205,196,0.4))" }}>
      <defs>
        <linearGradient id="arrowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path d="M30 0 L30 60 M10 45 L30 68 L50 45" stroke="url(#arrowGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </div>
));

// 21:31.90 — "por que tão barato?"
R.set(714, () => (
  <div className="slide center">
    <T size={38} weight={400} opacity={0.3} anim="anim-fadeUp">
      "Mas por que tao barato?"
    </T>
    <Spacer h={24} />
    <T size={52} weight={700} opacity={0.8} anim="anim-scaleIn" delay="d2" className="bold">
      Isso e um <span className="teal">teste</span>.
    </T>
  </div>
));

// 21:39.50 — "provavelmente errado em cobrar tão barato"
R.set(715, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={44} weight={500} opacity={0.55} anim="anim-blurIn">
      Provavelmente <span className="bold">errado</span> em cobrar
    </T>
    <Spacer h={8} />
    <T size={52} weight={700} opacity={0.9} anim="anim-scaleIn" delay="d2" className="teal glow-teal-text">
      tao barato.
    </T>
  </div>
));

// 21:43.90 — "BÔNUS: Rota da Fluência"
R.set(716, () => (
  <div className="slide center">
    <div className="anim-scaleIn" style={{
      padding: "8px 24px", borderRadius: 50, marginBottom: 20,
      background: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(78,205,196,0.08))",
      border: "1px solid rgba(167,139,250,0.2)",
    }}>
      <T size={24} weight={700} opacity={0.6} className="purple">BONUS EXCLUSIVO</T>
    </div>
    <T size={56} weight={800} opacity={0.9} anim="anim-blurIn" delay="d2" className="bold">
      Rota da Fluencia.
    </T>
    <Spacer h={16} />
    <T size={36} weight={400} opacity={0.35} anim="anim-fadeUp" delay="d3">
      Series conversacionais completas.
    </T>
    <Spacer h={8} />
    <T size={36} weight={500} opacity={0.5} anim="anim-fadeUp" delay="d4">
      Sozinho ja vale o investimento.
    </T>
  </div>
));

// 21:48.40 — "séries conversacionais"
R.set(7161, () => (
  <div className="slide center">
    <T size={44} weight={500} opacity={0.55} anim="anim-blurIn">
      Series que voce <span className="teal" style={{ fontWeight: 700 }}>ouve no carro</span>.
    </T>
    <Spacer h={10} />
    <T size={44} weight={500} opacity={0.55} anim="anim-blurIn" delay="d2">
      No chuveiro. No fone.
    </T>
  </div>
));

// 21:55.20 — "acredita tanto que tá disposto a testar"
R.set(717, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showTestar = time >= 1319.10;
  return (
    <div className="slide center">
      <div className="double-glow" />
      <T size={44} weight={400} opacity={0.5} anim="anim-fadeUp">
        A gente <span className="gradient-text" style={{ fontWeight: 800 }}>acredita</span> tanto no que construiu
      </T>
      <div style={{
        marginTop: 14,
        opacity: showTestar ? 1 : 0,
        transform: showTestar ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 52, fontWeight: 800, color: "#fff",
        }}>que ta disposto a testar.</span>
      </div>
    </div>
  );
});

// 22:02.50 — CTA FINAL repeat
R.set(718, () => (
  <div className="slide center">
    <div className="double-glow" />
    <T size={40} weight={500} opacity={0.5} anim="anim-fadeUp">Enquanto estiver no ar:</T>
    <Spacer h={32} />
    <svg width="50" height="70" viewBox="0 0 50 70" className="anim-fadeUp d5" style={{ filter: "drop-shadow(0 0 20px rgba(78,205,196,0.4))" }}>
      <defs>
        <linearGradient id="arrowGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path d="M25 0 L25 50 M8 38 L25 58 L42 38" stroke="url(#arrowGrad2)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </div>
));

} // end registerPreco
