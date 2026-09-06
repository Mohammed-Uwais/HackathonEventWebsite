# 🎓 CampusPulse | Enterprise Event & Innovation Discovery Platform

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Hosting](https://img.shields.io/badge/hosting-GitHub%20Pages-brightgreen.svg)](https://mohammed-uwais.github.io/HackathonEventWebsite/)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Installable-purple.svg)](manifest.json)
[![AI Vision Powered](https://img.shields.io/badge/AI%20Multimodal-Groq%20Llama%203.2%20Vision-orange.svg)](https://groq.com)
[![Database](https://img.shields.io/badge/database-Firebase%20Firestore-yellow.svg)](https://firebase.google.com)

**CampusPulse** is an enterprise-grade, zero-cost, fully responsive **Campus Event Discovery & Admin Publishing Platform** with **Dual Directory Architecture**, **Multimodal Groq Vision AI OCR**, **Universal PWA Mobile Phone Support**, and **Multi-Layer Push Notifications**.

---

## 🌟 Key Features & Capabilities

### 1. 🗂️ Dual Directory System
- **Directory 1 — Campus Events & Competitions Hub**: Discover upcoming Hackathons, Symposia, Quizzes, Workshops, and Seminars with status indicators:
  - 🟢 **Reg Open** (Green Border)
  - 🟡 **Reg Closed** (Yellow Border)
  - 🔴 **Event Ended** (Red Border)
- **Directory 2 — Student Projects, Research & Innovations Showcase**: Dedicated directory showcasing student capstone prototypes, hardware designs, and research papers with tech stack tag filtering.

### 2. 🤖 Multimodal AI Smart Publisher (Text + Poster Flyer OCR)
- Powered by **Groq Vision AI (`llama-3.2-11b-vision-preview`)**.
- **Drag & Drop Poster Dropzone**: Upload event flyer poster images (PNG, JPG, WEBP) or paste raw text circulars.
- Automatically extracts structured JSON (Title, Category, Short Summary, Abstract, Tech Stack, Department Eligibility, Rules, Registration Link, Timelines) and pre-fills publisher forms.

### 3. 📧 Direct Registered Email Dispatch & Notification Suite
- **Auto-Broadcast on Publish**: Automatically sends formatted email notifications to all registered student user mail IDs saved in Firestore (`/users`).
- **1-Click "Send to My Mail ID"**: Logged-in students can dispatch full event agendas, timelines, and registration links directly to their registered email with one tap.

### 4. 📱 Universal Mobile PWA & 3-Layer Push Notification Suite
- **Installed PWA Application**: Fully PWA compliant with `manifest.json` and `sw.js` (Universal Service Worker) for standalone home screen installation.
- **1-Tap "Install App" & Setup Guide Modal**: Includes a built-in interactive guide tailored for Google Chrome, Vivo Browser, Xiaomi, Samsung Internet, and Apple Safari on iPhone.
- **3-Layer Notification System**:
  1. 🔔 **In-App Real-Time Notification Center Drawer**: Bell icon with unread badge counter (`#bell-badge-count`) and persistent alert history.
  2. 🎶 **Web Audio Sound Chime**: Dual-tone synthesizer chime (520Hz ➔ 660Hz) plays through phone speakers upon alert.
  3. 📳 **Haptic Mobile Vibration**: Triggers device vibration (`navigator.vibrate`) on mobile phones.
  4. ⚙️ **System Notification Shade**: Background OS notifications via Service Worker `showNotification`.

### 5. 🔒 Enterprise Firebase Auth & Firestore Real-Time Sync
- **User Authentication Gate**: Sign-In & Sign-Up with automatic profile creation in Firestore `/users` collection.
- **Direct Password Reset**: Instant password reset email link dispatch via Firebase Auth.
- **Real-time Firestore Listener**: Live automatic feed updates across all logged-in devices when new listings are published.

### 6. 🤖 Groq AI Campus Concierge Chatbot
- Floating AI assistant widget answering student queries about events, schedules, department eligibility, and tech stacks.

---

## 📁 Repository Directory Structure

```
├── index.html            # Main HTML5 application shell & UI markup
├── styles.css            # Enterprise CSS3 design system & mobile responsive rules
├── app.js                # Core Application Logic, PWA engine, Auth, & Notifications
├── sw.js                 # Universal PWA Service Worker with FCM background push
├── manifest.json         # Web App Manifest for mobile home screen installation
├── env.js                # Environment configuration file (Groq API Key & Firebase Config)
└── README.md             # Project documentation
```

---

## 🔒 Environment & API Key Setup

API keys are loaded cleanly from `env.js`:
```javascript
window.ENV = {
  GROQ_API_KEY: "gsk_your_groq_api_key_placeholder",
  FIREBASE_CONFIG: {
    apiKey: "AIzaSy...",
    authDomain: "hackathon-3-event-website.firebaseapp.com",
    projectId: "hackathon-3-event-website",
    storageBucket: "hackathon-3-event-website.firebasestorage.app",
    messagingSenderId: "308620504514",
    appId: "1:308620504514:web:8bb8f1ee7d6548f406ba5b"
  }
};
```

---

## 🚀 Live GitHub Pages Deployment

The application is deployed on GitHub Pages:
👉 **[https://mohammed-uwais.github.io/HackathonEventWebsite/](https://mohammed-uwais.github.io/HackathonEventWebsite/)**

### Steps to Deploy Updates to GitHub:
```bash
git add .
git commit -m "Update project documentation and feature suite"
git push origin main
```

---

## 🛠️ Security & Security Best Practices
- **Strict HTML Sanitization**: All user inputs sanitized via `escapeHTML()` to prevent XSS attacks.
- **Google Drive Embed Converter**: Google Drive links automatically converted to direct high-res embeds.
- **HTTPS Enforcement**: Service Workers and PWA capabilities strictly enforce HTTPS protocol.

---

## 📄 License
Licensed under the **MIT License**.
