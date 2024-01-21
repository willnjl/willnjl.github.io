import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			sans: ["Bacasime Antique", ...defaultTheme.fontFamily.sans],
			secondary: ["Tahoma", ...defaultTheme.fontFamily.sans],
		},
		extend: {
			colors: {
				blue: {
					200: "#575772",
					400: "#2D2C3D",
					600: "#201F31",
				},
				black: {
					DEFAULT: "#030303",
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [require("@tailwindcss/aspect-ratio")],
};
export default config;
