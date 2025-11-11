import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Model from "../Model";
import Loading from "../Loading";

export default function Scene() {
	return (
		<Canvas camera={{ position: [0, 1.5, 12], fov: 50 }}>
			<ambientLight intensity={0.6} />
			<directionalLight position={[10, 10, 5]} intensity={1.5} />
			<Model position={[0, -0.5, 0]} scale={0.01} />
			{/* <mesh position={[2, 0, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="blue" />
            </mesh> */}
			<OrbitControls enableDamping />
			<Environment preset="studio" />
		</Canvas>
	);
}
