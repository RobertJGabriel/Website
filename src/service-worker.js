/* Service worker for robertgabriel.ninja
 * Offline-first with sensible freshness:
 *   - navigations: network-first, fall back to cache, then the offline page
 *   - same-origin assets: stale-while-revalidate
 * Bump CACHE_VERSION to force clients onto a new app shell.
 */
const CACHE_VERSION = 'v1';
const CACHE = `rjg-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline/';

// App shell — kept small and resilient (one missing URL won't break install).
const PRECACHE = [
	'/',
	'/blog/',
	'/about/',
	'/work/',
	'/awards/',
	OFFLINE_URL,
	'/assets/css/engine.css',
	'/assets/js/main.bundle.js',
	'/assets/images/robert-james.jpeg',
	'/assets/images/social/favicon-32x32.png'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => Promise.allSettled(PRECACHE.map((url) => cache.add(url))))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	const { request } = event;
	if (request.method !== 'GET') return;

	const url = new URL(request.url);
	// Leave cross-origin requests (CDNs, analytics) to the network.
	if (url.origin !== self.location.origin) return;

	// Navigations: try the network first so content stays fresh, then fall back.
	if (request.mode === 'navigate') {
		event.respondWith(
			fetch(request)
				.then((response) => {
					const copy = response.clone();
					caches.open(CACHE).then((cache) => cache.put(request, copy));
					return response;
				})
				.catch(() =>
					caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
				)
		);
		return;
	}

	// Same-origin assets: serve from cache immediately, refresh in the background.
	event.respondWith(
		caches.match(request).then((cached) => {
			const network = fetch(request)
				.then((response) => {
					if (response && response.status === 200 && response.type === 'basic') {
						const copy = response.clone();
						caches.open(CACHE).then((cache) => cache.put(request, copy));
					}
					return response;
				})
				.catch(() => cached);
			return cached || network;
		})
	);
});
