const lodash = require('lodash');
const htmlmin = require('html-minifier');
const svgContents = require('eleventy-plugin-svg-contents');
const pluginPWA = require('./tools/eleventy-plugin-pwa');
const fs = require('fs');
const path = require('path');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


const {createCanvas, loadImage} = require('canvas');
const {formatTitle} = require('./tools/format-title');


// Add custom markdown-it plugin to add ARIA attributes
function addAriaAttributes(md) {
    // Plugin to add ARIA attributes to links
    md.core.ruler.push('aria_links', state => {
        state.tokens.forEach(blockToken => {
            if (blockToken.type === 'inline' && blockToken.children) {
                blockToken.children.forEach(token => {
                    if (token.type === 'link_open') {
                        token.attrSet('role', 'link');
                        token.attrSet('aria-label', 'External link');
                    }
                });
            }
        });
    });
}

const createSocialImageForArticle = async (input, output) => {
    const splashSolid = await loadImage('./tools/images/splash-1.png');
    const splashStriped = await loadImage('./tools/images/splash-2.png');
    const robertgabriel = await loadImage('./tools/images/me.png');

    new Promise((resolve, reject) => { // read data from input file
        try {
            const data = fs.readFileSync(input, {encoding: 'utf-8'});

            // get title from file data
            const [, title] = data.match(/cardTitle:(.*)/);

            const post = {
                title: title,
                author: 'Robert James'
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
            context.fillText(`${
                post.author
            }`, 650, authorY);

            const {w, h, x, y} = imagePosition;
            context.drawImage(robertgabriel, x, y, w, h);
            context.drawImage(splashSolid, 1000, 0, 403, 409);
            context.drawImage(splashSolid, 200, 500, 403, 409);
            context.drawImage(splashStriped, -80, 48, 348, 252);
            context.drawImage(splashStriped, 1000, 400, 348, 252);
            context.drawImage(splashStriped, 100, 600, 348, 252);

            const outputDir = path.dirname(output);
            if (! fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, {recursive: true});
            }

            // write the output image

            const stream = fs.createWriteStream(output);
            stream.on('finish', resolve);
            stream.on('error', reject);
            canvas.createPNGStream({quailty: 1.0}).pipe(stream);
        } catch (e) {

            console.error(this.inputPath, e);
            console.error(e);
        }
    });
};

const manifest = {
    'main.js': '/assets/js/main.bundle.js',
    'main.css': '/assets/js/main.css'
};
const format = require('date-fns/format');
const moment = require('moment');


module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({'src/assets/': '/assets/'});
    eleventyConfig.addLiquidFilter('limit', (arr, limit) => arr.slice(0, limit));
    eleventyConfig.addTransform('social-image', async function (content) { // only handle blog posts
        if (this.inputPath.endsWith('.njk')) {
            return content;
        }

        try {
            await createSocialImageForArticle(
                // our input article
                    this.inputPath,

                // the output image name
                    this.outputPath.replace('.html', '.png')
            );

            // return normal content
            return content;
        } catch (error) {
            const [, title] = data.match(/title:(.*)/);
            console.error('Error creating social image for', title);
            console.error(this.inputPath, error);
        }
    });

    eleventyConfig.addPlugin(syntaxHighlight);
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
        h1: 'leading-relaxed font-display text-3xl mb-8 font-bold text-gray-900',
        h2: 'leading-relaxed font-display text-2xl mb-6 mt-12 font-semibold text-gray-800',
        h3: 'leading-relaxed font-display text-xl mb-4 mt-10 font-semibold text-gray-700',
        h4: 'leading-relaxed font-display text-lg mb-4 mt-8 font-semibold text-gray-600',
        p: 'leading-relaxed font-display mb-4 mt-4 text-lg text-gray-900',
        strong: 'text-lg font-semibold text-gray-800',
        bold: 'font-bold text-gray-900',
        ul: "leading-relaxed list-disc list-inside mt-4 space-y-2 pl-6 text-lg font-display ml-6 mb-8 text-gray-900",
        ol: "leading-relaxed list-decimal list-inside mt-4 space-y-2 pl-6 text-lg font-display ml-6 mb-8 text-gray-900",
        li: "leading-relaxed mb-2 text-lg font-display text-gray-900 flex items-center",
      
        img: 'aspect-square rounded-2xl mb-8 shadow-lg',
        hr: 'divider divider-neutral my-8',
        a: 'leading-relaxed font-sans text-lg text-blue-500 hover:text-blue-700 underline',
        iframe: 'w-full h-96 rounded-xl shadow-lg my-10',
        blockquote: 'border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4',
        code: 'bg-gray-100 text-gray-800 rounded p-2 text-sm font-mono',
        pre: 'bg-gray-100 p-4 rounded overflow-x-auto'
      };
      

    eleventyConfig.addTransform('htmlmin', function (content, outputPath) { // Eleventy 1.0+: use this.inputPath and this.outputPath instead
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


    eleventyConfig.setLibrary('md', markdownIt(options).use(markdownItClass, mapping).use(addAriaAttributes));

    eleventyConfig.setLiquidOptions({
        dynamicPartials: false, strictFilters: false // renamed from `strict_filters` in Eleventy 1.0
    });
    // Add a shortcode for bundled CSS.
    eleventyConfig.addShortcode('bundledCss', function () {
        return manifest['main.css'] ? `<link href="${
            manifest['main.css']
        }" rel="stylesheet" />` : '';
    });

    // Add a shortcode for bundled JS.
    eleventyConfig.addShortcode('bundledJs', function () {
        return manifest['main.js'] ? `<script src="${
            manifest['main.js']
        }"></script>` : '';
    });
    return {
        markdownTemplateEngine: 'md',
        dir: {
            data: '../_data',
            includes: '../_includes',
            input: 'src/pages/',
            output: 'docs'
        }
    };
};
