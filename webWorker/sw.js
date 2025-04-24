// Service Worker脚本
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', event => {
  // 安装阶段: 缓存资源
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('已打开缓存');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // 拦截请求: 优先从缓存返回
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 命中缓存则返回，否则继续网络请求
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  // 清理旧缓存
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});