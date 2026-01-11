const CACHE_NAME = 'galactic-codex-v1768131395';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))) });
self.addEventListener('activate', e => { e.waitUntil(Promise.all([self.clients.claim(), caches.keys().then(k => Promise.all(k.map(key => key !== CACHE_NAME ? caches.delete(key) : null)))])) });
self.addEventListener('fetch', e => { if (e.request.mode === 'navigate') { e.respondWith(fetch(e.request).catch(() => caches.match(e.request))); return; } e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))) });
