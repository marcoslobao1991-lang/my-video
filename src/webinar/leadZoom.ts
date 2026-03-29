// Lead zoom map (0-84s) — alternating 1.0 ↔ 1.08 at real breath pauses
// Cuts land in the SILENCE between words (midpoint of gap), never on a word.
// Whisper word-level: prev.end + next.start / 2 = midpoint of silence.

export const LEAD_ZOOM_MAP: Array<{ t: number; z: number }> = [
  { t: 0.00, z: 1.00 },   // "Você acabou de ouvir... não do jeito que você tá acostumado"
  { t: 3.23, z: 1.08 },   // silence 3.04→3.42 │ "Você ouviu isso uma única vez."
  { t: 4.60, z: 1.00 },   // silence 4.42→4.78 │ "Agora imagina... 30 40 vezes, trânsito, academia, dormir"
  { t: 14.58, z: 1.08 },  // silence 14.40→14.76 │ "O que aconteceria quando a cena real tocasse?"
  { t: 17.43, z: 1.00 },  // silence 17.18→17.68 │ "Bom, você ia entender tudo."
  { t: 19.82, z: 1.08 },  // silence 19.62→20.02 │ "sem esforço e sem ter estudado nada... série cantada"
  { t: 28.91, z: 1.00 },  // silence 28.70→29.12 │ "E quando você conecta... faz sentido"
  { t: 33.54, z: 1.08 },  // silence 33.30→33.78 │ "milhares de brasileiros... pesquisas... repetição... gostoso"
  { t: 63.53, z: 1.00 },  // silence 63.32→63.74 │ "já estava na sua cara... a música"
  { t: 68.67, z: 1.08 },  // silence 68.44→68.90 │ "Então se você quer... multinacional, séries, viagens"
  { t: 77.81, z: 1.00 },  // silence 77.58→78.04 │ "fica aqui comigo, vai mudar completamente"
  { t: 82.98, z: 1.08 },  // silence 82.80→83.16 │ "Só que antes, deixa eu me apresentar."
];
