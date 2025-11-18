import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import Model from "../Model";

import { CameraRig } from "@/components/CameraRig";
import Bubbles from "../Bubbles";
import Background from "../Background";
import LoadingScreen from "../LoadingScreen";
import AnchorChain from "../AnchorChain";
import FogShader from "../FogShader";
import PostProcessing from "../PostProcessing";

const LIGHT_COLOR = "#b9f0ef";
const GROUND_COLOR = "#000a1a";

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

					<ambientLight intensity={0.15} color="#1a3d5c" />

					<directionalLight
						position={[0, 10, 5]}
						intensity={0.8}
						color="#4db8e8"
						castShadow
					/>

					<directionalLight
						position={[0, -2, -8]}
						intensity={1.2}
						color="#6a4c93"
					/>

					<pointLight
						position={[-4, 0, 3]}
						intensity={2.5}
						color="#d946ef"
						distance={8}
						decay={2}
					/>
					<pointLight
						position={[4, 0, 3]}
						intensity={2.5}
						color="#8b5cf6"
						distance={8}
						decay={2}
					/>

					<pointLight
						position={[0, 3, 0]}
						intensity={1.8}
						color="#a78bfa"
						distance={6}
						decay={2}
					/>

					<pointLight
						position={[0, -2, 0]}
						intensity={1.0}
						color="#0ea5e9"
						distance={5}
						decay={2}
					/>

					<CameraRig />
					<CameraControls
						mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
						touches={{ one: 0, two: 0, three: 0 }}
					/>

					<Bubbles />
					<AnchorChain />
					<Model position={[0, 0, 0]} scale={4} />

					<PostProcessing />
				</Suspense>
			</Canvas>
		</>
	);
}
