const CACHE = 'stock-tracker-v8';
const ASSETS = [
    '/stock-tracker/',
    '/stock-tracker/index.html',
    '/stock-tracker/manifest.json',
    '/stock-tracker/icon-192.png',
    '/stock-tracker/icon-512.png'
  ];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys =>
          Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
                                     ));
    self.clients.claim();
});

self.addEventListener('fetch', e => {
    e.respondWith(
          caches.match(e.request).then(cached =>
                  cached || fetch(e.request).catch(() => caches.match('/stock-tracker/index.html'))
                                           )
        );
});
