import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter({
				pages: 'dist',
				assets: 'dist',
				fallback: 'index.html'
			}),
			appDir: 'app',
			paths: {
				base: isGitHubActions ? '/time-calculator/svelte-app' : '',
				relative: false
			},
			prerender: {
				entries: ['*']
			}
		})
	],
	resolve: {
		mainFields: ['module', 'main']
	}
});
