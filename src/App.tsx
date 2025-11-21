import React, { useEffect, useState } from "react";
import "./styles/app.scss";
import Scene from "./components/Scene";
import { useAppContext } from "./context/AppContext";
import Content from "./components/Content";
import ScreenMoveIndicator from "./components/ScreenMoveIndicator";

export default function App() {
	const { isClosed, isMobile } = useAppContext();
	useEffect(() => {
		const body = document.querySelector("body") as HTMLBodyElement;
		body.style.overflow = isClosed ? "" : "hidden";
		if (isClosed) body.classList.add("body--coverpage-closed");
	}, [isClosed]);

	return (
		<header className={`coverpage ${isClosed ? "coverpage--closed" : ""}`}>
			{!isClosed && (
				<>
					<ScreenMoveIndicator />
					<Scene />
					<Content />
				</>
			)}
		</header>
	);
}
