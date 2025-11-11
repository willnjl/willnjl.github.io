import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

export default () => {
	const { mousePosition } = useAppContext();

	const x = -mousePosition.x < 0 ? -mousePosition.x * 5 : -mousePosition.x * 20;
	const y = mousePosition.y * 8;

	return (
		<div
			className="coverpage__content"
			style={{
				transform: `perspective(1880px) rotateY(${x}deg) rotateX(${y}deg) translateZ(50px)`,
			}}
		>
			<div className="wrap">
				<h2>Will Leighton</h2>
				<p>Press 'enter' to proceed</p>
			</div>
		</div>
	);
};
