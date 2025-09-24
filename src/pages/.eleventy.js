const lodash = require('lodash');
const htmlmin = require('html-minifier');
const svgContents = require('eleventy-plugin-svg-contents');
const pluginPWA = require('./tools/eleventy-plugin-pwa');
const fs = require('fs');
const path = require('path');
const eleventyVue = require('@11ty/eleventy-plugin-vue');
const { createCanvas, loadImage } = require('canvas');
const { formatTitle } = require('./tools/format-title');


const createSocialImageForArticle = (input, output) =>
	new Promise(async (resolve, reject) => {
		// read data from input file
		try {
			const data = fs.readFileSync(input, {
				encoding: 'utf-8'
			});

			// get title from file data
			const [, title] = data.match(/cardTitle:(.*)/);

			const post = {
				title: title,
				author: 'coffeeandfun.com'
			};

			const width = 1200;
			const height = 627;
			// Set the coordinates for the image position.
			const imagePosition = {
				w: 70,
				h: 70,
				x: 455,
				y: 475
			};
			// Because we are putting the image near the top (y: 75)
			// move the title down.
			const titleY = 260;
			const titleLineHeight = 100;
			// Bring up the author's Y value as well to make it all
			// fit together nicely.
			const authorY = 525;

			const canvas = createCanvas(width, height);
			const context = canvas.getContext('2d');

			const splashSolid = await loadImage('./tools/images/splash-1.png');
			const splashStriped = await loadImage('./tools/images/splash-2.png');
			const helperbirdLogo = await loadImage('./tools/images/helperbird-logo.png');

			context.fillStyle = '#450a75';
			context.fillRect(0, 0, width, height);

			context.font = "bold 50pt 'PT Sans'";
			context.textAlign = 'center';
			context.fillStyle = '#ffffff';

			const titleText = formatTitle(post.title);
			context.fillText(titleText[0], 600, titleY);
			if (titleText[1]) {
				context.fillText(titleText[1], 600, titleY + titleLineHeight);
			}

			context.font = "25pt 'PT Sans'";
			context.textAlign = 'center';
			context.fillStyle = '#ffffff';
			context.fillText(`${post.author}`, 650, authorY);

			const { w, h, x, y } = imagePosition;
			context.drawImage(helperbirdLogo, x, y, w, h);
			context.drawImage(splashSolid, 1000, 0, 403, 409);
			context.drawImage(splashSolid, 200, 500, 403, 409);
			context.drawImage(splashStriped, -80, 48, 348, 252);
			context.drawImage(splashStriped, 1000, 400, 348, 252);
			context.drawImage(splashStriped, 100, 600, 348, 252);

			const outputDir = path.dirname(output);
			if (!fs.existsSync(outputDir)) {
				fs.mkdirSync(outputDir, { recursive: true });
			}

			// write the output image

			const stream = fs.createWriteStream(output);
			stream.on('finish', resolve);
			stream.on('error', reject);
			canvas
				.createPNGStream({
					quailty: 1.0
				})
				.pipe(stream);
		} catch (e) {
			console.error(this.inputPath, e);
			console.error(e);
		}
	});

const manifest = {
	'main.js': '/assets/js/main.bundle.js',
	'main.css': '/assets/js/main.css'
};
const format = require('date-fns/format');
const moment = require('moment');
const { tr } = require('date-fns/locale');

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ 'src/assets/': '/assets/' });
	eleventyConfig.addLiquidFilter('limit', (arr, limit) => arr.slice(0, limit));
	eleventyConfig.addPlugin(eleventyVue);
	eleventyConfig.addPlugin(pluginPWA, {
		swDest: './docs/service-worker.js',
		globDirectory: './docs'
	});
	eleventyConfig.addPlugin(svgContents);



	// add `date` filter
	eleventyConfig.addFilter('date', function (date, dateFormat) {
		return format(date, dateFormat);
	});

	// Random Filter: With the help from google search engine
	eleventyConfig.addFilter('shuffle', (arr) => lodash.shuffle(arr));

	eleventyConfig.addFilter('dateDisplay', function (input) {
		let xx = moment(input).format('MMMM Do YYYY');
		return xx;
	});

	let markdownIt = require('markdown-it');
	let markdownItClass = require('@toycode/markdown-it-class');
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};

	const mapping = {
  h1: 'leading-relaxed font-display text-3xl my-8 font-bold text-black',
  h2: 'leading-relaxed font-display text-2xl my-8 font-semibold text-black',
  h3: 'leading-relaxed font-display text-xl my-8 font-semibold text-black',
  h4: 'leading-relaxed font-display text-lg my-8 font-semibold text-black',

  p: 'leading-relaxed font-display mb-4 text-lg text-black',

  // Keep inline, no margins, no size bump
  strong: 'font-semibold text-black',
  // You don't need a separate "bold" key; remove it or mirror strong without margins
  // bold: 'font-bold text-black', // (optional) only if your renderer uses <bold>, no mx-*

  ul: 'leading-relaxed list-disc mt-4 space-y-2 pl-6 text-lg font-display ml-6 my-8 text-black',
  ol: 'leading-relaxed list-decimal list-inside mt-4 space-y-2 pl-6 text-lg font-display ml-6 my-8 text-black',
  // Don’t force flex on list items unless you really need icons
  li: 'leading-relaxed my-2 text-lg font-display text-black ml-4',

  table: 'table-auto w-full border-collapse border border-gray-300 text-lg font-display text-black mt-4 my-8',
  thead: 'bg-gray-100',
  th: 'border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium',
  tbody: '',
  tr: 'odd:bg-gray-50 even:bg-white',
  td: 'border border-gray-300 px-4 py-2 text-black',

  img: 'aspect-square rounded-2xl my-8 shadow-lg',
  hr: 'divider divider-neutral my-16',

  // Keep inline; remove mx-* so normal spaces work
  a: 'font-sans text-lg text-blue-600 hover:text-blue-800 underline underline-offset-2',

  iframe: 'w-full h-96 rounded-xl shadow-lg my-10',
blockquote: 'bg-gray-100 border-l-4 border-blue-400 pl-4 pr-6 py-3 rounded-lg italic text-gray-800 my-6 shadow-sm',
  code: 'bg-gray-100 text-gray-800 rounded p-1 text-sm font-mono',
  pre: 'bg-gray-100 p-4 rounded overflow-x-auto'
};


	eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
		// Eleventy 1.0+: use this.inputPath and this.outputPath instead
		if (outputPath && outputPath.endsWith('.html')) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			});
			return minified;
		}

		return content;
	});

	eleventyConfig.setLibrary('md', markdownIt(options).use(markdownItClass, mapping));
	eleventyConfig.setLiquidOptions({
		dynamicPartials: false,
		strictFilters: false // renamed from `strict_filters` in Eleventy 1.0
	});
	// Add a shortcode for bundled CSS.
	eleventyConfig.addShortcode('bundledCss', function () {
		return manifest['main.css'] ? `<link href="${manifest['main.css']}" rel="stylesheet" />` : '';
	});

	// Add a shortcode for bundled JS.
	eleventyConfig.addShortcode('bundledJs', function () {
		return manifest['main.js'] ? `<script src="${manifest['main.js']}"></script>` : '';
	});
	return {
		markdownTemplateEngine: 'liquid',
		dir: {
			data: '../_data',
			includes: '../_includes',
			input: 'src/pages/',
			output: 'docs'
		}
	};
};
