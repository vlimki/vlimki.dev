/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontSize: {
			xxxs: ['13px', '1.5rem'],
			xxs: ['14px', '1.5rem'],
			xs: ['15px', '1.5rem'],
			sm: ['16px', '1.5rem'],
			base: ['18px', '1.7rem'],
			lg: ['19px', '1.7rem'],
			xl: ['22px', '1.7rem'],
			xxl: ['26px', '1.7rem'],
		},
    	extend: {},
	},
  	plugins: [],
}

