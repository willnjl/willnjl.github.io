import Swiper from "swiper";

[].forEach.call(
	document.querySelectorAll(".swiper-work"),
	(item: HTMLElement) => {
		const swiper = new Swiper(item, {
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
