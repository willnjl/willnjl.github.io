import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useAppContext } from "@/context/AppContext";
import {
	CAMERA_MAX_X,
	CAMERA_MAX_Y,
	CAMERA_LERP_SPEED,
	CAMERA_POSITION_Z,
	CAMERA_START_X,
	CAMERA_START_Y,
	CAMERA_LOOK_AT_X,
	CAMERA_LOOK_AT_Y,
	CAMERA_LOOK_AT_Z,
} from "@/constants";

export const CameraRig: React.FC = ({ jellyfishRef }) => {
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

		// Apply movement relative to start position
		cameraRef.current.position.set(
			CAMERA_START_X + current.current.x,
			CAMERA_START_Y + current.current.y,
			CAMERA_POSITION_Z
		);
		if (jellyfishRef?.current) {
			cameraRef.current.lookAt(jellyfishRef.current.position);
		} else {
			cameraRef.current.lookAt(
				CAMERA_LOOK_AT_X,
				CAMERA_LOOK_AT_Y,
				CAMERA_LOOK_AT_Z
			);
		}
	});

	return (
		<PerspectiveCamera
			ref={cameraRef}
			makeDefault
			position={[CAMERA_START_X, CAMERA_START_Y, CAMERA_POSITION_Z]}
		/>
	);
};
