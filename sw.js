const CACHE_NAME = 'track-splits-cache-v2';
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
    './pages/curiosita.html',
    './js/curiosita.js',
    './data/curiosities_data.js',
    './data/fidal_data.js',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;700&display=swap'
];

// Install Event
self.addEventListener('install', (event) => {
    // Forza il nuovo Service Worker a diventare subito attivo
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache:', CACHE_NAME);
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('Rimozione vecchia cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    // Ignoriamo le richieste non-GET
    if (event.request.method !== 'GET') return;

    const requestUrl = event.request.url;
    const isDataFile = requestUrl.includes('/data/') || requestUrl.includes('gallery_data') || requestUrl.includes('news_data');

    // 1. Network First per i file di dati (notizie, gare, gallerie)
    // Se c'è connessione scarica subito i dati freschi; se offline usa la cache
    if (isDataFile) {
        event.respondWith(
            fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => caches.match(event.request))
        );
        return;
    }

    // 2. Stale While Revalidate per il resto dell'interfaccia (HTML, CSS, icone)
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Modalità offline
            });

            return cachedResponse || fetchPromise;
        })
    );
});
