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

export default function PostProcessing() {
	const { mouseVelocity } = useAppContext();
	const offset = useMemo(() => new Vector2(0.001, 0.001), []);

	useFrame(() => {
		const targetX = mouseVelocity.x * 0.002;
		const targetY = mouseVelocity.y * 0.002;

		offset.x += (targetX - offset.x) * 0.1;
		offset.y += (targetY - offset.y) * 0.1;
	});

	return (
		<EffectComposer>
			{/* Bloom for bioluminescent glow */}
			<Bloom
				intensity={0.8}
				luminanceThreshold={0.2}
				luminanceSmoothing={0.9}
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
				offset={0.3}
				darkness={0.6}
				eskil={false}
				blendFunction={BlendFunction.NORMAL}
			/>
		</EffectComposer>
	);
}
