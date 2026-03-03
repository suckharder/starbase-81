// Original source: https://dev.to/prorishi/your-static-site-to-a-pwa-24dl

// Name of the Cache.
const CACHE = "PWA_Cache";

// Select files for caching.
let urlsToCache = [
    "/",
    "/index.html",
    "/favicon.ico", 
    "/logo.png",
    "/background.jpg",
    "/css/main.static.css"
];

// Cache all the selected items once application is installed.
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            console.log("Caching started.");
            return cache.addAll(urlsToCache);
        })
    );
});

// Whenever a resource is requested, return if its cached else fetch the resource from server.
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
