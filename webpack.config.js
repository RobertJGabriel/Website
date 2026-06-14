const path = require('path');

// Webpack only bundles the small JS entry point. All CSS is compiled by
// Eleventy's Tailwind step (see .eleventy.js), so there is no CSS pipeline here.
module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	context: path.resolve(__dirname, 'src'),
	entry: './assets/js/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: { presets: ['@babel/preset-env'] }
				}
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'docs/assets/js/'),
		filename: 'main.bundle.js'
	}
};
