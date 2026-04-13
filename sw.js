const CACHE = "rp-pedido-v1";
const ASSETS = [
  "/marmitas-rp/",
  "/marmitas-rp/index.html",
  "/marmitas-rp/manifest.json",
  "/marmitas-rp/icon-192.svg",
  "/marmitas-rp/icon-512.svg"
];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}));
  self.skipWaiting();
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }));
  self.clients.claim();
});

self.addEventListener("fetch", function(e){
  e.respondWith(
    fetch(e.request).catch(function(){
      return caches.match(e.request);
    })
  );
});