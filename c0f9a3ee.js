'use strict';

const PREFIX = 'robertgabriel.ninja';
const HASH = 'c0f9a3ee';
const OFFLINE_CACHE = PREFIX + '-' + HASH;

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(OFFLINE_CACHE).then(function(cache) {
			return cache.addAll([
				'/',
				'/assets/css/app.min.css',
				'/assets/css/styles.min.css',
				'/assets/css/vendor.min.css',
				'/404.html',
				'/awards.html',
				'/cailin.html',
				'/contact.html',
				'/googlea4b2e0ff05c168d5.html',
				'/index.html',
				'/lighthouse.html',
				'/projects.html',
				'/sitemap.html',
				'/talks.html',
				'/websites.html',
				'/work.html',
				'/worldmap.html',
				'/assets/img/me/me.png',
				'/assets/js/app.min.js',
				'/assets/js/vendor.min.js',
				'/assets/js/vue/blog.js',
				'/assets/js/vue/me.js',
				'/assets/js/vue/navigation.js',
				'/assets/js/vue/repos.js',
				'/assets/js/vue/worldmap.js',
				'/assets/js/webpjs.min.js'
			]); // Computed at build time.
		})
	);
});

self.addEventListener('activate', function(event) {
	// Delete old asset caches.
	event.waitUntil(
		caches.keys().then(function(keys) {
			return Promise.all(
				keys.map(function(key) {
					if (
						key != OFFLINE_CACHE &&
						key.startsWith(`${PREFIX}-`)
					) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	if (event.request.mode == 'navigate') {
		//console.log('Handling fetch event for', event.request.url);
		//console.log(event.request);
		event.respondWith(
			fetch(event.request).catch(function(exception) {
				// The `catch` is only triggered if `fetch()` throws an exception,
				// which most likely happens due to the server being unreachable.
				console.error(
					'Fetch failed; returning offline page instead.',
					exception
				);
				return caches.open(OFFLINE_CACHE).then(function(cache) {
					return cache.match('/');
				});
			})
		);
	} else {
		// It’s not a request for an HTML document, but rather for a CSS or SVG
		// file or whatever…
		event.respondWith(
			caches.match(event.request).then(function(response) {
				return response || fetch(event.request);
			})
		);
	}

});