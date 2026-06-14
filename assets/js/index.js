// Site entry point.
// CSS is compiled by Eleventy (see .eleventy.js); this bundle only handles
// progressive-enhancement behaviour. Keep it tiny.

// Register the service worker for offline support.
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.catch((err) => console.error('Service worker registration failed:', err));
	});
}
