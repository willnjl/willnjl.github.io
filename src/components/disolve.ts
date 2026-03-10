import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dissolveSections = gsap.utils.toArray<HTMLElement>(".dissolve");

dissolveSections.forEach((section) => {
	const items = Array.from(section.children) as HTMLElement[];

	if (!items.length) return;

	const resetItems = () => {
		gsap.set(items, {
			autoAlpha: 1,
			y: 0,
			filter: "blur(0px)",
			willChange: "auto",
		});
	};

	resetItems();

	const dissolveTween = gsap.to(items, {
		autoAlpha: 0,
		filter: "blur(14px)",
		duration: 1.1,
		stagger: {
			each: 0.12,
			from: "random",
		},
		ease: "power4.out",
		paused: true,
		onComplete: () => {
			gsap.set(items, { willChange: "auto" });
		},
	});

	ScrollTrigger.create({
		trigger: section,
		start: "top top+=55",
		onEnter: () => {
			gsap.set(items, { willChange: "transform, opacity, filter" });
			dissolveTween.restart();
		},
		onEnterBack: () => {
			dissolveTween.pause(0);
			resetItems();
		},
		onLeaveBack: () => {
			dissolveTween.pause(0);
			resetItems();
		},
	});
});
