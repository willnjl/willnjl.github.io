import React from "react";
import "./styles/app.scss";
import Scene from "./components/Scene";
export default function App() {
	const [isActive, setIsActive] = React.useState(false);

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsActive(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<header className={`coverpage ${isActive ? "coverpage--closed" : ""}`}>
			<Scene />
			<div className="wrap">
				<h2>React Widget</h2>
				<p>This React app is embedded inside a normal webpage.</p>
			</div>
		</header>
	);
}
