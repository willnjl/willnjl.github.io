import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
	plugins: [tailwindcss()],
	root: ".",
	base: process.env.BASE_URL || "/",
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "/index.html"),
				fluid: resolve(__dirname, "/fluid.html"),
			},
		},
	},
});
