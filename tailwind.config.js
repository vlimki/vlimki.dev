/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontSize: {
			xxxs: ['14px', '1.5rem'],
			xxs: ['15px', '1.5rem'],
			xs: ['16px', '1.5rem'],
			sm: ['17px', '1.5rem'],
			base: ['19px', '1.7rem'],
			lg: ['19px', '1.7rem'],
			xl: ['21px', '1.7rem'],
			xxl: ['26px', '1.7rem'],
		},
    	extend: {},
	},
  	plugins: [],
}

