module.exports = {
	enabled: true,
	content: [
		'./src/**/**/*.html',
		'./pages/**/**/*.html',
		'./pages/**/**/*.md',
		'./pages/**/**/*.liquid',
		'./pages/**/**/*.njk',
		'./src/**/**/*.md',
		'./src/**/**/*.liquid',
		'./src/**/**/*.njk',
		'./src/assets/js/**/*.js'
	],
	theme: {},
	variants: {
		extend: {
			fill: ['hover']
		}
	}
};
