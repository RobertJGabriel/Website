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
		h1: 'leading-relaxed font-display text-pretty text-3xl mb-8 font-bold text-pretty text-gray-900',
		h2: 'leading-relaxed font-display text-pretty text-2xl mb-6 mt-12 font-semibold text-pretty text-gray-800',
		h3: 'leading-relaxed font-display text-pretty text-xl mb-4 mt-10 font-semibold text-pretty text-gray-700',
		h4: 'leading-relaxed font-display text-pretty text-lg mb-4 mt-8 font-semibold text-pretty text-gray-600',
		p: 'leading-relaxed font-display mb-4 mt-4 text-pretty text-lg text-pretty text-gray-900',
		strong: 'text-lg font-semibold text-pretty text-gray-800',
		bold: 'font-bold text-pretty text-gray-900',
		ul: 'list-disc list-inside mt-4 space-y-2 pl-6 text-pretty text-lg font-display ml-6 mb-8 text-pretty text-gray-900',
		ol: 'list-decimal list-inside mt-4 space-y-2 pl-6 text-pretty text-lg font-display ml-6 mb-8 text-pretty text-gray-900',
		li: 'mb-2 text-pretty text-lg font-display text-pretty text-gray-900 flex items-center',
		table:
			'table-auto w-full border-collapse border border-gray-300 text-pretty text-lg font-display text-pretty text-gray-900 mt-4 mb-8',
		thead: 'bg-gray-100',
		th: 'border border-gray-300 px-4 py-2 text-pretty text-left text-pretty text-gray-700 font-medium',
		tr: 'odd:bg-gray-50 even:bg-white',
		td: 'border border-gray-300 px-4 py-2 text-pretty text-gray-900',
		img: 'aspect-square rounded-3xl mb-8 shadow-lg',
		hr: 'divider divider-neutral my-10',
		a: 'text-lg text-pretty text-blue-500 hover:text-blue-700 underline',
		iframe: 'w-full h-96 rounded-3xl shadow-lg my-10',
		blockquote: 'border-l-4 border-gray-300 pl-4 italic text-pretty text-gray-700 my-4',
		code: 'bg-gray-100 text-pretty text-gray-800 rounded p-2 text-pretty text-sm font-mono',
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
