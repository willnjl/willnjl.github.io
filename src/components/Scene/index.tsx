import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
	CameraControls,
	Environment,
	Html,
	OrbitControls,
	PerspectiveCamera,
} from "@react-three/drei";
import Model from "../Model";
import { useAppContext } from "@/context/AppContext";
import { CameraRig } from "@/components/CameraRig";

export default function Scene() {
	const { mousePosition } = useAppContext();

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
			<CameraRig />
			<CameraControls
				mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
				touches={{ one: 0, two: 0, three: 0 }}
			/>
			<Model position={[0, -0.5, 0]} scale={0.01} castShadow receiveShadow />
			<Environment preset="studio" />
		</Canvas>
	);
}
