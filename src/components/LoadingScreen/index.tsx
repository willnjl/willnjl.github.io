import React, { useState } from "react";
import { LOADING_PHRASES } from "@/constants";

export default function LoadingScreen() {
	const [phrase] = useState(
		LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)]
	);
	return (
		<div className="loading-screen">
			<div className="loading-content">
				<div className="loading-bubbles">
					<div className="bubble"></div>
					<div className="bubble"></div>
					<div className="bubble"></div>
				</div>
				<h2>{phrase}...</h2>
				<div className="loading-bar">
					<div className="loading-progress"></div>
				</div>
			</div>
		</div>
	);
}
