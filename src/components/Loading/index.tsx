import React from "react";

interface LoadingProps {
	size?: "small" | "medium" | "large";
	text?: string;
}

const Loading: React.FC<LoadingProps> = ({
	size = "medium",
	text = "Loading...",
}) => {
	return (
		<div className={`loading-container loading-${size}`}>
			<div className="loading-spinner"></div>
			{text && <p className="loading-text">{text}</p>}
		</div>
	);
};

export default Loading;
