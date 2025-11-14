import React, { useState, useEffect } from "react";
import "./styles.scss";

export default function LoadingScreen() {
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setHasLoaded(true);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	if (hasLoaded) return null;

	return (
		<div className="loading-screen">
			<div className="loading-content">
				<div className="loading-bubbles">
					<div className="bubble"></div>
					<div className="bubble"></div>
					<div className="bubble"></div>
				</div>
				<h2>Illuminting...</h2>
				<div className="loading-bar">
					<div className="loading-progress"></div>
				</div>
			</div>
		</div>
	);
}
