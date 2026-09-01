// coach_pacer.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Setup Elements ---
    const setupScreen = document.getElementById('setupScreen');
    const lapDistanceInput = document.getElementById('lapDistance');
    const totalDistanceInput = document.getElementById('totalDistance');
    const athletesList = document.getElementById('athletesList');
    const addAthleteBtn = document.getElementById('addAthleteBtn');
    const startRaceBtn = document.getElementById('startRaceBtn');
    const athleteSetupTemplate = document.getElementById('athleteSetupTemplate');

    // --- Race Elements ---
    const raceScreen = document.getElementById('raceScreen');
    const masterClockEl = document.getElementById('masterClock');
    const stopRaceBtn = document.getElementById('stopRaceBtn');
    const activeAthletesGrid = document.getElementById('activeAthletesGrid');

    // --- Results Elements ---
    const resultsScreen = document.getElementById('resultsScreen');
    const resultsContainer = document.getElementById('resultsContainer');
    const resetRaceBtn = document.getElementById('resetRaceBtn');
    const shareBtn = document.getElementById('shareBtn');

    // --- State ---
    let athletes = [];
    let lapDistance = 400;
    let totalDistance = 0;
    let isRacing = false;
    let raceStartTime = 0;
    let animationFrameId = null;

    // --- Utility: Format Time ---
    const formatTime = (totalMs, showMs = true) => {
        const ms = Math.floor((totalMs % 1000) / 100);
        const totalSec = Math.floor(totalMs / 1000);
        const sec = totalSec % 60;
        const totalMin = Math.floor(totalSec / 60);
        const min = totalMin % 60;
        const hr = Math.floor(totalMin / 60);

        const pad = (num) => num.toString().padStart(2, '0');
        let formatted = hr > 0 ? `${hr}:${pad(min)}:${pad(sec)}` : `${pad(min)}:${pad(sec)}`;
        return showMs ? `${formatted}.${ms}` : formatted;
    };

    const formatDelta = (deltaMs) => {
        const isNegative = deltaMs < 0;
        const absMs = Math.abs(deltaMs);
        const str = formatTime(absMs, true);
        return isNegative ? `-${str}` : `+${str}`;
    };

    const getSplitDistance = (splitIndex) => {
        let dist = (splitIndex + 1) * lapDistance;
        if (totalDistance > 0 && dist > totalDistance) {
            dist = totalDistance;
        }
        return dist;
    };

    // --- SETUP PHASE ---
    const MAX_ATHLETES = 4;

    const addAthleteSetupRow = () => {
        if (athletesList.children.length >= MAX_ATHLETES) {
            alert('Puoi aggiungere massimo 4 atleti per garantire una buona visibilità.');
            return;
        }
        
        const clone = athleteSetupTemplate.content.cloneNode(true);
        const row = clone.querySelector('.athlete-setup-row');
        
        // Setup remove button
        row.querySelector('.remove-athlete-btn').addEventListener('click', () => {
            row.remove();
            checkAddButton();
        });

        athletesList.appendChild(clone);
        checkAddButton();
    };

    const checkAddButton = () => {
        if (athletesList.children.length >= MAX_ATHLETES) {
            addAthleteBtn.classList.add('hidden');
        } else {
            addAthleteBtn.classList.remove('hidden');
        }
    };

    addAthleteBtn.addEventListener('click', addAthleteSetupRow);
    
    // Inizializza con un atleta
    addAthleteSetupRow();

    // --- START RACE ---
    startRaceBtn.addEventListener('click', () => {
        lapDistance = parseFloat(lapDistanceInput.value);
        if (isNaN(lapDistance) || lapDistance <= 0) {
            alert('Inserisci una distanza del lap valida (es. 400).');
            return;
        }
        
        totalDistance = parseFloat(totalDistanceInput.value);
        if (isNaN(totalDistance) || totalDistance <= 0) {
            totalDistance = 0; // Se non inserita, non mettiamo limiti
        }

        // Parse athletes
        athletes = [];
        let hasError = false;
        const rows = athletesList.querySelectorAll('.athlete-setup-row');
        
        if (rows.length === 0) {
            alert('Devi aggiungere almeno un atleta.');
            return;
        }

        rows.forEach((row, index) => {
            const name = row.querySelector('.athlete-name').value.trim() || `Atleta ${index + 1}`;
            const min = parseInt(row.querySelector('.athlete-pace-min').value) || 0;
            const sec = parseInt(row.querySelector('.athlete-pace-sec').value) || 0;
            
            const paceSeconds = min * 60 + sec;
            if (paceSeconds <= 0) {
                alert(`Inserisci un passo valido per ${name}.`);
                hasError = true;
                return;
            }

            const targetLapMs = Math.round((paceSeconds / 1000) * lapDistance * 1000);

            athletes.push({
                id: `athlete_${index}`,
                name: name,
                targetLapMs: targetLapMs,
                splits: [],
                lastSplitTime: 0,
                lastLapDelta: 0
            });
        });

        if (hasError) return;

        // Prepare UI
        setupScreen.classList.add('hidden');
        buildActiveGrid();
        raceScreen.classList.remove('hidden');
        raceScreen.classList.add('flex');

        // Start Clock
        raceStartTime = Date.now();
        isRacing = true;
        animationFrameId = requestAnimationFrame(updateMasterClock);
    });

    // --- RACE PHASE ---
    const buildActiveGrid = () => {
        activeAthletesGrid.innerHTML = '';
        
        // Adjust grid columns based on count
        if (athletes.length >= 3) {
            activeAthletesGrid.classList.add('multi');
        } else {
            activeAthletesGrid.classList.remove('multi');
        }

        athletes.forEach(athlete => {
            const card = document.createElement('div');
            card.className = 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center relative overflow-hidden transition-colors active:bg-gray-50 dark:active:bg-gray-800 cursor-pointer select-none';
            card.style.minHeight = '180px';
            
            // Background color indicator based on delta
            const bgIndicator = document.createElement('div');
            bgIndicator.className = 'absolute inset-0 opacity-0 transition-opacity duration-300';
            bgIndicator.id = `bg_${athlete.id}`;
            card.appendChild(bgIndicator);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'relative z-10 flex flex-col items-center pointer-events-none w-full';

            const nameEl = document.createElement('h3');
            nameEl.className = 'font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white mb-1 truncate w-full text-center';
            nameEl.innerText = athlete.name;

            const timeEl = document.createElement('div');
            timeEl.id = `time_${athlete.id}`;
            timeEl.className = 'text-3xl sm:text-4xl font-bold tabular-nums tracking-tighter text-primary-600 dark:text-primary-400 my-2';
            timeEl.innerText = '00:00.0';

            let progressText = '0m';
            if (totalDistance > 0) progressText = `0 / ${totalDistance}m`;
            
            const deltaEl = document.createElement('div');
            deltaEl.id = `delta_${athlete.id}`;
            deltaEl.className = 'text-sm font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 mb-1';
            deltaEl.innerText = 'Target: ' + formatTime(athlete.targetLapMs, false);

            const progressEl = document.createElement('div');
            progressEl.id = `progress_${athlete.id}`;
            progressEl.className = 'text-xs text-gray-400 font-medium tracking-wide uppercase';
            progressEl.innerText = progressText;

            const finishedOverlay = document.createElement('div');
            finishedOverlay.id = `finished_${athlete.id}`;
            finishedOverlay.className = 'absolute inset-0 bg-white/80 dark:bg-dark-card/90 backdrop-blur-sm z-20 hidden flex-col items-center justify-center';
            finishedOverlay.innerHTML = `
                <div class="text-green-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                </div>
                <span class="font-bold text-xl text-gray-900 dark:text-white uppercase tracking-wider">Arrivato</span>
                <span id="finalTime_${athlete.id}" class="text-primary-600 font-bold font-display text-2xl mt-1"></span>
            `;

            contentDiv.appendChild(nameEl);
            contentDiv.appendChild(timeEl);
            contentDiv.appendChild(deltaEl);
            contentDiv.appendChild(progressEl);
            card.appendChild(contentDiv);
            card.appendChild(finishedOverlay);

            // Handle LAP click
            const handleLap = (e) => {
                e.preventDefault();
                if (athlete.finished) return;
                recordLap(athlete);
                // Vibrate if supported
                if (navigator.vibrate) navigator.vibrate(50);
            };

            card.addEventListener('mousedown', handleLap);
            card.addEventListener('touchstart', handleLap);

            activeAthletesGrid.appendChild(card);
        });
    };

    const updateMasterClock = () => {
        if (!isRacing) return;
        const now = Date.now();
        const elapsed = now - raceStartTime;
        masterClockEl.innerText = formatTime(elapsed);
        
        // Update individual running times
        athletes.forEach(athlete => {
            if (!athlete.finished) {
                const timeEl = document.getElementById(`time_${athlete.id}`);
                if (timeEl) {
                    const athleteElapsed = elapsed - athlete.lastSplitTime;
                    timeEl.innerText = formatTime(athleteElapsed);
                }
            }
        });

        animationFrameId = requestAnimationFrame(updateMasterClock);
    };

    const recordLap = (athlete) => {
        if (!isRacing || athlete.finished) return;
        const now = Date.now();
        const elapsed = now - raceStartTime;
        const lapDuration = elapsed - athlete.lastSplitTime;
        
        athlete.splits.push({
            lapTime: lapDuration,
            cumulative: elapsed
        });
        
        athlete.lastSplitTime = elapsed;
        
        const currentDistance = getSplitDistance(athlete.splits.length - 1);
        
        // Expected cumulative time = distance * (targetLapMs / lapDistance)
        const expectedCumulative = currentDistance * (athlete.targetLapMs / lapDistance);
        const delta = elapsed - expectedCumulative;
        athlete.lastLapDelta = delta;

        updateAthleteCardUI(athlete, currentDistance);

        // Check if finished
        if (totalDistance > 0 && currentDistance >= totalDistance) {
            athlete.finished = true;
            const overlay = document.getElementById(`finished_${athlete.id}`);
            const finalTime = document.getElementById(`finalTime_${athlete.id}`);
            if (overlay && finalTime) {
                finalTime.innerText = formatTime(elapsed);
                overlay.classList.remove('hidden');
                overlay.classList.add('flex');
            }

            // Check if all finished
            if (athletes.every(a => a.finished)) {
                setTimeout(() => {
                    isRacing = false;
                    cancelAnimationFrame(animationFrameId);
                    showResults();
                }, 1000);
            }
        }
    };

    const updateAthleteCardUI = (athlete, currentDistance) => {
        const deltaEl = document.getElementById(`delta_${athlete.id}`);
        const bgIndicator = document.getElementById(`bg_${athlete.id}`);
        const progressEl = document.getElementById(`progress_${athlete.id}`);
        
        if (!deltaEl || !bgIndicator) return;

        const d = athlete.lastLapDelta;
        deltaEl.innerText = formatDelta(d);
        
        if (progressEl) {
            progressEl.innerText = totalDistance > 0 ? `${currentDistance} / ${totalDistance}m` : `${currentDistance}m`;
        }
        
        // Styling based on delta
        deltaEl.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-500', 'bg-green-100', 'text-green-700', 'dark:bg-green-900/40', 'dark:text-green-400', 'bg-red-100', 'text-red-700', 'dark:bg-red-900/40', 'dark:text-red-400');
        bgIndicator.classList.remove('bg-green-500/10', 'bg-red-500/10');

        if (d < 0) { // Faster (Ahead of target) - Green
            deltaEl.classList.add('bg-green-100', 'text-green-700', 'dark:bg-green-900/40', 'dark:text-green-400');
            bgIndicator.classList.add('bg-green-500/10');
        } else { // Slower (Behind target) - Red
            deltaEl.classList.add('bg-red-100', 'text-red-700', 'dark:bg-red-900/40', 'dark:text-red-400');
            bgIndicator.classList.add('bg-red-500/10');
        }
        
        // Flash animation
        bgIndicator.style.opacity = '1';
        setTimeout(() => {
            bgIndicator.style.opacity = '0';
        }, 500);
    };

    // --- STOP RACE ---
    stopRaceBtn.addEventListener('click', () => {
        if (confirm('Vuoi davvero terminare la gara per tutti gli atleti?')) {
            isRacing = false;
            cancelAnimationFrame(animationFrameId);
            showResults();
        }
    });

    // --- RESULTS PHASE ---
    const showResults = () => {
        raceScreen.classList.add('hidden');
        raceScreen.classList.remove('flex');
        
        resultsContainer.innerHTML = '';

        athletes.forEach(athlete => {
            const wrap = document.createElement('div');
            wrap.className = 'border border-gray-100 dark:border-dark-border rounded-xl overflow-hidden';
            
            const header = document.createElement('div');
            header.className = 'bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border-b border-gray-100 dark:border-gray-700';
            
            let avgPaceText = '-';
            if (athlete.splits.length > 0) {
                const totalDist = getSplitDistance(athlete.splits.length - 1);
                const totalTimeMs = athlete.splits[athlete.splits.length - 1].cumulative;
                const paceMsPerKm = (totalTimeMs / (totalDist / 1000));
                const totalSec = Math.floor(paceMsPerKm / 1000);
                const min = Math.floor(totalSec / 60);
                const sec = totalSec % 60;
                avgPaceText = `${min}:${sec.toString().padStart(2, '0')}/km`;
            }

            header.innerHTML = `
                <div class="flex justify-between items-center mb-1">
                    <span class="font-bold text-gray-900 dark:text-white">${athlete.name}</span>
                    <span class="text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 px-2 py-1 rounded font-bold">Target: ${formatTime(athlete.targetLapMs, false)}</span>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Passo Medio Reale: <span class="text-gray-900 dark:text-gray-100 font-bold">${avgPaceText}</span>
                </div>
            `;
            wrap.appendChild(header);

            if (athlete.splits.length === 0) {
                const noData = document.createElement('div');
                noData.className = 'p-4 text-sm text-gray-500 text-center';
                noData.innerText = 'Nessun intertempo registrato.';
                wrap.appendChild(noData);
            } else {
                const tableWrap = document.createElement('div');
                tableWrap.className = 'overflow-x-auto';
                let tableHTML = `
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-card border-b border-gray-100 dark:border-dark-border">
                            <tr>
                                <th class="px-4 py-2 font-medium">Lap</th>
                                <th class="px-4 py-2 font-medium">Frazione</th>
                                <th class="px-4 py-2 font-medium">Delta</th>
                                <th class="px-4 py-2 font-medium text-right">Passaggio</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50 dark:divide-gray-800/50">
                `;
                
                let minPace = Infinity, maxPace = -Infinity, bestIdx = -1, worstIdx = -1;
                if (athlete.splits.length > 1) {
                    athlete.splits.forEach((s, idx) => {
                        const dist = idx === 0 ? getSplitDistance(0) : getSplitDistance(idx) - getSplitDistance(idx - 1);
                        const pace = s.lapTime / (dist / 1000);
                        if (pace < minPace) { minPace = pace; bestIdx = idx; }
                        if (pace > maxPace) { maxPace = pace; worstIdx = idx; }
                    });
                }

                athlete.splits.forEach((split, idx) => {
                    const dist = idx === 0 ? getSplitDistance(0) : getSplitDistance(idx) - getSplitDistance(idx - 1);
                    const targetFractionMs = (athlete.targetLapMs / lapDistance) * dist;
                    const deltaMs = split.lapTime - targetFractionMs;
                    
                    let deltaHTML = deltaMs < 0 
                        ? `<span class="text-green-600 dark:text-green-400 font-medium">${formatDelta(deltaMs)}</span>`
                        : `<span class="text-red-600 dark:text-red-400 font-medium">${formatDelta(deltaMs)}</span>`;
                    
                    let highlightIcon = '';
                    let rowClass = 'hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors';
                    if (idx === bestIdx) { highlightIcon = ' 🔥'; rowClass = 'bg-amber-50/50 dark:bg-amber-900/10 hover:bg-amber-100/50 transition-colors'; }
                    else if (idx === worstIdx) { highlightIcon = ' 🐢'; }

                    tableHTML += `
                        <tr class="${rowClass}">
                            <td class="px-4 py-2 text-gray-500">${getSplitDistance(idx)}m</td>
                            <td class="px-4 py-2 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">${formatTime(split.lapTime)}${highlightIcon}</td>
                            <td class="px-4 py-2">${deltaHTML}</td>
                            <td class="px-4 py-2 text-primary-600 dark:text-primary-400 font-medium text-right">${formatTime(split.cumulative)}</td>
                        </tr>
                    `;
                });
                
                tableHTML += `</tbody></table>`;
                tableWrap.innerHTML = tableHTML;
                wrap.appendChild(tableWrap);
            }

            resultsContainer.appendChild(wrap);
        });

        resultsScreen.classList.remove('hidden');
        resultsScreen.classList.add('flex');
    };

    resetRaceBtn.addEventListener('click', () => {
        resultsScreen.classList.add('hidden');
        resultsScreen.classList.remove('flex');
        setupScreen.classList.remove('hidden');
        // Reset state
        athletes.forEach(a => {
            a.splits = [];
            a.lastSplitTime = 0;
            a.lastLapDelta = 0;
        });
        masterClockEl.innerText = '00:00.0';
    });

    shareBtn.addEventListener('click', () => {
        let text = `⏱️ *Resoconto Gara (Lap ${lapDistance}m)*\n\n`;
        
        athletes.forEach(a => {
            if (a.splits.length > 0) {
                const totalDist = getSplitDistance(a.splits.length - 1);
                const totalTimeMs = a.splits[a.splits.length - 1].cumulative;
                const paceMsPerKm = (totalTimeMs / (totalDist / 1000));
                const totalSec = Math.floor(paceMsPerKm / 1000);
                const min = Math.floor(totalSec / 60);
                const sec = totalSec % 60;
                const avgPaceText = `${min}:${sec.toString().padStart(2, '0')}/km`;

                text += `🏃‍♂️ *${a.name}*\n`;
                text += `Target: ${formatTime(a.targetLapMs, false)} | Passo Reale: ${avgPaceText}\n`;
                text += `Fine: ${totalDist}m in ${formatTime(totalTimeMs)}\n`;
                text += `Passaggi:\n`;
                
                let minPace = Infinity, maxPace = -Infinity, bestIdx = -1, worstIdx = -1;
                if (a.splits.length > 1) {
                    a.splits.forEach((s, idx) => {
                        const dist = idx === 0 ? getSplitDistance(0) : getSplitDistance(idx) - getSplitDistance(idx - 1);
                        const pace = s.lapTime / (dist / 1000);
                        if (pace < minPace) { minPace = pace; bestIdx = idx; }
                        if (pace > maxPace) { maxPace = pace; worstIdx = idx; }
                    });
                }

                a.splits.forEach((s, idx) => {
                    const dist = idx === 0 ? getSplitDistance(0) : getSplitDistance(idx) - getSplitDistance(idx - 1);
                    const targetFractionMs = (a.targetLapMs / lapDistance) * dist;
                    const deltaMs = s.lapTime - targetFractionMs;
                    
                    let icon = '';
                    if (idx === bestIdx) icon = ' 🔥';
                    if (idx === worstIdx) icon = ' 🐢';
                    
                    text += `- ${getSplitDistance(idx)}m: ${formatTime(s.lapTime)}${icon} [${formatDelta(deltaMs)}] (${formatTime(s.cumulative)})\n`;
                });
                text += `\n`;
            }
        });

        if (navigator.share) {
            navigator.share({
                title: 'Resoconto Gara',
                text: text
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(text).then(() => {
                alert('Testo copiato negli appunti! Ora puoi incollarlo su WhatsApp.');
            });
        }
    });

});
