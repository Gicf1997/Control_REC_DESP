const CACHE_NAME = "v1_cache_RecDesp",
  urlsToCache = [
    "https://script.google.com/macros/s/AKfycbyxrKZifyeTNnDyJsMZw5oP26m0Zu2ZYm0d9sH6od0HMByOLvd85D441ep7STl3tB57/exec",
    "./manifest.json",
  ];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => "fallo el registro del cache ", err)
  );
});

self.addEventListener("activate", (e) => {
  const caheWitheList = [CACHE_NAME];

  e.waitUntil(
    caches.keys().then((cachesNames) =>
      cachesNames.map((cacheName) => {
        if (cacheName.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
