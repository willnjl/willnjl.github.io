import { ReactNode } from "react";

type Props = {
	className?: String;
	children: ReactNode;
};

const Section = (props: Props) => {
	const defaultClasses = "pt-10";
	const mergedClasses = `${defaultClasses} ${props.className || ""}`;
	return <section className={mergedClasses}>{props.children}</section>;
};

export default Section;
