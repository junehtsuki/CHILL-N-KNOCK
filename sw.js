
const CACHE_NAME = 'chill-n-knock-v1';

// ไฟล์ที่ต้องการเก็บไว้ใน Cache
const ASSETS_TO_CACHE = [
  './',
  './index.html'
];

// ติดตั้ง Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );

  self.skipWaiting();
});

// ลบ Cache เวอร์ชันเก่า
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key =>
              key.startsWith('chill-n-knock-') &&
              key !== CACHE_NAME
            )
            .map(key => caches.delete(key))
        )
      ),
      self.clients.claim()
    ])
  );
});

// ใช้อินเทอร์เน็ตก่อน หากเปิดหน้าเว็บไม่ได้
// จึงนำ index.html ที่เคยแคชไว้มาแสดง
self.addEventListener('fetch', event => {
  if (
    event.request.method !== 'GET' ||
    event.request.mode !== 'navigate'
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match('./index.html'))
  );
});
