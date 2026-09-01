const CACHE_NAME = 'track-splits-v16';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './pages/intervals.html',
    './pages/scores.html',
    './pages/predictor.html',
    './css/style.css',
    './js/app.js',
    './js/intervals.js',
    './js/scores.js',
    './js/predictor.js',
    './pages/training_zones.html',
    './js/training_zones.js',
    './pages/stretching.html',
    './js/stretching.js',
    './pages/pacer.html',
    './js/pacer.js',
    './pages/coach_pacer.html',
    './js/coach_pacer.js',
    './pages/athletes.html',
    './js/athletes.js',
    'https://cdn.jsdelivr.net/npm/chart.js',
    './pages/news.html',
    './js/news.js',
    './data/news_data.js',
    './pages/gallery.html',
    './js/gallery.js',
    './data/gallery_data.js',
    './data/fidal_data.js',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;700&display=swap'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Fetch Event (Cache First strategy)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cache if found, else fetch from network
                return response || fetch(event.request).then(
                    (networkResponse) => {
                        // Check if we received a valid response
                        if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // Clone the response because it's a stream
                        const responseToCache = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    }
                );
            })
    );
});

// Activate Event (Clean up old caches)
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
