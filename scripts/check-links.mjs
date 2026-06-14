// Fails the build if any root-relative link or image in the built site (docs/)
// points at a file that doesn't exist. Catches the "/assets/img/talks/..." class
// of bug before it ships. External links (http/https) are intentionally skipped.
import { readdirSync, statSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'docs';

if (!existsSync(ROOT)) {
	console.error(`✗ ${ROOT}/ not found — run "npm run build" first.`);
	process.exit(1);
}

const htmlFiles = [];
(function walk(dir) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) walk(p);
		else if (p.endsWith('.html')) htmlFiles.push(p);
	}
})(ROOT);

const resolves = (urlPath) => {
	const clean = urlPath.split('#')[0].split('?')[0];
	if (!clean || clean === '/') return true;
	const rel = clean.replace(/^\//, '');
	const candidates = [
		rel,
		join(rel, 'index.html'),
		rel.replace(/\/$/, '') + '/index.html',
		rel.replace(/\/$/, '') + '.html'
	];
	return candidates.some((c) => existsSync(join(ROOT, c)));
};

const broken = new Set();
for (const file of htmlFiles) {
	const html = readFileSync(file, 'utf8');
	const re = /(?:href|src)="(\/[^"]*)"/g;
	let m;
	while ((m = re.exec(html))) {
		const url = m[1];
		if (url.startsWith('//') || url.startsWith('/http')) continue; // external / protocol-relative
		if (!resolves(url)) broken.add(`${file} → ${url}`);
	}
}

if (broken.size) {
	console.error(`✗ ${broken.size} broken internal link(s)/image(s):`);
	for (const b of broken) console.error('  ' + b);
	process.exit(1);
}
console.log(`✓ checked ${htmlFiles.length} pages — no broken internal links or images.`);
