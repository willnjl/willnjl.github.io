import React, { useEffect, useState } from "react";
import "./ScreenMoveIndicator.scss";
import { useAppContext } from "@/context/AppContext";

const ScreenMoveIndicator: React.FC = () => {
	const { isMobile } = useAppContext();

	const [visible, setVisible] = useState(true);
	const [fade, setFade] = useState(false);
	useEffect(() => {
		const hide = () => setVisible(false);
		window.addEventListener("touchstart", hide, { once: true });
		window.addEventListener("mousedown", hide, { once: true });
		// 1.4s per repeat, 7 repeats = 9.8s
		const fadeTimeout = setTimeout(() => setFade(true), 9800);
		const hideTimeout = setTimeout(() => setVisible(false), 11000);
		return () => {
			window.removeEventListener("touchstart", hide);
			window.removeEventListener("mousedown", hide);
			clearTimeout(fadeTimeout);
			clearTimeout(hideTimeout);
		};
	}, []);
	if (!visible) return null;

	const message = isMobile ? "Move around with your finger" : "Move around";
	return (
		<div className={`screen-move-indicator${fade ? " fade" : ""}`}>
			<div className="move-path">
				<div className="move-trail">
					<div className="trail trail-1" />
					<div className="trail trail-2" />
					<div className="trail trail-3" />
				</div>
				<div className="move-dot" />
			</div>
			{!fade && <div className="move-text">{message}</div>}
		</div>
	);
};

export default ScreenMoveIndicator;
