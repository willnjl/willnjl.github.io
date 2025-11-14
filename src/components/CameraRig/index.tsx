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

	// Camera movement limits
	const MAX_X = 10;
	const MAX_Y = 3;

	useFrame((_, delta) => {
		if (!cameraRef.current) return;

		// Clamp target to limits on each axis
		const clampedTargetX = Math.max(-MAX_X, Math.min(MAX_X, targetVector.x));
		const clampedTargetY = Math.max(-MAX_Y, Math.min(MAX_Y, targetVector.y));

		// Create clamped target vector
		const clampedTarget = new THREE.Vector3(clampedTargetX, clampedTargetY, 0);

		// Smooth interpolation toward clamped target
		current.current.lerp(clampedTarget, delta * 1);

		cameraRef.current.position.set(current.current.x, current.current.y, 5);
		cameraRef.current.lookAt(0, 0, 0);
	});

	return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />;
};
