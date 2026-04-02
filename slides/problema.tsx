// ─── PROBLEMA (2:45 → 7:30) ──────────────────────────────────
// Audio: Outro grupo crescendo → desistência → 15h vs 150h → Kris Nielson →
//        Todo curso = AULA → rotina real → fadiga cognitiva → Johns Hopkins →
//        A culpa é do FORMATO → 95% mesmo resultado
// ~45 slides | 3 stacks | 5 graphs (258, 259, 260, 267, 268)

import React from "react";
import { staticFile, useCurrentFrame } from "remotion";
import { T, Spacer, AccentLine } from "./components";

type UseStackVisible = (slide: number, itemIndex: number) => boolean;

export function registerProblema(
  R: Map<number, () => React.JSX.Element>,
  useStackVisible: UseStackVisible,
) {

// 2:45.20 — "POR QUE VOCÊ NÃO APRENDEU?" — punch transition
R.set(56, () => (
  <div className="slide center">
    <div className="glow-red" style={{ top: "30%", left: "20%" }} />
    <div className="glow-red" style={{ bottom: "30%", right: "20%" }} />
    <T size={22} weight={600} opacity={0.3} anim="anim-fadeIn" style={{ letterSpacing: 4 }}>
      POR QUE VOCE
    </T>
    <Spacer h={12} />
    <T size={64} weight={900} opacity={1} anim="anim-scaleIn" delay="d2" className="glow-red-text">
      <span className="red">NAO APRENDEU INGLES?</span>
    </T>
  </div>
));

// 2:48.20 — "todos passam"
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

// 2:54.70 — "destravaram de verdade" + bullets synced
R.set(102, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  // 179.66 "trabalha", 181.04 "sem legenda", 181.82 "viaja"
  const showTrabalha = time >= 179.66;
  const showLegenda = time >= 181.04;
  const showViaja = time >= 181.82;
  return (
    <div className="slide left">
      <T size={44} weight={400} opacity={0.45} anim="anim-slideLeft">
        Milhares destravaram o ingles <span className="teal" style={{ fontWeight: 600 }}>de verdade</span>.
      </T>
      <Spacer h={20} />
      {[
        { show: showTrabalha, text: "Trabalha em ingles", delay: 0 },
        { show: showLegenda, text: "Series sem legenda", delay: 0 },
        { show: showViaja, text: "Viaja o mundo", delay: 0 },
      ].map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10,
          marginTop: 10,
          opacity: item.show ? 1 : 0,
          transform: item.show ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#4ECDC4",
            boxShadow: "0 0 8px rgba(78,205,196,0.4)",
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 30, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
});

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

// 3:09.36 — "queriam a fluência" → "desistiam e não voltavam"
R.set(105, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showDesistiam = time >= 191.62;
  return (
    <div className="slide center">
      <T size={44} weight={500} opacity={0.5} anim="anim-fadeUp">
        Queriam a <span className="teal" style={{ fontWeight: 700 }}>fluencia</span>.
      </T>
      <div style={{
        opacity: showDesistiam ? 1 : 0,
        transform: showDesistiam ? "translateY(0)" : "translateY(15px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        marginTop: 20,
      }}>
        <T size={50} weight={700} opacity={0.9}>
          <span className="red" style={{ fontWeight: 800 }}>Desistiam</span> e nao voltavam mais.
        </T>
      </div>
    </div>
  );
});

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

// 3:58.70 — "não eram mais inteligentes" + "persistiram" @ 242.54s
R.set(110, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showPersistiram = time >= 242.54;
  return (
    <div className="slide center">
      <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">
        Nao eram mais <span className="bold">inteligentes</span>.
      </T>
      <div style={{
        opacity: showPersistiram ? 1 : 0,
        transform: showPersistiram ? "translateY(0)" : "translateY(15px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        marginTop: 12,
      }}>
        <T size={46} weight={500} opacity={0.55}>
          So <span className="teal" style={{ fontWeight: 600 }}>persistiram</span> mais.
        </T>
      </div>
    </div>
  );
});

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

// 4:16.28 — "padrão idêntico" + stack: preço, metodologia, professor
R.set(113, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showPreco = time >= 257.90;
  const showMetodo = time >= 258.70;
  const showProf = time >= 260.70;
  return (
    <div className="slide left">
      <T size={46} weight={500} opacity={0.55} anim="anim-fadeUp">
        O <span className="bold">padrao</span> era identico em <span className="bold">todo lugar</span>.
      </T>
      <Spacer h={20} />
      {[
        { show: showPreco, text: "Nao importava o preco", color: "red" },
        { show: showMetodo, text: "Nao importava a metodologia", color: "red" },
        { show: showProf, text: "Nem a qualidade do professor", color: "red" },
      ].map((item, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 10, marginTop: 10,
          opacity: item.show ? 1 : 0,
          transform: item.show ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#FF6B6B", boxShadow: "0 0 8px rgba(255,107,107,0.4)", flexShrink: 0,
          }} />
          <span style={{ fontSize: 28, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>{item.text}</span>
        </div>
      ))}
    </div>
  );
});

// 4:21.90 — GRAPH 260: 90% abandono (fica ~7s)

// 4:29.00 — "Kris Nielson — 150 funcionários"
R.set(114, () => (
  <div className="slide left">
    <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="anim-slideLeft">
      <img src={staticFile("photos/nielson.jpg")} style={{
        width: 90, height: 90, borderRadius: "50%", objectFit: "cover",
        border: "2px solid rgba(78,205,196,0.4)",
        boxShadow: "0 0 20px rgba(78,205,196,0.15)",
      }} />
      <div>
        <T size={48} weight={600} opacity={0.7}><span className="bold">Kris Nielson</span>.</T>
        <T size={32} weight={400} opacity={0.3}>Pesquisadora — 2014</T>
      </div>
    </div>
    <Spacer h={12} />
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

// 4:55.70 — "Todo curso = AULA" — AULA synced @ 300.18s
R.set(119, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showAula = time >= 299.88;
  return (
    <div className="slide center">
      <T size={40} weight={400} opacity={0.35} anim="anim-fadeUp">Todo curso gira em torno de uma coisa.</T>
      <div style={{
        marginTop: 20,
        opacity: showAula ? 1 : 0,
        transform: showAula ? "scale(1)" : "scale(0.6)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.16,1,.3,1)",
      }}>
        <span style={{
          fontSize: 80, fontWeight: 900,
          color: "#FF6B6B",
          textShadow: "0 0 40px rgba(255,107,107,0.4), 0 0 80px rgba(255,107,107,0.15)",
        }}>
          AULA.
        </span>
      </div>
    </div>
  );
});

// 5:02.60 — "muda embalagem" → vídeo/vivo/jogo/VR progressivo
R.set(120, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showVideo = time >= 303.26;
  const showVivo = time >= 304.00;
  const showJogo = time >= 304.56;
  const showVR = time >= 306.06;
  const showMesma = time >= 309.02;
  const items = [
    { show: showVideo, text: "Video" },
    { show: showVivo, text: "Ao vivo" },
    { show: showJogo, text: "Jogo" },
    { show: showVR, text: "Realidade virtual" },
  ];
  return (
    <div className="slide left">
      <T size={40} weight={400} opacity={0.35} anim="anim-slideLeft">Muda a embalagem.</T>
      <Spacer h={14} />
      {items.map((item, i) => (
        <div key={i} style={{
          opacity: item.show ? 1 : 0,
          transform: item.show ? "translateX(0)" : "translateX(-20px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          marginTop: 8,
        }}>
          <span style={{ fontSize: 38, fontWeight: 500, color: "rgba(255,255,255,0.45)" }}>{item.text}.</span>
        </div>
      ))}
    </div>
  );
});

// 5:10.40 — STACK: sentar / prestar atenção / processar / energia mental
R.set(121, () => {
  const v = [useStackVisible(121, 0), useStackVisible(121, 1), useStackVisible(121, 2), useStackVisible(121, 3)];
  return (
    <div className="slide left">
      <T size={38} weight={400} opacity={0.35} anim="anim-fadeIn">
        Todos pedem a <span className="bold">mesma coisa</span>:
      </T>
      <Spacer h={16} />
      {v[0] && <T size={46} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">Sentar.</T>}
      {v[0] && <Spacer h={12} />}
      {v[1] && <T size={46} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">Prestar atencao.</T>}
      {v[1] && <Spacer h={12} />}
      {v[2] && <T size={46} weight={600} opacity={0.7} anim="anim-slideLeft" className="bold">Processar informacao.</T>}
      {v[2] && <Spacer h={12} />}
      {v[3] && <span style={{ fontSize: 46, fontWeight: 700, color: "#FF6B6B", textShadow: "0 0 40px rgba(255,107,107,0.4), 0 0 80px rgba(255,107,107,0.15)", animation: "slideLeft 0.7s ease both" }}>Gastar energia mental.</span>}
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

// 5:32.30 — replaced by graph 57 (energy drain)

// 5:42.80 — "chega de noite"
R.set(58, () => (
  <div className="slide center">
    <T size={46} weight={500} opacity={0.5} anim="anim-fadeUp">
      Chega de <span className="bold">noite</span>.
    </T>
  </div>
));

// 5:43.86 — "curso pede pra sentar e prestar atenção"
R.set(127, () => (
  <div className="slide center">
    <T size={44} weight={400} opacity={0.45} anim="anim-fadeUp">
      E ai um curso pede pra voce <span className="red" style={{ fontWeight: 700 }}>sentar e prestar atencao</span>.
    </T>
  </div>
));

// 5:48.80 — "ou não faz, ou abre e não presta atenção"
// → followed by:

// 5:52.12 — "cérebro no limite do cansaço"
R.set(59, () => (
  <div className="slide center">
    <T size={46} weight={600} opacity={0.8} anim="anim-scaleIn" className="glow-red-text">
      Seu cerebro ja esta no <span className="red" style={{ fontWeight: 800 }}>limite do cansaco</span>.
    </T>
  </div>
));

// 5:55.00 — "academia que você não vai"
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
    <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="anim-slideLeft">
      <img src={staticFile("photos/jhu_logo.png")} style={{
        width: 90, height: 90, borderRadius: 16, objectFit: "contain",
        background: "rgba(255,255,255,0.05)", padding: 10,
        border: "2px solid rgba(78,205,196,0.4)",
        boxShadow: "0 0 20px rgba(78,205,196,0.15)",
      }} />
      <div>
        <T size={52} weight={700} opacity={0.8}><span className="bold">Johns Hopkins</span>.</T>
        <T size={32} weight={400} opacity={0.3}>2024</T>
      </div>
    </div>
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
    <T size={70} weight={900} opacity={1} anim="anim-scaleIn" className="red glow-red-text">
      FADIGA COGNITIVA.
    </T>
  </div>
));

// 6:39.80 — GRAPH 268: Fadiga timeline (fica ~5s)

// 6:41.64 — chain: NÃO ENTRA → DESISTE → CULPA (synced word-level)
R.set(62, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  // 405.28 "não entra", 407.90 "desistir", 409.86 "culpado"
  const showEntra = time >= 405.28;
  const showDesiste = time >= 407.90;
  const showCulpa = time >= 409.86;

  const nodeStyle = (show: boolean): React.CSSProperties => ({
    padding: "12px 24px",
    borderRadius: 14,
    background: show ? "rgba(255,107,107,0.08)" : "rgba(255,255,255,0.02)",
    border: `1.5px solid ${show ? "rgba(255,107,107,0.2)" : "rgba(255,255,255,0.04)"}`,
    opacity: show ? 1 : 0.15,
    transform: show ? "scale(1)" : "scale(0.85)",
    transition: "all 0.4s cubic-bezier(.16,1,.3,1)",
    boxShadow: show ? "0 0 24px rgba(255,107,107,0.15)" : "none",
  });

  return (
    <div className="slide center">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={nodeStyle(showEntra)}>
          <span style={{
            fontSize: 24, fontWeight: 800,
            color: showEntra ? "#FF6B6B" : "rgba(255,255,255,0.3)",
            textShadow: showEntra ? "0 0 20px rgba(255,107,107,0.3)" : "none",
            transition: "color 0.4s ease",
          }}>NÃO ENTRA</span>
        </div>

        <span style={{
          fontSize: 24, opacity: showDesiste ? 0.5 : 0.1,
          color: "#FF6B6B", transition: "opacity 0.4s ease",
        }}>→</span>

        <div style={nodeStyle(showDesiste)}>
          <span style={{
            fontSize: 24, fontWeight: 800,
            color: showDesiste ? "#FF6B6B" : "rgba(255,255,255,0.3)",
            textShadow: showDesiste ? "0 0 20px rgba(255,107,107,0.3)" : "none",
            transition: "color 0.4s ease",
          }}>DESISTE</span>
        </div>

        <span style={{
          fontSize: 24, opacity: showCulpa ? 0.5 : 0.1,
          color: "#FF6B6B", transition: "opacity 0.4s ease",
        }}>→</span>

        <div style={nodeStyle(showCulpa)}>
          <span style={{
            fontSize: 24, fontWeight: 800,
            color: showCulpa ? "#FF6B6B" : "rgba(255,255,255,0.3)",
            textShadow: showCulpa ? "0 0 20px rgba(255,107,107,0.3)" : "none",
            transition: "color 0.4s ease",
          }}>CULPA</span>
        </div>
      </div>
    </div>
  );
});

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

// 7:21.00 — "o problema nunca foi O QUE... e sim o jeito"
R.set(145, () => {
  const frame = useCurrentFrame();
  const time = frame / 30;
  const showJeito = time >= 446.40;
  return (
    <div className="slide center">
      <T size={44} weight={400} opacity={0.4} anim="anim-fadeUp">
        O problema nunca foi <span className="bold">o que</span> ensinavam.
      </T>
      <div style={{
        marginTop: 16,
        opacity: showJeito ? 1 : 0,
        transform: showJeito ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(.16,1,.3,1)",
      }}>
        <T size={50} weight={600} opacity={0.8} className="gradient-text">
          E sim o <span className="gradient-animated glow-gradient-text" style={{ fontWeight: 800 }}>jeito</span>.
        </T>
      </div>
    </div>
  );
});

// 7:28.44 — "ATÉ AGORA" — punch
R.set(63, () => (
  <div className="slide center">
    <div className="double-glow" />
    <div className="double-glow" />
    <T size={80} weight={900} opacity={1} anim="anim-scaleIn" className="gradient-animated glow-gradient-text">
      ATE AGORA.
    </T>
  </div>
));

// 7:30.86 — "a pergunta se fez sozinha"
R.set(64, () => (
  <div className="slide center">
    <T size={48} weight={600} opacity={0.7} anim="anim-blurIn" className="gradient-text">
      A pergunta se fez sozinha.
    </T>
  </div>
));

} // end registerProblema
