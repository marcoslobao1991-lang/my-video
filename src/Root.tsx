import "./index.css";
import { Composition, Still } from "remotion";
import { Scene1 } from "./Scene1";
import {
	SlideUniversities,
	SlideRepetition,
	SlideMusic,
	SlideStats,
	SlideInsight,
	SlideFusion,
} from "./Slides";
import {
	WowBlock,
	Slide01_Logo,
	Slide02_CenaReal,
	Slide03_SerieCantada,
	Slide04_Repeticao,
	Slide05_Resultado,
} from "./webinar/WowSlides";
import { LeadComposition } from "./webinar/Lead";
import { VSLComposition } from "./webinar/VSLSlides";
import { VSLOverlayComposition } from "./webinar/VSLOverlay";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			{/* ─── VSL LEAD: App demo + sua fala + slides (125s) ─── */}
			<Composition
				id="vsl-lead"
				component={LeadComposition}
				durationInFrames={3750}
				fps={30}
				width={1920}
				height={1080}
			/>

			{/* ─── VSL FULL: All 258 slides synced to audio (1467s) ─── */}
			<Composition
				id="vsl-full"
				component={VSLComposition}
				durationInFrames={43950}
				fps={30}
				width={1920}
				height={1080}
			/>

			{/* ─── VSL OVERLAY: All 258 slides 9:16 vertical synced to audio ─── */}
			<Composition
				id="vsl-overlay"
				component={VSLOverlayComposition}
				durationInFrames={43950}
				fps={30}
				width={1080}
				height={1920}
			/>

			{/* ─── WEBINAR: Bloco WOW com motion (20s total) ─── */}
			<Composition
				id="webinar-wow"
				component={WowBlock}
				durationInFrames={600}
				fps={30}
				width={1920}
				height={1080}
			/>

			{/* ─── WEBINAR: Slides individuais (stills pra PNG) ─── */}
			<Still id="wow-01-logo" component={Slide01_Logo} width={1920} height={1080} />
			<Still id="wow-02-cena" component={Slide02_CenaReal} width={1920} height={1080} />
			<Still id="wow-03-musica" component={Slide03_SerieCantada} width={1920} height={1080} />
			<Still id="wow-04-repeticao" component={Slide04_Repeticao} width={1920} height={1080} />
			<Still id="wow-05-resultado" component={Slide05_Resultado} width={1920} height={1080} />

			{/* ─── Compositions anteriores ─── */}
			<Composition
				id="MyComp"
				component={Scene1}
				durationInFrames={5400}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Still id="slide-01-universities" component={SlideUniversities} width={1080} height={1920} />
			<Still id="slide-02-repetition" component={SlideRepetition} width={1080} height={1920} />
			<Still id="slide-03-music" component={SlideMusic} width={1080} height={1920} />
			<Still id="slide-04-stats" component={SlideStats} width={1080} height={1920} />
			<Still id="slide-05-insight" component={SlideInsight} width={1080} height={1920} />
			<Still id="slide-06-fusion" component={SlideFusion} width={1080} height={1920} />
		</>
	);
};
