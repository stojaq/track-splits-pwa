// intervals.js

document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Inputs
    const repsInput = document.getElementById('repsInput');
    const repDistInput = document.getElementById('repDistInput');
    const repMin = document.getElementById('repMin');
    const repSec = document.getElementById('repSec');
    const repMs = document.getElementById('repMs');
    const restMin = document.getElementById('restMin');
    const restSec = document.getElementById('restSec');
    const startTimeInput = document.getElementById('startTime');
    const clearTimeBtn = document.getElementById('clearTimeBtn');
    
    // Buttons & Sections
    const calculateBtn = document.getElementById('calculateBtn');
    const errorMsg = document.getElementById('errorMsg');
    const resultsSection = document.getElementById('resultsSection');
    const copyBtn = document.getElementById('copyBtn');
    const intervalsTableBody = document.getElementById('intervalsTableBody');

    

    clearTimeBtn.addEventListener('click', () => {
        startTimeInput.value = '';
    });

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

    const formatMsToRelative = (totalMs) => {
        const totalSec = Math.floor(totalMs / 1000);
        const sec = totalSec % 60;
        const totalMin = Math.floor(totalSec / 60);
        const min = totalMin % 60;
        const hr = Math.floor(totalMin / 60);

        const pad = (num) => num.toString().padStart(2, '0');
        
        if (hr > 0) {
            return `${hr}:${pad(min)}:${pad(sec)}`;
        } else {
            return `${pad(min)}:${pad(sec)}`;
        }
    };

    const formatMsToAbsolute = (baseDate, totalMs) => {
        const newDate = new Date(baseDate.getTime() + totalMs);
        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(newDate.getHours())}:${pad(newDate.getMinutes())}:${pad(newDate.getSeconds())}`;
    };

    // === Calculation Logic ===
    const calculateIntervals = () => {
        hideError();
        
        const reps = parseInt(repsInput.value);
        const repDist = parseInt(repDistInput.value);
        
        if (!reps || reps <= 0 || !repDist || repDist <= 0) {
            showError('Inserisci un numero di ripetute e una distanza validi.');
            return;
        }

        const rMin = parseInt(repMin.value) || 0;
        const rSec = parseInt(repSec.value) || 0;
        const rMs = parseInt(repMs.value) || 0;
        const repDurationMs = (rMin * 60000) + (rSec * 1000) + (rMs * 100);

        const recMin = parseInt(restMin.value) || 0;
        const recSec = parseInt(restSec.value) || 0;
        const restDurationMs = (recMin * 60000) + (recSec * 1000);

        if (repDurationMs <= 0) {
            showError('Inserisci un tempo target valido per la ripetuta.');
            return;
        }

        let baseDate = null;
        if (startTimeInput.value) {
            const [hours, minutes] = startTimeInput.value.split(':');
            baseDate = new Date();
            baseDate.setHours(parseInt(hours, 10));
            baseDate.setMinutes(parseInt(minutes, 10));
            baseDate.setSeconds(0);
            baseDate.setMilliseconds(0);
        }

        intervalsTableBody.innerHTML = '';
        let currentCumulativeMs = 0;

        for (let i = 1; i <= reps; i++) {
            // --- Corsa ---
            const runStartMs = currentCumulativeMs;
            const runEndMs = currentCumulativeMs + repDurationMs;
            
            const startStr = baseDate ? formatMsToAbsolute(baseDate, runStartMs) : formatMsToRelative(runStartMs);
            const endStr = baseDate ? formatMsToAbsolute(baseDate, runEndMs) : formatMsToRelative(runEndMs);
            const durationStr = formatMsToRelative(repDurationMs) + (rMs > 0 ? `.${rMs}` : '');

            const runTr = document.createElement('tr');
            runTr.classList.add('bg-white', 'dark:bg-dark-card');
            runTr.innerHTML = `
                <td class="px-4 py-3 font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    <span class="inline-block bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 text-xs px-2 py-1 rounded-md">#${i} - ${repDist}m</span>
                </td>
                <td class="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">${startStr}</td>
                <td class="px-4 py-3 text-right font-bold text-primary-600 dark:text-primary-400">${endStr}</td>
                <td class="px-4 py-3 text-right hidden sm:table-cell text-gray-500 dark:text-gray-400 text-xs">${durationStr}</td>
            `;
            intervalsTableBody.appendChild(runTr);

            currentCumulativeMs = runEndMs;

            // --- Recupero ---
            if (i < reps && restDurationMs > 0) {
                const restStartMs = currentCumulativeMs;
                const restEndMs = currentCumulativeMs + restDurationMs;
                
                const recStartStr = baseDate ? formatMsToAbsolute(baseDate, restStartMs) : formatMsToRelative(restStartMs);
                const recEndStr = baseDate ? formatMsToAbsolute(baseDate, restEndMs) : formatMsToRelative(restEndMs);
                const recDurationStr = formatMsToRelative(restDurationMs);

                const recTr = document.createElement('tr');
                recTr.classList.add('bg-gray-50', 'dark:bg-gray-800/50');
                recTr.innerHTML = `
                    <td class="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider pl-6">
                        Recupero
                    </td>
                    <td class="px-4 py-3 text-right text-gray-500 dark:text-gray-400">${recStartStr}</td>
                    <td class="px-4 py-3 text-right text-gray-500 dark:text-gray-400">${recEndStr}</td>
                    <td class="px-4 py-3 text-right hidden sm:table-cell text-gray-400 dark:text-gray-500 text-xs">${recDurationStr}</td>
                `;
                intervalsTableBody.appendChild(recTr);

                currentCumulativeMs = restEndMs;
            }
        }

        // Show Results
        resultsSection.classList.remove('hidden');
        resultsSection.classList.add('flex');
        
        setTimeout(() => {
            resultsSection.style.opacity = '1';
        }, 50);
        
        setTimeout(() => {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    calculateBtn.addEventListener('click', calculateIntervals);

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateIntervals();
        }
    });

    // === Copy functionality ===
    copyBtn.addEventListener('click', () => {
        if (intervalsTableBody.children.length === 0) return;
        
        const reps = repsInput.value;
        const repDist = repDistInput.value;
        let text = `Allenamento: ${reps}x${repDist}m\n\n`;
        text += `Fase\tInizio\tFine\n`;
        
        Array.from(intervalsTableBody.children).forEach(tr => {
            const cells = tr.querySelectorAll('td');
            // Clean up the text (remove newlines and excess spaces from badges)
            const phase = cells[0].textContent.replace(/\s+/g, ' ').trim();
            const start = cells[1].textContent.trim();
            const end = cells[2].textContent.trim();
            text += `${phase}\t${start}\t${end}\n`;
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

    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').then((registration) => {
                console.log('SW registration successful (intervals)');
            }, (err) => {
                console.log('SW registration failed: ', err);
            });
        });
    }
});
