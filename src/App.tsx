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
			<div className="coverpage__content">
				<div className="wrap">
					<h2>Will Leighton</h2>
					<p>Press 'enter' to proceed</p>
				</div>
			</div>
		</header>
	);
}
