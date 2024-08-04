import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	css: {
		postcss: true
	},
	build: {
  	rollupOptions: {
     	// cf. https://rollupjs.org/configuration-options/#external
    	external: ['css-tree'],
    }
  }
};

export default config;
