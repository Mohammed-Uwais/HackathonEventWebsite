// CampusPulse Environment Configuration
// Provide your Groq API Key and Firebase credentials below.

window.ENV = {
  // Groq API Key (Get yours free from https://console.groq.com/keys)
  GROQ_API_KEY: "gsk_your_groq_api_key_placeholder",

  // EmailJS Configuration (Free automatic email sending to real Gmail inboxes: https://www.emailjs.com)
  EMAILJS_PUBLIC_KEY: "zo8_pyGWh7nYIpmQZ",
  EMAILJS_SERVICE_ID: "service_x2wgfce",
  EMAILJS_TEMPLATE_ID: "pin2cja",

  // Firebase Configuration Credentials
  FIREBASE_CONFIG: {
    apiKey: "AIzaSyAH32K13ALC3epBCfZn1lrduyBucSGDG-w",
    authDomain: "hackathon-3-event-website.firebaseapp.com",
    projectId: "hackathon-3-event-website",
    storageBucket: "hackathon-3-event-website.firebasestorage.app",
    messagingSenderId: "308620504514",
    appId: "1:308620504514:web:8bb8f1ee7d6548f406ba5b",
    measurementId: "G-GDFKR3XZDL"
  }
};

// Automatic .env file parser for local web server
(function loadEnvFile() {
  fetch('.env')
    .then(response => {
      if (response.ok) return response.text();
      return '';
    })
    .then(text => {
      if (!text) return;
      text.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const parts = trimmed.split('=');
          const key = parts[0].trim();
          const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
          if (key === 'GROQ_API_KEY' && val && !val.includes('xxxx')) {
            window.ENV.GROQ_API_KEY = val;
          }
          if (key === 'EMAILJS_PUBLIC_KEY' && val && !val.includes('YOUR_')) {
            window.ENV.EMAILJS_PUBLIC_KEY = val;
          }
          if (key === 'EMAILJS_SERVICE_ID' && val && !val.includes('YOUR_')) {
            window.ENV.EMAILJS_SERVICE_ID = val;
          }
          if (key === 'EMAILJS_TEMPLATE_ID' && val && !val.includes('YOUR_')) {
            window.ENV.EMAILJS_TEMPLATE_ID = val;
          }
        }
      });
    })
    .catch(() => {});
})();
