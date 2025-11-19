import { useRef, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { Texture, CanvasTexture } from "three";
import {
	LUMINESCENT_PARTICLE_COUNT,
	LUMINESCENT_PARTICLE_COLOR,
	LUMINESCENT_PARTICLE_SIZE,
	LUMINESCENT_PARTICLE_OPACITY,
	LUMINESCENT_PARTICLE_ACTIVITY,
} from "@/constants";
// Generate a circular alpha map texture for round particles
function createCircleTexture(size = 64) {
	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = size;
	const ctx = canvas.getContext("2d");
	if (ctx) {
		ctx.clearRect(0, 0, size, size);
		ctx.beginPath();
		ctx.arc(size / 2, size / 2, size / 2 - 1, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fillStyle = "white";
		ctx.fill();
	}
	return new CanvasTexture(canvas);
}
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const LuminescentParticles: React.FC = () => {
	const count = LUMINESCENT_PARTICLE_COUNT;
	const color = LUMINESCENT_PARTICLE_COLOR;
	const size = LUMINESCENT_PARTICLE_SIZE;
	const opacity = LUMINESCENT_PARTICLE_OPACITY;
	const meshRef = useRef<THREE.Points>(null!);
	const particles = useMemo(() => {
		const positions = [];
		const colors = [];
		for (let i = 0; i < count; i++) {
			const x = (Math.random() - 0.5) * 16;
			const y = (Math.random() - 0.5) * 16;
			const z = (Math.random() - 0.5) * 16;
			positions.push(x, y, z);
			const c = new THREE.Color(color);
			colors.push(c.r, c.g, c.b);
		}
		return {
			positions: new Float32Array(positions),
			colors: new Float32Array(colors),
		};
	}, [count, color]);

	useFrame(() => {
		if (!meshRef.current) return;
		// Animate particles (twinkle effect)
		const time = performance.now() * 0.001;
		const positions = meshRef.current.geometry.attributes.position;
		for (let i = 0; i < count; i++) {
			positions.setY(
				i,
				positions.getY(i) + Math.sin(time + i) * LUMINESCENT_PARTICLE_ACTIVITY
			);
		}
		positions.needsUpdate = true;
	});

	// Memoize the circle texture so it's only created once
	const circleTexture = useMemo(() => createCircleTexture(64), []);

	return (
		<points ref={meshRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					args={[particles.positions, 3]}
				/>
				<bufferAttribute
					attach="attributes-color"
					args={[particles.colors, 3]}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={size}
				sizeAttenuation={true}
				vertexColors
				color={color}
				alphaMap={circleTexture}
				transparent
				opacity={opacity}
				depthWrite={false}
				blending={THREE.AdditiveBlending}
			/>
		</points>
	);
};

export default LuminescentParticles;
