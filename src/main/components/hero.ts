import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hero = document.querySelector("#hero");

hero &&
	(() => {
		gsap.set(hero, {
			autoAlpha: 1,
			filter: "blur(0px)",
			willChange: "transform, opacity, filter",
		});

		gsap.to(hero, {
			autoAlpha: 0,
			filter: "blur(14px)",
			duration: 0.5,
			ease: "power4.out",
			onComplete: () => {
				gsap.set(hero, { willChange: "auto" });
			},
			scrollTrigger: {
				trigger: hero,
				start: "top top-=120px",
				toggleActions: "play none none reverse",
			},
		});
	})();
