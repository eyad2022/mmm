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

// 3. استراتيجية (Network First) لضمان تحديث الأكواد دائماً للمستخدمين
self.addEventListener('fetch', event => {
    // تجاهل طلبات قواعد البيانات (Firebase)
    if (event.request.method !== 'GET' || event.request.url.includes('firestore.googleapis.com')) {
        return;
    }

    event.respondWith(
        // 1. نحاول جلب الملفات من الإنترنت أولاً (لرؤية التحديثات الجديدة)
        fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(DYNAMIC_CACHE).then(cache => {
                    cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
        }).catch(() => {
            // 2. إذا انقطع الإنترنت فقط، نقوم بجلب الملفات من الكاش
            return caches.match(event.request);
        })
    );
});