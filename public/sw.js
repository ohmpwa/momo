// Offline support.
// App files: served from cache, refreshed in the background (cache name bumps each release).
// Voices & pictures (/audio, /emoji): content never changes for a given file name, so they live in a
// separate long-lived cache ("momo-media") that survives releases and is filled by the parent page's
// "download for offline" button or on first use.
const C = "momo-v9";
const MEDIA = "momo-media";
const FILES = ["./", "index.html", "manifest.json", "data.js", "icon.svg", "audio/index.json", "emoji/index.json"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C && k !== MEDIA).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (/\/(audio|emoji)\/[^/]+\.(mp3|svg)$/.test(url.pathname)) {
    e.respondWith(caches.open(MEDIA).then(async c => (await c.match(req)) || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; })));
    return;
  }
  e.respondWith(caches.open(C).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
