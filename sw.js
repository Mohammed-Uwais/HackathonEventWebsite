// CampusPulse Universal PWA Service Worker with Offline Caching & FCM Closed-Browser Push Engine
const CACHE_NAME = 'campuspulse-pwa-v3';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './env.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js'
];

// Import Firebase SDKs for Background Messaging when browser/app is COMPLETELY CLOSED
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Initialize Firebase inside Service Worker
const firebaseConfig = {
  apiKey: "AIzaSyAH32K13ALC3epBCfZn1lrduyBucSGDG-w",
  authDomain: "hackathon-3-event-website.firebaseapp.com",
  projectId: "hackathon-3-event-website",
  storageBucket: "hackathon-3-event-website.firebasestorage.app",
  messagingSenderId: "308620504514",
  appId: "1:308620504514:web:8bb8f1ee7d6548f406ba5b"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

// 1. INSTALL EVENT: Pre-cache static application assets for 100% offline usage
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[sw.js] Caching static application shell & dependencies for offline capability...');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[sw.js] Pre-caching partial warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. ACTIVATE EVENT: Clean up stale caches & claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[sw.js] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH EVENT: Serve cached files when offline (Network first, fall back to cache)
self.addEventListener('fetch', (event) => {
  // Only intercept GET requests, ignore POST or API calls
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and store valid responses in cache
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed (Device is offline) -> serve from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});

// 4. LOCAL MESSAGE LISTENER: Show mobile notifications posted directly from client app (Offline / In-App)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_LOCAL_NOTIFICATION') {
    const { title, options } = event.data;
    const notificationOptions = {
      body: options?.body || 'New campus event notification',
      icon: options?.icon || 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      badge: options?.badge || 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      vibrate: options?.vibrate || [200, 100, 200, 100, 200],
      tag: options?.tag || 'campuspulse-local-' + Date.now(),
      renotify: true,
      requireInteraction: true,
      data: options?.data || { url: './index.html' }
    };

    self.registration.showNotification(title || '🔔 CampusPulse Alert', notificationOptions);
  }
});

// 5. BACKGROUND PUSH LISTENER WHEN BROWSER/WEBSITE IS COMPLETELY CLOSED (FCM)
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Received background FCM push alert when browser is closed: ', payload);
  const title = payload.notification?.title || payload.data?.title || '🔔 New Campus Event!';
  const options = {
    body: payload.notification?.body || payload.data?.shortDesc || 'Check out the new event on CampusPulse.',
    icon: payload.notification?.icon || payload.data?.posterUrl || 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    vibrate: [200, 100, 200, 100, 200],
    tag: payload.data?.eventId || 'fcm-' + Date.now(),
    renotify: true,
    requireInteraction: true,
    data: { url: payload.data?.url || './index.html' }
  };

  return self.registration.showNotification(title, options);
});

// 6. SYSTEM PUSH NOTIFICATION LISTENER
self.addEventListener('push', (event) => {
  let data = { title: '🔔 New Campus Listing!', body: 'Check out the new event on CampusPulse.' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || data.shortDesc || 'A new event or project was posted.',
    icon: data.icon || 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    vibrate: [200, 100, 200, 100, 200],
    tag: data.id || 'push-' + Date.now(),
    renotify: true,
    requireInteraction: true,
    data: { url: data.url || './index.html' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '🔔 New Campus Event!', options)
  );
});

// 7. SYSTEM NOTIFICATION CLICK LISTENER (Opens website when phone screen alert is tapped)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || './index.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

