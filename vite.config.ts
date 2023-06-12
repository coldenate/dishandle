import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// uncomment base if you want to deploy to github pages
export default defineConfig({
	// base: "/dishandle/",
	plugins: [react()],
});
