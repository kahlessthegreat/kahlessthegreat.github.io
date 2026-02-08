// CHANGED: I updated 'v1' to 'v2'. This is CRITICAL. 
// It tells the browser "This is a new version, delete the old cache!"
const CACHE_NAME = 'mandala-v3'; 

const ASSETS_TO_CACHE = [
  './',               // Captures the folder root (e.g., .../demo/)
  './index.html',     // Captures the specific file
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Event: Cache files
self.addEventListener('install', (event) => {
  self.skipWaiting(); // FORCE the new service worker to activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Clean up old caches (v1)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event: Serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});