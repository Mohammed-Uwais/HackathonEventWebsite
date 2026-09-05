// CampusPulse Universal PWA Service Worker with FCM Closed-Browser Push Engine
const CACHE_NAME = 'campuspulse-pwa-v2';

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

// BACKGROUND PUSH LISTENER WHEN BROWSER/WEBSITE IS TOTALLY CLOSED
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Received background FCM push alert when browser is closed: ', payload);
  const title = payload.notification?.title || payload.data?.title || '🔔 New Campus Event!';
  const options = {
    body: payload.notification?.body || payload.data?.shortDesc || 'Check out the new event on CampusPulse.',
    icon: payload.notification?.icon || payload.data?.posterUrl || 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    vibrate: [200, 100, 200, 100, 200],
    data: { url: payload.data?.url || '/' }
  };

  return self.registration.showNotification(title, options);
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// System Push Notification Listener
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
    data: { url: data.url || '/' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '🔔 New Campus Event!', options)
  );
});

// System Notification Click Listener (Opens website when phone screen alert is tapped)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

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
