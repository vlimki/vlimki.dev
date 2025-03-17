/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontSize: {
			xxxs: ['13px', '1.4rem'],
			xxs: ['14px', '1.4rem'],
			xs: ['15px', '1.4rem'],
			sm: ['16px', '1.4rem'],
			base: ['17px', '1.6rem'],
			lg: ['17px', '1.6rem'],
			xl: ['20px', '1.6rem'],
			xxl: ['23px', '1.6rem'],
		},
    	extend: {},
	},
  	plugins: [],
}

