import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
	weights: ["400", "700", "900"],
	subsets: ["latin", "latin-ext"],
});

// ─── Design tokens ────────────────────────────────────────────
const black = "#0a0a0a";
const gray = "#999";
const blue = "#3B82F6";

const base: React.CSSProperties = {
	backgroundColor: "#fff",
	fontFamily,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	padding: "0 140px",
};

const faint: React.CSSProperties = {
	position: "absolute",
	top: 200,
	right: 100,
	fontSize: 240,
	fontWeight: 900,
	color: "rgba(0,0,0,0.035)",
	fontFamily,
	lineHeight: 1,
};

const rule = (w: number | string, color = black): React.CSSProperties => ({
	width: w,
	height: 3,
	backgroundColor: color,
	borderRadius: 2,
});

// ─── 01 · UNIVERSITIES ───────────────────────────────────────
// "Johns Hopkins, McGill, Stanford e MIT — validado há décadas"

export const SlideUniversities: React.FC = () => (
	<AbsoluteFill style={base}>
		<div style={faint}>01</div>

		{/* Blue accent bar */}
		<div
			style={{
				position: "absolute",
				left: 90,
				top: "26%",
				bottom: "26%",
				width: 4,
				backgroundColor: blue,
				borderRadius: 4,
			}}
		/>

		<div style={{ paddingLeft: 20 }}>
			<div
				style={{
					fontSize: 21,
					fontWeight: 400,
					color: gray,
					letterSpacing: 14,
					marginBottom: 36,
				}}
			>
				VALIDADO POR
			</div>

			<div style={rule(160)} />

			<div style={{ margin: "52px 0" }}>
				{["JOHNS HOPKINS", "McGILL", "STANFORD", "MIT"].map((name) => (
					<div
						key={name}
						style={{
							fontSize: 60,
							fontWeight: 900,
							color: black,
							letterSpacing: 2,
							lineHeight: 1.35,
						}}
					>
						{name}
					</div>
				))}
			</div>

			<div style={rule(160)} />

			<div
				style={{
					fontSize: 19,
					fontWeight: 400,
					color: gray,
					letterSpacing: 12,
					marginTop: 36,
				}}
			>
				DÉCADAS DE PESQUISA
			</div>
		</div>
	</AbsoluteFill>
);

// ─── 02 · REPETIÇÃO → FLUÊNCIA ───────────────────────────────
// "A única coisa capaz de instalar fluência: a repetição"

export const SlideRepetition: React.FC = () => (
	<AbsoluteFill style={{ ...base, alignItems: "center" }}>
		<div style={faint}>02</div>

		<div
			style={{
				fontSize: 86,
				fontWeight: 900,
				color: black,
				letterSpacing: 4,
			}}
		>
			REPETIÇÃO
		</div>

		{/* Connector */}
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				margin: "44px 0",
				gap: 12,
			}}
		>
			<div style={{ width: 3, height: 60, backgroundColor: "#ddd" }} />
			<div
				style={{
					fontSize: 20,
					fontWeight: 400,
					color: gray,
					letterSpacing: 10,
				}}
			>
				INSTALA
			</div>
			<div style={{ width: 3, height: 60, backgroundColor: "#ddd" }} />
		</div>

		<div
			style={{
				fontSize: 86,
				fontWeight: 900,
				color: blue,
				letterSpacing: 4,
			}}
		>
			FLUÊNCIA
		</div>

		<div
			style={{
				fontSize: 24,
				fontWeight: 400,
				color: gray,
				textAlign: "center",
				lineHeight: 1.7,
				marginTop: 56,
				maxWidth: 600,
			}}
		>
			no seu ouvido,
			<br />
			automaticamente.
		</div>
	</AbsoluteFill>
);

// ─── 03 · A MÚSICA ───────────────────────────────────────────
// "A música — a ferramenta que já estava na sua cara"

export const SlideMusic: React.FC = () => (
	<AbsoluteFill style={{ ...base, alignItems: "center" }}>
		<div style={faint}>03</div>

		{/* Large decorative note */}
		<div
			style={{
				position: "absolute",
				top: "22%",
				left: "50%",
				transform: "translateX(-50%)",
				fontSize: 280,
				color: "rgba(0,0,0,0.04)",
				lineHeight: 1,
			}}
		>
			♪
		</div>

		<div
			style={{
				fontSize: 78,
				fontWeight: 900,
				color: black,
				letterSpacing: 4,
				marginBottom: 28,
			}}
		>
			A MÚSICA
		</div>

		<div style={rule(140)} />

		<div
			style={{
				fontSize: 26,
				fontWeight: 400,
				color: gray,
				textAlign: "center",
				lineHeight: 1.8,
				marginTop: 40,
				maxWidth: 620,
			}}
		>
			A ferramenta de repetição
			<br />
			que já estava na sua cara
			<br />
			há muito tempo.
		</div>
	</AbsoluteFill>
);

// ─── 04 · STATS ──────────────────────────────────────────────
// "30 países, 1 milhão de horas"

export const SlideStats: React.FC = () => (
	<AbsoluteFill style={base}>
		<div style={faint}>04</div>

		{/* Stat 1 */}
		<div
			style={{
				fontSize: 160,
				fontWeight: 900,
				color: black,
				lineHeight: 1,
				letterSpacing: -4,
			}}
		>
			30+
		</div>
		<div
			style={{
				fontSize: 24,
				fontWeight: 400,
				color: gray,
				letterSpacing: 12,
				marginTop: 8,
				marginBottom: 48,
			}}
		>
			PAÍSES
		</div>

		<div style={rule("70%", "#e5e5e5")} />

		{/* Stat 2 */}
		<div
			style={{
				fontSize: 160,
				fontWeight: 900,
				color: black,
				lineHeight: 1,
				letterSpacing: -4,
				marginTop: 48,
			}}
		>
			1M+
		</div>
		<div
			style={{
				fontSize: 24,
				fontWeight: 400,
				color: gray,
				letterSpacing: 12,
				marginTop: 8,
				marginBottom: 64,
			}}
		>
			HORAS DE INGLÊS
		</div>

		<div style={rule("70%", "#e5e5e5")} />

		<div
			style={{
				fontSize: 28,
				fontWeight: 700,
				color: black,
				letterSpacing: 2,
				marginTop: 48,
				lineHeight: 1.5,
			}}
		>
			A maior escola de inglês
			<br />
			online do Brasil.
		</div>
	</AbsoluteFill>
);

// ─── 05 · FLUÊNCIA = HABILIDADE ──────────────────────────────
// "Fluência é habilidade. Habilidades entram no subconsciente com repetição."

export const SlideInsight: React.FC = () => (
	<AbsoluteFill style={{ ...base, alignItems: "flex-start" }}>
		<div style={faint}>05</div>

		{/* Blue accent bar */}
		<div
			style={{
				position: "absolute",
				left: 90,
				top: "30%",
				bottom: "30%",
				width: 4,
				backgroundColor: blue,
				borderRadius: 4,
			}}
		/>

		<div style={{ paddingLeft: 20 }}>
			{/* Term 1 */}
			<div
				style={{
					fontSize: 72,
					fontWeight: 900,
					color: black,
					letterSpacing: 3,
				}}
			>
				FLUÊNCIA
			</div>
			<div
				style={{
					fontSize: 30,
					fontWeight: 400,
					color: gray,
					marginTop: 8,
					marginBottom: 52,
				}}
			>
				é uma habilidade.
			</div>

			<div style={rule(120)} />

			{/* Term 2 */}
			<div
				style={{
					fontSize: 72,
					fontWeight: 900,
					color: black,
					letterSpacing: 3,
					marginTop: 52,
				}}
			>
				HABILIDADES
			</div>
			<div
				style={{
					fontSize: 30,
					fontWeight: 400,
					color: gray,
					marginTop: 8,
					lineHeight: 1.6,
				}}
			>
				entram no subconsciente
			</div>
			<div
				style={{
					fontSize: 30,
					fontWeight: 700,
					color: black,
					marginTop: 4,
				}}
			>
				apenas com repetição.
			</div>
		</div>
	</AbsoluteFill>
);

// ─── 06 · MÚSICA × INGLÊS ───────────────────────────────────
// "Cresci na música antes do inglês → Inglês Cantado"

export const SlideFusion: React.FC = () => (
	<AbsoluteFill style={{ ...base, alignItems: "center" }}>
		<div style={faint}>06</div>

		<div
			style={{
				fontSize: 68,
				fontWeight: 900,
				color: black,
				letterSpacing: 4,
			}}
		>
			MÚSICA
		</div>

		<div
			style={{
				fontSize: 48,
				fontWeight: 400,
				color: "#ddd",
				margin: "28px 0",
			}}
		>
			×
		</div>

		<div
			style={{
				fontSize: 68,
				fontWeight: 900,
				color: black,
				letterSpacing: 4,
				marginBottom: 44,
			}}
		>
			INGLÊS
		</div>

		<div style={rule(200)} />

		<div
			style={{
				fontSize: 64,
				fontWeight: 900,
				color: blue,
				letterSpacing: 5,
				marginTop: 44,
				lineHeight: 1.25,
				textAlign: "center",
			}}
		>
			INGLÊS
			<br />
			CANTADO
		</div>

		<div
			style={{
				fontSize: 20,
				fontWeight: 400,
				color: gray,
				letterSpacing: 10,
				marginTop: 32,
			}}
		>
			O MÉTODO
		</div>
	</AbsoluteFill>
);
