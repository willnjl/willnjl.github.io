import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import Model from "../Model";

import { CameraRig } from "@/components/CameraRig";
import Bubbles from "../Bubbles";
import LuminescentParticles from "../LuminescentParticles";
import Background from "../Background";
import LoadingScreen from "../LoadingScreen";
import AnchorChain from "../AnchorChain";
import FogShader from "../FogShader";
import PostProcessing from "../PostProcessing";
import {
	AMBIENT_LIGHT_COLOR,
	DIRECTIONAL_LIGHT_MAIN_COLOR,
	DIRECTIONAL_LIGHT_SECONDARY_COLOR,
	POINT_LIGHT_1_COLOR,
	POINT_LIGHT_2_COLOR,
	POINT_LIGHT_3_COLOR,
	POINT_LIGHT_4_COLOR,
} from "@/constants";

export default function Scene() {
	return (
		<>
			<LoadingScreen />
			<Canvas
				camera={{ position: [0, 1.5, 12], fov: 50 }}
				shadows
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: "high-performance",
				}}
				dpr={[1, 2]}
			>
				<Suspense fallback={null}>
					<Background />

					<ambientLight intensity={0.15} color={AMBIENT_LIGHT_COLOR} />

					<directionalLight
						position={[0, 10, 5]}
						intensity={0.8}
						color={DIRECTIONAL_LIGHT_MAIN_COLOR}
						castShadow
					/>

					<directionalLight
						position={[0, -2, -8]}
						intensity={1.2}
						color={DIRECTIONAL_LIGHT_SECONDARY_COLOR}
					/>

					<pointLight
						position={[-4, 0, 3]}
						intensity={2.5}
						color={POINT_LIGHT_1_COLOR}
						distance={8}
						decay={2}
					/>
					<pointLight
						position={[4, 0, 3]}
						intensity={2.5}
						color={POINT_LIGHT_2_COLOR}
						distance={8}
						decay={2}
					/>

					<pointLight
						position={[0, 3, 0]}
						intensity={1.8}
						color={POINT_LIGHT_3_COLOR}
						distance={6}
						decay={2}
					/>

					<pointLight
						position={[0, -2, 0]}
						intensity={1.0}
						color={POINT_LIGHT_4_COLOR}
						distance={5}
						decay={2}
					/>

					<CameraRig />
					<CameraControls
						mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
						touches={{ one: 0, two: 0, three: 0 }}
					/>

					<Bubbles />
					<LuminescentParticles />
					<AnchorChain />
					<Model position={[0, 0, 0]} scale={4} />

					<PostProcessing />
				</Suspense>
			</Canvas>
		</>
	);
}
