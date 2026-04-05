interface DeviceInfo {
	type: "mobile" | "tablet" | "desktop";
	os: "iOS" | "Android" | "Windows" | "macOS" | "Linux" | "Unknown";
	browser: string;
	isMobile: boolean;
	isTablet: boolean;
	userAgent: string;
}

export function sniffDevice(): DeviceInfo {
	const userAgent = navigator.userAgent;

	// Detect OS
	let os: DeviceInfo["os"] = "Unknown";
	if (/iPhone|iPad|iPod/.test(userAgent)) {
		os = "iOS";
	} else if (/Android/.test(userAgent)) {
		os = "Android";
	} else if (/Windows/.test(userAgent)) {
		os = "Windows";
	} else if (/Macintosh/.test(userAgent)) {
		os = "macOS";
	} else if (/Linux/.test(userAgent)) {
		os = "Linux";
	}

	// Detect browser
	let browser = "Unknown";
	if (/Chrome/.test(userAgent) && !/Chromium/.test(userAgent)) {
		browser = "Chrome";
	} else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
		browser = "Safari";
	} else if (/Firefox/.test(userAgent)) {
		browser = "Firefox";
	} else if (/Edge|Edg/.test(userAgent)) {
		browser = "Edge";
	} else if (/Trident/.test(userAgent)) {
		browser = "Internet Explorer";
	}

	// Detect device type
	const isMobile = /iPhone|Android|BlackBerry|IEMobile|Opera Mini/i.test(
		userAgent,
	);
	const isTablet = /iPad|Android|Tablet/i.test(userAgent) && !isMobile;
	let type: DeviceInfo["type"] = "desktop";

	if (isMobile) {
		type = "mobile";
	} else if (isTablet) {
		type = "tablet";
	}

	return {
		type,
		os,
		browser,
		isMobile,
		isTablet,
		userAgent,
	};
}
