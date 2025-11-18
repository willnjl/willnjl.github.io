import React, { useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import * as THREE from "three";
import {
	CONTENT_X_INTENSITY,
	CONTENT_Y_INTENSITY,
	CONTENT_LERP_SPEED,
	CONTENT_CHROMATIC_ABERRATION_INTENSITY,
	CONTENT_CHROMATIC_ABERRATION_MAX_OPACITY,
} from "@/constants";

export default () => {
	const { mouseVelocity } = useAppContext();
	const ref = useRef<HTMLDivElement>(null);

	const current = useRef(new THREE.Vector3(0, 0, 0));

	useEffect(() => {
		const animate = () => {
			const x = current.current.x * -CONTENT_X_INTENSITY;
			const y = current.current.y * CONTENT_Y_INTENSITY;

			current.current.lerp(mouseVelocity, CONTENT_LERP_SPEED);

			// Calculate chromatic aberration offset based on mouse velocity
			const velocity = Math.sqrt(
				current.current.x * current.current.x +
					current.current.y * current.current.y
			);
			const offsetX =
				current.current.x * CONTENT_CHROMATIC_ABERRATION_INTENSITY;
			const offsetY =
				current.current.y * CONTENT_CHROMATIC_ABERRATION_INTENSITY;

			if (ref.current) {
				ref.current.style.transform = `perspective(1880px) rotateY(${x}deg) rotateX(${y}deg) translateZ(50px)`;
				ref.current.style.textShadow = `
					${offsetX}px ${offsetY}px 0 rgba(255, 0, 0, ${Math.min(
					velocity * 0.75,
					CONTENT_CHROMATIC_ABERRATION_MAX_OPACITY
				)}),
					${-offsetX}px ${-offsetY}px 0 rgba(0, 255, 255, ${Math.min(
					velocity * 0.3,
					CONTENT_CHROMATIC_ABERRATION_MAX_OPACITY
				)}),
					0 0 10px rgba(0, 0, 0, 0.8)
				`;
			}
			requestAnimationFrame(animate);
		};
		animate();
	}, [mouseVelocity]);

	return (
		<div className="coverpage__content" ref={ref}>
			<div className="wrap">
				<h1>Will Leighton</h1>
				<p>Press 'enter' to proceed</p>
			</div>
		</div>
	);
};
