// css


import '../css/blog.css';
import '../css/help.css';
import '../css/styles.css';
import * as app from './core/app';

app.load();

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister().then(() => {
              console.log("🧹 Old service worker unregistered");
            });
          }

          // After clearing, register the new one
          navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => console.log("✅ New service worker registered"))
            .catch((err) => console.log("Service worker error:", err));
        });
      }
	});
}
