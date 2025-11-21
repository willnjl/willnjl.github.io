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
		const spacing = linkLength * 1.7; // Slight overlap to connect links

		Array.from({ length: linkCount }).forEach((_, i) => {
			const y = startY - i * spacing;
			const isVertical = i % 2 === 0;
			links.push({
				position: new THREE.Vector3(position[0], y, position[2]),
				rotation: isVertical
					? new THREE.Euler(0, 0, 0)
					: new THREE.Euler(0, Math.PI / 2, 0),
				isVertical,
				index: i,
			});
		});

		return links;
	}, []);

	return (
		<group ref={groupRef}>
			{chainLinks.map((link, i) => (
				<mesh
					key={i}
					position={link.position}
					rotation={link.rotation}
					castShadow
					receiveShadow
					scale={[1, 2, 1]}
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
