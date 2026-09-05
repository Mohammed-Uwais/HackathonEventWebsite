# CampusPulse | Zero-Cost Campus Event Discovery & Admin Publishing Platform

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Hosting](https://img.shields.io/badge/hosting-GitHub%20Pages-brightgreen.svg)](https://pages.github.com)
[![AI Powered](https://img.shields.io/badge/AI-Groq%20Llama%203.1-orange.svg)](https://groq.com)
[![Database](https://img.shields.io/badge/database-Firebase%20Firestore-yellow.svg)](https://firebase.google.com)

A high-performance, enterprise-grade, fully responsive Zero-Cost Campus Event Discovery & Admin Publishing Platform built with HTML5, modern CSS, Vanilla JavaScript, Firebase Auth & Firestore, and Groq AI API (`llama-3.1-8b-instant`).

---

## 🔒 Environment & API Key Configuration

1. **Environment Configuration File (`env.js` / `.env`)**: API keys (Groq API Key, Firebase credentials) are loaded directly from `env.js` or `.env`. Simply open `env.js` in the project root and paste your Groq API key:
   ```javascript
   window.ENV = {
     GROQ_API_KEY: "gsk_your_actual_groq_api_key_here",
     FIREBASE_CONFIG: { ... }
   };
   ```
2. **Strict XSS Sanitization**: User-submitted event titles, descriptions, rules, and organizer emails are escaped (`escapeHTML()`) before rendering to the DOM to prevent Cross-Site Scripting (XSS).
3. **Google Drive Link Protocol Sanitizer**: Image and poster URLs are sanitized to ensure strict `https://` protocol compliance, blocking `javascript:` or `data:` payloads.
4. **HTTPS Everywhere**: Fully compatible with GitHub Pages HTTPS enforcement (`https://<username>.github.io/<repo-name>`).

---

## 🚀 How to Deploy to GitHub Pages in 4 Steps

### Step 1: Initialize Git & Commit Code
Open your shell terminal in the project directory and run:
```bash
git init
git add .
git commit -m "Initial commit: CampusPulse Enterprise Platform"
```

### Step 2: Push to Your GitHub Repository
Create a new public repository on GitHub (e.g. `campus-pulse`), then run:
```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/campus-pulse.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** -> **Pages** (in the left sidebar).
3. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
4. Choose **main** branch and `/ (root)` folder, then click **Save**.

### Step 4: Access Your Live Site!
In 1-2 minutes, your website will be live at:
`https://<YOUR_GITHUB_USERNAME>.github.io/campus-pulse/`

---

## ⚙️ Features & Architecture

- **Mandatory Sequential Auth Gate**: Users must sign in or create an account first before gaining access to the main dashboard.
- **Dual-Mode Admin Publishing Studio**:
  - **Manual Form Mode**: Complete event metadata with Google Drive link auto-sanitizer.
  - **AI Prompt Parsing Mode**: Groq AI parses raw WhatsApp text circulars into pre-filled JSON form fields.
- **Dynamic Visual Status Engine**:
  - 🟢 **Green Badge**: Registration OPEN & Event pending.
  - 🟡 **Yellow Badge**: Registration CLOSED & Event pending.
  - 🔴 **Red Badge**: Event ENDED.
- **Smart Utilities**: "Copy AI Reminder Text" for WhatsApp & "Add to Google Calendar" pre-filled template links.
- **Real-Time Notifications & AI Chatbot**: Firebase Firestore real-time snapshot sync + Groq-powered AI Concierge chatbot.
