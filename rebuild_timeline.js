/**
 * rebuild_timeline.js — Direct timeline rebuild
 * Uses known-good timestamps to generate timeline.ts
 * No text extraction needed, all timestamps are hardcoded from Whisper verification
 */
const fs = require('fs');
const FPS = 30;
const TOTAL_DURATION_SECONDS = 1465;

// All 397 entries from the last verified good build + stack adjustments
// Stack items absorbed: S74, S179, S180, S530, S634, S635, S655, S656
const ABSORBED = new Set([74, 179, 180, 530, 634, 635, 655, 656]);

const ALL_ENTRIES = [
  // From the verified good build (397 entries)
  {slide:2,startTime:0.00},{slide:3,startTime:2.12},{slide:4,startTime:3.42},{slide:5,startTime:4.78},
  {slide:7,startTime:5.72},{slide:8,startTime:7.50},{slide:9,startTime:11.26},{slide:10,startTime:15.26},
  {slide:11,startTime:18.44},{slide:12,startTime:19.24},{slide:14,startTime:23.16},
  {slide:15,startTime:24.24},{slide:16,startTime:26.42},{slide:500,startTime:29.54},
  {slide:17,startTime:31.86},{slide:18,startTime:34.76},{slide:299,startTime:38.30},
  {slide:19,startTime:40.24},{slide:20,startTime:43.30},{slide:501,startTime:46.40},
  {slide:300,startTime:48.50},{slide:21,startTime:51.68},{slide:502,startTime:54.88},
  {slide:22,startTime:57.64},{slide:23,startTime:59.72},{slide:24,startTime:61.48},
  {slide:301,startTime:64.54},{slide:25,startTime:66.36},{slide:26,startTime:67.38},
  {slide:27,startTime:70.32},{slide:28,startTime:78.04},{slide:505,startTime:81.38},
  {slide:506,startTime:84.44},{slide:29,startTime:85.76},{slide:30,startTime:89.56},
  {slide:507,startTime:92.94},{slide:508,startTime:95.94},{slide:32,startTime:96.52},
  {slide:259,startTime:99.00},{slide:33,startTime:103.58},{slide:509,startTime:106.80},
  {slide:34,startTime:110.00},{slide:510,startTime:113.24},{slide:35,startTime:116.88},
  {slide:401,startTime:120.50},{slide:512,startTime:123.78},{slide:261,startTime:126.30},
  {slide:36,startTime:130.32},{slide:513,startTime:133.32},{slide:262,startTime:136.02},
  {slide:37,startTime:143.02},{slide:38,startTime:144.76},{slide:39,startTime:147.20},
  {slide:400,startTime:151.00},{slide:40,startTime:155.28},{slide:41,startTime:158.18},
  {slide:42,startTime:160.92},{slide:263,startTime:162.60},{slide:264,startTime:169.02},
  {slide:265,startTime:174.00},{slide:43,startTime:184.16},{slide:514,startTime:187.44},
  {slide:44,startTime:189.36},{slide:46,startTime:196.24},{slide:48,startTime:205.66},
  {slide:49,startTime:210.16},{slide:517,startTime:213.66},{slide:50,startTime:215.64},
  {slide:302,startTime:219.62},{slide:53,startTime:238.82},{slide:518,startTime:242.10},
  {slide:410,startTime:244.50},{slide:519,startTime:247.64},{slide:411,startTime:249.58},
  {slide:520,startTime:252.62},{slide:521,startTime:255.64},{slide:412,startTime:256.28},
  {slide:522,startTime:259.42},{slide:304,startTime:261.92},{slide:57,startTime:269.64},
  {slide:58,startTime:271.06},{slide:523,startTime:274.94},{slide:524,startTime:278.04},
  {slide:303,startTime:280.86},{slide:413,startTime:290.24},{slide:525,startTime:293.42},
  {slide:414,startTime:295.98},{slide:526,startTime:300.18},{slide:64,startTime:303.04},
  {slide:65,startTime:303.56},{slide:66,startTime:308.56},{slide:67,startTime:310.70},
  {slide:63,startTime:316.20},{slide:439,startTime:317.60},{slide:440,startTime:322.06},
  {slide:69,startTime:325.92},{slide:528,startTime:329.28},{slide:529,startTime:332.32},
  {slide:312,startTime:333.98},{slide:68,startTime:347.60},{slide:441,startTime:349.12},
  // S442 is now a STACK (absorbs S74, S530)
  {slide:442,startTime:352.12},
  // S74 and S530 REMOVED (absorbed into stack S442)
  {slide:266,startTime:361.80},
  {slide:76,startTime:369.64},{slide:75,startTime:370.38},{slide:77,startTime:373.90},
  {slide:415,startTime:376.04},{slide:532,startTime:379.60},{slide:78,startTime:381.42},
  {slide:533,startTime:384.46},{slide:416,startTime:387.32},{slide:417,startTime:390.36},
  {slide:534,startTime:394.02},{slide:535,startTime:397.08},{slide:536,startTime:400.08},
  {slide:418,startTime:402.22},{slide:537,startTime:405.26},{slide:82,startTime:407.90},
  {slide:538,startTime:411.42},{slide:83,startTime:413.12},{slide:419,startTime:416.08},
  {slide:311,startTime:420.10},{slide:91,startTime:453.58},{slide:94,startTime:454.48},
  {slide:539,startTime:457.60},{slide:540,startTime:460.70},{slide:81,startTime:462.32},
  {slide:420,startTime:466.62},{slide:541,startTime:470.06},{slide:542,startTime:473.24},
  {slide:422,startTime:477.64},{slide:544,startTime:480.78},
  {slide:267,startTime:483.78},{slide:268,startTime:500.04},{slide:269,startTime:503.00},
  {slide:270,startTime:512.10},{slide:271,startTime:521.58},{slide:99,startTime:523.92},
  {slide:100,startTime:526.88},{slide:102,startTime:528.64},{slide:101,startTime:530.78},
  {slide:546,startTime:533.80},{slide:272,startTime:537.70},
  {slide:104,startTime:543.64},{slide:105,startTime:546.52},{slide:548,startTime:549.52},
  {slide:423,startTime:553.10},{slide:424,startTime:555.62},
  {slide:550,startTime:558.76},{slide:80,startTime:561.88},{slide:551,startTime:565.06},
  {slide:108,startTime:567.32},{slide:109,startTime:570.56},{slide:444,startTime:572.60},
  {slide:445,startTime:574.60},{slide:446,startTime:576.60},{slide:112,startTime:579.70},
  {slide:443,startTime:581.60},{slide:111,startTime:582.50},{slide:425,startTime:584.72},
  {slide:552,startTime:587.80},{slide:553,startTime:591.04},
  {slide:426,startTime:594.36},{slide:555,startTime:597.60},
  {slide:113,startTime:601.30},{slide:557,startTime:604.42},{slide:558,startTime:607.66},
  {slide:274,startTime:611.10},{slide:114,startTime:616.42},{slide:560,startTime:619.60},
  {slide:116,startTime:621.88},{slide:305,startTime:625.20},{slide:117,startTime:626.94},
  {slide:561,startTime:629.94},{slide:562,startTime:633.32},{slide:427,startTime:634.34},
  {slide:275,startTime:638.90},{slide:122,startTime:644.88},{slide:123,startTime:645.74},
  {slide:563,startTime:649.24},{slide:564,startTime:653.52},{slide:124,startTime:655.76},
  {slide:125,startTime:660.56},{slide:126,startTime:663.00},{slide:127,startTime:664.50},
  {slide:565,startTime:667.54},{slide:566,startTime:670.62},{slide:128,startTime:673.44},
  {slide:90,startTime:676.76},{slide:129,startTime:681.20},{slide:130,startTime:686.08},
  {slide:131,startTime:688.58},{slide:276,startTime:692.96},{slide:277,startTime:698.30},
  {slide:132,startTime:700.20},{slide:96,startTime:702.38},{slide:567,startTime:705.42},
  // S134 is now a STACK
  {slide:134,startTime:708.84},
  {slide:135,startTime:711.52},{slide:568,startTime:715.14},{slide:569,startTime:718.28},
  {slide:133,startTime:720.04},{slide:428,startTime:723.96},{slide:570,startTime:727.00},
  {slide:571,startTime:730.26},{slide:429,startTime:731.90},{slide:138,startTime:734.56},
  {slide:572,startTime:737.70},{slide:573,startTime:740.76},{slide:574,startTime:743.80},
  {slide:306,startTime:744.96},{slide:141,startTime:750.86},{slide:575,startTime:753.94},
  {slide:136,startTime:756.10},{slide:143,startTime:759.22},
  {slide:576,startTime:762.38},{slide:577,startTime:765.60},{slide:278,startTime:766.70},
  {slide:430,startTime:776.06},{slide:431,startTime:780.16},{slide:279,startTime:784.90},
  {slide:313,startTime:790.56},{slide:151,startTime:810.84},{slide:152,startTime:812.84},
  {slide:578,startTime:816.06},{slide:153,startTime:818.96},{slide:432,startTime:823.52},
  {slide:154,startTime:825.66},{slide:433,startTime:830.26},{slide:156,startTime:833.18},
  {slide:157,startTime:836.18},{slide:158,startTime:840.82},{slide:280,startTime:845.80},
  {slide:159,startTime:853.00},{slide:160,startTime:855.18},{slide:579,startTime:858.30},
  {slide:580,startTime:861.40},{slide:162,startTime:862.32},{slide:581,startTime:865.56},
  {slide:582,startTime:868.94},{slide:164,startTime:869.86},{slide:165,startTime:871.24},
  {slide:583,startTime:874.32},{slide:584,startTime:877.32},{slide:167,startTime:877.94},
  {slide:585,startTime:881.00},{slide:586,startTime:884.00},{slide:166,startTime:884.98},
  {slide:168,startTime:888.88},{slide:587,startTime:891.96},{slide:171,startTime:894.18},
  {slide:172,startTime:898.12},{slide:588,startTime:901.14},{slide:589,startTime:904.42},
  {slide:590,startTime:907.44},{slide:281,startTime:909.60},
  {slide:434,startTime:918.16},{slide:591,startTime:921.18},{slide:592,startTime:924.20},
  {slide:435,startTime:926.16},{slide:593,startTime:929.22},{slide:282,startTime:933.40},
  // S178 is now a STACK (absorbs S179, S180)
  {slide:178,startTime:940.04},
  // S179, S180 REMOVED
  {slide:181,startTime:946.20},{slide:144,startTime:950.52},{slide:594,startTime:953.52},
  {slide:309,startTime:956.68},{slide:188,startTime:997.52},{slide:596,startTime:1000.54},
  {slide:187,startTime:1004.42},{slide:186,startTime:1005.08},
  {slide:598,startTime:1008.50},{slide:599,startTime:1011.74},{slide:600,startTime:1014.74},
  {slide:601,startTime:1017.82},{slide:602,startTime:1020.94},{slide:603,startTime:1023.94},
  {slide:604,startTime:1027.10},
  // S605 is now a STACK
  {slide:605,startTime:1030.16},
  {slide:606,startTime:1033.94},{slide:607,startTime:1037.26},{slide:608,startTime:1040.38},
  {slide:609,startTime:1043.38},{slide:610,startTime:1046.80},{slide:611,startTime:1049.94},
  {slide:612,startTime:1053.26},{slide:613,startTime:1056.38},{slide:176,startTime:1059.32},
  {slide:150,startTime:1063.58},{slide:614,startTime:1066.62},{slide:615,startTime:1069.84},
  {slide:283,startTime:1072.30},{slide:190,startTime:1076.56},{slide:191,startTime:1076.56},
  {slide:436,startTime:1082.30},{slide:192,startTime:1086.06},{slide:437,startTime:1090.06},
  {slide:616,startTime:1093.44},{slide:617,startTime:1096.80},{slide:438,startTime:1098.02},
  {slide:618,startTime:1101.46},{slide:196,startTime:1103.88},{slide:284,startTime:1104.70},
  {slide:193,startTime:1108.90},{slide:197,startTime:1112.70},{slide:619,startTime:1116.10},
  {slide:620,startTime:1119.26},{slide:199,startTime:1122.98},{slide:310,startTime:1124.14},
  {slide:201,startTime:1134.08},{slide:622,startTime:1137.28},{slide:623,startTime:1140.50},
  {slide:203,startTime:1143.38},{slide:624,startTime:1146.62},{slide:205,startTime:1148.94},
  {slide:206,startTime:1152.56},{slide:207,startTime:1155.64},{slide:625,startTime:1158.86},
  {slide:209,startTime:1161.10},{slide:210,startTime:1165.18},{slide:211,startTime:1166.28},
  {slide:212,startTime:1170.70},{slide:626,startTime:1173.82},{slide:627,startTime:1176.82},
  {slide:213,startTime:1178.70},{slide:628,startTime:1182.08},{slide:215,startTime:1184.82},
  {slide:308,startTime:1186.22},{slide:193,startTime:1208.78},{slide:307,startTime:1212.44},
  {slide:226,startTime:1221.06},{slide:285,startTime:1224.10},{slide:286,startTime:1234.60},
  {slide:227,startTime:1239.64},{slide:629,startTime:1243.02},{slide:630,startTime:1246.22},
  {slide:631,startTime:1249.44},{slide:229,startTime:1253.56},{slide:287,startTime:1258.20},
  {slide:230,startTime:1263.16},
  // S633 is now a STACK (absorbs S634, S635)
  {slide:633,startTime:1266.24},
  // S634, S635 REMOVED
  {slide:232,startTime:1274.68},{slide:231,startTime:1277.54},{slide:228,startTime:1279.30},
  {slide:636,startTime:1282.32},{slide:233,startTime:1286.18},
  {slide:234,startTime:1289.90},{slide:638,startTime:1293.14},{slide:639,startTime:1296.16},
  {slide:640,startTime:1299.16},{slide:641,startTime:1302.24},{slide:642,startTime:1305.42},
  {slide:236,startTime:1308.40},{slide:289,startTime:1312.30},{slide:290,startTime:1317.00},
  {slide:238,startTime:1323.52},{slide:643,startTime:1326.62},{slide:644,startTime:1329.94},
  {slide:291,startTime:1331.00},{slide:240,startTime:1338.24},{slide:645,startTime:1341.28},
  {slide:241,startTime:1344.16},{slide:242,startTime:1346.16},{slide:292,startTime:1349.10},
  {slide:293,startTime:1355.58},{slide:243,startTime:1363.26},{slide:646,startTime:1366.36},
  {slide:244,startTime:1369.84},{slide:294,startTime:1374.60},{slide:295,startTime:1380.70},
  {slide:245,startTime:1386.82},{slide:296,startTime:1390.30},{slide:297,startTime:1396.70},
  {slide:246,startTime:1399.48},{slide:648,startTime:1402.62},{slide:649,startTime:1405.74},
  {slide:650,startTime:1409.04},{slide:247,startTime:1412.36},{slide:248,startTime:1415.48},
  {slide:249,startTime:1416.22},{slide:652,startTime:1419.30},{slide:250,startTime:1423.60},
  {slide:654,startTime:1427.34},{slide:251,startTime:1428.88},{slide:298,startTime:1433.44},
  {slide:252,startTime:1438.62},{slide:253,startTime:1441.60},{slide:254,startTime:1445.24},
  // S255 is now a STACK (absorbs S655, S656)
  {slide:255,startTime:1449.00},
  // S655, S656 REMOVED
  {slide:256,startTime:1456.28},{slide:257,startTime:1459.98},
];

// Filter out absorbed slides and sort
const entries = ALL_ENTRIES
  .filter(e => !ABSORBED.has(e.slide))
  .sort((a, b) => a.startTime - b.startTime);

// Remove duplicates (same slide ID)
const seen = new Set();
const unique = entries.filter(e => {
  if (seen.has(e.slide)) return false;
  seen.add(e.slide);
  return true;
});

// Write timeline.ts
let ts = '// Timeline: Word-level Whisper timestamps (OpenAI API, 5331 words)\n';
ts += '// Built by rebuild_timeline.js — direct hardcoded timestamps\n';
ts += `// Generated: ${new Date().toISOString().split('T')[0]}\n\n`;
ts += 'export const SLIDE_TIMELINE: Array<{ slide: number; startTime: number }> = [\n';
for (const e of unique) {
  const mm = Math.floor(e.startTime / 60);
  const ss = (e.startTime % 60).toFixed(2).padStart(5, '0');
  ts += `  { slide: ${e.slide}, startTime: ${e.startTime.toFixed(2)} }, // [${mm}:${ss}]\n`;
}
ts += '].sort((a, b) => a.startTime - b.startTime);\n\n';
ts += `export const FPS = ${FPS};\nexport const TOTAL_DURATION_SECONDS = ${TOTAL_DURATION_SECONDS};\nexport const TOTAL_FRAMES = TOTAL_DURATION_SECONDS * FPS;\n`;

fs.writeFileSync('src/webinar/timeline.ts', ts);
console.log(`Wrote timeline.ts (${unique.length} entries)`);

// Stats
let dupes = 0, short = 0;
for (let i = 0; i < unique.length - 1; i++) {
  const dur = unique[i + 1].startTime - unique[i].startTime;
  if (dur < 0.01) dupes++;
  else if (dur < 0.5) short++;
}
console.log(`Duplicates: ${dupes} | Too short: ${short}`);
console.log(`First: S${unique[0].slide} @ ${unique[0].startTime}s`);
