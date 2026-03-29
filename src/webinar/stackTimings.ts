// Stack item reveal timings — synced to Whisper word-level timestamps
// Each stack slide has items that appear at the exact moment Marcos says the word

export interface StackTiming {
  slide: number;
  items: number[]; // timestamps (seconds) for each item to appear
}

export const STACK_TIMINGS: StackTiming[] = [
  // Slide 9: No trânsito / Na academia / Antes de dormir
  // Synced to prepositions: "no"@6.98, "na"@7.86, "antes"@8.66
  { slide: 9, items: [6.98, 7.86, 8.66] },

  // Slide 13: Sem legenda / Sem esforço / Sem ter estudado
  { slide: 13, items: [19.20, 20.10, 21.22] },

  // Slide 20 (universities): Johns Hopkins / McGill / Stanford / MIT
  { slide: 20, items: [40.24, 41.08, 41.74, 42.30] },

  // Slide 28 (objectives): Multinacional / Entrevista / Séries / Viagens / Emprego
  { slide: 28, items: [70.80, 72.36, 73.42, 75.12, 77.24] },

  // Slide 46: Achei conteúdo / Achei didática / Refizemos / Mudei / Contratei
  // "Achei"@196.24, "Achei"@198.88, "Refizemos"@201.54, "mudei"@203.10, "contratei"@204.18
  { slide: 46, items: [196.24, 198.88, 201.54, 203.10, 204.18] },

  // Slide 402: Trabalha em inglês / Sem legenda / Viaja / Curte fluência
  // "trabalha"@179.66, "sem"@181.04 (ou "insere"@180.86), "viaja"@181.82, "curte"@182.70
  { slide: 402, items: [179.66, 180.86, 181.82, 182.70] },

  // Slide 59: Motivados / Horário liberado / Melhor material / Tudo a favor
  // "motivada"@275.3, "horário"@276.4, "melhor"@278.6, "Tudo"@279.8
  { slide: 59, items: [275.30, 276.40, 278.60, 279.80] },

  // Slide 67: Sentar / Prestar atenção / Processar informação / ENERGIA MENTAL
  // "Sentar"@310.70, "prestar"@311.60, "processar"@312.56, "gastar"@313.88
  { slide: 67, items: [310.70, 311.60, 312.56, 313.88] },

  // Slide 406: Aula em vídeo / Ao vivo / Jogo / Nativo / VR
  // "vídeo"@303.6, "ao vivo"@303.9, "jogo"@304.9, "ativo"@305.5, "realidade"@306.4
  { slide: 406, items: [303.00, 303.80, 304.70, 305.40, 306.20] },

  // Slide 65: (original — kept for backward compat but 406 replaces it)
  { slide: 65, items: [303.56, 303.86, 304.86, 305.50, 306.20] },

  // Slide 71 (rotina): Trabalho / Mensagem / Decisão / Reunião / Família
  { slide: 71, items: [333.98, 334.82, 336.12, 337.50, 338.86] },

  // Slide 96 (critérios): Sem esforço / Repete 50× / Faz porque quer
  { slide: 96, items: [467.90, 469.62, 475.50] },

  // Slide 421 (criterios novo): Sem esforço consciente / Repetir 50x / Fazer porque quer
  // "esforço"@467.90, "repetisse"@469.62, "quer"@475.50
  { slide: 421, items: [467.90, 470.06, 475.16] },

  // Slide 441: Não faz a aula / Abre e não presta atenção
  // "não faz"@349.12, "abre"@350.70
  { slide: 441, items: [349.12, 350.70] },

  // Slide 44 (grupo maior): Queriam fluência / Desistiam não voltavam / Dono de curso
  // "queriam"@189.36, "eles"@191.62 (so que eles desistiam), "começo"@194.36
  { slide: 44, items: [189.36, 191.62, 194.36] },

  // Stack 442: Cérebro cansado / Academia / Projeto pessoal
  // "cérebro"@352.46, "academia"@355.18, "projeto"@356.98
  { slide: 442, items: [352.12, 355.18, 356.98] },

  // Stack 134: Bicicleta / Dirigir / Digitar
  // "bicicleta"@709.06, "dirigir"@709.72, "digitar"@710.22
  { slide: 134, items: [709.06, 709.72, 710.22] },

  // Stack 178: 10 da noite / Inglês entra / Resultado
  // "noite"@940.04, "inglês"@942.82, "resultado"@944.32
  { slide: 178, items: [940.04, 942.82, 944.32] },

  // Stack 605: Pronúncia / Emendado / Expressões / Combinações
  // "pronúncia"@1030.16, "emendado"@1031.24, "expressões"@1032.30, "combinações"@1033.02
  { slide: 605, items: [1030.16, 1031.24, 1032.30, 1033.02] },

  // Stack 633: Blocos / Trilhas / Séries / Bilíngue
  // "blocos"@1267.34, "trilhos"@1268.24, "séries"@1269.72, "bilíngue"@1270.50
  { slide: 633, items: [1267.34, 1268.24, 1269.72, 1270.50] },

  // Stack 255: Chuveiro / Série sem legenda / Avião sem tradutor
  // "chuveiro"@1449.00, "cena"@1452.10, "avião"@1454.24
  { slide: 255, items: [1449.00, 1452.10, 1454.24] },
];

// Helper: get how many items should be visible for a given slide at a given time
export function getVisibleStackItems(slide: number, timeInSeconds: number): number {
  const timing = STACK_TIMINGS.find(t => t.slide === slide);
  if (!timing) return 999; // not a stack slide, show everything
  let count = 0;
  for (const t of timing.items) {
    if (timeInSeconds >= t) count++;
  }
  return count;
}
