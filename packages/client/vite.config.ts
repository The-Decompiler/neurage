import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
	plugins: [reactRefresh()],
	resolve: {
		alias: {
			"components": "./components/",
			"static": "../static/",
		},
	},
});
