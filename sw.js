var cacheName = 'autointelli-1.0';

var filesToCache = [
    "app/img/auto-intelli-logo.png",
    "app/img/auto-intelli-240.png",
    "app/img/fav-icon.png"
];

self.addEventListener('install', function (e) {
    console.log("Install");
    e.waitUntil(
            caches.open(cacheName).then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(filesToCache);
    }).then(function () {
        return self.skipWaiting();
    }).catch(function (err) {
        // registration failed :(
        console.log('Cache install failed: ', err);
    })
            );
});

self.addEventListener('activate', function (event) {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
            caches.keys().then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
            if (key !== cacheName) {
                console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
            }
        }));
    })
            );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
            caches.match(event.request, {ignoreSearch: true}).then(response => {
        return response || fetch(event.request);
    })
            );
});