import React from "react";
import "./styles/app.scss";
import Scene from "./components/Scene";
import { useAppContext } from "./context/AppContext";

export default function App() {
	const { isActive } = useAppContext();

	return (
		<header className={`coverpage ${isActive ? "coverpage--closed" : ""}`}>
			<Scene />
			<div className="coverpage__content">
				<div className="wrap">
					<h2>Will Leighton</h2>
					<p>Press 'enter' to proceed</p>
				</div>
			</div>
		</header>
	);
}
