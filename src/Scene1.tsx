import {
	AbsoluteFill,
	Audio,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	staticFile,
} from "remotion";
import { Video } from "@remotion/media";
import {
	SlideUniversities,
	SlideRepetition,
	SlideMusic,
	SlideStats,
	SlideInsight,
	SlideFusion,
} from "./Slides";

const CLAMP = {
	extrapolateLeft: "clamp" as const,
	extrapolateRight: "clamp" as const,
};

// ─── Slide timing (synced to audio vsl.srt) ──────────────────

const SLIDES: {
	component: React.FC;
	startSec: number;
	durationSec: number;
}[] = [
	{ component: SlideUniversities, startSec: 39.5, durationSec: 8.5 },
	{ component: SlideRepetition, startSec: 54.3, durationSec: 4.0 },
	{ component: SlideMusic, startSec: 64.3, durationSec: 4.2 },
	{ component: SlideStats, startSec: 107.6, durationSec: 5.5 },
	{ component: SlideInsight, startSec: 119.2, durationSec: 5.5 },
	{ component: SlideFusion, startSec: 147.0, durationSec: 6.5 },
];

// ─── Animated slide wrapper ──────────────────────────────────

const SlideWrapper: React.FC<{
	children: React.ReactNode;
	startSec: number;
	durationSec: number;
}> = ({ children, startSec, durationSec }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const start = Math.round(startSec * fps);
	const dur = Math.round(durationSec * fps);
	const f = frame - start;

	if (f < 0 || f > dur) return null;

	const enterOp = interpolate(f, [0, 10], [0, 1], CLAMP);
	const exitOp = interpolate(f, [dur - 10, dur], [1, 0], CLAMP);

	return (
		<AbsoluteFill style={{ opacity: Math.min(enterOp, exitOp) }}>
			{children}
		</AbsoluteFill>
	);
};

// ─── Main composition ────────────────────────────────────────

export const Scene1: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			{/* Talking head video (muted — audio comes from VSL track) */}
			<Video
				src={staticFile("lead remotion.mp4")}
				style={{ width: "100%", height: "100%", objectFit: "cover" }}
				volume={0}
			/>

			{/* Full VSL audio */}
			<Audio src={staticFile("audio vsl.MP3")} />

			{/* Concept slides — appear at key teaching moments */}
			{SLIDES.map((slide, i) => (
				<SlideWrapper
					key={i}
					startSec={slide.startSec}
					durationSec={slide.durationSec}
				>
					<slide.component />
				</SlideWrapper>
			))}
		</AbsoluteFill>
	);
};
