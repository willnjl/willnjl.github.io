import React, { useEffect, useState } from "react";
import "./ScreenMoveIndicator.scss";
import { useAppContext } from "@/context/AppContext";

const ScreenMoveIndicator: React.FC = () => {
	const { isMobile } = useAppContext();
	const [visible, setVisible] = useState(true);

	const message = isMobile ? "Move around with your finger" : "Move around";
	return (
		<div className="screen-move-indicator fade">
			<div className="move-path">
				<div className="move-trail">
					<div className="trail trail-1" />
					<div className="trail trail-2" />
					<div className="trail trail-3" />
				</div>
				<div className="move-dot" />
			</div>
			<div className="move-text">{message}</div>
		</div>
	);
};

export default ScreenMoveIndicator;
