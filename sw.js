// CampusPulse Universal PWA Service Worker for Mobile Notifications
const CACHE_NAME = 'campuspulse-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// System Push Notification Listener (Triggers Android & iOS Notification Shades)
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

// System Notification Click Listener (Opens website on phone screen when tapped)
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
