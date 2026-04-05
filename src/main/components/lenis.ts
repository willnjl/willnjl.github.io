import Lenis from "lenis";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const lenis = new Lenis({
	autoRaf: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
	lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
