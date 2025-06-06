/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontSize: {
			xxxs: ['13px', '1.0'],
			xxs: ['14px', '1.1'],
			xs: ['15px', '1'],
			sm: ['16px', '1.3'],
			base: ['17px', '1.5'],
			lg: ['19px', '1.6'],
			xl: ['20px', '1.6'],
			xxl: ['23px', '1.6'],
		},
    	extend: {},
	},
  	plugins: [],
}

