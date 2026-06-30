const CACHE_NAME = 'mh-editor-pro-v1';
const DYNAMIC_CACHE = 'mh-dynamic-v1';

// الملفات الأساسية التي يجب تخزينها ليعمل الموقع بدون إنترنت
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './main.js',
    // إذا كان لديك صور أو أيقونات مهمة أضف مساراتها هنا مثل:
    // './icon.png'
];

// 1. تثبيت الـ Service Worker وحفظ الملفات الأساسية
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('تم تخزين ملفات الكاش بنجاح');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
    self.skipWaiting();
});

// 2. تنظيف الكاش القديم عند التحديث
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME && key !== DYNAMIC_CACHE)
                .map(key => caches.delete(key))
            );
        })
    );
});

// 3. استراتيجية (Stale-While-Revalidate) مع التخزين الديناميكي للأرشيف
self.addEventListener('fetch', event => {
    // لا نتدخل في طلبات قواعد البيانات (Firebase) نتركها لتعمل بطريقتها
    if (event.request.url.includes('firestore.googleapis.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                caches.open(DYNAMIC_CACHE).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            }).catch(() => {
                // في حالة انقطاع النت وعدم وجود كاش، يمكن إرجاع صفحة مخصصة
            });
            return cachedResponse || fetchPromise;
        })
    );
});
