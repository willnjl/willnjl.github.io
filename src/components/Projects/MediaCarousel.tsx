"use client";

import { assetUrl } from "@/api/actions";
import { APIResponseCollection, APIResponseData } from "@/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import "swiper/css";
import LazyLoadMedia from "../LazyLoadMedia";
import { Autoplay } from "swiper/modules";
import rnd from "../utils/rnd";

const createOptions = (index: number): SwiperOptions => ({
	modules: [Autoplay],
	loop: true,
	autoplay: {
		delay: rnd(5000, 10000),
	},
	slidesPerView: 1.2,
	freeMode: true,
	spaceBetween: 10,
	centeredSlides: true,
	breakpoints: {
		900: {
			slidesPerView: "auto",
			centeredSlides: false,
		},
	},
});

type Props = {
	media?: APIResponseCollection<"plugin::upload.file">;
	index?: number;
};

const MediaCarousel = ({ media, index = 0 }: Props) => {
	const options = createOptions(index);
	return (
		<Swiper {...options}>
			{(media?.data ?? []).map((item) => (
				<SwiperSlide className="max-w-[550px] bg-slate-200" key={item.id}>
					<div className="aspect-w-16 aspect-h-9 ">
						<LazyLoadMedia
							src={assetUrl(item.attributes.url)}
							type={item.attributes.mime}
							alt={item.attributes.name}
							className="pointer-events-none w-full object-cover"
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default MediaCarousel;
