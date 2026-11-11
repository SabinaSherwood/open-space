import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');

function walkFiles(dir, rootDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath, rootDir));
    } else if (entry.isFile()) {
      const rel = path.relative(rootDir, fullPath).split(path.sep).join('/');
      if (rel !== 'sw.js' && rel !== '.nojekyll' && rel !== '404.html' && !rel.endsWith('.map')) {
        results.push(rel);
      }
    }
  }
  return results.sort();
}

const files = walkFiles(DIST_DIR);
const hash = crypto.createHash('sha256');
for (const rel of files) {
  hash.update(rel);
  hash.update(fs.readFileSync(path.join(DIST_DIR, rel)));
}
const version = `quiet-ground-v1-${hash.digest('hex').slice(0, 10)}`;
const precacheList = ['./', ...files.map((f) => `./${f}`)];

const swSource = `/* Auto-generated offline service worker (${version}) */
const CACHE_NAME = ${JSON.stringify(version)};
const RUNTIME_FONT_CACHE = 'quiet-ground-fonts-v1';
const PRECACHE_URLS = ${JSON.stringify(precacheList, null, 2)};

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
`;

fs.writeFileSync(path.join(DIST_DIR, 'sw.js'), swSource, 'utf8');
console.log(`Generated dist/sw.js (${version}) with ${precacheList.length} precached URLs.`);
