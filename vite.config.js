import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [
		tailwindcss(),
		react({
			include: /src\/three\/.*\.(tsx|jsx)$/,
		}),
	],
	root: ".",
	base: process.env.BASE_URL || "/",
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "/index.html"),
				fluid: resolve(__dirname, "/fluid.html"),
				three: resolve(__dirname, "/three-js.html"),
			},
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
});
