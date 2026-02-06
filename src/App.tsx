import React, { useEffect, useState } from "react";
import "./styles/app.scss";
import Scene from "./components/Scene";
import { useAppContext } from "./context/AppContext";
import EnterMessage from "./components/EnterMessage";
import ScreenMoveIndicator from "./components/ScreenMoveIndicator";
import BlurLayer from "./components/BlurLayer";
import Content from "./components/Content";
import Coverpage from "./components/Coverpage";

export default function App() {
	const { isClosed, isMobile } = useAppContext();
	useEffect(() => {
		const body = document.querySelector("body") as HTMLBodyElement;
		body.style.overflow = isClosed ? "" : "hidden";
		if (isClosed) body.classList.add("body--coverpage-closed");
	}, [isClosed]);

	return (
		<div className={`${isClosed ? "site--entered" : ""}`}>
			<Coverpage />
			<Content />
		</div>
	);
}
