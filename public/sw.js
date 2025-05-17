const CACHE_NAME = 'my-cache';

self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Service Worker: Caching files');
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/admin.js',
                '/images/favicon.ico',
                '/manifest.json',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css'
            ]).catch(error => {
                console.error('Service Worker: Failed to cache:', error);
            });
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => {
                    console.log('Service Worker: Deleting old cache:', name);
                    return caches.delete(name);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    if (url.pathname.startsWith('/api/')) {
        console.log(`Service Worker: جلب API من الشبكة: ${url}`);
        event.respondWith(fetch(event.request));
        return;
    }

    console.log(`Service Worker: معالجة طلب: ${url}`);
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(`Service Worker: من الكاش: ${url}`);
                return response;
            }
            console.log(`Service Worker: جلب مورد: ${url}`);
            return fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200 && !url.pathname.startsWith('/api/')) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(error => {
                console.error(`Service Worker: فشل جلب المورد: ${url}`, error);
            });
        })
    );
});