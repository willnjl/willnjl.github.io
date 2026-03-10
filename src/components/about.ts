import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const about = document.querySelector("#about");
const screen = document.querySelector("#about-screen");

screen &&
	about &&
	(() => {
		gsap.from(screen, {
			scaleX: 0,
			// opacity: 0,
			duration: 1,
			ease: "expo.in",
			scrollTrigger: {
				trigger: about,
				start: "top bottom-=200px",
			},
		});
	})();
