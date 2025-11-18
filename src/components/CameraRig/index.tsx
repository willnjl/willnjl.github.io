import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useAppContext } from "@/context/AppContext";
import { CAMERA_MAX_X, CAMERA_MAX_Y, CAMERA_LERP_SPEED } from "@/constants";

export const CameraRig: React.FC = () => {
	const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
	const { targetVector } = useAppContext();

	// Current vector for smoothing (like Drei lerp)
	const current = useRef(new THREE.Vector3(0, 0, 0));

	useFrame((_, delta) => {
		if (!cameraRef.current) return;

		// Clamp target to limits on each axis
		const clampedTargetX = Math.max(
			-CAMERA_MAX_X,
			Math.min(CAMERA_MAX_X, targetVector.x)
		);
		const clampedTargetY = Math.max(
			-CAMERA_MAX_Y,
			Math.min(CAMERA_MAX_Y, targetVector.y)
		);

		// Create clamped target vector
		const clampedTarget = new THREE.Vector3(clampedTargetX, clampedTargetY, 0);

		// Smooth interpolation toward clamped target
		current.current.lerp(clampedTarget, delta * CAMERA_LERP_SPEED);

		cameraRef.current.position.set(current.current.x, current.current.y, 5);
		cameraRef.current.lookAt(0, 0, 0);
	});

	return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />;
};
