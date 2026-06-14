// Tailwind v4 reads the theme from src/assets/css/styles.css (@plugin/@theme).
// This file only declares the content sources so unused CSS is purged correctly.
module.exports = {
	content: [
		'./src/pages/**/*.{html,md,liquid,njk}',
		'./src/_includes/**/*.{html,liquid,njk}',
		'./src/assets/js/**/*.js'
	],
	theme: {
		extend: {}
	}
};
