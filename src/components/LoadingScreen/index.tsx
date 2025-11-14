import React, { useState, useEffect } from "react";

export default function LoadingScreen() {
	const [hasLoaded, setHasLoaded] = useState(false);

	return (
		<div className="loading-screen">
			<div className="loading-content">
				<div className="loading-bubbles">
					<div className="bubble"></div>
					<div className="bubble"></div>
					<div className="bubble"></div>
				</div>
				<h2>Illuminating...</h2>

				<div className="loading-bar">
					<div className="loading-progress"></div>
				</div>
			</div>
		</div>
	);
}
