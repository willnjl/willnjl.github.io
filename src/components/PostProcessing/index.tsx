import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
	EffectComposer,
	Bloom,
	ChromaticAberration,
	Vignette,
	DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useAppContext } from "@/context/AppContext";
import { Vector2 } from "three";
import {
	NOISE_INTENSITY,
	MOUSE_VELOCITY_INTENSITY,
	NOISE_FREQUENCY,
	BLOOM_INTENSITY,
	BLOOM_LUMINANCE_THRESHOLD,
	BLOOM_LUMINANCE_SMOOTHING,
	DOF_FOCUS_DISTANCE,
	DOF_FOCAL_LENGTH,
	DOF_BOKEH_SCALE,
	VIGNETTE_OFFSET,
	VIGNETTE_DARKNESS,
} from "@/constants";

export default function PostProcessing() {
	const { mouseVelocity } = useAppContext();
	const offset = useMemo(() => new Vector2(0.001, 0.001), []);
	const time = useRef(0);
	const noiseTimer = useRef(0);
	const burstActive = useRef(false);
	const burstIntensity = useRef(0);

	useFrame((state, delta) => {
		time.current += delta;
		noiseTimer.current += delta;

		// Random signal interference bursts every 2-5 seconds
		if (!burstActive.current && noiseTimer.current > Math.random() * 3 + 2) {
			burstActive.current = true;
			burstIntensity.current = 1;
			noiseTimer.current = 0;
		}

		// Decay burst intensity quickly
		if (burstActive.current) {
			burstIntensity.current *= 0.95;
			if (burstIntensity.current < 0.01) {
				burstActive.current = false;
				burstIntensity.current = 0;
			}
		}

		// Base glitchy noise - random flickers
		const baseGlitch =
			Math.random() < NOISE_FREQUENCY
				? (Math.random() - 0.5) * 0.003 * NOISE_INTENSITY
				: 0;

		// Signal interference with rapid random fluctuations during burst
		const glitchX = burstActive.current
			? (Math.random() - 0.5) * 0.45 * burstIntensity.current * NOISE_INTENSITY
			: baseGlitch;
		const glitchY = burstActive.current
			? (Math.random() - 0.5) * 0.25 * burstIntensity.current * NOISE_INTENSITY
			: baseGlitch * (Math.random() - 0.5);

		// Mouse velocity offset + signal interference
		const targetX =
			mouseVelocity.x * 0.002 * MOUSE_VELOCITY_INTENSITY + glitchX;
		const targetY =
			mouseVelocity.y * 0.002 * MOUSE_VELOCITY_INTENSITY + glitchY;

		offset.x += (targetX - offset.x) * 0.08;
		offset.y += (targetY - offset.y) * 0.08;
	});

	return (
		<EffectComposer>
			{/* Depth of field for atmospheric depth */}
			<DepthOfField
				focusDistance={DOF_FOCUS_DISTANCE}
				focalLength={DOF_FOCAL_LENGTH}
				bokehScale={DOF_BOKEH_SCALE}
				height={480}
			/>

			{/* Bloom for bioluminescent glow */}
			<Bloom
				intensity={BLOOM_INTENSITY}
				luminanceThreshold={BLOOM_LUMINANCE_THRESHOLD}
				luminanceSmoothing={BLOOM_LUMINANCE_SMOOTHING}
				height={300}
				blendFunction={BlendFunction.SCREEN}
			/>

			{/* Chromatic aberration for underwater light distortion */}
			<ChromaticAberration
				offset={offset}
				blendFunction={BlendFunction.NORMAL}
			/>

			{/* Vignette for depth illusion */}
			<Vignette
				offset={VIGNETTE_OFFSET}
				darkness={VIGNETTE_DARKNESS}
				eskil={false}
				blendFunction={BlendFunction.NORMAL}
			/>
		</EffectComposer>
	);
}
