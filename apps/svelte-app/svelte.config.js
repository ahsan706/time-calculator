import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const repoBase = '/time-calculator/svelte-app';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			fallback: 'index.html'
		}),
		appDir: 'app',
		paths: {
			base: isGitHubActions ? repoBase : '',
			relative: false
		},
		prerender: {
			entries: ['*']
		}
	}
};

export default config;
