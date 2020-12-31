const cacheName = 'Weda-v1';
const staticAssets = [
    './sw.js',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './manifest.webmanifest'
];

self.addEventListener('install', async event => {
    const cache =  caches.open(cacheName);
    (await cache).addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', event => {
    self.clients.claim();
});
 
self.addEventListener('fetch', async event => {
    const req = event.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(networkThenCache(req));
    }
});

const cacheFirst = async req => {
    const cache = await caches.open(cacheName);
    const cached =  await cache.match(req);
    return cached || fetch(req);
}

const networkThenCache = async req => {
    const cache = await caches.open(cacheName);
    try {
        const newOne = await fetch(req);
        await cache.put(req, newOne.clone());
        return newOne;
    } catch (event) {
        const cached = await cache.match(req);
        return cached; 
    } 
} 