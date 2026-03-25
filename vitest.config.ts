import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom', // <--- C'est ici que ça se joue
		globals: true,
		setupFiles: ['./vitest-setup.ts'] // On va créer ce fichier juste après
	}
});