import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(), // <--- Indispensable pour transformer le SCSS

	kit: {
		adapter: adapter(),
		alias: {
			$lib: './src/lib' // <--- Permet d'utiliser $lib dans tes imports
		}
	}
};

export default config;