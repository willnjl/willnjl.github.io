import React, { useEffect } from "react";
import "./styles/app.scss";
import Scene from "./components/Scene";
import { useAppContext } from "./context/AppContext";
import Content from "./components/Content";

export default function App() {
	const { isActive } = useAppContext();

	useEffect(() => {
		(document.querySelector("body") as HTMLBodyElement).style.overflow =
			isActive ? "" : "hidden";
	}, [isActive]);
	return (
		<header className={`coverpage ${isActive ? "coverpage--closed" : ""}`}>
			<Scene />
			<Content />
		</header>
	);
}
