import React, { useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import * as THREE from "three";
import {
	CONTENT_X_INTENSITY,
	CONTENT_Y_INTENSITY,
	CONTENT_LERP_SPEED,
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
			if (ref.current) {
				ref.current.style.transform = `perspective(1880px) rotateY(${x}deg) rotateX(${y}deg) translateZ(50px)`;
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
