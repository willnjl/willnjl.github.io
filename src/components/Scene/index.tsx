import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Html, OrbitControls } from "@react-three/drei";
import Model from "../Model";
import Loading from "../Loading";

export default function Scene() {
	return (
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
			<Model position={[0, -0.5, 0]} scale={0.01} castShadow receiveShadow />
			{/* <OrbitControls enableDamping /> */}
			<Environment preset="studio" />
		</Canvas>
	);
}
