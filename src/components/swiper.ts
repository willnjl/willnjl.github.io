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
			slidesPerView: 1,
			spaceBetween: 4,
			breakpoints: {
				640: {
					slidesPerView: "auto",
					spaceBetween: 10,
				},
			},
		});
	},
);
