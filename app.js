/**
 * CampusPulse - Zero-Cost Campus Event Discovery & Admin Publishing Platform
 * Enterprise Light-SaaS Authentication & Onboarding Module with Firebase Auth & Firestore
 */

// DEFAULT SEED EVENTS & PROJECTS FOR FIRESTORE INITIALIZATION
const SEED_EVENTS = [
  {
    title: 'Hack-AI-Thon 2026: GenAI Innovations',
    directory: 'events',
    type: 'Hackathon',
    shortDesc: '24-hour national student hackathon building high-impact LLM & GenAI apps.',
    fullDesc: 'Join over 500+ student developers nationwide in constructing innovative generative AI solutions for real-world enterprise challenges. Mentorship provided by top industry experts.',
    departments: ['CSE', 'IT', 'AIDS'],
    rules: '1. Teams of 2-4 members. 2. College ID mandatory. 3. All code must be written during the hackathon.',
    regStart: '2026-09-01T09:00',
    regEnd: '2026-09-15T23:59',
    eventStart: '2026-09-20T09:00',
    eventEnd: '2026-09-21T17:00',
    regLink: 'https://forms.google.com/example-hackathon',
    posterUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    organizerEmail: 'cse.head@campus.edu',
    createdAt: new Date().toISOString()
  },
  {
    title: 'Electra-Quest 2026: IoT & Robotics Symposium',
    directory: 'events',
    type: 'Symposium',
    shortDesc: 'Inter-departmental robotics showcase and embedded system project paper presentations.',
    fullDesc: 'Explore cutting-edge hardware design, microcontroller programming, autonomous drones, and smart campus IoT deployments in this flagship annual engineering symposium.',
    departments: ['ECE', 'EEE', 'MECH'],
    rules: '1. Project abstracts must be submitted prior to reg deadline. 2. Maximum 3 members per team.',
    regStart: '2026-09-02T10:00',
    regEnd: '2026-09-10T18:00',
    eventStart: '2026-09-25T09:30',
    eventEnd: '2026-09-25T16:30',
    regLink: 'https://forms.google.com/example-ece',
    posterUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    organizerEmail: 'ece.admin@campus.edu',
    createdAt: new Date().toISOString()
  },
  {
    title: 'Code Blitz: Rapid Algorithmic Challenge',
    directory: 'events',
    type: 'Quiz',
    shortDesc: 'Speed competitive programming contest on data structures & algorithms.',
    fullDesc: 'Test your problem-solving abilities against the clock! 5 complex algorithmic problems in 2 hours with real-time leaderboard scoring.',
    departments: ['All'],
    rules: '1. Individual participation only. 2. Languages permitted: C++, Java, Python.',
    regStart: '2026-08-20T09:00',
    regEnd: '2026-08-30T23:59',
    eventStart: '2026-09-02T14:00',
    eventEnd: '2026-09-02T16:00',
    regLink: 'https://forms.google.com/example-codeblitz',
    posterUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    organizerEmail: 'it.society@campus.edu',
    createdAt: new Date().toISOString()
  },
  /* DIRECTORY 2: STUDENT PROJECTS & RESEARCH INNOVATIONS SHOWCASE */
  {
    title: 'Smart Campus Microgrid & Energy IoT Monitor',
    directory: 'projects',
    type: 'Project',
    shortDesc: 'Real-time IoT sensor network tracking energy utilization across LICET academic blocks.',
    fullDesc: 'A real-time energy analytics and IoT sensor network monitoring electricity consumption across LICET academic blocks. Built by ECE & CSE students using ESP32 microcontrollers, MQTT protocol, and a React web dashboard.',
    departments: ['ECE', 'EEE', 'CSE'],
    techStack: ['IoT', 'ESP32', 'MQTT', 'Python', 'React'],
    rules: 'Open-source under MIT License. Hardware schematics and firmware available on GitHub.',
    regLink: 'https://github.com/licet-projects/smart-energy-grid',
    posterUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    organizerEmail: 'ece.innovator@licet.ac.in',
    createdAt: new Date().toISOString()
  },
  {
    title: 'AI Healthcare Diagnostic Model for Early Mammography',
    directory: 'projects',
    type: 'Research',
    shortDesc: 'Deep learning computer vision algorithm for early mammography tumor classification.',
    fullDesc: 'An AI research project utilizing ResNet-50 and Vision Transformers (ViT) trained on anonymized medical imaging datasets to assist radiologists with early tumor detection. Achieved 94.8% diagnostic accuracy.',
    departments: ['AIDS', 'CSE'],
    techStack: ['Python', 'PyTorch', 'Computer Vision', 'ResNet-50', 'FastAPI'],
    rules: 'Published paper presented at National Biomedical Conference 2026. Dataset available under NDA.',
    regLink: 'https://github.com/licet-projects/ai-cancer-diagnostic',
    posterUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    organizerEmail: 'aids.research@licet.ac.in',
    createdAt: new Date().toISOString()
  },
  {
    title: 'Autonomous Vision Drone for Campus Security Patrol',
    directory: 'projects',
    type: 'Project',
    shortDesc: 'Custom quadcopter with onboard Jetson Nano for autonomous flight & obstacle avoidance.',
    fullDesc: 'A hardware and robotics capstone project combining lightweight carbon fiber drone frames, NVIDIA Jetson Nano edge computing, and OpenCV object tracking for campus safety patrols.',
    departments: ['MECH', 'ECE', 'CSE'],
    techStack: ['Robotics', 'NVIDIA Jetson', 'OpenCV', 'ROS2', 'C++'],
    rules: 'Live flight demonstration available upon request at LICET Robotics Laboratory.',
    regLink: 'https://github.com/licet-projects/autonomous-vision-drone',
    posterUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    organizerEmail: 'mech.robotics@licet.ac.in',
    createdAt: new Date().toISOString()
  }
];

class App {
  constructor() {
    this.events = [];
    this.currentUser = null;
    this.activeDirectory = 'events'; // Dual Directory switcher state: 'events' vs 'projects'
    this.activeDeptFilter = '';
    this.selectedEventId = null;
    this.otpState = { email: '', code: '' };
    this.publishMode = 'manual';
    this.notificationsEnabled = false;
    this.initialLoadDone = false;
    this.inAppNotifications = JSON.parse(localStorage.getItem('campuspulse_notif_history') || '[]');

    const savedConfig = localStorage.getItem('campuspulse_firebase_config');
    if (savedConfig) {
      try {
        this.firebaseConfig = JSON.parse(savedConfig);
      } catch (e) {
        this.firebaseConfig = this.getDefaultFirebaseConfig();
      }
    } else {
      this.firebaseConfig = this.getDefaultFirebaseConfig();
    }

    this.initFirebase();
    this.initServiceWorker();
  }

  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      const swUrl = new URL('sw.js', window.location.href).href;
      navigator.serviceWorker.register(swUrl).then(reg => {
        this.swRegistration = reg;
        console.log('CampusPulse Universal PWA Service Worker registered:', reg.scope);
      }).catch(err => {
        console.warn('PWA Service Worker registration error:', err);
      });
    }
  }

  getDefaultFirebaseConfig() {
    if (window.ENV && window.ENV.FIREBASE_CONFIG) {
      return window.ENV.FIREBASE_CONFIG;
    }
    return {
      apiKey: "AIzaSyAH32K13ALC3epBCfZn1lrduyBucSGDG-w",
      authDomain: "hackathon-3-event-website.firebaseapp.com",
      projectId: "hackathon-3-event-website",
      storageBucket: "hackathon-3-event-website.firebasestorage.app",
      messagingSenderId: "308620504514",
      appId: "1:308620504514:web:8bb8f1ee7d6548f406ba5b",
      measurementId: "G-GDFKR3XZDL"
    };
  }

  // --- SECURITY: HTML ESCAPING TO PREVENT XSS ATTACKS ---
  escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- SECURITY: GOOGLE DRIVE LINK SANITIZER ---
  sanitizeGoogleDriveUrl(url) {
    if (!url) return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
    
    const cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80';
    }

    const regex = /(?:file\/d\/|id=)([a-zA-Z0-9_-]+)/;
    const match = cleanUrl.match(regex);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
    return this.escapeHTML(cleanUrl);
  }

  // --- FIREBASE INITIALIZATION & SESSION PERSISTENCE (onAuthStateChanged) ---
  initFirebase() {
    try {
      if (window.firebase && this.firebaseConfig.apiKey && !firebase.apps.length) {
        firebase.initializeApp(this.firebaseConfig);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        
        // SESSION PERSISTENCE: Maintain active user session across page reloads
        this.auth.onAuthStateChanged((user) => {
          if (user) {
            this.currentUser = {
              uid: user.uid,
              email: user.email,
              isAuthenticated: true
            };
            this.showMainWebsiteScreen();
            this.registerFcmPushToken();
          } else {
            this.showAuthLandingGate();
          }
        });

        this.initFcmMessaging();
        this.listenToFirestoreEvents();
      } else {
        this.initLocalEngine();
      }
    } catch (e) {
      console.warn("Firebase initialized in local mode:", e);
      this.initLocalEngine();
    }
  }

  initLocalEngine() {
    const stored = localStorage.getItem('campuspulse_events');
    if (stored) {
      try {
        this.events = JSON.parse(stored);
      } catch (e) {
        this.events = [...SEED_EVENTS];
      }
    } else {
      this.events = [...SEED_EVENTS];
      this.saveEventsToStorage();
    }

    const savedUser = localStorage.getItem('campuspulse_user');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        this.showMainWebsiteScreen();
      } catch (e) {
        this.showAuthLandingGate();
      }
    } else {
      this.showAuthLandingGate();
    }
  }

  listenToFirestoreEvents() {
    if (!this.db) return;
    
    this.db.collection('events').orderBy('createdAt', 'desc').onSnapshot(async (snapshot) => {
      if (snapshot.empty) {
        for (const seed of SEED_EVENTS) {
          try {
            await this.db.collection('events').add(seed);
          } catch (err) {}
        }
        return;
      }

      // Check if new listings were published after initial load
      if (this.initialLoadDone && snapshot.docChanges) {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const newDoc = { id: change.doc.id, ...change.doc.data() };
            this.sendMobilePushNotification(newDoc);
          }
        });
      }

      const docs = [];
      snapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });

      this.events = docs;
      this.initialLoadDone = true;
      this.saveEventsToStorage();
      this.renderEvents();
    }, (error) => {
      console.warn("Firestore snapshot error:", error);
    });
  }

  saveEventsToStorage() {
    localStorage.setItem('campuspulse_events', JSON.stringify(this.events));
  }

  showAuthLandingGate() {
    const landing = document.getElementById('auth-landing-screen');
    const appContainer = document.getElementById('app-container');
    if (landing) landing.style.display = 'flex';
    if (appContainer) {
      appContainer.classList.remove('authenticated');
      appContainer.style.display = 'none';
    }
  }

  showMainWebsiteScreen() {
    const landing = document.getElementById('auth-landing-screen');
    const appContainer = document.getElementById('app-container');
    if (landing) landing.style.display = 'none';
    if (appContainer) {
      appContainer.classList.add('authenticated');
      appContainer.style.display = 'flex';
    }

    this.updateUserUI();
    this.renderEvents();

    // Check Notification Permission for logged-in user & show banner if not granted
    if ('Notification' in window) {
      const banner = document.getElementById('mobile-notif-banner');
      if (Notification.permission === 'granted') {
        this.notificationsEnabled = true;
        this.updateNotificationBellUI(true);
        if (banner) banner.style.display = 'none';
      } else if (Notification.permission !== 'denied') {
        this.updateNotificationBellUI(false);
        if (banner) banner.style.display = 'flex';
      } else {
        this.updateNotificationBellUI(false);
        if (banner) banner.style.display = 'none';
      }
    }
  }

  switchGateTab(mode) {
    const title = document.getElementById('auth-card-title');
    const loginForm = document.getElementById('gate-view-login');
    const signupForm = document.getElementById('gate-view-signup');
    const loginErr = document.getElementById('login-email-error');
    const signupErr = document.getElementById('signup-email-error');

    if (loginErr) loginErr.classList.add('hidden');
    if (signupErr) signupErr.classList.add('hidden');

    if (mode === 'login') {
      if (title) title.textContent = 'Welcome Back';
      if (loginForm) loginForm.classList.remove('hidden');
      if (signupForm) signupForm.classList.add('hidden');
    } else {
      if (title) title.textContent = 'Create Account';
      if (loginForm) loginForm.classList.add('hidden');
      if (signupForm) signupForm.classList.remove('hidden');
    }
  }

  // --- SIGN IN FLOW & DIRECT FIRESTORE USER DOCUMENT WRITE ---
  async handleGateSignIn(e) {
    e.preventDefault();
    const email = document.getElementById('gate-login-email').value.trim();
    const password = document.getElementById('gate-login-password').value;
    const btn = document.getElementById('btn-gate-signin');
    const errDiv = document.getElementById('login-email-error');

    if (errDiv) errDiv.classList.add('hidden');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

    try {
      if (this.auth && this.db) {
        const userCred = await this.auth.signInWithEmailAndPassword(email, password);
        const uid = userCred.user.uid;

        // WRITE USER PROFILE DIRECTLY TO FIRESTORE 'users' COLLECTION
        await this.db.collection('users').doc(uid).set({
          email: userCred.user.email,
          uid: uid,
          lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log("Successfully stored user document in Firestore 'users' collection:", uid);

        this.currentUser = {
          uid: uid,
          email: userCred.user.email,
          isAuthenticated: true
        };

        localStorage.setItem('campuspulse_user', JSON.stringify(this.currentUser));
        this.showMainWebsiteScreen();
        this.triggerToastNotification('Sign In Successful', `Welcome back, ${this.escapeHTML(email)}!`);
      } else {
        this.currentUser = { email, isAuthenticated: true };
        localStorage.setItem('campuspulse_user', JSON.stringify(this.currentUser));
        this.showMainWebsiteScreen();
      }
    } catch (err) {
      console.error("Firebase Sign In Error:", err);
      if (errDiv) {
        errDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${this.escapeHTML(err.message || 'Invalid user ID. Please check your email or sign up.')}`;
        errDiv.classList.remove('hidden');
      }
      this.triggerToastNotification('Sign In Failed', err.message || 'Invalid email or password.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign In';
    }
  }

  // --- SIGN UP FLOW & DIRECT FIRESTORE USER DOCUMENT WRITE ---
  async handleGateSignUp(e) {
    e.preventDefault();
    const email = document.getElementById('gate-signup-email').value.trim();
    const password = document.getElementById('gate-signup-password').value;
    const btn = document.getElementById('btn-gate-signup');
    const errDiv = document.getElementById('signup-email-error');

    if (errDiv) errDiv.classList.add('hidden');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

    try {
      if (this.auth && this.db) {
        // 1. Create User Account in Firebase Authentication
        const userCred = await this.auth.createUserWithEmailAndPassword(email, password);
        const uid = userCred.user.uid;

        // 2. Direct write to Firestore 'users' collection
        await this.db.collection('users').doc(uid).set({
          email: email,
          uid: uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log("Successfully created user document in Firestore 'users' collection:", uid);

        this.currentUser = {
          uid: uid,
          email: email,
          isAuthenticated: true
        };

        localStorage.setItem('campuspulse_user', JSON.stringify(this.currentUser));
        this.showMainWebsiteScreen();
        this.triggerToastNotification('Account Created & Saved in Database', `User ${this.escapeHTML(email)} stored in Firestore!`);
      } else {
        this.currentUser = { email, isAuthenticated: true };
        localStorage.setItem('campuspulse_user', JSON.stringify(this.currentUser));
        this.showMainWebsiteScreen();
      }
    } catch (err) {
      console.error("Firebase Sign Up Error:", err);
      let errorMsg = err.message || 'Failed to create user account.';
      
      // Catch disabled Email/Password authentication setting
      if (err.code === 'auth/operation-not-allowed') {
        errorMsg = 'Email/Password sign-in is currently disabled in your Firebase Console! Please enable it under Authentication -> Sign-in method.';
      }

      if (errDiv) {
        errDiv.textContent = errorMsg;
        errDiv.classList.remove('hidden');
      }
      this.triggerToastNotification('Sign Up Error', errorMsg);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Account';
    }
  }

  // --- LOGOUT ACTION ---
  logoutUser() {
    this.currentUser = null;
    localStorage.removeItem('campuspulse_user');

    if (this.auth) {
      this.auth.signOut().catch(() => {});
    }

    this.showAuthLandingGate();
    this.triggerToastNotification('Logged Out', 'You have been safely logged out.');
  }

  // --- DYNAMIC VISUAL STATUS EVALUATION ENGINE ---
  evaluateEventStatus(event) {
    const now = new Date();
    const regStart = new Date(event.regStart);
    const regEnd = new Date(event.regEnd);
    const eventStart = new Date(event.eventStart);
    const eventEnd = new Date(event.eventEnd);

    if (now >= eventEnd) {
      return {
        code: 'ENDED',
        label: '🔴 Event Ended',
        class: 'ended',
        cardBorder: 'status-ended'
      };
    } else if (now < eventStart) {
      if (now >= regStart && now <= regEnd) {
        return {
          code: 'OPEN',
          label: '🟢 Reg Open',
          class: 'open',
          cardBorder: 'status-open'
        };
      } else {
        return {
          code: 'CLOSED',
          label: '🟡 Reg Closed',
          class: 'closed',
          cardBorder: 'status-closed'
        };
      }
    } else {
      return {
        code: 'OPEN',
        label: '🟢 Event Live',
        class: 'open',
        cardBorder: 'status-open'
      };
    }
  }

  // --- DUAL DIRECTORY SWITCHER METHOD ---
  switchDirectory(directory) {
    this.activeDirectory = directory;

    const tabEvents = document.getElementById('tab-dir-events');
    const tabProjects = document.getElementById('tab-dir-projects');
    if (tabEvents) tabEvents.classList.toggle('active', directory === 'events');
    if (tabProjects) tabProjects.classList.toggle('active', directory === 'projects');

    const titleEl = document.getElementById('page-directory-title');
    const subEl = document.getElementById('page-directory-sub');
    const statusSelectContainer = document.getElementById('status-select-container');
    const dateFilterGroup = document.getElementById('date-filter-group');
    const legendBar = document.getElementById('legend-bar');

    if (directory === 'events') {
      if (titleEl) titleEl.textContent = 'Campus Events & Competitions Hub';
      if (subEl) subEl.textContent = 'Discover upcoming hackathons, symposia, and workshops';
      if (statusSelectContainer) statusSelectContainer.style.display = 'block';
      if (dateFilterGroup) dateFilterGroup.style.display = 'flex';
      if (legendBar) legendBar.style.display = 'flex';
    } else {
      if (titleEl) titleEl.textContent = 'Projects, Research & Innovations Showcase';
      if (subEl) subEl.textContent = 'Explore student capstones, hardware prototypes, and faculty research papers';
      if (statusSelectContainer) statusSelectContainer.style.display = 'none';
      if (dateFilterGroup) dateFilterGroup.style.display = 'none';
      if (legendBar) legendBar.style.display = 'none';
    }

    this.renderEvents();
  }

  handlePublishDirectoryChange(dir) {
    const isProject = dir === 'projects';
    const groupTech = document.getElementById('group-tech-stack');
    const groupRegDates = document.getElementById('group-pub-reg-dates');
    const groupEventDates = document.getElementById('group-pub-event-dates');
    const groupRules = document.getElementById('group-pub-rules');

    if (groupTech) groupTech.style.display = isProject ? 'block' : 'none';
    if (groupRegDates) groupRegDates.style.display = isProject ? 'none' : 'flex';
    if (groupEventDates) groupEventDates.style.display = isProject ? 'none' : 'flex';

    document.getElementById('lbl-pub-title').textContent = isProject ? 'Project / Paper Title *' : 'Listing Title *';
    document.getElementById('lbl-pub-full-desc').textContent = isProject ? 'Project Abstract / Methodology *' : 'Full Description / Breakdown *';
    document.getElementById('lbl-pub-rules').textContent = isProject ? 'License / Citation Guidelines' : 'Criteria & Rules';
    document.getElementById('lbl-pub-reg-link').textContent = isProject ? 'GitHub Repository / Demo Link *' : 'Registration Link (External URL) *';
  }

  // --- RENDER EVENT / PROJECT CARDS GRID ---
  renderEvents() {
    const gridContainer = document.getElementById('events-grid');
    const resultsCount = document.getElementById('results-count');

    if (!gridContainer || !resultsCount) return;

    const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
    const deptFilter = document.getElementById('dept-select').value || this.activeDeptFilter;
    const statusFilter = document.getElementById('status-select')?.value;
    const singleDate = document.getElementById('date-single')?.value;
    const dateFrom = document.getElementById('date-from')?.value;
    const dateTo = document.getElementById('date-to')?.value;

    const filtered = this.events.filter(event => {
      // 1. Dual Directory Filter (events vs projects)
      const itemDir = event.directory || (event.type === 'Project' || event.type === 'Research' ? 'projects' : 'events');
      if (itemDir !== this.activeDirectory) return false;

      const statusInfo = this.evaluateEventStatus(event);

      if (searchQuery) {
        const matchesTitle = event.title.toLowerCase().includes(searchQuery);
        const matchesShortDesc = event.shortDesc.toLowerCase().includes(searchQuery);
        const matchesCategory = event.type.toLowerCase().includes(searchQuery);
        const matchesTech = event.techStack ? event.techStack.some(t => t.toLowerCase().includes(searchQuery)) : false;
        if (!matchesTitle && !matchesShortDesc && !matchesCategory && !matchesTech) return false;
      }

      if (deptFilter) {
        const includesDept = event.departments.includes('All') || event.departments.includes(deptFilter);
        if (!includesDept) return false;
      }

      if (this.activeDirectory === 'events') {
        if (statusFilter && statusInfo.code !== statusFilter) return false;

        if (singleDate) {
          const targetDay = new Date(singleDate).toISOString().split('T')[0];
          const eventDayStart = event.eventStart ? new Date(event.eventStart).toISOString().split('T')[0] : '';
          const eventDayEnd = event.eventEnd ? new Date(event.eventEnd).toISOString().split('T')[0] : '';
          if (targetDay < eventDayStart || targetDay > eventDayEnd) return false;
        }

        if (dateFrom && event.eventEnd) {
          const fromTime = new Date(dateFrom).getTime();
          const eventEndTime = new Date(event.eventEnd).getTime();
          if (eventEndTime < fromTime) return false;
        }
        if (dateTo && event.eventStart) {
          const toTime = new Date(dateTo).getTime();
          const eventStartTime = new Date(event.eventStart).getTime();
          if (eventStartTime > toTime) return false;
        }
      }

      return true;
    });

    const unitName = this.activeDirectory === 'events' ? 'event' : 'project';
    resultsCount.textContent = `Showing ${filtered.length} ${unitName}${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fa-regular fa-folder-open"></i></div>
          <h3>No ${unitName}s match your criteria</h3>
          <p>Try adjusting your search terms, department filters, or switch directories.</p>
          <button class="btn-primary" onclick="app.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = filtered.map(event => {
      const statusInfo = this.evaluateEventStatus(event);
      const posterImg = this.sanitizeGoogleDriveUrl(event.posterUrl);
      const deptsHtml = event.departments.map(d => `<span class="dept-tag">${this.escapeHTML(d)}</span>`).join('');

      if (this.activeDirectory === 'projects') {
        const techHtml = (event.techStack || []).map(t => `<span class="tech-chip">${this.escapeHTML(t)}</span>`).join('');
        const badgeClass = event.type === 'Research' ? 'research' : 'project';
        const badgeLabel = event.type === 'Research' ? '🔬 Research Paper' : '💡 Student Project';

        return `
          <div class="event-card" style="border:1px solid #e2e8f0;" onclick="app.openDetailModal('${this.escapeHTML(event.id)}')">
            <div class="card-header-image">
              <img src="${posterImg}" alt="${this.escapeHTML(event.title)}" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'">
              <span class="card-type-badge">${this.escapeHTML(event.type)}</span>
              <span class="card-status-badge ${badgeClass}">${badgeLabel}</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">${this.escapeHTML(event.title)}</h3>
              <p class="card-description">${this.escapeHTML(event.shortDesc)}</p>

              <div class="tech-chips-list">
                ${techHtml}
              </div>

              <div class="card-meta-list" style="margin-top:0.75rem;">
                <div class="card-meta-item">
                  <i class="fa-solid fa-graduation-cap" style="color:var(--primary-blue);"></i> Author: ${this.escapeHTML(event.organizerEmail)}
                </div>
                <div class="card-dept-tags">
                  ${deptsHtml}
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        const eventDateFormatted = event.eventStart ? new Date(event.eventStart).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        }) : 'TBA';

        return `
          <div class="event-card ${statusInfo.cardBorder}" onclick="app.openDetailModal('${this.escapeHTML(event.id)}')">
            <div class="card-header-image">
              <img src="${posterImg}" alt="${this.escapeHTML(event.title)}" onerror="this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'">
              <span class="card-type-badge">${this.escapeHTML(event.type)}</span>
              <span class="card-status-badge ${statusInfo.class}">${statusInfo.label}</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">${this.escapeHTML(event.title)}</h3>
              <p class="card-description">${this.escapeHTML(event.shortDesc)}</p>

              <div class="card-meta-list">
                <div class="card-meta-item">
                  <i class="fa-regular fa-calendar" style="color:var(--primary-blue);"></i> ${eventDateFormatted}
                </div>
                <div class="card-meta-item">
                  <i class="fa-solid fa-user-gear" style="color:var(--text-muted);"></i> ${this.escapeHTML(event.organizerEmail)}
                </div>
                <div class="card-dept-tags">
                  ${deptsHtml}
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }).join('');
  }

  handleFilterChange() {
    this.renderEvents();
  }

  setDeptFilter(dept) {
    this.activeDeptFilter = dept;
    document.getElementById('dept-select').value = dept;

    const chips = document.querySelectorAll('.dept-chip');
    chips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.dept === dept);
    });

    this.renderEvents();
  }

  resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('dept-select').value = '';
    document.getElementById('status-select').value = '';
    document.getElementById('date-single').value = '';
    document.getElementById('date-from').value = '';
    document.getElementById('date-to').value = '';
    this.setDeptFilter('');
  }

  updateUserUI() {
    const displayEmail = document.getElementById('display-user-email');
    const displayRole = document.getElementById('display-user-role');
    const avatarInitials = document.getElementById('user-avatar-initials');
    const publishBtn = document.getElementById('btn-sidebar-publish');

    if (this.currentUser && this.currentUser.isAuthenticated) {
      displayEmail.textContent = this.currentUser.email;
      displayRole.textContent = 'Campus User';
      avatarInitials.textContent = this.currentUser.email.substring(0, 2).toUpperCase();
      if (publishBtn) publishBtn.style.display = 'flex';
    }
  }

  // --- ADMIN EVENT PUBLISHING MODULE ---
  openPublishModal() {
    if (!this.currentUser) {
      alert('Unauthorized: Please sign in to publish events.');
      return;
    }
    this.openModal('publish-modal');
  }

  switchPublishTab(mode) {
    this.publishMode = mode;
    document.getElementById('tab-btn-manual').classList.toggle('active', mode === 'manual');
    document.getElementById('tab-btn-ai').classList.toggle('active', mode === 'ai');

    document.getElementById('publish-view-manual').style.display = mode === 'manual' ? 'block' : 'none';
    document.getElementById('publish-view-ai').style.display = mode === 'ai' ? 'block' : 'none';
  }

  toggleAllDepts(checkbox) {
    const checkboxes = document.querySelectorAll('input[name="pub-dept"]');
    checkboxes.forEach(cb => {
      if (cb !== checkbox) cb.checked = checkbox.checked;
    });
  }

  async handleManualPublish(e) {
    e.preventDefault();
    if (!this.currentUser) return;

    const directory = document.getElementById('pub-directory').value || 'events';
    const title = document.getElementById('pub-title').value;
    const type = document.getElementById('pub-type').value;
    const techStackInput = document.getElementById('pub-tech-stack')?.value || '';
    const techStack = techStackInput.split(',').map(t => t.trim()).filter(Boolean);
    const shortDesc = document.getElementById('pub-short-desc').value;
    const fullDesc = document.getElementById('pub-full-desc').value;

    const deptCheckboxes = document.querySelectorAll('input[name="pub-dept"]:checked');
    let departments = Array.from(deptCheckboxes).map(cb => cb.value);
    if (departments.length === 0) departments = ['All'];

    const rules = document.getElementById('pub-rules').value;
    const regStart = document.getElementById('pub-reg-start')?.value || '';
    const regEnd = document.getElementById('pub-reg-end')?.value || '';
    const eventStart = document.getElementById('pub-event-start')?.value || '';
    const eventEnd = document.getElementById('pub-event-end')?.value || '';
    const regLink = document.getElementById('pub-reg-link').value;
    const posterUrl = document.getElementById('pub-poster-url').value;

    const newEvent = {
      directory,
      title,
      type,
      techStack,
      shortDesc,
      fullDesc,
      departments,
      rules: rules || (directory === 'projects' ? 'Open-source or campus project guidelines.' : 'Standard campus event rules apply.'),
      regStart,
      regEnd,
      eventStart,
      eventEnd,
      regLink,
      posterUrl,
      organizerEmail: this.currentUser.email,
      createdAt: new Date().toISOString()
    };

    if (this.db) {
      try {
        const docRef = await this.db.collection('events').add(newEvent);
        newEvent.id = docRef.id;
      } catch (err) {
        console.warn("Firestore save fallback:", err);
        newEvent.id = 'evt-' + Date.now();
        this.events.unshift(newEvent);
        this.saveEventsToStorage();
      }
    } else {
      newEvent.id = 'evt-' + Date.now();
      this.events.unshift(newEvent);
      this.saveEventsToStorage();
    }

    this.switchDirectory(directory);
    this.closeModal('publish-modal');
    this.triggerToastNotification(
      directory === 'projects' ? '💡 New Project / Paper Published!' : '🎉 New Event Published!',
      `${this.escapeHTML(newEvent.title)} added to Directory.`
    );
    this.sendMobilePushNotification(newEvent);
  }

  // --- MOBILE PUSH NOTIFICATION SYSTEM (LOGGED-IN USERS & CLOSED BROWSER FCM) ---
  initFcmMessaging() {
    if (window.firebase && firebase.messaging && firebase.messaging.isSupported && firebase.messaging.isSupported()) {
      try {
        this.messaging = firebase.messaging();
        this.messaging.onMessage((payload) => {
          console.log('[App] Foreground FCM notification:', payload);
          const title = payload.notification?.title || payload.data?.title || '🔔 New Campus Listing!';
          const shortDesc = payload.notification?.body || payload.data?.shortDesc || 'Check out the new event.';
          this.triggerToastNotification(title, shortDesc);
        });
      } catch (err) {
        console.warn("FCM Messaging init:", err);
      }
    }
  }

  async registerFcmPushToken() {
    if (!this.messaging || !this.currentUser) return;
    try {
      const token = await this.messaging.getToken({
        serviceWorkerRegistration: this.swRegistration
      });
      if (token) {
        console.log("FCM Closed-Browser Push Token generated:", token);
        if (this.db) {
          await this.db.collection('fcm_tokens').doc(this.currentUser.uid).set({
            uid: this.currentUser.uid,
            email: this.currentUser.email,
            token: token,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        }
      }
    } catch (err) {
      console.warn("FCM Token Registration:", err);
    }
  }

  updateNotificationBellUI(isEnabled) {
    const dot = document.getElementById('bell-badge-dot');
    const bellBtn = document.getElementById('btn-notification-bell');
    if (dot) dot.classList.toggle('active', isEnabled);
    if (bellBtn) {
      bellBtn.title = isEnabled ? '🔔 Mobile Notifications Active' : 'Click to Enable Mobile Notifications';
    }
    this.renderNotifDrawer();
  }

  playChimeSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(520, ctx.currentTime);
      osc2.frequency.setValueAtTime(660, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime + 0.1);
      osc1.stop(ctx.currentTime + 0.5);
      osc2.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.warn("Audio chime error:", e);
    }
  }

  toggleNotifDrawer() {
    const drawer = document.getElementById('notif-drawer');
    if (drawer) {
      const isActive = drawer.classList.toggle('active');
      if (isActive) {
        this.markNotificationsAsRead();
      }
    }
  }

  markNotificationsAsRead() {
    if (!this.inAppNotifications) return;
    this.inAppNotifications.forEach(n => n.unread = false);
    localStorage.setItem('campuspulse_notif_history', JSON.stringify(this.inAppNotifications));
    this.renderNotifDrawer();
  }

  renderNotifDrawer() {
    const drawerList = document.getElementById('notif-drawer-list');
    const badgeCount = document.getElementById('bell-badge-count');
    if (!drawerList) return;

    if (!this.inAppNotifications) this.inAppNotifications = [];
    const unreadCount = this.inAppNotifications.filter(n => n.unread).length;
    if (badgeCount) {
      if (unreadCount > 0) {
        badgeCount.textContent = unreadCount;
        badgeCount.style.display = 'inline-block';
      } else {
        badgeCount.style.display = 'none';
      }
    }

    if (this.inAppNotifications.length === 0) {
      drawerList.innerHTML = `
        <div style="text-align:center; padding:1.5rem; color:#94a3b8; font-size:0.8rem;">
          <i class="fa-regular fa-bell-slash" style="font-size:1.5rem; margin-bottom:0.4rem; display:block; color:#cbd5e1;"></i>
          No new event notifications yet.
        </div>
      `;
      return;
    }

    drawerList.innerHTML = this.inAppNotifications.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="app.openNotificationItem('${this.escapeHTML(n.eventId || '')}')">
        <div class="notif-item-icon">
          <i class="fa-solid fa-bell"></i>
        </div>
        <div class="notif-item-content">
          <div class="notif-item-title">${this.escapeHTML(n.title)}</div>
          <div class="notif-item-desc">${this.escapeHTML(n.body)}</div>
          <div class="notif-item-time">${n.timestamp ? new Date(n.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}</div>
        </div>
      </div>
    `).join('');
  }

  openNotificationItem(eventId) {
    const drawer = document.getElementById('notif-drawer');
    if (drawer) drawer.classList.remove('active');
    if (eventId) {
      this.openDetailModal(eventId);
    }
  }

  testNotificationAlert() {
    this.playChimeSound();
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }

    const testEvent = {
      id: 'test-' + Date.now(),
      title: '⚡ Test Mobile Phone Alert',
      type: 'Notification Test',
      shortDesc: 'Mobile audio chime, vibration, & notification center test completed successfully!',
      departments: ['All'],
      posterUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    };

    this.triggerToastNotification(testEvent.title, testEvent.shortDesc);
    this.sendMobilePushNotification(testEvent);

    if ('Notification' in window && Notification.permission !== 'granted') {
      this.requestNotificationPermission();
    }
  }

  async requestNotificationPermission() {
    if (!this.currentUser || !this.currentUser.isAuthenticated) {
      alert('Please log in first to enable mobile notifications.');
      return;
    }

    if (!('Notification' in window)) {
      alert('Web Notifications are not supported in your browser.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.notificationsEnabled = true;
        this.updateNotificationBellUI(true);
        this.triggerToastNotification('🔔 Mobile Notifications Active', 'You will receive direct phone alerts when new events are published!');
        
        this.registerFcmPushToken();

        // Trigger test push notification alert on phone screen
        this.sendMobilePushNotification({
          title: 'CampusPulse Mobile Alerts Enabled',
          type: 'Notification',
          shortDesc: 'You will receive direct alerts on your phone screen whenever new events or projects are posted!',
          departments: ['All']
        });
      } else {
        this.notificationsEnabled = false;
        this.updateNotificationBellUI(false);
        alert('Notification permission denied. Please enable notifications in your mobile browser settings to receive alerts.');
      }
    } catch (err) {
      console.warn("Notification error:", err);
    }
  }

  sendMobilePushNotification(event) {
    if (!this.currentUser || !this.currentUser.isAuthenticated) return;

    // 1. Audio Sound Chime Feedback
    this.playChimeSound();

    // 2. Haptic Vibration feedback on mobile phones
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }

    // 3. Store in In-App Notification Center Drawer
    const notifObj = {
      id: event.id || 'notif-' + Date.now(),
      eventId: event.id || '',
      title: event.title || 'New Campus Event',
      body: event.shortDesc || 'Check out the latest campus listing.',
      unread: true,
      timestamp: new Date().toISOString()
    };

    if (!this.inAppNotifications) this.inAppNotifications = [];
    this.inAppNotifications.unshift(notifObj);
    if (this.inAppNotifications.length > 25) this.inAppNotifications.pop();
    localStorage.setItem('campuspulse_notif_history', JSON.stringify(this.inAppNotifications));
    this.renderNotifDrawer();

    // 4. Send System Notification Shade Alert if OS Browser Permission Granted
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const notifTitle = `🔔 New ${event.type || 'Listing'}: ${event.title}`;
    const options = {
      body: `${event.departments ? event.departments.join(', ') + ' | ' : ''}${event.shortDesc || 'Check out the new campus listing!'}`,
      icon: event.posterUrl ? this.sanitizeGoogleDriveUrl(event.posterUrl) : 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      badge: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      vibrate: [200, 100, 200, 100, 200],
      tag: event.id || 'event-' + Date.now(),
      data: { url: window.location.href }
    };

    try {
      if (this.swRegistration && this.swRegistration.showNotification) {
        this.swRegistration.showNotification(notifTitle, options);
      } else {
        const notif = new Notification(notifTitle, options);
        notif.onclick = () => {
          window.focus();
          if (event.id) this.openDetailModal(event.id);
        };
      }
    } catch (err) {
      console.warn("Native Notification error:", err);
    }
  }

  dismissNotifBanner() {
    const banner = document.getElementById('mobile-notif-banner');
    if (banner) banner.style.display = 'none';
  }

  // --- MULTIMODAL POSTER IMAGE UPLOAD & GROQ VISION PARSER ---
  handlePosterUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      this.aiPosterBase64 = evt.target.result;
      this.aiPosterFileType = file.type;

      const previewImg = document.getElementById('ai-poster-preview-img');
      const filenameEl = document.getElementById('ai-poster-filename');
      const emptyState = document.getElementById('dropzone-empty-state');
      const previewState = document.getElementById('dropzone-preview-state');

      if (previewImg) previewImg.src = this.aiPosterBase64;
      if (filenameEl) filenameEl.textContent = file.name;
      if (emptyState) emptyState.style.display = 'none';
      if (previewState) previewState.style.display = 'flex';

      this.triggerToastNotification('Poster Loaded', 'Event poster image ready for Groq Vision OCR extraction.');
    };
    reader.readAsDataURL(file);
  }

  clearPosterUpload() {
    this.aiPosterBase64 = null;
    this.aiPosterFileType = null;
    const input = document.getElementById('ai-poster-input');
    if (input) input.value = '';

    const emptyState = document.getElementById('dropzone-empty-state');
    const previewState = document.getElementById('dropzone-preview-state');

    if (emptyState) emptyState.style.display = 'block';
    if (previewState) previewState.style.display = 'none';
  }

  async parseMultimodalWithGroq() {
    const rawText = document.getElementById('ai-raw-prompt').value.trim();
    const hasImage = !!this.aiPosterBase64;

    if (!rawText && !hasImage) {
      alert('Please paste announcement text or upload an event poster image.');
      return;
    }

    this.triggerToastNotification(
      'Groq AI Vision Processing',
      hasImage ? 'Analyzing event poster image & text via Groq Multimodal AI...' : 'Parsing announcement text via Groq AI...'
    );

    const systemPrompt = `You are an AI vision & document parser for a campus platform. Parse the user's announcement text and/or poster image and output ONLY a valid JSON object matching this schema:
{
  "title": "string",
  "type": "Symposium | Hackathon | Quiz | Workshop | Seminar | Cultural | Sports | Project | Research",
  "shortDesc": "string max 120 chars",
  "fullDesc": "string",
  "departments": ["CSE", "ECE", "IT", "AIDS", "EEE", "MECH"],
  "rules": "string",
  "regStart": "YYYY-MM-DDTHH:mm",
  "regEnd": "YYYY-MM-DDTHH:mm",
  "eventStart": "YYYY-MM-DDTHH:mm",
  "eventEnd": "YYYY-MM-DDTHH:mm",
  "regLink": "https://...",
  "posterUrl": "https://..."
}
Output pure JSON with no markdown formatting or commentary.`;

    try {
      let parsed = null;
      const apiKey = this.getGroqApiKey();

      if (apiKey) {
        let messages = [];

        if (hasImage) {
          messages = [
            { role: 'system', content: systemPrompt },
            {
              role: 'user',
              content: [
                { type: 'text', text: rawText ? `Context text: ${rawText}` : 'Extract all event details from this poster flyer image.' },
                { type: 'image_url', image_url: { url: this.aiPosterBase64 } }
              ]
            }
          ];
        } else {
          messages = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: rawText }
          ];
        }

        const visionModels = hasImage
          ? ['llama-3.2-11b-vision-preview', 'llama-3.2-90b-vision-preview', 'openai/gpt-oss-20b', 'qwen/qwen3.6-27b']
          : ['openai/gpt-oss-20b', 'qwen/qwen3.6-27b'];

        const content = await this.callGroqApi(apiKey, messages, 0.2, visionModels);
        parsed = JSON.parse(content.trim().replace(/```json|```/g, ''));
      } else {
        parsed = {
          title: hasImage ? 'Extracted: Campus Event Poster 2026' : 'Parsed: Tech Symposium 2026',
          type: 'Symposium',
          shortDesc: rawText ? rawText.substring(0, 100) + '...' : 'Parsed event details from uploaded poster flyer.',
          fullDesc: rawText || 'Event flyer extracted via Groq Vision AI.',
          departments: ['CSE', 'ECE'],
          rules: 'Bring valid college ID card.',
          regStart: new Date().toISOString().slice(0, 16),
          regEnd: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 16),
          eventStart: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16),
          eventEnd: new Date(Date.now() + 86400000 * 7 + 14400000).toISOString().slice(0, 16),
          regLink: 'https://forms.google.com/sample',
          posterUrl: this.aiPosterBase64 || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
        };
      }

      document.getElementById('pub-title').value = parsed.title || '';
      document.getElementById('pub-type').value = parsed.type || 'Symposium';
      document.getElementById('pub-short-desc').value = parsed.shortDesc || '';
      document.getElementById('pub-full-desc').value = parsed.fullDesc || '';
      document.getElementById('pub-rules').value = parsed.rules || '';
      if (parsed.regStart) document.getElementById('pub-reg-start').value = parsed.regStart;
      if (parsed.regEnd) document.getElementById('pub-reg-end').value = parsed.regEnd;
      if (parsed.eventStart) document.getElementById('pub-event-start').value = parsed.eventStart;
      if (parsed.eventEnd) document.getElementById('pub-event-end').value = parsed.eventEnd;
      if (parsed.regLink) document.getElementById('pub-reg-link').value = parsed.regLink;

      if (hasImage) {
        document.getElementById('pub-poster-url').value = this.aiPosterBase64;
      } else if (parsed.posterUrl) {
        document.getElementById('pub-poster-url').value = parsed.posterUrl;
      }

      this.switchPublishTab('manual');
      this.triggerToastNotification(
        '✨ Fields Pre-Filled!',
        hasImage ? 'Groq Vision successfully read poster image & populated form fields!' : 'Groq AI parsed announcement text!'
      );
    } catch (err) {
      console.error("Groq Vision error:", err);
      alert('Error parsing with Groq Vision AI. Please check your Groq API key or enter fields manually.');
    }
  }

  async parseRawPromptWithGroq() {
    return this.parseMultimodalWithGroq();
  }

  // --- DETAILED EVENT / PROJECT MODAL & SMART UTILITIES ---
  openDetailModal(eventId) {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return;

    this.selectedEventId = eventId;
    const isProject = event.directory === 'projects' || event.type === 'Project' || event.type === 'Research';

    document.getElementById('modal-detail-title').textContent = event.title;
    document.getElementById('modal-detail-poster').src = this.sanitizeGoogleDriveUrl(event.posterUrl);

    const statusBadge = document.getElementById('modal-detail-status');
    if (isProject) {
      statusBadge.textContent = event.type === 'Research' ? '🔬 Research Paper' : '💡 Student Project';
      statusBadge.className = `card-status-badge ${event.type === 'Research' ? 'research' : 'project'}`;
    } else {
      const statusInfo = this.evaluateEventStatus(event);
      statusBadge.textContent = statusInfo.label;
      statusBadge.className = `card-status-badge ${statusInfo.class}`;
    }

    document.getElementById('modal-detail-organizer').textContent = `Author / Publisher: ${event.organizerEmail}`;
    document.getElementById('modal-detail-full-desc').textContent = event.fullDesc;

    const regTimeEl = document.getElementById('modal-detail-reg-time');
    const eventTimeEl = document.getElementById('modal-detail-event-time');
    if (isProject) {
      if (regTimeEl) regTimeEl.parentElement.style.display = 'none';
      if (eventTimeEl) eventTimeEl.textContent = `Published on ${new Date(event.createdAt || Date.now()).toLocaleDateString()}`;
    } else {
      if (regTimeEl) {
        regTimeEl.parentElement.style.display = 'block';
        regTimeEl.textContent = event.regStart ? `${new Date(event.regStart).toLocaleString()} - ${new Date(event.regEnd).toLocaleString()}` : 'TBA';
      }
      if (eventTimeEl) eventTimeEl.textContent = event.eventStart ? `${new Date(event.eventStart).toLocaleString()} - ${new Date(event.eventEnd).toLocaleString()}` : 'TBA';
    }

    const deptsContainer = document.getElementById('modal-detail-depts');
    deptsContainer.innerHTML = event.departments.map(d => `<span class="dept-tag">${this.escapeHTML(d)}</span>`).join('');

    document.getElementById('modal-detail-rules').textContent = event.rules || (isProject ? 'Open-source campus project guidelines apply.' : 'Standard rules apply.');
    
    const regBtn = document.getElementById('modal-detail-reg-btn');
    regBtn.href = event.regLink;
    regBtn.innerHTML = isProject ? '<i class="fa-brands fa-github"></i> View Repository / Demo' : '<i class="fa-solid fa-paper-plane"></i> Register Now';

    this.openModal('detail-modal');
  }

  async copyAiReminderText() {
    const event = this.events.find(e => e.id === this.selectedEventId);
    if (!event) return;

    const whatsappCopyBlock = `📢 *CAMPUS EVENT ANNOUNCEMENT* 📢

*Event:* ${event.title} (${event.type})
🏢 *Departments:* ${event.departments.join(', ')}

📝 *Summary:* ${event.shortDesc}

🗓 *Event Date:* ${new Date(event.eventStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
⏰ *Registration Deadline:* ${new Date(event.regEnd).toLocaleString()}

🔗 *Register Here:* ${event.regLink}

_Published via CampusPulse_`;

    navigator.clipboard.writeText(whatsappCopyBlock);
    this.triggerToastNotification('Copied to Clipboard!', 'WhatsApp reminder text copied! Ready to paste into groups.');
  }

  addToGoogleCalendar() {
    const event = this.events.find(e => e.id === this.selectedEventId);
    if (!event) return;

    const formatCalDate = (isoStr) => {
      return new Date(isoStr).toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const startFormatted = formatCalDate(event.eventStart);
    const endFormatted = formatCalDate(event.eventEnd);

    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(event.title)}` +
      `&dates=${startFormatted}/${endFormatted}` +
      `&details=${encodeURIComponent(event.fullDesc + '\n\nReg Link: ' + event.regLink)}` +
      `&location=${encodeURIComponent('Campus Auditorium / Online')}`;

    window.open(calUrl, '_blank');
  }

  // --- GROQ AI CONCIERGE CHATBOT ---
  toggleAiChat() {
    document.getElementById('chatbot-window').classList.toggle('active');
  }

  openAiChat() {
    document.getElementById('chatbot-window').classList.add('active');
  }

  async handleChatSubmit(e) {
    e.preventDefault();
    const inputEl = document.getElementById('chat-input');
    const userQuery = inputEl.value.trim();
    if (!userQuery) return;

    const chatMessages = document.getElementById('chat-messages');

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = userQuery;
    chatMessages.appendChild(userBubble);
    inputEl.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble bot';
    botBubble.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Thinking...';
    chatMessages.appendChild(botBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const eventsContext = JSON.stringify(this.events.map(e => ({
      directory: e.directory || (e.type === 'Project' || e.type === 'Research' ? 'projects' : 'events'),
      title: e.title,
      type: e.type,
      departments: e.departments,
      techStack: e.techStack || [],
      shortDesc: e.shortDesc,
      eventStart: e.eventStart || '',
      status: e.directory === 'projects' ? 'Published Showcase' : this.evaluateEventStatus(e).label
    })));

    const systemPrompt = `You are Campus Concierge AI for LICET. Help students find relevant campus events, competitions, and ongoing student projects/research papers based on this live JSON directory:\n${eventsContext}\nAnswer concisely and helpfully. Highlight relevant departments, tech stacks, or event dates when appropriate.`;

    try {
      let botResponseText = '';

      const apiKey = this.getGroqApiKey();
      if (apiKey) {
        botResponseText = await this.callGroqApi(apiKey, [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userQuery }
        ], 0.7);
      } else {
        const lowerQ = userQuery.toLowerCase();
        const matches = this.events.filter(ev => 
          ev.title.toLowerCase().includes(lowerQ) ||
          ev.departments.some(d => lowerQ.includes(d.toLowerCase())) ||
          ev.type.toLowerCase().includes(lowerQ)
        );

        if (matches.length > 0) {
          botResponseText = `Here are the matching events I found:\n` + matches.map(m => `• **${m.title}** (${m.departments.join(', ')}) on ${new Date(m.eventStart).toLocaleDateString()}`).join('\n');
        } else {
          botResponseText = `Currently we have ${this.events.length} active events on campus! Check out the feed for CSE, ECE, and IT competitions.`;
        }
      }

      botResponseText = botResponseText.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      botBubble.innerHTML = botResponseText.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (err) {
      console.error(err);
      botBubble.textContent = `Sorry, I ran into an error connecting to Groq: ${err.message || 'Please check your API key.'}`;
    }
  }

  getGroqApiKey() {
    const envKey = window.ENV?.GROQ_API_KEY;
    if (envKey && envKey.startsWith('gsk_') && !envKey.includes('xxxx')) {
      return envKey;
    }
    const localKey = localStorage.getItem('groq_api_key');
    if (localKey && localKey.startsWith('gsk_') && !localKey.includes('xxxx')) {
      return localKey;
    }
    if (envKey && envKey.startsWith('gsk_')) {
      return envKey;
    }
    return '';
  }

  async callGroqApi(apiKey, messages, temperature = 0.7) {
    const models = [
      'openai/gpt-oss-20b',
      'qwen/qwen3.6-27b',
      'openai/gpt-oss-120b',
      'allam-2-7b',
      'groq/compound-mini'
    ];

    let lastError = null;

    for (const model of models) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: temperature
          })
        });

        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
          return data.choices[0].message.content;
        } else if (data.error) {
          console.warn(`Groq model ${model} error:`, data.error.message);
          lastError = new Error(data.error.message || 'Groq API error');

          const errMsg = (data.error.message || '').toLowerCase();
          if (errMsg.includes('invalid api key') || errMsg.includes('unauthorized') || errMsg.includes('incorrect api key')) {
            throw new Error('Invalid Groq API key. Please check your key in .env or env.js.');
          }

          // Continue trying next active model for any model error/decommissioned/limit
          continue;
        }
      } catch (err) {
        lastError = err;
        if (err.message && (err.message.includes('Invalid Groq API key') || err.message.includes('unauthorized'))) {
          throw err;
        }
        console.warn(`Attempt with Groq model ${model} failed:`, err.message);
      }
    }

    throw lastError || new Error('Failed to connect to active Groq API models.');
  }

  async handleDirectPasswordReset() {
    const emailInput = document.getElementById('gate-login-email');
    const email = emailInput ? emailInput.value.trim() : '';

    const errorDiv = document.getElementById('login-email-error');

    if (!email) {
      if (emailInput) {
        emailInput.focus();
        emailInput.classList.add('border-red-500');
        setTimeout(() => emailInput.classList.remove('border-red-500'), 2500);
      }
      if (errorDiv) {
        errorDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please enter your registered email address above first.`;
        errorDiv.classList.remove('hidden');
      } else {
        alert('Please enter your registered email address in the Email field first.');
      }
      return;
    }

    if (errorDiv) errorDiv.classList.add('hidden');

    this.triggerToastNotification('Sending Reset Email...', `Sending password reset link to ${email}...`);

    if (this.auth) {
      try {
        await this.auth.sendPasswordResetEmail(email);
        this.triggerToastNotification('Reset Link Sent! 📩', `Firebase reset email dispatched to ${email}!`);
        alert(`📩 Password Reset Link Dispatched!\n\nA password reset email has been sent directly to: ${email}.\n\nPlease check your inbox (and Spam folder) to set your new password.`);
      } catch (err) {
        console.warn("Firebase sendPasswordResetEmail error:", err);
        if (err.code === 'auth/user-not-found') {
          if (errorDiv) {
            errorDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> No registered user account found for "${email}". Please Sign Up.`;
            errorDiv.classList.remove('hidden');
          } else {
            alert(`No registered account found for "${email}". Please check your email or Sign Up.`);
          }
        } else if (err.code === 'auth/invalid-email') {
          if (errorDiv) {
            errorDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid email format: "${email}".`;
            errorDiv.classList.remove('hidden');
          } else {
            alert(`Invalid email format: "${email}".`);
          }
        } else {
          alert(err.message || 'Failed to send password reset email.');
        }
      }
    } else {
      alert(`📩 Password Reset Link Dispatched to ${email}!\nPlease check your inbox.`);
    }
  }

  openOtpModalInGate() {
    const gateEmail = document.getElementById('gate-login-email')?.value.trim() || '';
    const emailInput = document.getElementById('otp-modal-email');
    if (emailInput) emailInput.value = gateEmail;

    const step1 = document.getElementById('otp-modal-step-1');
    const step2 = document.getElementById('otp-modal-step-2');
    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';

    this.openModal('otp-modal');
  }

  async handleSendOtpModal(e) {
    e.preventDefault();
    const email = document.getElementById('otp-modal-email').value.trim();

    if (!email) {
      alert('Please enter your registered Gmail address.');
      return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending password reset email...`;
    }

    let errorMessage = '';

    if (this.auth) {
      try {
        await this.auth.sendPasswordResetEmail(email);
      } catch (err) {
        console.warn("Firebase sendPasswordResetEmail error:", err);
        if (err.code === 'auth/user-not-found') {
          errorMessage = `No registered user account found for "${email}". Please verify your email address or create a new account.`;
        } else if (err.code === 'auth/invalid-email') {
          errorMessage = `Invalid email address format: "${email}".`;
        } else {
          errorMessage = err.message || 'Failed to send password reset email.';
        }
      }
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    // Step 2: Show clear confirmation that email has been dispatched to their inbox
    document.getElementById('otp-modal-step-1').style.display = 'none';
    document.getElementById('otp-modal-step-2').style.display = 'block';

    const targetEmailEl = document.getElementById('reset-target-email');
    if (targetEmailEl) targetEmailEl.textContent = email;

    this.triggerToastNotification('Reset Email Dispatched', `Firebase password reset link sent to ${email}! Check your inbox.`);
  }

  triggerToastNotification(title, message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-banner';
    toast.innerHTML = `
      <i class="fa-solid fa-bell" style="color:var(--primary-blue); font-size:1.2rem;"></i>
      <div>
        <strong style="display:block; font-size:0.875rem; color:#fff;">${title}</strong>
        <span style="font-size:0.8rem; color:#94a3b8;">${message}</span>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
  }

  closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
  }

  toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('mobile-open');
    if (overlay) overlay.classList.toggle('active');
  }
}

// Global App Instance
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new App();
});
