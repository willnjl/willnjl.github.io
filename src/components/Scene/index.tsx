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
					<ambientLight intensity={1} color="#8601f3" />
					<directionalLight
						position={[0, 10, 0]}
						intensity={10}
						color={LIGHT_COLOR}
						castShadow
						shadow-mapSize-width={2048}
						shadow-mapSize-height={2048}
					/>
					{/* <hemisphereLight
						intensity={0.3}
						color={LIGHT_COLOR}
						groundColor={GROUND_COLOR}
					/> */}
					<CameraRig />
					<CameraControls
						mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
						touches={{ one: 0, two: 0, three: 0 }}
					/>
					{/* <FogShader
						thickness={2.0}
						bottomColor="#000000"
						topColor="#4db8e8"
						near={20}
						far={55}
					/> */}
					<Bubbles />
					<AnchorChain />
					<Model position={[0, 0, 0]} scale={4} />
				</Suspense>
			</Canvas>
		</>
	);
}
