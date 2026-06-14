// .eleventy.js (ESM, Eleventy v3)

import htmlmin from 'html-minifier';
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import markdownIt from 'markdown-it';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItAnchor from 'markdown-it-anchor';
import tailwindcss from '@tailwindcss/postcss';
import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import Image from '@11ty/eleventy-img';

export default function (eleventyConfig) {
	// {% image src, alt, class, maxWidth %} — responsive AVIF/WebP from an
	// explicit source path. Generates <picture> with srcset + width/height.
	eleventyConfig.addLiquidShortcode('image', async (src, alt, className, maxWidth) => {
		const w = parseInt(maxWidth, 10) || 480;
		const metadata = await Image(src, {
			widths: [w, w * 2],
			formats: ['avif', 'webp', 'auto'],
			outputDir: './docs/img/',
			urlPath: '/img/'
		});
		return Image.generateHTML(metadata, {
			alt: alt || '',
			class: className || '',
			sizes: `${w}px`,
			loading: 'lazy',
			decoding: 'async'
		});
	});

	// Atom feed for the blog → /feed.xml
	eleventyConfig.addPlugin(feedPlugin, {
		type: 'atom',
		outputPath: '/feed.xml',
		collection: { name: 'blog', limit: 20 },
		metadata: {
			language: 'en',
			title: 'Robert James Gabriel',
			subtitle: 'Writing on software engineering, web accessibility, and whatever else I am thinking about.',
			base: 'https://www.robertgabriel.ninja/',
			author: { name: 'Robert James Gabriel' }
		}
	});

	// Static assets
	eleventyConfig.addPassthroughCopy({ 'src/assets/': '/assets/' });
	// Root-level files (service worker needs root scope; CNAME + robots for hosting/SEO)
	eleventyConfig.addPassthroughCopy({ 'src/service-worker.js': 'service-worker.js' });
	eleventyConfig.addPassthroughCopy({ 'src/robots.txt': 'robots.txt' });
	eleventyConfig.addPassthroughCopy({ 'src/CNAME': 'CNAME' });

	// Filters
	eleventyConfig.addLiquidFilter('limit', (arr, limit) => arr.slice(0, limit));
	// ISO date (UTC) — stable regardless of the build machine's timezone.
	eleventyConfig.addFilter('date', (value) =>
		value ? new Date(value).toISOString().slice(0, 10) : ''
	);
	// Safe JSON for embedding data in a <script> (escapes </script> breakouts).
	eleventyConfig.addFilter('json', (value) =>
		JSON.stringify(value).replace(/</g, '\\u003c')
	);

	// Markdown — map elements to Tailwind classes so content pages stay on-theme
	const markdownOptions = { html: true, breaks: false, linkify: true };
	const tagMap = {
		h1: 'leading-relaxed font-display text-3xl my-8 font-bold text-black',
		h2: 'leading-relaxed font-display text-2xl my-8 font-semibold text-black',
		h3: 'leading-relaxed font-display text-xl my-8 font-semibold text-black',
		h4: 'leading-relaxed font-display text-lg my-8 font-semibold text-black',
		p: 'leading-relaxed font-display mb-4 text-lg text-black',
		strong: 'font-semibold text-black',
		ul: 'leading-relaxed list-disc mt-4 space-y-2 pl-6 text-lg font-display my-8 text-black',
		ol: 'leading-relaxed list-decimal mt-4 space-y-2 pl-6 text-lg font-display my-8 text-black',
		li: 'leading-relaxed my-2 text-lg font-display text-black',
		table: 'table-auto w-full border-collapse border border-gray-300 text-lg font-display text-black my-8',
		thead: 'bg-gray-100',
		th: 'border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium',
		tr: 'odd:bg-gray-50 even:bg-white',
		td: 'border border-gray-300 px-4 py-2 text-black',
		img: 'rounded-2xl my-8 shadow-md max-w-full h-auto',
		hr: 'divider divider-neutral my-16',
		a: 'font-sans text-lg text-blue-600 hover:text-blue-800 underline underline-offset-2',
		iframe: 'w-full aspect-video rounded-xl shadow-lg my-10',
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

	// Minify HTML in production
	eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
		if (process.env.ELEVENTY_ENV === 'production' && outputPath && outputPath.endsWith('.html')) {
			return htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true
			});
		}
		return content;
	});

	// Compile Tailwind CSS -> docs/assets/css/engine.css before Eleventy renders
	eleventyConfig.on('eleventy.before', async () => {
		const inputPath = path.resolve('./src/assets/css/styles.css');
		const outputDir = path.resolve('./docs/assets/css');
		fs.mkdirSync(outputDir, { recursive: true });
		const cssContent = fs.readFileSync(inputPath, 'utf8');
		const result = await postcss([tailwindcss()]).process(cssContent, {
			from: inputPath,
			to: path.join(outputDir, 'engine.css')
		});
		fs.writeFileSync(path.join(outputDir, 'engine.css'), result.css);
	});

	// After build, generate a precache manifest the service worker can read
	eleventyConfig.on('eleventy.after', async () => {
		const root = path.resolve('./docs');
		if (!fs.existsSync(root)) return;
		const walk = (dir) =>
			fs.readdirSync(dir).flatMap((file) => {
				const full = path.join(dir, file);
				return fs.statSync(full).isDirectory()
					? walk(full)
					: ['/' + path.relative(root, full).replace(/\\/g, '/')];
			});
		const assets = walk(root).filter(
			(f) => !f.endsWith('.map') && f !== '/cache-assets.json'
		);
		fs.writeFileSync(path.join(root, 'cache-assets.json'), JSON.stringify(assets, null, 2));
	});

	eleventyConfig.setLiquidOptions({ dynamicPartials: false, strictFilters: false });

	// Bundled asset shortcodes (webpack writes the JS, Eleventy writes the CSS)
	eleventyConfig.addShortcode(
		'bundledCss',
		() => '<link href="/assets/css/engine.css" rel="stylesheet" />'
	);
	eleventyConfig.addShortcode(
		'bundledJs',
		() => '<script src="/assets/js/main.bundle.js" defer></script>'
	);

	return {
		markdownTemplateEngine: 'liquid',
		dir: {
			data: '../_data',
			includes: '../_includes',
			input: 'src/pages/',
			output: 'docs'
		}
	};
}
