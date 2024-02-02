"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

type Props = {
	delay?: number;
	translateX?: number;
	end?: string;
	start?: string;
	className?: string;
	children: React.ReactNode;
};

gsap.registerPlugin(ScrollTrigger, SplitText);
const HorizontalScrollHeading = (props: Props) => {
	// defaults
	const {
		delay = 0,
		translateX = -1200,
		end = "+=1500",
		start = "top bottom",
		className = "",
		children,
	} = props;

	const container = useRef<HTMLElement | any>();

	useGSAP(
		() => {
			gsap.to(".horizontal", {
				translateX,
				delay,
				scrollTrigger: {
					trigger: container.current,
					start,
					end,
					scrub: true,
				},
			});
		},
		{ scope: container }
	);

	return (
		<div
			ref={container}
			className="font-secondary text-[700px] leading-none whitespace-nowrap uppercase "
		>
			<div className={`horizontal`}>{children}</div>
		</div>
	);
};

export default HorizontalScrollHeading;
