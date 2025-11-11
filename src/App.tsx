import React from "react";
import "./styles/app.scss";
import Scene from "./components/Scene";
export default function App() {
	return (
		<header className="coverpage">
			<Scene />
			<div className="wrap">
				<h2>React Widget</h2>
				<p>This React app is embedded inside a normal webpage.</p>
			</div>
		</header>
	);
}
