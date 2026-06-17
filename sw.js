const CACHE_NAME = 'tevhid-cache-v2'; // Versiyonu V2 yaptık ki tarayıcılar yeni kodu tanısın
const urlsToCache = [
  '/',
  '/style.css?v=9.11',
  '/script.js?v=9.11',
  '/favicon.png',
  '/offline.html' // YENİ: Çevrimdışı tefekkür sayfamızı zorunlu hafızaya alıyoruz
];

// Kurulum Aşaması: Temel dosyaları hafızaya al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Getirme (Fetch) Aşaması: ÖNCE İNTERNET, SONRA CACHE
self.addEventListener('fetch', event => {
  
  // EĞER İSTENEN ŞEY BİR SAYFA (HTML) İSE:
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // İnternet var: Sayfayı göster ve bir kopyasını hafızaya al
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // İNTERNET YOK: Önce hafızada bu sayfa var mı diye bak
          return caches.match(event.request).then(response => {
            // Hafızada varsa onu göster, YOKSA "offline.html" tefekkür sayfasını göster!
            return response || caches.match('/offline.html');
          });
        })
    );
  } 
  // EĞER İSTENEN ŞEY CSS, JS VEYA RESİM İSE (Eski mantığınız aynı kalıyor):
  else {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});

// Temizlik Aşaması: Eski cache versiyonlarını siler
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});