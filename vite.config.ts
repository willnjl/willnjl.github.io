import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	root: ".", // The root is the current folder (so Vite uses index.html here)
	base: "./", // Ensures assets load correctly when deployed in subfolders
	build: {
		outDir: "dist",
		emptyOutDir: true,
	},
	server: {
		port: 5173,
	},
});
