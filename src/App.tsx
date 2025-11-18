import React, { useEffect } from "react";
import "./styles/app.scss";
import Scene from "./components/Scene";
import { useAppContext } from "./context/AppContext";
import Content from "./components/Content";

export default function App() {
	const { isActive } = useAppContext();
	const [isActiveDebounced, setIsActiveDebounced] = React.useState(isActive);

	// useEffect(() => {
	// 	const timer = setTimeout(() => setIsActiveDebounced(isActive), 300);
	// 	return () => clearTimeout(timer);
	// }, [isActive]);

	// useEffect(() => {
	// 	const body = document.querySelector("body") as HTMLBodyElement;
	// 	body.style.overflow = isActive ? "" : "hidden";
	// 	if (isActive) body.classList.add("body--coverpage-closed");
	// }, [isActive]);

	return (
		<header className={`coverpage`}>
			{!isActiveDebounced && (
				<>
					<Scene />
					<Content />
				</>
			)}
		</header>
	);
}
