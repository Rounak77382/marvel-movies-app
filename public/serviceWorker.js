const CACHE_NAME = 'marvel-movies-cache-v1';
const DYNAMIC_CACHE = 'marvel-movies-dynamic-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/static/js/bundle.js',
  '/images/placeholder.jpg',
];

// Install the service worker and cache the static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Intercept fetch requests
self.addEventListener('fetch', event => {
  // Skip OMDb API requests - we'll handle those with IndexedDB
  if (event.request.url.includes('omdbapi.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Clone the request because it's a one-time use
        return fetch(event.request.clone())
          .then(response => {
            // Don't cache if response is not valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a one-time use
            const responseToCache = response.clone();

            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If fetch fails, try to return a cached fallback for image requests
            if (event.request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
              return caches.match('/images/placeholder.jpg');
            }
          });
      })
  );
});

// Listen for messages from the main thread
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});