/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

const CACHE_NAME = 'my-site-cache-v1';

const URLS = [
  '/',
  '/profile',
  '/leaderboard',
  '/forum',
  '/game',
];


sw.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      }),
  );
});

sw.addEventListener('fetch', (event: any) => {
  if ((event.request.url.indexOf('http') === 0)){ 
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return (
          fetch(fetchRequest)
            .then((response) => {

              const responseToCache = response.clone();

              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
              return response;
            })
        );
      }).catch(() => { return caches.match(`<div>offline</div>`)}),
    );
  }
  
});

sw.addEventListener("activate", (event: any) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then((keyList) =>
        Promise.all(keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

export type {};
