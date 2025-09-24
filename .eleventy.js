// .eleventy.js (ESM style for Eleventy v3)


import htmlmin from 'html-minifier';
import svgContents from 'eleventy-plugin-svg-contents';
//import pluginPWA from './tools/eleventy-plugin-pwa';
import fs from 'fs';
import path from 'path';
import eleventyVue from '@11ty/eleventy-plugin-vue';
import { createCanvas, loadImage } from 'canvas';
import { formatTitle } from './tools/format-title.js';

import moment from 'moment';
import format from 'date-fns/format/index.js';
import postcss from 'postcss';
//import tailwindcss from 'tailwindcss';
import markdownIt from 'markdown-it';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItAnchor from 'markdown-it-anchor';
import tailwindcss from '@tailwindcss/postcss';

const createSocialImageForArticle = async (input, output) => {
	try {
		const data = fs.readFileSync(input, 'utf-8');
		const [, title] = data.match(/cardTitle:(.*)/);

		const post = {
			title: title,
			author: 'coffeeandfun.com'
		};

		const width = 1200;
		const height = 627;
		const canvas = createCanvas(width, height);
		const context = canvas.getContext('2d');

		const splashSolid = await loadImage('./tools/images/splash-1.png');
		const splashStriped = await loadImage('./tools/images/splash-2.png');
		const helperbirdLogo = await loadImage('./tools/images/helperbird-logo.png');

		context.fillStyle = '#450a75';
		context.fillRect(0, 0, width, height);

		const titleText = formatTitle(post.title);
		context.font = "bold 50pt 'PT Sans'";
		context.textAlign = 'center';
		context.fillStyle = '#ffffff';
		context.fillText(titleText[0], 600, 260);
		if (titleText[1]) {
			context.fillText(titleText[1], 600, 360);
		}

		context.font = "25pt 'PT Sans'";
		context.fillText(`${post.author}`, 650, 525);

		context.drawImage(helperbirdLogo, 455, 475, 70, 70);
		context.drawImage(splashSolid, 1000, 0, 403, 409);
		context.drawImage(splashSolid, 200, 500, 403, 409);
		context.drawImage(splashStriped, -80, 48, 348, 252);
		context.drawImage(splashStriped, 1000, 400, 348, 252);
		context.drawImage(splashStriped, 100, 600, 348, 252);

		const outputDir = path.dirname(output);
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}

		const stream = fs.createWriteStream(output);
		stream.on('finish', () => {});
		stream.on('error', (e) => console.error(e));

		canvas.createPNGStream({ quality: 1.0 }).pipe(stream);
	} catch (e) {
		console.error('Error generating social image:', e);
	}
};

export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ 'src/assets/': '/assets/' });

	eleventyConfig.addLiquidFilter('limit', (arr, limit) => arr.slice(0, limit));
	eleventyConfig.addPlugin(eleventyVue);

	eleventyConfig.addPlugin(svgContents);

	eleventyConfig.addFilter('date', (date, dateFormat) => format(date, dateFormat));
	eleventyConfig.addFilter('formatDateWithOrdinal', (dateString) => {
		try {
			return moment(dateString).format('MMMM Do, YYYY');
		} catch (error) {
			console.error('Error formatting date:', error);
			return dateString;
		}
	});

	eleventyConfig.addFilter('dateDisplay', (input) => moment(input).format('MMMM Do YYYY'));

	const markdownOptions = {
		html: true,
		breaks: false,
		linkify: true
	};

	const tagMap = {
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


	eleventyConfig.setLibrary(
		'md',
		markdownIt(markdownOptions)
			.use(markdownItClass, tagMap)
			.use(markdownItAnchor, { permalink: false })
	);

	eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
		if (process.env.ELEVENTY_ENV === 'production' && outputPath.endsWith('.html')) {
			return htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			});
		}
		return content;
	});

	eleventyConfig.on('eleventy.before', async () => {
		const tailwindInputPath = path.resolve('./src/assets/css/styles.css');
		const tailwindOutputPath = './docs/assets/css/engine.css';
		const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');
		const outputDir = path.dirname(tailwindOutputPath);

		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}

		// 🔥 Auto-generate asset list for PWA
		const walk = (dir) => {
			const files = fs.readdirSync(dir);
			return files.flatMap((file) => {
				const fullPath = path.join(dir, file);
				if (fs.statSync(fullPath).isDirectory()) {
					return walk(fullPath);
				} else {
					const relative = '/' + path.relative('./docs', fullPath).replace(/\\/g, '/');

					return [relative];
				}
			});
		};
		const allAssets = walk('./docs').filter((f) => !f.endsWith('.map'));
		const outputJsonPath = './docs/cache-assets.json';
		fs.writeFileSync(outputJsonPath, JSON.stringify(allAssets, null, 2));
		const result = await postcss([tailwindcss()]).process(cssContent, {
			from: tailwindInputPath,
			to: tailwindOutputPath
		});

		fs.writeFileSync(tailwindOutputPath, result.css);
	});

	eleventyConfig.setLiquidOptions({
		dynamicPartials: false,
		strictFilters: false
	});

	const manifest = {
		'main.js': '/assets/js/main.bundle.js',
		'main.css': '/assets/css/engine.css'
	};

	eleventyConfig.addShortcode('bundledCss', () =>
		manifest['main.css'] ? `<link href="${manifest['main.css']}" rel="stylesheet" />` : ''
	);
	eleventyConfig.addShortcode('bundledJs', () =>
		manifest['main.js'] ? `<script src="${manifest['main.js']}"></script>` : ''
	);
	// Register service worker manually
	eleventyConfig.addPassthroughCopy('./src/service-worker.js');
	eleventyConfig.addPassthroughCopy('./src/manifest.webmanifest');

	return {
		markdownTemplateEngine: 'liquid',
		dir: {
			data: '../_data',
			includes: '../_includes',
			input: 'src/pages/',
			output: 'docs'
		},
		// 👇 This allows output files like CNAME without extensions
		allowsFileExtensionsOnPermalinks: false
	};
}
