/* Auto-generated offline service worker (quiet-ground-v1-4a6e1a48ff) */
const CACHE_NAME = "quiet-ground-v1-4a6e1a48ff";
const RUNTIME_FONT_CACHE = 'quiet-ground-fonts-v1';
const PRECACHE_URLS = [
  "./",
  "./assets/index-CcqHGs6Y.js",
  "./assets/index-DQPDqJEJ.css",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/icon.svg",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        const scopedUrls = PRECACHE_URLS.map((u) => new URL(u, self.registration.scope).toString());
        return cache.addAll(scopedUrls);
      })
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith('quiet-ground-v1-') && k !== CACHE_NAME)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Stale-while-revalidate for Google Fonts stylesheets & font files
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(RUNTIME_FONT_CACHE).then(async (cache) => {
        const cached = await cache.match(req);
        const networkPromise = fetch(req)
          .then((res) => {
            if (res && (res.ok || res.type === 'opaque')) {
              cache.put(req, res.clone());
            }
            return res;
          })
          .catch(() => cached);
        return cached || networkPromise;
      }),
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Navigation requests: network-first with instant offline fallback to precached index.html
  if (req.mode === 'navigate') {
    const indexUrl = new URL('./index.html', self.registration.scope).toString();
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(indexUrl, copy));
          }
          return res;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          return (
            (await cache.match(indexUrl)) ||
            (await cache.match(new URL('./', self.registration.scope).toString()))
          );
        }),
    );
    return;
  }

  // Same-origin static assets: cache-first with network fallback
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      });
    }),
  );
});
