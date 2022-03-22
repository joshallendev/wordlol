module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				barlow: ['Barlow', 'sans-serif']
			},
			colors: {
				acc1: 'var(--app-acc1)',
				acc2: 'var(--app-acc2)',
				acc3: 'var(--app-acc3)',
				acc4: 'var(--app-acc4)',
				background: 'var(--app-background)'
			}
		}
	},
	plugins: []
};
