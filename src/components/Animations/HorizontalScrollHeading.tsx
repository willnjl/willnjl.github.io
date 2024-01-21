import React from "react";

type Props = {
	children?: React.ReactNode;
};

const HorizontalScrollHeading = ({ children }: Props) => {
	return (
		<div className="font-secondary text-[700px] leading-none whitespace-nowrap uppercase">
			{children}
		</div>
	);
};

export default HorizontalScrollHeading;
