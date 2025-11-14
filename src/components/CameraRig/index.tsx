import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useAppContext } from "@/context/AppContext";

export const CameraRig: React.FC = () => {
	const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
	const { targetVector } = useAppContext();

	// Current vector for smoothing (like Drei lerp)
	const current = useRef(new THREE.Vector3(0, 0, 0));

	useFrame((_, delta) => {
		if (!cameraRef.current) return;

		// Smooth interpolation toward target vector
		current.current.lerp(targetVector, delta * 1);

		cameraRef.current.position.set(current.current.x, current.current.y, 5);
		cameraRef.current.lookAt(0, 0, 0);
	});

	return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />;
};
