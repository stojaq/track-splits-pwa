const CACHE_NAME = 'track-splits-cache';
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
    // Forza il nuovo Service Worker a diventare subito attivo
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    // Prende immediatamente il controllo della pagina senza aspettare il ricaricamento
    event.waitUntil(self.clients.claim());
});

// Fetch Event (Stale While Revalidate)
self.addEventListener('fetch', (event) => {
    // Ignoriamo le richieste non-GET
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Avvia la richiesta di rete in background per aggiornare la cache
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Se la risposta è valida, aggiorna la cache
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Errore di rete (es. offline): non facciamo nulla, l'utente userà la cache
            });

            // Se c'è una risposta in cache, mostrala SUBITO all'utente.
            // Altrimenti, aspetta che finisca il fetch da internet (primo accesso).
            return cachedResponse || fetchPromise;
        })
    );
});
