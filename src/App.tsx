import React from "react";
import "./styles/app.scss";
import Scene from "./components/Scene";
import { useAppContext } from "./context/AppContext";

export default function App() {
	const { isActive, mousePosition } = useAppContext();

	return (
		<header className={`coverpage ${isActive ? "coverpage--closed" : ""}`}>
			<Scene />
			<div
				className="coverpage__content"
				style={{
					transform: `perspective(2000px) rotateY(${
						-mousePosition.x * 5
					}deg) rotateX(${-mousePosition.y * 5}deg) translateZ(50px)`,
				}}
			>
				<div className="wrap">
					<h2>Will Leighton</h2>
					<p>Press 'enter' to proceed</p>
				</div>
			</div>
		</header>
	);
}
