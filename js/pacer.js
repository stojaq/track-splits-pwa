// pacer.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const lapDistanceInput = document.getElementById('lapDistance');
    const targetPaceMinInput = document.getElementById('targetPaceMin');
    const targetPaceSecInput = document.getElementById('targetPaceSec');
    const calculatedLapTimeEl = document.getElementById('calculatedLapTime');
    const settingsCard = document.getElementById('settingsCard');
    
    const mainTimeEl = document.getElementById('mainTime');
    const currentLapInfo = document.getElementById('currentLapInfo');
    const currentLapTimeEl = document.getElementById('currentLapTime');
    const currentDeltaEl = document.getElementById('currentDelta');
    
    const btnStartStop = document.getElementById('btnStartStop');
    const btnStartStopText = document.getElementById('btnStartStopText');
    const btnLapReset = document.getElementById('btnLapReset');
    const btnLapResetText = document.getElementById('btnLapResetText');
    
    const lapsTableBody = document.getElementById('lapsTableBody');
    const emptyTablePlaceholder = document.getElementById('emptyTablePlaceholder');

    // --- State ---
    let isRunning = false;
    let startTime = 0;
    let pauseTime = 0; // Se vogliamo implementare la pausa, per ora teniamo traccia del delta
    let totalElapsedMs = 0;
    let lastLapCumulativeMs = 0;
    let lapCount = 0;
    let animationFrameId = null;
    
    let targetLapTimeMs = 0;

    // --- Helpers ---
    // Formatta ms in MM:SS.d
    function formatTime(ms) {
        if (ms < 0) ms = 0;
        const totalDeciSeconds = Math.floor(ms / 100);
        const deciseconds = totalDeciSeconds % 10;
        const totalSeconds = Math.floor(totalDeciSeconds / 10);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60);
        
        const padM = minutes.toString().padStart(2, '0');
        const padS = seconds.toString().padStart(2, '0');
        return `${padM}:${padS}.${deciseconds}`;
    }

    // Formatta Delta in +X.Xs o -X.Xs
    function formatDelta(deltaMs) {
        const sign = deltaMs > 0 ? '+' : '-';
        const absMs = Math.abs(deltaMs);
        const totalDeci = Math.floor(absMs / 100);
        const deci = totalDeci % 10;
        const sec = Math.floor(totalDeci / 10);
        
        // Se il delta è superiore a un minuto, mostriamo i minuti
        if (sec >= 60) {
            const m = Math.floor(sec / 60);
            const s = sec % 60;
            return `${sign}${m}:${s.toString().padStart(2, '0')}.${deci}`;
        }
        return `${sign}${sec}.${deci}s`;
    }

    // Calcola il tempo target per giro
    function updateTargetLapTime() {
        const distance = parseFloat(lapDistanceInput.value);
        const min = parseInt(targetPaceMinInput.value) || 0;
        const sec = parseInt(targetPaceSecInput.value) || 0;
        const paceSeconds = min * 60 + sec;
        
        if (isNaN(distance) || distance <= 0 || paceSeconds <= 0) {
            calculatedLapTimeEl.innerText = '--:--';
            targetLapTimeMs = 0;
            return;
        }
        
        // Calcolo: (Pace_in_sec / 1000) * distance
        const lapSeconds = (paceSeconds / 1000) * distance;
        targetLapTimeMs = Math.round(lapSeconds * 1000);
        
        calculatedLapTimeEl.innerText = formatTime(targetLapTimeMs).slice(0, -2); // Mostra senza decimi se preferisci, o lascialo
        calculatedLapTimeEl.innerText = formatTime(targetLapTimeMs);
    }

    // --- Timer Engine ---
    function updateDisplay() {
        const now = Date.now();
        totalElapsedMs = now - startTime;
        const currentLapElapsedMs = totalElapsedMs - lastLapCumulativeMs;
        
        mainTimeEl.innerText = formatTime(totalElapsedMs);
        currentLapTimeEl.innerText = formatTime(currentLapElapsedMs);
        
        // Delta live (Proiezione del giro attuale in base al target)
        // Se sta correndo, il target cumulativo per il PROSSIMO giro è:
        const nextLapTarget = targetLapTimeMs * (lapCount + 1);
        const currentProjectionDelta = totalElapsedMs - (targetLapTimeMs * lapCount) - currentLapElapsedMs; 
        // In realtà live delta è difficile da stimare a meno che non proietti il passo attuale.
        // Facciamo il delta rispetto al target del singolo giro:
        const liveDelta = currentLapElapsedMs - targetLapTimeMs;
        
        if (liveDelta > 0) {
            currentDeltaEl.innerText = `+${Math.floor(liveDelta/1000)}s`;
            currentDeltaEl.className = 'text-xl font-mono font-bold text-red-500';
            mainTimeEl.classList.add('text-red-500');
            mainTimeEl.classList.remove('text-primary-500', 'text-gray-900', 'dark:text-white');
        } else {
            currentDeltaEl.innerText = `${Math.floor(liveDelta/1000)}s`;
            currentDeltaEl.className = 'text-xl font-mono font-bold text-primary-500';
            mainTimeEl.classList.remove('text-red-500');
            mainTimeEl.classList.add('text-gray-900', 'dark:text-white');
        }

        animationFrameId = requestAnimationFrame(updateDisplay);
    }

    function startTimer() {
        if (targetLapTimeMs === 0) updateTargetLapTime();
        
        if (targetLapTimeMs === 0) {
            alert('Inserisci la distanza del Lap e il passo target prima di iniziare.');
            return;
        }
        
        startTime = Date.now() - totalElapsedMs;
        isRunning = true;
        
        // Aggiorna UI
        btnStartStop.classList.remove('bg-primary-500', 'hover:bg-primary-600', 'shadow-primary-500/30');
        btnStartStop.classList.add('bg-red-500', 'hover:bg-red-600', 'shadow-red-500/30');
        btnStartStopText.innerText = 'STOP';
        
        btnLapResetText.innerText = 'LAP';
        
        currentLapInfo.classList.remove('opacity-0');
        settingsCard.classList.add('opacity-50', 'pointer-events-none');
        
        if (lapCount === 0 && emptyTablePlaceholder) {
            emptyTablePlaceholder.remove();
        }
        
        animationFrameId = requestAnimationFrame(updateDisplay);
    }

    function stopTimer() {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        
        btnStartStop.classList.add('bg-primary-500', 'hover:bg-primary-600', 'shadow-primary-500/30');
        btnStartStop.classList.remove('bg-red-500', 'hover:bg-red-600', 'shadow-red-500/30');
        btnStartStopText.innerText = 'START';
        
        btnLapResetText.innerText = 'RESET';
        settingsCard.classList.remove('opacity-50', 'pointer-events-none');
        mainTimeEl.classList.remove('text-red-500', 'text-primary-500');
        mainTimeEl.classList.add('text-gray-900', 'dark:text-white');
    }

    function recordLap() {
        if (!isRunning) return; // Se è in stop, il bottone fa Reset (gestito nel listener)
        
        lapCount++;
        const currentLapMs = totalElapsedMs - lastLapCumulativeMs;
        const targetCumulativeMs = targetLapTimeMs * lapCount;
        const deltaMs = totalElapsedMs - targetCumulativeMs;
        
        // Colore Delta
        const isFast = deltaMs < 0;
        const deltaColorClass = isFast ? 'text-emerald-500' : 'text-red-500';
        const bgRowClass = isFast ? 'bg-emerald-50 dark:bg-emerald-900/10' : 'bg-red-50 dark:bg-red-900/10';
        
        // Aggiungi riga
        const tr = document.createElement('tr');
        tr.className = `border-b border-gray-100 dark:border-dark-border ${bgRowClass}`;
        tr.innerHTML = `
            <td class="px-4 py-3 font-semibold text-gray-900 dark:text-white">${lapCount}</td>
            <td class="px-4 py-3 font-mono">${formatTime(currentLapMs)}</td>
            <td class="px-4 py-3 font-mono text-gray-500">${formatTime(totalElapsedMs)}</td>
            <td class="px-4 py-3 font-mono font-bold text-right ${deltaColorClass}">${formatDelta(deltaMs)}</td>
        `;
        
        lapsTableBody.prepend(tr); // Inserisci in cima
        
        lastLapCumulativeMs = totalElapsedMs;
    }

    function resetTimer() {
        totalElapsedMs = 0;
        lastLapCumulativeMs = 0;
        lapCount = 0;
        
        mainTimeEl.innerText = '00:00.0';
        currentLapTimeEl.innerText = '00:00.0';
        currentDeltaEl.innerText = '--';
        currentDeltaEl.className = 'text-xl font-mono font-bold text-gray-400';
        
        currentLapInfo.classList.add('opacity-0');
        lapsTableBody.innerHTML = `
            <tr id="emptyTablePlaceholder">
                <td colspan="4" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    Premi START per iniziare l'allenamento
                </td>
            </tr>
        `;
    }

    // --- Event Listeners ---
    lapDistanceInput.addEventListener('input', updateTargetLapTime);
    targetPaceMinInput.addEventListener('input', updateTargetLapTime);
    targetPaceSecInput.addEventListener('input', updateTargetLapTime);

    btnStartStop.addEventListener('click', () => {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    btnLapReset.addEventListener('click', () => {
        if (isRunning) {
            recordLap();
        } else {
            resetTimer();
        }
    });

    // Inizializza
    updateTargetLapTime();
});
