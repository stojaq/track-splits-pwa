// scores.js

document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const genderSelect = document.getElementById('genderSelect');
    const categorySelect = document.getElementById('categorySelect');
    const eventSelect = document.getElementById('eventSelect');
    
    const inputTrack = document.getElementById('inputTrack');
    const inputField = document.getElementById('inputField');
    const fieldUnit = document.getElementById('fieldUnit');
    
    const perfMin = document.getElementById('perfMin');
    const perfSec = document.getElementById('perfSec');
    const perfCents = document.getElementById('perfCents');
    const perfDist = document.getElementById('perfDist');
    
    const calculateBtn = document.getElementById('calculateBtn');
    const resultBox = document.getElementById('resultBox');
    const scoreValue = document.getElementById('scoreValue');
    const scoreEvent = document.getElementById('scoreEvent');

    

    // === Dynamic Select Population ===
    const updateCategories = () => {
        const gender = genderSelect.value;
        const categories = getCategories(gender);
        
        categorySelect.innerHTML = '';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });
        
        updateEvents();
    };

    const updateEvents = () => {
        const gender = genderSelect.value;
        const category = categorySelect.value;
        const events = getEvents(gender, category);
        
        eventSelect.innerHTML = '';
        events.forEach(ev => {
            const option = document.createElement('option');
            option.value = ev;
            option.textContent = ev;
            eventSelect.appendChild(option);
        });
        
        updateInputType();
    };

    const updateInputType = () => {
        const gender = genderSelect.value;
        const category = categorySelect.value;
        const eventName = eventSelect.value;
        const evData = getEventData(gender, category, eventName);
        
        if (!evData) return;

        if (evData.type === 'track' || evData.type === 'quadratic_track') {
            inputTrack.classList.remove('hidden');
            inputField.classList.add('hidden');
        } else {
            inputTrack.classList.add('hidden');
            inputField.classList.remove('hidden');
            fieldUnit.textContent = evData.unit;
        }
    };

    // Event Listeners for Selects
    genderSelect.addEventListener('change', updateCategories);
    categorySelect.addEventListener('change', updateEvents);
    eventSelect.addEventListener('change', updateInputType);

    // Initial Population
    updateCategories();

    // === Score Calculation ===
    const calculateScore = () => {
        const gender = genderSelect.value;
        const category = categorySelect.value;
        const eventName = eventSelect.value;
        const evData = getEventData(gender, category, eventName);
        
        if (!evData) return;

        let points = 0;

        const getTotalSeconds = () => {
            const min = parseInt(perfMin.value) || 0;
            const sec = parseInt(perfSec.value) || 0;
            const cents = parseInt(perfCents.value) || 0;
            return (min * 60) + sec + (cents / 100);
        };

        if (evData.type === 'track') {
            const totalSec = getTotalSeconds();
            if (totalSec <= 0) return;
            
            if (totalSec < evData.B) {
                points = Math.floor(evData.A * Math.pow((evData.B - totalSec), evData.C));
            } else {
                points = 0; 
            }
        } else if (evData.type === 'quadratic_track') {
            const totalSec = Math.max(0.1, getTotalSeconds()); // Prevent <= 0
            if (totalSec <= 0) return;
            
            // Formula quadratica: P = a*T^2 + b*T + c
            const calc = (evData.A * Math.pow(totalSec, 2)) + (evData.B * totalSec) + evData.C;
            points = Math.max(0, Math.floor(calc));
        } else if (evData.type === 'quadratic_field') {
            const dist = parseFloat(perfDist.value) || 0;
            if (dist <= 0) {
                alert('Inserisci una prestazione valida.');
                return;
            }
            
            let performanceValue = dist;
            if (evData.unit === 'cm') {
                performanceValue = dist * 100;
            }
            
            const calc = (evData.A * Math.pow(performanceValue, 2)) + (evData.B * performanceValue) + evData.C;
            points = Math.max(0, Math.floor(calc));
        } else {
            const dist = parseFloat(perfDist.value) || 0;
            
            if (dist <= 0) {
                alert('Inserisci una prestazione valida.');
                return;
            }
            
            // Handle unit conversion if necessary (some formulas use cm instead of m)
            let performanceValue = dist;
            if (evData.unit === 'cm') {
                performanceValue = dist * 100;
            }
            
            if (performanceValue > evData.B) {
                // Formula: A * (D - B)^C
                points = Math.floor(evData.A * Math.pow((performanceValue - evData.B), evData.C));
            } else {
                points = 0;
            }
        }

        // UI Improvements: Color Coding
        resultBox.classList.remove('bg-slate-100', 'dark:bg-slate-700', 'bg-cyan-100', 'dark:bg-cyan-900/40', 'bg-amber-100', 'dark:bg-amber-900/40', 'bg-purple-100', 'dark:bg-purple-900/40');
        scoreValue.classList.remove('text-blue-600', 'dark:text-blue-400', 'text-cyan-600', 'dark:text-cyan-400', 'text-amber-600', 'dark:text-amber-400', 'text-purple-600', 'dark:text-purple-400');
        
        if (points >= 1100) {
            // Diamante
            resultBox.classList.add('bg-purple-100', 'dark:bg-purple-900/40');
            scoreValue.classList.add('text-purple-600', 'dark:text-purple-400');
        } else if (points >= 900) {
            // Oro
            resultBox.classList.add('bg-amber-100', 'dark:bg-amber-900/40');
            scoreValue.classList.add('text-amber-600', 'dark:text-amber-400');
        } else if (points >= 600) {
            // Argento
            resultBox.classList.add('bg-cyan-100', 'dark:bg-cyan-900/40');
            scoreValue.classList.add('text-cyan-600', 'dark:text-cyan-400');
        } else {
            // Base
            resultBox.classList.add('bg-slate-100', 'dark:bg-slate-700');
            scoreValue.classList.add('text-blue-600', 'dark:text-blue-400');
        }

        // Show Results
        scoreEvent.textContent = `${gender} - ${category} - ${eventName}`;
        
        resultBox.classList.remove('hidden');
        setTimeout(() => {
            resultBox.classList.remove('opacity-0');
        }, 50);
        
        // Animated Counter
        const animateValue = (obj, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const easeProgress = progress * (2 - progress); // easeOut
                const current = Math.floor(easeProgress * (end - start) + start);
                obj.textContent = current.toLocaleString('it-IT');
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    obj.textContent = end.toLocaleString('it-IT');
                }
            };
            window.requestAnimationFrame(step);
        };
        
        // Start animation from 0 to points in 1 second
        animateValue(scoreValue, 0, points, 1000);
        
        setTimeout(() => {
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    calculateBtn.addEventListener('click', calculateScore);

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateScore();
        }
    });

    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration failed: ', err));
        });
    }
});
