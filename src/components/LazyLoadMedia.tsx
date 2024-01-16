import React, { useEffect, useRef, useState } from "react";

interface LazyLoadMediaProps {
	src: string;
	alt: string;
	type: string;
	className?: string;
	attr?: any;
}

const useLazyLoadMedia = (): [React.RefObject<HTMLElement>, boolean] => {
	const [isIntersecting, setIntersecting] = useState(false);
	const targetRef = useRef<HTMLMediaElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIntersecting(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 } // Adjust threshold as needed
		);

		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		return () => {
			if (targetRef.current) {
				observer.unobserve(targetRef.current);
			}
		};
	}, []);

	return [targetRef, isIntersecting];
};

function isImageMIMEType(type: string): boolean {
	const imageRegex = /^image\//;
	return imageRegex.test(type);
}

const LazyLoadMedia: React.FC<LazyLoadMediaProps> = ({
	src,
	alt,
	type,
	className,
	attr,
}) => {
	const [targetRef, isIntersecting] = useLazyLoadMedia();

	return isImageMIMEType(type) ? (
		<img
			ref={targetRef as React.RefObject<HTMLImageElement>}
			src={isIntersecting ? src : ""}
			alt={alt}
			className={className}
		/>
	) : (
		<video
			ref={targetRef as React.RefObject<HTMLVideoElement>}
			src={isIntersecting ? src : ""}
			className={className}
			autoPlay
			loop
			muted
			playsInline
		/>
	);
};

export default LazyLoadMedia;
