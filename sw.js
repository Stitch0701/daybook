// Minimal offline cache for the Daybook app shell.
// Bump CACHE_NAME whenever index.html changes so installed apps pick up the update.
const CACHE_NAME = 'daybook-shell-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(SHELL_FILES); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.filter(function(n) { return n !== CACHE_NAME; }).map(function(n) { return caches.delete(n); }));
    })
  );
  self.clients.claim();
});

// Network-first for the app shell so you always get the latest version when
// online, falling back to the cached copy when offline. Everything else
// (fonts, Chart.js, jsPDF, Google APIs) just passes through to the network —
// those aren't part of the offline-critical path.
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);
  if(url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).then(function(res) {
      var copy = res.clone();
      caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy); });
      return res;
    }).catch(function() {
      return caches.match(event.request).then(function(cached) {
        return cached || caches.match('./index.html');
      });
    })
  );
});
