// intervals.js

document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Inputs
    const setsInput = document.getElementById('setsInput');
    const repsInput = document.getElementById('repsInput');
    const repDistInput = document.getElementById('repDistInput');
    const repMin = document.getElementById('repMin');
    const repSec = document.getElementById('repSec');
    const repMs = document.getElementById('repMs');
    const restMin = document.getElementById('restMin');
    const restSec = document.getElementById('restSec');
    const restDistInput = document.getElementById('restDistInput');
    const macroRestMin = document.getElementById('macroRestMin');
    const macroRestSec = document.getElementById('macroRestSec');
    const macroRestDistInput = document.getElementById('macroRestDistInput');
    const macroRestPanel = document.getElementById('macroRestPanel');
    const startTimeInput = document.getElementById('startTime');
    const clearTimeBtn = document.getElementById('clearTimeBtn');
    
    // Buttons & Sections
    const calculateBtn = document.getElementById('calculateBtn');
    const errorMsg = document.getElementById('errorMsg');
    const resultsSection = document.getElementById('resultsSection');
    const copyBtn = document.getElementById('copyBtn');
    const shareBtn = document.getElementById('shareBtn');
    const intervalsTableBody = document.getElementById('intervalsTableBody');

    // Summary Elements
    const resTotalTime = document.getElementById('resTotalTime');
    const resTotalVolume = document.getElementById('resTotalVolume');
    const resPace = document.getElementById('resPace');
    const resRestPace = document.getElementById('resRestPace');
    const resTotalPace = document.getElementById('resTotalPace');

    setsInput.addEventListener('input', () => {
        if (parseInt(setsInput.value) > 1) {
            macroRestPanel.classList.remove('hidden');
            macroRestPanel.classList.add('grid');
        } else {
            macroRestPanel.classList.add('hidden');
            macroRestPanel.classList.remove('grid');
        }
    });

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

    const getPaceString = (ms, distance) => {
        if (!distance || distance <= 0 || ms <= 0) return '-';
        const msPerKm = (ms / distance) * 1000;
        const totalSec = Math.floor(msPerKm / 1000);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        return `${min}:${sec.toString().padStart(2, '0')}/km`;
    };

    // === Calculation Logic ===
    const calculateIntervals = () => {
        hideError();
        
        const sets = parseInt(setsInput.value) || 1;
        const reps = parseInt(repsInput.value);
        const repDist = parseInt(repDistInput.value);
        const restDist = parseInt(restDistInput.value) || 0;
        
        if (!reps || reps <= 0 || !repDist || repDist <= 0 || sets <= 0) {
            showError('Inserisci valori validi per le prove.');
            return;
        }

        const rMin = parseInt(repMin.value) || 0;
        const rSec = parseInt(repSec.value) || 0;
        const rMs = parseInt(repMs.value) || 0;
        const repDurationMs = (rMin * 60000) + (rSec * 1000) + (rMs * 100);

        const recMin = parseInt(restMin.value) || 0;
        const recSec = parseInt(restSec.value) || 0;
        const restDurationMs = (recMin * 60000) + (recSec * 1000);

        const macroRecMin = parseInt(macroRestMin.value) || 0;
        const macroRecSec = parseInt(macroRestSec.value) || 0;
        const macroRestDurationMs = (macroRecMin * 60000) + (macroRecSec * 1000);
        const macroRestDist = parseInt(macroRestDistInput.value) || 0;

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
        let totalDistance = 0;

        for (let s = 1; s <= sets; s++) {
            for (let i = 1; i <= reps; i++) {
                // --- Corsa ---
                const runStartMs = currentCumulativeMs;
                const runEndMs = currentCumulativeMs + repDurationMs;
                
                const startStr = baseDate ? formatMsToAbsolute(baseDate, runStartMs) : formatMsToRelative(runStartMs);
                const endStr = baseDate ? formatMsToAbsolute(baseDate, runEndMs) : formatMsToRelative(runEndMs);
                const durationStr = formatMsToRelative(repDurationMs) + (rMs > 0 ? `.${rMs}` : '');

                const label = sets > 1 ? `S${s} - #${i} - ${repDist}m` : `#${i} - ${repDist}m`;

                const runTr = document.createElement('tr');
                runTr.classList.add('bg-white', 'dark:bg-dark-card');
                runTr.innerHTML = `
                    <td class="px-4 py-3 font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                        <span class="inline-block bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 text-xs px-2 py-1 rounded-md">${label}</span>
                    </td>
                    <td class="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">${startStr}</td>
                    <td class="px-4 py-3 text-right font-bold text-primary-600 dark:text-primary-400">${endStr}</td>
                    <td class="px-4 py-3 text-right hidden sm:table-cell text-gray-500 dark:text-gray-400 text-xs">${durationStr}</td>
                `;
                intervalsTableBody.appendChild(runTr);

                currentCumulativeMs = runEndMs;
                totalDistance += repDist;

                // --- Recupero (tra le prove) ---
                if (i < reps && restDurationMs > 0) {
                    const restStartMs = currentCumulativeMs;
                    const restEndMs = currentCumulativeMs + restDurationMs;
                    
                    const recStartStr = baseDate ? formatMsToAbsolute(baseDate, restStartMs) : formatMsToRelative(restStartMs);
                    const recEndStr = baseDate ? formatMsToAbsolute(baseDate, restEndMs) : formatMsToRelative(restEndMs);
                    const recDurationStr = formatMsToRelative(restDurationMs);

                    let restLabel = 'Recupero';
                    if (restDist > 0) {
                        restLabel += ` (${restDist}m)`;
                    }

                    const recTr = document.createElement('tr');
                    recTr.classList.add('bg-gray-50', 'dark:bg-gray-800/50');
                    recTr.innerHTML = `
                        <td class="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider pl-6">
                            ${restLabel}
                        </td>
                        <td class="px-4 py-3 text-right text-gray-500 dark:text-gray-400">${recStartStr}</td>
                        <td class="px-4 py-3 text-right text-gray-500 dark:text-gray-400">${recEndStr}</td>
                        <td class="px-4 py-3 text-right hidden sm:table-cell text-gray-400 dark:text-gray-500 text-xs">${recDurationStr}</td>
                    `;
                    intervalsTableBody.appendChild(recTr);

                    currentCumulativeMs = restEndMs;
                    totalDistance += restDist;
                }
            } // fine ciclo prove

            // --- Macro-Recupero (tra le serie) ---
            if (s < sets && macroRestDurationMs > 0) {
                const mRestStartMs = currentCumulativeMs;
                const mRestEndMs = currentCumulativeMs + macroRestDurationMs;
                
                const mRecStartStr = baseDate ? formatMsToAbsolute(baseDate, mRestStartMs) : formatMsToRelative(mRestStartMs);
                const mRecEndStr = baseDate ? formatMsToAbsolute(baseDate, mRestEndMs) : formatMsToRelative(mRestEndMs);
                const mRecDurationStr = formatMsToRelative(macroRestDurationMs);

                let mRestLabel = 'Recupero Serie';
                if (macroRestDist > 0) {
                    mRestLabel += ` (${macroRestDist}m)`;
                }

                const mRecTr = document.createElement('tr');
                mRecTr.classList.add('bg-primary-50', 'dark:bg-primary-900/10', 'border-t-2', 'border-b-2', 'border-primary-100', 'dark:border-primary-900');
                mRecTr.innerHTML = `
                    <td class="px-4 py-4 font-bold text-primary-700 dark:text-primary-300 text-xs uppercase tracking-wider pl-4">
                        ${mRestLabel}
                    </td>
                    <td class="px-4 py-4 text-right text-primary-700 dark:text-primary-300 font-semibold">${mRecStartStr}</td>
                    <td class="px-4 py-4 text-right text-primary-700 dark:text-primary-300 font-semibold">${mRecEndStr}</td>
                    <td class="px-4 py-4 text-right hidden sm:table-cell text-primary-600 dark:text-primary-400 font-medium text-xs">${mRecDurationStr}</td>
                `;
                intervalsTableBody.appendChild(mRecTr);

                currentCumulativeMs = mRestEndMs;
                totalDistance += macroRestDist;
            }
        } // fine ciclo serie

        // Popola Summary
        resTotalTime.textContent = formatMsToRelative(currentCumulativeMs);
        resTotalVolume.textContent = `${totalDistance.toLocaleString()} m`;
        resPace.textContent = getPaceString(repDurationMs, repDist);
        resRestPace.textContent = (restDist > 0 && restDurationMs > 0) ? getPaceString(restDurationMs, restDist) : '-';
        resTotalPace.textContent = getPaceString(currentCumulativeMs, totalDistance);

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
        
        const sets = parseInt(setsInput.value) || 1;
        const reps = repsInput.value;
        const repDist = repDistInput.value;
        
        const titleStr = sets > 1 ? `${sets}x${reps}x${repDist}m` : `${reps}x${repDist}m`;
        let text = `Allenamento: ${titleStr}\n`;
        text += `Durata: ${resTotalTime.textContent} | Volume: ${resTotalVolume.textContent}\n\n`;
        text += `Fase\tInizio\tFine\n`;
        
        Array.from(intervalsTableBody.children).forEach(tr => {
            const cells = tr.querySelectorAll('td');
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

    // === Share functionality ===
    if (shareBtn && navigator.share) {
        shareBtn.classList.remove('hidden');
        shareBtn.addEventListener('click', async () => {
            if (intervalsTableBody.children.length === 0) return;
            
            const sets = parseInt(setsInput.value) || 1;
            const reps = repsInput.value;
            const repDist = repDistInput.value;
            
            const titleStr = sets > 1 ? `${sets}x${reps}x${repDist}m` : `${reps}x${repDist}m`;
            let text = `🔥 Allenamento: ${titleStr}\n`;
            text += `⏱️ Durata Totale: ${resTotalTime.textContent}\n`;
            text += `📏 Volume Totale: ${resTotalVolume.textContent}\n`;
            text += `👟 Passo Medio: ${resTotalPace.textContent}\n\n`;
            
            Array.from(intervalsTableBody.children).forEach(tr => {
                const cells = tr.querySelectorAll('td');
                const phase = cells[0].textContent.replace(/\s+/g, ' ').trim();
                const start = cells[1].textContent.trim();
                const end = cells[2].textContent.trim();
                text += `• ${phase} => ${start} - ${end}\n`;
            });
            
            text += `\nGenerato con Track Splits 🏃‍♂️`;

            try {
                await navigator.share({
                    title: `Allenamento ${reps}x${repDist}m`,
                    text: text
                });
            } catch (err) {
                console.log('Condivisione annullata o fallita:', err);
            }
        });
    }

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
