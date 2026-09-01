// app.js

function injectLayout() {
    // Determine base path from a global variable set in HTML
    const basePath = window.APP_BASE_PATH || '.';
    
    const layoutHTML = `
    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-slate-700/50">
        <div class="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <button id="menuBtn" class="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-primary-600 dark:text-primary-400" aria-label="Open Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div class="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                    <img src="${basePath}/icon-192.png" alt="Logo Track Splits" class="h-8 w-8 rounded-lg shadow-sm">
                    <h1 class="font-display font-bold text-xl tracking-tight hidden sm:block">Track Splits</h1>
                </div>
            </div>
            
            <button id="themeToggle" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle Dark Mode">
                <svg id="icon-sun" class="w-6 h-6 hidden dark:block text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                <svg id="icon-moon" class="w-6 h-6 block dark:hidden text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            </button>
        </div>
    </header>

    <!-- Sidebar Overlay -->
    <div id="sidebarOverlay" class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-[60] hidden opacity-0 transition-opacity duration-300"></div>

    <!-- Sidebar Menu -->
    <aside id="sidebarMenu" class="fixed top-0 left-0 h-full w-72 bg-white dark:bg-dark-bg border-r border-gray-100 dark:border-dark-border z-[70] transform -translate-x-full transition-transform duration-300 shadow-2xl flex flex-col">
        <div class="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-dark-border">
            <h2 class="font-display font-bold text-lg text-primary-600 dark:text-primary-400">Strumenti</h2>
            <button id="closeMenuBtn" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="p-4 flex-grow overflow-y-auto">
            <nav class="flex flex-col gap-2">
                <a href="${basePath}/index.html" class="flex items-center gap-3 px-4 py-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Gara Lineare
                </a>
                <a href="${basePath}/pages/intervals.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Ripetute
                </a>
                <a href="${basePath}/pages/scores.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    Punteggi FIDAL
                </a>
                <a href="${basePath}/pages/predictor.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 5 4 4"/><path d="M13 14l6-6a2 2 0 0 0-3-3l-6 6"/><path d="M9.5 9.5 4 15l5 5 5.5-5.5"/><path d="M9.5 9.5 9 14l-4.5 4.5"/></svg>
                    Predittore Gara
                </a>
                <a href="${basePath}/pages/training_zones.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    Zone Allenamento
                </a>
                <a href="${basePath}/pages/stretching.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4 8 16"/><path d="m15 15 5 5"/><path d="m4 4 5 5"/></svg>
                    Stretching & Mobilità
                </a>
                <a href="${basePath}/pages/pacer.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
                    Pacer Intelligente
                </a>
                <a href="${basePath}/pages/coach_pacer.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Coach Pacer
                </a>

                <a href="${basePath}/pages/athletes.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${window.location.pathname.includes('athletes') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span class="font-medium">I miei Atleti</span>
                </a>
                <a href="${basePath}/pages/diary.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-2 ${window.location.pathname.includes('diary') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    <span class="font-medium">Diario Allenamenti</span>
                </a>
                <a href="${basePath}/pages/motivation.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-2 ${window.location.pathname.includes('motivation') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    <span class="font-medium">Motivazione</span>
                </a>

                <div class="my-2 border-t border-gray-100 dark:border-dark-border"></div>
                <a href="${basePath}/pages/news.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
                    News & Eventi
                </a>
                <a href="${basePath}/pages/gallery.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    Gallery Fotografica
                </a>

                <div class="my-2 border-t border-gray-100 dark:border-dark-border"></div>
                <a href="${basePath}/pages/info.html" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${window.location.pathname.includes('info') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    <span class="font-medium">Informazioni</span>
                </a>
            </nav>
        </div>
    </aside>
    `;
    
    // Inject at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', layoutHTML);
    
    // Highlight the active link based on current URL
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('#sidebarMenu nav a');
    navLinks.forEach(link => {
        // Simple logic: if link href is found in currentPath, set active style
        if (link.getAttribute('href').replace('./', '').replace('../', '') !== '' && 
            currentPath.includes(link.getAttribute('href').split('/').pop())) {
            
            // Remove active classes from all links
            navLinks.forEach(l => {
                l.classList.remove('bg-primary-50', 'dark:bg-primary-900/20', 'text-primary-600', 'dark:text-primary-400');
                l.classList.add('hover:bg-gray-50', 'dark:hover:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
            });
            
            // Add active class to current
            link.classList.remove('hover:bg-gray-50', 'dark:hover:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
            link.classList.add('bg-primary-50', 'dark:bg-primary-900/20', 'text-primary-600', 'dark:text-primary-400');
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // Inject Layout First
    injectLayout();
    
    // === DOM Elements ===
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Tabs
    const tabPace = document.getElementById('tab-pace');
    const tabTime = document.getElementById('tab-time');
    const paceContainer = document.getElementById('pace-container');
    const timeContainer = document.getElementById('time-container');
    
    // Inputs
    const distanceInput = document.getElementById('distanceInput');
    const paceMin = document.getElementById('paceMin');
    const paceSec = document.getElementById('paceSec');
    const timeHr = document.getElementById('timeHr');
    const timeMin = document.getElementById('timeMin');
    const timeSec = document.getElementById('timeSec');
    const timeMs = document.getElementById('timeMs');
    const splitDistanceSelect = document.getElementById('splitDistance');
    
    // Buttons & Sections
    const calculateBtn = document.getElementById('calculateBtn');
    const errorMsg = document.getElementById('errorMsg');
    const resultsSection = document.getElementById('resultsSection');
    const copyBtn = document.getElementById('copyBtn');
    
    // Results DOM
    const summaryDistance = document.getElementById('summaryDistance');
    const resTotalTime = document.getElementById('resTotalTime');
    const resPace = document.getElementById('resPace');
    const res400m = document.getElementById('res400m');
    const resSpeed = document.getElementById('resSpeed');
    const splitsTableBody = document.getElementById('splitsTableBody');

    let currentMode = 'pace'; // 'pace' or 'time'

    // === Theme Management ===
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // === Sidebar Menu Management ===
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarMenu = document.getElementById('sidebarMenu');

    const openMenu = () => {
        sidebarOverlay.classList.remove('hidden');
        // Small delay to allow display:block to apply before changing opacity
        setTimeout(() => {
            sidebarOverlay.classList.remove('opacity-0');
            sidebarMenu.classList.remove('-translate-x-full');
        }, 10);
    };

    const closeMenu = () => {
        sidebarOverlay.classList.add('opacity-0');
        sidebarMenu.classList.add('-translate-x-full');
        setTimeout(() => {
            sidebarOverlay.classList.add('hidden');
        }, 300); // match transition duration
    };

    if (menuBtn && closeMenuBtn && sidebarOverlay && sidebarMenu) {
        menuBtn.addEventListener('click', openMenu);
        closeMenuBtn.addEventListener('click', closeMenu);
        sidebarOverlay.addEventListener('click', closeMenu);
    }

    // === Tab Switching ===
    if (tabPace && tabTime) {
        tabPace.addEventListener('click', () => {
            currentMode = 'pace';
            tabPace.classList.add('tab-active');
            tabTime.classList.remove('tab-active');
            paceContainer.classList.remove('hidden');
            timeContainer.classList.add('hidden');
        });

        tabTime.addEventListener('click', () => {
            currentMode = 'time';
            tabTime.classList.add('tab-active');
            tabPace.classList.remove('tab-active');
            timeContainer.classList.remove('hidden');
            paceContainer.classList.add('hidden');
        });
    }

    // === Helper Functions ===
    const showError = (msg) => {
        errorMsg.querySelector('p').textContent = msg;
        errorMsg.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        resultsSection.classList.remove('flex');
        resultsSection.style.opacity = '0';
    };

    const hideError = () => {
        errorMsg.classList.add('hidden');
    };

    const formatTime = (totalMs) => {
        const ms = Math.floor((totalMs % 1000) / 100); // Decimals (0-9)
        const totalSec = Math.floor(totalMs / 1000);
        const sec = totalSec % 60;
        const totalMin = Math.floor(totalSec / 60);
        const min = totalMin % 60;
        const hr = Math.floor(totalMin / 60);

        const pad = (num) => num.toString().padStart(2, '0');
        
        let formatted = '';
        if (hr > 0) {
            formatted += `${hr}:${pad(min)}:${pad(sec)}`;
        } else {
            formatted += `${min}:${pad(sec)}`;
        }
        
        if (ms > 0) {
            formatted += `.${ms}`;
        }
        
        return formatted;
    };

    const getPaceString = (msPerKm) => {
        const totalSec = Math.floor(msPerKm / 1000);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        return `${min}:${sec.toString().padStart(2, '0')}/km`;
    };

    // === Calculation Logic ===
    const calculateSplits = () => {
        hideError();
        const distance = parseFloat(distanceInput.value);
        if (!distance || distance <= 0) {
            showError('Inserisci una distanza valida in metri.');
            return;
        }

        const splitInterval = parseInt(splitDistanceSelect.value);
        let totalTimeMs = 0;

        if (currentMode === 'pace') {
            const pMin = parseInt(paceMin.value) || 0;
            const pSec = parseInt(paceSec.value) || 0;
            
            if (pMin === 0 && pSec === 0) {
                showError('Inserisci un passo valido.');
                return;
            }
            
            const paceMsPerKm = (pMin * 60 * 1000) + (pSec * 1000);
            const paceMsPerMeter = paceMsPerKm / 1000;
            totalTimeMs = distance * paceMsPerMeter;
            
        } else {
            const h = parseInt(timeHr.value) || 0;
            const m = parseInt(timeMin.value) || 0;
            const s = parseInt(timeSec.value) || 0;
            const ms = parseInt(timeMs.value) || 0;
            
            totalTimeMs = (h * 3600000) + (m * 60000) + (s * 1000) + (ms * 100);
            
            if (totalTimeMs <= 0) {
                showError('Inserisci un tempo finale valido.');
                return;
            }
        }

        // Calculate paces and speeds
        const timePerMeterMs = totalTimeMs / distance;
        const msPerKm = timePerMeterMs * 1000;
        const time400mMs = timePerMeterMs * 400;
        const speedKmh = (distance / 1000) / (totalTimeMs / 3600000);

        // Update Summary UI
        summaryDistance.textContent = distance;
        resTotalTime.textContent = formatTime(totalTimeMs);
        resPace.textContent = getPaceString(msPerKm);
        res400m.textContent = formatTime(time400mMs);
        resSpeed.textContent = `${speedKmh.toFixed(2)} km/h`;

        // Generate Splits Table
        splitsTableBody.innerHTML = '';
        let currentDistance = 0;
        
        while (currentDistance < distance) {
            let nextDistance = currentDistance + splitInterval;
            let isLastSplit = false;
            
            if (nextDistance >= distance) {
                nextDistance = distance;
                isLastSplit = true;
            }
            
            const splitLength = nextDistance - currentDistance;
            const splitTimeMs = timePerMeterMs * splitLength;
            const cumulativeTimeMs = timePerMeterMs * nextDistance;
            
            // Calculate track laps (400m)
            const laps = Math.floor(nextDistance / 400);
            const remainder = nextDistance % 400;
            let lapStr = '-';
            
            if (nextDistance >= 400) {
                if (remainder === 0) {
                    lapStr = `${laps} Giri`;
                } else {
                    lapStr = `Giro ${laps} + ${remainder}m`;
                }
            } else if (nextDistance > 0 && nextDistance < 400) {
                 lapStr = `${nextDistance}m`;
            }

            const tr = document.createElement('tr');
            // Highlight every 400m
            if (nextDistance % 400 === 0) {
                tr.classList.add('bg-primary-50/50', 'dark:bg-primary-900/10');
            }
            
            tr.innerHTML = `
                <td class="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">${nextDistance}m</td>
                <td class="px-4 py-3">${formatTime(splitTimeMs)}</td>
                <td class="px-4 py-3 font-medium text-primary-600 dark:text-primary-400">${formatTime(cumulativeTimeMs)}</td>
                <td class="px-4 py-3 hidden sm:table-cell text-gray-500 dark:text-gray-400 text-xs">${lapStr}</td>
            `;
            
            splitsTableBody.appendChild(tr);
            currentDistance = nextDistance;
        }

        // Show Results
        resultsSection.classList.remove('hidden');
        resultsSection.classList.add('flex');
        
        // Small delay for transition
        setTimeout(() => {
            resultsSection.style.opacity = '1';
        }, 50);
        
        // Scroll to results
        setTimeout(() => {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateSplits);
    }

    // Enter key support
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (calculateBtn) {
                calculateSplits();
            }
        }
    });

    // === Copy functionality ===
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            if (splitsTableBody.children.length === 0) return;
            
            let text = `Intertempi per ${distanceInput.value}m\n`;
            text += `Tempo Finale: ${resTotalTime.textContent} | Passo: ${resPace.textContent}\n\n`;
            text += `Distanza\tFrazione\tPassaggio\n`;
            
            Array.from(splitsTableBody.children).forEach(tr => {
                const cells = tr.querySelectorAll('td');
                text += `${cells[0].textContent}\t${cells[1].textContent}\t${cells[2].textContent}\n`;
            });
            
            navigator.clipboard.writeText(text).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-green-500">Copiato!</span>
                `;
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Impossibile copiare il testo.');
            });
        });
    }

    // === PWA Service Worker Registration ===
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, (err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    // === PWA Install Logic ===
    let deferredPrompt;
    const installCard = document.getElementById('installAppCard');
    const installBtn = document.getElementById('installAppBtn');

    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    };

    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    if (isIos() && !isInStandaloneMode() && installCard) {
        installCard.classList.remove('hidden');
        installCard.classList.add('flex');
        
        if (installBtn) {
            installBtn.innerText = "Come installare";
            installBtn.addEventListener('click', () => {
                alert("Per installare l'app su iPhone/iPad:\n1. Tocca l'icona 'Condividi' (quadrato con freccia) nella barra di Safari.\n2. Scorri e seleziona 'Aggiungi a Schermata Home'.");
            });
        }
    } else {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            if (installCard) {
                installCard.classList.remove('hidden');
                installCard.classList.add('flex');
            }
        });

        if (installBtn) {
            installBtn.addEventListener('click', async () => {
                if (!deferredPrompt) return;
                
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User choice: ${outcome}`);
                
                deferredPrompt = null;
                installCard.classList.add('hidden');
                installCard.classList.remove('flex');
            });
        }
    }
});
