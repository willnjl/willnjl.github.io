import { useEffect } from "react";
import "@/three/styles/app.scss";
import { useAppContext } from "./context/AppContext";
import Content from "./components/Content";
import Coverpage from "./components/Coverpage";
import { killReactApp } from "./main";

export default function App() {
	const { isClosed } = useAppContext();

	useEffect(() => {
		const body = document.querySelector("body") as HTMLBodyElement;
		body.style.overflow = isClosed ? "" : "hidden";
		if (isClosed)
			setTimeout(() => {
				killReactApp();
			}, 2500);
	}, [isClosed]);

	return (
		<div className={`${isClosed ? "site--entered" : ""}`}>
			<Coverpage />
			<Content />
		</div>
	);
}
