import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
	ANCHOR_CHAIN_COLOR,
	ANCHOR_CHAIN_START_Y,
	ANCHOR_CHAIN_END_Y,
	ANCHOR_CHAIN_LINK_COUNT,
	ANCHOR_CHAIN_LINK_RADIUS,
	ANCHOR_CHAIN_LINK_THICKNESS,
	ANCHOR_CHAIN_POSITION,
} from "@/constants";

export const AnchorChain: React.FC = () => {
	const startY = ANCHOR_CHAIN_START_Y;
	const endY = ANCHOR_CHAIN_END_Y;
	const linkCount = ANCHOR_CHAIN_LINK_COUNT;
	const linkRadius = ANCHOR_CHAIN_LINK_RADIUS;
	const linkThickness = ANCHOR_CHAIN_LINK_THICKNESS;
	const position = ANCHOR_CHAIN_POSITION;

	const groupRef = useRef<THREE.Group>(null!);
	const timeRef = useRef(0);

	const chainLinks = useMemo(() => {
		const links = [];
		const totalHeight = startY - endY;
		const linkLength = linkRadius * 2; // Length of each link
		const spacing = linkLength * 1.65; // Slight overlap to connect links

		Array.from({ length: linkCount }).forEach((_, i) => {
			const y = startY - i * spacing;
			const isVertical = i % 2 === 0;

			links.push({
				position: new THREE.Vector3(position[0], y, position[2]),
				rotation: isVertical
					? new THREE.Euler(0, 0, 0)
					: new THREE.Euler(0, 0, Math.PI / 2),
				isVertical,
				index: i,
			});
		});

		return links;
	}, []);

	// Subtle animation - gentle swaying
	useFrame((state, delta) => {
		if (!groupRef.current) return;

		timeRef.current += delta * 0.5;

		groupRef.current.children.forEach((child, i) => {
			const link = chainLinks[i];
			if (!link) return;

			// Gentle sway effect that increases with depth
			const depthFactor = i / linkCount;
			const swayX = Math.sin(timeRef.current + i * 0.2) * 0.03 * depthFactor;
			const swayZ =
				Math.cos(timeRef.current * 0.7 + i * 0.3) * 0.03 * depthFactor;

			child.position.x = link.position.x + swayX;
			child.position.z = link.position.z + swayZ;

			// Slight rotation sway
			const rotationSway =
				Math.sin(timeRef.current * 0.5 + i * 0.15) * 0.05 * depthFactor;
			child.rotation.y = rotationSway;
		});
	});

	return (
		<group ref={groupRef}>
			{chainLinks.map((link, i) => (
				<mesh
					key={i}
					position={link.position}
					rotation={link.rotation}
					castShadow
					receiveShadow
					scale={link.isVertical ? [1, 2, 1] : [2, 1, 1]}
				>
					<torusGeometry args={[linkRadius, linkThickness, 12, 24]} />
					<meshStandardMaterial
						color={ANCHOR_CHAIN_COLOR}
						metalness={1}
						roughness={1}
						envMapIntensity={1.5}
					/>
				</mesh>
			))}
		</group>
	);
};

export default AnchorChain;
