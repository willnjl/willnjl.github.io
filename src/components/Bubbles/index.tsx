import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BubbleProps {
	count?: number;
	radius?: number;
	speed?: number;
}

const COLOR = "#e6effc6f";

export const Bubbles: React.FC<BubbleProps> = ({
	count = 100,
	radius = 5,
	speed = 0.5,
}) => {
	const meshRef = useRef<THREE.InstancedMesh>(null!);
	const dummy = useMemo(() => new THREE.Object3D(), []);

	// Increase height limit so bubbles rise much higher - extend far beyond visible range
	const maxHeight = radius * 8;

	// Generate random initial positions and velocities for each bubble
	const particles = useMemo(() => {
		const temp = [];
		for (let i = 0; i < count; i++) {
			// Spread bubbles evenly in all directions, avoiding the center area
			const angle = Math.random() * Math.PI * 2;
			const distanceFromCenter = Math.random() * 8 + 5; // 5 to 13 units from center

			const xPos = Math.cos(angle) * distanceFromCenter;
			const zPos = Math.sin(angle) * distanceFromCenter;

			temp.push({
				position: new THREE.Vector3(
					xPos,
					Math.random() * radius * 16 - radius * 8,
					zPos
				),
				velocity: new THREE.Vector3(
					(Math.random() - 0.5) * 0.02,
					Math.random() * 0.05 + 0.02,
					(Math.random() - 0.5) * 0.02
				),
				scale: Math.random() * 0.15 + 0.05,
				wobble: Math.random() * Math.PI * 2,
				wobbleSpeed: Math.random() * 0.02 + 0.01,
				angle,
				distanceFromCenter,
			});
		}
		return temp;
	}, [count, radius]);

	useFrame((state) => {
		if (!meshRef.current) return;

		particles.forEach((particle, i) => {
			// Update position
			particle.position.add(particle.velocity.clone().multiplyScalar(speed));

			// Add wobble effect
			particle.wobble += particle.wobbleSpeed;
			const wobbleOffset = Math.sin(particle.wobble) * 0.1;

			// Reset if bubble goes too high, maintaining radial distance from center
			if (particle.position.y > maxHeight) {
				particle.position.y = -maxHeight;

				const newAngle = Math.random() * Math.PI * 2;
				const newDistance = Math.random() * 8 + 5;

				particle.position.x = Math.cos(newAngle) * newDistance;
				particle.position.z = Math.sin(newAngle) * newDistance;
				particle.angle = newAngle;
				particle.distanceFromCenter = newDistance;
			}

			// Apply transformations
			dummy.position.set(
				particle.position.x + wobbleOffset,
				particle.position.y,
				particle.position.z + wobbleOffset
			);
			dummy.scale.setScalar(particle.scale);
			dummy.updateMatrix();

			meshRef.current.setMatrixAt(i, dummy.matrix);
		});

		meshRef.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
			<sphereGeometry args={[1, 16, 16]} />
			<meshPhysicalMaterial
				color="#a3b1bb"
				transparent
				opacity={0.3}
				roughness={0}
				metalness={0.1}
				transmission={0.9}
				thickness={0.5}
				envMapIntensity={1}
				clearcoat={1}
				clearcoatRoughness={0}
			/>
		</instancedMesh>
	);
};

export default Bubbles;
