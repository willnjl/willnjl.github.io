import React, { useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import * as THREE from "three";

const xIntensity = -4;
const yIntensity = -2;

export default () => {
	const { targetVector } = useAppContext();
	const ref = useRef<HTMLDivElement>(null);

	const current = useRef(new THREE.Vector3(0, 0, 0));

	useEffect(() => {
		const animate = () => {
			const x = current.current.x * xIntensity;
			const y = current.current.y * yIntensity;

			current.current.lerp(targetVector, 0.1);
			if (ref.current) {
				ref.current.style.transform = `perspective(1880px) rotateY(${x}deg) rotateX(${y}deg) translateZ(50px)`;
			}
			requestAnimationFrame(animate);
		};
		animate();
	}, [targetVector]);

	return (
		<div className="coverpage__content" ref={ref}>
			<div className="wrap">
				<h2>Will Leighton</h2>
				<p>Press 'enter' to proceed</p>
			</div>
		</div>
	);
};
