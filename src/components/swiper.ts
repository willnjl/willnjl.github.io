import Swiper from "swiper";
import { Navigation } from "swiper/modules";

[].forEach.call(
	document.querySelectorAll(".swiper-work"),
	(item: HTMLElement) => {
		new Swiper(item, {
			modules: [Navigation],
			navigation: {
				nextEl: ".swiper-nav-next",
				prevEl: ".swiper-nav-prev",
			},
			slidesPerView: "auto",
			spaceBetween: 4,
			breakpoints: {
				1025: {
					spaceBetween: 15,
				},
			},
		});
	},
);
